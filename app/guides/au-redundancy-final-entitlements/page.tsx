import type { Metadata } from "next";
import { GuideArticleLayout } from "@/components/guides/GuideArticleLayout";
import { SITE, clampMetaDescription } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const slug = "au-redundancy-final-entitlements";
const title = "Australia Redundancy Pay and Final Entitlements Guide 2026";
const description =
  "Check NES redundancy pay, notice, unused leave and other final entitlements under the Fair Work Act, including the small-business exemption and award exceptions.";
const url = `${SITE.url}/guides/${slug}`;

export const metadata: Metadata = {
  title,
  description: clampMetaDescription(description),
  alternates: { canonical: url },
  openGraph: { title, description: clampMetaDescription(description), url, type: "article" },
};

const faqs: FaqItem[] = [
  {
    question: "Who gets NES redundancy pay in Australia?",
    answer:
      "A covered employee generally needs at least 12 months of continuous service and an employer with at least 15 employees. Awards and enterprise agreements can alter the applicable entitlement, and statutory exceptions apply.",
  },
  {
    question: "Why does the NES table fall from 16 weeks to 12 weeks at 10 years?",
    answer:
      "The published NES scale provides 16 weeks for at least nine but less than ten years, then 12 weeks at ten or more years. Use the official table rather than assuming the amount always rises with service.",
  },
  {
    question: "Is notice included in redundancy pay?",
    answer:
      "No. Fair Work says an employer must still provide notice of termination or payment in lieu when a job is made redundant. Notice and redundancy are separate components.",
  },
  {
    question: "What else should final pay contain?",
    answer:
      "Depending on the employee's circumstances, final pay can include outstanding wages, pay in lieu of notice, accrued annual leave and long service leave, accrued time off instead of overtime, and eligible redundancy pay.",
  },
  {
    question: "Do small businesses have to pay redundancy?",
    answer:
      "Most employers with fewer than 15 employees are exempt from the NES redundancy-pay obligation, but awards, enterprise agreements and special circumstances can produce a different result. The headcount includes specified associated-entity and regular-casual employees.",
  },
  {
    question: "Can an award or enterprise agreement provide a different amount?",
    answer:
      "Yes. Fair Work states that awards and enterprise agreements may contain different redundancy entitlements and rules. Identify the instrument covering the employee before treating the NES table as final.",
  },
];

export default function AustraliaRedundancyFinalEntitlementsGuide() {
  return (
    <GuideArticleLayout
      slug={slug}
      title={title}
      description={description}
      country="AU"
      category="Leaving a Job"
      datePublished="2026-07-18"
      dateModified="2026-07-18"
      sourceLabel="Fair Work Ombudsman — Redundancy pay and entitlements"
      legalTopic="Australian redundancy pay, notice and final entitlements"
      quickAnswer="For the NES baseline, check continuous service, employer headcount and the award or agreement first. Eligible employees generally need at least 12 months' service and an employer with 15 or more employees. Redundancy pay is separate from notice, outstanding wages and accrued leave, all of which should be checked in the final-pay breakdown."
      actions={[
        {
          label: "Calculate NES redundancy pay",
          href: "/au-redundancy-pay-calculator",
          description: "Apply the official service table to weekly base pay.",
        },
        {
          label: "Calculate minimum notice",
          href: "/au-notice-period-calculator",
          description: "Check notice and the over-45 additional week separately.",
        },
      ]}
      relatedLinks={[
        { label: "Australia redundancy article", href: "/blog/australia-fair-work-redundancy-explained" },
        { label: "Australia employment tools", href: "/au" },
        { label: "Annual leave calculator", href: "/au-annual-leave-calculator" },
      ]}
      faqs={faqs}
      sources={[
        {
          label: "Fair Work Ombudsman — Redundancy pay",
          href: "https://www.fairwork.gov.au/ending-employment/redundancy/redundancy-pay-and-entitlements",
          detail: "NES eligibility, service table, base-rate rule, notice and award/agreement exceptions. Content updated 25 June 2026; checked 18 July 2026.",
        },
        {
          label: "Fair Work Ombudsman — Ending employment fact sheet",
          href: "https://www.fairwork.gov.au/tools-and-resources/fact-sheets/minimum-workplace-entitlements/ending-employment",
          detail: "Final-pay components, notice, redundancy and underpayment assistance. Checked 18 July 2026.",
        },
        {
          label: "Fair Work Act 2009",
          href: "https://www.legislation.gov.au/C2009A00028/latest/text",
          detail: "Primary legislation; relevant NES provisions include sections 117 and 119–121. Checked 18 July 2026.",
        },
      ]}
    >
      <section>
        <h2>First decide whether the job is genuinely redundant</h2>
        <p>
          Redundancy concerns the job, not simply dissatisfaction with the employee. Fair Work
          describes redundancy as occurring when the employer no longer needs the job to be done by
          anyone, or the business becomes insolvent or bankrupt. A dismissal labelled “redundancy”
          can still be disputed if the role continues, required consultation was ignored, or
          reasonable redeployment was available.
        </p>
        <p>
          Consultation obligations often come from a modern award or enterprise agreement. Find the
          instrument covering the role before relying only on the National Employment Standards.
        </p>
      </section>

      <section>
        <h2>NES eligibility and the small-business exemption</h2>
        <p>
          Under the Fair Work Ombudsman's published NES baseline, an employee may be entitled to
          redundancy pay when they have at least <strong>one year of continuous service</strong>,
          are covered by the national workplace relations system, and work for an employer with
          <strong> at least 15 employees</strong>. These conditions were checked on
          <strong> 18 July 2026</strong>.
        </p>
        <p>
          Most small-business employers with fewer than 15 employees do not pay NES redundancy.
          Headcount is not always obvious: specified permanent employees, the people being
          terminated, regular and systematic casuals, and employees of associated entities may need
          to be counted. An award can also contain a different industry rule.
        </p>
      </section>

      <section>
        <h2>NES redundancy-pay table</h2>
        <p>
          The following weeks-of-pay table is the Fair Work Ombudsman scale last updated
          <strong> 25 June 2026</strong>. Redundancy is paid at the employee's base rate for ordinary
          hours and excludes separately identifiable bonuses, loadings, allowances, overtime and
          penalty rates.
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-surface-line">
          <table className="min-w-[520px] w-full text-xs">
            <thead className="bg-surface-muted text-left text-ink">
              <tr><th className="px-3 py-2">Continuous service</th><th className="px-3 py-2">Redundancy pay</th></tr>
            </thead>
            <tbody>
              {[
                ["1 to less than 2 years", "4 weeks"],
                ["2 to less than 3 years", "6 weeks"],
                ["3 to less than 4 years", "7 weeks"],
                ["4 to less than 5 years", "8 weeks"],
                ["5 to less than 6 years", "10 weeks"],
                ["6 to less than 7 years", "11 weeks"],
                ["7 to less than 8 years", "13 weeks"],
                ["8 to less than 9 years", "14 weeks"],
                ["9 to less than 10 years", "16 weeks"],
                ["10 years or more", "12 weeks"],
              ].map(([service, pay]) => (
                <tr key={service} className="border-t border-surface-line">
                  <td className="px-3 py-2">{service}</td><td className="px-3 py-2 font-semibold text-ink">{pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Notice remains payable as a separate entitlement</h2>
        <p>
          Making a role redundant does not absorb notice into redundancy pay. The employer must
          generally give written notice of the final employment date or pay in lieu. The NES
          minimum commonly ranges from one to four weeks based on continuous service, with an extra
          week for an employee over 45 who has completed at least two years' service. Exceptions can
          apply based on employment type and circumstances.
        </p>
        <p>
          Keep redundancy and notice on separate lines. An employee with less than 12 months'
          service may receive no NES redundancy pay but can still qualify for notice.
        </p>
      </section>

      <section>
        <h2>Build the full final-entitlements checklist</h2>
        <p>Fair Work's ending-employment guidance says final pay can include:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>outstanding wages or other remuneration;</li>
          <li>pay in lieu of notice;</li>
          <li>accrued annual leave and applicable long service leave;</li>
          <li>accrued time off instead of overtime;</li>
          <li>eligible redundancy pay; and</li>
          <li>other amounts required by an award, agreement or contract.</li>
        </ul>
        <p>
          Check the award or agreement for the payment deadline and any industry-specific
          redundancy provision. Annual leave, notice and redundancy may use different pay-rate
          definitions, so one weekly figure should not automatically be copied across every line.
        </p>
      </section>

      <section>
        <h2>If the calculation or payment is wrong</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5">
          <li>Ask for the redundancy decision, consultation record and itemised final-pay calculation in writing.</li>
          <li>Identify the award or enterprise agreement and compare its redundancy and final-pay clauses with the NES.</li>
          <li>Check service dates, excluded unpaid leave, employer headcount, base ordinary-hours rate and every accrued entitlement.</li>
          <li>Raise the discrepancy promptly with payroll or the employer and preserve the response.</li>
          <li>Contact the Fair Work Ombudsman or an appropriate workplace-relations professional if it remains unresolved.</li>
        </ol>
      </section>
    </GuideArticleLayout>
  );
}
