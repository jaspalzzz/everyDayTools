import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { SharedParentalPayCalculator } from "@/components/calculators/SharedParentalPayCalculator";
import { SHARED_PARENTAL_SOURCE } from "@/lib/calculators/sharedParentalPay";
import { getTool } from "@/data/tools";
import { UK_SHPP } from "@/lib/rates";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("shared-parental-leave-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

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
        dangerouslySetInnerHTML={jsonLd(
          webApplicationSchema({ name: tool.name, description: tool.description, url }),
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
              Statutory Shared Parental Pay is paid at a flat statutory rate, unless 90% of your
              average weekly earnings is lower. The number of payable weeks depends on how much
              maternity or adoption pay has been ended early and how the parents divide the shared
              parental leave.
            </p>
            <p>
              The usual maximum is 37 paid weeks. This calculator multiplies your payable weeks by
              the weekly statutory amount and checks the Lower Earnings Limit. It does not decide
              whether both parents meet every employment and notice condition.
            </p>
            <p>
              Use the result as a gross statutory estimate, then check your employer&apos;s policy for
              enhanced shared parental pay or any internal notice rules.
            </p>
          </>
        }
      />
    </>
  );
}
