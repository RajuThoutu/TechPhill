import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | The Tech Philosophers',
  description: 'Contact The Tech Philosophers about research, conversations and collaboration.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
