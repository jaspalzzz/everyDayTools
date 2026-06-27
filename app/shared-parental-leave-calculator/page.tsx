import { ToolLayout } from "@/components/ToolLayout";
import { SharedParentalPayCalculator } from "@/components/calculators/SharedParentalPayCalculator";
import { SHARED_PARENTAL_SOURCE } from "@/lib/calculators/sharedParentalPay";
import { getTool } from "@/data/tools";
import { UK_SHPP } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("shared-parental-leave-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How much is Statutory Shared Parental Pay?",
    answer:
      "ShPP is paid at the lower of the statutory weekly rate (£194.32 for 2026/27) or 90% of average weekly earnings. Each parent's ShPP is calculated individually against their own AWE.",
  },
  {
    question: "How many weeks of Shared Parental Pay are available?",
    answer:
      "Up to 37 paid weeks can be shared, depending on how many weeks of Statutory Maternity Pay or Adoption Pay the primary parent gives up. Each week curtailed creates one week of ShPP. The total paid weeks across both parents cannot exceed the weeks surrendered.",
  },
  {
    question: "Is Shared Parental Pay taxed?",
    answer:
      "Yes. Statutory Shared Parental Pay is treated as earnings and is subject to income tax and National Insurance deductions through payroll in the usual way.",
  },
  {
    question: "Can both parents take ShPP at the same time?",
    answer:
      "Yes. Both parents can take Shared Parental Leave simultaneously and each receive ShPP at their own individual rate — provided both have weeks allocated and both meet the eligibility conditions. Taking leave at the same time uses up both parents' allocation in parallel.",
  },
  {
    question: "How do I give notice for Shared Parental Leave?",
    answer:
      "You must give your employer at least 8 weeks' notice before each block of Shared Parental Leave. You can submit up to three separate notices (booking requests), each covering one continuous block. Your employer cannot refuse a continuous block, but can refuse to agree a discontinuous (broken) pattern.",
  },
  {
    question: "What is the difference between Shared Parental Leave and Paternity Leave?",
    answer:
      "Paternity Leave is fixed at 1 or 2 consecutive weeks taken shortly after birth. Shared Parental Leave is more flexible — up to 50 weeks of leave (37 paid) that can be split into multiple blocks and taken any time in the first year. You can take both, but SPL must be booked separately and starts only after the mother or adopter has curtailed their own leave.",
  },
];

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
        calculator={<SharedParentalPayCalculator />}
        source={SHARED_PARENTAL_SOURCE}
        verifiedDate={UK_SHPP.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How Statutory Shared Parental Pay is calculated</h2>
            <p>
              Shared Parental Leave (SPL) lets eligible parents split up to 50 weeks of leave and
              up to 37 weeks of pay between them after a birth or adoption. Statutory Shared
              Parental Pay (ShPP) is paid at the lower of the statutory weekly rate (£
              {UK_SHPP.weeklyRate} for {UK_SHPP.taxYear}) or 90% of the claimant&apos;s average
              weekly earnings (AWE). Each parent&apos;s ShPP is assessed individually against their
              own AWE — so if both parents take leave at the same time, each receives their own rate
              concurrently, using both parents&apos; allocation simultaneously.
            </p>
            <p>
              The 37 paid weeks are created by the mother or primary adopter curtailing their
              Statutory Maternity Pay (SMP) or Statutory Adoption Pay (SAP) before the end of the
              39-week entitlement. For every week of SMP or SAP that is given up early, one week of
              ShPP becomes available in the shared pot. The parents can split those weeks however
              they choose — one parent could take all 37 weeks, or they could divide them in any
              combination. The total paid weeks across both parents cannot exceed the weeks
              surrendered from the original SMP or SAP entitlement.
            </p>
            <h2>Eligibility conditions for ShPP</h2>
            <p>
              Each parent who wants to claim ShPP must individually satisfy two sets of conditions.
              The <strong>employment and earnings test</strong> requires: 26 weeks&apos; continuous
              employment with the same employer by the end of the 15th week before the expected week
              of childbirth (or the matching week for adoption), and average weekly earnings of at
              least £{UK_SHPP.lowerEarningsLimit} ({UK_SHPP.taxYear}) in the eight weeks before
              that qualifying point. The <strong>other-parent test</strong> requires the partner to
              have worked for at least 26 weeks in the 66 weeks before the due date and earned at
              least £30 a week on average in 13 of those 66 weeks. Both sets of conditions must be
              met before ShPP can be paid to the claiming parent.
            </p>
            <h2>Booking Shared Parental Leave</h2>
            <p>
              Each parent can submit up to three separate booking notices, each covering one
              continuous block of leave. You must give your employer at least 8 weeks&apos; written
              notice before each block. Employers cannot refuse a continuous block, but they can
              decline a request for discontinuous (broken-up) leave and offer a continuous
              alternative instead. If the employer declines a discontinuous request and no agreement
              is reached within two weeks, you can withdraw the notice or convert it to a continuous
              block starting on the original first day.
            </p>
            <h2>How ShPP is paid and employer reclaim</h2>
            <p>
              ShPP is paid through your normal payroll and is subject to income tax and National
              Insurance in the usual way. Employers can reclaim most of the statutory amount from
              HMRC — 92% for standard employers, or 103% for small employers under Small Employers
              Relief (those whose annual Class 1 NI liability was £45,000 or less). Some employers
              offer enhanced shared parental pay, often matching their enhanced maternity pay policy.
              Check your staff handbook or ask HR before planning your leave, as enhanced pay
              typically comes with return-to-work conditions. Use this calculator to establish the
              statutory minimum before negotiating or accepting your leave plan.
            </p>
          </>
        }
      />
    </>
  );
}
