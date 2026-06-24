import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { OvertimeCalculator } from "@/components/calculators/OvertimeCalculator";
import { OVERTIME_SOURCE } from "@/lib/calculators/takeHome";
import { getTool } from "@/data/tools";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("take-home-overtime-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "How is overtime pay calculated?",
    answer:
      "Overtime pay is your regular hourly rate multiplied by an overtime rate — under the US FLSA, at least 1.5× for hours worked over 40 in a workweek. This calculator adds your regular pay and overtime pay to give your gross weekly total.",
  },
  {
    question: "Who is entitled to overtime pay in the US?",
    answer:
      "Non-exempt employees covered by the Fair Labor Standards Act must receive overtime at 1.5× their regular rate for hours over 40 per week. Exempt employees — typically certain salaried roles — are not entitled to FLSA overtime.",
  },
  {
    question: "Is overtime taxed more than regular pay?",
    answer:
      "No. Overtime is taxed at the same rates as your other income. It can feel higher because the extra earnings may fall into a higher withholding bracket for that pay period, but the underlying tax rate is the same.",
  },
  {
    question: "Does overtime law differ outside the US?",
    answer:
      "Yes. Many countries set overtime rules through contracts or collective agreements rather than a fixed legal multiplier. Always check your contract for the overtime rate that applies to you.",
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
        calculator={<OvertimeCalculator />}
        source={OVERTIME_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>Working out your overtime pay</h2>
            <p>
              Overtime pay rewards the hours you work beyond your normal schedule. In the United
              States, the Fair Labor Standards Act requires that non-exempt employees be paid at
              least one and a half times their regular rate for any hours over 40 in a workweek.
              This calculator separates your regular pay from your overtime pay so you can see
              exactly how each part contributes to your gross weekly total.
            </p>
            <p>
              Enter your hourly rate, your regular hours, and your overtime hours, then set the
              overtime multiplier — 1.5 is the US standard, but some contracts pay double time, and
              rules vary by country. The result updates instantly as you type, so you can model
              different weeks without reloading.
            </p>
            <p>
              The figure shown is gross pay, before tax and deductions. Use the PDF summary to keep
              a clear record of how your overtime was calculated.
            </p>
          </>
        }
      />
    </>
  );
}
