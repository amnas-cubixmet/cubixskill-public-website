'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const MainHeader: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md font-sans text-xs transition-shadow duration-200 ${
        scrolled ? 'shadow-md border-b border-slate-200/80' : 'border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* LEFT: LOGO */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-xl p-1">
          <div>
            <span className="font-extrabold text-lg md:text-xl text-slate-900 tracking-tight block leading-none">
              Cubix<span className="text-[#2563EB]">Skill</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
              Enterprise Academy Platform
            </span>
          </div>
        </Link>

        {/* CENTER: DESKTOP NAV LINKS (Home | Features | Solutions | Pricing | How It Works) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg px-1.5 ${
                  isActive ? 'text-[#2563EB]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full animate-in fade-in zoom-in-95" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: DESKTOP CTAs (BOOK DEMO & START FREE ONLY) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/book-demo">
            <Button variant="outline" size="md" className="font-semibold">
              Book Demo
            </Button>
          </Link>

          <Link href="/instructor-register">
            <Button size="md" className="font-semibold" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Free
            </Button>
          </Link>
        </div>

        {/* MOBILE MENU TRIGGER BUTTON */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          title="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* MOBILE FULL-SCREEN DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md md:hidden animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 w-full h-full bg-white flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right">
            {/* MOBILE DRAWER HEADER */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                <span className="font-extrabold text-lg text-slate-900">CubixSkill</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* MOBILE NAV LINKS (HOME IS FIRST ITEM) */}
            <div className="py-6 space-y-2 flex-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl font-semibold text-base transition-all min-h-[48px] ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                  </Link>
                );
              })}
            </div>

            {/* MOBILE STICKY CTAs */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link href="/instructor-register" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" className="w-full font-semibold justify-center min-h-[48px]">
                  Start Free Trial
                </Button>
              </Link>

              <Link href="/book-demo" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" variant="outline" className="w-full font-semibold justify-center min-h-[48px]">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
