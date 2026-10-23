'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { TextInput } from '@/components/ui/TextInput';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { toast } from 'sonner';

const bookDemoSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required (at least 2 characters)'),
  email: z.string().email('Please enter a valid work email address'),
  countryCode: z.string().min(1),
  phone: z.string().min(7, 'Phone number must be at least 7 digits').max(15, 'Phone number cannot exceed 15 digits'),
  country: z.string().min(2, 'Country selection is required'),
  academyName: z.string().min(2, 'Academy or Company Name is required'),
  studentCount: z.string().min(1, 'Please select student volume'),
  courseCount: z.string().min(1, 'Please select course count'),
  currentPlatform: z.string().min(1, 'Please select current platform'),
  mainRequirement: z.string().min(3, 'Please describe your main requirement'),
  preferredDate: z.string().min(1, 'Preferred demo date is required'),
  preferredTime: z.string().min(1, 'Preferred demo time is required'),
  timeZone: z.string().min(1, 'Time Zone selection is required'),
  message: z.string().optional(),
});

type BookDemoFormValues = z.infer<typeof bookDemoSchema>;

export default function BookDemoPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [submittedLeadUuid, setSubmittedLeadUuid] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookDemoFormValues>({
    resolver: zodResolver(bookDemoSchema),
    defaultValues: {
      countryCode: '+1',
      country: 'United States',
      studentCount: '100-500',
      courseCount: '5-10',
      currentPlatform: 'Teachable / Kajabi',
      timeZone: 'EST (UTC-5)',
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferredTime: '14:00',
    },
  });

  const onSubmit = async (data: BookDemoFormValues) => {
    setApiError(null);
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/v1/leads/public/platform-demo/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.fullName.trim(),
          email: data.email.trim(),
          phone: `${data.countryCode}${data.phone.trim()}`,
          country: data.country.trim(),
          academy_name: data.academyName.trim(),
          student_count: data.studentCount,
          course_count: data.courseCount,
          current_platform: data.currentPlatform,
          main_requirement: data.mainRequirement.trim(),
          preferred_date: data.preferredDate,
          preferred_time: data.preferredTime,
          time_zone: data.timeZone,
          message: data.message?.trim() || '',
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        const firstFieldError = result && typeof result === 'object'
          ? Object.values(result).find((value) => Array.isArray(value)) as string[] | undefined
          : undefined;
        throw new Error(
          firstFieldError?.[0] || result?.message || result?.detail ||
          'Could not submit your demo request. Please check the form and try again.'
        );
      }
      if (!result?.id) throw new Error('The server did not return a demo request reference. Please contact support.');
      setSubmittedLeadUuid(result.id);
      toast.success('Demo request received!', {
        description: 'Our team will contact you to confirm a suitable demo time.',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to submit the request. Please try again.';
      setApiError(message);
      toast.error('Could not submit demo request', { description: message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-4xl mx-auto w-full space-y-8">
        {/* HEADER TITLE */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200 uppercase tracking-wider">
            Personalized 1-on-1 Demonstration
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Schedule a Demo with Our Platform Specialists
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-xl mx-auto">
            Discover how CubixSkill can help you launch branded websites, issue QR certificates, and manage students seamlessly.
          </p>
        </div>

        {/* IF SUBMITTED: SHOW CONFIRMATION CARD */}
        {submittedLeadUuid ? (
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                REQUEST RECEIVED
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Demo Request Received!</h2>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Thank you! Our academy specialists are preparing a custom walkthrough tailored to your requirements. Our team will contact you to confirm the demo time. Your preferred slot is not yet booked.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Lead Reference ID:</span>
                <span className="font-bold text-slate-800">{submittedLeadUuid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-600">Received (Awaiting Confirmation)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/">
                <Button size="md" variant="outline" className="w-full sm:w-auto font-semibold" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Homepage
                </Button>
              </Link>
              <Link href="/instructor-register">
                <Button size="md" className="w-full sm:w-auto font-semibold">
                  Start Free Trial Now
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* FORM CARD */
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6"
          >
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-900">Demo Application Form</h3>
                <p className="text-xs text-slate-500 font-normal">All fields marked with * are required.</p>
              </div>
              <span className="text-[11px] font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-lg">
                Step 1 of 1
              </span>
            </div>

            {apiError && <FormAlert type="error" title="Submission failed" message={apiError} />}

            {Object.keys(errors).length > 0 && (
              <FormAlert
                type="error"
                title="Please resolve form validation errors"
                message="Some fields require your attention before submitting."
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* FULL NAME */}
              <TextInput
                label="Full Name"
                required
                placeholder="Dr. Vikramaditya Rao"
                {...register('fullName')}
                error={errors.fullName?.message}
              />

              {/* WORK EMAIL */}
              <TextInput
                label="Work Email Address"
                type="email"
                required
                placeholder="vikram@academy.io"
                {...register('email')}
                error={errors.email?.message}
              />

              {/* PHONE INPUT */}
              <PhoneInput
                label="Phone Number"
                required
                selectedCountryCode={watch('countryCode')}
                onCountryCodeChange={(code) => setValue('countryCode', code)}
                value={watch('phone')}
                onChange={(val) => setValue('phone', val)}
                error={errors.phone?.message}
              />

              {/* COUNTRY */}
              <TextInput
                label="Country"
                required
                placeholder="United States"
                {...register('country')}
                error={errors.country?.message}
              />

              {/* ACADEMY NAME */}
              <TextInput
                label="Academy or Business Name"
                required
                placeholder="Apex Learning Institute"
                {...register('academyName')}
                error={errors.academyName?.message}
              />

              {/* STUDENT VOLUME */}
              <div className="space-y-1">
                <label className="block font-medium text-slate-800 text-xs select-none">
                  Expected Student Volume <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register('studentCount')}
                  className="w-full h-[44px] rounded-[10px] border border-[#E2E8F0] px-[14px] text-xs font-normal text-slate-900 bg-white"
                >
                  <option value="1-100">1 - 100 students</option>
                  <option value="100-500">100 - 500 students</option>
                  <option value="500-1000">500 - 1,000 students</option>
                  <option value="1000+">1,000+ enterprise students</option>
                </select>
              </div>

              {/* COURSE COUNT */}
              <div className="space-y-1">
                <label className="block font-medium text-slate-800 text-xs select-none">
                  Number of Courses <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register('courseCount')}
                  className="w-full h-[44px] rounded-[10px] border border-[#E2E8F0] px-[14px] text-xs font-normal text-slate-900 bg-white"
                >
                  <option value="1-3">1 - 3 courses</option>
                  <option value="5-10">5 - 10 courses</option>
                  <option value="10+">10+ courses</option>
                </select>
              </div>

              {/* CURRENT PLATFORM */}
              <div className="space-y-1">
                <label className="block font-medium text-slate-800 text-xs select-none">
                  Current LMS Platform <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register('currentPlatform')}
                  className="w-full h-[44px] rounded-[10px] border border-[#E2E8F0] px-[14px] text-xs font-normal text-slate-900 bg-white"
                >
                  <option value="Teachable / Kajabi">Teachable / Kajabi</option>
                  <option value="WordPress / Learndash">WordPress / LearnDash</option>
                  <option value="Custom Built">Custom Built</option>
                  <option value="None / First Academy">None (Launching First Academy)</option>
                </select>
              </div>

              {/* PREFERRED DATE */}
              <TextInput
                label="Preferred Demo Date"
                type="date"
                required
                {...register('preferredDate')}
                error={errors.preferredDate?.message}
              />

              {/* PREFERRED TIME */}
              <TextInput
                label="Preferred Demo Time"
                type="time"
                required
                {...register('preferredTime')}
                error={errors.preferredTime?.message}
              />

              {/* TIME ZONE */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block font-medium text-slate-800 text-xs select-none">
                  Time Zone <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register('timeZone')}
                  className="w-full h-[44px] rounded-[10px] border border-[#E2E8F0] px-[14px] text-xs font-normal text-slate-900 bg-white"
                >
                  <option value="EST (UTC-5)">EST — US &amp; Canada Eastern</option>
                  <option value="PST (UTC-8)">PST — US &amp; Canada Pacific</option>
                  <option value="IST (UTC+5:30)">IST — India Standard Time</option>
                  <option value="GMT (UTC+0)">GMT — UK &amp; Europe</option>
                </select>
              </div>

              {/* MAIN REQUIREMENT */}
              <div className="sm:col-span-2">
                <TextInput
                  label="Primary Feature Requirement"
                  required
                  placeholder="e.g., QR Verification, OMR Quizzes, Student Chat, Branded Portal..."
                  {...register('mainRequirement')}
                  error={errors.mainRequirement?.message}
                />
              </div>

              {/* MESSAGE */}
              <div className="sm:col-span-2 space-y-1">
                <label className="block font-medium text-slate-800 text-xs select-none">Additional Notes / Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell us more about your current academy goals..."
                  {...register('message')}
                  className="w-full rounded-[10px] border border-[#E2E8F0] p-[14px] text-xs font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto font-semibold px-8">
                Submit Demo Request
              </Button>
            </div>
          </form>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
