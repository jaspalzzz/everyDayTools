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
  { icon: "ti-users", title: "Trusted", sub: "Across four countries" },
  { icon: "ti-lock", title: "Private", sub: "We don't store your data" },
] as const;

export function HeroResultCard() {
  return (
    <div className="grid items-start gap-5 sm:grid-cols-[1.1fr_0.9fr]">
      {/* Example result card */}
      <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-[0_10px_30px_-5px_rgba(24,95,165,0.06),0_4px_12px_-2px_rgba(0,0,0,0.03)]">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[13px] font-bold text-ink">Example Result</span>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
            Estimate
          </span>
        </div>
        <p className="text-xs text-ink-soft">Your estimated entitlement</p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-ink">£8,420.00</p>
        <dl className="mt-6">
          {ROWS.map((row) => (
            <div key={row.label} className="flex items-center justify-between border-t border-dashed border-surface-line py-3 text-[13px]">
              <dt className="font-semibold text-ink">{row.label}</dt>
              <dd className="font-medium text-ink-soft">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[11px] text-ink-faint">This is an estimate only</p>
      </div>

      {/* Side value badges */}
      <div className="flex flex-col gap-4">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-start gap-3 rounded-2xl border border-surface-line bg-white p-4 shadow-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <TablerIcon name={t.icon} size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[13px] font-bold text-ink">{t.title}</p>
              <p className="mt-0.5 text-[11px] text-ink-soft">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
