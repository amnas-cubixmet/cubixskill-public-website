'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { AcademyHeader } from '@/components/layout/AcademyHeader';
import { AcademyFooter } from '@/components/layout/AcademyFooter';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { useAcademyStore } from '@/stores/academy.store';
import { useLeadStore } from '@/stores/lead.store';
import { toast } from 'sonner';

export default function AcademyBookDemoPage() {
  const { academyUuid } = useParams<{ academyUuid: string }>();
  const getAcademyByUuid = useAcademyStore((state) => state.getAcademyByUuid);
  const createAcademyDemoLead = useLeadStore((state) => state.createAcademyDemoLead);
  const academy = getAcademyByUuid(academyUuid);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  if (!academy) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAcademyDemoLead(academyUuid, { fullName: name, email, message: msg });
    toast.success('Demo Request Received!', { description: `${academy.name} representative will contact you.` });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <AcademyHeader academy={academy} />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-xl mx-auto space-y-6 w-full">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Book a Demo with {academy.name}</h1>
          <p className="text-xs text-slate-600">Schedule a 1-on-1 walkthrough of our course curriculum and platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <TextInput label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivers" />
          <TextInput label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@gmail.com" />
          <div className="space-y-1">
            <label className="block font-medium text-slate-800 text-xs">Preferred Date &amp; Notes</label>
            <textarea rows={3} required value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Share your preferred time or topics..." className="w-full rounded-[10px] border border-[#E2E8F0] p-[14px] text-xs" />
          </div>
          <Button type="submit" size="md" style={{ backgroundColor: academy.theme.primaryColor }} className="w-full font-semibold justify-center text-white">
            Submit Demo Request
          </Button>
        </form>
      </main>

      <AcademyFooter academy={academy} />
    </div>
  );
}
