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
  { icon: "ti-users", title: "Trusted", sub: "Used across four countries" },
  { icon: "ti-lock", title: "Private", sub: "We don't store your data" },
] as const;

export function HeroResultCard() {
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {/* Example result card */}
      <div className="rounded-2xl border border-surface-line bg-white p-5 shadow-sm sm:col-span-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Example result</p>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-600">
            Illustrative
          </span>
        </div>
        <div className="mt-4 border-b border-surface-line pb-4">
          <p className="text-xs text-ink-faint">Your estimated entitlement</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">£8,420.00</p>
        </div>
        <dl className="mt-4 flex flex-col gap-2.5">
          {ROWS.map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm">
              <dt className="text-ink-soft">{row.label}</dt>
              <dd className="font-medium text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[11px] text-ink-faint">
          Example figures only — your result depends on the details you enter.
        </p>
      </div>

      {/* Trust mini-cards */}
      <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-1">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-start gap-2.5 rounded-xl border border-surface-line bg-white p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <TablerIcon name={t.icon} size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">{t.title}</p>
              <p className="text-[11px] text-ink-faint">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
