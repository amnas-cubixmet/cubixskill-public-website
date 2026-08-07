'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message Received!', { description: 'Our support team will respond within 24 hours.' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />
      <main className="flex-1 py-12 px-4 md:px-6 max-w-5xl mx-auto space-y-12 w-full">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] uppercase">Get In Touch</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Contact CubixSkill Team</h1>
          <p className="text-slate-600 text-sm">Have a question regarding custom credit packages, enterprise SLA, or technical support?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 font-sans">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center"><Mail className="w-5 h-5" /></div>
              <h3 className="font-bold text-slate-900">Email Support</h3>
              <p className="text-slate-500 text-xs">support@cubixskill.com</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Phone className="w-5 h-5" /></div>
              <h3 className="font-bold text-slate-900">Sales Inquiry</h3>
              <p className="text-slate-500 text-xs">+1 (800) 555-CUBIX</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Send Us a Direct Message</h3>
            <TextInput label="Your Name" required placeholder="Dr. Vikramaditya Rao" />
            <TextInput label="Email Address" type="email" required placeholder="vikram@academy.io" />
            <div className="space-y-1">
              <label className="block font-medium text-slate-800 text-xs">Message</label>
              <textarea rows={4} required placeholder="How can we assist your online academy?" className="w-full rounded-[10px] border border-[#E2E8F0] p-[14px] text-xs" />
            </div>
            <Button type="submit" size="md" className="font-semibold px-6" rightIcon={<Send className="w-4 h-4" />}>
              Send Message
            </Button>
          </form>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
