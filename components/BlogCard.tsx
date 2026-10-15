'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Card from './Card';

interface BlogCardProps {
    title: string;
    excerpt: string;
    category: string;
    slug: string;
    date?: string;
    status?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, category, slug, date, status }) => {
    return (
        <Link href={`/blog/${slug}`} className="block h-full">
            <Card className="h-full flex flex-col relative group overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-soft)] px-2 py-1 rounded-md">
                        {category}
                    </span>
                    <motion.div
                        className="text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors"
                        whileHover={{ rotate: 45 }}
                    >
                        <ArrowUpRight size={20} />
                    </motion.div>
                </div>

                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                    {title}
                </h3>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-[var(--border-color)] space-y-3">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--text-secondary)]">
                            {date ? <time dateTime={date}>{date}</time> : <span>Publication date unavailable</span>}
                            {status && <span>{status}</span>}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-primary)]">
                        Read article <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                </div>
            </Card>
        </Link>
    );
};

export default BlogCard;
