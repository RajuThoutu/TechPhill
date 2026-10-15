/** Safe metadata for cards and client-side filtering. Never includes the MDX body. */
export type BlogPostSummary = {
    slug: string;
    title: string;
    date?: string;
    status?: string;
    category: string;
    tags: string[];
    excerpt: string;
    readingTime: string;
};

export type BlogPost = BlogPostSummary & { content: string };
