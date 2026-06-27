import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, CATEGORY_META, type ToolCategory } from "@/data/tools";
import { SITE, jsonLd } from "@/lib/seo";
import { TablerIcon } from "@/components/TablerIcon";

const url = `${SITE.url}/uk`;

export const metadata: Metadata = {
  title: "UK Employment Pay Calculators — Statutory Rates 2026/27",
  description:
    "Free UK employment calculators covering redundancy pay, maternity pay, notice periods, sick pay and more. All built on the current 2026/27 statutory rates from GOV.UK.",
  alternates: { canonical: url },
  openGraph: {
    title: "UK Employment Pay Calculators — Statutory Rates 2026/27",
    description:
      "Law-backed calculators for UK workers: redundancy pay, notice periods, overtime, parental leave and more. Free, instant, no signup.",
    url,
  },
};

const UK_TOOLS = TOOLS.filter((t) => t.region.includes("UK"));
const CATEGORY_ORDER: ToolCategory[] = ["leaving-job", "pay-tax", "parental-leave", "benefits"];

export default function UKPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UK Employment Pay Calculators",
    url,
    numberOfItems: UK_TOOLS.length,
    itemListElement: UK_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE.url}/${t.slug}`,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UK Employment Pay Calculators",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />

      <div className="mx-auto max-w-content px-5 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>🇬🇧 UK</span>
        </nav>

        {/* Hero */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            United Kingdom · 2026/27 Statutory Rates
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            UK Employment Pay Calculators
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            All figures are based on the current statutory rates set under UK law — the
            Employment Rights Act 1996, the National Minimum Wage Act 1998, and HMRC&apos;s
            2026/27 thresholds. Rates are verified each April when the new tax year begins.
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">Key 2026/27 rates:</strong> Statutory Redundancy Pay cap £751/week ·
            SMP/SPP/SAP/ShPP £194.32/week · SSP £118.75/week · National Living Wage £12.21/hour ·
            Lower Earnings Limit £125/week
          </div>
        </div>

        {/* Tool sections by category */}
        <div className="flex flex-col gap-10">
          {CATEGORY_ORDER.map((cat) => {
            const tools = UK_TOOLS.filter((t) => t.category === cat);
            if (tools.length === 0) return null;
            return (
              <section key={cat} aria-labelledby={`uk-cat-${cat}`}>
                <div className="mb-4 flex items-baseline gap-2">
                  <h2 id={`uk-cat-${cat}`} className="text-sm font-semibold text-ink">
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

        {/* Context block */}
        <section className="prose-tool mt-12 max-w-2xl border-t border-surface-line pt-8 text-sm leading-relaxed text-ink-soft">
          <h2>UK employment law — what governs these calculations</h2>
          <p>
            UK employment rights are primarily set by the <strong>Employment Rights Act 1996</strong>,
            supplemented by the National Minimum Wage Act 1998, the Working Time Regulations 1998,
            and the Equality Act 2010. Statutory pay rates — including redundancy pay, sick pay, and
            parental leave payments — are set by the government each April and apply from the start
            of the new tax year (6 April).
          </p>
          <p>
            The <strong>ACAS Code of Practice</strong> provides guidance on how employers should
            handle redundancy, disciplinary, and grievance procedures. Where an employer follows the
            ACAS Code, employment tribunals may adjust any compensation award by up to 25% upward
            or downward.
          </p>
          <h2>Statutory vs contractual entitlements</h2>
          <p>
            The figures produced by these calculators represent the <em>statutory minimum</em> — what
            UK law requires as a floor. Many employers offer enhanced redundancy pay, enhanced
            maternity pay, or longer notice periods through the employment contract or company
            policy. Your contract terms always prevail if they are more generous than the statutory
            minimum; they cannot be less.
          </p>
          <p>
            If you are unsure whether your employer is meeting its legal obligations, ACAS provides
            free, impartial advice at{" "}
            <a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
              acas.org.uk
            </a>
            , and GOV.UK publishes the underlying statutory rates at{" "}
            <a href="https://www.gov.uk/employment-rights-and-pay" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
              gov.uk/employment-rights-and-pay
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
