import type { Metadata } from "next";
import Link from "next/link";
import { PayslipAnalyser } from "@/components/calculators/PayslipAnalyser";
import { SITE, clampMetaDescription, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const title = "UK Payslip Deduction Analyser — What Do Each Deduction Mean?";
const description =
  "Enter your UK payslip deductions and get a plain-English explanation of each one — income tax, NI, pension, student loan, salary sacrifice. Instantly checks if your totals reconcile.";
const url = `${SITE.url}/payslip-analyser`;

export const metadata: Metadata = {
  title,
  description: clampMetaDescription(description),
  alternates: { canonical: url },
  openGraph: { title, description: clampMetaDescription(description), url },
};

const faqs: FaqItem[] = [
  {
    question: "What deductions should appear on a UK payslip?",
    answer:
      "A UK payslip must show gross pay, net pay, and any fixed deductions (income tax, NI). It must also show variable deductions if they change each period. Common deductions include: PAYE income tax, employee National Insurance, pension contributions, student loan repayments, and any salary sacrifice arrangements (pension, electric vehicle lease, cycle-to-work). Your employer is legally required to give you a payslip on or before your pay date.",
  },
  {
    question: "Why is my income tax deduction different from last month?",
    answer:
      "Income tax through PAYE is cumulative — HMRC looks at your total earnings and tax paid so far in the tax year and adjusts each month to keep you on track. A higher deduction this month may mean your employer corrected an underpayment, or you received a bonus or commission that pushed you into a higher cumulative total. A lower deduction may follow a month where you were temporarily overtaxed. Always check your tax code has not changed to an emergency code.",
  },
  {
    question: "What is salary sacrifice and how does it save me tax?",
    answer:
      "Salary sacrifice is an arrangement where you agree to reduce your contractual gross pay, and your employer pays the sacrificed amount toward a benefit (pension, EV lease, cycle-to-work scheme). Because your gross pay is lower, you pay less income tax and National Insurance on that amount. At the 20% basic rate, a £100 sacrifice costs you only £68 in take-home pay (saving £20 tax + £12 NI). Your employer also saves employer NI on the sacrificed amount.",
  },
  {
    question: "Can my employer make deductions from my wages without my consent?",
    answer:
      "No — unauthorised deductions from wages are illegal under the Employment Rights Act 1996 (s.13). Your employer can only deduct wages if: (1) required by law (tax, NI, court orders); (2) authorised by a relevant provision in your contract; or (3) you have given prior written consent. If you see a deduction you do not recognise and did not authorise, raise it with your payroll team in writing. If unresolved, you can bring a claim to the Employment Tribunal within 3 months.",
  },
  {
    question: "What does 'reconciliation' mean on this payslip analyser?",
    answer:
      "Reconciliation checks whether your listed deductions add up to the difference between your gross pay and net pay. If the totals match, your payslip is internally consistent. If they do not, it typically means there is a deduction missing from the list you entered, or the gross/net figures are slightly different from what appears on your actual payslip. It does not necessarily mean your employer has made an error — it may just be a data entry issue.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Payslip Analyser", item: url },
  ],
};

const webApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UK Payslip Deduction Analyser",
  description,
  url,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webApp)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="mb-6 flex items-center gap-1 text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="text-ink-soft">Payslip Analyser</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Payslip deduction analyser
        </h1>
        <p className="mb-8 text-ink-soft">
          Enter your payslip figures to get a plain-English explanation of every deduction — and
          an automatic check that your gross minus deductions equals your take-home pay.
        </p>

        <PayslipAnalyser />

        <section className="mt-12 space-y-4 text-sm text-ink-soft border-t border-surface-line pt-8">
          <h2 className="text-base font-bold text-ink">Understanding your payslip</h2>
          <p>
            UK employers are required by law to provide a written payslip to all employees on or
            before their pay date (Employment Rights Act 1996 s.8). The payslip must show gross pay,
            net pay, and any deductions — including fixed deductions (where the employer can give a
            standing statement) and variable deductions (which must be itemised each period).
          </p>
          <p>
            The largest deductions for most employees are <strong>PAYE income tax</strong> and
            <strong> employee National Insurance contributions (NICs)</strong>. Both are calculated
            by your employer and paid to HMRC on your behalf each month. Your tax code determines
            how much personal allowance is applied before income tax is calculated.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-base font-bold text-ink">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-surface-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 font-medium text-ink text-sm">
                  {faq.question}
                  <svg className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p className="border-t border-surface-line px-4 py-3 text-sm text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 flex flex-wrap gap-3">
          <Link href="/take-home-pay-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Take-home pay calculator
          </Link>
          <Link href="/notice-period-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Notice period calculator
          </Link>
          <Link href="/redundancy-pay-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Redundancy pay calculator
          </Link>
        </section>
      </main>
    </>
  );
}
