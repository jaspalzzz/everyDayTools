import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { TablerIcon } from "@/components/TablerIcon";

const POPULAR_SLUGS = [
  "redundancy-pay-calculator",
  "notice-period-calculator",
  "holiday-entitlement-calculator",
  "settlement-agreement-calculator",
  "tribunal-compensation-calculator",
  "pto-payout-calculator",
] as const;

const POPULAR = POPULAR_SLUGS.map((slug) => TOOLS.find((t) => t.slug === slug)).filter(
  (t): t is (typeof TOOLS)[number] => Boolean(t),
);

export function PopularCalculators() {
  return (
    <section aria-labelledby="popular-heading" className="mt-14">
      <div className="flex items-baseline justify-between">
        <h2 id="popular-heading" className="text-lg font-semibold text-ink">
          Popular calculators
        </h2>
        <Link href="#all-calculators" className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-800">
          View all calculators
          <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group flex flex-col gap-3 rounded-xl border border-surface-line bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <TablerIcon name={tool.icon} size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{tool.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-faint line-clamp-2">{tool.description}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-brand-600">
              Calculate now
              <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
