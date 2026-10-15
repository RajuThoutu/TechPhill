const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const matter = require('gray-matter');
const root = path.join(__dirname, '..');
const slug = 'learning-with-ai-in-a-world-that-keeps-changing';
const names = ['01-my-personal-assistant-team', '02-how-ai-tools-fill-the-gap'];
const asset = '/images/blog/learning-with-ai/';

test('two approved figures preserve approved prose and use safe local assets', () => {
    const { data, content } = matter(fs.readFileSync(path.join(root, 'content/blog', slug + '.mdx'), 'utf8'));
    const prose = content.replace(/\n\n<figure>[\s\S]*?<\/figure>/g, '').replace(/\n\n<p className="text-sm">[\s\S]*?<\/p>/g, '').trim();
    assert.equal(crypto.createHash('sha256').update(prose).digest('hex'), '90276f2da3fb0d5637915a4786da72c7fea78e1340f2d3fd3938e9e0d2e8cc83');
    assert.equal((content.match(/<figure>/g) || []).length, 2);
    assert.ok(!content.includes('personal-ai-vision-and-product-capabilities'));
    assert.match(content, /alt="Conceptual assistant team:/);
    assert.match(content, /alt="Conceptual capability progression/);
    for (const name of names) {
        const svg = fs.readFileSync(path.join(root, 'public', asset + name + '.svg'), 'utf8');
        assert.match(svg, /viewBox="0 0 1800 1100"/);
        assert.doesNotMatch(svg, /<script|<foreignObject|\bon\w+=|(?:href|src)="(?:https?:|javascript:|data:)/i);
        const png = fs.readFileSync(path.join(root, 'public', asset + name + '.png'));
        assert.equal(png.subarray(1, 4).toString(), 'PNG');
        assert.equal(png.readUInt32BE(16), 3200);
        assert.equal(png.readUInt32BE(20), 1956);
    }
    assert.equal(data.socialImage, asset + names[0] + '.png');
    assert.deepEqual(fs.readdirSync(path.join(root, 'public', asset)).sort(), names.flatMap(n => [n + '.png', n + '.svg']).sort());
});

test('production serves approved diagrams and correct social metadata', { skip: !process.env.TEST_BASE_URL }, async () => {
    const base = process.env.TEST_BASE_URL;
    const html = await (await fetch(`${base}/blog/${slug}`)).text();
    assert.equal((html.match(/<figure>/g) || []).length, 2);
    assert.ok(!html.includes('personal-ai-vision-and-product-capabilities'));
    assert.ok(html.includes(`https://www.thetechphilosophers.com${asset}${names[0]}.png`));
    assert.match(html, /property="og:image:width" content="3200"/);
    assert.match(html, /property="og:image:height" content="1956"/);
    for (const name of names) for (const extension of ['svg', 'png']) {
        assert.ok(html.includes(asset + name + '.' + extension));
        const response = await fetch(base + asset + name + '.' + extension);
        assert.equal(response.status, 200);
        assert.match(response.headers.get('content-type'), extension === 'svg' ? /image\/svg\+xml/ : /image\/png/);
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), fs.readFileSync(path.join(root, 'public', asset + name + '.' + extension)));
    }
});
