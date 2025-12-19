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
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-[var(--accent-soft)] to-transparent opacity-50 -z-10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-50 -z-10 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4"></div>

        <div className="container-custom relative">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              {/* Removed "The Tech Philosophers" text span */}

              <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                Hi, I'm <br />
                <span className="text-gradient">Raju Thoutu</span>.
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg">
                Technologist, Educator, and Podcaster. Merging modern technology with timeless Indic wisdom to create
                systems that are not just efficient, but meaningful.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Button href="/blog">View Insights</Button>
                <Button href="/contact" variant="outline">Get in Touch</Button>
              </motion.div>
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

      {/* Core Pillars Section */}
      <section className="py-24 bg-[var(--bg-secondary)] relative">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Pillars</h2>
            <p className="text-[var(--text-secondary)] text-lg">
              My work spans across four key dimensions, bridging the gap between ancient wisdom and future tech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Bot size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">AI & Tech Architecture</h4>
              <p className="text-[var(--text-secondary)] text-sm">Enterprise automation, LLMs, and scalable systems.</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <BookOpen size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Mythology & Analogies</h4>
              <p className="text-[var(--text-secondary)] text-sm">Interpreting epics like Mahabharata for modern life.</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <GraduationCap size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Education & Parenting</h4>
              <p className="text-[var(--text-secondary)] text-sm">Reimagining learning with Indic and US models.</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 mx-auto bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <Globe size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Society & Deep Thoughts</h4>
              <p className="text-[var(--text-secondary)] text-sm">Cultural insights and sociological trends.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Thoughts Preview */}
      <section className="py-24">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">Blog</span>
              <h2 className="text-4xl font-bold mt-2">Latest Thoughts</h2>
            </div>
            <Button href="/blog" variant="outline" className="hidden md:inline-flex">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogCard
              category="AI & Tech"
              title="From Pega logs to language models"
              excerpt="Tracing the evolution of enterprise automation to generative AI."
              slug="pega-to-llms"
              date="Oct 12, 2023"
            />
            <BlogCard
              category="Mythology"
              title="If Rama stood where Arjuna stood"
              excerpt="A philosophical experiment comparing two great archetypes of Dharma."
              slug="rama-vs-arjuna"
              date="Sep 28, 2023"
            />
            <BlogCard
              category="Education"
              title="US Pre-K, Bharatiya roots"
              excerpt="Bridging early childhood education models for the modern diaspora."
              slug="us-prek-bharatiya-roots"
              date="Aug 15, 2023"
            />
          </div>

          <div className="mt-8 text-center md:hidden">
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
    </div>
  );
}
