import type { Metadata } from 'next';
import { Mic2 } from 'lucide-react';
import Card from '../../components/Card';

export const metadata: Metadata = {
  title: 'Podcast | The Tech Philosophers',
  description: 'Conversations about AI, technology, education, society and the ideas shaping our intelligent future.',
  alternates: { canonical: '/podcasts' },
};

export default function PodcastPage() {
  return <div className="py-20"><div className="container-custom">
    <section className="max-w-3xl mb-14"><p className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm mb-4">Podcast</p><h1 className="text-4xl md:text-6xl font-bold mb-6">The Tech Philosophers Podcast</h1><p className="text-xl text-[var(--text-secondary)] leading-relaxed">Conversations about AI, technology, education, society and the ideas shaping our intelligent future.</p></section>
    <Card className="max-w-4xl !p-10 md:!p-14"><div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent-primary)] flex items-center justify-center mb-7"><Mic2 size={28}/></div><p className="text-[var(--accent-primary)] text-sm font-bold uppercase tracking-wider mb-3">Coming soon</p><h2 className="text-3xl font-bold mb-4">Conversations are in development.</h2><p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">Episodes will appear here as they are published. The aim is thoughtful, practical dialogue about intelligent systems and their effects on work, learning, institutions and human experience.</p></Card>
  </div></div>;
}
