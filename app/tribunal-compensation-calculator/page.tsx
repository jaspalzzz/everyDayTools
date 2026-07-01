import { ToolLayout, type LearnMoreMeta } from "@/components/ToolLayout";
import { TribunalCalculator } from "@/components/calculators/TribunalCalculator";
import { TRIBUNAL_SOURCE } from "@/lib/calculators/tribunalCompensation";
import { getTool } from "@/data/tools";
import { UK_TRIBUNAL } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("tribunal-compensation-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, seoTitle: tool.seoTitle, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How is Employment Tribunal compensation calculated?",
    answer:
      "Unfair dismissal compensation has two parts. The basic award uses the same formula as statutory redundancy pay: years of service (up to 20) × weekly pay (capped at £751 for 2026/27) × an age multiplier. The compensatory award covers your actual financial loss — primarily your lost earnings from dismissal until you find equivalent work, capped at the lower of 52 weeks' gross pay or £123,543. Discrimination and whistleblowing claims have no cap on the compensatory element.",
  },
  {
    question: "What is the ACAS uplift?",
    answer:
      "If an employer fails to follow the ACAS Code of Practice on Disciplinary and Grievance Procedures, the Tribunal can increase the compensatory award by up to 25%. This uplift is discretionary — the Tribunal must find the breach was unreasonable in all the circumstances. Common grounds include: no written warning before dismissal, failure to allow the employee to be accompanied at a hearing, or refusing a right of appeal.",
  },
  {
    question: "What are Vento bands in discrimination claims?",
    answer:
      "Vento bands are the ranges used for injury to feelings awards in discrimination claims (named after the Court of Appeal case Vento v Chief Constable of West Yorkshire Police). The lower band (£1,300–£12,600 for 2026/27) covers less serious one-off acts. The middle band (£12,600–£37,700) covers serious cases. The upper band (£37,700–£62,900) is reserved for the most serious cases — sustained campaigns, deliberate discrimination, or repeated harassment. The bands are reviewed annually by the Employment Tribunal President.",
  },
  {
    question: "What is contributory fault?",
    answer:
      "If the Tribunal finds that the claimant's own conduct contributed to the dismissal, it will reduce the compensatory and basic awards by a percentage it considers just and equitable. This is called a 'contributory fault' or 'Polkey' reduction. For example, if an employee was genuinely guilty of some misconduct but the dismissal process was still unfair, the Tribunal might award 75% of normal compensation — a 25% reduction for the claimant's share of responsibility.",
  },
  {
    question: "Is Employment Tribunal compensation taxable?",
    answer:
      "The basic award is treated as a termination payment and falls within the £30,000 tax-free threshold. The compensatory award for lost earnings is generally taxable as it replaces earnings that would have been taxed. Injury to feelings awards for discrimination are not subject to income tax. Where the total award exceeds £30,000, the employer must deduct tax on the excess before paying.",
  },
  {
    question: "How long does an Employment Tribunal take?",
    answer:
      "Simple unfair dismissal claims typically take 6–18 months from claim to final hearing. Discrimination claims are more complex and can take 18 months to 3 years, particularly in multi-day cases. The time limit to start a claim is 3 months less one day from the effective date of termination (paused during ACAS early conciliation). Missing the time limit almost always means losing the right to claim.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(tool.name, url))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webApplicationSchema({ name: tool.name, description: tool.description, url, region: tool.region }))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <ToolLayout
        tool={tool}
        calculator={<TribunalCalculator />}
        source={TRIBUNAL_SOURCE}
        verifiedDate={UK_TRIBUNAL.effectiveDate}
        faqs={faqs}
        learnMore={{
          faqs: [
            { slug: "how-much-can-i-get-employment-tribunal-uk", question: "How much can I get from Employment Tribunal?" },
            { slug: "what-are-vento-bands-uk", question: "What are Vento bands?" },
            { slug: "what-is-acas-early-conciliation", question: "What is ACAS early conciliation?" },
          ],
        }}
        contentBlock={
          <>
            <h2>How Employment Tribunal compensation works</h2>
            <p>
              Employment Tribunal compensation for unfair dismissal comes in two parts. The{" "}
              <strong>basic award</strong> is calculated on the same formula as statutory redundancy
              pay — years of service, weekly pay capped at £751, and an age multiplier — and is
              awarded regardless of financial loss. It compensates for the loss of the job itself,
              not the loss of earnings.
            </p>
            <p>
              The <strong>compensatory award</strong> is the larger element for most claimants. It
              covers your actual financial loss from the date of dismissal to the Tribunal hearing
              (and sometimes beyond), primarily your lost salary while you were out of work. The
              Tribunal expects you to mitigate your loss — actively looking for work — and will not
              compensate for periods of avoidable unemployment. For unfair dismissal, the
              compensatory award is capped at the lower of 52 weeks&apos; gross pay or{" "}
              <strong>£{UK_TRIBUNAL.compensatoryAwardCap.toLocaleString()}</strong> for 2026/27.
              Discrimination and whistleblowing claims are uncapped.
            </p>
            <p>
              Two adjustments can significantly change the final figure. The{" "}
              <strong>ACAS uplift</strong> (up to 25%) rewards claimants where employers failed to
              follow a fair process. <strong>Contributory fault</strong> reductions (up to 100%)
              punish claimants whose own conduct contributed to the dismissal. In practice, Tribunals
              frequently apply both in the same case.
            </p>
            <p>
              <strong>Discrimination claims</strong> carry additional compensation: injury to
              feelings (Vento bands), aggravated damages where the employer behaved particularly
              badly, and personal injury for psychiatric harm caused by the discrimination. These
              are assessed separately from financial loss and are uncapped.
            </p>
          </>
        }
      />
    </>
  );
}
