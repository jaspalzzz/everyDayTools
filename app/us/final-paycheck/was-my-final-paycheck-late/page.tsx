import type { Metadata } from "next";
import Link from "next/link";
import { FinalPaycheckLateChecker } from "@/components/calculators/FinalPaycheckLateChecker";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/us/final-paycheck/was-my-final-paycheck-late`;

export const metadata: Metadata = {
  title: "Was My Final Paycheck Late? State Deadline Checker",
  description:
    "Enter your state, last day worked, final paycheck date, and how employment ended to estimate whether your final paycheck was late.",
  alternates: { canonical: url },
};

export default function LatePaycheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Was my final paycheck late checker",
          description: metadata.description,
          url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        })}
      />
<div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/us/final-paycheck" className="hover:text-ink-soft">Final paycheck</Link>
          <span className="mx-1.5">/</span>
          <span>Late checker</span>
        </nav>
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Was my final paycheck late?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Use state timing rules and your actual payment date to estimate whether your
            final paycheck missed the legal deadline.
          </p>
        </div>
        <FinalPaycheckLateChecker />

        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="What to prepare">
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Before you check</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Keep your last day worked, the date you were told you were terminated or resigned, and the actual payment date.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">What counts as late</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              State law usually changes the deadline depending on whether you were fired, laid off, or resigned with notice.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">What this tool does not decide</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              It checks timing only. Whether bonuses, commissions, PTO, or deductions were handled correctly is a separate question.
            </p>
          </article>
        </section>

        <section className="mt-8 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-base font-semibold text-amber-900">What to do if the paycheck was late</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-amber-900">
            <p>
              Save the final payslip, direct-deposit confirmation, resignation email or termination notice, and any handbook wording on final pay. If the deadline has passed, ask payroll to confirm the legal basis for the payment date in writing.
            </p>
            <p>
              If the explanation does not match your state rule, move to the state final paycheck page or wage-claim route immediately. Many state agencies and courts care about the exact dates, so a clean paper trail matters more than a long complaint email.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/final-paycheck-deadline-calculator"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Open deadline calculator
            </Link>
            <Link
              href="/us/final-paycheck"
              className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
            >
              Final paycheck hub
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
