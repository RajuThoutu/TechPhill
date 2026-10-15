# Content Management Guide

This guide explains how to add new content to the website.

## Adding a New Blog Post

1.  **Create a File**: Navigate to `content/blog/` and create a new file with the `.mdx` extension. Use a kebab-case filename (e.g., `my-new-post.mdx`).

2.  **Add Frontmatter**: At the top of the file, add the metadata block:

    ```yaml
    ---
    publication: draft
    title: "Your Post Title"
    date: "YYYY-MM-DD"
    category: "Category Name"
    tags: ["tag1", "tag2"]
    excerpt: "A short summary of your post that appears on the card."
    ---
    ```

    **Categories**: `AI & Tech`, `Mythology`, `Education`, `Society` (or add your own).

3.  **Write Content**: Write your post using standard Markdown. You can also use HTML tags if needed.

    ```markdown
    # Header 1
    ## Header 2
    
    Paragraph text here.
    
    - List item 1
    - List item 2
    
    [Link text](https://example.com)
    
    > Blockquote for emphasis
    ```

4.  **Review before publishing**: New posts should start with `publication: draft`. Only the exact value `publication: published` makes a post public. Missing, invalid, or differently capitalized values remain unpublished. The optional `status` field is a display label (for example, "Research Note"), not a publication switch.

5.  **Publish deliberately**: After reviewing the full article, title, excerpt and tags, change `publication` to `published`. Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`. Preview `/blog`, the article URL, and `/sitemap.xml`. Drafts are excluded from listings, static paths and the sitemap, and guessed draft URLs return 404 without draft metadata or bodies. The client-side list receives summaries only.

6.  **Understand visibility**: A draft is unpublished on the website, not private. This repository is public; its files and Git history can still be read. Never commit private, employer, client or student information. Removing current files does not erase Git history.

## Updating Podcasts / Projects

Currently, these pages are placeholders. To make them dynamic:
1. Create a data file (e.g., `content/podcasts.json`).
2. Update the page component (e.g., `app/podcasts/page.tsx`) to read from that file, similar to how the blog page works.

## Production publication checks

After building, run `npm run start` in one terminal. In another, run
`TEST_BASE_URL=http://localhost:3000 npm test` to exercise the production HTTP
routes, sitemap, metadata and body visibility, plus the `/projects` redirect.
Without `TEST_BASE_URL`, the fixture tests run and the HTTP test is explicitly skipped.
