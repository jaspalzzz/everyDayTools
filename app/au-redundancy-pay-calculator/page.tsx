import { ToolLayout } from "@/components/ToolLayout";
import { AuRedundancyCalculator } from "@/components/calculators/AuRedundancyCalculator";
import { AU_REDUNDANCY_SOURCE } from "@/lib/calculators/auRedundancy";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("au-redundancy-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({
  title: "Australia Redundancy Pay Calculator — Fair Work Act 2026",
  description: tool.description,
  url,
  slug: tool.slug,
});

const NES_TABLE = [
  { years: "1–2 years", weeks: 4 },
  { years: "2–3 years", weeks: 6 },
  { years: "3–4 years", weeks: 7 },
  { years: "4–5 years", weeks: 8 },
  { years: "5–6 years", weeks: 10 },
  { years: "6–7 years", weeks: 11 },
  { years: "7–8 years", weeks: 13 },
  { years: "8–9 years", weeks: 14 },
  { years: "9–10 years", weeks: 16 },
  { years: "10 years or more", weeks: 12 },
];

const faqs: FaqItem[] = [
  {
    question: "How is redundancy pay calculated in Australia?",
    answer:
      "Under the National Employment Standards (NES) in the Fair Work Act 2009, redundancy pay equals your base rate of pay multiplied by the number of weeks in the NES table for your period of continuous service. For example, 3 years of service entitles you to 7 weeks of base-rate pay.",
  },
  {
    question: "Do I qualify for redundancy pay in Australia?",
    answer:
      "To qualify for NES redundancy pay you must be employed by a national system employer, have at least 1 year of continuous service, be a permanent employee (not casual), and be made genuinely redundant. Employees of small businesses with fewer than 15 employees are not entitled to NES redundancy pay.",
  },
  {
    question: "Why does the NES redundancy pay drop at 10 years?",
    answer:
      "The NES table drops from 16 weeks (9–10 years) to 12 weeks (10+ years) because employees who reach 10 years of service also become entitled to long service leave under state and territory law. The legislature offset the higher long service leave benefit by reducing the NES redundancy weeks. Your total exit package — redundancy pay plus long service leave — is typically higher at 10+ years.",
  },
  {
    question: "Are small business employees entitled to redundancy pay?",
    answer:
      "No. The Fair Work Act 2009 exempts employers with fewer than 15 employees from the NES redundancy pay obligation. However, you may still have entitlements under a modern award or enterprise agreement. Contact the Fair Work Ombudsman at fairwork.gov.au for advice.",
  },
  {
    question: "Is redundancy pay taxed in Australia?",
    answer:
      "Genuine redundancy payments receive concessional tax treatment. For 2025–26, the tax-free amount is $11,985 plus $5,994 per completed year of service. Amounts above this threshold are taxed at a maximum rate of 32% (including Medicare levy). Normal income tax applies above the concessional cap.",
  },
  {
    question: "Does my employer have to pay out accrued leave on top of redundancy pay?",
    answer:
      "Yes. In addition to NES redundancy pay, your employer must also pay out all accrued but untaken annual leave (plus any annual leave loading where applicable). Long service leave must also be paid out if you have met the qualifying period under your state or territory legislation.",
  },
];

const contentBlock = (
  <div className="space-y-4">
    <p>
      Australian redundancy entitlements are set by the{" "}
      <strong>National Employment Standards (NES)</strong> under the Fair Work Act 2009. The NES
      applies to all employees covered by the national workplace relations system — the vast
      majority of private-sector workers in Australia.
    </p>
    <p>
      Redundancy pay is calculated on your <strong>base rate of pay only</strong>. Overtime, penalty
      rates, loadings, and allowances are excluded. The base rate is your ordinary rate for your
      ordinary hours — what you receive for a normal working week.
    </p>

    <h2 className="pt-2 text-sm font-semibold text-ink">
      NES redundancy pay table (Fair Work Act 2009 s.119)
    </h2>
    <p className="text-xs text-ink-faint">
      Applies to national system employees of employers with 15 or more employees.
    </p>
    <div className="overflow-x-auto rounded-xl border border-surface-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-line bg-surface-muted">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">
              Period of continuous service
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-semibold text-ink">
              Redundancy pay
            </th>
          </tr>
        </thead>
        <tbody>
          {NES_TABLE.map(({ years, weeks }, i) => (
            <tr
              key={years}
              className={`border-b border-surface-line last:border-0 ${
                i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"
              }`}
            >
              <td className="px-4 py-2.5 text-ink-soft">{years}</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                {weeks} {weeks === 1 ? "week" : "weeks"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="pt-2 text-sm font-semibold text-ink">Who is exempt from redundancy pay?</h2>
    <ul className="space-y-1.5 text-ink-soft">
      {[
        "Employees of small businesses (fewer than 15 employees at the time of dismissal)",
        "Employees with less than 12 months of continuous service",
        "Casual employees",
        "Apprentices",
        "Employees on fixed-term contracts where redundancy arises from the contract expiry",
        "Employees where the Fair Work Commission has reduced or removed the obligation (e.g. suitable alternative employment was found)",
      ].map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
          {item}
        </li>
      ))}
    </ul>

    <p>
      <strong>Modern awards and enterprise agreements</strong> can provide more than the NES minimum.
      Your employer must pay whichever is greater — NES, award, or agreement. Check your award on
      the{" "}
      <a
        href="https://www.fairwork.gov.au/find-help-for/visa-holders-and-migrants/pay-and-conditions-tool"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-600 underline-offset-2 hover:underline"
      >
        Fair Work Pay and Conditions Tool (PACT)
      </a>
      .
    </p>
  </div>
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(tool.name, url))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webApplicationSchema({ name: tool.name, description: tool.description, url, region: tool.region }),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <ToolLayout
        tool={tool}
        calculator={<AuRedundancyCalculator />}
        contentBlock={contentBlock}
        faqs={faqs}
        source={AU_REDUNDANCY_SOURCE}
        verifiedDate="2026-04-01"
      />
    </>
  );
}
