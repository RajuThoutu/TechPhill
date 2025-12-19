import React from 'react';

export default function GenericPage({
    title,
    subtitle
}: {
    title: string;
    subtitle?: string
}) {
    return (
        <div className="py-24 text-center">
            <div className="container-custom">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                {subtitle && <p className="text-[var(--text-secondary)]">{subtitle}</p>}
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border-color)] rounded-2xl mt-12">
                    <p className="text-[var(--text-secondary)]">Content coming soon...</p>
                </div>
            </div>
        </div>
    );
}
