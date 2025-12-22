'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
    return (
        <motion.div
            className={`bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-8 border border-[var(--border-color)] shadow-sm ${className}`}
            whileHover={hoverEffect ? {
                y: -5,
                boxShadow: "var(--shadow-card)",
                borderColor: "var(--accent-primary)"
            } : {}}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
