import { TablerIcon } from "@/components/TablerIcon";

const STEPS = [
  { icon: "ti-world", title: "Choose your country", sub: "Select where you work" },
  { icon: "ti-calculator", title: "Open a calculator", sub: "Pick the one that matches your situation" },
  { icon: "ti-file-check", title: "Get your estimate", sub: "Instant results based on employment law" },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="mt-10 rounded-2xl border border-surface-line bg-surface-muted px-5 py-6 sm:px-8">
      <h2 id="how-heading" className="text-center text-sm font-semibold text-ink">
        How it works
      </h2>
      <ol className="mt-5 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
              <TablerIcon name={step.icon} size={20} aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white">
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-ink">{step.title}</p>
              </div>
              <p className="mt-0.5 text-xs text-ink-faint">{step.sub}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
