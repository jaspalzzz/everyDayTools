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
      "ShPP is paid at the lower of the statutory weekly rate (£194.32 for 2026/27) or 90% of average weekly earnings.",
  },
  {
    question: "How many weeks of Shared Parental Pay are available?",
    answer:
      "Up to 37 paid weeks can be shared, depending on how much maternity or adoption pay is ended early and how the parents split the leave.",
  },
  {
    question: "Is Shared Parental Pay taxed?",
    answer:
      "Yes. Statutory Shared Parental Pay is treated as earnings and can have income tax and National Insurance deducted.",
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
              {UK_SHPP.weeklyRate} for {UK_SHPP.taxYear}) or 90% of the claimant&apos;s average weekly
              earnings (AWE). Both parents can receive ShPP simultaneously if they take leave at the
              same time — each at their own rate.
            </p>
            <p>
              The 37 paid weeks are created by the mother or primary adopter ending their Statutory
              Maternity Pay or Statutory Adoption Pay early. For every week of SMP/SAP curtailed,
              one week of ShPP becomes available. The parents can then split those weeks however
              they choose, in up to three separate blocks each. The total paid weeks cannot exceed
              the number of SMP/SAP weeks that were given up.
            </p>
            <p>
              To claim ShPP, each parent must individually meet the earnings and employment
              conditions: 26 weeks&apos; continuous service with their employer by the end of the 15th
              week before the due date (or matching week for adoption) and average weekly earnings
              of at least £{UK_SHPP.lowerEarningsLimit} ({UK_SHPP.taxYear}). The other parent must
              also meet a separate employment and earnings test over the 66 weeks before the due
              date. Both conditions must be satisfied before ShPP can be paid.
            </p>
            <p>
              ShPP is paid through payroll and is subject to income tax and National Insurance.
              Employers can reclaim the statutory amount from HMRC. Some employers offer enhanced
              shared parental pay — often matching enhanced maternity pay — so check your staff
              handbook. Use this calculator to understand the statutory floor before agreeing a
              leave plan with your employer.
            </p>
          </>
        }
      />
    </>
  );
}
