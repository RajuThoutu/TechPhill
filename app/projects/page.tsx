import { Metadata } from 'next';
import Link from 'next/link';
import Card from '../../components/Card';
import Button from '../../components/Button';

export const metadata: Metadata = {
    title: 'Projects | The Tech Philosophers',
    description: 'Living laboratories where technology, education, and storytelling meet.',
};

const projects = [
    {
        title: "Anushtan Holistic School",
        category: "Education Research",
        summary: "Philosophy • Model • Research • Vision",
        description: [
            "Curriculum architecture balancing STEM, arts, and dharmic wisdom.",
            "AI-assisted personalized guidance with human mentors.",
            "Campus planning integrating sacred geometry and modern ergonomics.",
            "Community labs for parents and educators to co-create rituals."
        ],
        action: "View research blueprint",
        link: "#"
    },
    {
        title: "Applied AI & Experience Demos",
        category: "AI Experiments",
        summary: "Azure Foundry • Pega + AI • Postman demos",
        description: [
            "Composable AI copilots for customer service, learning, and design.",
            "Knowledge graph visualizations using Sri Yantra-inspired layouts.",
            "Scenario libraries for responsible AI decisions.",
            "Hands-on walkthroughs with GitHub repos and API collections."
        ],
        action: "Explore experiments",
        link: "#"
    },
    {
        title: "Architecture & Transformation",
        category: "Enterprise Work",
        summary: "Citi • ConEd • MasterCard • CRMS • Upgrades",
        description: [
            "Designing platforms that respect regulations, scale, and user empathy.",
            "Migration accelerators for legacy to cloud transformations.",
            "Playbooks aligning business, architecture, and Bharatiya principles.",
            "Coaching leaders on AI literacy and human-centric metrics."
        ],
        action: "See enterprise case notes",
        link: "#"
    },
    {
        title: "Podcasts & Web Content",
        category: "Media & Community",
        summary: "Telugu + English",
        description: [
            "Long-form episodes blending mythological narratives with modern dilemmas.",
            "Video explainers with calm motion graphics and neural-inspired visuals.",
            "Short reels highlighting parenting, AI ethics, and emotional intelligence.",
            "Community Q&A sessions, workshops, and live stream archives."
        ],
        action: "Visit the podcasts hub",
        link: "/podcasts"
    }
];

export default function ProjectsPage() {
    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm mb-4">Projects</p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Living laboratories where technology, education, and storytelling meet.</h1>
                    <p className="text-xl text-[var(--text-secondary)]">
                        Each project is a module in the Tech Philosophers ecosystem — built to scale, share, and evolve.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <Card key={index} className="flex flex-col h-full group hover:border-[var(--accent-primary)] transition-colors">
                            <header className="mb-4">
                                <p className="text-[var(--accent-primary)] font-medium text-sm mb-2 uppercase tracking-wide">
                                    {project.category}
                                </p>
                                <h3 className="text-2xl font-bold">{project.title}</h3>
                            </header>

                            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-6 border-b border-[var(--border-color)] pb-4">
                                {project.summary}
                            </p>

                            <ul className="text-[var(--text-secondary)] mb-8 flex-grow space-y-2 list-disc pl-5">
                                {project.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <Button
                                    href={project.link}
                                    variant="outline"
                                    className={project.link === '#' ? 'opacity-50 cursor-not-allowed w-full justify-center' : 'w-full justify-center'}
                                >
                                    {project.action} &rarr;
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
