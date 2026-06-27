import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, CATEGORY_META, type ToolCategory } from "@/data/tools";
import { SITE } from "@/lib/seo";
import { TablerIcon } from "@/components/TablerIcon";

const url = `${SITE.url}/au`;

export const metadata: Metadata = {
  title: "Australia Employment Pay Calculators — Fair Work Act 2026",
  description:
    "Free Australian employment calculators for overtime pay, salary conversion and more. Built on the Fair Work Act 2009 and National Employment Standards.",
  alternates: { canonical: url },
  openGraph: {
    title: "Australia Employment Pay Calculators — Fair Work Act 2026",
    description:
      "Law-backed calculators for Australian workers. Built on the Fair Work Act 2009 and National Employment Standards (NES).",
    url,
  },
};

const AU_TOOLS = TOOLS.filter((t) => t.region.includes("AU"));
const CATEGORY_ORDER: ToolCategory[] = ["leaving-job", "pay-tax", "parental-leave", "benefits"];

export default function AUPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Australia Employment Pay Calculators",
    url,
    numberOfItems: AU_TOOLS.length,
    itemListElement: AU_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE.url}/${t.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>🇦🇺 Australia</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Australia · Fair Work Act 2009 · NES
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Australia Employment Pay Calculators
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Australian employment law is primarily set by the <strong>Fair Work Act 2009</strong>,
            with the National Employment Standards (NES) providing 11 minimum entitlements
            for all national system employees. Modern awards and enterprise agreements can provide
            additional entitlements on top of the NES floor.
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">Key 2025–26 figures:</strong> National Minimum Wage
            $24.10/hr · Overtime: 1.5× for first 3 hrs, 2× thereafter (modern award dependent) ·
            Superannuation guarantee 11.5% · Annual leave: 4 weeks (NES minimum)
          </div>

          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
            <strong>Coming soon:</strong> Dedicated Australian calculators for Fair Work redundancy
            pay, annual leave payout, and take-home pay are in development. Currently the
            overtime and salary calculators below cover Australian rates.
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {CATEGORY_ORDER.map((cat) => {
            const tools = AU_TOOLS.filter((t) => t.category === cat);
            if (tools.length === 0) return null;
            return (
              <section key={cat} aria-labelledby={`au-cat-${cat}`}>
                <div className="mb-4 flex items-baseline gap-2">
                  <h2 id={`au-cat-${cat}`} className="text-sm font-semibold text-ink">
                    {CATEGORY_META[cat].label}
                  </h2>
                  <span className="text-xs text-ink-faint">{CATEGORY_META[cat].description}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      className={`flex items-center gap-4 rounded-lg border px-4 py-4 transition-colors ${
                        tool.hero
                          ? "border-brand-100 bg-brand-50 hover:bg-brand-100/40"
                          : "border-surface-line bg-white hover:bg-surface-muted"
                      }`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                        tool.hero ? "bg-white text-brand-600" : "bg-surface-muted text-ink-soft"
                      }`}>
                        <TablerIcon name={tool.icon} size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">{tool.name}</span>
                        <span className="block truncate text-xs text-ink-soft">{tool.description}</span>
                      </span>
                      <TablerIcon name="ti-arrow-right" className="shrink-0 text-ink-faint" size={16} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="prose-tool mt-12 max-w-2xl border-t border-surface-line pt-8 text-sm leading-relaxed text-ink-soft">
          <h2>The National Employment Standards</h2>
          <p>
            The NES sets 11 minimum entitlements that apply to all employees covered by the
            national workplace relations system: maximum weekly hours (38 + reasonable additional),
            flexible working arrangements, parental leave (up to 12 months unpaid), annual leave
            (4 weeks paid), personal/carer&apos;s leave (10 days paid), community service leave,
            long service leave, public holidays, notice of termination and redundancy pay, and the
            Fair Work Information Statement.
          </p>
          <p>
            Modern awards set industry and occupation-specific minimum pay rates and conditions
            on top of the NES. The{" "}
            <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
              Fair Work Commission
            </a>{" "}
            publishes all current award rates and the Pay and Conditions Tool (PACT) for checking
            your minimum entitlements.
          </p>
        </section>
      </div>
    </>
  );
}
