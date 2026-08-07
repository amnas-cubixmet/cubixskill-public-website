'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  Star,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Mail,
  Phone,
} from 'lucide-react';
import { AcademyHeader } from '@/components/layout/AcademyHeader';
import { AcademyFooter } from '@/components/layout/AcademyFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAcademyStore } from '@/stores/academy.store';
import { useCourseStore } from '@/stores/course.store';

export default function AcademyHomePage() {
  const { academyUuid } = useParams<{ academyUuid: string }>();
  const getAcademyByUuid = useAcademyStore((state) => state.getAcademyByUuid);
  const getCoursesByAcademy = useCourseStore((state) => state.getCoursesByAcademy);

  const academy = getAcademyByUuid(academyUuid);
  const courses = getCoursesByAcademy(academyUuid);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  if (!academy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans text-xs bg-[#F8FAFC]">
        <h1 className="text-2xl font-bold text-slate-900">Academy Not Found</h1>
        <p className="text-slate-500">The requested academy UUID does not exist or has been removed.</p>
        <Link href="/">
          <Button size="md">Back to Main Site</Button>
        </Link>
      </div>
    );
  }

  const primaryStyle = { backgroundColor: academy.theme.primaryColor };
  const primarySoftStyle = { backgroundColor: academy.theme.primarySoft, color: academy.theme.primaryColor };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar"
      style={
        {
          '--theme-primary': academy.theme.primaryColor,
          '--theme-primary-hover': academy.theme.primaryHover,
          '--theme-primary-soft': academy.theme.primarySoft,
        } as React.CSSProperties
      }
    >
      <AcademyHeader academy={academy} />

      <main className="flex-1 space-y-16 pb-20">
        {/* HERO BANNER */}
        <section className="bg-white border-b border-slate-200/80 py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold" style={primarySoftStyle}>
                <Award className="w-4 h-4 shrink-0" />
                <span>{academy.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {academy.heroHeadline}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {academy.heroSubheadline}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href={`/${academyUuid}/courses`} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    style={primaryStyle}
                    className="w-full font-semibold justify-center text-white min-h-[48px] px-8"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Courses
                  </Button>
                </Link>

                <Link href={`/${academyUuid}/register`} className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full font-semibold justify-center min-h-[48px] px-8">
                    Create Student Account
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-video">
              <img src={academy.logoUrl} alt={academy.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* FEATURED COURSES CATALOG */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">Featured Academy Courses</h2>
              <p className="text-slate-500 text-xs">Curated curriculum taught by {academy.instructorName}.</p>
            </div>
            <Link href={`/${academyUuid}/courses`}>
              <Button variant="ghost" size="sm" className="font-semibold text-blue-600" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Courses ({courses.length})
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <div key={course.courseUuid} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{course.title}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{course.subtitle}</p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {course.studentCount} students
                      </span>
                      <span className="font-bold text-slate-900">
                        {course.price === 0 ? 'FREE' : `${course.currency}${course.price}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link href={`/${academyUuid}/courses/${course.courseUuid}`}>
                    <Button size="sm" style={primaryStyle} className="w-full font-semibold justify-center text-white">
                      Course Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT INSTRUCTOR SECTION */}
        <section className="bg-white border-y border-slate-200/80 py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left space-y-4">
              <img src={academy.instructorAvatar} alt={academy.instructorName} className="w-32 h-32 rounded-3xl object-cover border-2 border-slate-200 mx-auto md:mx-0 shadow-md" />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{academy.instructorName}</h3>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">{academy.instructorTitle}</p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 text-slate-600 text-xs leading-relaxed">
              <h4 className="text-base font-bold text-slate-900">About {academy.name}</h4>
              <p>{academy.aboutText}</p>
              <p>{academy.instructorBio}</p>
              <div className="pt-2 flex flex-wrap gap-4 font-semibold text-slate-900">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {academy.supportEmail}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {academy.supportPhone}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AcademyFooter academy={academy} />
    </div>
  );
}
