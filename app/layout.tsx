import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'CubixSkill — Build, Sell & Manage Your Online Academy',
    template: '%s | CubixSkill Platform',
  },
  description:
    'The all-in-one platform for instructors to create online courses, conduct live classes, scan OMR quizzes, issue QR-verifiable certificates, and launch branded academy websites.',
  keywords: [
    'Online Academy Builder',
    'Course Creator Software',
    'LMS Platform',
    'QR Certificate Verification',
    'OMR Quiz Scanning',
    'Instructor Platform',
    'Student Portal',
  ],
  authors: [{ name: 'CubixSkill Inc.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:5175',
    title: 'CubixSkill — Build, Sell & Manage Your Online Academy',
    description:
      'Launch your branded academy, manage students, issue certificates, and conduct live classes from one unified platform.',
    siteName: 'CubixSkill Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CubixSkill Platform',
    description: 'Build and scale your online academy with modern web tools.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} hide-scrollbar`}>
      <body className="font-sans bg-[#F8FAFC] text-[#0F172A] antialiased hide-scrollbar">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
