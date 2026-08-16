import type { Metadata } from 'next';
import Button from '../../components/Button';

export const metadata: Metadata = {
  title: 'About | The Tech Philosophers',
  description: 'Why The Tech Philosophers explores AI, emerging technology, human judgment and timeless wisdom.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return <div className="py-20"><div className="container-custom">
    <section className="max-w-4xl mb-20"><p className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm mb-4">About</p><h1 className="text-4xl lg:text-6xl font-bold mb-7 leading-tight">Technology is moving quickly. Human judgment still matters.</h1><p className="text-xl text-[var(--text-secondary)] leading-relaxed">The Tech Philosophers is a research and media platform exploring how AI and emerging technologies are changing the way we work, learn, think and live.</p><p className="text-xl text-[var(--text-secondary)] leading-relaxed mt-4">Modern technology examined through systems thinking, human experience and timeless wisdom.</p></section>
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
      <div><h2 className="text-3xl font-bold mb-5">Why this platform exists</h2><p className="text-[var(--text-secondary)] leading-relaxed mb-5">Most technology conversations focus on capability: what a system can automate, generate or optimize. The harder questions concern judgment, responsibility and human impact.</p><p className="text-[var(--text-secondary)] leading-relaxed">The Tech Philosophers creates space for those questions through essays, research notes, experiments and conversations. Philosophy, Bharatiya wisdom, education, society and leadership provide lenses—not disconnected subjects.</p></div>
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8"><h2 className="text-3xl font-bold mb-5">About the founder</h2><p className="text-[var(--text-secondary)] leading-relaxed mb-5">Raju Thoutu works at the intersection of enterprise technology, architecture, AI, education and human decision-making.</p><p className="text-[var(--text-secondary)] leading-relaxed">His professional background includes enterprise architecture, payments, workflow and decision automation, modernization, and AI-enabled transformation. The ideas shared here are generalized educational perspectives and do not represent client work or disclose proprietary information.</p></div>
    </section>
    <section className="border-t border-[var(--border-color)] pt-12 flex flex-col md:flex-row justify-between md:items-center gap-8"><div className="max-w-2xl"><h2 className="text-3xl font-bold mb-3">Read, explore and question.</h2><p className="text-[var(--text-secondary)]">Start with an insight, or visit the Labs to see ideas being explored in practice.</p></div><div className="flex gap-4"><Button href="/blog">Explore Insights</Button><Button href="/labs" variant="outline">Explore Labs</Button></div></section>
  </div></div>;
}
