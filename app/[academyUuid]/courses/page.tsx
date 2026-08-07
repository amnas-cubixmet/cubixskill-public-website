'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Users, Search, BookOpen, Filter, ChevronDown } from 'lucide-react';
import { AcademyHeader } from '@/components/layout/AcademyHeader';
import { AcademyFooter } from '@/components/layout/AcademyFooter';
import { Button } from '@/components/ui/Button';
import { useAcademyStore } from '@/stores/academy.store';
import { useCourseStore } from '@/stores/course.store';

export default function AcademyCoursesPage() {
  const { academyUuid } = useParams<{ academyUuid: string }>();
  const getAcademyByUuid = useAcademyStore((state) => state.getAcademyByUuid);
  const getCoursesByAcademy = useCourseStore((state) => state.getCoursesByAcademy);

  const academy = getAcademyByUuid(academyUuid);
  const courses = getCoursesByAcademy(academyUuid);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => set.add(c.category));
    return ['All', ...Array.from(set)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subtitle.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchLevel = selectedLevel === 'All' || c.level === selectedLevel;
      return matchSearch && matchCat && matchLevel;
    });
  }, [courses, search, selectedCategory, selectedLevel]);

  if (!academy) return null;

  const primaryStyle = { backgroundColor: academy.theme.primaryColor };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <AcademyHeader academy={academy} />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-7xl mx-auto space-y-8 w-full">
        <div className="space-y-2 text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Course Catalog</h1>
          <p className="text-slate-600 text-xs font-normal">
            Explore all official courses offered by {academy.name}.
          </p>
        </div>

        {/* REDESIGNED SAAS SEARCH & FILTER BAR */}
        <div className="bg-white p-5 md:p-7 rounded-[24px] border border-slate-200/90 shadow-md shadow-slate-200/40 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <Filter className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm text-slate-900">Filter &amp; Search Courses</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredCourses.length}</span> of {courses.length} courses
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end">
            {/* 1. SEARCH INPUT CONTROL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-900 select-none">
                Search Catalog
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search title, topic, or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-[52px] min-h-[52px] rounded-[16px] border border-slate-200/90 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white transition-all duration-200 hover:border-slate-300 focus:outline-hidden focus:border-[var(--theme-primary,#2563EB)] focus:ring-4 focus:ring-[var(--theme-primary,#2563EB)]/10"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 px-2 py-1 text-[11px] font-semibold text-slate-400 hover:text-slate-700 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* 2. CATEGORY SELECT CONTROL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-900 select-none">
                Category
              </label>
              <div className="relative flex items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-[52px] min-h-[52px] rounded-[16px] border border-slate-200/90 px-4 text-sm font-medium text-slate-900 bg-white appearance-none transition-all duration-200 hover:border-slate-300 focus:outline-hidden focus:border-[var(--theme-primary,#2563EB)] focus:ring-4 focus:ring-[var(--theme-primary,#2563EB)]/10 cursor-pointer pr-10"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 pointer-events-none text-slate-400 flex items-center justify-center">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 3. SKILL LEVEL SELECT CONTROL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-900 select-none">
                Skill Level
              </label>
              <div className="relative flex items-center">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full h-[52px] min-h-[52px] rounded-[16px] border border-slate-200/90 px-4 text-sm font-medium text-slate-900 bg-white appearance-none transition-all duration-200 hover:border-slate-300 focus:outline-hidden focus:border-[var(--theme-primary,#2563EB)] focus:ring-4 focus:ring-[var(--theme-primary,#2563EB)]/10 cursor-pointer pr-10"
                >
                  <option value="All">All Skill Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <div className="absolute right-4 pointer-events-none text-slate-400 flex items-center justify-center">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COURSES LIST */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Courses Match Your Filter</h3>
            <p className="text-slate-500 text-xs">Try clearing search keywords or selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.courseUuid}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{course.title}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{course.subtitle}</p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {course.studentCount} students
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        {course.price === 0 ? 'FREE' : `${course.currency}${course.price}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link href={`/${academyUuid}/courses/${course.courseUuid}`}>
                    <Button size="sm" style={primaryStyle} className="w-full font-semibold justify-center text-white">
                      View Course Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AcademyFooter academy={academy} />
    </div>
  );
}
