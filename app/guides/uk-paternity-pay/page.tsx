import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, FOUNDER_PERSON, jsonLd } from "@/lib/seo";

const SLUG = "uk-paternity-pay";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Paternity Pay & Leave 2026",
  description:
    "Statutory Paternity Pay is £194.32/week or 90% of AWE for up to 2 weeks. How to qualify, when to apply, and current leave rights.",
  alternates: { canonical: url },
  openGraph: { title: "UK Paternity Pay & Leave 2026", description: "How SPP works, who qualifies, the 2-week entitlement, and new expanded rights.", url },
};

const faqs = [
  { q: "How much is Statutory Paternity Pay (SPP)?", a: "SPP is £194.32/week (2026/27) or 90% of your average weekly earnings if lower. It is paid for 1 or 2 weeks — you choose — and must be taken within 52 weeks of the baby's birth or adoption placement." },
  { q: "Do I qualify for paternity leave?", a: "You qualify if you have been continuously employed by the same employer for 26 weeks ending with the 15th week before the baby's due date (or the week the adopter is matched), you are the biological father, the mother's partner, or the child's adopter, and you intend to care for the child. Self-employed individuals do not qualify for SPP." },
  { q: "Can I take paternity leave in the first year?", a: "Since April 2024, eligible fathers and partners can take their paternity leave and pay in two separate 1-week blocks at any point in the first 52 weeks (previously the 56-day window applied). Leave does not have to be taken consecutively." },
  { q: "Is SPP taxable?", a: "Yes — SPP is paid through the payroll and is subject to income tax and National Insurance contributions in the same way as ordinary earnings." },
];

export default function UKPaternityPayGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Paternity Pay & Leave 2026: SPP, Qualifying Conditions & New Rights",
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
      { "@type": "ListItem", position: 3, name: "UK Paternity Pay", item: url },
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
          <span>UK Paternity Pay</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CountryFlag country={COUNTRY} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">Parental Leave</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Paternity Pay & Leave 2026</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Eligible employees can take up to 2 weeks of paid paternity leave at £194.32/week. Since April 2024,
              fathers and partners have new flexibility to split their leave and take it at any point in the baby&apos;s first year.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Rates verified June 2026 · Sources: The Paternity and Adoption Leave Regulations 2002 (SI 2002/2788), as amended
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate your paternity pay</p>
            <p className="mt-0.5 text-xs text-ink-soft">Enter your earnings to see your SPP entitlement.</p>
            <Link href="/paternity-pay-calculator" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors">
              Open paternity pay calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2 className="text-base font-semibold text-ink">Who qualifies for Statutory Paternity Pay?</h2>
              <p>To receive SPP you must be:</p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">The biological father, the mother&apos;s spouse/civil partner/partner, or one of a same-sex couple who has adopted</li>
                <li className="list-disc">Employed continuously by the same employer for 26 weeks ending in the 15th week before the due date (or matching week for adoption)</li>
                <li className="list-disc">Earning at least £129/week (Lower Earnings Limit 2026/27)</li>
                <li className="list-disc">Intending to care for the child or support the mother/adopter</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">SPP rates and duration</h2>
              <div className="mt-3 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Detail</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">2026/27</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Weekly SPP rate", value: "£194.32 or 90% AWE (lower)" },
                      { label: "Maximum weeks", value: "2 weeks" },
                      { label: "Lower Earnings Limit (to qualify)", value: "£129/week" },
                      { label: "Notice required", value: "15th week before due date" },
                    ].map(({ label, value }) => (
                      <tr key={label} className="border-t border-surface-line">
                        <td className="px-3 py-2.5 text-ink-soft">{label}</td>
                        <td className="px-3 py-2.5 text-right font-medium text-ink">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">The new flexibility from April 2024</h2>
              <p>
                The Paternity Leave (Amendment) Regulations 2024 (SI 2024/132) introduced two major changes
                that took effect from 6 April 2024:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc"><strong className="text-ink">Split leave:</strong> Paternity leave can now be taken as two separate 1-week blocks, not necessarily consecutively.</li>
                <li className="list-disc"><strong className="text-ink">Extended window:</strong> Leave can be taken at any point in the 52 weeks following birth or placement (previously within 56 days).</li>
                <li className="list-disc"><strong className="text-ink">Notice changes:</strong> The notice period for paternity leave is now 28 days before the week in which leave is taken (previously 15 weeks before the due date for the start date).</li>
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
                <li><a href="https://www.gov.uk/paternity-pay-leave" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">GOV.UK — Paternity pay and leave</a></li>
                <li><a href="https://www.legislation.gov.uk/uksi/2002/2788" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">The Paternity and Adoption Leave Regulations 2002</a></li>
                <li><a href="https://www.legislation.gov.uk/uksi/2024/132" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">Paternity Leave (Amendment) Regulations 2024</a></li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
