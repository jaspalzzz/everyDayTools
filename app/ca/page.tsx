import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, CATEGORY_META, type ToolCategory } from "@/data/tools";
import { SITE } from "@/lib/seo";
import { TablerIcon } from "@/components/TablerIcon";

const url = `${SITE.url}/ca`;

export const metadata: Metadata = {
  title: "Canada Employment Pay Calculators — Federal & Provincial Rules 2026",
  description:
    "Free Canadian employment calculators covering notice periods, severance pay, take-home pay and overtime. Federal Canada Labour Code and provincial standards applied.",
  alternates: {
    canonical: url,
    languages: {
      "en-CA": url,
      "en-GB": `${SITE.url}/uk`,
      "en-US": `${SITE.url}/us`,
      "en-AU": `${SITE.url}/au`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "Canada Employment Pay Calculators — Federal & Provincial Rules 2026",
    description:
      "Law-backed calculators for Canadian workers: notice periods, severance, take-home pay and overtime. Federal and provincial law built in.",
    url,
  },
};

const CA_TOOLS = TOOLS.filter((t) => t.region.includes("CA"));
const CATEGORY_ORDER: ToolCategory[] = ["leaving-job", "pay-tax", "parental-leave", "benefits"];

export default function CAPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Canada Employment Pay Calculators",
    url,
    numberOfItems: CA_TOOLS.length,
    itemListElement: CA_TOOLS.map((t, i) => ({
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
          <span>🇨🇦 Canada</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Canada · Federal &amp; Provincial Employment Standards 2026
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Canada Employment Pay Calculators
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Canadian employment law operates at two levels: the federal{" "}
            <strong>Canada Labour Code</strong> covers federally regulated industries (banking,
            telecommunications, interprovincial transport), while each province and territory has
            its own employment standards legislation. These calculators apply the federal statutory
            minimum for notice and severance as the baseline.
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">Federal minimums (Canada Labour Code):</strong> Notice: 2
            weeks after 1 year · Severance: 2 days/year of service (min. 5 days) ·
            Overtime: 1.5× after 8 hrs/day or 40 hrs/week · Federal minimum wage $17.30/hr (2024)
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {CATEGORY_ORDER.map((cat) => {
            const tools = CA_TOOLS.filter((t) => t.category === cat);
            if (tools.length === 0) return null;
            return (
              <section key={cat} aria-labelledby={`ca-cat-${cat}`}>
                <div className="mb-4 flex items-baseline gap-2">
                  <h2 id={`ca-cat-${cat}`} className="text-sm font-semibold text-ink">
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
          <h2>Federal vs provincial — which rules apply to you?</h2>
          <p>
            About 10% of the Canadian workforce is covered by the federal Canada Labour Code —
            those working for banks, airlines, railways, telecommunications companies, and other
            federally regulated employers. Everyone else is covered by the employment standards
            legislation of the province or territory they work in. Ontario, British Columbia, and
            Alberta all have their own minimum notice, termination pay, and severance rules that
            differ from federal minimums.
          </p>
          <p>
            The calculators on this site apply federal statutory minimums. If you work in a
            province where provincial standards are higher (for example, Ontario&apos;s ESA
            provides up to 8 weeks&apos; notice and separate severance pay for employees with 5+
            years of service), check the{" "}
            <a href="https://www.canada.ca/en/employment-social-development/services/labour-standards.html" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
              Employment and Social Development Canada
            </a>{" "}
            website for provincial comparisons.
          </p>
        </section>
      </div>
    </>
  );
}
