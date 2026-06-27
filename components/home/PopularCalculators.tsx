import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";
import { CARD_THEMES, type CardTheme } from "./cardThemes";

const POPULAR: {
  title: string;
  desc: string;
  icon: string;
  theme: CardTheme;
  href: string;
}[] = [
  { title: "Redundancy Pay Calculator", desc: "Estimate your statutory redundancy pay in minutes.", icon: "ti-briefcase", theme: "blue", href: "/redundancy-pay-calculator" },
  { title: "Notice Period Calculator", desc: "Find out your notice period based on your contract.", icon: "ti-file-text", theme: "green", href: "/notice-period-calculator" },
  { title: "Holiday Pay Calculator", desc: "Calculate holiday pay including overtime.", icon: "ti-calendar-week", theme: "purple", href: "/holiday-entitlement-calculator" },
  { title: "Settlement Agreement Calculator", desc: "Estimate your settlement agreement value.", icon: "ti-scale", theme: "orange", href: "/settlement-agreement-calculator" },
  { title: "Employment Tribunal Calculator", desc: "Estimate compensation for unfair dismissal or breach.", icon: "ti-gavel", theme: "red", href: "/tribunal-compensation-calculator" },
  { title: "PTO Payout Calculator", desc: "Find out what your employer must pay for unused leave.", icon: "ti-cash", theme: "green", href: "/pto-payout-calculator" },
];

export function PopularCalculators() {
  return (
    <section aria-labelledby="popular-heading" className="mt-6">
      <div className="mb-8 flex items-end justify-between">
        <h2 id="popular-heading" className="text-2xl font-bold text-ink">
          Popular calculators
        </h2>
        <Link href="#all-calculators" className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          View all calculators
          <TablerIcon name="ti-arrow-right" size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {POPULAR.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group flex h-full flex-col justify-between rounded-2xl border border-surface-line bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-md"
          >
            <div>
              <span className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full ${CARD_THEMES[tool.theme]}`}>
                <TablerIcon name={tool.icon} size={18} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-[15px] font-bold leading-snug text-ink">{tool.title}</h3>
              <p className="mb-6 text-xs leading-relaxed text-ink-soft">{tool.desc}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
              Calculate now
              <TablerIcon name="ti-arrow-right" size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
