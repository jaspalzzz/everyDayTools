import type { Metadata } from "next";
import Link from "next/link";
import { US_STATES } from "@/data/usStates";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/research/us-final-paycheck-laws`;
const reviewed = "2026-07-12";

export const metadata: Metadata = {
  title: "US Final Paycheck Law Dataset — All 50 States + DC",
  description:
    "A source-linked table of final paycheck deadlines after termination or resignation in all 50 US states and Washington, DC.",
  alternates: { canonical: url },
  openGraph: {
    title: "US Final Paycheck Law Dataset — All 50 States + DC",
    description: "Compare termination and resignation pay deadlines across every US state and DC.",
    url,
  },
};

function csvEscape(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const csv = [
  ["State", "Code", "Region", "Terminated deadline", "Resigned deadline", "Minimum wage", "Verified year", "Official source"],
  ...US_STATES.map((state) => [
    state.name,
    state.code,
    state.region,
    state.finalPaycheckTerminated,
    state.finalPaycheckResigned,
    state.minimumWage,
    state.verifiedYear,
    state.dolUrl,
  ]),
].map((row) => row.map(csvEscape).join(",")).join("\n");

const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

export default function UsFinalPaycheckDatasetPage() {
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "US final paycheck law deadlines by state",
    description: metadata.description,
    url,
    dateModified: reviewed,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    spatialCoverage: "United States",
    temporalCoverage: "2025/2026",
    isAccessibleForFree: true,
    license: `${SITE.url}/terms`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Research", item: `${SITE.url}/research/us-final-paycheck-laws` },
      { "@type": "ListItem", position: 3, name: "US final paycheck dataset", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(dataset)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
<div className="mx-auto max-w-[1180px] px-5 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-soft">
          <Link href="/" className="hover:text-ink">Home</Link><span className="mx-1.5">/</span><span>Research</span>
        </nav>

        <header className="max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.08em] text-brand-600">Open reference data</p>
          <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">US final paycheck law dataset</h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Termination and resignation pay deadlines for all 50 states and Washington, DC. Each row links to the
            responsible state labor authority. Rules can turn on the reason for separation, payroll schedule,
            employment contract, or a written demand, so use the state page and official source before filing a claim.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={csvHref} download="us-final-paycheck-laws.csv" className="rounded-md bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
              Download CSV
            </a>
            <Link href="/methodology" className="rounded-md border border-surface-line bg-white px-4 py-2.5 text-sm font-bold text-brand-700 hover:bg-surface-muted">
              Read methodology
            </Link>
          </div>
          <p className="mt-3 text-xs text-ink-soft">Last compiled: <time dateTime={reviewed}>{reviewed}</time>. Data is general information, not legal advice.</p>
        </header>

        <div className="mt-9 overflow-x-auto rounded-lg border border-surface-line bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption className="sr-only">Final paycheck deadlines for every US state and Washington, DC</caption>
            <thead className="bg-surface-muted text-xs uppercase tracking-[.04em] text-ink-soft">
              <tr>
                <th scope="col" className="px-4 py-3">State</th>
                <th scope="col" className="px-4 py-3">If terminated</th>
                <th scope="col" className="px-4 py-3">If resigned</th>
                <th scope="col" className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {US_STATES.map((state) => (
                <tr key={state.code} className="border-t border-surface-line align-top">
                  <th scope="row" className="px-4 py-3 font-bold text-ink">
                    <Link href={`/us/states/${state.slug}/final-paycheck`} className="text-brand-700 hover:underline">{state.name}</Link>
                  </th>
                  <td className="px-4 py-3 text-ink-soft">{state.finalPaycheckTerminated}</td>
                  <td className="px-4 py-3 text-ink-soft">{state.finalPaycheckResigned}</td>
                  <td className="px-4 py-3">
                    <a href={state.dolUrl} rel="noopener noreferrer" className="font-semibold text-brand-600 hover:underline">Official authority ↗</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
