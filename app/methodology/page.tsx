import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/methodology`;

export const metadata: Metadata = {
  title: "Data Methodology — How We Source & Verify Employment Law Rates",
  description:
    "How MyPayRights sources statutory rates, who reviews them, when they are updated, and how to report an error. Every figure on the site traces to an official government source.",
  alternates: { canonical: url },
  openGraph: {
    title: "Data Methodology — How We Source & Verify Employment Law Rates",
    description:
      "Primary sources, update cycle, verification process, and correction policy for every employment law figure on MyPayRights.",
    url,
  },
};

export default function MethodologyPage() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Data Methodology — MyPayRights",
    url,
    description: metadata.description as string,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: { "@type": "Thing", name: "Employment law statutory rate verification methodology" },
    author: {
      "@type": "Person",
      name: "Jaspal Singh",
      jobTitle: "Founder, MyPayRights",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Methodology</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <h1 className="text-3xl font-medium tracking-tight text-ink">
              Data methodology
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Every calculation on MyPayRights is built on statutory figures sourced directly from
              official government publications. This page documents exactly where each figure comes
              from, who checks it, and how quickly errors are corrected.
            </p>
          </header>

          <div className="prose-tool space-y-8 text-sm leading-relaxed text-ink-soft">

            {/* Primary sources */}
            <section>
              <h2>Primary sources by jurisdiction</h2>
              <p>
                Every statutory rate on this site traces directly to official government legislation
                or regulatory guidance — never a secondary aggregator, payroll vendor, or news
                article. Each calculator page displays its legal basis with direct links to the
                source legislation and official guidance.
              </p>

              <div className="mt-4 space-y-4">
                {([
                  {
                    j: "United Kingdom",
                    sources: [
                      { label: "legislation.gov.uk — Employment Rights Act 1996", url: "https://www.legislation.gov.uk/ukpga/1996/18/contents" },
                      { label: "legislation.gov.uk — Employment Rights Act 2025", url: "https://www.legislation.gov.uk/ukpga/2025/15" },
                      { label: "legislation.gov.uk — Working Time Regulations 1998", url: "https://www.legislation.gov.uk/uksi/1998/1833/contents" },
                      { label: "legislation.gov.uk — Equality Act 2010", url: "https://www.legislation.gov.uk/ukpga/2010/15/contents" },
                      { label: "GOV.UK — Statutory rates & thresholds", url: "https://www.gov.uk/government/collections/tax-and-tax-credit-rates-and-thresholds" },
                      { label: "HMRC — Rates and allowances", url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax" },
                      { label: "ACAS — Employment relations guidance", url: "https://www.acas.org.uk/advice" },
                    ],
                  },
                  {
                    j: "United States",
                    sources: [
                      { label: "DOL — Wage and Hour Division (FLSA)", url: "https://www.dol.gov/agencies/whd/flsa" },
                      { label: "DOL — State payday laws", url: "https://www.dol.gov/agencies/whd/state/payday" },
                      { label: "SSA — Contribution and benefit base (wage base)", url: "https://www.ssa.gov/oact/cola/cbb.html" },
                      { label: "IRS — FICA and withholding tables", url: "https://www.irs.gov/publications/p15" },
                      { label: "EEOC — Federal employment discrimination law", url: "https://www.eeoc.gov/statutes" },
                    ],
                  },
                  {
                    j: "Australia",
                    sources: [
                      { label: "legislation.gov.au — Fair Work Act 2009", url: "https://www.legislation.gov.au/Details/C2009A00028" },
                      { label: "Fair Work Commission — Pay and conditions", url: "https://www.fairwork.gov.au/pay-and-wages" },
                      { label: "Fair Work Commission — Ending employment", url: "https://www.fairwork.gov.au/ending-employment" },
                    ],
                  },
                  {
                    j: "Canada",
                    sources: [
                      { label: "laws-lois.justice.gc.ca — Canada Labour Code", url: "https://laws-lois.justice.gc.ca/eng/acts/L-2/" },
                      { label: "Canada.ca — Employment standards", url: "https://www.canada.ca/en/employment-social-development/services/labour-standards.html" },
                      { label: "Service Canada — Employment Insurance rates", url: "https://www.canada.ca/en/employment-social-development/programs/ei.html" },
                    ],
                  },
                ] as { j: string; sources: { label: string; url: string }[] }[]).map(({ j, sources }, i) => (
                  <div key={j} className={`rounded-xl border border-surface-line p-4 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"}`}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">{j}</p>
                    <ul className="space-y-1">
                      {sources.map((s) => (
                        <li key={s.url}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-brand-600 hover:underline"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Update cycle */}
            <section>
              <h2>Update cycle</h2>
              <p>
                Statutory rates change on predictable schedules. We maintain a rolling review
                calendar aligned to each jurisdiction&apos;s legislative cycle:
              </p>
              <ul>
                {[
                  { when: "6 April each year", what: "UK: new tax year rates — income tax bands, NI thresholds, statutory redundancy pay cap (£751 for 2026/27), SMP/SPP/SAP rates, SSP rate, National Living Wage / NMW" },
                  { when: "1 January each year", what: "US: state minimum wage changes, IRS withholding tables, Social Security wage base, federal poverty level (affects benefit calculations)" },
                  { when: "1 April each year", what: "Canada: CPP contribution limits, EI premium rates, provincial minimum wage changes" },
                  { when: "1 July each year", what: "Australia: National Minimum Wage order, Fair Work Act penalty rates, superannuation guarantee rate" },
                  { when: "Within 5 working days", what: "Any emergency legislative change or government announcement that affects a live calculator (e.g. Budget announcements, emergency statutory instruments)" },
                ].map(({ when, what }) => (
                  <li key={when}>
                    <strong>{when}:</strong> {what}
                  </li>
                ))}
              </ul>
              <p>
                Each calculator page displays a <em>Rates verified</em> badge with the date the
                figures were last confirmed against source. Pages without a badge are under review
                and will be updated before the next rate-change window.
              </p>
            </section>

            {/* Calculation logic */}
            <section>
              <h2>Calculation logic and precision</h2>
              <p>
                All calculation engines are written in TypeScript and open to inspection. The logic
                follows the exact statutory formula from the relevant legislation — we do not
                simplify, round prematurely, or approximate where the law specifies a precise method.
              </p>
              <ul>
                {[
                  "UK redundancy pay: age-banded multiplier applied to completed full years (not months or days), weekly pay capped at the current weekly pay cap, service capped at 20 years — per ERA 1996 s.162",
                  "UK SMP/SMP: weekly pay reference period is the 8 weeks ending with the 15th week before the expected week of childbirth (EWC) — per SMP Regulations 1986 Reg 21",
                  "US overtime: FLSA regular rate computed on actual workweek earnings before applying the 1.5× multiplier — not annualised rate ÷ 52",
                  "Australian NES redundancy: floor brackets from Fair Work Act 2009 s.119 applied to completed full years; long service leave reduction applied at 10+ years",
                  "Currency formatting: UK figures use £ with comma thousands separator; US figures use $ with comma thousands; AU figures use A$ prefix; CA figures use CA$ prefix",
                  "Rounding: monetary results rounded to 2 decimal places at final output only; intermediate calculations use full float precision",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* What we do not cover */}
            <section>
              <h2>Scope limitations</h2>
              <p>
                Calculators provide estimates for the <em>statutory minimum</em> (or standard rate)
                in each jurisdiction. They do not account for:
              </p>
              <ul>
                {[
                  "Enhanced contractual terms (e.g. contractual redundancy pay above the statutory minimum)",
                  "Industry-specific collective agreements or union agreements",
                  "Individual employment contracts with bespoke terms",
                  "Zero-hours or variable-hours contracts where pay is genuinely irregular",
                  "Tribunal or court awards, which are fact-specific",
                  "Tax treatment of individual circumstances (student loan plans, Scottish income tax divergence from rest of UK, US state income tax)",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Where a calculation is affected by a notable scope limitation, we display a note
                alongside the result. Tools are labelled as estimates, not legal determinations.
              </p>
            </section>

            {/* Error correction */}
            <section>
              <h2>Error reporting and correction</h2>
              <p>
                If you believe a figure is wrong or out of date:
              </p>
              <ol>
                {[
                  `Email ${SITE.contactEmail} with: the page URL, the figure you believe is incorrect, and the source you are comparing it against (ideally a link to the official publication).`,
                  "We investigate every report within one working day and compare the reported figure against the primary source.",
                  "If confirmed incorrect: the calculator code is corrected, the verified date is updated, and a correction note is added to the git commit for transparency.",
                  "We aim to publish corrections within two working days of confirmation.",
                ].map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p>
                We take accuracy seriously. Employment pay errors have real financial consequences
                for people — an employee who underestimates their redundancy entitlement may accept
                an underpayment without challenge. We treat every error report as urgent.
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2>Not legal or financial advice</h2>
              <p>
                MyPayRights calculators provide general information and estimates only. They are not
                legal advice, tax advice, or financial advice. Employment situations involve facts
                and circumstances a calculator cannot assess — contract terms, continuous employment
                disputes, TUPE transfers, collective agreements, and more.
              </p>
              <p>
                For any decision with financial or legal consequences, consult a qualified employment
                solicitor (UK), employment attorney (US), employment lawyer (CA/AU), or contact the
                relevant statutory body: ACAS (UK), DOL Wage and Hour Division (US), Employment
                Standards (CA), Fair Work Ombudsman (AU).
              </p>
            </section>

          </div>

          <footer className="mt-10 border-t border-surface-line pt-6 text-xs text-ink-faint">
            <p>
              Questions about our data?{" "}
              <a href={`mailto:${SITE.contactEmail}`} className="text-brand-600 underline-offset-2 hover:underline">
                {SITE.contactEmail}
              </a>
            </p>
            <p className="mt-2 flex gap-4">
              <Link href="/editorial-policy" className="text-brand-600 underline-offset-2 hover:underline">Editorial policy</Link>
              <Link href="/about" className="text-brand-600 underline-offset-2 hover:underline">About us</Link>
              <Link href="/disclaimer" className="text-brand-600 underline-offset-2 hover:underline">Disclaimer</Link>
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
