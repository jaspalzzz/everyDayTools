import type { Metadata } from "next";
import Link from "next/link";
import { FinalPaycheckLateChecker } from "@/components/calculators/FinalPaycheckLateChecker";
import { US_STATES } from "@/data/usStates";
import { isIndexableUsState } from "@/lib/contentQuality";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/us/final-paycheck`;

const FINAL_PAY_TOOLS = [
  { label: "Deadline calculator", href: "/final-paycheck-deadline-calculator", body: "Find the state deadline from how employment ended." },
  { label: "Deduction checker", href: "/us/final-paycheck/employer-deduction-checker", body: "Check whether a deduction from final wages needs review." },
  { label: "PTO payout", href: "/pto-payout-calculator", body: "Estimate unused vacation or PTO due at separation." },
] as const;

export const metadata: Metadata = {
  title: "US Final Paycheck Laws 2026 - Deadlines, Late Pay and Deductions",
  description:
    "Check US final paycheck deadlines by state, see whether your last paycheck was late, and review employer deductions before filing a wage claim.",
  alternates: { canonical: url },
};

export default function USFinalPaycheckHub() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "US Final Paycheck Laws",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

<div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/us" className="hover:text-ink-soft">US</Link>
          <span className="mx-1.5">/</span>
          <span>Final paycheck</span>
        </nav>

        <section className="mb-10 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">US job exit pay</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            US final paycheck laws and late-paycheck checker
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Final paycheck deadlines are set by state law. Use this hub to check the
            deadline, test whether a payment was late, review deductions, and find the
            right state wage claim path.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="late-checker-heading">
          <h2 id="late-checker-heading" className="mb-4 text-xl font-bold text-ink">
            Was my final paycheck late?
          </h2>
          <FinalPaycheckLateChecker />
        </section>

        <section className="mb-10 grid gap-3 sm:grid-cols-3" aria-label="Final paycheck tools">
          {FINAL_PAY_TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="rounded-lg border border-surface-line bg-white p-4 hover:bg-surface-muted">
              <p className="text-sm font-semibold text-ink">{tool.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{tool.body}</p>
            </Link>
          ))}
        </section>

        {US_STATES.some(isIndexableUsState) && (
          <section className="mb-10" aria-labelledby="state-list-heading">
            <h2 id="state-list-heading" className="mb-4 text-xl font-bold text-ink">State final paycheck pages</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {US_STATES.filter(isIndexableUsState).map((state) => (
                <Link
                  key={state.slug}
                  href={`/us/states/${state.slug}/final-paycheck`}
                  className="rounded-lg border border-surface-line bg-white px-3 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
                >
                  {state.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
          <h2 className="mb-2 text-base font-bold">Before you file a wage claim</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Keep the final payslip and any payroll messages.</li>
            <li>Save your resignation or termination date in writing.</li>
            <li>Ask the employer to explain any deductions.</li>
            <li>Use the state labor agency link on your state page.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
