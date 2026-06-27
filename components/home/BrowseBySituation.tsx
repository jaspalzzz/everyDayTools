import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";
import { CARD_THEMES, type CardTheme } from "./cardThemes";

const SITUATIONS: {
  title: string;
  sub: string;
  icon: string;
  theme: CardTheme;
  href: string;
  cta: string;
}[] = [
  { title: "Leaving My Job", sub: "Redundancy, notice period, settlement and more", icon: "ti-briefcase", theme: "blue", href: "#cat-leaving-job", cta: "View calculators" },
  { title: "Getting Paid", sub: "Pay, overtime, bonuses, tax and deductions", icon: "ti-cash", theme: "green", href: "#cat-pay-tax", cta: "View calculators" },
  { title: "Starting a Family", sub: "Maternity, paternity, shared parental leave", icon: "ti-users", theme: "purple", href: "#cat-parental-leave", cta: "View calculators" },
  { title: "Workplace Issues", sub: "Unfair dismissal, tribunal, discipline and more", icon: "ti-gavel", theme: "orange", href: "/tribunal-compensation-calculator", cta: "View calculators" },
  { title: "Benefits & Entitlements", sub: "Sick pay, holiday pay, leave and other benefits", icon: "ti-gift", theme: "red", href: "#cat-benefits", cta: "View calculators" },
  { title: "All Calculators", sub: "View all calculators in one place", icon: "ti-dots", theme: "gray", href: "#all-calculators", cta: "View all" },
];

export function BrowseBySituation() {
  return (
    <section aria-labelledby="situation-heading" className="mt-6">
      <h2 id="situation-heading" className="mb-8 text-2xl font-bold text-ink">
        Browse by situation
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {SITUATIONS.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group flex h-full flex-col rounded-2xl border border-surface-line bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-md"
          >
            <span className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg ${CARD_THEMES[s.theme]}`}>
              <TablerIcon name={s.icon} size={20} aria-hidden="true" />
            </span>
            <h3 className="mb-2 text-[15px] font-bold text-ink">{s.title}</h3>
            <p className="mb-6 flex-grow text-xs leading-relaxed text-ink-soft">{s.sub}</p>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
              {s.cta}
              <TablerIcon name="ti-arrow-right" size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
