import type { Metadata } from "next";
import { GuideArticleLayout } from "@/components/guides/GuideArticleLayout";
import { SITE, clampMetaDescription } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const slug = "ca-ontario-termination-severance-pay";
const title = "Ontario Termination and Severance Pay Guide 2026";
const description =
  "Understand Ontario ESA termination notice, pay in lieu and the separate severance-pay test, including the five-year threshold, employer-size test and 26-week cap.";
const url = `${SITE.url}/guides/${slug}`;

export const metadata: Metadata = {
  title,
  description: clampMetaDescription(description),
  alternates: { canonical: url },
  openGraph: { title, description: clampMetaDescription(description), url, type: "article" },
};

const faqs: FaqItem[] = [
  {
    question: "Are termination pay and severance pay the same in Ontario?",
    answer:
      "No. Termination notice or pay in lieu applies to many employees after three months of continuous employment. ESA severance pay is a separate benefit for qualifying employees who meet the five-year service test and the employer payroll or mass-closure test.",
  },
  {
    question: "How much statutory termination notice can Ontario require?",
    answer:
      "For an individual termination under the ESA, the minimum generally rises with continuous service from one week after three months to a maximum of eight weeks after eight or more years. Exemptions and separate mass-termination rules can apply.",
  },
  {
    question: "Who qualifies for Ontario ESA severance pay?",
    answer:
      "The employee generally needs five or more years of employment and the employer must have a global payroll of at least $2.5 million, or have severed 50 or more employees in a six-month period because all or part of the business permanently closed.",
  },
  {
    question: "What is the Ontario severance-pay maximum?",
    answer:
      "The ESA maximum is 26 weeks of regular wages for a regular work week. The formula generally uses completed years plus completed months divided by 12.",
  },
  {
    question: "Can common-law notice be more than the ESA minimum?",
    answer:
      "Yes. The ESA sets minimum standards. Depending on the employment contract and facts, an employee may have greater contractual or common-law rights. Courts consider factors beyond service alone, so an ESA calculator should not be treated as a common-law estimate.",
  },
  {
    question: "Does this guide apply across Canada?",
    answer:
      "No. It covers Ontario's Employment Standards Act baseline. Other provinces and federally regulated workplaces use different statutes, eligibility tests, notice schedules and complaint routes.",
  },
];

export default function OntarioTerminationSeveranceGuide() {
  return (
    <GuideArticleLayout
      slug={slug}
      title={title}
      description={description}
      country="CA"
      category="Leaving a Job"
      datePublished="2026-07-18"
      dateModified="2026-07-18"
      sourceLabel="Ontario Ministry of Labour — Employment Standards Act guide"
      legalTopic="Ontario termination pay and severance pay"
      quickAnswer="Ontario termination pay and ESA severance pay are separate. Many employees with at least three months' service qualify for notice or pay in lieu. Severance adds another payment only when the employee has at least five years of employment and the employer meets the $2.5 million payroll or qualifying 50-employee closure test."
      actions={[
        {
          label: "Estimate severance pay",
          href: "/severance-pay-calculator",
          description: "Model service and weekly pay while checking eligibility separately.",
        },
        {
          label: "Check Ontario notice",
          href: "/notice-period-calculator",
          description: "Use the Canada (Ontario baseline) option.",
        },
      ]}
      relatedLinks={[
        { label: "French notice information", href: "/fr/ca/preavis" },
      ]}
      faqs={faqs}
      sources={[
        {
          label: "Ontario — Termination of employment",
          href: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/termination-employment",
          detail: "ESA individual and mass-termination rules, notice and termination pay. Checked 18 July 2026.",
        },
        {
          label: "Ontario — Severance pay",
          href: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/severance-pay",
          detail: "Five-year test, $2.5 million payroll / 50-employee closure test, formula and 26-week maximum. Checked 18 July 2026.",
        },
        {
          label: "Ontario Employment Standards Act, 2000",
          href: "https://www.ontario.ca/laws/statute/00e41",
          detail: "Primary provincial legislation; Part XV covers termination and severance. Checked 18 July 2026.",
        },
      ]}
    >
      <section>
        <h2>Start by separating two ESA entitlements</h2>
        <p>
          Ontario uses “termination pay” and “severance pay” for different minimum standards.
          Termination notice gives an employee warning that employment will end; an employer can
          provide working notice, pay in lieu, or a combination. ESA severance pay compensates
          certain longer-service employees when employment is severed and has a separate
          eligibility test.
        </p>
        <p>
          An employee can qualify for both. Do not let an offer label one payment as covering the
          other without an itemised calculation. The Ontario Ministry of Labour expressly describes
          severance as different from termination pay.
        </p>
      </section>

      <section>
        <h2>Ontario ESA individual termination-notice schedule</h2>
        <p>
          For an individual termination, the statutory minimum generally begins after three months
          of continuous employment. The following Ontario ESA schedule was checked on
          <strong> 18 July 2026</strong>:
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-surface-line">
          <table className="min-w-[520px] w-full text-xs">
            <thead className="bg-surface-muted text-left text-ink">
              <tr><th className="px-3 py-2">Continuous employment</th><th className="px-3 py-2">Minimum notice</th></tr>
            </thead>
            <tbody>
              {[
                ["Less than 3 months", "No ESA individual notice"],
                ["3 months to less than 1 year", "1 week"],
                ["1 year to less than 3 years", "2 weeks"],
                ["3 years to less than 4 years", "3 weeks"],
                ["4 years to less than 5 years", "4 weeks"],
                ["5 years to less than 6 years", "5 weeks"],
                ["6 years to less than 7 years", "6 weeks"],
                ["7 years to less than 8 years", "7 weeks"],
                ["8 years or more", "8 weeks"],
              ].map(([service, notice]) => (
                <tr key={service} className="border-t border-surface-line">
                  <td className="px-3 py-2">{service}</td><td className="px-3 py-2 font-semibold text-ink">{notice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Exemptions can apply, including specified misconduct and occupational exceptions. Mass
          terminations can trigger different notice requirements based on the number of employees
          affected, so the individual table is not the right tool for every group termination.
        </p>
      </section>

      <section>
        <h2>The separate ESA severance-pay test</h2>
        <p>An employee generally qualifies for Ontario ESA severance only if both conditions are met:</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5">
          <li>the employee has worked for the employer for <strong>five years or more</strong>; and</li>
          <li>the employer has a <strong>global payroll of at least $2.5 million</strong>, or severed 50 or more employees in six months because all or part of the business permanently closed.</li>
        </ol>
        <p>
          These thresholds were checked against the Ontario guide on <strong>18 July 2026</strong>.
          Failing the ESA severance test does not erase termination notice/pay or any greater right
          under a contract or common law.
        </p>
      </section>

      <section>
        <h2>How Ontario ESA severance is calculated</h2>
        <p>
          Multiply regular wages for a regular work week by completed years of employment, then add
          completed months in the incomplete year divided by 12. The ESA maximum is
          <strong> 26 weeks</strong> of regular wages. A special calculation applies where the
          employee does not have a regular work week or is paid on another basis.
        </p>
        <div className="rounded-lg border border-surface-line bg-surface-muted p-4 text-xs">
          <strong className="text-ink">Example:</strong> 7 years and 6 completed months produces a
          service multiplier of 7.5. At $1,000 regular weekly wages, the ESA severance calculation
          is $7,500, assuming the employee meets the eligibility tests and no exception applies.
        </div>
      </section>

      <section>
        <h2>ESA minimums are not a common-law estimate</h2>
        <p>
          Ontario's ESA establishes minimum rights. A valid employment contract may limit an
          employee to compliant minimums, while an unenforceable or silent termination clause can
          leave room for greater contractual or common-law notice. Common-law assessment can involve
          the role, age, service, compensation, availability of similar work, contract wording and
          other facts.
        </p>
        <p>
          Do not multiply years of service by a fixed “one month per year” rule. That is not the ESA
          schedule and is not a reliable common-law formula. Obtain Ontario legal advice before
          signing a release where the difference could be significant.
        </p>
      </section>

      <section>
        <h2>Documents to check before accepting payment</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>the employment contract and every later amendment;</li>
          <li>the written termination letter and effective date;</li>
          <li>working-notice and pay-in-lieu calculations;</li>
          <li>the employer's global payroll or closure facts if ESA severance is disputed;</li>
          <li>regular weekly wages and completed months used in the severance formula;</li>
          <li>vacation pay, commissions, benefits continuation and other final amounts; and</li>
          <li>the wording and deadline of any release.</li>
        </ul>
      </section>
    </GuideArticleLayout>
  );
}
