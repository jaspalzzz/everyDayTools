import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { TOOLS } from "@/data/tools";
import { FAQS } from "@/data/faqs";

const url = `${SITE.url}/us/pto-payout`;

export const metadata: Metadata = {
  title: "US PTO Payout Laws 2026 — Do You Get Paid for Unused Vacation?",
  description:
    "Whether your employer must pay out unused PTO depends entirely on your state. 24 states require it; others don't. Here are the rules for all 50 states in 2026.",
  alternates: { canonical: url },
  openGraph: {
    title: "US PTO Payout Laws 2026 — Unused Vacation Pay by State",
    description:
      "No federal law requires PTO payout. 24 states treat accrued vacation as wages that must be paid on termination. Find your state's rule.",
    url,
  },
};

const PTO_TOOLS = TOOLS.filter((t) =>
  ["pto-payout-calculator", "final-paycheck-deadline-calculator"].includes(t.slug)
);

const PTO_FAQS = FAQS.filter((f) =>
  ["does-my-employer-have-to-pay-out-pto"].includes(f.slug)
);

export default function USPTOPayoutPage() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "US PTO Payout Laws 2026",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "US", item: `${SITE.url}/us` },
        { "@type": "ListItem", position: 3, name: "PTO Payout", item: url },
      ],
    },
  };

  const STATES_REQUIRE = ["California", "Colorado", "Illinois", "Indiana", "Louisiana", "Maine", "Maryland", "Massachusetts", "Minnesota", "Montana", "Nebraska", "New Mexico", "New York (if policy says so)", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Rhode Island", "Tennessee", "Texas", "Utah", "Washington", "West Virginia", "Wyoming"];
  const STATES_NO_REQUIREMENT = ["Alabama", "Alaska", "Arizona", "Arkansas", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Iowa", "Kansas", "Kentucky", "Michigan", "Mississippi", "Missouri", "Nevada", "New Hampshire", "New Jersey", "North Carolina", "Pennsylvania", "South Carolina", "South Dakota", "Vermont", "Virginia", "Wisconsin"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/us" className="hover:text-ink-soft">🇺🇸 US</Link>
          <span className="mx-1.5">/</span>
          <span>PTO Payout</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">US · State Employment Standards</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">US PTO Payout Laws 2026</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            There is no federal law requiring employers to pay out accrued PTO when employment ends.
            Whether you get paid for unused vacation depends entirely on your state law and, in some
            states, your employer&apos;s written policy.
          </p>
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
            <strong>Key rule:</strong> In 24 states, accrued vacation is treated as earned wages —
            your employer must pay it out on termination. In the remaining states, your employer
            can legally have a "use it or lose it" policy.
          </div>
        </div>

        {/* Calculators */}
        {PTO_TOOLS.length > 0 && (
          <section className="mb-10" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="mb-4 text-base font-semibold text-ink">Calculators</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {PTO_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <p className="text-sm font-semibold text-ink">{tool.name} →</p>
                  <p className="mt-1 text-xs text-ink-soft">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="prose-tool mb-10 max-w-2xl text-sm leading-relaxed text-ink-soft">
          <h2 className="text-base font-semibold text-ink">States that require PTO payout</h2>
          <p>
            In these states, accrued vacation is treated as earned wages and must be paid out on
            termination regardless of company policy:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {STATES_REQUIRE.map((s) => (
              <span key={s} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] text-emerald-800">
                {s}
              </span>
            ))}
          </div>

          <h2 className="mt-6 text-base font-semibold text-ink">States with no payout requirement</h2>
          <p>
            In these states, employers can adopt "use it or lose it" policies or cap PTO accruals —
            though if the employer&apos;s own written policy promises payout, that policy becomes
            contractually binding and must be honoured:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {STATES_NO_REQUIREMENT.map((s) => (
              <span key={s} className="rounded-full border border-surface-line bg-surface-muted px-2.5 py-0.5 text-[11px] text-ink-faint">
                {s}
              </span>
            ))}
          </div>

          <h2 className="mt-6 text-base font-semibold text-ink">How to calculate your PTO payout</h2>
          <p>
            PTO payout is generally calculated at your final regular rate of pay:
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 pl-4">
            <li className="list-disc">Hourly: hours of accrued PTO × hourly rate</li>
            <li className="list-disc">Salaried: (annual salary ÷ 52 ÷ 5) × days of accrued PTO, or (annual salary ÷ working days per year) × days accrued</li>
          </ul>
          <p className="mt-3">
            PTO payout is taxable as ordinary income — the IRS treats it as supplemental wages,
            which are withheld at either the 22% flat rate or your marginal rate depending on
            how it is paid (separately vs combined with regular wages).
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">What to do if your employer refuses to pay</h2>
          <p>
            If you are in a state that requires PTO payout and your employer refuses:
          </p>
          <ol className="mt-2 flex flex-col gap-2 pl-4">
            <li className="list-decimal">Write to your employer citing the specific state statute</li>
            <li className="list-decimal">File a wage claim with your state Department of Labor</li>
            <li className="list-decimal">Consider a private claim for wages — many states allow recovery of 2× or 3× the unpaid amount as a penalty</li>
          </ol>
        </section>

        <section className="mb-10 max-w-2xl rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h2 className="text-base font-semibold text-ink">High-intent state calculators</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Start with state pages where policy wording often decides the answer.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/us/new-york/pto-payout-calculator" className="rounded-lg border border-surface-line bg-white p-4 hover:bg-surface-muted">
              <p className="text-sm font-semibold text-ink">New York PTO payout calculator</p>
              <p className="mt-1 text-xs text-ink-soft">Check unused vacation value and policy-dependent payout risk.</p>
            </Link>
            <Link href="/us/final-paycheck" className="rounded-lg border border-surface-line bg-white p-4 hover:bg-surface-muted">
              <p className="text-sm font-semibold text-ink">Final paycheck hub</p>
              <p className="mt-1 text-xs text-ink-soft">Check deadline, lateness, deductions, and claim steps.</p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        {PTO_FAQS.length > 0 && (
          <section className="mb-10 max-w-2xl" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-4 text-base font-semibold text-ink">Common questions</h2>
            <div className="flex flex-col gap-3">
              {PTO_FAQS.map((f) => (
                <Link
                  key={f.slug}
                  href={`/faq/${f.slug}`}
                  className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:bg-surface-muted"
                >
                  <p className="text-sm font-medium text-ink">{f.question}</p>
                  <p className="mt-1 text-xs text-ink-soft">{f.shortAnswer}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-surface-line pt-6 text-xs text-ink-faint">
          Sources:{" "}
          <a href="https://www.dol.gov/agencies/whd/state/contacts" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">DOL — State labor offices</a>
          {" · State labor department statutes and guidance (verified 2026) · "}
          <Link href="/guides/us-pto-payout-laws-by-state" className="text-brand-600 hover:underline">Full state-by-state guide →</Link>
        </div>
      </div>
    </>
  );
}
