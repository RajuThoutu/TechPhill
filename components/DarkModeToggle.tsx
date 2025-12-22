'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full hover:bg-[var(--bg-primary)] transition-colors focus:outline-none"
            aria-label="Toggle Dark Mode"
        >
            <div className="relative w-6 h-6 overflow-hidden">
                <motion.div
                    initial={false}
                    animate={{
                        y: theme === 'dark' ? -30 : 0,
                        opacity: theme === 'dark' ? 0 : 1
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-[var(--accent-primary)]"
                >
                    <Sun size={20} />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        y: theme === 'dark' ? 0 : 30,
                        opacity: theme === 'dark' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-[var(--accent-primary)]"
                >
                    <Moon size={20} />
                </motion.div>
            </div>
        </button>
    );
};

export default DarkModeToggle;
