'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    href,
    onClick,
    className = '',
    type = 'button'
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer";

    const variants = {
        primary: "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-transparent",
        secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:-translate-y-0.5",
        outline: "bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--text-primary)] hover:text-white hover:border-[var(--text-primary)]"
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href}>
                <motion.div
                    className={combinedClassName}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {children}
                </motion.div>
            </Link>
        );
    }

    return (
        <motion.button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
