'use client';

import React from 'react';
import Link from 'next/link';
import type { AcademyBranding } from '@/stores/academy.store';
import { Mail, Phone, ExternalLink } from 'lucide-react';

interface AcademyFooterProps {
  academy: AcademyBranding;
}

export const AcademyFooter: React.FC<AcademyFooterProps> = ({ academy }) => {
  const baseUrl = `/${academy.academyUuid}`;

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans text-xs pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* BRAND */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src={academy.logoUrl} alt={academy.name} className="w-10 h-10 rounded-2xl object-cover border border-slate-800" />
              <span className="font-extrabold text-lg text-white tracking-tight">{academy.name}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">{academy.tagline}</p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{academy.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>{academy.supportPhone}</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link href={`${baseUrl}/courses`} className="hover:text-white transition-colors">All Courses</Link></li>
              <li><Link href={`${baseUrl}/contact`} className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* ACADEMY LEGAL & ENROLLMENT */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Enrollment</h4>
            <ul className="space-y-2.5">
              <li><Link href={`${baseUrl}/register`} className="hover:text-white transition-colors">Student Registration</Link></li>
              <li><Link href={`${baseUrl}/book-demo`} className="hover:text-white transition-colors">Book Demo Request</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BRANDING */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} {academy.name}. All rights reserved.</span>
          <a
            href="http://localhost:5175"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-slate-300 transition-colors"
          >
            <span>Powered by CubixSkill Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
