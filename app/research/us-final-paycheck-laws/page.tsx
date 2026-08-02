import type { Metadata } from "next";
import Link from "next/link";
import { US_STATES } from "@/data/usStates";
import { isIndexableUsState } from "@/lib/contentQuality";
import { SITE, jsonLd } from "@/lib/seo";
import {
  FINAL_PAYCHECK_CSV_PATH,
  FINAL_PAYCHECK_REVIEWED,
  getFinalPaycheckFindings,
  getTerminationDeadlineDistribution,
} from "@/lib/usFinalPaycheckResearch";

const url = `${SITE.url}/research/us-final-paycheck-laws`;
const csvUrl = SITE.url + FINAL_PAYCHECK_CSV_PATH;
const reviewed = FINAL_PAYCHECK_REVIEWED;

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

export default function UsFinalPaycheckDatasetPage() {
  const findings = getFinalPaycheckFindings();
  const distribution = getTerminationDeadlineDistribution();
  const largestBand = Math.max(...distribution.map((item) => item.count));
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
    license: "https://creativecommons.org/licenses/by/4.0/",
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: csvUrl,
    },
    citation: "My Pay Rights, “US Final Paycheck Law Dataset — All 50 States + DC,” compiled " + reviewed + ".",
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
            <a href={FINAL_PAYCHECK_CSV_PATH} download className="rounded-md bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
              Download CSV
            </a>
            <Link href="/methodology" className="rounded-md border border-surface-line bg-white px-4 py-2.5 text-sm font-bold text-brand-700 hover:bg-surface-muted">
              Read methodology
            </Link>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Last compiled: <time dateTime={reviewed}>{reviewed}</time>. The CSV includes each record&apos;s verification
            year; compilation does not mean every jurisdiction changed or was re-reviewed on that date. Data is general
            information, not legal advice.
          </p>
        </header>

        <section aria-labelledby="findings-heading" className="mt-10">
          <h2 id="findings-heading" className="text-2xl font-bold text-ink">What the dataset shows</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            These counts classify the deadline language in the table below. They are descriptive research findings,
            not substitutes for the underlying statute or agency guidance.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [findings.jurisdictionCount, "jurisdictions covered"],
              [findings.differingDeadlineCount, "use different deadlines for termination and resignation"],
              [findings.rapidTerminationCount, "call for final pay within roughly three days after termination"],
              [findings.writtenDemandCount, "mention a written demand in at least one deadline"],
            ].map(([value, label]) => (
              <div key={String(label)} className="rounded-xl border border-surface-line bg-white p-5">
                <p className="text-3xl font-bold text-brand-700">{value}</p>
                <p className="mt-2 text-sm leading-snug text-ink-soft">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-surface-line bg-white p-5 sm:p-6">
              <h3 className="font-bold text-ink">Termination deadline distribution</h3>
              <div className="mt-5 space-y-4">
                {distribution.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between gap-4 text-xs">
                      <span className="font-semibold text-ink-soft">{item.label}</span>
                      <span className="font-bold text-ink">{item.count}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: Math.max(4, (item.count / largestBand) * 100) + "%" }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-surface-line bg-surface-muted p-5 sm:p-6">
              <h3 className="font-bold text-ink">Separation type matters</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {findings.differingDeadlineCount} jurisdictions in this dataset state different timing for an
                employer-initiated termination and a voluntary resignation; {findings.sameDeadlineCount} use the same
                summarized deadline. That distinction is easy to lose in a single national answer.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                The rapid-payment group is: {findings.rapidTerminationStates.join(", ")}.
              </p>
              {findings.writtenDemandStates.length > 0 && (
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Records that explicitly mention a written demand: {findings.writtenDemandStates.join(", ")}.
                </p>
              )}
            </div>
          </div>
        </section>

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
                    {isIndexableUsState(state) ? (
                      <Link href={`/us/states/${state.slug}`} className="text-brand-700 hover:underline">{state.name}</Link>
                    ) : (
                      state.name
                    )}
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

        <section aria-labelledby="citation-heading" className="mt-9 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-surface-line bg-white p-6">
            <h2 id="citation-heading" className="text-lg font-bold text-ink">Citation and reuse</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              This original compilation is available under CC BY 4.0: you may quote, adapt, or republish it with
              attribution and a visible link to this page. Rights in linked official materials remain with their
              respective public bodies. Contact the editorial desk for a custom extract.
            </p>
            <div className="mt-4 rounded-lg bg-surface-muted p-4 text-sm leading-relaxed text-ink">
              My Pay Rights, “US Final Paycheck Law Dataset — All 50 States + DC,” compiled {reviewed},{" "}
              <span className="break-all">{url}</span>.
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={FINAL_PAYCHECK_CSV_PATH} download className="font-bold text-brand-700 hover:underline">Permanent CSV</a>
              <span aria-hidden="true" className="text-ink-faint">·</span>
              <a href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener noreferrer" className="font-bold text-brand-700 hover:underline">CC BY 4.0</a>
              <span aria-hidden="true" className="text-ink-faint">·</span>
              <a href="mailto:editorial@mypayrights.com?subject=Final%20paycheck%20dataset%20request" className="font-bold text-brand-700 hover:underline">Request a custom cut</a>
            </div>
          </div>

          <div className="rounded-xl border border-surface-line bg-surface-muted p-6">
            <h2 className="text-lg font-bold text-ink">For reporters and researchers</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              <li>• State-by-state source URLs are included in every row and in the CSV.</li>
              <li>• The termination/resignation comparison can support layoff, wage-theft, and payroll stories.</li>
              <li>• We can prepare regional cuts or explain the classification method on deadline.</li>
            </ul>
            <Link href="/press" className="mt-5 inline-block font-bold text-brand-700 hover:underline">Media resources and editorial contact →</Link>
          </div>
        </section>
      </div>
    </>
  );
}
