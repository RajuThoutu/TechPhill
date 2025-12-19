import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const EPISODES_FILE = path.join(CONTENT_DIR, 'episodes.json');
const OUTPUT_FILE = path.join(CONTENT_DIR, 'updates.json');

async function generateUpdates() {
    console.log('🔄 Generating latest updates feed...');

    let allUpdates = [];

    // 1. Process Blog Posts
    if (fs.existsSync(BLOG_DIR)) {
        const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));

        for (const file of blogFiles) {
            const filePath = path.join(BLOG_DIR, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);

            if (data.date && data.title) {
                allUpdates.push({
                    id: `blog-${file}`,
                    type: 'blog',
                    title: data.title,
                    date: data.date,
                    link: `/blog/${file.replace('.mdx', '')}`,
                    isExternal: false
                });
            }
        }
        console.log(`✅ Found ${blogFiles.length} blog posts.`);
    }

    // 2. Process Episodes/External Content
    if (fs.existsSync(EPISODES_FILE)) {
        try {
            const episodesData = JSON.parse(fs.readFileSync(EPISODES_FILE, 'utf8'));
            allUpdates = [...allUpdates, ...episodesData];
            console.log(`✅ Found ${episodesData.length} manual episodes/papers.`);
        } catch (error) {
            console.error('❌ Error reading episodes.json:', error);
        }
    }

    // 3. Sort by Date (Newest First)
    allUpdates.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 4. Keep only the most recent update to maintain a fresh, realistic notification list
    const recentUpdates = allUpdates.slice(0, 1);

    // 5. Write to updates.json
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(recentUpdates, null, 2));
    console.log(`🎉 Successfully wrote ${recentUpdates.length} updates to content/updates.json (showing only most recent)`);
}

generateUpdates();
