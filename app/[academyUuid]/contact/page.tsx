'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import { AcademyHeader } from '@/components/layout/AcademyHeader';
import { AcademyFooter } from '@/components/layout/AcademyFooter';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { useAcademyStore } from '@/stores/academy.store';
import { toast } from 'sonner';

export default function AcademyContactPage() {
  const { academyUuid } = useParams<{ academyUuid: string }>();
  const getAcademyByUuid = useAcademyStore((state) => state.getAcademyByUuid);
  const academy = getAcademyByUuid(academyUuid);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  if (!academy) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message Sent!', { description: `Your inquiry has been routed to ${academy.supportEmail}` });
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <AcademyHeader academy={academy} />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-4xl mx-auto space-y-8 w-full">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact {academy.name}</h1>
          <p className="text-slate-600 text-xs">Have questions regarding courses or enrollment? Reach out directly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4 md:col-span-1 text-left">
            <h3 className="font-bold text-sm text-slate-900">Direct Support</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="break-all">{academy.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{academy.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Global Digital Academy</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 md:col-span-2 text-left">
            <TextInput label="Your Name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            <TextInput label="Your Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            <div className="space-y-1">
              <label className="block font-medium text-slate-800 text-xs">Your Message</label>
              <textarea rows={4} required value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your message here..." className="w-full rounded-[10px] border border-[#E2E8F0] p-[14px] text-xs" />
            </div>
            <Button type="submit" size="md" style={{ backgroundColor: academy.theme.primaryColor }} className="w-full font-semibold justify-center text-white">
              Send Message
            </Button>
          </form>
        </div>
      </main>

      <AcademyFooter academy={academy} />
    </div>
  );
}
