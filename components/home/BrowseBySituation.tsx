import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";

const SITUATIONS = [
  {
    title: "I've been made redundant",
    sub: "Calculate statutory redundancy pay, notice, and final wages",
    icon: "ti-briefcase",
    href: "#cat-leaving-job",
  },
  {
    title: "My employer isn't paying me",
    sub: "Unpaid wages, withheld pay, unlawful deductions",
    icon: "ti-cash",
    href: "#cat-pay-tax",
  },
  {
    title: "I'm going on parental leave",
    sub: "Maternity, paternity, shared parental pay entitlements",
    icon: "ti-users",
    href: "#cat-parental-leave",
  },
  {
    title: "I'm leaving my job",
    sub: "Notice period, garden leave, PILON, final paycheck",
    icon: "ti-door-exit",
    href: "#cat-leaving-job",
  },
  {
    title: "I was unfairly dismissed",
    sub: "Tribunal compensation, wrongful dismissal, settlement",
    icon: "ti-gavel",
    href: "/tribunal-compensation-calculator",
  },
  {
    title: "I need sick or holiday pay",
    sub: "SSP, annual leave entitlement, carry-over rights",
    icon: "ti-gift",
    href: "#cat-benefits",
  },
] as const;

export function BrowseBySituation() {
  return (
    <section aria-labelledby="situation-heading" className="mt-6">
      <div className="mb-5">
        <h2 id="situation-heading" className="text-[1.375rem] font-bold tracking-tight text-ink">
          What&apos;s your situation?
        </h2>
        <p className="mt-1 text-[13px] text-ink-soft">Pick what applies to you — we&apos;ll show the most relevant calculators.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SITUATIONS.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group flex items-start gap-3.5 rounded-xl border border-surface-line bg-white px-4 py-3.5 transition-all hover:border-brand-600 hover:shadow-[0_2px_12px_rgba(23,105,224,0.10)]"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <TablerIcon name={s.icon} size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold text-ink group-hover:text-brand-600">{s.title}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-ink-soft">{s.sub}</span>
            </span>
            <TablerIcon name="ti-arrow-right" size={15} aria-hidden="true" className="mt-1 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
          </Link>
        ))}
      </div>
    </section>
  );
}
