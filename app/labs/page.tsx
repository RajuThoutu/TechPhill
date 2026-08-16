import type { Metadata } from 'next';
import { Bot, Building2, GraduationCap, Mic2 } from 'lucide-react';
import Card from '../../components/Card';

export const metadata: Metadata = {
  title: 'Labs | The Tech Philosophers',
  description: 'Evolving experiments, prototypes and applied research across AI, architecture, education and media.',
  alternates: { canonical: '/labs' },
};

const labs = [
  { title: 'AI Banking Lab', icon: Building2, description: 'Exploring responsible AI applications across banking operations, payments, servicing, disputes, fraud, decisioning and customer experience.', topics: ['Human-in-the-loop decisioning', 'Responsible automation', 'Payments and servicing patterns'] },
  { title: 'AI Architecture Lab', icon: Bot, description: 'Experiments with AI agents, RAG, knowledge systems, enterprise orchestration, workflow automation and human-in-the-loop architectures.', topics: ['Agent and RAG patterns', 'Knowledge systems', 'Enterprise AI architecture'] },
  { title: 'Future of Education Lab', icon: GraduationCap, description: 'Exploring AI-assisted learning, holistic education, educational systems and the relationship between technology and human development.', topics: ['AI-assisted learning', 'Human development', 'Education system design'] },
  { title: 'Tech Philosophers Media Lab', icon: Mic2, description: 'Experiments in podcasts, interviews, essays, visual explainers and new ways of communicating complex technological and philosophical ideas.', topics: ['Podcast and interview formats', 'Visual explainers', 'Research communication'] },
];

export default function LabsPage() {
  return <div className="py-20"><div className="container-custom">
    <div className="max-w-3xl mb-14"><p className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm mb-4">Labs</p><h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Exploration before certainty.</h1><p className="text-xl text-[var(--text-secondary)] leading-relaxed">Labs are evolving areas for research, prototypes and architecture exploration. They document questions, experiments and practical learning—not completed commercial projects.</p></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{labs.map(({title,icon:Icon,description,topics}) => <Card key={title} className="h-full !p-8"><div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] text-[var(--accent-primary)] flex items-center justify-center mb-6"><Icon size={25}/></div><div className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)] mb-3">In development</div><h2 className="text-2xl font-bold mb-4">{title}</h2><p className="text-[var(--text-secondary)] leading-relaxed mb-6">{description}</p><ul className="space-y-2 border-t border-[var(--border-color)] pt-5">{topics.map(topic=><li key={topic} className="text-sm text-[var(--text-secondary)] flex gap-3"><span className="text-[var(--accent-primary)]">—</span>{topic}</li>)}</ul></Card>)}</div>
  </div></div>;
}
