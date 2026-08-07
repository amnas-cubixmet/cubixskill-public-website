'use client';

import React from 'react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />
      <main className="flex-1 py-12 px-4 md:px-6 max-w-4xl mx-auto space-y-6 w-full">
        <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-slate-500">Last updated: August 6, 2026</p>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 leading-relaxed text-xs text-slate-700 font-sans">
          <p>By registering an instructor account or accessing the CubixSkill platform, you agree to these Terms of Service.</p>
          <h3 className="font-bold text-slate-900 text-sm">1. Platform Credit Usage</h3>
          <p>Credits are non-refundable once consumed for automated QR certificate issuance, live streaming, or WhatsApp notifications.</p>
          <h3 className="font-bold text-slate-900 text-sm">2. Content Ownership</h3>
          <p>Instructors retain 100% intellectual property ownership of all course media, curriculum text, and question banks uploaded to CubixSkill.</p>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
