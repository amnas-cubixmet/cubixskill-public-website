import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'course' | 'hero';
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  count = 1,
  className = '',
  ...props
}) => {
  const base = 'animate-pulse bg-slate-200/80 rounded-xl';

  if (variant === 'course') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs space-y-3 p-3">
        <div className="h-40 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-4 bg-slate-200 rounded-md w-3/4 animate-pulse" />
        <div className="h-3 bg-slate-200 rounded-md w-1/2 animate-pulse" />
        <div className="h-10 bg-slate-200 rounded-xl animate-pulse mt-4" />
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="space-y-4 p-6 bg-white border border-slate-200 rounded-3xl animate-pulse">
        <div className="h-6 bg-slate-200 rounded-full w-1/3" />
        <div className="h-10 bg-slate-200 rounded-xl w-2/3" />
        <div className="h-4 bg-slate-200 rounded-md w-1/2" />
        <div className="h-12 bg-slate-200 rounded-xl w-44 mt-6" />
      </div>
    );
  }

  if (variant === 'circular') {
    return <div className={`${base} rounded-full ${className}`} {...props} />;
  }

  return (
    <div className="space-y-2">
      {[...Array(count)].map((_, idx) => (
        <div key={idx} className={`${base} ${className}`} {...props} />
      ))}
    </div>
  );
};
