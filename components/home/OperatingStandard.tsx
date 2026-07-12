import Link from "next/link";

const STANDARD_ITEMS = [
  {
    title: "Primary-source data",
    body: "Rates and deadlines are checked against government, regulator, or statutory sources before publication.",
    href: "/methodology",
    link: "Read methodology",
  },
  {
    title: "Dated review trail",
    body: "Calculator pages show source review dates so users can judge freshness instead of trusting a vague claim.",
    href: "/editorial-policy",
    link: "Editorial policy",
  },
  {
    title: "Correction path",
    body: "Readers can report a rate, source, or calculation issue; confirmed issues are compared with the official source and fixed.",
    href: "/contact",
    link: "Report a correction",
  },
  {
    title: "Private by default",
    body: "Core calculators run without an account and do not ask people to upload employment documents to get an estimate.",
    href: "/privacy",
    link: "Privacy",
  },
] as const;

const SOURCE_ROWS = [
  ["UK", "GOV.UK, HMRC, ACAS, legislation.gov.uk"],
  ["US", "U.S. Department of Labor and state labor agencies"],
  ["CA", "Federal and provincial employment standards sources"],
  ["AU", "Fair Work Ombudsman and state/territory authorities"],
] as const;

export function OperatingStandard() {
  return (
    <section aria-labelledby="operating-standard-title" className="mb-14">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-w-0 rounded-lg border border-surface-line bg-white p-4 sm:p-6">
          <p className="mb-2 text-[11px] font-black uppercase tracking-[.12em] text-brand-600">
            Operating standard
          </p>
          <h2 id="operating-standard-title" className="mb-3 text-2xl font-bold leading-tight text-ink">
            Built to be checked, not just believed.
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            My Pay Rights is for decisions people may discuss with a partner, parent, lawyer,
            payroll team, or employer. The product has to show its working: source links, dated
            reviews, clear assumptions, and a correction route when something changes.
          </p>
          <div className="mt-5 overflow-hidden rounded-lg border border-surface-line">
            <table className="w-full table-fixed text-left text-sm">
              <thead>
                <tr className="border-b border-surface-line bg-surface-muted text-[11px] uppercase tracking-[.08em] text-ink-soft">
                  <th scope="col" className="w-[64px] px-2 py-2 font-bold sm:w-[88px] sm:px-4">Country</th>
                  <th scope="col" className="px-2 py-2 font-bold sm:px-4">Typical source base</th>
                </tr>
              </thead>
              <tbody>
                {SOURCE_ROWS.map(([country, source]) => (
                  <tr key={country} className="border-b border-surface-line last:border-0">
                    <th scope="row" className="px-2 py-2.5 font-bold text-ink sm:px-4">{country}</th>
                    <td className="break-words px-2 py-2.5 text-ink-soft sm:px-4">{source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {STANDARD_ITEMS.map((item) => (
            <article key={item.title} className="rounded-lg border border-surface-line bg-white p-5">
              <h3 className="mb-2 text-base font-bold text-ink">{item.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              <Link href={item.href} className="text-sm font-bold text-brand-600 underline-offset-2 hover:underline">
                {item.link} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
