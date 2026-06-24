"use client";

import type { ReactNode } from "react";

/**
 * Reusable, accessible form primitives shared by every calculator so all
 * tools render identical, consistent inputs. Labels are always associated
 * with their control (WCAG).
 */

interface NumberFieldProps {
  id: string;
  label: string;
  value: number | "";
  onChange: (value: number | "") => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="flex items-center rounded-md border border-surface-line bg-white focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-50">
        {prefix && <span className="pl-3 text-sm text-ink-faint">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? "" : Number(v));
          }}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-ink outline-none"
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        {suffix && <span className="pr-3 text-sm text-ink-faint">{suffix}</span>}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-ink-faint">
          {hint}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}

export function SelectField({ id, label, value, onChange, options, hint }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-surface-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}
