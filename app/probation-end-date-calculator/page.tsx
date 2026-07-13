import { ToolLayout } from "@/components/ToolLayout";
import { ProbationEndDateCalculator } from "@/components/calculators/ProbationEndDateCalculator";
import { PROBATION_END_SOURCE } from "@/lib/calculators/probationEndDate";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("probation-end-date-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How do I calculate when my probation period ends?",
    answer: "Add the contract's stated number of calendar months or weeks to the employment or probation start date. This calculator shows both the calendar anniversary and the preceding day, because contracts differ on whether they describe an inclusive final day or a review date.",
  },
  {
    question: "Is there a legal maximum probation period in the UK?",
    answer: "There is no single statutory maximum applying to every UK employment contract. Probation length is mainly contractual, although the term and any extension must still be applied lawfully and consistently.",
  },
  {
    question: "Can my employer extend probation?",
    answer: "An extension is safest where the contract expressly allows it and the employer communicates the decision before the original period expires. An extension cannot be used for discriminatory or retaliatory reasons. Ask for the reason, new end date and objectives in writing.",
  },
  {
    question: "Do I have employment rights during probation?",
    answer: "Yes. Probation does not remove rights including minimum wage, paid holiday, statutory sick pay where eligible, protection from discrimination, whistleblowing protection and automatically unfair dismissal protections.",
  },
  {
    question: "Does probation affect my continuous employment start date?",
    answer: "Normally no. Continuous employment usually starts on the first day of employment, so probation time counts towards service thresholds unless there is a legally effective break or a different employment relationship.",
  },
  {
    question: "What if my contract gives a specific probation end date?",
    answer: "Use the specific written date as the primary reference and compare it with this calculation. If the date conflicts with the stated duration, ask HR to clarify in writing which provision controls and whether a review or confirmation is required.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(tool.name, url))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webApplicationSchema({ name: tool.name, description: tool.description, url, region: tool.region }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <ToolLayout
        tool={tool}
        calculator={<ProbationEndDateCalculator />}
        source={PROBATION_END_SOURCE}
        verifiedDate="2026-07-13"
        faqs={faqs}
        contentBlock={
          <>
            <h2>Calculate the contract date, then check the wording</h2>
            <p>
              Probation periods are usually expressed as a number of weeks or calendar months from
              the employment start date. Enter the start and stated duration to calculate the
              anniversary date and the day immediately before it. Month calculations preserve the
              calendar day where possible; a period starting on the 31st uses the last valid day in
              a shorter target month.
            </p>
            <p>
              The calculated date does not replace the contract. Some clauses say probation lasts
              “for six months”, some specify a fixed end date, and others continue probation until
              written confirmation is issued. A well-drafted extension clause should explain who can
              extend the period, why, and when the employee must be told. If the employer announces
              an extension after the original date without a contractual power, ask for the legal and
              contractual basis in writing.
            </p>
            <p>
              Probation changes internal review arrangements; it does not switch employment law off.
              Holiday accrues from day one, contractual and statutory notice rules can apply, and
              discrimination, whistleblowing and automatically unfair dismissal protections are not
              dependent on completing probation. Save the contract, offer letter, objectives and
              review correspondence. The downloadable worksheet can help you record the date used in
              a discussion with HR, but obtain advice before relying on it in a dispute.
            </p>
          </>
        }
      />
    </>
  );
}
