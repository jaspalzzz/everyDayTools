import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { PillarBacklink } from "@/components/PillarBacklink";
import { SITE, clampMetaDescription, jsonLd } from "@/lib/seo";

const SLUG = "uk-notice-period-law";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Notice Period Law 2026",
  description: clampMetaDescription(
    "How statutory minimum notice works in the UK under the Employment Rights Act 1996, the difference between statutory and contractual notice, garden leave, payment in lieu of notice, and what to do if your employer ignores your entitlement.",
  ),
  alternates: { canonical: url },
  openGraph: {
    title: "UK Notice Period Law: Your Rights Explained 2026",
    description: clampMetaDescription(
      "Statutory minimum notice, contractual notice, garden leave, PILON and wrongful dismissal — the complete guide for UK employees.",
    ),
    url,
  },
};

const faqs = [
  {
    q: "What is the statutory minimum notice in the UK?",
    a: "Under the Employment Rights Act 1996 s.86, you are entitled to: one week's notice if you have worked for 1 month to 2 years; one week per full year of service if you have worked for 2 to 12 years; and a maximum of 12 weeks' notice if you have worked for 12 or more years. These are the legal minimums — your contract may provide more.",
  },
  {
    q: "What happens if my employer does not give me proper notice?",
    a: "If your employer fails to give the correct notice and does not pay you in lieu, you can bring a wrongful dismissal claim. This is a contractual claim, not the same as unfair dismissal, and can be made regardless of how long you have worked there. The compensation is the pay you would have received during the missing notice period.",
  },
  {
    q: "What is garden leave?",
    a: "Garden leave (or gardening leave) is when your employer asks you not to come into work during your notice period but continues to pay your full salary and benefits. You remain employed and bound by any restrictive covenants in your contract. Employers use it to protect confidential information and client relationships.",
  },
  {
    q: "Is payment in lieu of notice (PILON) taxable?",
    a: "Yes, always. Since April 2018, HMRC treats all PILON as earnings regardless of what your contract says. It is subject to income tax and National Insurance contributions in full, even if the first £30,000 of any additional redundancy package is tax-free.",
  },
  {
    q: "Do I have to give notice when I resign?",
    a: "Legally, you must give your employer at least one week's notice if you have been employed for one month or more (ERA 1996 s.86(2)). Your contract will usually require longer notice — typically one month, or more for senior roles. Failing to give proper notice is a breach of contract, though enforcement is rare for junior employees.",
  },
  {
    q: "Can my employer give me zero notice?",
    a: "Yes, but only in very limited circumstances. Summary dismissal without any notice is only lawful for gross misconduct — for example, theft, physical assault, or serious breach of confidentiality. Ordinary poor performance or redundancy requires proper notice or PILON.",
  },
];

export default function UKNoticePeriodGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Notice Period Law: Your Rights Explained 2026",
    description: metadata.description,
    url,
    datePublished: DATE,
    dateModified: DATE,
    image: `${SITE.url}/opengraph-image`,
    author: { "@type": "Person", name: "Jaspal Singh", jobTitle: `Founder, ${SITE.name}` },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/logo-mark.svg` } },
    mainEntityOfPage: url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
      { "@type": "ListItem", position: 3, name: "UK Notice Period Law", item: url },
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
          <span>UK Notice Period Law</span>
        </nav>

        <article className="max-w-2xl">
          <PillarBacklink className="mb-6" />
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CountryFlag country={COUNTRY} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Leaving a Job
              </span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              UK Notice Period Law: Your Rights Explained 2026
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Notice periods are one of the most misunderstood areas of UK employment law. This
              guide explains the statutory minimum entitlements under the Employment Rights Act
              1996, how contractual notice interacts with those minimums, and what your options
              are when things go wrong.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Verified June 2026 · Source:{" "}
              <a href="https://www.legislation.gov.uk/ukpga/1996/18/section/86" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">ERA 1996 s.86</a>
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Check your notice period instantly</p>
            <p className="mt-0.5 text-xs text-ink-soft">
              Enter your start date and employment type to see your statutory minimum notice in seconds.
            </p>
            <Link
              href="/notice-period-calculator"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors"
            >
              Open notice period calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2 className="text-base font-semibold text-ink">Statutory minimum notice — the legal floor</h2>
              <p>
                The Employment Rights Act 1996, section 86, sets the minimum notice an employer
                must give an employee being dismissed. The period depends on continuous service:
              </p>
              <div className="mt-4 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Continuous service</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">Minimum notice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Under 1 month</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">None</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">1 month to 2 years</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">1 week</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">2 years</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">2 weeks</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">3 years</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">3 weeks</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">12+ years</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">12 weeks (maximum)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                The pattern is straightforward: one week per complete year of service, up to a cap
                of 12 weeks. Service is counted in complete years — 23 months gives you one week's
                statutory notice, not two.
              </p>
              <p className="mt-2">
                The minimum notice an employee must give when resigning is one week (for employees
                with one month or more of service), regardless of how long they have worked there.
                Your contract will usually require more.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Statutory vs contractual notice</h2>
              <p>
                Most employment contracts specify a longer notice period than the statutory minimum.
                The applicable period is whichever is higher — you cannot contract out of the
                statutory minimum.
              </p>
              <p className="mt-2">
                Common contractual notice periods:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">Junior employees: 1 month on either side</li>
                <li className="list-disc">Mid-level employees: 1–3 months on either side</li>
                <li className="list-disc">Senior or specialist employees: 3–6 months (sometimes 12 months for C-suite roles)</li>
              </ul>
              <p className="mt-3">
                If your contract says "one month's notice" but the statutory minimum for your service
                length is 6 weeks, you are entitled to 6 weeks. The contract cannot reduce you below
                the statutory floor; it can only add to it.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Garden leave</h2>
              <p>
                An employer can place you on garden leave — requiring you to stay away from work
                during your notice period while continuing to pay your full salary and contractual
                benefits. You remain an employee throughout, which means:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">You continue to accrue holiday and pension contributions</li>
                <li className="list-disc">Post-termination restrictive covenants (non-compete, non-solicitation) are more likely to be enforceable, because the period runs from your actual leaving date, not when you were put on garden leave</li>
                <li className="list-disc">You are not free to start a new job (doing so would be a breach of contract)</li>
              </ul>
              <p className="mt-3">
                Garden leave must be explicitly provided for in your contract to be lawful. If your
                contract does not include a garden leave clause, your employer must either let you
                work your notice or pay you in lieu.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Payment in lieu of notice (PILON)</h2>
              <p>
                Rather than requiring you to work your notice period, an employer can make a payment
                in lieu of notice (PILON) — a lump-sum payment equal to the salary you would have
                received during the notice period. Employers use PILON to end the employment
                relationship immediately, typically where they want you to leave the premises
                quickly or where working the notice period would be commercially disruptive.
              </p>
              <p className="mt-2">
                Since April 2018, all PILON payments are treated as earnings by HMRC and are subject
                to income tax and National Insurance. This is true whether or not your contract
                contains a PILON clause. You cannot claim the £30,000 redundancy tax exemption
                against a PILON payment.
              </p>
              <p className="mt-2">
                PILON covers your basic salary only unless your contract specifies otherwise. It does
                not usually cover bonus, commission, or benefits in kind unless these form part of
                your regular contractual entitlement and the contract explicitly includes them in PILON.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Wrongful dismissal — when your employer ignores notice</h2>
              <p>
                If your employer dismisses you without giving the correct notice and without paying
                PILON, you have been wrongfully dismissed. Wrongful dismissal is a contractual
                claim — it is about your employer breaking the contract, not about the fairness
                of the dismissal decision.
              </p>
              <p className="mt-2">
                You can claim wrongful dismissal regardless of how long you have worked for the
                employer (unlike unfair dismissal, which requires two years of service). The remedy
                is the pay and benefits you would have received during the notice period you were
                denied.
              </p>
              <p className="mt-2">
                Claims can be made either at an employment tribunal (capped at £25,000) or in the
                civil courts (where there is no cap, making it preferable for senior employees on
                high salaries with long notice periods).
              </p>
              <p className="mt-3">
                If you believe you have been wrongfully dismissed, contact{" "}
                <a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">ACAS</a>{" "}
                for free early conciliation before making a tribunal claim.
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
                <li>
                  <a href="https://www.legislation.gov.uk/ukpga/1996/18/section/86" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    Employment Rights Act 1996, s.86 — Minimum notice required
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/handing-in-your-notice/giving-notice" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    GOV.UK — Giving notice
                  </a>
                </li>
                <li>
                  <a href="https://www.acas.org.uk/notice-periods" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    ACAS — Notice periods
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim13505" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    HMRC Employment Income Manual — EIM13505 (PILON)
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
