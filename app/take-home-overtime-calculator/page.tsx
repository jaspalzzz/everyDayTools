import { ToolLayout } from "@/components/ToolLayout";
import { OvertimeCalculator } from "@/components/calculators/OvertimeCalculator";
import { OVERTIME_SOURCE } from "@/lib/calculators/overtime";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("take-home-overtime-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

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
  {
    question: "Do some states pay more than 1.5× for overtime?",
    answer:
      "Yes. A few states add daily overtime on top of the federal weekly rule. California, for example, pays 1.5× after 8 hours in a day and 2× (double time) after 12. You can model double time here by setting the multiplier to 2.",
  },
  {
    question: "Are salaried employees entitled to overtime?",
    answer:
      "It depends on whether they are exempt. A salary alone does not remove overtime rights — non-exempt salaried employees can still be owed overtime, while genuinely exempt roles that meet the FLSA salary and duties tests are not.",
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
              One thing to watch is how your workweek is defined. Under the FLSA, overtime is
              calculated per fixed seven-day workweek, not per pay period — so two busy weeks
              averaged together do not cancel out. A few states also add daily overtime, paying a
              premium once you pass a set number of hours in a single day regardless of the weekly
              total, which the multiplier field lets you reflect.
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
