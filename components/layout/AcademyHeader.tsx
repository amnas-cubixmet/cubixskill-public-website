'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, BookOpen, Mail } from 'lucide-react';
import type { AcademyBranding } from '@/stores/academy.store';
import { Button } from '../ui/Button';

interface AcademyHeaderProps {
  academy: AcademyBranding;
}

export const AcademyHeader: React.FC<AcademyHeaderProps> = ({ academy }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseUrl = `/${academy.academyUuid}`;

  const navLinks = [
    { label: 'Home', href: baseUrl, icon: Home },
    { label: 'Courses', href: `${baseUrl}/courses`, icon: BookOpen },
    { label: 'Contact', href: `${baseUrl}/contact`, icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* LEFT: ACADEMY LOGO & NAME */}
        <Link href={baseUrl} className="flex items-center gap-3 group cursor-pointer">
          <img
            src={academy.logoUrl}
            alt={academy.name}
            className="w-10 h-10 md:w-11 md:h-11 rounded-2xl object-cover border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-extrabold text-sm md:text-base text-slate-900 tracking-tight block leading-tight">
              {academy.name}
            </span>
            <span className="text-[10px] text-slate-500 font-normal line-clamp-1 max-w-[200px] md:max-w-xs block mt-0.5">
              {academy.tagline}
            </span>
          </div>
        </Link>

        {/* CENTER: DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === baseUrl ? pathname === baseUrl : pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive ? 'text-[#2563EB]' : 'text-slate-600 hover:text-slate-900'
                }`}
                style={{
                  color: isActive ? academy.theme.primaryColor : undefined,
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full animate-in fade-in"
                    style={{ backgroundColor: academy.theme.primaryColor }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: DESKTOP CTAs (NO LOGIN) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href={`${baseUrl}/book-demo`}>
            <Button variant="outline" size="md" className="font-semibold">
              Book Demo
            </Button>
          </Link>

          <Link href={`${baseUrl}/register`}>
            <Button
              size="md"
              style={{ backgroundColor: academy.theme.primaryColor }}
              className="font-semibold text-white hover:opacity-90 cursor-pointer min-h-[48px]"
            >
              Enroll Now
            </Button>
          </Link>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md lg:hidden animate-in fade-in font-sans">
          <div className="absolute inset-0" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 w-full h-full bg-white flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right">
            {/* HEADER */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <Link href={baseUrl} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                <img src={academy.logoUrl} alt={academy.name} className="w-9 h-9 rounded-2xl object-cover" />
                <span className="font-bold text-base text-slate-900 truncate">{academy.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* LINKS */}
            <div className="py-6 space-y-2 flex-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.href === baseUrl ? pathname === baseUrl : pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-2xl font-semibold text-base transition-all min-h-[48px]"
                    style={{
                      backgroundColor: isActive ? academy.theme.primarySoft : undefined,
                      color: isActive ? academy.theme.primaryColor : undefined,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link href={`${baseUrl}/register`} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="lg"
                  style={{ backgroundColor: academy.theme.primaryColor }}
                  className="w-full font-semibold justify-center text-white min-h-[48px]"
                >
                  Student Registration
                </Button>
              </Link>

              <Link href={`${baseUrl}/book-demo`} onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" variant="outline" className="w-full font-semibold justify-center min-h-[48px]">
                  Book Demo Request
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
