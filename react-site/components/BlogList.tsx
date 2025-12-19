'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import Button from './Button';

type BlogPost = {
    slug: string;
    title: string;
    date: string;
    category: string;
    tags: string[];
    excerpt: string;
    content: string;
    readingTime?: string;
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
    const [selectedCategory, setSelectedCategory] = useState('AI & Technology');

    // Define the specific order requested
    const orderedCategories = ['AI & Technology', 'Mythology', 'Education'];

    // Get other categories that exist but aren't in the specific list (just in case)
    const allCategories = Array.from(new Set(posts.map(post => post.category)));
    const otherCategories = allCategories.filter(c => !orderedCategories.includes(c));

    // Final display list: Requested ones + any others found
    const displayCategories = [...orderedCategories, ...otherCategories];

    const filteredPosts = selectedCategory === 'View All'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
                <div className="sticky top-32">
                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {displayCategories.map(category => (
                                <li key={category}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`block py-1 transition-colors text-left w-full ${selectedCategory === category
                                                ? 'text-[var(--accent-primary)] font-medium'
                                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => setSelectedCategory('View All')}
                                    className={`block py-1 transition-colors text-left w-full ${selectedCategory === 'View All'
                                            ? 'text-[var(--accent-primary)] font-medium'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    View All
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 bg-[var(--accent-soft)] rounded-2xl text-center">
                        <h4 className="font-bold mb-2 text-[var(--text-primary)]">Subscribe</h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                            Get the latest insights delivered to your inbox.
                        </p>
                        <Button className="w-full text-xs py-2">Join Newsletter</Button>
                    </div>
                </div>
            </aside>

            {/* Content Grid */}
            <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                        <div key={post.slug} className="h-[400px]">
                            <BlogCard
                                title={post.title}
                                excerpt={post.excerpt}
                                category={post.category}
                                slug={post.slug}
                                date={post.date}
                            />
                        </div>
                    ))}
                    {filteredPosts.length === 0 && (
                        <div className="col-span-full text-center py-12 text-[var(--text-secondary)]">
                            No posts found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
