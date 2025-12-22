'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileText, BookOpen, ChevronRight, Bell, X } from 'lucide-react';
import Link from 'next/link';
import updatesData from '../content/updates.json';

const iconMap = {
    podcast: <Mic size={14} />,
    blog: <FileText size={14} />,
    paper: <BookOpen size={14} />,
};

export function LatestUpdatesTicker() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-cycle updates
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % updatesData.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(timer);
    }, [isPaused]);

    const currentUpdate = updatesData[currentIndex];

    // Only render if we have updates
    if (!updatesData.length) return null;

    return (
        <div
            className="flex items-center gap-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <Link href={currentUpdate.link}>
                <motion.div
                    className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-[var(--border-color)] shadow-lg rounded-full px-4 py-2 hover:border-[var(--accent-primary)] transition-colors cursor-pointer"
                    layout
                >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent-primary)] shrink-0">
                        {iconMap[currentUpdate.type as keyof typeof iconMap] || <FileText size={14} />}
                    </div>

                    <div className="relative h-6 w-64 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute w-full flex flex-col justify-center h-full"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-sm font-medium text-[var(--text-primary)] truncate pr-2">
                                        {currentUpdate.title}
                                    </span>
                                    <span className="text-[10px] text-[var(--text-secondary)] shrink-0 whitespace-nowrap">
                                        {currentUpdate.date}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <ChevronRight size={14} className="text-[var(--text-secondary)]" />
                </motion.div>
            </Link>
        </div>
    );
}

export function LatestUpdatesBell() {
    const [showList, setShowList] = useState(false);

    return (
        <div className="relative z-40">
            <button
                onMouseEnter={() => setShowList(true)}
                onClick={() => setShowList((prev) => !prev)}
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg border border-[var(--border-color)] transition-colors ${showList
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[var(--text-secondary)] hover:text-[var(--accent-primary)]'
                    }`}
            >
                <Bell size={18} />
                <span className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </button>

            <AnimatePresence>
                {showList && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setShowList(true)}
                        onMouseLeave={() => setShowList(false)}
                        className="absolute top-full mt-4 right-0 w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-[var(--border-color)] shadow-xl rounded-2xl overflow-hidden z-50"
                    >
                        <div className="p-3 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-secondary)]/50">
                            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">All Updates</span>
                            <button onClick={() => setShowList(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                <X size={14} />
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {updatesData.map((update) => (
                                <Link
                                    key={update.id}
                                    href={update.link}
                                    className="flex items-start gap-3 p-3 hover:bg-[var(--accent-soft)] transition-colors border-b border-[var(--border-color)] last:border-0 group"
                                >
                                    <div className="mt-1 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                        {iconMap[update.type as keyof typeof iconMap]}
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-medium text-[var(--text-primary)] leading-tight mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                                            {update.title}
                                        </h5>
                                        <p className="text-xs text-[var(--text-secondary)]">{update.date}</p>
                                    </div>
                                    <ChevronRight size={14} className="ml-auto self-center text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>
                        <div className="p-2 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/30 text-center">
                            <Link href="/blog" className="text-xs text-[var(--accent-primary)] font-medium hover:underline">
                                View Archive &rarr;
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Keep default export as a combined wrapper for backward compatibility if needed, 
// or simplified to just export the parts. 
// Given the user request to split, we'll export the parts. 
// But to avoid breaking imports immediately, let's make default export null or a wrapper.
// Actually, I will update imports in Header.tsx and page.tsx. 
export default function LatestUpdates() {
    return (
        <div className="flex flex-col items-end gap-2">
            <LatestUpdatesTicker />
            <LatestUpdatesBell />
        </div>
    )
}
