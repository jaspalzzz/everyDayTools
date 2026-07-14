import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, jsonLd } from "@/lib/seo";

const SLUG = "uk-pilon";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "PILON UK: Pay in Lieu of Notice Explained 2026",
  description:
    "What PILON is, how it differs from garden leave, how it's taxed after the 2018 rule change, how to calculate it, and what to do if your employer doesn't pay.",
  alternates: { canonical: url },
  openGraph: {
    title: "PILON UK: Pay in Lieu of Notice Explained 2026",
    description:
      "Pay in lieu of notice explained — tax treatment, calculation, garden leave vs PILON, and your rights if your employer refuses to pay.",
    url,
  },
};

const faqs = [
  {
    q: "What does PILON mean?",
    a: "PILON stands for Pay in Lieu of Notice. It is a payment your employer makes instead of requiring you to work your notice period. Rather than coming into work for 3 months (or whatever your notice period is), you leave immediately and your employer pays the equivalent of what you would have earned during that period.",
  },
  {
    q: "Is PILON taxable?",
    a: "Yes — all PILON payments have been fully subject to income tax and National Insurance since 6 April 2018, regardless of whether your contract contains a PILON clause or not. Before April 2018, non-contractual PILON could sometimes be sheltered within the £30,000 termination payment exemption. That loophole was closed by the Finance (No. 2) Act 2017. Your employer must deduct income tax and National Insurance through payroll before paying you.",
  },
  {
    q: "Does my employer have to pay PILON?",
    a: "Only if your employment contract contains a PILON clause — a term that expressly gives your employer the right to terminate immediately by paying in lieu of notice. If no such clause exists, your employer does not have an automatic right to use PILON. If they dismiss you without notice and without a contractual PILON clause, this is a wrongful dismissal, and you can claim the notice pay as damages (though it would still be taxable since 2018).",
  },
  {
    q: "What is the difference between PILON and garden leave?",
    a: "Under garden leave, you remain employed throughout your notice period — you are still on the payroll, your benefits continue (pension, private medical, share vesting), and your post-termination restrictive covenants run from the end of the notice period. Under PILON, your employment ends immediately on payment. Restrictive covenants start running from the day of termination, which can significantly reduce their effective duration. Garden leave also prevents you from working for a competitor immediately, whereas PILON does not (subject to any post-termination restrictions).",
  },
  {
    q: "How is PILON calculated?",
    a: "PILON is calculated based on your basic salary during the notice period, plus the value of any non-cash benefits you would have received (e.g. pension contributions, private medical insurance, company car). Overtime and commission are generally excluded unless they form a guaranteed part of your contract. The calculation multiplies your daily or weekly rate by the number of days or weeks in your notice period.",
  },
  {
    q: "What if my employer refuses to pay PILON?",
    a: "If your contract contains a PILON clause and your employer terminates you without notice or payment, you can bring a breach of contract claim in the Employment Tribunal (up to £25,000) or civil court (no cap). If there is no PILON clause and your employer dismisses you without notice, this is wrongful dismissal — you can claim the notice pay as a damages award. The 3-month time limit for tribunal claims applies; act promptly.",
  },
];

export default function UKPILONGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "PILON UK: Pay in Lieu of Notice Explained 2026",
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
      { "@type": "ListItem", position: 3, name: "PILON UK", item: url },
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
          <span>PILON — Pay in lieu of notice</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              🇬🇧 UK · Employment Rights · Updated {DATE}
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              PILON: pay in lieu of notice explained
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Pay in lieu of notice (PILON) lets your employer end your employment immediately
              by paying the wages you would have earned during your notice period. Since April 2018,
              all PILON is fully taxable. This guide covers how it works, how it differs from garden
              leave, and what to do if you&apos;re not paid correctly.
            </p>
          </header>

          <div className="prose-tool space-y-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2>How PILON works</h2>
              <p>
                When your employment is terminated — whether by redundancy, dismissal, or mutual
                agreement — your employer has a choice about how to handle your notice period:
              </p>
              <ul>
                {[
                  "Ask you to work your notice period normally",
                  "Put you on garden leave (you stay employed but don't work)",
                  "Pay you in lieu of notice (PILON) and end employment immediately",
                  "A combination — e.g. partial garden leave then PILON",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                PILON is only contractually available to your employer if your contract includes a{" "}
                <strong>PILON clause</strong>. Without one, dismissing you without notice is a
                wrongful dismissal — though the practical remedy (damages equal to notice pay) is
                the same as PILON.
              </p>
            </section>

            <section>
              <h2>Tax treatment since April 2018</h2>
              <p>
                Before 6 April 2018, non-contractual PILON could sometimes be treated as
                compensation (damages) rather than wages — allowing it to fall within the
                tax-free £30,000 termination payment exemption. The{" "}
                <strong>Finance (No. 2) Act 2017</strong> ended this distinction entirely.
              </p>
              <p>
                From April 2018, all PILON — whether contractual or not — is treated as earnings
                and is fully subject to:
              </p>
              <ul>
                {[
                  "Income tax (at your marginal rate — 20%, 40%, or 45%)",
                  "Employee National Insurance (8% up to the Upper Earnings Limit, 2% above)",
                  "Employer National Insurance (13.8%)",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="rounded-xl border border-surface-line bg-surface-muted px-4 py-3 text-xs">
                <strong className="text-ink">Worked example:</strong>{" "}
                <span className="text-ink-soft">
                  Your notice period is 3 months. You earn £60,000/year (£5,000/month). Your PILON
                  would be £15,000. As a 40% taxpayer: income tax = £6,000, employee NI (assumed
                  2% as earnings exceed UEL) ≈ £300. Net PILON received ≈ £8,700.
                </span>
              </div>
            </section>

            <section>
              <h2>PILON vs garden leave — key differences</h2>
              <p className="mb-2 text-xs font-medium text-ink-faint sm:hidden">
                ← Swipe to see all columns →
              </p>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Factor</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">PILON</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Garden leave</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { factor: "Employment status", pilon: "Ends immediately", garden: "Remains employed throughout" },
                      { factor: "Tax on payment", pilon: "Fully taxable as earnings", garden: "Normal PAYE during notice period" },
                      { factor: "Benefits (pension, PMI, car)", pilon: "Cease on termination date", garden: "Continue through notice period" },
                      { factor: "Share vesting", pilon: "Leaver provisions apply immediately", garden: "May continue to vest through notice period" },
                      { factor: "Restrictive covenants", pilon: "Run from termination date", garden: "Run from end of notice period" },
                      { factor: "Working for competitor", pilon: "Allowed (subject to post-employment restrictions)", garden: "Prohibited until notice ends" },
                    ].map(({ factor, pilon, garden }, i) => (
                      <tr key={factor} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"}`}>
                        <td className="px-4 py-2.5 font-medium text-ink">{factor}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{pilon}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{garden}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                <strong>Garden leave is usually better for you</strong> if you have significant
                benefits (pension, share vesting, PMI) — they continue accruing. PILON is better
                if you want to start a new job immediately and your post-termination restrictions
                are shorter.
              </p>
            </section>

            <section>
              <h2>How to calculate your PILON</h2>
              <p>
                The calculation uses your <strong>basic salary only</strong> (unless your contract
                specifies otherwise). Benefits are valued separately:
              </p>
              <ol>
                {[
                  "Identify your notice period (statutory or contractual, whichever is greater)",
                  "Calculate your daily rate: annual salary ÷ 365 (or weekly rate × weeks)",
                  "Multiply by the number of days/weeks in your notice period",
                  "Add the value of any contractual benefits you would have received (pension contributions, car allowance, etc.)",
                ].map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section>
              <h2>Notice period — statutory minimum</h2>
              <p>
                Your notice entitlement is the <em>greater</em> of your statutory and contractual
                entitlement:
              </p>
              <ul>
                {[
                  "1 month to 2 years' service: 1 week statutory notice",
                  "2 to 12 years' service: 1 week per year of service",
                  "12+ years' service: 12 weeks (statutory maximum)",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Your contract may give you more — for example, 3 months or 6 months. The PILON
                payment must cover at least the statutory minimum, regardless of what the contract
                says.
              </p>
            </section>

            {/* Tool CTA */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Notice period calculator</p>
                <p className="mt-1 text-xs text-ink-soft">Find your statutory notice entitlement — the floor for any PILON payment.</p>
                <Link href="/notice-period-calculator" className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">Calculate →</Link>
              </div>
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Garden leave calculator</p>
                <p className="mt-1 text-xs text-ink-soft">Calculate the full value of your garden leave period.</p>
                <Link href="/garden-leave-calculator" className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">Calculate →</Link>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <section aria-labelledby="faq-heading" className="mt-12">
            <h2 id="faq-heading" className="mb-5 text-base font-semibold text-ink">Frequently asked questions</h2>
            <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
              {faqs.map((faq) => (
                <details key={faq.q} className="group px-5 py-4">
                  <summary className="cursor-pointer list-none text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.q}
                      <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-180" aria-hidden="true">↓</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <footer className="mt-10 border-t border-surface-line pt-6 text-xs text-ink-faint">
            <p>Last reviewed: {DATE}. This guide provides general information about UK employment law and is not legal advice. Seek advice from a qualified employment solicitor for your specific situation.</p>
            <p className="mt-2"><Link href="/guides" className="text-brand-600 underline-offset-2 hover:underline">← All guides</Link></p>
          </footer>
        </article>
      </div>
    </>
  );
}
