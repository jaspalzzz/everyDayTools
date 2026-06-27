import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { TablerIcon } from "@/components/TablerIcon";
import { CountryFlag } from "@/components/CountryFlag";

const FEATURED_SLUGS = [
  "uk-settlement-agreement",
  "uk-redundancy-pay",
  "uk-notice-period-law",
  "uk-maternity-pay",
] as const;

const THUMB_ACCENTS = [
  "from-brand-100 to-brand-50 text-brand-600",
  "from-red-100 to-red-50 text-red-500",
  "from-emerald-100 to-emerald-50 text-emerald-600",
  "from-purple-100 to-purple-50 text-purple-500",
] as const;

const THUMB_ICONS = ["ti-file-text", "ti-gavel", "ti-cash", "ti-baby-carriage"] as const;

const FEATURED = FEATURED_SLUGS.map((slug) => GUIDES.find((g) => g.slug === slug)).filter(
  (g): g is (typeof GUIDES)[number] => Boolean(g),
);

export function GuidesResources() {
  return (
    <section aria-labelledby="guides-heading" className="mt-14">
      <div className="flex items-baseline justify-between">
        <h2 id="guides-heading" className="text-lg font-semibold text-ink">
          Guides &amp; resources
        </h2>
        <Link href="/guides" className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-800">
          View all guides
          <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED.map((guide, i) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-surface-line bg-white transition-colors hover:border-brand-200"
          >
            <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${THUMB_ACCENTS[i % THUMB_ACCENTS.length]}`}>
              <TablerIcon name={THUMB_ICONS[i % THUMB_ICONS.length] ?? "ti-file-text"} size={32} aria-hidden="true" />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-center gap-1.5">
                <CountryFlag country={guide.country} size={16} />
                <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                  {guide.category}
                </span>
              </div>
              <p className="text-sm font-semibold leading-snug text-ink group-hover:text-brand-700">
                {guide.title}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-brand-600">
                Read guide
                <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
