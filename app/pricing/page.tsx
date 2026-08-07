'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Wallet,
  Clock,
  Infinity as InfinityIcon,
  HelpCircle,
  FileCheck,
  Video,
  QrCode,
  MessageSquare,
} from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePublicSiteStore } from '@/stores/public-site.store';

export default function PricingPage() {
  const creditPackages = usePublicSiteStore((state) => state.creditPackages);

  const featureCosts = [
    { feature: 'QR Code Verifiable Certificate', cost: '1 Credit / certificate', icon: QrCode, details: 'Includes digital PDF + instant QR verification page' },
    { feature: 'OMR Sheet Scanning & Auto-Grading', cost: '0.5 Credits / sheet', icon: FileCheck, details: 'Physical sheet photo scan & digital auto-evaluation' },
    { feature: 'Live Class Student Streaming', cost: '2 Credits / student-hour', icon: Video, details: 'HD live class streaming with interactive whiteboard' },
    { feature: 'SMS & WhatsApp Notification Trigger', cost: '0.2 Credits / message', icon: MessageSquare, details: 'Automated attendance, fee, and exam alerts' },
    { feature: 'AI Assessment Question Generator', cost: '0.5 Credits / request', icon: Sparkles, details: 'Generate bloom taxonomy question banks instantly' },
    { feature: 'Custom Domain SSL & Academy Hosting', cost: 'Free (0 Credits)', icon: ShieldCheck, details: 'Unlimited hosting with custom domain SSL provisioning' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-20">
        {/* HERO HEADING & EXPLANATION */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-bold text-xs shadow-2xs">
            <Zap className="w-3.5 h-3.5 fill-current text-[#2563EB]" />
            <span>Pay As You Use — Credit-Based Pricing</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Flexible Credit-Based Pricing
          </h1>

          <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Buy credits once and use them across the platform. No monthly subscriptions. No recurring charges. Pay only for what you use.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-slate-600 font-medium text-xs">
            <div className="flex items-center gap-2">
              <InfinityIcon className="w-4 h-4 text-emerald-500" />
              <span>Credits Never Expire</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Zero Monthly Auto-Debit</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Top-Up Wallet Anytime</span>
            </div>
          </div>
        </div>

        {/* CREDIT PACKAGE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {creditPackages.map((pack) => (
            <div
              key={pack.id}
              className={`p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                pack.isBestValue
                  ? 'border-[#2563EB] bg-blue-50/20 shadow-xl ring-2 ring-[#2563EB]/20 relative'
                  : 'border-slate-200 bg-white shadow-2xs hover:shadow-md'
              }`}
            >
              {pack.isBestValue && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold bg-[#2563EB] text-white shadow-md uppercase tracking-wider">
                  {pack.popularBadge || 'BEST VALUE'}
                </span>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{pack.name}</h3>
                  <p className="text-xs text-slate-500 font-normal mt-1.5 leading-relaxed">{pack.description}</p>
                </div>

                {/* PRICE & CREDITS DISPLAY */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-slate-900">₹{pack.priceINR.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 font-medium">one-time</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>Base Credits:</span>
                      <span>{pack.credits.toLocaleString('en-IN')}</span>
                    </div>
                    {pack.bonusCredits > 0 && (
                      <div className="flex items-center justify-between text-emerald-600 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                        <span>Bonus Credits:</span>
                        <span>+{pack.bonusCredits.toLocaleString('en-IN')} Free</span>
                      </div>
                    )}
                    <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between font-extrabold text-blue-600 text-xs">
                      <span>Total Wallet Credits:</span>
                      <span>{pack.totalCredits.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* FEATURE LIST */}
                <div className="space-y-2.5 pt-2 text-xs">
                  {pack.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{f}</span>
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

        {/* HOW CREDITS WORK SECTION */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xs space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <Badge variant="primary" size="md">Simple Wallet Mechanics</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How Credits Work</h2>
            <p className="text-slate-600 text-xs font-normal">
              Managing your platform usage is as simple as topping up your mobile wallet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center font-extrabold text-base">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Purchase Credits</h3>
              <p className="text-slate-600 text-xs font-normal leading-relaxed">
                Choose a credit package that matches your student cohort size and teaching requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center font-extrabold text-base">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Instant Wallet Deposit</h3>
              <p className="text-slate-600 text-xs font-normal leading-relaxed">
                Credits are instantly added to your academy wallet balance upon payment confirmation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center font-extrabold text-base">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Use Across Features</h3>
              <p className="text-slate-600 text-xs font-normal leading-relaxed">
                Deduct credits as you issue certificates, host live classes, scan OMR sheets, and send alerts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 relative text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-base">
                4
              </div>
              <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                <span>Top Up Anytime</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-extrabold">Never Expire</span>
              </h3>
              <p className="text-emerald-800 text-xs font-normal leading-relaxed">
                Buy more credits whenever you need. Unused credits carry forward forever without expiring!
              </p>
            </div>
          </div>
        </section>



        {/* FEATURE CREDIT COST TRANSPARENCY TABLE */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-1 text-left">
            <h2 className="text-2xl font-extrabold text-slate-900">Feature Credit Consumption Matrix</h2>
            <p className="text-xs text-slate-500">Transparent credit breakdown per platform action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCosts.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 text-xs block">{item.feature}</span>
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-[#2563EB] font-extrabold text-[11px]">
                      {item.cost}
                    </span>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
