'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bot, GraduationCap, Globe, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import BlogCard from '../components/BlogCard';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 50 }
  }
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-32 lg:pb-40 overflow-hidden text-center md:text-left">
        {/* Background Gradients - Optimized for Performance */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-[var(--accent-soft)] to-transparent opacity-50 -z-10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 will-change-transform" style={{ transform: 'translate3d(33%, -25%, 0)' }}></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-50 -z-10 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4 will-change-transform" style={{ transform: 'translate3d(-25%, 25%, 0)' }}></div>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              <motion.p variants={itemVariants} className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm mb-4">
                Where Technology Meets Timeless Wisdom
              </motion.p>

              <motion.h1 variants={itemVariants} className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Guidance for thinkers, builders, and parents navigating intelligent futures.
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg">
                AI, digital transformation, mythology, education systems, and societal change — simplified in calm, meaningful language by technologist and educator <span className="text-gradient font-bold">Raju Thoutu</span>.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                <Button href="/blog">Explore Insights</Button>
                <Button href="/podcasts" variant="outline">Watch Podcasts</Button>
              </motion.div>

              {/* Metrics */}
              <motion.dl variants={itemVariants} className="grid grid-cols-3 gap-6 border-t border-[var(--border-color)] pt-8">
                <div>
                  <dt className="text-sm text-[var(--text-secondary)]">Insights</dt>
                  <dd className="text-2xl font-bold">320+</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--text-secondary)]">Plays</dt>
                  <dd className="text-2xl font-bold">95K+</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--text-secondary)]">Readers</dt>
                  <dd className="text-2xl font-bold">18K+</dd>
                </div>
              </motion.dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative z-10 bg-[var(--bg-card)] p-4 rounded-[var(--radius-lg)] shadow-2xl border border-[var(--border-color)] rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/raju-profile-v2.png"
                  alt="Raju Thoutu"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-[var(--radius-md)] object-cover grayscale-0 hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
              {/* Decorative elements behind image */}
              <div className="absolute top-10 right-10 w-full h-full bg-[var(--accent-primary)] rounded-[var(--radius-lg)] -z-10 opacity-10 rotate-6"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section - "Navigate the ecosystem" */}
      <section className="py-24 bg-[var(--bg-secondary)] relative">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Navigate the ecosystem</h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Modular destinations designed like a dashboard for quick exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:border-[var(--accent-primary)] transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Bot size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">AI & Emerging Tech</h4>
              <p className="text-[var(--text-secondary)] text-sm">Frameworks, enterprise architecture, applied AI toolkits.</p>
            </Card>

            <Card className="text-center group hover:border-[var(--accent-primary)] transition-colors">
              <div className="w-16 h-16 mx-auto bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Mythology & Analogies</h4>
              <p className="text-[var(--text-secondary)] text-sm">Mahabharata, Ramayana, Gita and modern leadership parallels.</p>
            </Card>

            <Card className="text-center group hover:border-[var(--accent-primary)] transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Education & Research</h4>
              <p className="text-[var(--text-secondary)] text-sm">Hybrid learning models, child psychology, school design.</p>
            </Card>

            <Card className="text-center group hover:border-[var(--accent-primary)] transition-colors">
              <div className="w-16 h-16 mx-auto bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Society & Deep Thoughts</h4>
              <p className="text-[var(--text-secondary)] text-sm">Culture, work, emotional intelligence, conscious living.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Insights */}
      <section className="py-24">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">Recent Insights</span>
              <h2 className="text-4xl font-bold mt-2">Fresh thinking</h2>
              <p className="text-[var(--text-secondary)] mt-2">Across technology, mythology, education, and society.</p>
            </div>
            <Button href="/blog" variant="outline" className="hidden md:inline-flex">View all insights</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard
              category="Technology & AI"
              title="Designing enterprise copilots that respect human judgment"
              excerpt="Blueprint for blending low-code platforms with trusted guardrails and Bharatiya ethics."
              slug="enterprise-copilots"
              date="Oct 12, 2023"
            />
            <BlogCard
              category="Mythology & Analogies"
              title="If Rama replaced Arjuna in Kurukshetra"
              excerpt="A reflective scenario on duty, restraint, and the science of timely intervention."
              slug="rama-vs-arjuna"
              date="Sep 28, 2023"
            />
            <BlogCard
              category="Education & Research"
              title="Hybrid learning rhythms for holistic schools"
              excerpt="Integrating Montessori, CBSE, and Gurukula principles into a future-ready timetable."
              slug="hybrid-learning"
              date="Aug 15, 2023"
            />
            <BlogCard
              category="Society & Deep Thoughts"
              title="Material success vs. human connection in the AI era"
              excerpt="Why purposeful relationships become the competitive advantage for Gen Z leaders."
              slug="success-vs-connection"
              date="Jul 22, 2023"
            />
            <BlogCard
              category="Technology & AI"
              title="Pega + Azure AI: Orchestrating value-first automations"
              excerpt="A system architecture walkthrough with design notes, APIs, and measurement models."
              slug="pega-azure-ai"
              date="Jun 10, 2023"
            />
            <BlogCard
              category="Mythology & Analogies"
              title="Why Krishna intervened before Kamsa’s downfall"
              excerpt="Exploring risk sensing, moral calculus, and strategic empathy for modern leaders."
              slug="krishna-leadership"
              date="May 05, 2023"
            />
          </div>

          <div className="mt-12 text-center md:hidden">
            <Button href="/blog" variant="outline">View All Articles</Button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container-custom relative z-10">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-display font-medium leading-tight max-w-4xl mx-auto"
          >
            "Knowledge becomes wisdom only when it transforms your life."
          </motion.blockquote>
          <div className="w-20 h-1 bg-[var(--accent-primary)] mx-auto mt-10 rounded-full"></div>
        </div>
      </section>

      {/* Newsletter Section - [New] from V1 */}
      <section className="py-24 bg-[var(--bg-card)] border-y border-[var(--border-color)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Think Better. Live Better. Build Better.</h2>
            <p className="text-[var(--text-secondary)] mb-8">Weekly email reflections blending practical technology choices with ancient Indian wisdom.</p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-1 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                required
              />
              <Button type="submit">Join Newsletter</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
