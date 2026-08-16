import { Metadata } from 'next';
import Link from 'next/link';
import { Network, Mic2, PenTool } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

export const metadata: Metadata = {
    title: 'Services | The Tech Philosophers',
    description: 'Clear, simple formats for individuals, teams and organisations.',
};

const services = [
    {
        icon: Network,
        title: "AI & Architecture Guidance",
        description: "Strategic advice on integrating AI into enterprise systems.",
        items: [
            "Pega & AI Integration",
            "LLM Strategy",
            "System Design Reviews"
        ]
    },
    {
        icon: Mic2,
        title: "Talks & Workshops",
        description: "Engaging sessions on tech, philosophy, and future trends.",
        items: [
            "Corporate Seminars",
            "Educational Workshops",
            "Keynote Speaking"
        ]
    },
    {
        icon: PenTool,
        title: "Writing & Collaborations",
        description: "Thought leadership content and collaborative research.",
        items: [
            "Technical Articles",
            "Whitepapers",
            "Podcast Guests"
        ]
    }
];

export default function ServicesPage() {
    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">How I can help.</h1>
                    <p className="text-xl text-[var(--text-secondary)]">
                        Clear, simple formats for individuals, teams and organisations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {services.map((service, index) => (
                        <Card key={index} className="text-center h-full">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-soft)] text-[var(--accent-primary)] mb-6">
                                <service.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-[var(--text-secondary)] mb-6">
                                {service.description}
                            </p>
                            <ul className="text-left text-[var(--text-secondary)] space-y-2 pl-4 list-disc marker:text-[var(--accent-primary)]">
                                {service.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                <div className="text-center bg-[var(--bg-secondary)] p-12 rounded-[var(--radius-lg)] shadow-sm">
                    <h3 className="text-2xl md:text-3xl font-bold mb-8">
                        &ldquo;If you’re unsure where to start, let’s begin with a conversation.&rdquo;
                    </h3>
                    <Button href="/contact" variant="primary">
                        Contact Me
                    </Button>
                </div>
            </div>
        </div>
    );
}
