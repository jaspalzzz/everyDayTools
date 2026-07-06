import type { Metadata } from "next";
import Link from "next/link";
import { PtoPayoutCalculator } from "@/components/calculators/PtoPayoutCalculator";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/us/new-york/pto-payout-calculator`;

export const metadata: Metadata = {
  title: "New York PTO Payout Calculator 2026 - Unused Vacation Pay",
  description:
    "Estimate unused PTO or vacation payout in New York and understand when employer policy controls the payout rule.",
  alternates: { canonical: url },
};

export default function NewYorkPtoPayoutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "New York PTO payout calculator",
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
          <Link href="/us/pto-payout" className="hover:text-ink-soft">US PTO payout</Link>
          <span className="mx-1.5">/</span>
          <span>New York</span>
        </nav>
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            New York PTO payout calculator
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            New York generally lets a clearly communicated employer policy control
            whether unused vacation or PTO is forfeited or paid out. Use the calculator
            to estimate the gross value, then compare it with your written policy.
          </p>
        </div>
        <PtoPayoutCalculator presetStateCode="NY" />
        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
          <h2 className="mb-2 text-base font-bold">New York policy check</h2>
          <p>
            Save your handbook, offer letter, PTO balance, and final payslip. If the
            policy is silent, unclear, or was not communicated before separation, ask
            payroll to explain the legal basis for forfeiting accrued time.
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="New York PTO review points">
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Main legal question</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              New York usually turns on the wording and communication of the employer’s vacation or PTO policy, not a blanket payout rule.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Useful evidence</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Keep the handbook version in force when you accrued the time, your balance history, and any emails that describe forfeiture or payout.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">When to escalate</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              If the policy is missing, inconsistent, or was changed after you accrued the leave, you may need the New York labor agency or counsel to review it.
            </p>
          </article>
        </section>

        <section className="mt-8 max-w-2xl rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h2 className="text-base font-semibold text-ink">What users usually miss in New York</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
            <p>
              A PTO balance alone does not settle the legal answer. The enforceability of forfeiture language depends on whether the policy was clearly written and actually communicated before separation.
            </p>
            <p>
              That means the strongest next step is usually not another calculation. It is comparing the estimated balance with the exact policy text and then checking whether final-pay timing and any deductions were also handled correctly.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/us/pto-payout"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              US PTO payout hub
            </Link>
            <Link
              href="/us/final-paycheck"
              className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-white"
            >
              Final paycheck rules
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
