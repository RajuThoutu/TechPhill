# Content Management Guide

This guide explains how to add new content to the website.

## Adding a New Blog Post

1.  **Create a File**: Navigate to `content/blog/` and create a new file with the `.mdx` extension. Use a kebab-case filename (e.g., `my-new-post.mdx`).

2.  **Add Frontmatter**: At the top of the file, add the metadata block:

    ```yaml
    ---
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

4.  **Preview**: Run `npm run dev` and check the `/blog` page.

## Updating Podcasts / Projects

Currently, these pages are placeholders. To make them dynamic:
1. Create a data file (e.g., `content/podcasts.json`).
2. Update the page component (e.g., `app/podcasts/page.tsx`) to read from that file, similar to how the blog page works.
