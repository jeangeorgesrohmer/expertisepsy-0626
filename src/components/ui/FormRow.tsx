import React from 'react';

interface FormRowProps {
  label: string;
  children: React.ReactNode;
}

export function FormRow({ label, children }: FormRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-3 sm:py-2 border-b border-slate-50 last:border-b-0">
      <span className="text-sm text-slate-700 leading-snug sm:flex-1">{label}</span>
      <div className="flex items-center gap-2 flex-shrink-0">{children}</div>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 sm:px-5 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="px-4 sm:px-5 py-2">{children}</div>
    </div>
  );
}

export function SubSectionTitle({ title }: { title: string }) {
  return (
    <div className="pt-4 pb-1 first:pt-1">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-dashed border-slate-200 pb-1.5">
        {title}
      </h4>
    </div>
  );
}

const inputClass =
  'px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors w-full sm:w-40 min-h-[2.75rem]';

const numberInputClass =
  'px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors w-full sm:w-24 min-h-[2.75rem]';

export function InlineText({
  value,
  onChange,
  placeholder = 'Préciser...',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function InlineNumber({
  value,
  onChange,
  placeholder = '0',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      min={0}
      className={numberInputClass}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function StandaloneText({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="py-2 border-b border-slate-50 last:border-b-0">
      <label className="block text-sm text-slate-700 mb-1.5">{label}</label>
      <input
        type="text"
        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors min-h-[2.75rem]"
        placeholder={placeholder ?? 'Préciser...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function StandaloneNumber({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="py-2 border-b border-slate-50 last:border-b-0">
      <label className="block text-sm text-slate-700 mb-1.5">{label}</label>
      <input
        type="number"
        min={0}
        className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors w-full sm:w-32 min-h-[2.75rem]"
        placeholder={placeholder ?? '0'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
