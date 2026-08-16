import React from 'react';
import { getSortedPostsData } from '../../lib/blog';
import BlogList from '../../components/BlogList';

export const metadata = {
    title: 'Insights | The Tech Philosophers',
    description: 'Essays, analysis and research notes about AI, emerging technology, human judgment and human impact.',
    alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
    const allPosts = getSortedPostsData();

    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="max-w-3xl mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights</h1>
                    <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                        Essays, analysis and research notes about AI, emerging technology and the human questions surrounding them.
                    </p>
                </div>

                <BlogList posts={allPosts} />
            </div>
        </div>
    );
}
