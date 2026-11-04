'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { TextInput } from '@/components/ui/TextInput';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { toast } from 'sonner';

const registerAcademySchema = z.object({
  academyName: z.string().trim().min(2, 'Academy name must contain at least 2 characters'),
  fullName: z.string().trim().min(2, 'Full name must contain at least 2 characters'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  countryCode: z.string().min(1, 'Country code is required'),
  phone: z.string().regex(/^\d{7,15}$/, 'Enter a valid 7-15 digit phone number'),
});

type RegisterAcademyFormValues = z.infer<typeof registerAcademySchema>;

function apiErrorMessage(response: unknown, fallback: string): string {
  if (!response || typeof response !== 'object') return fallback;
  const body = response as Record<string, unknown>;
  if (typeof body.message === 'string' && body.message.trim()) return body.message;
  if (typeof body.detail === 'string' && body.detail.trim()) return body.detail;
  for (const [field, value] of Object.entries(body)) {
    if (Array.isArray(value) && typeof value[0] === 'string') {
      return `${field.replace(/_/g, ' ')}: ${value[0]}`;
    }
    if (typeof value === 'string' && field !== 'code') return value;
  }
  return fallback;
}

const instructorLoginUrl =
  process.env.NEXT_PUBLIC_INSTRUCTOR_LOGIN_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5173/login' : null);


export default function InstructorRegisterPage() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterAcademyFormValues>({
    resolver: zodResolver(registerAcademySchema),
    defaultValues: {
      countryCode: '+91',
      academyName: '',
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: RegisterAcademyFormValues) => {
    setApiError(null);
    try {
      const res = await fetch('/api/instructor-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          academy_name: data.academyName,
          full_name: data.fullName,
          email: data.email,
          phone: `${data.countryCode}${data.phone}`,
        }),
      });
      const responseData: unknown = await res.json().catch(() => null);

      if (res.status !== 201 || !responseData || typeof responseData !== 'object' ||
          (responseData as { success?: boolean; data?: { academy_uuid?: string } }).success !== true ||
          !(responseData as { data?: { academy_uuid?: string } }).data?.academy_uuid) {
        throw new Error(apiErrorMessage(responseData, 'Registration could not be completed. Please try again.'));
      }

      setRegisteredEmail(data.email);
      setIsCompleted(true);
      toast.success('Academy registered', {
        description: 'Your password setup email has been queued. Check your inbox.',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred during registration.';
      setApiError(message);
      toast.error('Registration failed', { description: message });
    }
  };

  const handleResendEmail = async () => {
    if (!registeredEmail) return;
    setIsResending(true);
    try {
      const res = await fetch('/api/instructor-register/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail }),
      });
      const responseData: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(apiErrorMessage(responseData, 'Unable to request another setup email.'));
      }
      toast.success('Request received', {
        description: 'If your account is eligible, a fresh password setup email will be sent.',
      });
    } catch (err: unknown) {
      toast.error('Resend failed', {
        description: err instanceof Error ? err.message : 'Please try again later.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <MainHeader />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-xl mx-auto w-full space-y-6">
        {/* PAGE TITLE */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200 uppercase tracking-wider">
            Academy Registration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Register Your Academy on CubixSkill
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Create your Academy workspace and set up your initial Administrator account.
          </p>
        </div>

        {/* SUCCESS CARD */}
        {isCompleted ? (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] mx-auto shadow-2xs">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                REGISTRATION SUBMITTED
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Check Your Email to Activate
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto">
                Your Academy account was created. A password setup email is queued for <strong>{registeredEmail}</strong>. Delivery can take a few minutes; check your spam folder too.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Next Steps for Academy Admin</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 font-normal">
                <li>Click the single-use setup link sent to your inbox.</li>
                <li>Create your secure administrator password.</li>
                <li>Log in to access your CubixSkill Academy Portal.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleResendEmail}
                isLoading={isResending}
                leftIcon={<RefreshCw className="w-4 h-4" />}
                className="w-full sm:w-auto font-semibold"
              >
                Resend Email
              </Button>
              {instructorLoginUrl && <a href={instructorLoginUrl}>
                <Button
                  type="button"
                  size="md"
                  className="w-full sm:w-auto font-semibold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Go to Academy Login
                </Button>
              </a>}
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5"
          >
            {apiError && (
              <FormAlert type="error" message={apiError} />
            )}


            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Academy Administrator Information</h3>
              <p className="text-xs text-slate-500 font-normal">
                You will be assigned as the primary Academy Admin.
              </p>
            </div>

            <TextInput
              label="Academy Name"
              required
              placeholder="e.g., Bright Academy of Technology"
              {...register('academyName')}
              error={errors.academyName?.message}
            />

            <TextInput
              label="Admin Full Name"
              required
              placeholder="e.g., Dr. Vikramaditya Rao"
              {...register('fullName')}
              error={errors.fullName?.message}
            />

            <TextInput
              label="Work Email Address"
              type="email"
              required
              placeholder="e.g., admin@brightacademy.io"
              {...register('email')}
              error={errors.email?.message}
            />

            <PhoneInput
              label="Phone Number"
              required
              selectedCountryCode={watch('countryCode')}
              onCountryCodeChange={(code) => setValue('countryCode', code, { shouldValidate: true })}
              value={watch('phone')}
              onChange={(val) => setValue('phone', val, { shouldValidate: true, shouldDirty: true })}
              error={errors.phone?.message}
            />

            <div className="pt-4 border-t border-slate-100">
              <Button
                type="submit"
                size="md"
                isLoading={isSubmitting}
                className="w-full font-semibold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Submit Registration
              </Button>
            </div>
          </form>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
