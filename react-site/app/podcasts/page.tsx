import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { Bot, BookOpen, GraduationCap, Play } from 'lucide-react';
import Card from '../../components/Card';

export const metadata: Metadata = {
    title: 'Podcasts & Videos | The Tech Philosophers',
    description: 'Conversations on technology, philosophy, and life.',
};

async function getPodcastData() {
    const filePath = path.join(process.cwd(), 'content/podcasts.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
}

const iconMap: any = {
    Bot: Bot,
    BookOpen: BookOpen,
    GraduationCap: GraduationCap
};

export default async function PodcastsPage() {
    const data = await getPodcastData();

    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Podcasts & Videos</h1>
                    <p className="text-xl text-[var(--text-secondary)]">
                        Conversations on technology, philosophy, and life.
                    </p>
                </div>

                {/* Featured Video */}
                <div className="max-w-4xl mx-auto mb-20">
                    <Card className="!p-0 overflow-hidden relative group">
                        <div className="relative pt-[56.25%] bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${data.featured.youtubeId}`}
                                title="YouTube video player"
                                className="absolute top-0 left-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-2">{data.featured.title}</h3>
                            <p className="text-[var(--text-secondary)]">{data.featured.description}</p>
                        </div>
                    </Card>
                </div>

                {/* Playlists */}
                <h2 className="text-3xl font-bold mb-8">Playlists</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.playlists.map((playlist: any) => {
                        const Icon = iconMap[playlist.thumbnail] || Play;
                        return (
                            <Card key={playlist.id} className="text-center group cursor-pointer">
                                <div className="w-full h-40 bg-[var(--bg-primary)] rounded-[var(--radius-md)] mb-6 flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-105 transition-transform duration-300">
                                    <Icon size={48} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-xl font-bold mb-2">{playlist.title}</h4>
                                <p className="text-[var(--text-secondary)] text-sm">{playlist.description}</p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
