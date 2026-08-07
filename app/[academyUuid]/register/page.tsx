'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  UserPlus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MailCheck,
  ExternalLink,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { AcademyHeader } from '@/components/layout/AcademyHeader';
import { AcademyFooter } from '@/components/layout/AcademyFooter';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { useAcademyStore } from '@/stores/academy.store';
import { useRegistrationStore } from '@/stores/registration.store';
import { toast } from 'sonner';

export default function StudentRegisterPage() {
  const { academyUuid } = useParams<{ academyUuid: string }>();
  const getAcademyByUuid = useAcademyStore((state) => state.getAcademyByUuid);
  const registerStudent = useRegistrationStore((state) => state.registerStudent);

  const academy = getAcademyByUuid(academyUuid);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [consentPasswordEmail, setConsentPasswordEmail] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Announcement state after successful registration
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [setupToken, setSetupToken] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState('');

  if (!academy) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error('Terms Agreement Required', { description: 'Please accept the Terms of Service to proceed.' });
      return;
    }

    const result = registerStudent({
      fullName,
      email,
      countryCode: '+91',
      phone,
      country: 'India',
      consentPasswordEmail,
      agreeTerms,
      academyUuid,
    });

    if (result.success && result.token) {
      setRegistrationSuccess(true);
      setSetupToken(result.token);
      setRegisteredEmail(email);
      toast.success('Registration Successful!', {
        description: `Password setup link sent to ${email}`,
      });
    } else {
      toast.error('Registration Failed', { description: result.error || 'Please check your inputs.' });
    }
  };

  const resetForm = () => {
    setRegistrationSuccess(false);
    setSetupToken(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-xs text-slate-900 hide-scrollbar">
      <AcademyHeader academy={academy} />

      <main className="flex-1 py-12 px-4 md:px-6 max-w-xl mx-auto space-y-6 w-full">
        {/* TOP BADGE & TITLE */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Student Portal Registration</h1>
          <p className="text-xs text-slate-600">Create your official student account for {academy.name}.</p>
        </div>

        {/* REGISTRATION ANNOUNCEMENT CARD (WHEN SUCCESSFUL) */}
        {registrationSuccess ? (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-emerald-200 shadow-xl space-y-6 text-left animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <MailCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-emerald-950">Password Setup Email Sent!</h3>
                <p className="text-xs text-emerald-700 font-normal">
                  We have dispatched a secure password creation link to <span className="font-bold">{registeredEmail}</span>.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Please check your email inbox to click the secure setup link and create your permanent student password.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href={`http://localhost:5173/setup-password?token=${setupToken}`}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <Button
                  size="lg"
                  style={{ backgroundColor: academy.theme.primaryColor }}
                  className="w-full font-semibold justify-center text-white min-h-[48px]"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  Complete Password Setup Now
                </Button>
              </a>

              <Button
                size="md"
                variant="outline"
                onClick={resetForm}
                className="w-full font-semibold justify-center min-h-[44px]"
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Register Another Student Account
              </Button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 text-left">
            <TextInput
              label="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Aarav Patel"
            />
            <TextInput
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aarav@gmail.com"
            />
            <TextInput
              label="Phone Number"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
            />

            {/* CHECKBOX OPTIONS */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={consentPasswordEmail}
                  onChange={(e) => setConsentPasswordEmail(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span>Send me an email link to set up my student account password</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span>
                  I agree to the {academy.name}{' '}
                  <Link href={`/${academyUuid}/terms`} className="text-blue-600 underline font-semibold">
                    Terms &amp; Conditions
                  </Link>
                </span>
              </label>
            </div>

            {/* PRIVILEGES INFO CARD */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Student Account Privileges:</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Instant access to enrolled course curriculum &amp; video lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Automated QR code certificate generation upon passing exams</span>
              </div>
            </div>

            <Button
              type="submit"
              size="md"
              style={{ backgroundColor: academy.theme.primaryColor }}
              className="w-full font-semibold justify-center text-white min-h-[48px]"
            >
              Create Account &amp; Send Setup Email
            </Button>
          </form>
        )}
      </main>

      <AcademyFooter academy={academy} />
    </div>
  );
}
