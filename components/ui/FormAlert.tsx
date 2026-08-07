import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export type FormAlertType = 'error' | 'success' | 'warning' | 'info';

export interface FormAlertProps {
  type?: FormAlertType;
  title?: string;
  message: React.ReactNode;
  className?: string;
}

export const FormAlert: React.FC<FormAlertProps> = ({
  type = 'error',
  title,
  message,
  className = '',
}) => {
  const icons = {
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />,
  };

  const styles = {
    error: 'bg-rose-50 border-rose-200 text-rose-950',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    warning: 'bg-amber-50 border-amber-200 text-amber-950',
    info: 'bg-sky-50 border-sky-200 text-sky-950',
  };

  return (
    <div
      className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs font-sans animate-in fade-in ${styles[type]} ${className}`}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-bold text-xs md:text-sm leading-tight mb-0.5">{title}</h4>}
        <div className="font-normal leading-relaxed opacity-95">{message}</div>
      </div>
    </div>
  );
};
