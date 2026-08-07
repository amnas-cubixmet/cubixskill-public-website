import React, { forwardRef, useId } from 'react';
import { Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface CountryCodeOption {
  code: string;
  country: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: '+1', country: 'United States / Canada', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
];

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  helperText?: string;
  error?: string;
  isSuccess?: boolean;
  selectedCountryCode?: string;
  onCountryCodeChange?: (code: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      helperText,
      error,
      isSuccess,
      selectedCountryCode = '+1',
      onCountryCodeChange,
      value = '',
      onChange,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id || props.name || reactId;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Paste sanitization: allow only numbers
      const sanitized = e.target.value.replace(/\D/g, '').slice(0, 15);
      if (onChange) onChange(sanitized);
    };

    return (
      <div className="w-full space-y-1 font-sans text-xs text-left">
        {label && (
          <label htmlFor={inputId} className="block font-medium text-slate-800 text-xs select-none">
            {label}
            {props.required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {/* COUNTRY CODE SELECTOR */}
          <div className="absolute left-1.5 z-10 flex items-center">
            <select
              value={selectedCountryCode}
              onChange={(e) => onCountryCodeChange?.(e.target.value)}
              disabled={disabled}
              className="h-[36px] bg-slate-100/80 border-0 rounded-lg px-2 text-xs font-semibold text-slate-800 cursor-pointer focus:outline-hidden hover:bg-slate-200/80 transition-colors"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>

          <input
            id={inputId}
            ref={ref}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder="10-digit mobile number"
            className={`w-full h-[44px] min-h-[44px] rounded-[10px] border border-[#E2E8F0] pl-28 pr-10 text-sm font-normal text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-[var(--theme-primary,#2563EB)]/20 focus:border-[var(--theme-primary,#2563EB)] disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                : isSuccess
                ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                : 'hover:border-slate-300'
            } ${className}`}
            {...props}
          />

          <div className="absolute right-3.5 text-slate-400 flex items-center pointer-events-none">
            {error ? (
              <AlertCircle className="w-4 h-4 text-rose-500" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <Phone className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </div>

        {error ? (
          <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 mt-1">
            <span>❌</span>
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-500 font-normal mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
