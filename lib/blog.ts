import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    category: string;
    tags: string[];
    excerpt: string;
    content: string;
    readingTime?: string;
};

export function getSortedPostsData(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".mdx" from file name to get id
        const slug = fileName.replace(/\.mdx$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Estimate reading time
        const words = matterResult.content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / 225) + ' min read';

        return {
            slug,
            ...(matterResult.data as {
                title: string;
                date: string;
                category: string;
                tags: string[];
                excerpt: string;
            }),
            content: matterResult.content,
            readingTime
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.mdx$/, ''),
            },
        };
    });
}

export function getPostData(slug: string): BlogPost {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const words = matterResult.content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 225) + ' min read';

    return {
        slug,
        ...(matterResult.data as {
            title: string;
            date: string;
            category: string;
            tags: string[];
            excerpt: string;
        }),
        content: matterResult.content,
        readingTime
    };
}
