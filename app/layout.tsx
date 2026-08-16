import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-main' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thetechphilosophers.com'),
  title: 'The Tech Philosophers | AI, Human Judgment and Timeless Wisdom',
  description: 'Research, experiments and conversations connecting AI, emerging technology, human judgment and timeless wisdom.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'The Tech Philosophers', title: 'The Tech Philosophers', description: 'Exploring how AI and emerging technologies are changing the way we work, learn, think and live.', url: '/' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-grow pt-[var(--header-height)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
