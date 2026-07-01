import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/uk/leaving-job`;

export const metadata: Metadata = {
  title: "UK Leaving a Job Pay Checklist 2026 - Notice, Holiday and Redundancy",
  description:
    "UK leaving a job hub covering final pay, notice pay, holiday pay, redundancy, settlement agreements, garden leave, and employer deductions.",
  alternates: { canonical: url },
};

const TOOL_SLUGS = [
  "redundancy-pay-calculator",
  "notice-period-calculator",
  "holiday-entitlement-calculator",
  "garden-leave-calculator",
  "settlement-agreement-calculator",
  "tribunal-compensation-calculator",
  "payslip-analyser",
];

export default function UKLeavingJobPage() {
  const tools = TOOL_SLUGS.map((slug) => TOOLS.find((tool) => tool.slug === slug)).filter(Boolean);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UK Leaving a Job Pay Checklist",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <main className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/uk" className="hover:text-ink-soft">UK</Link>
          <span className="mx-1.5">/</span>
          <span>Leaving a job</span>
        </nav>

        <section className="mb-10 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">UK job exit money</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            UK leaving a job pay checklist
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Leaving work can involve several separate payments: final wages, accrued holiday,
            notice pay, statutory redundancy pay, settlement sums, and sometimes tribunal
            compensation. Use this hub to check each part before you sign or accept a final payslip.
          </p>
        </section>

        <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="UK leaving job calculators">
          {tools.map((tool) => (
            <Link key={tool!.slug} href={`/${tool!.slug}`} className="rounded-lg border border-surface-line bg-white p-4 hover:bg-surface-muted">
              <p className="text-sm font-semibold text-ink">{tool!.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{tool!.description}</p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-surface-line bg-white p-5">
            <h2 className="mb-3 text-lg font-bold text-ink">Final pay checklist</h2>
            <ul className="grid gap-2 text-sm text-ink-soft">
              <li>Outstanding wages through your final day.</li>
              <li>Accrued but unused statutory holiday pay.</li>
              <li>Notice pay or payment in lieu of notice.</li>
              <li>Commission, bonus, expenses, and deductions shown on the payslip.</li>
              <li>P45 and written breakdown of termination payments.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <h2 className="mb-3 text-lg font-bold">Before you sign a settlement agreement</h2>
            <p className="text-sm leading-relaxed">
              Separate the sums: wages and PILON are taxable earnings, statutory redundancy
              is tax-free, and ex gratia payments may fall within the 30,000 pound termination
              payment exemption. Take independent legal advice before signing.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
