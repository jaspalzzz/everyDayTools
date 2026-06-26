import { ToolLayout } from "@/components/ToolLayout";
import { AdoptionPayCalculator } from "@/components/calculators/AdoptionPayCalculator";
import { ADOPTION_SOURCE } from "@/lib/calculators/adoptionPay";
import { getTool } from "@/data/tools";
import { UK_SAP } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("adoption-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

const faqs: FaqItem[] = [
  {
    question: "How much is Statutory Adoption Pay?",
    answer:
      "SAP is paid for up to 39 weeks: 90% of average weekly earnings for 6 weeks, then the lower of £194.32 a week or 90% of earnings for 33 weeks.",
  },
  {
    question: "Do I qualify for Statutory Adoption Pay?",
    answer:
      "You normally need 26 weeks' continuous employment by the week you are matched with a child, average weekly earnings of at least £129, and the right notice and evidence.",
  },
  {
    question: "Is adoption pay taxed?",
    answer:
      "Yes. Statutory Adoption Pay is paid through payroll and is subject to income tax and National Insurance.",
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
        calculator={<AdoptionPayCalculator />}
        source={ADOPTION_SOURCE}
        verifiedDate={UK_SAP.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How Statutory Adoption Pay is calculated</h2>
            <p>
              Statutory Adoption Pay follows the same payment shape as Statutory Maternity Pay. For
              the first six weeks, the statutory amount is 90% of your average weekly earnings. For
              the remaining 33 weeks, the weekly amount is capped at the lower of the statutory rate
              or 90% of your earnings.
            </p>
            <p>
              The earnings threshold is the Lower Earnings Limit. You also normally need continuous
              employment by the matching week and must provide the required notice and evidence to
              your employer. This calculator checks the earnings arithmetic and totals the statutory
              gross amount.
            </p>
            <p>
              Adoption policies can be enhanced by employers, so compare the statutory estimate with
              your contract or staff handbook before making financial plans.
            </p>
          </>
        }
      />
    </>
  );
}
