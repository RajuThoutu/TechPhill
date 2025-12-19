import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-main' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'The Tech Philosophers | Bridging Wisdom and Tech',
  description: 'Technologist, Educator, and Podcaster merging modern technology with time-less wisdom.',
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
