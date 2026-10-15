import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, BlogPostSummary } from './blog-types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

/** Fail closed: missing, misspelled, or non-string values remain unpublished. */
export function isPublished(data: Record<string, unknown>): boolean {
    return data.publication === 'published';
}

export function getPostData(slug: string): BlogPost | null {
    // Reject traversal, extensions, and unsupported filenames before reading disk.
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) return null;
    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));
    if (!isPublished(data)) return null;

    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    // Explicit field selection prevents arbitrary frontmatter reaching client props.
    return {
        slug,
        title: typeof data.title === 'string' ? data.title : slug,
        date: typeof data.date === 'string' && Number.isFinite(publicationTimestamp(data.date))
            ? data.date : undefined,
        status: typeof data.status === 'string' ? data.status : undefined,
        category: typeof data.category === 'string' ? data.category : '',
        tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [],
        excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
        content,
        socialImage: typeof data.socialImage === 'string'
            && /^\/images\/blog\/[a-z0-9-]+\/[a-z0-9-]+\.png$/.test(data.socialImage)
            && typeof data.socialImageAlt === 'string'
            && Number.isInteger(data.socialImageWidth) && data.socialImageWidth > 0
            && Number.isInteger(data.socialImageHeight) && data.socialImageHeight > 0
            ? { url: data.socialImage, alt: data.socialImageAlt, width: data.socialImageWidth, height: data.socialImageHeight }
            : undefined,
        readingTime: Math.max(1, Math.ceil(words / 225)) + ' min read',
    };
}

function publicationTimestamp(date?: string): number {
    // Require a real ISO calendar date; missing/invalid dates sort after dated posts.
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return Number.NEGATIVE_INFINITY;
    const timestamp = Date.parse(`${date}T00:00:00Z`);
    return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === date
        ? timestamp : Number.NEGATIVE_INFINITY;
}

export function getSortedPostsData(): BlogPostSummary[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs.readdirSync(postsDirectory, { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.endsWith('.mdx'))
        .map(entry => getPostData(entry.name.slice(0, -4)))
        .filter((post): post is BlogPost => post !== null)
        .map(({ content, socialImage, ...summary }) => summary)
        .sort((a, b) => {
            const aDate = publicationTimestamp(a.date);
            const bDate = publicationTimestamp(b.date);
            return aDate !== bDate ? bDate - aDate
                : a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug);
        });
}

export function getAllPostSlugs() {
    return getSortedPostsData().map(({ slug }) => ({ params: { slug } }));
}
