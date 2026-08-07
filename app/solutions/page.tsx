'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  GraduationCap,
  Laptop,
  School,
  Building,
  Briefcase,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function SolutionsPage() {
  const solutions = [
    {
      title: 'Training Institutes',
      desc: 'Multi-instructor staff support, physical OMR answer sheet scanning, and automated gradebook reports.',
      icon: Building2,
      color: 'bg-blue-50 text-[#2563EB]',
      cta: 'Explore Institute Solution',
    },
    {
      title: 'Online Academies',
      desc: 'Custom domain white-label website builder, sequential drip learning, and automated QR certificates.',
      icon: Laptop,
      color: 'bg-indigo-50 text-indigo-600',
      cta: 'Explore Academy Solution',
    },
    {
      title: 'Coaching Centers',
      desc: 'Live streaming integration, batch attendance tracking, direct-answer practice test sets, and personal chat.',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-600',
      cta: 'Explore Coaching Solution',
    },
    {
      title: 'Schools',
      desc: 'Structured curriculum modules, homework assignment uploads, parent progress notifications, and student portal.',
      icon: School,
      color: 'bg-amber-50 text-amber-600',
      cta: 'Explore School Solution',
    },
    {
      title: 'Colleges & Universities',
      desc: 'Departmental staff administration, course prerequisites, exam evaluation desks, and verifiable credentials.',
      icon: Building,
      color: 'bg-purple-50 text-purple-600',
      cta: 'Explore College Solution',
    },
    {
      title: 'Corporate Training',
      desc: 'Employee onboarding tracks, compliance certification, SAML SSO integration, and dedicated SLA support.',
      icon: Briefcase,
      color: 'bg-sky-50 text-sky-600',
      cta: 'Explore Enterprise Solution',
    },
    {
      title: 'Individual Instructors',
      desc: 'Monetize your expertise quickly without tech hassle. Zero transaction fees, 100% brand ownership.',
      icon: UserCheck,
      color: 'bg-rose-50 text-rose-600',
      cta: 'Explore Solo Solution',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="primary" size="md">Tailored Industry Solutions</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Solutions Built for Your Teaching Business Model
          </h1>
          <p className="text-slate-600 text-base font-normal">
            Whether you run a solo coaching class, an established training institute, or corporate employee training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-5 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sol.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{sol.title}</h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">{sol.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link href="/book-demo">
                    <Button variant="outline" size="sm" className="w-full font-semibold justify-center min-h-[44px]">
                      {sol.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ENTERPRISE CALLOUT */}
        <div className="p-10 md:p-14 rounded-3xl bg-slate-900 text-white text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold">Need a Tailored Enterprise Contract?</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Our solution architects will help you design custom credit volume packages, SAML SSO, and SLA guarantees.
          </p>
          <div className="flex justify-center pt-2">
            <Link href="/book-demo">
              <Button size="lg" className="font-semibold min-h-[48px] px-8" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Schedule Enterprise Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
