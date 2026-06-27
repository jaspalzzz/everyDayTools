import { TablerIcon } from "@/components/TablerIcon";

const STEPS = [
  { icon: "ti-world", title: "Choose your country", sub: "Select where you work" },
  { icon: "ti-calculator", title: "Open a calculator", sub: "Pick the one that matches your situation" },
  { icon: "ti-file-check", title: "Get your estimate", sub: "Instant results based on employment law" },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="mt-6">
      <h2 id="how-heading" className="mb-8 text-center text-2xl font-bold text-ink">
        How it works
      </h2>
      <div className="flex flex-col items-stretch justify-between gap-6 rounded-2xl border border-brand-100 bg-brand-50 p-8 lg:flex-row lg:items-center">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex flex-1 items-center gap-4">
            <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-surface-line bg-white text-brand-600 shadow-sm" style={{ height: "3.25rem", width: "3.25rem" }}>
              <TablerIcon name={step.icon} size={24} aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-[1.15rem] w-[1.15rem] items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-[15px] font-bold text-ink">{step.title}</h3>
              </div>
              <p className="mt-0.5 text-xs text-ink-soft">{step.sub}</p>
            </div>
            {i < STEPS.length - 1 && (
              <span className="ml-auto hidden shrink-0 text-ink-faint lg:block">
                <TablerIcon name="ti-arrow-right" size={20} aria-hidden="true" />
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
