import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, FOUNDER_PERSON, clampMetaDescription, jsonLd } from "@/lib/seo";

const SLUG = "uk-adoption-pay";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Adoption Pay & Leave 2026 — SAP Rates, Qualifying Conditions & Paternity Rights",
  description: clampMetaDescription(
    "Statutory Adoption Pay (SAP) is £194.32/week for up to 39 weeks in 2026/27. How adoption leave works, who qualifies, the partner's 2-week entitlement, and how to elect which parent takes primary leave.",
  ),
  alternates: { canonical: url },
  openGraph: {
    title: "UK Adoption Pay & Leave 2026",
    description: clampMetaDescription("SAP pays £194.32/week for 39 weeks. Full guide to adoption leave, qualifying conditions and partner rights."),
    url,
  },
};

const faqs = [
  { q: "How much is Statutory Adoption Pay (SAP)?", a: "SAP is £194.32/week (2026/27) or 90% of average weekly earnings if lower. It is paid for up to 39 weeks — the first 6 weeks at 90% of AWE and the remaining 33 weeks at the flat rate (or 90% AWE if lower). This mirrors the Statutory Maternity Pay structure." },
  { q: "Who qualifies for adoption pay and leave?", a: "One member of an adopting couple (or a sole adopter) can claim SAP, provided they have been employed continuously for 26 weeks ending the week they are notified of a match, earn at least £129/week (LEL), and intend to care for the child. The other member of an adopting couple (if they qualify) can take Statutory Paternity Leave and Pay." },
  { q: "Does adoption pay work the same as maternity pay?", a: "Yes — the rates and structure of SAP are aligned with SMP: 90% of AWE for 6 weeks then the flat rate for up to 33 weeks. Adoption leave mirrors maternity leave: ordinary adoption leave (26 weeks) and additional adoption leave (a further 26 weeks). The key difference is that adoption leave can start from the date of placement (or up to 14 days before), not a weeks-before-due-date trigger." },
];

export default function UKAdoptionPayGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Adoption Pay & Leave 2026: SAP, Qualifying Conditions & Paternity Rights",
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
      { "@type": "ListItem", position: 3, name: "UK Adoption Pay", item: url },
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
          <span>UK Adoption Pay</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CountryFlag country={COUNTRY} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">Parental Leave</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Adoption Pay & Leave 2026</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Employees who adopt a child in the UK are entitled to up to 52 weeks of adoption leave and up to
              39 weeks of Statutory Adoption Pay — mirroring maternity leave rights. If two people are adopting
              together, one takes primary adoption leave and the other takes paternity leave.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">Rates verified June 2026 · Source: The Paternity and Adoption Leave Regulations 2002</p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate adoption pay</p>
            <Link href="/adoption-pay-calculator" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors">
              Open adoption pay calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2 className="text-base font-semibold text-ink">SAP rates 2026/27</h2>
              <div className="mt-3 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead><tr className="bg-surface-muted"><th className="px-3 py-2.5 text-left font-semibold text-ink">Period</th><th className="px-3 py-2.5 text-right font-semibold text-ink">Rate</th></tr></thead>
                  <tbody>
                    {[
                      { period: "First 6 weeks", rate: "90% of average weekly earnings" },
                      { period: "Weeks 7–39 (up to 33 weeks)", rate: "£194.32/week (or 90% AWE if lower)" },
                      { period: "Weeks 40–52", rate: "Unpaid (additional adoption leave)" },
                    ].map(({ period, rate }) => (
                      <tr key={period} className="border-t border-surface-line">
                        <td className="px-3 py-2.5 text-ink-soft">{period}</td>
                        <td className="px-3 py-2.5 text-right text-ink">{rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Partner&apos;s rights</h2>
              <p>
                The other member of an adopting couple can take up to 2 weeks of Statutory Paternity
                Leave paid at SPP (£194.32/week or 90% AWE if lower), provided they meet the qualifying
                conditions. Both partners can also opt into Shared Parental Leave after the primary
                adopter has taken 2 weeks of compulsory adoption leave.
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
                <li><a href="https://www.gov.uk/adoption-pay-leave" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">GOV.UK — Adoption pay and leave</a></li>
                <li><a href="https://www.legislation.gov.uk/uksi/2002/2788" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">The Paternity and Adoption Leave Regulations 2002</a></li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
