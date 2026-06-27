import { TablerIcon } from "@/components/TablerIcon";

const ROWS = [
  { label: "Basic Pay", value: "£5,200.00" },
  { label: "Notice Pay", value: "£1,600.00" },
  { label: "Holiday Pay", value: "£1,040.00" },
  { label: "Other Payments", value: "£580.00" },
] as const;

const TRUST = [
  { icon: "ti-shield-check", title: "Accurate", sub: "Based on legislation", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  { icon: "ti-clock-hour-4", title: "Fast", sub: "Results in seconds", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  { icon: "ti-users", title: "Trusted", sub: "Used by thousands", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
] as const;

export function HeroResultCard() {
  return (
    <div className="relative hidden lg:block">
      {/* Decorative blob — layered organic SVG */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-8 -z-10 h-[420px] w-[420px]">
        <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <defs>
            <radialGradient id="blobGrad1" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#C7DCFA" />
              <stop offset="100%" stopColor="#E8F2FD" stopOpacity="0.4" />
            </radialGradient>
            <radialGradient id="blobGrad2" cx="55%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#D6E8FB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EEF5FD" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          {/* Outer organic blob */}
          <path
            d="M340 180C340 270 280 360 195 370C110 380 40 310 30 220C20 130 80 40 175 30C270 20 340 90 340 180Z"
            fill="url(#blobGrad1)"
          />
          {/* Inner blob — slightly rotated for depth */}
          <path
            d="M300 190C300 260 250 330 180 335C110 340 60 275 55 205C50 135 105 65 175 60C245 55 300 120 300 190Z"
            fill="url(#blobGrad2)"
          />
          {/* Dot grid texture — top-right quadrant */}
          {[0,1,2,3,4].map(row =>
            [0,1,2,3,4].map(col => (
              <circle
                key={`${row}-${col}`}
                cx={260 + col * 18}
                cy={48 + row * 18}
                r="2"
                fill="#185FA5"
                fillOpacity="0.12"
              />
            ))
          )}
        </svg>
      </div>

      <div className="flex items-start gap-4">
        {/* Result card */}
        <div className="relative min-w-[260px] flex-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_32px_-4px_rgba(24,95,165,0.12),0_2px_8px_-1px_rgba(0,0,0,0.04)]">
          <p className="mb-3 text-[12px] text-ink-soft">Your estimated entitlement</p>

          <div className="mb-5 flex items-center gap-3">
            <span className="text-[2rem] font-extrabold tracking-tight text-ink">£8,420.00</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
              Estimate
            </span>
          </div>

          <dl>
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-t border-dashed border-slate-100 py-2.5 text-[13px]"
              >
                <dt className="font-semibold text-ink">{row.label}</dt>
                <dd className="text-ink-soft">{row.value}</dd>
              </div>
            ))}
          </dl>

          {/* Shield badge — overlaps bottom-left corner */}
          <div className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 shadow-[0_4px_16px_rgba(24,95,165,0.35)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 11l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Trust cards stacked */}
        <div className="flex flex-col gap-2.5 pt-2">
          {TRUST.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-sm"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.iconBg}`}>
                <TablerIcon name={t.icon} size={16} aria-hidden="true" className={t.iconColor} />
              </span>
              <div>
                <p className="text-[12px] font-bold text-ink">{t.title}</p>
                <p className="text-[10px] text-ink-soft">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
