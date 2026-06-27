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
    <div className="relative hidden min-h-[420px] w-full lg:flex lg:items-center lg:justify-center">

      {/* Cloud blob — explicit absolute fill behind everything */}
      <svg
        aria-hidden="true"
        viewBox="0 0 580 440"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="cg1" cx="48%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#BFD7F7" stopOpacity="1" />
            <stop offset="60%" stopColor="#D4E8FB" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EBF4FD" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Organic cloud path spanning most of the viewBox */}
        <path
          d="M 85 220
             C 60 130, 100 30, 200 18
             C 250 10, 290 45, 330 25
             C 375 5, 430 20, 465 65
             C 510 120, 530 190, 520 255
             C 510 330, 465 400, 390 425
             C 320 448, 240 442, 170 420
             C 100 398, 105 305, 85 220 Z"
          fill="url(#cg1)"
        />

        {/* Dot grid — top-left area of blob */}
        {[0,1,2,3,4,5,6,7].map(row =>
          [0,1,2,3,4,5,6].map(col => (
            <circle
              key={`${row}-${col}`}
              cx={78 + col * 20}
              cy={55 + row * 20}
              r={2.2}
              fill="#2563EB"
              fillOpacity={0.15}
            />
          ))
        )}
      </svg>

      {/* Floating content — card + trust cards */}
      <div className="relative z-10 flex items-start gap-3 px-12 py-8">

        {/* Result card */}
        <div className="relative w-[262px] shrink-0 rounded-2xl border border-white/80 bg-white p-6 shadow-[0_16px_48px_-8px_rgba(24,95,165,0.16),0_4px_16px_-2px_rgba(0,0,0,0.06)]">
          <p className="mb-2 text-[12px] text-slate-500">Your estimated entitlement</p>

          <div className="mb-4 flex items-center gap-2.5">
            <span className="text-[1.9rem] font-extrabold tracking-tight text-ink">£8,420.00</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">Estimate</span>
          </div>

          <dl>
            {ROWS.map((row) => (
              <div key={row.label} className="flex items-center justify-between border-t border-dashed border-slate-100 py-2.5 text-[13px]">
                <dt className="font-semibold text-slate-800">{row.label}</dt>
                <dd className="text-slate-500">{row.value}</dd>
              </div>
            ))}
          </dl>

          {/* Blue shield — floats below-left of card */}
          <div className="absolute -bottom-5 -left-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 shadow-[0_8px_24px_rgba(24,95,165,0.45)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 11l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Trust mini-cards */}
        <div className="flex flex-col gap-2 pt-3">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-2.5 rounded-xl border border-white/90 bg-white px-3.5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.iconBg}`}>
                <TablerIcon name={t.icon} size={16} aria-hidden="true" className={t.iconColor} />
              </span>
              <div>
                <p className="text-[12px] font-bold text-ink">{t.title}</p>
                <p className="text-[10px] text-slate-500">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
