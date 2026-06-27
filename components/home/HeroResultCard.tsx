import { TablerIcon } from "@/components/TablerIcon";

const ROWS = [
  { label: "Basic Pay", value: "£5,200.00" },
  { label: "Notice Pay", value: "£1,600.00" },
  { label: "Holiday Pay", value: "£1,040.00" },
  { label: "Other Payments", value: "£580.00" },
] as const;

const TRUST = [
  { icon: "ti-shield-check", title: "Accurate", sub: "Based on legislation" },
  { icon: "ti-bolt", title: "Fast", sub: "Results in seconds" },
  { icon: "ti-users", title: "Trusted", sub: "Used by thousands" },
] as const;

export function HeroResultCard() {
  return (
    <div className="relative flex items-start gap-4 lg:pl-4">
      {/* Decorative background blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -right-8 -top-8 h-[420px] w-[420px] opacity-60">
          <ellipse cx="240" cy="200" rx="220" ry="200" fill="url(#blob-grad)" />
          <defs>
            <radialGradient id="blob-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#D6E9FB" />
              <stop offset="100%" stopColor="#EBF4FD" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Result card */}
      <div className="relative flex-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_32px_-4px_rgba(24,95,165,0.10),0_2px_8px_-1px_rgba(0,0,0,0.04)]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[13px] text-ink-soft">Your estimated entitlement</span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
            Estimate
          </span>
        </div>

        <p className="text-[2.25rem] font-extrabold tracking-tight text-ink">£8,420.00</p>

        <dl className="mt-5">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-t border-dashed border-slate-100 py-2.5 text-[13px]"
            >
              <dt className="font-semibold text-ink">{row.label}</dt>
              <dd className="font-medium text-ink-soft">{row.value}</dd>
            </div>
          ))}
        </dl>

        {/* Shield badge */}
        <div className="mt-5 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 11l2 2 4-4" />
            </svg>
          </span>
          <span className="text-[11px] text-ink-faint">This is an estimate only. Results may vary.</span>
        </div>
      </div>

      {/* Side trust cards */}
      <div className="flex shrink-0 flex-col gap-3 pt-2">
        {TRUST.map((t) => (
          <div
            key={t.title}
            className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-sm"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <TablerIcon name={t.icon} size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12px] font-bold text-ink">{t.title}</p>
              <p className="text-[10px] text-ink-soft">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
