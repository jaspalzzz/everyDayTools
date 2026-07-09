import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, clampMetaDescription, jsonLd } from "@/lib/seo";

const SLUG = "uk-take-home-pay";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "How to Calculate UK Take-Home Pay 2026/27",
  description: clampMetaDescription(
    "A plain-English guide to how your salary is taxed in the UK for 2026/27: income tax bands, National Insurance thresholds, student loan deductions, and worked examples for salaries from £20,000 to £100,000.",
  ),
  alternates: { canonical: url },
  openGraph: {
    title: "How to Calculate UK Take-Home Pay 2026/27",
    description: clampMetaDescription(
      "Income tax bands, National Insurance rates, student loan thresholds — and worked examples showing exactly how much you keep from a £30K, £50K and £80K salary.",
    ),
    url,
  },
};

const faqs = [
  {
    q: "What is the personal allowance for 2026/27?",
    a: "The personal allowance is £12,570 — the amount you can earn before paying any income tax. It has been frozen at this level since 2021/22 and is set to remain frozen until at least 2027/28 under current government policy.",
  },
  {
    q: "How much National Insurance do I pay as an employee in 2026/27?",
    a: "You pay Class 1 employee NIC at 8% on earnings between the Primary Threshold (£12,570/year) and the Upper Earnings Limit (£50,270/year), and 2% on earnings above £50,270. The employee NIC rate dropped from 12% to 10% in January 2024 and then to 8% in April 2024.",
  },
  {
    q: "What is the higher rate income tax threshold?",
    a: "The higher rate (40%) applies to taxable income between £50,271 and £125,140. Above £125,140, the additional rate of 45% applies. Scottish residents pay different rates — the Scottish Income Tax has five bands ranging from 19% to 48%.",
  },
  {
    q: "When does the personal allowance start to reduce?",
    a: "The personal allowance reduces by £1 for every £2 you earn above £100,000. At £125,140 it is zero. This creates an effective 60% marginal tax rate on earnings between £100,000 and £125,140 — a well-known quirk of the UK tax system.",
  },
  {
    q: "How much do student loan repayments reduce take-home pay?",
    a: "Plan 1 loans: 9% on income above £24,990/year. Plan 2 loans: 9% on income above £27,295/year. Plan 5 loans (from 2023): 9% on income above £25,000/year. Postgraduate loans: 6% on income above £21,000/year.",
  },
  {
    q: "Does my employer's pension contribution affect my tax?",
    a: "Employer contributions to your pension do not count as your taxable income. Your own contributions to a workplace pension (salary sacrifice scheme) reduce your gross pay before tax and NIC are calculated, saving you both income tax and National Insurance on the amount contributed.",
  },
];

export default function UKTakeHomePayGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Calculate UK Take-Home Pay 2026/27",
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
      { "@type": "ListItem", position: 3, name: "UK Take-Home Pay", item: url },
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
          <span>UK Take-Home Pay</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CountryFlag country={COUNTRY} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Pay &amp; Tax
              </span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              How to Calculate UK Take-Home Pay 2026/27
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Your gross salary and your take-home pay are very different numbers. Between income
              tax, National Insurance, pension contributions, and potentially student loan
              repayments, a typical UK employee pays 20–40% of their salary in deductions before
              anything reaches their bank account. This guide explains exactly how the calculation
              works.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Rates for 2026/27 tax year (6 April 2026 – 5 April 2027) · Source:{" "}
              <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">GOV.UK</a>
              ,{" "}
              <a href="https://www.gov.uk/national-insurance-rates-letters" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">HMRC</a>
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Get your exact take-home figure</p>
            <p className="mt-0.5 text-xs text-ink-soft">
              Enter your salary, pension contribution, and student loan plan to see your monthly and
              annual take-home pay with a full tax breakdown.
            </p>
            <Link
              href="/take-home-pay-calculator"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors"
            >
              Open take-home pay calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2 className="text-base font-semibold text-ink">Step 1 — Income tax bands 2026/27</h2>
              <p>
                Income tax in England, Wales and Northern Ireland operates in bands. You pay a
                different rate on each portion of your income — not a flat rate on all of it.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Band</th>
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Taxable income</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Personal allowance</td>
                      <td className="px-3 py-2.5 text-ink-soft">Up to £12,570</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">0%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Basic rate</td>
                      <td className="px-3 py-2.5 text-ink-soft">£12,571 – £50,270</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">20%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Higher rate</td>
                      <td className="px-3 py-2.5 text-ink-soft">£50,271 – £125,140</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">40%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Additional rate</td>
                      <td className="px-3 py-2.5 text-ink-soft">Over £125,140</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">45%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs">
                <strong className="text-ink">Scottish taxpayers</strong> pay different rates.
                Scotland has five income tax bands: Starter (19%), Basic (20%), Intermediate (21%),
                Higher (42%), and Top (48%). The thresholds also differ.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Step 2 — National Insurance 2026/27</h2>
              <p>
                Employees pay Class 1 National Insurance on their gross earnings. The 2024 cuts
                reduced the main rate from 12% to 8%:
              </p>
              <div className="mt-4 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Earnings band (annual)</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">Employee NIC rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Up to £12,570 (Primary Threshold)</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">0%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">£12,571 – £50,270 (Upper Earnings Limit)</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">8%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Over £50,270</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Step 3 — Worked examples</h2>

              <h3 className="mt-4 text-sm font-semibold text-ink">£30,000 salary</h3>
              <div className="mt-2 overflow-hidden rounded-lg border border-surface-line text-xs">
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Gross salary</span>
                  <span className="font-medium text-ink">£30,000</span>
                </div>
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Income tax (20% on £17,430)</span>
                  <span className="text-ink-soft">−£3,486</span>
                </div>
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Employee NIC (8% on £17,430)</span>
                  <span className="text-ink-soft">−£1,394</span>
                </div>
                <div className="flex justify-between bg-surface-muted px-3 py-2">
                  <span className="font-semibold text-ink">Take-home pay</span>
                  <span className="font-semibold text-brand-600">£25,120 / year (£2,093/mo)</span>
                </div>
              </div>

              <h3 className="mt-5 text-sm font-semibold text-ink">£50,000 salary</h3>
              <div className="mt-2 overflow-hidden rounded-lg border border-surface-line text-xs">
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Gross salary</span>
                  <span className="font-medium text-ink">£50,000</span>
                </div>
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Income tax (20% on £37,700)</span>
                  <span className="text-ink-soft">−£7,540</span>
                </div>
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Employee NIC (8% on £37,700)</span>
                  <span className="text-ink-soft">−£3,016</span>
                </div>
                <div className="flex justify-between bg-surface-muted px-3 py-2">
                  <span className="font-semibold text-ink">Take-home pay</span>
                  <span className="font-semibold text-brand-600">£39,444 / year (£3,287/mo)</span>
                </div>
              </div>

              <h3 className="mt-5 text-sm font-semibold text-ink">£80,000 salary</h3>
              <div className="mt-2 overflow-hidden rounded-lg border border-surface-line text-xs">
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Gross salary</span>
                  <span className="font-medium text-ink">£80,000</span>
                </div>
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Income tax (20% on £37,700 + 40% on £29,730)</span>
                  <span className="text-ink-soft">−£19,432</span>
                </div>
                <div className="flex justify-between border-b border-surface-line px-3 py-2">
                  <span className="text-ink-soft">Employee NIC (8% on £37,700 + 2% on £29,730)</span>
                  <span className="text-ink-soft">−£3,611</span>
                </div>
                <div className="flex justify-between bg-surface-muted px-3 py-2">
                  <span className="font-semibold text-ink">Take-home pay</span>
                  <span className="font-semibold text-brand-600">£56,957 / year (£4,746/mo)</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                Examples assume England/Wales, standard personal allowance, no pension contributions,
                and no student loan repayments. Use the calculator above for your exact figures.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Student loan repayments</h2>
              <p>
                Student loan repayments are calculated on your income above the repayment threshold
                for your plan type. They are collected through PAYE in the same way as tax and NIC:
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-surface-line text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Plan</th>
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Threshold (2026/27)</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Plan 1</td>
                      <td className="px-3 py-2.5 text-ink-soft">£24,990</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">9%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Plan 2</td>
                      <td className="px-3 py-2.5 text-ink-soft">£27,295</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">9%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Plan 5</td>
                      <td className="px-3 py-2.5 text-ink-soft">£25,000</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">9%</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Postgraduate (PGL)</td>
                      <td className="px-3 py-2.5 text-ink-soft">£21,000</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                  <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    GOV.UK — Income Tax rates and Personal Allowances
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/national-insurance-rates-letters" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    HMRC — National Insurance rates
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/repaying-your-student-loan/what-you-pay" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    GOV.UK — Student loan repayment thresholds
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
