import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

const SLUG = "uk-redundancy-pay";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Redundancy Pay: Complete Guide 2026 — Statutory Entitlement Explained",
  description:
    "How UK statutory redundancy pay is calculated, who qualifies, the weekly pay cap for 2026/27 (£751), the tax-free threshold (£30,000), and what to do if your employer refuses to pay.",
  alternates: { canonical: url },
  openGraph: {
    title: "UK Redundancy Pay: Complete Guide 2026",
    description:
      "Everything you need to know about statutory redundancy pay — age bands, the £751 weekly cap, the £30,000 tax-free threshold, and how to challenge an underpayment.",
    url,
  },
};

const faqs = [
  {
    q: "How much statutory redundancy pay am I entitled to?",
    a: "It depends on your age and length of service. For each complete year of service: under 22 you get half a week's pay; aged 22–40 you get one week's pay; aged 41 and over you get one and a half weeks' pay. Weekly pay is capped at £751 (2026/27) and only the last 20 years of service count, so the maximum payment is £22,530.",
  },
  {
    q: "Do I have to pay tax on redundancy pay?",
    a: "The first £30,000 of a genuine redundancy payment is tax-free. Anything above £30,000 is taxed at your usual income tax rate. Payments in lieu of notice (PILON) are always taxable and subject to National Insurance, as they are treated as earnings rather than compensation.",
  },
  {
    q: "What if my employer refuses to pay statutory redundancy pay?",
    a: "You have three months from the date your employment ended to make a claim to an employment tribunal. Before that, you can raise a formal grievance with your employer or contact ACAS for free early conciliation. If your employer is insolvent, you can claim directly from the government's Redundancy Payments Service.",
  },
  {
    q: "Do I qualify if I work part-time?",
    a: "Yes. Part-time employees have the same redundancy rights as full-time employees. Your weekly pay for the calculation is your normal weekly earnings (not a hypothetical full-time equivalent).",
  },
  {
    q: "Can my employer make me redundant while on maternity leave?",
    a: "You cannot be selected for redundancy because you are on maternity leave — that would be automatically unfair dismissal. If your role is genuinely redundant, you have the right to be offered any suitable alternative vacancy that exists, with priority over other employees.",
  },
  {
    q: "What is the difference between statutory and enhanced redundancy pay?",
    a: "Statutory redundancy pay is the legal minimum set by the Employment Rights Act 1996. Enhanced redundancy pay is anything your employer offers above that minimum — for example, using your actual salary rather than the capped weekly pay figure, or counting more than 20 years of service. Your contract or company handbook will state whether enhanced pay applies.",
  },
];

export default function UKRedundancyPayGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Redundancy Pay: Complete Guide 2026",
    description: metadata.description,
    url,
    datePublished: DATE,
    dateModified: DATE,
    author: { "@type": "Person", name: "Jaspal Singh", jobTitle: "Founder, MyPayRights" },
    publisher: { "@type": "Organization", name: "MyPayRights", url: SITE.url },
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
      { "@type": "ListItem", position: 3, name: "UK Redundancy Pay", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-content px-5 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/guides" className="hover:text-ink-soft">Guides</Link>
          <span className="mx-1.5">/</span>
          <span>UK Redundancy Pay</span>
        </nav>

        <article className="max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">🇬🇧</span>
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Leaving a Job
              </span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              UK Redundancy Pay: Complete Guide 2026
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              If you have been made redundant, you may be entitled to a statutory lump-sum payment
              from your employer. This guide explains exactly who qualifies, how the amount is
              calculated, what the 2026/27 limits are, and what to do if your employer will not pay.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Rates verified June 2026 · Source:{" "}
              <a href="https://www.gov.uk/redundancy-your-rights" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">GOV.UK</a>
              {" "}· Employment Rights Act 1996, ss.135–155
            </p>
          </div>

          {/* Quick-use CTA */}
          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate your entitlement</p>
            <p className="mt-0.5 text-xs text-ink-soft">
              Enter your age, length of service, and weekly pay to get your statutory figure instantly.
            </p>
            <Link
              href="/redundancy-pay-calculator"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors"
            >
              Open redundancy pay calculator →
            </Link>
          </div>

          {/* Body */}
          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2 className="text-base font-semibold text-ink">Who qualifies for statutory redundancy pay?</h2>
              <p>
                You qualify if you meet all four of these conditions, set out in the Employment Rights
                Act 1996:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc"><strong className="text-ink">Employee status</strong> — you must be an employee, not a worker or self-employed contractor.</li>
                <li className="list-disc"><strong className="text-ink">Two years' continuous service</strong> — you must have worked for the same employer without a break for at least two years.</li>
                <li className="list-disc"><strong className="text-ink">Genuine redundancy</strong> — your role must have ceased or diminished, not merely your employment relationship. Being fired for misconduct does not count.</li>
                <li className="list-disc"><strong className="text-ink">Not excluded</strong> — certain groups are excluded, including employees on fixed-term contracts where redundancy pay has been agreed to waive the right, domestic servants employed by close relatives, and employees of the Crown in certain capacities.</li>
              </ul>
              <p className="mt-3">
                Agency workers, zero-hours contract workers, and the genuinely self-employed do not
                have statutory redundancy rights, though they may have rights under their individual
                contracts. ACAS runs a free helpline (0300 123 1100) if you are unsure of your
                employment status.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">How statutory redundancy pay is calculated</h2>
              <p>
                The formula uses three variables: your age, your length of service, and your weekly
                pay — each subject to statutory caps.
              </p>

              {/* Age bands table */}
              <div className="mt-4 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Age during service year</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">Weeks per year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Under 22</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">½ week</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">22 to 40</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">1 week</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">41 and over</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">1½ weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                <strong className="text-ink">Weekly pay cap (2026/27): £751.</strong> If your
                normal weekly pay is more than £751, only £751 is used in the calculation.
              </p>
              <p className="mt-2">
                <strong className="text-ink">Service cap: 20 years.</strong> Even if you have worked
                for your employer for 30 years, only the most recent 20 count.
              </p>
              <p className="mt-2">
                <strong className="text-ink">Maximum payment: £22,530</strong> (20 years × 1.5
                weeks × £751). This represents someone aged 61+ who has worked for the same employer
                for 20+ years earning at least £751 per week.
              </p>

              <h3 className="mt-5 text-sm font-semibold text-ink">Worked example</h3>
              <p>
                Sarah is 38 years old. She has worked for her employer for 9 years and earns £600
                per week (below the £751 cap, so her actual pay is used).
              </p>
              <ul className="mt-2 flex flex-col gap-1 pl-4 text-xs">
                <li className="list-disc">All 9 years of service were between ages 29 and 38, so the band is 22–40 = 1 week per year.</li>
                <li className="list-disc">9 years × 1 week × £600 = <strong className="text-ink">£5,400 statutory redundancy pay</strong>.</li>
              </ul>
              <p className="mt-2 text-xs">
                If Sarah had started at age 20, three of those nine years would fall under the
                under-22 band (½ week) and six under the 22–40 band (1 week):
                (3 × ½ × £600) + (6 × 1 × £600) = £900 + £3,600 = £4,500.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Is redundancy pay taxable?</h2>
              <p>
                Statutory redundancy pay is compensation, not earnings, and the first £30,000 of a
                genuine redundancy payment is exempt from income tax and National Insurance. This
                threshold covers the whole redundancy package — statutory pay, any enhanced
                redundancy pay, and any ex-gratia payment.
              </p>
              <p className="mt-2">
                Amounts above £30,000 are taxable at your marginal income tax rate and subject to
                employer-only NIC (Class 1A) but not employee NIC.
              </p>
              <p className="mt-2">
                Importantly, <strong className="text-ink">payment in lieu of notice (PILON) is
                always taxable</strong> regardless of how it is labelled, following the post-April
                2018 HMRC rules. It is treated as earnings and subject to full PAYE and NIC.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">When must your employer pay you?</h2>
              <p>
                Statutory redundancy pay must be paid on or before your leaving date, or within a
                reasonable time thereafter. Your employer must give you a written statement showing
                how the amount was calculated.
              </p>
              <p className="mt-2">
                If your employer is placing you on notice, you should receive a written notice of
                redundancy — oral notice is valid in law but creates evidential problems. Your
                statutory redundancy pay is calculated based on your last day of employment (your
                "relevant date"), not the date you received notice.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Enhanced redundancy pay</h2>
              <p>
                Many employers — particularly in the public sector, financial services, and
                professional services — pay more than the statutory minimum. Common enhancements
                include:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">Using your actual weekly pay rather than the statutory cap</li>
                <li className="list-disc">Counting more than 20 years of service</li>
                <li className="list-disc">Paying a higher multiplier per year (e.g. 2 weeks per year instead of 1)</li>
                <li className="list-disc">Applying a flat additional payment on top of the statutory sum</li>
              </ul>
              <p className="mt-3">
                The terms of any enhanced scheme should appear in your contract of employment,
                collective agreement, or company handbook. If your employer has a written policy
                that it has consistently applied, you can usually enforce it even if it is not
                explicitly in your contract.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">What if your employer refuses to pay?</h2>
              <p>
                If your employer refuses to pay statutory redundancy pay or you believe you have
                been underpaid, you have several routes:
              </p>
              <ol className="mt-2 flex flex-col gap-2 pl-4">
                <li className="list-decimal">
                  <strong className="text-ink">Write to your employer</strong> formally claiming the
                  amount you believe you are owed. Keep a copy.
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">Contact ACAS</strong> (0300 123 1100 or{" "}
                  <a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">acas.org.uk</a>
                  ) for free early conciliation. This is a prerequisite before making a tribunal claim.
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">Employment tribunal claim</strong> — you have three
                  months from the relevant date (your leaving date) to make a claim. The tribunal
                  can order payment of the full statutory amount.
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">Insolvent employers</strong> — if your employer has
                  gone into administration or liquidation, you can claim directly from the{" "}
                  <a href="https://www.gov.uk/redundancy-payments-service" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    Redundancy Payments Service
                  </a>{" "}
                  (part of the Insolvency Service), which is funded by the National Insurance Fund.
                </li>
              </ol>
            </section>

            {/* FAQ section */}
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

            {/* Sources */}
            <section className="border-t border-surface-line pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Sources</h2>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-ink-faint">
                <li>
                  <a href="https://www.legislation.gov.uk/ukpga/1996/18/part/XI" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    Employment Rights Act 1996, Part XI — Redundancy Payments
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/redundancy-your-rights" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    GOV.UK — Redundancy: your rights
                  </a>
                </li>
                <li>
                  <a href="https://www.acas.org.uk/redundancy" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    ACAS — Redundancy
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/guidance/statutory-redundancy-pay" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    HMRC — Statutory Redundancy Pay guidance
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
