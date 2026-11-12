'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MailCheck } from 'lucide-react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/Button';
import {
  registerInstructor,
  resendInstructorSetup,
  type InstructorRegistrationRequest,
} from '@/services/instructor-registration.service';

import { resolveInstructorLoginUrl } from '@/lib/instructor-login-url';

const instructorLoginUrl = resolveInstructorLoginUrl(
  process.env.NEXT_PUBLIC_INSTRUCTOR_PANEL_URL,
  process.env.NEXT_PUBLIC_INSTRUCTOR_LOGIN_PATH,
);

const countries = [
  { code: '+91', label: 'India', digits: 10 },
  { code: '+971', label: 'UAE', digits: 9 },
  { code: '+966', label: 'Saudi Arabia', digits: 9 },
  { code: '+974', label: 'Qatar', digits: 8 },
  { code: '+968', label: 'Oman', digits: 8 },
  { code: '+965', label: 'Kuwait', digits: 8 },
  { code: '+973', label: 'Bahrain', digits: 8 },
  { code: '+1', label: 'US / Canada', digits: 10 },
  { code: '+44', label: 'United Kingdom', digits: 10 },
];

const schema = z.object({
  full_name: z.string().trim().min(2, 'Enter your full name.').max(255),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email('Enter a valid email address.')),
  country_code: z.string().refine((code) => countries.some((country) => country.code === code), 'Select a country code.'),
  mobile: z.string().trim().regex(/^[1-9][0-9]{6,12}$/, 'Enter your mobile number without the country code or leading zero.'),
  qualification: z.string().trim().min(1, 'Enter your qualification.').max(160),
  teaching_subjects: z.string().trim().min(1, 'Enter a subject or skill you teach.').max(200),
  years_experience: z.number({ error: 'Enter your years of teaching experience.' }).int().min(0).max(70),
  bio: z.string().trim().min(1, 'Enter a short professional bio.').max(500),
}).superRefine(({ country_code, mobile }, context) => {
  const country = countries.find(({ code }) => code === country_code);
  if (country && (mobile.length !== country.digits || (country_code === '+91' && !/^[6-9]/.test(mobile)))) {
    context.addIssue({
      code: 'custom',
      path: ['mobile'],
      message: `Enter a valid ${country.digits}-digit mobile number for ${country.label}.`,
    });
  }
});

const fieldOrder: (keyof InstructorRegistrationRequest)[] = [
  'full_name', 'email', 'country_code', 'mobile', 'qualification',
  'teaching_subjects', 'years_experience', 'bio',
];

const controlClass = 'w-full min-w-0 scroll-mt-24 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-rose-600';

function Field({ id, label, error, children }: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm text-rose-700">{error}</p>}
    </div>
  );
}

export default function InstructorRegisterPage() {
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [resending, setResending] = useState(false);
  const submitting = useRef(false);
  const resendPending = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const {
    register, handleSubmit, setError, setFocus, getValues,
    formState: { errors, isSubmitting },
  } = useForm<InstructorRegistrationRequest>({
    resolver: zodResolver(schema),
    defaultValues: { country_code: '+91' },
  });

  useEffect(() => {
    if (email) successHeading.current?.focus();
  }, [email]);

  function fieldProps(name: keyof InstructorRegistrationRequest) {
    return {
      id: name,
      required: true,
      className: controlClass,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setNotice('');
    try {
      await handleSubmit(async (data) => {
        const { status, result } = await registerInstructor(data);
        if (status === 201 && result?.success && result.data?.status === 'pending_activation') {
          setResendMessage('');
          setEmail(data.email);
          return;
        }

        let firstInvalid: keyof InstructorRegistrationRequest | undefined;
        for (const field of fieldOrder) {
          const error = result?.errors?.[field];
          const message = Array.isArray(error) ? error[0] : error;
          if (typeof message !== 'string') continue;
          setError(field, { type: 'server', message });
          firstInvalid ??= field;
        }
        if (firstInvalid) setFocus(firstInvalid);
        setNotice(result?.message || 'Registration could not be completed. Please try again.');
      })(event);
    } finally {
      submitting.current = false;
    }
  }

  async function resend(emailAddress: string) {
    if (resendPending.current) return;
    resendPending.current = true;
    setResending(true);
    setResendMessage('');
    try {
      const { status, result } = await resendInstructorSetup(emailAddress);
      setResendMessage(status === 200 && result?.success
        ? 'If your account is awaiting activation, a new setup email will be sent.'
        : result?.message || 'Could not resend the setup email. Please try again.');
    } finally {
      resendPending.current = false;
      setResending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <MainHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-14">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Instructor registration</h1>
          {!email && <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            Create your CubixSkill teaching profile. We’ll email you a link to set your password and open your Instructor Panel.
          </p>}
        </header>

        {email ? (
          <section className="mx-auto max-w-lg space-y-4 rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm sm:p-9">
            <MailCheck aria-hidden="true" className="mx-auto size-11 rounded-xl bg-blue-50 p-2.5 text-blue-700" />
            <h2 ref={successHeading} tabIndex={-1} className="text-2xl font-semibold text-slate-950">
              Check your email to activate
            </h2>
            <p className="break-words text-sm leading-relaxed text-slate-600">
              Your instructor profile was created. A password setup link is queued for <strong>{email}</strong>.
              Check your spam folder if it doesn’t arrive in a few minutes.
            </p>
            <Button type="button" variant="outline" isLoading={resending} loadingText="Requesting…" onClick={() => resend(email)}>
              Resend setup email
            </Button>
            <p role="status" className="text-sm text-slate-700">{resendMessage}</p>
          </section>
        ) : (
          <form noValidate onSubmit={submit} aria-busy={isSubmitting} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
            {notice && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{notice}</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="full_name" label="Full name" error={errors.full_name?.message}>
                <input {...fieldProps('full_name')} {...register('full_name')} autoComplete="name" maxLength={255} />
              </Field>
              <Field id="email" label="Email address" error={errors.email?.message}>
                <input {...fieldProps('email')} {...register('email')} type="email" autoComplete="email" maxLength={254} />
              </Field>
              <Field id="country_code" label="Country code" error={errors.country_code?.message}>
                <select {...fieldProps('country_code')} {...register('country_code')} autoComplete="tel-country-code">
                  {countries.map(({ code, label }) => <option key={code} value={code}>{label} ({code})</option>)}
                </select>
              </Field>
              <Field id="mobile" label="Mobile number" error={errors.mobile?.message}>
                <input {...fieldProps('mobile')} {...register('mobile')} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={13} />
              </Field>
              <Field id="qualification" label="Qualification" error={errors.qualification?.message}>
                <input {...fieldProps('qualification')} {...register('qualification')} maxLength={160} />
              </Field>
              <Field id="years_experience" label="Years of teaching experience" error={errors.years_experience?.message}>
                <input {...fieldProps('years_experience')} {...register('years_experience', { valueAsNumber: true })} type="number" inputMode="numeric" min={0} max={70} step={1} />
              </Field>
            </div>
            <Field id="teaching_subjects" label="Teaching subjects or skills" error={errors.teaching_subjects?.message}>
              <input {...fieldProps('teaching_subjects')} {...register('teaching_subjects')} maxLength={200} />
            </Field>
            <Field id="bio" label="Short professional bio" error={errors.bio?.message}>
              <textarea {...fieldProps('bio')} {...register('bio')} rows={4} maxLength={500} />
            </Field>
            <Button type="submit" isLoading={isSubmitting} loadingText="Submitting…" className="w-full sm:w-auto">
              Register as instructor
            </Button>
            {errors.email?.type === 'server' && (
              <div className="space-y-2">
                <Button type="button" variant="outline" isLoading={resending} onClick={() => resend(getValues('email').trim())}>
                  Resend setup email
                </Button>
                <p role="status" className="text-sm text-slate-700">{resendMessage}</p>
              </div>
            )}
          </form>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 text-sm text-slate-700">
          <span>Already have an account?</span>
          {instructorLoginUrl ? (
            <a href={instructorLoginUrl} className="inline-flex min-h-11 items-center rounded-md px-2 font-semibold text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-blue-600">
              Login
            </a>
          ) : (
            <p role="status" className="basis-full text-center text-slate-600">
              Instructor login is unavailable because the Instructor Panel URL is missing or invalid.
            </p>
          )}
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
