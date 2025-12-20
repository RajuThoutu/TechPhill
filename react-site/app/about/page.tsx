'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';

export default function About() {
    return (
        <div className="pt-24 pb-20">
            <div className="container-custom">
                {/* Page Hero */}
                <section className="mb-20 max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm mb-4"
                    >
                        About
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                    >
                        Technologist, educator, podcaster — bridging ancient wisdom with tomorrow’s systems.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[var(--text-secondary)] leading-relaxed"
                    >
                        Raju Thoutu is the mind behind The Tech Philosophers, a platform built to translate emerging technology and Bharatiya philosophy into everyday decisions for leaders, parents, and curious learners.
                    </motion.p>
                </section>

                {/* Split Section: Who I am / Background */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Who I am</h2>
                        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                            I am a Lead System Architect and AI practitioner guiding organizations as they modernize responsibly. From low-code automations to enterprise data strategies, my focus remains consistent: design technology that respects people.
                        </p>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Outside boardrooms, I teach, facilitate workshops, and host conversations that simplify dense topics into actionable clarity.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">My background</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="w-2 h-2 mt-2 bg-[var(--accent-primary)] rounded-full shrink-0"></span>
                                <div>
                                    <strong className="block text-[var(--text-primary)]">Hyderabad roots:</strong>
                                    <span className="text-[var(--text-secondary)]">Grew up immersed in storytelling, mathematics, and classical philosophy.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-2 h-2 mt-2 bg-[var(--accent-primary)] rounded-full shrink-0"></span>
                                <div>
                                    <strong className="block text-[var(--text-primary)]">Journey to the US:</strong>
                                    <span className="text-[var(--text-secondary)]">Built cross-continental expertise in enterprise architecture and transformation.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-2 h-2 mt-2 bg-[var(--accent-primary)] rounded-full shrink-0"></span>
                                <div>
                                    <strong className="block text-[var(--text-primary)]">Lead System Architect:</strong>
                                    <span className="text-[var(--text-secondary)]">Helping Fortune 500 teams align strategy, process, and data with purposeful design.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-2 h-2 mt-2 bg-[var(--accent-primary)] rounded-full shrink-0"></span>
                                <div>
                                    <strong className="block text-[var(--text-primary)]">AI practitioner:</strong>
                                    <span className="text-[var(--text-secondary)]">Prototyping copilots, knowledge engines, and education models grounded in ethics.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Surface Section: Why it exists */}
                <section className="bg-[var(--bg-secondary)] rounded-3xl p-8 lg:p-12 mb-24 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Why The Tech Philosophers exists</h2>
                        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                            Technology shapes behavior, yet wisdom gives it meaning. This platform combines research, storytelling, and systems thinking to help people make choices that honor both progress and humanity. Everything is written in simple English, intentionally calm, and free from buzzwords.
                        </p>
                    </div>
                </section>

                {/* Split Section: Vision / How we work */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Long-term vision</h2>
                        <ul className="space-y-4">
                            {['AI education that builds discernment, not dependence.',
                                'Holistic schooling models inspired by Anushtan’s research.',
                                'Resources for parents guiding digital natives with empathy.',
                                'Spaces for technologists to explore philosophy without judgment.'].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full px-2 py-1 text-xs font-bold mt-0.5">{(i + 1).toString().padStart(2, '0')}</span>
                                        <span className="text-[var(--text-secondary)]">{item}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">How we work</h2>
                        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                            The Tech Philosophers brand is modular and extendable. Every page, playlist, and research note nests into a broader knowledge system — ready to scale to hundreds of insights without losing clarity or warmth.
                        </p>
                        <Button href="/blog">Explore the insights system</Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
