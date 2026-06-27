import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, CATEGORY_META, type ToolCategory } from "@/data/tools";
import { US_STATES } from "@/data/usStates";
import { SITE, jsonLd } from "@/lib/seo";
import { TablerIcon } from "@/components/TablerIcon";

const url = `${SITE.url}/us`;

export const metadata: Metadata = {
  title: "US Employment Pay Calculators — Federal & State Rules 2026",
  description:
    "Free US employment calculators: PTO payout by state, final paycheck deadlines, unemployment benefit, overtime pay and more. Federal and state law built in.",
  alternates: {
    canonical: url,
    languages: {
      "en-US": url,
      "en-GB": `${SITE.url}/uk`,
      "en-CA": `${SITE.url}/ca`,
      "en-AU": `${SITE.url}/au`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "US Employment Pay Calculators — Federal & State Rules 2026",
    description:
      "Law-backed calculators for US workers: PTO payout, final paycheck deadlines, unemployment benefit, overtime and take-home pay. All 50 states covered.",
    url,
  },
};

const US_TOOLS = TOOLS.filter((t) => t.region.includes("US"));
const CATEGORY_ORDER: ToolCategory[] = ["leaving-job", "pay-tax", "parental-leave", "benefits"];

export default function USPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "US Employment Pay Calculators",
    url,
    numberOfItems: US_TOOLS.length,
    itemListElement: US_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE.url}/${t.slug}`,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "US Employment Pay Calculators",
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
          <span>🇺🇸 US</span>
        </nav>

        {/* Hero */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            United States · Federal &amp; State Law 2026
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            US Employment Pay Calculators
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            US employment law operates at two levels: federal rules set a floor, and individual
            states can — and often do — provide stronger protections. These calculators apply the
            correct federal or state rule depending on the calculation, covering all 50 states
            where state law varies (PTO payout, final paycheck deadlines, unemployment benefit).
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">Key 2026 figures:</strong> Federal minimum wage $7.25/hr ·
            FLSA overtime at 1.5× after 40 hours/week · Federal bonus withholding 22% supplemental
            rate · FICA: 6.2% Social Security + 1.45% Medicare · Self-employment tax 15.3%
          </div>
        </div>

        {/* Tool sections */}
        <div className="flex flex-col gap-10">
          {CATEGORY_ORDER.map((cat) => {
            const tools = US_TOOLS.filter((t) => t.category === cat);
            if (tools.length === 0) return null;
            return (
              <section key={cat} aria-labelledby={`us-cat-${cat}`}>
                <div className="mb-4 flex items-baseline gap-2">
                  <h2 id={`us-cat-${cat}`} className="text-sm font-semibold text-ink">
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

        {/* Browse by state */}
        <section aria-labelledby="us-states-heading" className="mt-12 border-t border-surface-line pt-8">
          <div className="mb-4 flex items-baseline gap-2">
            <h2 id="us-states-heading" className="text-sm font-semibold text-ink">
              Browse by state
            </h2>
            <span className="text-xs text-ink-faint">
              PTO payout law, final paycheck deadlines &amp; minimum wage — all 50 states + DC
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
            {US_STATES.map((s) => {
              const ruleColor =
                s.pto.rule === "required"
                  ? "text-emerald-700"
                  : s.pto.rule === "conditional"
                  ? "text-amber-700"
                  : "text-ink-faint";
              return (
                <Link
                  key={s.slug}
                  href={`/us/states/${s.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-surface-line bg-white px-3 py-2.5 text-xs transition-colors hover:bg-surface-muted"
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    s.pto.rule === "required" ? "bg-emerald-500" :
                    s.pto.rule === "conditional" ? "bg-amber-400" : "bg-ink-faint/40"
                  }`} aria-hidden="true" />
                  <span className="font-medium text-ink">{s.name}</span>
                  <span className={`ml-auto shrink-0 ${ruleColor}`}>{s.code}</span>
                </Link>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Required by law
            </span>
            <span className="mx-3 inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              Depends on employer policy
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-faint/40" />
              No requirement
            </span>
          </p>
        </section>

        {/* Context block */}
        <section className="prose-tool mt-12 max-w-2xl border-t border-surface-line pt-8 text-sm leading-relaxed text-ink-soft">
          <h2>How US employment law works</h2>
          <p>
            At the federal level, the <strong>Fair Labor Standards Act (FLSA)</strong> sets the
            federal minimum wage, overtime rules (time-and-a-half after 40 hours/week for covered
            non-exempt employees), and recordkeeping requirements. The{" "}
            <a href="https://www.dol.gov/agencies/whd" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
              Department of Labor Wage and Hour Division
            </a>{" "}
            enforces these rules and publishes guidance on all federal wage standards.
          </p>
          <p>
            There is <strong>no federal law requiring PTO payout</strong> when you leave a job —
            this is entirely determined by state law and employer policy. States like California,
            Colorado, and Illinois treat accrued vacation as earned wages that cannot be forfeited.
            Others leave it entirely to employer discretion. The{" "}
            <Link href="/pto-payout-calculator" className="text-brand-600 underline-offset-2 hover:underline">
              PTO payout calculator
            </Link>{" "}
            applies the correct rule for each state automatically.
          </p>
          <h2>Final paycheck timing</h2>
          <p>
            Every state has its own deadline for paying a departing employee their final wages,
            and most distinguish between voluntary resignation and termination. California, for
            example, requires immediate final pay on the day of termination. Texas requires it
            within 6 days for terminated employees. Use the{" "}
            <Link href="/final-paycheck-deadline-calculator" className="text-brand-600 underline-offset-2 hover:underline">
              final paycheck deadline calculator
            </Link>{" "}
            to find the exact rule for your state.
          </p>
        </section>
      </div>
    </>
  );
}
