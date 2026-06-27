import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";

const SITUATIONS = [
  {
    title: "Leaving My Job",
    sub: "Redundancy, notice period, settlement and more",
    icon: "ti-briefcase",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    titleColor: "text-blue-600",
    href: "#cat-leaving-job",
    cta: "View calculators",
  },
  {
    title: "Getting Paid",
    sub: "Pay, overtime, bonuses, tax and deductions",
    icon: "ti-cash",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    titleColor: "text-emerald-600",
    href: "#cat-pay-tax",
    cta: "View calculators",
  },
  {
    title: "Starting a Family",
    sub: "Maternity, paternity, shared parental leave",
    icon: "ti-users",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    titleColor: "text-violet-600",
    href: "#cat-parental-leave",
    cta: "View calculators",
  },
  {
    title: "Workplace Issues",
    sub: "Unfair dismissal, tribunal, discipline and more",
    icon: "ti-shield-check",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    titleColor: "text-orange-500",
    href: "/tribunal-compensation-calculator",
    cta: "View calculators",
  },
  {
    title: "Benefits & Entitlements",
    sub: "Sick pay, holiday pay, leave and other benefits",
    icon: "ti-gift",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    titleColor: "text-red-500",
    href: "#cat-benefits",
    cta: "View calculators",
  },
  {
    title: "All Calculators",
    sub: "View all calculators in one place",
    icon: "ti-dots",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    titleColor: "text-slate-700",
    href: "#all-calculators",
    cta: "View all",
  },
] as const;

export function BrowseBySituation() {
  return (
    <section aria-labelledby="situation-heading" className="mt-6">
      <h2 id="situation-heading" className="mb-6 text-2xl font-bold text-ink">
        Browse by situation
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {SITUATIONS.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${s.iconBg}`}>
              <TablerIcon name={s.icon} size={22} aria-hidden="true" className={s.iconColor} />
            </span>
            <h3 className={`mb-1.5 text-[14px] font-bold leading-snug ${s.titleColor}`}>{s.title}</h3>
            <p className="mb-4 flex-grow text-[11px] leading-relaxed text-ink-soft">{s.sub}</p>
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600">
              {s.cta}
              <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
