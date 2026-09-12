import React, { useEffect, useState } from 'react';
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
import { websitePublicService, resolveMediaUrl, PublicAcademyConfigResponse } from '@/services/website.service';

export default function AcademyHomePage() {
  const { academyUuid } = useParams<{ academyUuid: string }>();
  const getAcademyByUuid = useAcademyStore((state) => state.getAcademyByUuid);
  const getCoursesByAcademy = useCourseStore((state) => state.getCoursesByAcademy);

  const fallbackAcademy = getAcademyByUuid(academyUuid);
  const mockCourses = getCoursesByAcademy(academyUuid);

  const [remoteConfig, setRemoteConfig] = useState<PublicAcademyConfigResponse | null>(null);
  const [remoteCourses, setRemoteCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!academyUuid) {
        setIsLoading(false);
        return;
      }
      try {
        const [config, courses] = await Promise.all([
          websitePublicService.getPublicAcademyWebsite(academyUuid),
          websitePublicService.getPublicAcademyCourses(academyUuid),
        ]);
        if (isMounted) {
          if (config) setRemoteConfig(config);
          if (courses && courses.length > 0) setRemoteCourses(courses);
        }
      } catch (err) {
        console.error('Failed to load remote website config:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [academyUuid]);

  // Construct active academy branding object
  const academyName = remoteConfig?.academy?.name || remoteConfig?.theme?.academy_name || fallbackAcademy?.name || 'Academy';
  const tagline = remoteConfig?.theme?.academy_tagline || fallbackAcademy?.tagline || 'Software Engineering Academy';
  const heroHeadline = remoteConfig?.home?.hero_title || remoteConfig?.theme?.home_hero_title || fallbackAcademy?.heroHeadline || 'Master Software Engineering';
  const heroSubheadline = remoteConfig?.home?.hero_subtitle || remoteConfig?.theme?.home_hero_subtitle || fallbackAcademy?.heroSubheadline || '';
  const heroImageUrl = resolveMediaUrl(remoteConfig?.home?.hero_image_url || remoteConfig?.theme?.hero_image_url) || fallbackAcademy?.logoUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900';
  const logoUrl = resolveMediaUrl(remoteConfig?.academy?.logo || remoteConfig?.theme?.logo_url) || fallbackAcademy?.logoUrl || '';
  const faviconUrl = resolveMediaUrl(remoteConfig?.academy?.favicon || remoteConfig?.theme?.favicon_url) || fallbackAcademy?.faviconUrl || '';
  const primaryColor = remoteConfig?.academy?.theme_color || remoteConfig?.theme?.primary_color || fallbackAcademy?.theme.primaryColor || '#2563EB';

  // Dynamic favicon update
  useEffect(() => {
    if (faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    }
    if (academyName) {
      document.title = `${academyName} | Official Website`;
    }
  }, [faviconUrl, academyName]);

  const activeAcademy = {
    ...(fallbackAcademy || {
      academyUuid,
      aboutText: 'Welcome to our Software Engineering Academy.',
      instructorName: 'Academy Instructor',
      instructorTitle: 'Lead Instructor',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      instructorBio: 'Experienced software instructor.',
      supportEmail: remoteConfig?.academy?.email || 'support@cubixskill.com',
      supportPhone: remoteConfig?.academy?.phone || '',
      socialLinks: {},
    }),
    name: academyName,
    tagline,
    heroHeadline,
    heroSubheadline,
    logoUrl,
    faviconUrl,
    theme: {
      primaryColor,
      primaryHover: primaryColor,
      primarySoft: '#EFF6FF',
      secondaryColor: remoteConfig?.theme?.secondary_color || '#1E293B',
      accentColor: remoteConfig?.theme?.accent_color || '#3B82F6',
    },
  };

  const courses = remoteCourses.length > 0 ? remoteCourses : mockCourses;

  const primaryStyle = { backgroundColor: primaryColor };
  const primarySoftStyle = { backgroundColor: '#EFF6FF', color: primaryColor };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar"
      style={
        {
          '--theme-primary': primaryColor,
          '--theme-primary-hover': primaryColor,
          '--theme-primary-soft': '#EFF6FF',
        } as React.CSSProperties
      }
    >
      <AcademyHeader academy={activeAcademy} />

      <main className="flex-1 space-y-16 pb-20">
        {/* HERO BANNER */}
        <section className="bg-white border-b border-slate-200/80 py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold" style={primarySoftStyle}>
                <Award className="w-4 h-4 shrink-0" />
                <span>{tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {heroHeadline}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {heroSubheadline}
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
              <img src={heroImageUrl} alt={academyName} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* FEATURED COURSES CATALOG */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">Featured Academy Courses</h2>
              <p className="text-slate-500 text-xs">Curated curriculum taught by {activeAcademy.instructorName}.</p>
            </div>
            <Link href={`/${academyUuid}/courses`}>
              <Button variant="ghost" size="sm" className="font-semibold text-blue-600" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Courses ({courses.length})
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course: any) => (
              <div key={course.courseUuid || course.id || course.slug} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={resolveMediaUrl(course.thumbnail) || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'} alt={course.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                      {course.category || 'Software Engineering'}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{course.rating || '4.9'}</span>
                      <span className="text-slate-400 font-normal">({course.reviewsCount || 120})</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{course.title}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{course.subtitle || course.description}</p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {course.studentCount || 450} students
                      </span>
                      <span className="font-bold text-slate-900">
                        {course.price === 0 || course.is_free ? 'FREE' : `${course.currency || '$'}${course.price || 99}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link href={`/${academyUuid}/courses/${course.courseUuid || course.slug || course.id}`}>
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
              <img src={activeAcademy.instructorAvatar} alt={activeAcademy.instructorName} className="w-32 h-32 rounded-3xl object-cover border-2 border-slate-200 mx-auto md:mx-0 shadow-md" />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{activeAcademy.instructorName}</h3>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">{activeAcademy.instructorTitle}</p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 text-slate-600 text-xs leading-relaxed">
              <h4 className="text-base font-bold text-slate-900">About {activeAcademy.name}</h4>
              <p>{activeAcademy.aboutText}</p>
              <p>{activeAcademy.instructorBio}</p>
              <div className="pt-2 flex flex-wrap gap-4 font-semibold text-slate-900">
                {activeAcademy.supportEmail && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {activeAcademy.supportEmail}
                  </span>
                )}
                {activeAcademy.supportPhone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {activeAcademy.supportPhone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <AcademyFooter academy={activeAcademy} />
    </div>
  );
}
