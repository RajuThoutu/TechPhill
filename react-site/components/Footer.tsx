'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-20 mt-20">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
                    <div className="max-w-xs">
                        <h3 className="text-xl font-bold mb-4 text-gradient">The Tech Philosophers</h3>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                            Bridging modern technology with timeless wisdom to create meaningful systems and explore the "why" behind the "how."
                        </p>
                    </div>

                    <div className="flex gap-16 flex-wrap">
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Explore</h4>
                            <ul className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
                                <li><Link href="/blog" className="hover:text-[var(--accent-primary)] transition-colors">Insights</Link></li>
                                <li><Link href="/projects" className="hover:text-[var(--accent-primary)] transition-colors">Projects</Link></li>
                                <li><Link href="/podcasts" className="hover:text-[var(--accent-primary)] transition-colors">Podcasts</Link></li>
                                <li><Link href="/services" className="hover:text-[var(--accent-primary)] transition-colors">Services</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Connect</h4>
                            <ul className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
                                <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">YouTube</a></li>
                                <li><Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-color)] text-center text-sm text-[var(--text-secondary)]">
                    <p>&copy; {currentYear} The Tech Philosophers. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
