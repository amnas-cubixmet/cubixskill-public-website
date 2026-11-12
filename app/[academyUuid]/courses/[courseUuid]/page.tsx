'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Award,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { AcademyHeader } from '@/components/layout/AcademyHeader';
import { AcademyFooter } from '@/components/layout/AcademyFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAcademyStore } from '@/stores/academy.store';
import { useCourseStore } from '@/stores/course.store';

export default function CourseDetailPage() {
  const { academyUuid, courseUuid } = useParams<{ academyUuid: string; courseUuid: string }>();
  const getAcademyByUuid = useAcademyStore((state) => state.getAcademyByUuid);
  const getCourseByUuid = useCourseStore((state) => state.getCourseByUuid);

  const academy = getAcademyByUuid(academyUuid);
  const course = getCourseByUuid(courseUuid);

  const [activeModuleId, setActiveModuleId] = useState<string | null>('mod-1');

  if (!academy || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans text-xs bg-[#F8FAFC]">
        <h1 className="text-2xl font-bold text-slate-900">Course Not Found</h1>
        <p className="text-slate-500 font-mono text-[11px]">Requested Course UUID: {courseUuid}</p>
        <Link href={`/${academyUuid}/courses`}>
          <Button size="md">Back to Course Catalog</Button>
        </Link>
      </div>
    );
  }


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

      <main className="flex-1 py-8 px-4 md:px-6 max-w-7xl mx-auto space-y-12 w-full">
        {/* TOP HERO CONTAINER */}
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-white uppercase">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB]">
                {course.level} Level
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                {course.language}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">{course.subtitle}</p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <img src={course.instructorAvatar} alt={course.instructorName} className="w-8 h-8 rounded-full object-cover border" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Instructor</span>
                  <span className="font-bold text-slate-900">{course.instructorName}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{course.studentCount} Students</span>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          {/* CARD ACTION SIDEBAR */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                  <PlayCircle className="w-6 h-6 fill-slate-900 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Course Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {course.price === 0 ? 'FREE' : `${course.currency}${course.price}`}
                </span>
                {course.price > 0 && <span className="text-xs text-slate-400 line-through">${course.price + 50}</span>}
              </div>
            </div>

          </div>
        </div>

        {/* MAIN BODY: WHAT YOU WILL LEARN & CURRICULUM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* WHAT YOU WILL LEARN */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">What You Will Learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CURRICULUM MODULE PREVIEW */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Curriculum Preview</h3>
                <span className="text-xs text-slate-500 font-mono">
                  {course.modules.length} Modules • {course.lessonCount} Lessons
                </span>
              </div>

              <div className="space-y-3">
                {course.modules.map((mod) => {
                  const isOpen = activeModuleId === mod.id;
                  return (
                    <div key={mod.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setActiveModuleId(isOpen ? null : mod.id)}
                        className="w-full p-4 text-left font-bold text-xs md:text-sm text-slate-900 flex items-center justify-between cursor-pointer bg-slate-50 hover:bg-slate-100"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-500" />
                          <span>{mod.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 space-y-2 bg-white border-t border-slate-100 divide-y divide-slate-100">
                          {mod.lessons.map((les, lIdx) => (
                            <div key={lIdx} className="pt-2 flex items-center justify-between text-xs text-slate-700">
                              <div className="flex items-center gap-2">
                                {les.isPreview ? (
                                  <PlayCircle className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400" />
                                )}
                                <span>{les.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {les.isPreview && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    Free Demo Lesson
                                  </span>
                                )}
                                <span className="text-[11px] text-slate-400 font-mono">{les.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR REQUIREMENTS & CERTIFICATE INFO */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>QR Verified Certificate</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upon completing 100% of curriculum lessons and passing quiz evaluations, an automated QR-verifiable certificate is issued instantly under {academy.name}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Requirements</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <AcademyFooter academy={academy} />
    </div>
  );
}
