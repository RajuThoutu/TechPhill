import Image from 'next/image';
import { Bot, Brain, BookOpen, GraduationCap, Globe, Landmark } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import BlogCard from '../components/BlogCard';
import { getSortedPostsData } from '../lib/blog';

const lenses = [
  { title: 'Human Judgment', copy: 'Keeping responsibility, context and discernment at the center of intelligent systems.', icon: Brain },
  { title: 'Philosophy & Timeless Wisdom', copy: 'Using enduring ideas to examine fast-moving technological choices.', icon: BookOpen },
  { title: 'Education', copy: 'Understanding how AI changes learning, teaching and human development.', icon: GraduationCap },
  { title: 'Society', copy: 'Studying how technology reshapes institutions, culture and everyday life.', icon: Globe },
  { title: 'Leadership', copy: 'Helping decision-makers navigate uncertainty without surrendering human agency.', icon: Landmark },
];

export default function Home() {
  const posts = getSortedPostsData().slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-b from-[var(--accent-soft)] to-transparent opacity-40 -z-10 blur-3xl" />
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-14 lg:gap-20 items-center">
          <div>
            <p className="text-[var(--accent-primary)] font-semibold tracking-wider text-sm mb-5">Thinking Beyond Technology.</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.08] max-w-4xl">
              Exploring how AI and emerging technologies are changing the way we work, learn, think and live.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-9 leading-relaxed max-w-2xl">
              Research, experiments and conversations connecting technology, human judgment and timeless wisdom.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/blog">Explore Insights</Button>
              <Button href="/labs" variant="outline">Explore Labs</Button>
            </div>
          </div>

          <div className="relative max-w-md mx-auto lg:mr-0">
            <div className="relative z-10 bg-[var(--bg-card)] p-3 rounded-[var(--radius-lg)] shadow-2xl border border-[var(--border-color)]">
              <Image src="/images/raju-profile-v2.png" alt="Raju Thoutu, founder of The Tech Philosophers" width={500} height={500} className="w-full h-auto rounded-[var(--radius-md)] object-cover" priority />
            </div>
            <div className="absolute top-6 right-6 w-full h-full bg-[var(--accent-primary)] rounded-[var(--radius-lg)] -z-10 opacity-10" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
        <div className="container-custom">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 text-[var(--accent-primary)] mb-4"><Bot size={24} /><span className="font-semibold uppercase tracking-wider text-sm">Primary focus</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI & Emerging Technology, examined through a human lens</h2>
            <p className="text-lg text-[var(--text-secondary)]">Every area of the platform connects to one question: how is technology changing humans, institutions, decisions, learning and society?</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {lenses.map(({ title, copy, icon: Icon }) => (
              <Card key={title} className="!p-6">
                <Icon className="text-[var(--accent-primary)] mb-5" size={26} />
                <h3 className="text-lg font-bold mb-3">{title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
            <div><span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">Insights</span><h2 className="text-4xl font-bold mt-2">Ideas in progress</h2><p className="text-[var(--text-secondary)] mt-2">Essays and research notes about technology, judgment and human impact.</p></div>
            <Button href="/blog" variant="outline">View all insights</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => <BlogCard key={post.slug} {...post} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="container-custom flex flex-col md:flex-row justify-between md:items-center gap-8">
          <div className="max-w-2xl"><p className="text-sky-300 font-semibold uppercase tracking-wider text-sm mb-3">Labs</p><h2 className="text-3xl md:text-4xl font-bold mb-4">Applied research, architecture explorations and prototypes.</h2><p className="text-slate-300 text-lg">Evolving areas of inquiry—not finished products or commercial case studies.</p></div>
          <Button href="/labs">Explore Labs</Button>
        </div>
      </section>
    </div>
  );
}
