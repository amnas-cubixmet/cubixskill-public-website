'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileCheck,
  Award,
  ShieldCheck,
  Users,
  Globe,
  MessageSquare,
  Video,
  BarChart3,
  PieChart,
  Layers,
  Zap,
  Smartphone,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function FeaturesPage() {
  const realFeatures = [
    {
      title: 'Course Builder',
      desc: 'Structure video lessons, PDFs, audio tracks, sequential drip paths, and module locking.',
      icon: BookOpen,
      color: 'bg-blue-50 text-[#2563EB]',
    },
    {
      title: 'Assignments Desk',
      desc: 'Collect student essay submissions, code projects, and provide video/audio feedback.',
      icon: FileCheck,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Quiz Engine & OMR',
      desc: 'Deploy online quizzes and scan physical OMR sheet answers directly via phone camera.',
      icon: Award,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'QR Certificates',
      desc: 'Generate automated QR-code verifiable certificates that resolve on your public site.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Student Portal',
      desc: 'A dedicated mobile-first student workspace with progress trackers and downloads.',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Website Builder',
      desc: 'Publish custom branded public academy websites (/{academyUuid}) with dynamic theme tokens.',
      icon: Globe,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Community Discussions',
      desc: 'Moderated peer discussion forums attached to course modules and lessons.',
      icon: MessageSquare,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Personal Chat',
      desc: 'Private 1-on-1 messaging channel between students and authorized instructor support staff.',
      icon: MessageSquare,
      color: 'bg-teal-50 text-teal-600',
    },
    {
      title: 'Live Classes',
      desc: 'Integrate Zoom, Google Meet, and YouTube Live streams with automated attendance tracking.',
      icon: Video,
      color: 'bg-[#2563EB]/10 text-[#2563EB]',
    },
    {
      title: 'Reports & Export',
      desc: 'Generate detailed attendance, gradebook, and financial performance reports in CSV/PDF.',
      icon: BarChart3,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Analytics Engine',
      desc: 'Track student engagement drop-off, lesson completion velocity, and video playback stats.',
      icon: PieChart,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Lead Management CRM',
      desc: 'Capture, assign, and convert course prospects and demo inquiries inside your dashboard.',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Credits System',
      desc: 'Pay-as-you-grow credit engine for QR certificates, live streams, and WhatsApp alerts.',
      icon: Zap,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: '100% Responsive Websites',
      desc: 'All public pages and student portals adapt flawlessly to 320px–4K mobile viewports.',
      icon: Smartphone,
      color: 'bg-sky-50 text-sky-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="primary" size="md">Real Platform Capabilities</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Platform Features
          </h1>
          <p className="text-slate-600 text-base font-normal">
            14 production-grade core engines built specifically for high-growth online academies and institutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">{feat.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA BANNER */}
        <div className="p-10 md:p-14 rounded-3xl bg-slate-900 text-white text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold">Experience the CubixSkill Platform Hands-On</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Book a personalized 1-on-1 demonstration or register to launch your academy immediately.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/book-demo">
              <Button size="lg" variant="darkOutline" className="w-full sm:w-auto font-semibold min-h-[48px] px-8">
                Book a Demo
              </Button>
            </Link>
            <Link href="/instructor-register">
              <Button size="lg" className="w-full sm:w-auto font-semibold min-h-[48px] px-8" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
