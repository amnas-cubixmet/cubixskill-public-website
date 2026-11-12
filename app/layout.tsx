import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { PwaRegister } from '@/components/PwaRegister';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#0B1B4A',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

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
  applicationName: 'CubixSkill',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CubixSkill',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/icon-120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icons/icon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-167.png', sizes: '167x167', type: 'image/png' },
      { url: '/icons/icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:5175',
    title: 'CubixSkill — Build, Sell & Manage Your Online Academy',
    description:
      'Launch your branded academy, manage students, issue certificates, and conduct live classes from one unified platform.',
    siteName: 'CubixSkill Platform',
    images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: 'CubixSkill' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CubixSkill Platform',
    description: 'Build and scale your online academy with modern web tools.',
    images: ['/icons/icon-512.png'],
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
        <PwaRegister />
      </body>
    </html>
  );
}
