import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { TOOLS } from "@/data/tools";
import { FAQS } from "@/data/faqs";

const url = `${SITE.url}/uk/maternity-leave`;

export const metadata: Metadata = {
  title: "UK Maternity Leave & Pay 2026",
  description:
    "UK maternity leave and pay guide: SMP qualification, 39-week payment structure, Maternity Allowance, shared leave, and return rights.",
  alternates: { canonical: url },
  openGraph: {
    title: "UK Maternity Leave & Pay 2026",
    description:
      "Statutory Maternity Pay pays 90% of earnings for 6 weeks then £194.32/week for 33 weeks. Full guide to qualifying, calculating, and protecting your rights.",
    url,
  },
};

const MATERNITY_TOOLS = TOOLS.filter((t) =>
  ["maternity-pay-calculator", "shared-parental-leave-calculator", "paternity-pay-calculator", "adoption-pay-calculator"].includes(t.slug)
);

const MATERNITY_FAQS = FAQS.filter((f) =>
  ["can-i-be-sacked-while-pregnant-uk", "can-i-be-made-redundant-while-on-maternity-leave"].includes(f.slug)
);

export default function UKMaternityLeavePage() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UK Maternity Leave & Pay 2026",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "UK", item: `${SITE.url}/uk` },
        { "@type": "ListItem", position: 3, name: "Maternity Leave", item: url },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/uk" className="hover:text-ink-soft">🇬🇧 UK</Link>
          <span className="mx-1.5">/</span>
          <span>Maternity Leave</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">UK · 2026/27 Statutory Rates</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Maternity Leave & Pay 2026</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Every pregnant employee in the UK is entitled to up to 52 weeks of maternity leave, regardless
            of length of service. Statutory Maternity Pay (SMP) is paid for up to 39 of those weeks if you
            meet the qualifying conditions.
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">2026/27 SMP rates:</strong> Weeks 1–6: 90% of average weekly earnings ·
            Weeks 7–39: £194.32/week (or 90% if lower) · Lower Earnings Limit: £129/week ·
            Qualifying service: 26 weeks by 15th week before due date
          </div>
        </div>

        {/* Calculators */}
        {MATERNITY_TOOLS.length > 0 && (
          <section className="mb-10" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="mb-4 text-base font-semibold text-ink">Calculators</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {MATERNITY_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <p className="text-sm font-semibold text-ink">{tool.name} →</p>
                  <p className="mt-1 text-xs text-ink-soft">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Content */}
        <section className="prose-tool mb-10 max-w-2xl text-sm leading-relaxed text-ink-soft">
          <h2 className="text-base font-semibold text-ink">How Statutory Maternity Pay works</h2>
          <p>
            SMP is paid by your employer (who then reclaims 92% from HMRC, or 103% if they qualify as a
            small employer). It is paid for up to 39 weeks and has two distinct phases:
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 pl-4">
            <li className="list-disc"><strong className="text-ink">First 6 weeks:</strong> 90% of your average weekly earnings (AWE), calculated over 8 weeks ending in the 15th week before your due date.</li>
            <li className="list-disc"><strong className="text-ink">Remaining 33 weeks:</strong> £194.32/week (2026/27) or 90% of AWE, whichever is lower.</li>
          </ul>
          <p className="mt-3">SMP is taxable earnings — income tax and NI apply in the same way as normal pay.</p>

          <h2 className="mt-6 text-base font-semibold text-ink">Qualifying conditions</h2>
          <p>To qualify for SMP you must:</p>
          <ul className="mt-2 flex flex-col gap-1.5 pl-4">
            <li className="list-disc">Have been continuously employed by the same employer for at least 26 weeks ending in the 15th week before your baby is due (the "qualifying week")</li>
            <li className="list-disc">Earn on average at least £129/week (the Lower Earnings Limit for 2026/27) in the 8-week reference period</li>
            <li className="list-disc">Provide your employer with 28 days' notice of when you intend to start maternity leave, plus a MATB1 certificate from your midwife or doctor</li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-ink">Maternity Allowance</h2>
          <p>
            If you do not qualify for SMP — for example, because you recently changed employer, are
            self-employed, or earn below the Lower Earnings Limit — you may qualify for{" "}
            <strong>Maternity Allowance</strong> from the government, paid at £194.32/week (or 90%
            of AWE if lower) for up to 39 weeks.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">Your right to return to work</h2>
          <p>
            After Ordinary Maternity Leave (first 26 weeks), you have the right to return to the
            same job on the same terms. After Additional Maternity Leave (weeks 27–52), you have
            the right to return to the same job or, if that is not reasonably practicable, a
            suitable alternative on equivalent terms. You cannot be dismissed or selected for
            redundancy because you are pregnant or on maternity leave — this is automatically
            unfair dismissal with no qualifying period.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">Shared Parental Leave</h2>
          <p>
            After the first two weeks of compulsory maternity leave, SMP and maternity leave can be
            curtailed and converted into Shared Parental Leave (ShPL) and Shared Parental Pay (ShPP),
            enabling the other parent to share up to 37 weeks of leave and 35 weeks of pay at
            £194.32/week (or 90% of AWE if lower).
          </p>
        </section>

        {/* Relevant FAQs */}
        {MATERNITY_FAQS.length > 0 && (
          <section className="mb-10 max-w-2xl" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-4 text-base font-semibold text-ink">Common questions</h2>
            <div className="flex flex-col gap-3">
              {MATERNITY_FAQS.map((f) => (
                <Link
                  key={f.slug}
                  href={`/faq/${f.slug}`}
                  className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:bg-surface-muted"
                >
                  <p className="text-sm font-medium text-ink">{f.question}</p>
                  <p className="mt-1 text-xs text-ink-soft">{f.shortAnswer}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-surface-line pt-6 text-xs text-ink-faint">
          Sources:{" "}
          <a href="https://www.gov.uk/maternity-pay-leave" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">GOV.UK — Maternity pay and leave</a>
          {" · "}
          <a href="https://www.legislation.gov.uk/uksi/1986/1960/contents" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Statutory Maternity Pay (General) Regulations 1986</a>
        </div>
      </div>
    </>
  );
}
