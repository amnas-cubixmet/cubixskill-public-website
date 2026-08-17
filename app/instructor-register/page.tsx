'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { TextInput } from '@/components/ui/TextInput';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { useLeadStore } from '@/stores/lead.store';
import { toast } from 'sonner';

const registerAcademySchema = z.object({
  academyName: z.string().min(2, 'Academy Name is required'),
  fullName: z.string().min(2, 'Admin Full Name is required'),
  email: z.string().email('Valid email address is required'),
  countryCode: z.string().min(1, 'Country code is required'),
  phone: z.string().min(7, 'Valid 7-15 digit phone number is required'),
});

type RegisterAcademyFormValues = z.infer<typeof registerAcademySchema>;

export default function InstructorRegisterPage() {
  const createInstructorRegLead = useLeadStore((state) => state.createInstructorRegLead);
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
      countryCode: '+1',
      academyName: '',
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: RegisterAcademyFormValues) => {
    setApiError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const fullPhone = `${data.countryCode}${data.phone}`;

      const res = await fetch(`${baseUrl}/api/v1/auth/register/academy/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          academy_name: data.academyName,
          full_name: data.fullName,
          email: data.email,
          phone: fullPhone,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || responseData.detail || 'Registration failed. Please try again.');
      }

      // Record lead locally in lead store for tracking
      createInstructorRegLead({
        fullName: data.fullName,
        email: data.email,
        countryCode: data.countryCode,
        phone: data.phone,
        academyName: data.academyName,
      });

      setRegisteredEmail(data.email);
      setIsCompleted(true);
      toast.success('Registration Submitted Successfully!', {
        description: 'Please check your email to activate your Academy account.',
      });
    } catch (err: any) {
      setApiError(err.message || 'An error occurred during registration.');
      toast.error('Registration failed', { description: err.message });
    }
  };

  const handleResendEmail = async () => {
    if (!registeredEmail) return;
    setIsResending(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const res = await fetch(`${baseUrl}/api/v1/auth/email/resend/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail }),
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to resend email.');
      }
      toast.success('Activation Email Sent!', {
        description: `A new setup link was sent to ${registeredEmail}.`,
      });
    } catch (err: any) {
      toast.error('Resend failed', { description: err.message });
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
                Registration submitted successfully. Please check your email (<strong>{registeredEmail}</strong>) to activate your Academy account and set your password.
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
              <a href="http://localhost:5173/login" target="_self">
                <Button
                  type="button"
                  size="md"
                  className="w-full sm:w-auto font-semibold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Go to Academy Login
                </Button>
              </a>
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
              onCountryCodeChange={(code) => setValue('countryCode', code)}
              value={watch('phone')}
              onChange={(val) => setValue('phone', val)}
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
