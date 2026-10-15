const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Run the real server module against isolated content fixtures without a Next server.
function loadBlog(root = process.cwd()) {
    const source = fs.readFileSync(path.join(__dirname, '../lib/blog.ts'), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } });
    const module = { exports: {} };
    vm.runInNewContext(outputText, {
        exports: module.exports, module,
        require: name => name === 'server-only' ? {} : require(name),
        process: { cwd: () => root },
    });
    return module.exports;
}
const published = ['ai-revolution-2026', 'learning-with-ai-in-a-world-that-keeps-changing', 'pega-to-llms', 'you-are-not-ai-slave'];
const drafts = ['enterprise-copilots', 'hybrid-learning', 'rama-vs-arjuna', 'success-vs-connection', 'pega-azure-ai', 'krishna-leadership'];

test('only the four approved posts are published, and lists never serialize bodies', () => {
    const blog = loadBlog();
    const posts = blog.getSortedPostsData();
    assert.deepEqual(Array.from(posts, p => p.slug).sort(), published);
    assert.deepEqual(Array.from(blog.getAllPostSlugs(), p => p.params.slug).sort(), published);
    for (const post of posts) assert.equal(Object.hasOwn(post, 'content'), false);
    for (const slug of published) assert.ok(blog.getPostData(slug).content);
    for (const slug of [...drafts, 'missing', '../CONTENT', 'ai-revolution-2026.mdx', '/etc/passwd']) {
        assert.equal(blog.getPostData(slug), null);
    }
});

test('publication fails closed; ignores other file types and directories', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'techphill-publication-'));
    const dir = path.join(root, 'content/blog');
    fs.mkdirSync(dir, { recursive: true });
    try {
        const fixtures = {
            approved: 'publication: published',
            draft: 'publication: draft', missing: '', invalid: 'publication: Published',
            boolean: 'publication: true', null: 'publication: null', array: 'publication: [published]',
            display: 'status: published',
        };
        for (const [slug, field] of Object.entries(fixtures)) {
            fs.writeFileSync(path.join(dir, `${slug}.mdx`), `---\ntitle: ${slug}\n${field}\nsecret: hidden\n---\nPRIVATE BODY ${slug}`);
        }
        fs.writeFileSync(path.join(dir, 'ignored.txt'), 'not even valid frontmatter');
        fs.mkdirSync(path.join(dir, 'directory.mdx'));
        const blog = loadBlog(root);
        assert.deepEqual(Array.from(blog.getAllPostSlugs(), p => p.params.slug), ['approved']);
        for (const slug of Object.keys(fixtures).filter(s => s !== 'approved')) assert.equal(blog.getPostData(slug), null);
        const summary = blog.getSortedPostsData()[0];
        assert.equal(Object.hasOwn(summary, 'content'), false);
        assert.equal(Object.hasOwn(summary, 'secret'), false);
        assert.equal(blog.getPostData('ignored'), null);
    } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('article rendering and metadata both stop at notFound for unavailable posts', async () => {
    const source = fs.readFileSync(path.join(__dirname, '../app/blog/[slug]/page.tsx'), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } });
    const module = { exports: {} };
    const unavailable = new Error('NOT_FOUND');
    vm.runInNewContext(outputText, {
        exports: module.exports, module,
        require: name => name === 'next/navigation' ? { notFound: () => { throw unavailable; } }
            : name.endsWith('/lib/blog') ? { getPostData: () => null, getAllPostSlugs: () => [] } : {},
    });
    for (const slug of [...drafts, 'unknown-unpublished-post']) {
        await assert.rejects(module.exports.default({ params: Promise.resolve({ slug }) }), error => error === unavailable);
        await assert.rejects(module.exports.generateMetadata({ params: Promise.resolve({ slug }) }), error => error === unavailable);
    }
});

test('newest articles lead; invalid dates normalize and render the unavailable fallback', () => {
    assert.equal(loadBlog().getSortedPostsData()[0].slug, 'learning-with-ai-in-a-world-that-keeps-changing');
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'techphill-latest-'));
    const dir = path.join(root, 'content/blog');
    fs.mkdirSync(dir, { recursive: true });
    try {
        for (const [slug, title, date, publication] of [
            ['older', 'Older', '2026-10-01', 'published'],
            ['newest', 'Newest', '2026-10-16', 'published'],
            ['tie-z', 'Same', '2026-10-15', 'published'],
            ['tie-a', 'Same', '2026-10-15', 'published'],
            ['missing', 'A missing date', '', 'published'],
            ['invalid', 'B invalid date', '2026-02-30', 'published'],
            ['malformed', 'C malformed date', 'tomorrow', 'published'],
            ['draft', 'Newest draft', '2099-01-01', 'draft'],
        ]) fs.writeFileSync(path.join(dir, `${slug}.mdx`), `---\npublication: ${publication}\ntitle: "${title}"\ndate: "${date}"\n---\nBody`);
        const blog = loadBlog(root);
        assert.deepEqual(Array.from(blog.getSortedPostsData(), p => p.slug), ['newest', 'tie-a', 'tie-z', 'older', 'missing', 'invalid', 'malformed']);
        // Render the actual card and its Card component with React SSR, not a
        // hand-written substitute, using posts returned by the server boundary.
        function loadComponent(name) {
            const source = fs.readFileSync(path.join(__dirname, '../components', name + '.tsx'), 'utf8');
            const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
            const module = { exports: {} };
            vm.runInNewContext(outputText, {
                exports: module.exports, module,
                require: name => name === './Card' ? loadComponent('Card') : require(name),
            });
            return module.exports;
        }
        const BlogCard = loadComponent('BlogCard').default;
        const React = require('react');
        const { renderToStaticMarkup } = require('react-dom/server');
        for (const slug of ['missing', 'invalid', 'malformed']) {
            const post = blog.getPostData(slug);
            assert.equal(post.date, undefined);
            assert.equal(blog.getSortedPostsData().find(p => p.slug === slug).date, undefined);
            const html = renderToStaticMarkup(React.createElement(BlogCard, post));
            assert.ok(html.includes('Publication date unavailable'), slug);
            assert.ok(!html.includes('<time'), slug);
            assert.ok(!html.includes('2026-02-30') && !html.includes('tomorrow'), slug);
        }
        const valid = blog.getPostData('newest');
        assert.equal(valid.date, '2026-10-16');
        assert.ok(renderToStaticMarkup(React.createElement(BlogCard, valid)).includes('<time dateTime="2026-10-16">2026-10-16</time>'));
    } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
