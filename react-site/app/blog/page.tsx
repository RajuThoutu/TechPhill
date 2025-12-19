import React from 'react';
import { getSortedPostsData } from '../../lib/blog';
import BlogList from '../../components/BlogList';

export const metadata = {
    title: 'Insights | The Tech Philosophers',
    description: 'Exploring the intersection of technology, philosophy, and life through articles and essays.',
};

export default function BlogIndex() {
    const allPosts = getSortedPostsData();

    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="max-w-3xl mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights</h1>
                    <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                        Exploring the intersection of technology, philosophy, and life.
                        Deep dives into AI, ancient wisdom, and the future of society.
                    </p>
                </div>

                <BlogList posts={allPosts} />
            </div>
        </div>
    );
}
