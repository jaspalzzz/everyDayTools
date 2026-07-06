import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, FOUNDER_PERSON, clampMetaDescription, jsonLd } from "@/lib/seo";

const SLUG = "uk-holiday-entitlement";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Holiday Entitlement 2026 — 28 Days, Part-Time & Carry-Over Rules",
  description: clampMetaDescription(
    "UK workers are entitled to at least 28 days' paid holiday per year (including 8 bank holidays). How part-time and irregular-hours workers accrue leave, rolled-up holiday pay, and carry-over rules.",
  ),
  alternates: { canonical: url },
  openGraph: {
    title: "UK Holiday Entitlement 2026 — Statutory Leave Guide",
    description: clampMetaDescription("28 days minimum for full-time workers. How accrual, carry-over, and payout work in the UK."),
    url,
  },
};

const faqs = [
  { q: "How much holiday am I entitled to in the UK?", a: "Full-time UK workers are entitled to a minimum of 28 days' paid annual leave per year under the Working Time Regulations 1998 (WTR). This includes 8 public holidays, which your employer may count towards the 28-day entitlement. Your contract may give more — many employers offer 25–30 days plus bank holidays." },
  { q: "How is holiday entitlement calculated for part-time workers?", a: "Part-time workers get the same pro-rata entitlement. The calculation is: (days worked per week ÷ 5) × 28. So a worker on 3 days per week gets 3/5 × 28 = 16.8 days." },
  { q: "Do I accrue holiday while on sick leave or maternity leave?", a: "Yes. Holiday continues to accrue during sick leave, maternity leave, paternity leave, adoption leave, and shared parental leave. You can carry over holiday that you were unable to take due to sick leave for up to 18 months after the end of the leave year in which it accrued. Holiday also accrues during the 90-day carry-over rule following maternity and other family leave." },
  { q: "Can my employer pay me instead of letting me take holiday?", a: "No — you cannot receive pay in lieu of statutory holiday except on termination of employment. Any clause in a contract purporting to pay you extra in place of leave is void under the Working Time Regulations 1998." },
  { q: "What is rolled-up holiday pay?", a: "For irregular-hours and part-year workers (following the Supreme Court's Harpur Trust v Brazel decision and the subsequent WTR amendments in 2024), holiday pay is calculated at 12.07% of pay earned in the relevant pay period. This 'rolled-up' method is now explicitly permitted for eligible workers." },
];

export default function UKHolidayEntitlementGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Holiday Entitlement 2026: Statutory Leave, Pay & Carry-Over Rules",
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
      { "@type": "ListItem", position: 3, name: "UK Holiday Entitlement", item: url },
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
          <span>UK Holiday Entitlement</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CountryFlag country={COUNTRY} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">Benefits & Entitlements</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Holiday Entitlement 2026</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Every UK worker is entitled to a minimum of 28 days&apos; paid annual leave under the Working Time
              Regulations 1998. Here is how entitlement is calculated, how it accrues for part-time and
              irregular-hours workers, and what happens when you leave your job.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Rates verified June 2026 · Source: Working Time Regulations 1998 (SI 1998/1833), as amended
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate your holiday entitlement</p>
            <Link href="/holiday-entitlement-calculator" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors">
              Open holiday entitlement calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2 className="text-base font-semibold text-ink">Statutory minimum: 28 days</h2>
              <p>
                The Working Time Regulations 1998 (implementing the EU Working Time Directive) give all
                workers — not just employees — the right to 5.6 weeks of paid annual leave per year.
                For a standard 5-day week, this equals 28 days. Employers may include bank holidays
                within this minimum, but they are not required to give them as additional days.
              </p>
              <p className="mt-2">
                Employers can and often do offer more than the statutory minimum. The statutory floor
                cannot be contracted out — any clause purporting to give less than 5.6 weeks is void.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Holiday pay calculation</h2>
              <p>
                Holiday pay must reflect your &quot;normal remuneration.&quot; Following a series of Employment
                Appeal Tribunal and Court of Appeal decisions, holiday pay must now include:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">Regular overtime (including voluntary overtime if worked with sufficient regularity)</li>
                <li className="list-disc">Regular commission payments</li>
                <li className="list-disc">Regular shift allowances and supplements</li>
              </ul>
              <p className="mt-3">
                The reference period for calculating holiday pay for workers with variable pay is the
                average of the 52 weeks in which they actually worked and received pay immediately
                before the leave is taken (ignoring weeks with no pay).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Carry-over and payout rules</h2>
              <p>
                Statutory leave must generally be taken in the leave year it accrues and cannot be paid
                out in lieu (except on termination). However, carry-over is permitted where:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">The worker was unable to take leave due to sick leave — carry-over of up to 4 weeks for 18 months</li>
                <li className="list-disc">The employer failed to allow or encourage the worker to take leave — carry-over for up to 2 years</li>
                <li className="list-disc">The worker was on maternity, paternity, adoption or shared parental leave</li>
              </ul>
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
                <li><a href="https://www.legislation.gov.uk/uksi/1998/1833" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">Working Time Regulations 1998</a></li>
                <li><a href="https://www.gov.uk/holiday-entitlement-rights" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">GOV.UK — Holiday entitlement</a></li>
                <li><a href="https://www.acas.org.uk/checking-holiday-entitlement" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">ACAS — Holiday entitlement</a></li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
