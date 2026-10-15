const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const base = process.env.TEST_BASE_URL;

function decodedPayload(html) {
    // Decode the JavaScript string wrapper around Next's flight chunks so escaped
    // quotes, newlines and non-ASCII text cannot hide a serialized metadata leak.
    const chunks = Array.from(html.matchAll(/self\.__next_f\.push\((.*?)\)<\/script>/gs), match => {
        try { return JSON.parse(match[1]).filter(value => typeof value === 'string').join(''); }
        catch { return ''; }
    });
    return [html, ...chunks].join('\n');
}

test('production routes, sitemap, metadata and serialized props respect publication', { skip: !base && 'Set TEST_BASE_URL to a running production build' }, async () => {
    const dir = path.join(__dirname, '../content/blog');
    const posts = fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(file => ({ slug: file.slice(0, -4), ...matter(fs.readFileSync(path.join(dir, file), 'utf8')) }));
    const index = decodedPayload(await (await fetch(`${base}/blog`)).text());
    const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
    const home = decodedPayload(await (await fetch(base)).text());
    for (const post of posts) {
        const response = await fetch(`${base}/blog/${post.slug}`);
        const html = decodedPayload(await response.text());
        if (post.data.publication === 'published') {
            assert.equal(response.status, 200, post.slug);
            assert.ok(index.includes(`/blog/${post.slug}`), post.slug);
            assert.ok(sitemap.includes(`/blog/${post.slug}`), post.slug);
        } else {
            assert.equal(response.status, 404, post.slug);
            // Next may echo the requested URL in a 404 router payload. It must
            // never disclose unpublished metadata or content.
            for (const output of [index, home, sitemap]) assert.ok(!output.includes(post.slug), `Draft listed: ${post.slug}`);
            for (const output of [html, index, home, sitemap]) {
                assert.ok(!output.includes(post.data.title), `Draft title leaked: ${post.slug}`);
                assert.ok(!output.includes(post.data.excerpt), `Draft excerpt leaked: ${post.slug}`);
                assert.ok(!output.includes(JSON.stringify(post.data.title)), `Serialized draft title leaked: ${post.slug}`);
                assert.ok(!output.includes(JSON.stringify(post.data.excerpt)), `Serialized draft excerpt leaked: ${post.slug}`);
                const bodyLine = post.content.trim().split('\n').find(line => line.length > 30 && !line.startsWith('#'));
                if (bodyLine) assert.ok(!output.includes(bodyLine), `Draft body leaked: ${post.slug}`);
            }
        }
    }
    for (const post of posts) {
        const bodyLine = post.content.trim().split('\n').find(line => line.length > 50 && !line.startsWith('#') && !post.data.excerpt.includes(line));
        if (bodyLine) {
            assert.ok(!index.includes(bodyLine), `Body serialized into list: ${post.slug}`);
            assert.ok(!index.includes(JSON.stringify(post.content)), `Full body serialized into list: ${post.slug}`);
        }
    }
    assert.equal((await fetch(`${base}/services`)).status, 404);
    assert.equal((await fetch(`${base}/blog/unknown-unpublished-post`)).status, 404);
    const redirect = await fetch(`${base}/projects`, { redirect: 'manual' });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get('location'), '/labs');
    for (const route of ['', '/about', '/blog', '/labs', '/contact', '/podcasts']) {
        const html = await (await fetch(`${base}${route}`)).text();
        assert.ok(!/anushtan|worldpay|fiserv|cognizant/i.test(html), route);
    }
});
