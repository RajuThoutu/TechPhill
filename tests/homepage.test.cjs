const { test } = require('node:test');
const assert = require('node:assert/strict');
test('homepage reuses one latest section with newest article and direct links', { skip: !process.env.TEST_BASE_URL }, async () => {
    const response = await fetch(process.env.TEST_BASE_URL);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal((html.match(/id="latest-articles"/g) || []).length, 1);
    assert.ok(html.includes('href="#latest-articles"'));
    const section = html.match(/<section id="latest-articles"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section);
    assert.ok(section.includes('Latest Articles'));
    assert.ok(section.includes('View all articles'));
    const links = Array.from(section.matchAll(/href="\/blog\/([^"?#]+)"/g), match => match[1]);
    assert.equal(links[0], 'if-ai-can-write-software-why-buy-enterprise-platform');
    assert.equal(links.length, 3);
    assert.equal(new Set(links).size, 3);
    assert.equal((section.match(/Read article/g) || []).length, 3);
    assert.ok(section.includes('<time dateTime="2026-10-30">2026-10-30</time>'));
    assert.ok(html.indexOf('id="latest-articles"') < html.indexOf('Primary focus'));
});


test('Insights lists newest published articles first and shows all recorded dates', { skip: !process.env.TEST_BASE_URL }, async () => {
    const html = await (await fetch(process.env.TEST_BASE_URL + '/blog')).text();
    const expected = [
        ['if-ai-can-write-software-why-buy-enterprise-platform', '2026-10-30'],
        ['learning-with-ai-in-a-world-that-keeps-changing', '2026-10-15'],
        ['you-are-not-ai-slave', '2026-05-10'],
        ['ai-revolution-2026', '2025-12-17'],
        ['pega-to-llms', '2023-10-12'],
    ];
    const links = Array.from(html.matchAll(/href="\/blog\/([^"?#]+)"/g), match => match[1]);
    assert.deepEqual(links, expected.map(([slug]) => slug));
    for (const [, date] of expected) assert.ok(html.includes(`<time dateTime="${date}">${date}</time>`), date);
    assert.equal((html.match(/Read article/g) || []).length, 5);
});
