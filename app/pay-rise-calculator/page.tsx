import { ToolLayout } from "@/components/ToolLayout";
import { PayRiseCalculator } from "@/components/calculators/PayRiseCalculator";
import { PAY_RISE_SOURCE } from "@/lib/calculators/payRise";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("pay-rise-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

const faqs: FaqItem[] = [
  {
    question: "How do I calculate a pay rise percentage?",
    answer:
      "Multiply your current salary by the percentage and add it on. A 5% rise on £40,000 is £40,000 × 0.05 = £2,000, giving a new salary of £42,000. This tool does it instantly and also shows the monthly difference.",
  },
  {
    question: "How much extra per month is my pay rise?",
    answer:
      "Divide the annual increase by 12. A £2,000 annual rise is about £167 more a month before tax. Remember the take-home increase will be smaller once tax and other deductions are applied.",
  },
  {
    question: "Is a pay rise calculated before or after tax?",
    answer:
      "This calculator shows the gross figures — before tax. Your actual take-home increase will be lower because part of the rise is lost to income tax and other payroll deductions.",
  },
  {
    question: "What is a real-terms pay rise?",
    answer:
      "A real-terms rise is your increase after accounting for inflation. If prices rise 4% and your pay rises 3%, you have had a real-terms pay cut. Compare your percentage against the current inflation rate to judge it.",
  },
  {
    question: "What is a typical annual pay rise?",
    answer:
      "It varies by country, industry and year, but cost-of-living rises often track somewhere around inflation. Promotions and role changes can be larger. Enter different percentages here to compare offers or scenarios.",
  },
  {
    question: "How do I work out the percentage between two salaries?",
    answer:
      "Subtract your old salary from the new one, divide by the old salary, then multiply by 100. From £40,000 to £42,000 is (2,000 ÷ 40,000) × 100 = 5%.",
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
        calculator={<PayRiseCalculator />}
        source={PAY_RISE_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>Working out your pay rise</h2>
            <p>
              A pay rise is simple arithmetic, but it is easy to lose track of what a percentage
              actually means for your bank balance. This calculator takes your current salary and the
              percentage increase, and shows your <strong>new salary</strong> alongside the extra you
              will earn each year and each month — so a headline number like &quot;a 5% rise&quot;
              turns into a figure you can actually plan around.
            </p>
            <p>
              The most useful habit when judging a rise is to compare it against{" "}
              <strong>inflation</strong>. A 3% increase sounds positive, but if the cost of living is
              rising faster than that, your money buys less than it did before — a real-terms pay cut.
              Looking at the percentage next to the current inflation rate tells you whether you are
              genuinely better off or just keeping up. The same calculation works in reverse for
              comparing two job offers: enter each salary and see the gap in monthly terms.
            </p>
            <p>
              Keep in mind that every figure here is gross, before tax. Because part of any rise is
              taken in income tax and other deductions, your take-home increase will be smaller than
              the headline number. Download the PDF summary to keep a record of the figures for a
              salary review or an offer comparison.
            </p>
          </>
        }
      />
    </>
  );
}
