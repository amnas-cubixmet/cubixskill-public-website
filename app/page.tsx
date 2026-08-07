'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  Users,
  Video,
  Globe,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Zap,
  ChevronDown,
  Layers,
  FileCheck,
  Search,
} from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePublicSiteStore } from '@/stores/public-site.store';

export default function HomePage() {
  const creditPackages = usePublicSiteStore((state) => state.creditPackages);
  const faqs = usePublicSiteStore((state) => state.faqs);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 space-y-20 md:space-y-32 pb-24">
        {/* 1. HERO SECTION */}
        <section className="relative pt-16 md:pt-28 px-4 md:px-8 max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-200/80 text-[#2563EB] font-semibold text-xs shadow-2xs">
            <Sparkles className="w-4 h-4 fill-current shrink-0" />
            <span>The Enterprise Platform for Online Academies</span>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Build, Sell, and Manage Your <span className="text-[#2563EB]">Online Academy</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Create courses, manage students, conduct live sessions, issue certificates, and launch your branded learning platform from one place.
            </p>
          </div>

          {/* HERO ACTIONS (PREMIUM 48px BUTTONS) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <Link href="/book-demo" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full font-semibold justify-center min-h-[48px] px-8">
                Book a Demo
              </Button>
            </Link>

            <Link href="/instructor-register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full font-semibold justify-center min-h-[48px] px-8" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Free
              </Button>
            </Link>
          </div>
        </section>

        {/* 2. ENTERPRISE METRICS */}
        <section className="bg-white border-y border-slate-200/80 py-14 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-extrabold text-[#2563EB]">100%</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">White-Label Branding</span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-extrabold text-[#2563EB]">50,000+</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">Active Students Enrolled</span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-extrabold text-[#2563EB]">99.9%</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">Live Stream Uptime SLA</span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-extrabold text-[#2563EB]">&lt; 5 mins</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">Academy Launch Time</span>
            </div>
          </div>
        </section>

        {/* 3. REAL CUBIXSKILL FEATURES */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="primary" size="md">Core Engine Features</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Infrastructure for Your Entire Teaching Business
            </h2>
            <p className="text-slate-600 text-sm font-normal">
              Course builder, assignments, quiz engine, QR certificates, student portal, and personal chat working in total sync.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Course Builder &amp; Drip Learning</h3>
              <p className="text-slate-600 font-normal leading-relaxed text-xs">
                Organize modules, lessons, media, sequential learning paths, and lesson locking with ease.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">OMR Quizzes &amp; QR Certificates</h3>
              <p className="text-slate-600 font-normal leading-relaxed text-xs">
                Deploy digital quizzes, physical OMR scanning, and generate instant QR-verified tamper-proof certificates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Student Portal &amp; Personal Chat</h3>
              <p className="text-slate-600 font-normal leading-relaxed text-xs">
                Provide students with a dedicated portal, private 1-on-1 instructor chat, and multi-staff support desk.
              </p>
            </div>
          </div>
        </section>

        {/* 4. CREDIT PACKAGES PREVIEW */}
        <section className="bg-white border-y border-slate-200 py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-12 text-center">
            <div className="space-y-3 max-w-xl mx-auto">
              <Badge variant="success" size="md">Pay As You Use — No Subscriptions</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Flexible Credit-Based Pricing
              </h2>
              <p className="text-slate-600 text-sm">
                Buy credits once and use them across platform features. No monthly auto-debits or recurring fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {creditPackages.slice(0, 3).map((pack) => (
                <div
                  key={pack.id}
                  className={`p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                    pack.isBestValue
                      ? 'border-[#2563EB] bg-blue-50/20 shadow-xl ring-2 ring-[#2563EB]/20 relative'
                      : 'border-slate-200 bg-white shadow-2xs'
                  }`}
                >
                  {pack.isBestValue && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-extrabold bg-[#2563EB] text-white shadow-md uppercase tracking-wider">
                      MOST POPULAR
                    </span>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">{pack.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">₹{pack.priceINR.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-500 font-normal">one-time</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-bold text-xs text-blue-600 flex justify-between">
                      <span>Total Wallet Credits:</span>
                      <span>{pack.totalCredits.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">{pack.description}</p>

                    <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                      {pack.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/instructor-register" className="pt-4">
                    <Button
                      size="md"
                      variant={pack.isBestValue ? 'primary' : 'outline'}
                      className="w-full font-semibold justify-center min-h-[48px]"
                    >
                      {pack.ctaText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/pricing">
                <Button variant="ghost" size="md" className="font-semibold text-[#2563EB]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View All Credit Packages &amp; Cost Breakdown
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. FAQ */}
        <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-xs font-normal">Got questions? We have answers.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-semibold text-sm text-slate-900 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-slate-600 font-normal leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
