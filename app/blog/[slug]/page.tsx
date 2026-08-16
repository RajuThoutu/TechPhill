import { getPostData, getAllPostSlugs } from '../../../lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { Metadata } from 'next';

// Define custom components for MDX
const components = {
    h1: (props: any) => <h2 className="text-3xl lg:text-4xl font-bold mt-8 mb-4 leading-tight" {...props} />,
    h2: (props: any) => <h2 className="text-2xl lg:text-3xl font-bold mt-8 mb-4 leading-tight" {...props} />,
    h3: (props: any) => <h3 className="text-xl lg:text-2xl font-bold mt-6 mb-3 leading-tight" {...props} />,
    p: (props: any) => <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-6 text-[var(--text-secondary)] space-y-2" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-6 text-[var(--text-secondary)] space-y-2" {...props} />,
    li: (props: any) => <li className="pl-1" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-[var(--accent-primary)] pl-6 italic my-8 text-xl text-[var(--text-primary)] bg-[var(--bg-secondary)] py-4 rounded-r-lg" {...props} />
    ),
    a: (props: any) => <a className="text-[var(--accent-primary)] hover:underline font-medium" {...props} />,
    img: (props: any) => (
        <div className="my-8 rounded-xl overflow-hidden shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element -- MDX accepts external and unknown image sources. */}
            <img className="w-full" {...props} alt={props.alt || 'Blog image'} />
        </div>
    ),
    code: (props: any) => <code className="bg-[var(--bg-secondary)] text-[var(--accent-primary)] px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
    pre: (props: any) => <pre className="bg-[#1e1e1e] text-white p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props} />,
};

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path) => ({
        slug: path.params.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const postData = getPostData(params.slug);
    return {
        title: `${postData.title} | The Tech Philosophers`,
        description: postData.excerpt,
        alternates: { canonical: `/blog/${params.slug}` },
        openGraph: { type: 'article', title: postData.title, description: postData.excerpt, url: `/blog/${params.slug}` },
    };
}

export default async function Post({ params }: { params: { slug: string } }) {
    const postData = getPostData(params.slug);

    return (
        <div className="py-20">
            <div className="container-custom max-w-4xl">
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Insights</span>
                    </Link>

                    <div className="flex flex-wrap gap-4 items-center text-sm text-[var(--text-secondary)] mb-6">
                        <span className="flex items-center gap-1.5 bg-[var(--accent-soft)] text-[var(--accent-primary)] px-3 py-1 rounded-full font-medium">
                            <Tag size={14} />
                            {postData.category}
                        </span>
                        {postData.status && <span className="flex items-center gap-1.5">{postData.status}</span>}
                        <span className="flex items-center gap-1.5">
                            <Clock size={16} />
                            {postData.readingTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {postData.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed border-b border-[var(--border-color)] pb-8">
                        {postData.excerpt}
                    </p>
                </div>

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <MDXRemote source={postData.content} components={components} />
                </article>

                {/* Tags */}
                <div className="mt-16 pt-8 border-t border-[var(--border-color)]">
                    <h4 className="font-bold mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {postData.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-sm text-[var(--text-secondary)]">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
