import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";

const POPULAR = [
  {
    title: "Redundancy Pay Calculator",
    desc: "Estimate your statutory redundancy pay in minutes.",
    icon: "ti-briefcase",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    href: "/redundancy-pay-calculator",
  },
  {
    title: "Notice Period Calculator",
    desc: "Find out your notice period based on your contract.",
    icon: "ti-file-text",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    href: "/notice-period-calculator",
  },
  {
    title: "Holiday Pay Calculator",
    desc: "Calculate holiday pay including overtime.",
    icon: "ti-calendar-week",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    href: "/holiday-entitlement-calculator",
  },
  {
    title: "Settlement Agreement Calculator",
    desc: "Estimate your settlement agreement value.",
    icon: "ti-file-certificate",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    href: "/settlement-agreement-calculator",
  },
  {
    title: "Employment Tribunal Calculator",
    desc: "Estimate compensation for unfair dismissal or breach.",
    icon: "ti-gavel",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    href: "/tribunal-compensation-calculator",
  },
  {
    title: "PTO Payout Calculator",
    desc: "Find out what your employer must pay for unused leave.",
    icon: "ti-cash",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    href: "/pto-payout-calculator",
  },
] as const;

export function PopularCalculators() {
  return (
    <section aria-labelledby="popular-heading" className="mt-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 id="popular-heading" className="text-2xl font-bold text-ink">
          Popular calculators
        </h2>
        <Link href="#all-calculators" className="group inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
          View all calculators
          <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {POPULAR.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${tool.iconBg}`}>
              <TablerIcon name={tool.icon} size={24} aria-hidden="true" className={tool.iconColor} />
            </span>
            <h3 className="mb-1.5 text-[14px] font-bold leading-snug text-ink">{tool.title}</h3>
            <p className="mb-4 flex-grow text-[11px] leading-relaxed text-ink-soft">{tool.desc}</p>
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600">
              Calculate now
              <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
