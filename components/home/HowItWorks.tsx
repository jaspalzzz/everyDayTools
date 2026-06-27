import { TablerIcon } from "@/components/TablerIcon";

const STEPS = [
  {
    icon: "ti-world",
    title: "Jurisdiction-aware",
    sub: "Employment law differs by country. Select UK, US, Canada or Australia — every calculation uses that country's current statutory rates.",
  },
  {
    icon: "ti-lock",
    title: "Completely private",
    sub: "No account. No data stored. Your figures are calculated in your browser and never sent to a server or third party.",
  },
  {
    icon: "ti-file-check",
    title: "Law-backed estimates",
    sub: "Results are based on current statutory legislation and payroll rules — not guesswork. Updated for 2026 pay rates.",
  },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="mt-6">
      <div className="mb-6 flex items-end justify-between">
        <h2 id="how-heading" className="text-[1.375rem] font-bold tracking-tight text-ink">
          Why people trust these calculators
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex gap-4 rounded-xl border border-surface-line bg-white p-5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <TablerIcon name={step.icon} size={20} aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-[14px] font-bold text-ink">{step.title}</h3>
              </div>
              <p className="text-[12.5px] leading-relaxed text-ink-soft">{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
