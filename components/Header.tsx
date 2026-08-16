'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import Button from './Button';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Insights', href: '/blog' },
        { name: 'Labs', href: '/labs' },
        { name: 'Podcast', href: '/podcasts' },
        { name: 'About', href: '/about' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(15,23,42,0.8)] backdrop-blur-md shadow-sm border-b border-[var(--border-color)]'
                : 'bg-transparent'
                }`}
        >
            <div className="container-custom h-[var(--header-height)] flex items-center justify-between">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">
                        Tech Philosophers
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-[var(--accent-primary)] ${isActive(link.href) ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 border-l border-[var(--border-color)] pl-4">
                        <DarkModeToggle />
                        <Button variant="outline" href="/contact" className="!py-2 !px-4 !text-xs">
                            Contact
                        </Button>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <DarkModeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-[var(--text-primary)]"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden"
                    >
                        <div className="container-custom py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-lg font-medium py-2 ${isActive(link.href) ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-[var(--border-color)] my-2" />
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium py-2 text-[var(--text-primary)]"
                            >
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
};

export default Header;
