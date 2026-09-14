const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

function loadTs(file, mocks = {}) {
    const filename = path.resolve(__dirname, '..', file);
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
    }).outputText;
    const loaded = new Module(filename, module);
    loaded.filename = filename;
    loaded.paths = Module._nodeModulePaths(path.dirname(filename));
    loaded.require = name => Object.hasOwn(mocks, name) ? mocks[name] : require(name);
    loaded._compile(compiled, filename);
    return loaded.exports;
}
const services = loadTs('lib/services.ts');
const access = loadTs('lib/service-access.ts');
const valid = {
    title: 'Installation électrique', shortDescription: 'Rénovation de votre installation.',
    description: '<p>Des prestations adaptées à votre maison.</p>', category: 'Électricité',
    order: 4, featured: true, active: false, image: '/assets/hero-image.jpg',
    imageAlternatif: 'Installation électrique', priceLabel: 'Sur devis',
    prestations: 'Installation de prises\nRemplacement de luminaires',
};
const admin = {user: {email: 'artisan@example.test'}};
function routes(file, prisma, session = admin) {
    return loadTs(file, {
        '@/lib/db': {default: {service: prisma}},
        'next-auth': {getServerSession: async () => session},
        '@/lib/auth-options': {authOptions: {}},
        '@/lib/service-access': {canManageServices: value => value?.user?.email === admin.user.email},
        '@/lib/services': services,
        'next/server': {NextResponse: {json: (data, init) => Response.json(data, init)}},
    });
}
const request = data => new Request('http://localhost/api/services', {method: 'POST', body: JSON.stringify(data)});

test('les sept métiers confirmés sont proposés', () => {
    assert.deepEqual(services.serviceCategories.slice(0, 7), ['Plomberie', 'Électricité', 'Peinture', 'Placo', 'Charpenterie', 'Climatisation', 'Carrelage']);
});
test('les anciens champs reçoivent des valeurs compatibles et les champs techniques sont exclus', () => {
    const data = services.serviceSchema.parse({title: 'Plomberie', shortDescription: 'Dépannage', description: '<p>Réparation</p>', id: 'injected', slug: 'changed'});
    assert.equal(data.category, 'Plomberie');
    assert.equal(data.order, 0);
    assert.equal(data.active, true);
    assert.equal(data.featured, false);
    assert.equal(data.id, undefined);
    assert.equal(data.slug, undefined);
});
test('les champs facultatifs et les catégories personnalisées sont conservés', () => {
    assert.deepEqual(services.serviceSchema.parse(valid), valid);
    assert.equal(services.serviceSchema.parse({...valid, category: 'Entretien extérieur'}).category, 'Entretien extérieur');
});
test('les descriptions vides et les valeurs invalides sont refusées', () => {
    for (const shortDescription of ['', '  ', '<p><br></p>', '<p>&nbsp;</p>']) {
        assert.equal(services.serviceSchema.safeParse({...valid, shortDescription}).success, false);
    }
    for (const order of [-1, 1.5, 'invalide']) assert.equal(services.serviceSchema.safeParse({...valid, order}).success, false);
    assert.equal(services.serviceSchema.safeParse({...valid, active: 'false'}).success, false);
    assert.equal(services.serviceSchema.safeParse({...valid, image: 'javascript:alert(1)'}).success, false);
});
test('une modification partielle ne réinitialise aucun autre champ', () => {
    assert.deepEqual(services.serviceSchema.partial().parse({active: false}), {active: false});
});
test('l’accès est limité aux adresses configurées et refuse une configuration vide', () => {
    const original = {allowed: process.env.ALLOWED_EMAILS, legacy: process.env.NEXT_PUBLIC_ALLOWED_EMAILS};
    try {
        process.env.ALLOWED_EMAILS = ' Artisan@Example.Test, second@example.test ';
        delete process.env.NEXT_PUBLIC_ALLOWED_EMAILS;
        assert.equal(access.canManageServices(admin), true);
        assert.equal(access.canManageServices({user: {email: 'stranger@example.test'}}), false);
        assert.equal(access.canManageServices(null), false);
        process.env.ALLOWED_EMAILS = '';
        assert.equal(access.canManageServices(admin), false);
        process.env.NEXT_PUBLIC_ALLOWED_EMAILS = admin.user.email;
        assert.equal(access.canManageServices(admin), true);
    } finally {
        for (const [key, value] of [['ALLOWED_EMAILS', original.allowed], ['NEXT_PUBLIC_ALLOWED_EMAILS', original.legacy]]) {
            if (value === undefined) delete process.env[key]; else process.env[key] = value;
        }
    }
});
test('le catalogue public masque les brouillons et conserve l’ordre', async () => {
    let query;
    const route = routes('app/api/services/route.ts', {findMany: async data => {query = data; return [];}}, null);
    assert.equal((await route.GET()).status, 200);
    assert.deepEqual(query.where, {active: true});
    assert.deepEqual(query.orderBy, [{order: 'asc'}, {createdAt: 'asc'}]);
    const protectedRoute = routes('app/api/services/route.ts', {findMany: async data => {query = data; return [];}});
    await protectedRoute.GET();
    assert.deepEqual(query.where, {});
});
test('la création conserve les nouveaux champs et évite une collision de lien', async () => {
    let inserted;
    const route = routes('app/api/services/route.ts', {
        findUnique: async ({where}) => where.slug === 'installation-electrique' ? {id: 'existing'} : null,
        create: async ({data}) => {inserted = data; return data;},
    });
    assert.equal((await route.POST(request(valid))).status, 201);
    assert.deepEqual(inserted, {...valid, slug: 'installation-electrique-2'});
});
test('la modification du titre préserve le lien et n’accepte pas les champs techniques', async () => {
    let update;
    const route = routes('app/api/services/[id]/route.ts', {update: async data => {update = data; return data.data;}});
    assert.equal((await route.PATCH(request({title: 'Peinture intérieure', slug: 'replacement', id: 'other'}), {params: {id: 'service-id'}})).status, 200);
    assert.deepEqual(update, {where: {id: 'service-id'}, data: {title: 'Peinture intérieure'}});
});
test('les écritures non autorisées et les données invalides n’atteignent pas la base', async () => {
    const forbidden = {user: {email: 'stranger@example.test'}};
    const route = routes('app/api/services/route.ts', {}, forbidden);
    assert.equal((await route.POST(request(valid))).status, 403);
    const item = routes('app/api/services/[id]/route.ts', {}, forbidden);
    assert.equal((await item.PATCH(request({active: true}), {params: {id: 'x'}})).status, 403);
    assert.equal((await item.DELETE(request({}), {params: {id: 'x'}})).status, 403);
    const authorized = routes('app/api/services/route.ts', {});
    assert.equal((await authorized.POST(request({...valid, title: ''}))).status, 400);
    const authorizedItem = routes('app/api/services/[id]/route.ts', {});
    assert.equal((await authorizedItem.PATCH(request({id: 'x'}), {params: {id: 'x'}})).status, 400);
});
