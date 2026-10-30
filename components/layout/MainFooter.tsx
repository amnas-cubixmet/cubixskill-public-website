'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const MainFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans text-xs pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* MAIN NAVIGATION COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* BRAND COL */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-extrabold text-xl text-white tracking-tight">
                Cubix<span className="text-[#2563EB]">Skill</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The enterprise all-in-one SaaS platform empowering institutes, educators, and organizations to launch branded online academies.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 27001 Certified &amp; GDPR Compliant</span>
            </div>
          </div>

          {/* FEATURES */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Features</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/features" className="hover:text-white transition-colors">Course Builder</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Quiz Engine &amp; OMR</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">QR Certificates</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Personal Student Chat</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Lead Management CRM</Link></li>
            </ul>
          </div>

          {/* SOLUTIONS */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/solutions" className="hover:text-white transition-colors">Training Institutes</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Online Academies</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Corporate Training</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Individual Instructors</Link></li>
            </ul>
          </div>

          {/* COMPANY & LEGAL */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing &amp; Credits</Link></li>
              <li><Link href="/instructor-register" className="hover:text-white transition-colors">Register Your Academy</Link></li>
              <li><Link href="/book-demo" className="hover:text-white transition-colors">Book a Demo</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} CubixSkill Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
