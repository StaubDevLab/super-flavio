const {test} = require('node:test');
const assert = require('node:assert/strict');
const {Prisma} = require('@prisma/client');
const loadTs = require('./helpers/load-ts.cjs');
const schema = loadTs('lib/realisations.ts');
const api = loadTs('lib/realisation-api.ts', {'next/server': {NextResponse: {json: (data, init) => Response.json(data, init)}}});
const admin = {user: {email: 'artisan@example.test'}};
const photo = {url: '/assets/hero-image.jpg', alt: 'La salle de bain après les travaux', role: 'after'};
const draft = {title: 'Salle de bain à Tulle', description: 'Pose de carrelage et rénovation de la plomberie.', category: 'Carrelage', location: 'Tulle', completedAt: '2026-09-14', images: [], active: false, featured: false, order: 0};
const published = {...draft, images: [photo], active: true};
const request = data => new Request('https://localhost/api/realisations', {method: 'POST', body: JSON.stringify(data)});
function routes(file, db, session = admin, onSession) {
    return loadTs(file, {
        '@/lib/db': {default: {realisation: db}},
        'next-auth': {getServerSession: async () => {onSession?.();return session;}},
        '@/lib/auth-options': {authOptions: {}},
        '@/lib/service-access': {canManageServices: value => value?.user?.email === admin.user.email},
        '@/lib/realisations': schema,
        '@/lib/realisation-api': api,
        'next/server': {NextResponse: {json: (data, init) => Response.json(data, init)}},
    });
}
function knownError(code) {return new Prisma.PrismaClientKnownRequestError('Test database error', {code, clientVersion: '5.10.2'});}

test('un brouillon sans photo est autorisé, une publication sans photo est refusée', () => {
    assert.equal(schema.realisationSchema.safeParse(draft).success, true);
    assert.equal(schema.realisationSchema.safeParse({...draft, active: true}).success, false);
    assert.deepEqual(schema.realisationSchema.parse(published), published);
});
test('la validation protège les photos, les dates et les champs techniques', () => {
    for (const completedAt of ['2026-02-31', '2026-13-02', 'invalid']) assert.equal(schema.realisationSchema.safeParse({...draft, completedAt}).success, false);
    assert.equal(schema.realisationSchema.safeParse({...draft, completedAt: ''}).success, true);
    assert.equal(schema.realisationSchema.safeParse({...published, images: Array(21).fill(photo)}).success, false);
    assert.equal(schema.realisationSchema.safeParse({...published, images: [{...photo, url: 'javascript:alert(1)'}]}).success, false);
    assert.equal(schema.realisationSchema.safeParse({...published, images: [{...photo, role: 'unknown'}]}).success, false);
    assert.equal(schema.realisationSchema.parse({...draft, id: 'other', createdAt: 'injected'}).id, undefined);
    assert.deepEqual(schema.realisationFieldsSchema.partial().parse({active: false}), {active: false});
    assert.deepEqual(schema.realisationPhotos(null), []);
});
test('le catalogue public filtre les brouillons sans dépendre de la session', async () => {
    let query, sessionCalls = 0;
    const route = routes('app/api/realisations/route.ts', {findMany: async data => {query = data;return [published];}}, null, () => sessionCalls++);
    const response = await route.GET(new Request('https://localhost/api/realisations'));
    assert.equal(response.status, 200);
    assert.equal(sessionCalls, 0);
    assert.deepEqual(query.where, {active: true});
    assert.deepEqual(query.orderBy, [{featured: 'desc'}, {order: 'asc'}, {createdAt: 'desc'}]);
});
test('la liste privée et toutes les écritures exigent une adresse autorisée', async () => {
    const route = routes('app/api/realisations/route.ts', {}, null);
    assert.equal((await route.GET(new Request('https://localhost/api/realisations?admin=1'))).status, 403);
    assert.equal((await route.POST(request(published))).status, 403);
    const item = routes('app/api/realisations/[id]/route.ts', {}, {user: {email: 'stranger@example.test'}});
    assert.equal((await item.PATCH(request({active: true}), {params: {id: 'x'}})).status, 403);
    assert.equal((await item.DELETE(request({}), {params: {id: 'x'}})).status, 403);
});
test('l’administration peut consulter ses brouillons', async () => {
    let query;
    const route = routes('app/api/realisations/route.ts', {findMany: async data => {query=data;return [draft];}});
    assert.equal((await route.GET(new Request('https://localhost/api/realisations?admin=1'))).status, 200);
    assert.deepEqual(query.where, {});
});
test('la création conserve les photos avant / après et convertit la date', async () => {
    let inserted;
    const route = routes('app/api/realisations/route.ts', {create: async ({data}) => {inserted=data;return data;}});
    assert.equal((await route.POST(request(published))).status, 201);
    assert.deepEqual(inserted.images, [photo]);
    assert.equal(inserted.completedAt.toISOString(), '2026-09-14T00:00:00.000Z');
    assert.equal(inserted.active, true);
});
test('une modification partielle préserve les photos et les autres champs', async () => {
    let update;
    const route = routes('app/api/realisations/[id]/route.ts', {findUnique: async () => ({...published, id:'project-id', completedAt: new Date('2026-09-14')}), update: async data => {update=data;return data.data;}});
    assert.equal((await route.PATCH(request({title:'Nouveau titre', id:'injected'}), {params:{id:'project-id'}})).status, 200);
    assert.deepEqual(update, {where:{id:'project-id'},data:{title:'Nouveau titre'}});
});
test('une publication ou un retrait de toutes les photos est refusé si la galerie publiée serait vide', async () => {
    const route = routes('app/api/realisations/[id]/route.ts', {findUnique: async () => ({...draft, completedAt: null})});
    assert.equal((await route.PATCH(request({active:true}), {params:{id:'x'}})).status, 400);
    const publishedRoute = routes('app/api/realisations/[id]/route.ts', {findUnique: async () => ({...published, completedAt: null})});
    assert.equal((await publishedRoute.PATCH(request({images:[]}), {params:{id:'x'}})).status, 400);
});
test('une table absente ne provoque pas de 500 dans la galerie publique', async () => {
    const route = routes('app/api/realisations/route.ts', {findMany: async () => {throw knownError('P2021');}});
    const response = await route.GET(new Request('https://localhost/api/realisations'));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), []);
    assert.equal((await route.GET(new Request('https://localhost/api/realisations?admin=1'))).status, 503);
});
test('les chantiers inexistants et les suppressions sont traités correctement', async () => {
    const absent = routes('app/api/realisations/[id]/route.ts', {findUnique: async () => null, delete: async () => {throw knownError('P2025');}});
    assert.equal((await absent.PATCH(request({title:'Title'}), {params:{id:'x'}})).status, 404);
    assert.equal((await absent.DELETE(request({}), {params:{id:'x'}})).status, 404);
    let removed;
    const existing = routes('app/api/realisations/[id]/route.ts', {delete: async data => {removed=data;return {};}});
    assert.equal((await existing.DELETE(request({}), {params:{id:'x'}})).status, 200);
    assert.deepEqual(removed, {where:{id:'x'}});
});
