import type { Metadata } from "next";
import Link from "next/link";
import { EmployerDeductionChecker } from "@/components/calculators/EmployerDeductionChecker";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/us/final-paycheck/employer-deduction-checker`;

export const metadata: Metadata = {
  title: "Can My Employer Deduct From My Final Paycheck?",
  description:
    "Check whether an employer deduction for equipment, uniforms, shortages, damage, taxes, or written authorization needs review before accepting final pay.",
  alternates: { canonical: url },
};

export default function DeductionCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Employer final paycheck deduction checker",
          url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        })}
      />
      <main className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/us/final-paycheck" className="hover:text-ink-soft">Final paycheck</Link>
          <span className="mx-1.5">/</span>
          <span>Deduction checker</span>
        </nav>
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Can my employer deduct from my final paycheck?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Employer deductions from final wages are highly state-specific. This checker
            flags common deduction types that need closer review before you accept the
            final paycheck or file a wage claim.
          </p>
        </div>
        <EmployerDeductionChecker />

        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Common deduction categories">
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Usually allowed</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Taxes, court-ordered garnishments, and deductions you clearly authorized in writing are the safest categories.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Often disputed</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Equipment loss, register shortages, breakage, uniforms, training costs, and negative PTO balances often depend on state law and documentation.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">What to collect</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Keep the policy, written authorization, final pay stub, and any itemized explanation from payroll before you agree the deduction is valid.
            </p>
          </article>
        </section>

        <section className="mt-8 max-w-2xl rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h2 className="text-base font-semibold text-ink">How to use this result</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
            <p>
              A deduction can still be unlawful even if your employer says it is “company policy.” In many states the real question is whether you signed a specific authorization and whether the deduction drops your wages below the minimum wage or violates final-paycheck rules.
            </p>
            <p>
              If the checker flags a deduction for review, move next to your state final paycheck page, compare the policy language, and ask payroll to break out gross wages, each deduction line, and the legal basis for withholding that amount.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/us/final-paycheck"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Final paycheck hub
            </Link>
            <Link
              href="/final-paycheck-deadline-calculator"
              className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-white"
            >
              Check deadline too
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
