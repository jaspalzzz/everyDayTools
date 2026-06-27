import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";

const POPULAR = [
  {
    title: "Redundancy Pay",
    desc: "Statutory redundancy pay based on age, pay, and service length.",
    cta: "Estimate redundancy pay",
    icon: "ti-briefcase",
    href: "/redundancy-pay-calculator",
    countries: "UK · AU",
  },
  {
    title: "Notice Period",
    desc: "Find your minimum notice period and what you're owed if cut short.",
    cta: "Check notice pay",
    icon: "ti-file-text",
    href: "/notice-period-calculator",
    countries: "UK · US · CA · AU",
  },
  {
    title: "Holiday Pay",
    desc: "Calculate holiday entitlement and unpaid holiday on termination.",
    cta: "Calculate holiday pay",
    icon: "ti-calendar-week",
    href: "/holiday-entitlement-calculator",
    countries: "UK · AU",
  },
  {
    title: "Settlement Agreement",
    desc: "Estimate the value of a settlement offer before you sign.",
    cta: "Value my settlement",
    icon: "ti-file-certificate",
    href: "/settlement-agreement-calculator",
    countries: "UK",
  },
  {
    title: "Employment Tribunal",
    desc: "Estimate compensation for unfair dismissal or wrongful termination.",
    cta: "Estimate tribunal award",
    icon: "ti-gavel",
    href: "/tribunal-compensation-calculator",
    countries: "UK · US",
  },
  {
    title: "PTO Payout",
    desc: "Find out what your employer must pay for unused leave at exit.",
    cta: "Calculate PTO payout",
    icon: "ti-cash",
    href: "/pto-payout-calculator",
    countries: "US · CA · AU",
  },
] as const;

export function PopularCalculators() {
  return (
    <section aria-labelledby="popular-heading" className="mt-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 id="popular-heading" className="text-[1.375rem] font-bold tracking-tight text-ink">
            Most used calculators
          </h2>
          <p className="mt-1 text-[13px] text-ink-soft">The tools people reach for most when dealing with a pay or employment issue.</p>
        </div>
        <Link href="#all-calculators" className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-600 sm:inline-flex">
          View all
          <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group flex flex-col rounded-xl border border-surface-line bg-white p-4 transition-all hover:border-brand-600 hover:shadow-[0_2px_12px_rgba(23,105,224,0.10)]"
          >
            <div className="mb-3 flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <TablerIcon name={tool.icon} size={20} aria-hidden="true" />
              </span>
              <span className="rounded-full border border-surface-line px-2 py-0.5 text-[10px] font-medium text-ink-faint">
                {tool.countries}
              </span>
            </div>
            <h3 className="mb-1 text-[14px] font-bold text-ink">{tool.title}</h3>
            <p className="mb-3 flex-grow text-[12px] leading-relaxed text-ink-soft">{tool.desc}</p>
            <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 transition-all group-hover:gap-1.5">
              {tool.cta}
              <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
