import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { TOOLS } from "@/data/tools";
import { FAQS } from "@/data/faqs";

const url = `${SITE.url}/uk/pay-rights`;

export const metadata: Metadata = {
  title: "UK Pay Rights 2026 — Minimum Wage, Payslips & Unlawful Deductions",
  description:
    "Your UK pay rights in 2026/27: National Living Wage, National Minimum Wage, the right to a payslip, unlawful deductions from wages, and how to claim if your employer underpays you.",
  alternates: { canonical: url },
  openGraph: {
    title: "UK Pay Rights 2026 — Minimum Wage, Payslips & Unlawful Deductions",
    description:
      "National Living Wage is £12.71/hour from April 2026. Guide to UK minimum wage rights, payslip entitlements, unlawful deductions, and recovery.",
    url,
  },
};

const PAY_TOOLS = TOOLS.filter((t) =>
  ["take-home-pay-calculator", "statutory-sick-pay-calculator", "holiday-entitlement-calculator"].includes(t.slug)
);

const PAY_FAQS = FAQS.filter((f) =>
  ["what-is-minimum-wage-uk-2026", "what-is-national-living-wage-2026", "can-employer-deduct-wages-uk", "how-is-sick-pay-calculated-uk", "what-is-auto-enrolment-pension-uk"].includes(f.slug)
).slice(0, 5);

export default function UKPayRightsPage() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UK Pay Rights 2026",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "UK", item: `${SITE.url}/uk` },
        { "@type": "ListItem", position: 3, name: "Pay Rights", item: url },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/uk" className="hover:text-ink-soft">🇬🇧 UK</Link>
          <span className="mx-1.5">/</span>
          <span>Pay Rights</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">UK · National Minimum Wage Act 1998 · ERA 1996</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Pay Rights 2026</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            UK workers have extensive legal protections over how much they are paid, what can be
            deducted, and what information employers must provide on payslips. These rights are
            enforced by HMRC, the Employment Tribunal, and the courts.
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">2026/27 rates:</strong> National Living Wage (21+) £12.71/hour ·
            NMW (18–20) £10.85/hour · NMW (16–17 / apprentices) £8.00/hour ·
            SSP £123.25/week · SMP/SPP/SAP/ShPP £194.32/week
          </div>
        </div>

        {/* Calculators */}
        {PAY_TOOLS.length > 0 && (
          <section className="mb-10" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="mb-4 text-base font-semibold text-ink">Calculators</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {PAY_TOOLS.map((tool) => (
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
          <h2 className="text-base font-semibold text-ink">National Minimum Wage & National Living Wage</h2>
          <p>
            The National Minimum Wage (NMW) and National Living Wage (NLW) set the floor below which
            employers cannot legally pay. Rates are reviewed each April by the Low Pay Commission and
            set by statutory instrument under the National Minimum Wage Act 1998. From 1 April 2026:
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-surface-line">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-surface-muted">
                  <th className="px-3 py-2.5 text-left font-semibold text-ink">Age group</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-ink">Rate (2026/27)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { group: "21 and over (National Living Wage)", rate: "£12.71/hour" },
                  { group: "18–20", rate: "£10.85/hour" },
                  { group: "16–17 and apprentices (first year)", rate: "£8.00/hour" },
                ].map(({ group, rate }) => (
                  <tr key={group} className="border-t border-surface-line">
                    <td className="px-3 py-2.5 text-ink-soft">{group}</td>
                    <td className="px-3 py-2.5 text-right font-medium text-ink">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Employers who pay below the NMW can face arrears notices, financial penalties of up to
            200% of the underpayment (capped at £20,000 per worker), and public naming by HMRC.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">Your right to an itemised payslip</h2>
          <p>
            Under ERA 1996 s.8, every employee and worker has the right to receive a written itemised
            payslip on or before each payday. It must show: gross pay, fixed and variable deductions
            (itemised separately if they vary), and net pay. From April 2019, hours must also be shown
            where pay varies by reference to time worked. If your employer fails to provide one, you
            can apply to the Employment Tribunal.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">Unlawful deductions from wages</h2>
          <p>
            Under ERA 1996 Part II, employers can only deduct money from your wages where:
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 pl-4">
            <li className="list-disc">There is a specific statutory authority (e.g. income tax, NI)</li>
            <li className="list-disc">Your contract expressly authorises the deduction</li>
            <li className="list-disc">You have given prior written consent</li>
          </ul>
          <p className="mt-3">
            Deductions for cash shortfalls in retail cannot exceed 10% of gross pay on any single
            payday. Claims for unlawful deductions must be brought within 3 months (before ACAS
            early conciliation) and can recover up to 2 years of unlawful deductions.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">Equal pay</h2>
          <p>
            Under the Equality Act 2010, men and women are entitled to equal pay for equal work,
            work rated as equivalent, or work of equal value. The right is enforced through an
            equality clause implied into every employment contract. Claims can be backdated up to
            6 years in the civil courts or 6 years in the Employment Tribunal.
          </p>
        </section>

        {/* FAQs */}
        {PAY_FAQS.length > 0 && (
          <section className="mb-10 max-w-2xl" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-4 text-base font-semibold text-ink">Common questions</h2>
            <div className="flex flex-col gap-3">
              {PAY_FAQS.map((f) => (
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
          <a href="https://www.legislation.gov.uk/ukpga/1998/39" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">National Minimum Wage Act 1998</a>
          {" · "}
          <a href="https://www.gov.uk/national-minimum-wage-rates" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">GOV.UK — NMW rates</a>
          {" · "}
          <a href="https://www.acas.org.uk/your-rights-during-employment/getting-paid" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">ACAS — Getting paid</a>
        </div>
      </div>
    </>
  );
}
