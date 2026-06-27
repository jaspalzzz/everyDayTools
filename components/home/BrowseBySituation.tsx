import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";

const SITUATIONS = [
  {
    title: "Leaving my job",
    sub: "Redundancy, notice period, settlement and more",
    icon: "ti-briefcase-off",
    accent: "bg-red-50 text-red-500",
    href: "#cat-leaving-job",
  },
  {
    title: "Getting paid",
    sub: "Pay, overtime, bonuses, tax and deductions",
    icon: "ti-cash",
    accent: "bg-blue-50 text-blue-500",
    href: "#cat-pay-tax",
  },
  {
    title: "Starting a family",
    sub: "Maternity, paternity, shared parental leave",
    icon: "ti-baby-carriage",
    accent: "bg-emerald-50 text-emerald-600",
    href: "#cat-parental-leave",
  },
  {
    title: "Workplace issues",
    sub: "Unfair dismissal, tribunal, discipline and more",
    icon: "ti-gavel",
    accent: "bg-orange-50 text-orange-500",
    href: "/tribunal-compensation-calculator",
  },
  {
    title: "Benefits & entitlements",
    sub: "Sick pay, holiday pay, leave and other benefits",
    icon: "ti-gift",
    accent: "bg-purple-50 text-purple-500",
    href: "#cat-benefits",
  },
  {
    title: "All calculators",
    sub: "View every calculator in one place",
    icon: "ti-dots",
    accent: "bg-surface-muted text-ink-soft",
    href: "#all-calculators",
  },
] as const;

export function BrowseBySituation() {
  return (
    <section aria-labelledby="situation-heading" className="mt-14">
      <h2 id="situation-heading" className="text-lg font-semibold text-ink">
        Browse by situation
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SITUATIONS.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group flex flex-col gap-3 rounded-xl border border-surface-line bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.accent}`}>
              <TablerIcon name={s.icon} size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{s.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-faint">{s.sub}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-brand-600">
              View calculators
              <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
