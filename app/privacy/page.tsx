'use client';

import React from 'react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />
      <main className="flex-1 py-12 px-4 md:px-6 max-w-4xl mx-auto space-y-6 w-full">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-slate-500">Last updated: August 6, 2026</p>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4 leading-relaxed text-xs text-slate-700 font-sans">
          <p>At CubixSkill Inc., we take data protection and student privacy seriously. This Privacy Policy details how we collect, store, and process information on behalf of instructors and online academies.</p>
          <h3 className="font-bold text-slate-900 text-sm">1. Data Collection</h3>
          <p>We collect account setup data, course progress, quiz score submissions, and lead contact forms explicitly submitted by users.</p>
          <h3 className="font-bold text-slate-900 text-sm">2. Security &amp; Encryption</h3>
          <p>All data in transit is encrypted via TLS 1.3. Student passwords are salted and hashed using bcrypt.</p>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
