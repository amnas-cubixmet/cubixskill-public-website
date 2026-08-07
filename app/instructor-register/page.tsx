'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ArrowRight, ArrowLeft, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { TextInput } from '@/components/ui/TextInput';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { useLeadStore } from '@/stores/lead.store';
import { toast } from 'sonner';

const instructorRegSchema = z
  .object({
    fullName: z.string().min(2, 'Full Name is required'),
    email: z.string().email('Valid email address is required'),
    countryCode: z.string().min(1),
    phone: z.string().min(7, 'Valid 7-15 digit phone number is required'),
    country: z.string().min(2, 'Country selection is required'),
    academyName: z.string().min(2, 'Academy Name is required'),
    businessType: z.string().min(1, 'Business Type selection is required'),
    expectedStudents: z.string().min(1, 'Expected Students selection is required'),
    primaryRequirement: z.string().min(2, 'Primary requirement is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm Password is required'),
    agreeTerms: z.boolean().refine((val) => val === true, 'You must agree to the Terms of Service'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type InstructorRegFormValues = z.infer<typeof instructorRegSchema>;

export default function InstructorRegisterPage() {
  const createInstructorRegLead = useLeadStore((state) => state.createInstructorRegLead);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<InstructorRegFormValues>({
    resolver: zodResolver(instructorRegSchema),
    defaultValues: {
      countryCode: '+1',
      country: 'United States',
      businessType: 'Independent Instructor',
      expectedStudents: '100-500',
      agreeTerms: true,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof InstructorRegFormValues)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['fullName', 'email', 'phone', 'country'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['academyName', 'businessType', 'expectedStudents'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['primaryRequirement'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      toast.error('Validation Warning', {
        description: 'Please complete all required fields on this step before proceeding.',
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: InstructorRegFormValues) => {
    try {
      createInstructorRegLead({
        fullName: data.fullName,
        email: data.email,
        countryCode: data.countryCode,
        phone: data.phone,
        country: data.country,
        academyName: data.academyName,
        studentCount: data.expectedStudents,
        message: `Primary Need: ${data.primaryRequirement}. Business Type: ${data.businessType}`,
      });

      setIsCompleted(true);
      toast.success('Instructor Registration Successful!', {
        description: 'Your CubixSkill academy workspace is being provisioned.',
      });
    } catch (err: any) {
      toast.error('Registration failed', { description: err.message });
    }
  };

  const steps = [
    { num: 1, title: 'Personal Info' },
    { num: 2, title: 'Academy Info' },
    { num: 3, title: 'Requirements' },
    { num: 4, title: 'Account Setup' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-3xl mx-auto w-full space-y-8">
        {/* PAGE TITLE */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200 uppercase tracking-wider">
            Instructor Registration
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Launch Your Online Academy in 4 Steps
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            No credit card required. Full access to website builder, student portal, and live streaming.
          </p>
        </div>

        {/* STEP PROGRESS BAR */}
        {!isCompleted && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="grid grid-cols-4 gap-2 text-center">
              {steps.map((s) => {
                const isActive = currentStep === s.num;
                const isPassed = currentStep > s.num;
                return (
                  <div key={s.num} className="space-y-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto transition-all ${
                        isPassed
                          ? 'bg-emerald-500 text-white'
                          : isActive
                          ? 'bg-[#2563EB] text-white shadow-md'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`text-[11px] font-semibold block truncate ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* IF COMPLETED: SUCCESS CARD */}
        {isCompleted ? (
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-2xs">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                WORKSPACE PROVISIONED
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to CubixSkill!</h2>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Your instructor account and academy dashboard have been successfully registered. You can now configure your academy logo, create courses, and invite staff.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/550e8400-e29b-41d4-a716-446655440000">
                <Button size="md" variant="outline" className="w-full sm:w-auto font-semibold">
                  View Demo Public Academy Site
                </Button>
              </Link>
              <Link href="/login">
                <Button size="md" className="w-full sm:w-auto font-semibold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Access Instructor Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* MULTI-STEP FORM */
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            {/* STEP 1: PERSONAL INFO */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Step 1: Personal Information</h3>
                  <p className="text-xs text-slate-500 font-normal">Tell us about yourself as the primary academy administrator.</p>
                </div>

                <TextInput
                  label="Full Name"
                  required
                  placeholder="Dr. Vikramaditya Rao"
                  {...register('fullName')}
                  error={errors.fullName?.message}
                />

                <TextInput
                  label="Email Address"
                  type="email"
                  required
                  placeholder="vikram@brightacademy.io"
                  {...register('email')}
                  error={errors.email?.message}
                />

                <PhoneInput
                  label="Phone Number"
                  required
                  selectedCountryCode={watch('countryCode')}
                  onCountryCodeChange={(code) => setValue('countryCode', code)}
                  value={watch('phone')}
                  onChange={(val) => setValue('phone', val)}
                  error={errors.phone?.message}
                />

                <TextInput
                  label="Country"
                  required
                  placeholder="United States"
                  {...register('country')}
                  error={errors.country?.message}
                />
              </div>
            )}

            {/* STEP 2: ACADEMY INFO */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Step 2: Academy Information</h3>
                  <p className="text-xs text-slate-500 font-normal">Details regarding your online academy branding.</p>
                </div>

                <TextInput
                  label="Proposed Academy Name"
                  required
                  placeholder="Bright Academy of Technology"
                  {...register('academyName')}
                  error={errors.academyName?.message}
                />

                <div className="space-y-1">
                  <label className="block font-medium text-slate-800 text-xs select-none">
                    Business Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('businessType')}
                    className="w-full h-[44px] rounded-[10px] border border-[#E2E8F0] px-[14px] text-xs font-normal text-slate-900 bg-white"
                  >
                    <option value="Independent Instructor">Independent Solo Instructor</option>
                    <option value="Training Institute">Coaching &amp; Training Institute</option>
                    <option value="Enterprise Academy">Enterprise Corporate Academy</option>
                    <option value="University / School">University or School Department</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-medium text-slate-800 text-xs select-none">
                    Expected Active Students <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('expectedStudents')}
                    className="w-full h-[44px] rounded-[10px] border border-[#E2E8F0] px-[14px] text-xs font-normal text-slate-900 bg-white"
                  >
                    <option value="1-100">1 - 100 students</option>
                    <option value="100-500">100 - 500 students</option>
                    <option value="500-1000">500 - 1,000 students</option>
                    <option value="1000+">1,000+ enterprise students</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: REQUIREMENTS */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Step 3: Platform Requirements</h3>
                  <p className="text-xs text-slate-500 font-normal">Help us customize your workspace configuration.</p>
                </div>

                <TextInput
                  label="Primary Feature Priority"
                  required
                  placeholder="e.g., QR Verification, Drip Learning, Personal Chat, OMR Scanning..."
                  {...register('primaryRequirement')}
                  error={errors.primaryRequirement?.message}
                />
              </div>
            )}

            {/* STEP 4: ACCOUNT SETUP */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Step 4: Account Setup &amp; Password</h3>
                  <p className="text-xs text-slate-500 font-normal">Set your instructor portal login credentials.</p>
                </div>

                <TextInput
                  label="Password"
                  type="password"
                  required
                  placeholder="••••••••"
                  {...register('password')}
                  error={errors.password?.message}
                />

                <TextInput
                  label="Confirm Password"
                  type="password"
                  required
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="termsCheck"
                    {...register('agreeTerms')}
                    className="w-4 h-4 rounded-md border-slate-300 text-[#2563EB]"
                  />
                  <label htmlFor="termsCheck" className="text-xs text-slate-600 font-normal select-none">
                    I agree to the <Link href="/terms" className="text-[#2563EB] underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#2563EB] underline">Privacy Policy</Link>.
                  </label>
                </div>
                {errors.agreeTerms && <p className="text-[11px] text-rose-600 font-semibold">❌ {errors.agreeTerms.message}</p>}
              </div>
            )}

            {/* STEP BUTTON CONTROLS */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" size="md" onClick={prevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button type="button" size="md" onClick={nextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Continue to Step {currentStep + 1}
                </Button>
              ) : (
                <Button type="submit" size="md" isLoading={isSubmitting} className="font-semibold px-8">
                  Complete Registration
                </Button>
              )}
            </div>
          </form>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
