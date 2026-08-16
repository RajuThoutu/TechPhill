import type { MetadataRoute } from 'next';
import { getAllPostSlugs } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.thetechphilosophers.com';
  const pages = ['', '/blog', '/labs', '/podcasts', '/about', '/contact'];
  return [
    ...pages.map(path => ({ url: `${base}${path}`, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const })),
    ...getAllPostSlugs().map(({ params }) => ({ url: `${base}/blog/${params.slug}`, changeFrequency: 'monthly' as const })),
  ];
}
