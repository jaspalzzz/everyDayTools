import type { Metadata } from "next";
import Link from "next/link";
import { SITE, FOUNDER_PERSON, jsonLd } from "@/lib/seo";

const SLUG = "uk-shared-parental-leave";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Shared Parental Leave 2026 — ShPL, ShPP & How to Split Leave",
  description:
    "How Shared Parental Leave (ShPL) and Shared Parental Pay (ShPP) work in the UK — curtailing maternity leave, splitting up to 37 weeks with the other parent, discontinuous leave, and pay at £184.03/week.",
  alternates: { canonical: url },
  openGraph: { title: "UK Shared Parental Leave 2026", description: "ShPL lets parents share up to 37 weeks of leave after the compulsory maternity period. Full guide to how it works.", url },
};

const faqs = [
  { q: "How much Shared Parental Pay (ShPP) is available?", a: "If the mother or primary adopter curtails their SMP/SAP, any remaining statutory pay converts to ShPP, payable at £184.03/week (2026/27) or 90% of AWE if lower. Up to 37 weeks of ShPP can be available to share — but only the weeks that remain in the 39-week SMP/SAP period." },
  { q: "Can both parents take ShPL at the same time?", a: "Yes — unlike maternity and paternity leave, both partners can take ShPL concurrently. This allows both parents to be home simultaneously with a new child. The combined weeks still cannot exceed the maximum available." },
  { q: "What is a discontinuous leave request?", a: "Parents can request ShPL in separate, non-consecutive blocks (e.g. 3 weeks in April, 2 weeks in July). The employer has 14 days to agree, propose alternative dates, or refuse. An employer has the right to refuse discontinuous requests, in which case the employee can withdraw and take a continuous block instead." },
  { q: "Is ShPP enhanced by some employers?", a: "Some employers offer enhanced ShPP at full salary for some or all of the ShPL period — particularly where they also offer enhanced maternity pay. If you receive enhanced maternity pay, check whether your employer's policy extends the same rate to ShPL." },
];

export default function UKSharedParentalLeaveGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Shared Parental Leave 2026: ShPL, ShPP & How to Split Leave",
    description: metadata.description,
    url, datePublished: DATE, dateModified: DATE,
    author: FOUNDER_PERSON,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
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
      { "@type": "ListItem", position: 3, name: "UK Shared Parental Leave", item: url },
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
          <span>UK Shared Parental Leave</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">🇬🇧</span>
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">Parental Leave</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Shared Parental Leave 2026</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Shared Parental Leave (ShPL) allows parents to share up to 50 weeks of leave and 37 weeks of
              Shared Parental Pay after the initial 2-week compulsory maternity leave. Both parents can
              be on leave simultaneously and take leave in multiple, separate blocks.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">Rates verified June 2026 · Source: Shared Parental Leave Regulations 2014 (SI 2014/3050)</p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate ShPP entitlement</p>
            <Link href="/shared-parental-leave-calculator" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors">
              Open shared parental leave calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2 className="text-base font-semibold text-ink">How ShPL works</h2>
              <ol className="mt-2 flex flex-col gap-2 pl-4">
                <li className="list-decimal">The mother/primary adopter takes at least 2 weeks of compulsory leave after the birth/placement.</li>
                <li className="list-decimal">They formally curtail their maternity/adoption leave and pay by giving their employer a written notice.</li>
                <li className="list-decimal">The remaining leave (up to 50 weeks) and pay (up to 37 weeks of ShPP) are &quot;pooled&quot; and can be shared between both parents.</li>
                <li className="list-decimal">Each parent notifies their own employer of the weeks they intend to take, at least 8 weeks in advance of the first block.</li>
              </ol>
              <p className="mt-3">
                Both parents must satisfy a qualifying test: 26 weeks&apos; continuous employment by the end of the 15th
                week before the due date, and earning at least £125/week on average.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">ShPP rate 2026/27</h2>
              <p>
                Shared Parental Pay is paid at £184.03/week (2026/27) or 90% of average weekly earnings
                if lower — the same rate as SMP weeks 7–39. It is taxable and subject to NI. If either
                employer offers enhanced SMP/SPP, that enhanced rate does not automatically apply to ShPP
                unless the employer&apos;s policy says so.
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
                <li><a href="https://www.gov.uk/shared-parental-leave-and-pay" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">GOV.UK — Shared Parental Leave and Pay</a></li>
                <li><a href="https://www.legislation.gov.uk/uksi/2014/3050" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">Shared Parental Leave Regulations 2014</a></li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
