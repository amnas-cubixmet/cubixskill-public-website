'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, UserPlus, Palette, Upload, Users, ShieldCheck } from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/Button';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Register & Setup Academy Workspace',
      desc: 'Create your instructor account in under 60 seconds. Choose your academy UUID, logo, and theme color palette.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Customize Your Branded Public Site',
      desc: 'Use the no-code website builder to customize your public academy storefront (/{academyUuid}).',
      icon: Palette,
    },
    {
      step: '03',
      title: 'Upload Curriculum & Drip Modules',
      desc: 'Add video lessons, PDF materials, OMR quiz question sets, and sequential completion locking.',
      icon: Upload,
    },
    {
      step: '04',
      title: 'Enroll Students & Conduct Live Classes',
      desc: 'Invite students, conduct live streaming classes, manage 1-on-1 personal chat, and issue QR-verifiable certificates.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] uppercase">
            Step-by-Step Walkthrough
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How CubixSkill Powers Your Academy
          </h1>
          <p className="text-slate-600 text-sm">
            From registration to issuing verified certificates, here is how you launch your branded platform.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] font-extrabold text-xl flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div className="space-y-1 flex-1">
                  <h2 className="text-lg font-bold text-slate-900">{s.title}</h2>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">{s.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Link href="/instructor-register">
            <Button size="lg" className="font-semibold px-8" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Launching Your Academy
            </Button>
          </Link>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
