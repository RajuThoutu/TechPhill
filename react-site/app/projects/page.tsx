import { Metadata } from 'next';
import Link from 'next/link';
import Card from '../../components/Card';
import Button from '../../components/Button';

export const metadata: Metadata = {
    title: 'Projects | The Tech Philosophers',
    description: 'A showcase of my work in technology, education, and media.',
};

const projects = [
    {
        title: "Research on Schooling",
        category: "Long-term Vision",
        description: "Designing a new educational model that integrates modern curriculum with holistic development practices.",
        action: "Learn More (Coming Soon)",
        link: "#"
    },
    {
        title: "AI in Enterprise Systems",
        category: "Research & Implementation",
        description: "Experiments and implementations of Generative AI within large-scale enterprise platforms like Pega.",
        action: "View Case Study (Coming Soon)",
        link: "#"
    },
    {
        title: "Platform Upgrades",
        category: "Performance Journeys",
        description: "Leading major platform upgrades and performance optimization initiatives for Fortune 500 companies.",
        action: "View Details (Coming Soon)",
        link: "#"
    },
    {
        title: "Podcasts & Content",
        category: "Media Work",
        description: "Producing and hosting podcasts in Telugu and English, exploring tech and philosophy.",
        action: "Listen Now",
        link: "/podcasts"
    }
];

export default function ProjectsPage() {
    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h1>
                    <p className="text-xl text-[var(--text-secondary)]">
                        A showcase of my work in technology, education, and media.
                    </p>
                </div>

                <div className="mb-12">
                    <Link href="/" className="text-[var(--accent-primary)] hover:underline flex items-center gap-2">
                        &larr; Back to Home
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <Card key={index} className="flex flex-col h-full">
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-[var(--accent-primary)] font-medium text-sm mb-4 uppercase tracking-wide">
                                {project.category}
                            </p>
                            <p className="text-[var(--text-secondary)] mb-8 flex-grow">
                                {project.description}
                            </p>
                            <div>
                                <Button
                                    href={project.link}
                                    variant="outline"
                                    className={project.link === '#' ? 'opacity-50 cursor-not-allowed' : ''}
                                >
                                    {project.action}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
