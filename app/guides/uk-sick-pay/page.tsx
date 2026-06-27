import type { Metadata } from "next";
import Link from "next/link";
import { SITE, FOUNDER_PERSON, jsonLd } from "@/lib/seo";

const SLUG = "uk-sick-pay";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Sick Pay Guide 2026 — SSP from Day 1, Qualifying Conditions & When It Runs Out",
  description:
    "Statutory Sick Pay is £123.25/week from day one of illness in 2026 — the three waiting days were abolished by the Employment Rights Act 2025. How long SSP lasts, what to do when it ends, and enhanced sick pay.",
  alternates: { canonical: url },
  openGraph: { title: "UK Sick Pay 2026 — SSP from Day 1", description: "SSP is £123.25/week with no waiting days from April 2026. Full guide to qualifying, duration, and what happens when SSP ends.", url },
};

const faqs = [
  { q: "How much is Statutory Sick Pay in 2026?", a: "SSP is £123.25 per week for the 2026/27 tax year. It is paid by your employer through the payroll in the same way as normal wages and is subject to income tax and National Insurance if you are above the relevant thresholds." },
  { q: "Are there waiting days before SSP starts?", a: "No — the three waiting days were abolished by the Employment Rights Act 2025. From 6 April 2026, SSP is payable from day one of illness. Previously, the first three days of absence were 'waiting days' with no SSP entitlement." },
  { q: "How long does SSP last?", a: "SSP is payable for up to 28 weeks in any period of incapacity for work (PIW). If you are still unable to work after 28 weeks, your employer will issue an SSP1 form and you may be able to claim Employment and Support Allowance (ESA) or Universal Credit." },
  { q: "Do I qualify for SSP?", a: "You qualify if you earn at least £125/week (the Lower Earnings Limit for 2026/27), have been sick for at least one day, and are an employee. Workers and self-employed people do not qualify for SSP." },
  { q: "What is enhanced sick pay?", a: "Enhanced sick pay is contractual sick pay offered by your employer above the SSP minimum. Many employers pay full salary for 3–6 months, then half salary for a further period. Check your employment contract or staff handbook for your specific entitlement." },
];

export default function UKSickPayGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Sick Pay 2026: SSP Rules, Qualifying Days & What Happens When It Runs Out",
    description: metadata.description,
    url,
    datePublished: DATE,
    dateModified: DATE,
    author: FOUNDER_PERSON,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
      { "@type": "ListItem", position: 3, name: "UK Sick Pay", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/guides" className="hover:text-ink-soft">Guides</Link>
          <span className="mx-1.5">/</span>
          <span>UK Sick Pay</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">🇬🇧</span>
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">Benefits & Entitlements</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Sick Pay 2026</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              From 6 April 2026, Statutory Sick Pay (SSP) is payable from day one of illness at £123.25 per week.
              The three-day waiting period was abolished by the Employment Rights Act 2025, giving immediate
              protection to workers who fall ill.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Rates verified June 2026 · Source: Social Security Contributions and Benefits Act 1992, as amended by the Employment Rights Act 2025
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate your sick pay</p>
            <Link href="/statutory-sick-pay-calculator" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors">
              Open SSP calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2 className="text-base font-semibold text-ink">What changed in April 2026</h2>
              <div className="mt-3 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Rule</th>
                      <th className="px-3 py-2.5 text-center font-semibold text-ink">Before April 2026</th>
                      <th className="px-3 py-2.5 text-center font-semibold text-ink">From April 2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rule: "Waiting days", before: "3 days (no pay)", after: "None — day 1" },
                      { rule: "Weekly rate", before: "£116.75", after: "£123.25" },
                      { rule: "Qualifying earnings", before: "£123/week LEL", after: "£125/week LEL" },
                      { rule: "Duration", before: "Up to 28 weeks", after: "Up to 28 weeks" },
                    ].map(({ rule, before, after }) => (
                      <tr key={rule} className="border-t border-surface-line">
                        <td className="px-3 py-2.5 text-ink-soft">{rule}</td>
                        <td className="px-3 py-2.5 text-center text-ink-faint">{before}</td>
                        <td className="px-3 py-2.5 text-center font-medium text-emerald-700">{after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Qualifying conditions</h2>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">You must be an employee (not a worker or self-employed)</li>
                <li className="list-disc">You must be off work sick for at least one day</li>
                <li className="list-disc">You must have average weekly earnings of at least £125 (the Lower Earnings Limit 2026/27)</li>
                <li className="list-disc">You must follow your employer&apos;s absence notification procedures (typically notifying by day 1 or day 7)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">After 28 weeks: what happens next</h2>
              <p>
                If you are still unable to work after 28 weeks of SSP, your employer must give you
                an SSP1 form. You may be able to claim:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc"><strong className="text-ink">Employment and Support Allowance (ESA)</strong> — if you do not get Universal Credit</li>
                <li className="list-disc"><strong className="text-ink">Universal Credit (UC)</strong> — the health element of UC can top up income during long-term illness</li>
                <li className="list-disc"><strong className="text-ink">Income Protection insurance</strong> — if your employer offers this as a benefit or you hold a personal policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Fit notes and evidence of sickness</h2>
              <p>
                For the first 7 calendar days of absence, you can self-certify using a form your
                employer provides. From day 8, you typically need a Statement of Fitness for Work
                (fit note) from a GP, nurse, physiotherapist, occupational therapist, or pharmacist.
                Since July 2022, fit notes can be issued by a broader range of healthcare
                professionals, not just GPs.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Frequently asked questions</h2>
              <div className="mt-4 flex flex-col gap-4">
                {faqs.map(({ q, a }) => (
                  <div key={q} className="rounded-lg border border-surface-line bg-surface-muted px-4 py-3">
                    <p className="text-xs font-semibold text-ink">{q}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-surface-line pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Sources</h2>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-ink-faint">
                <li><a href="https://www.gov.uk/statutory-sick-pay" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">GOV.UK — Statutory Sick Pay</a></li>
                <li><a href="https://www.legislation.gov.uk/ukpga/1992/4" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">Social Security Contributions and Benefits Act 1992</a></li>
                <li><a href="https://www.legislation.gov.uk/ukpga/2025/15" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">Employment Rights Act 2025</a></li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
