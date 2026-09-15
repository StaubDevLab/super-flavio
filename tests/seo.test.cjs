const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./helpers/load-ts.cjs');
const seo = loadTs('lib/seo.ts');
test('canonical and social URLs agree and preserve encoded service slugs', () => {
    const path = '/services/r%C3%A9novation';
    const metadata = seo.pageMetadata('Rénovation', 'Travaux en Corrèze', path);
    assert.equal(metadata.alternates.canonical, seo.absoluteUrl(path));
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
    assert.equal(metadata.twitter.card, 'summary_large_image');
});
test('JSON-LD cannot close its script element with stored content', () => {
    const value = { name: '</script><script>alert(1)</script>' };
    assert.equal(seo.jsonLd(value).includes('<'), false);
    assert.deepEqual(JSON.parse(seo.jsonLd(value)), value);
});
test('sitemap contains public routes and database service slugs only', async () => {
    const { default: sitemap } = loadTs('app/sitemap.ts', {
        '@/lib/seo': seo,
        '@/lib/public-content': { getPublicServices: async () => [{ slug: 'rénovation' }] },
    });
    const entries = await sitemap();
    assert.equal(entries.length, 5);
    assert.equal(entries.at(-1).url, seo.absoluteUrl('/services/r%C3%A9novation'));
    assert.ok(entries.every(entry => !entry.url.includes('/admin')));
});
test('database outages do not produce a successful incomplete sitemap', async () => {
    const { default: sitemap } = loadTs('app/sitemap.ts', {
        '@/lib/seo': seo,
        '@/lib/public-content': { getPublicServices: async () => { throw new Error('offline'); } },
    });
    await assert.rejects(sitemap, /offline/);
});
