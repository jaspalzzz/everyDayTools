import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { SalaryToHourlyCalculator } from "@/components/calculators/SalaryToHourlyCalculator";
import { SALARY_HOURLY_SOURCE } from "@/lib/calculators/salaryToHourly";
import { getTool } from "@/data/tools";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("salary-to-hourly-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "How do I convert my salary to an hourly rate?",
    answer:
      "Divide your annual salary by the number of hours you work in a year. For a standard 40-hour week over 52 weeks that is 2,080 hours, so a £50,000 salary works out at about £24.04 an hour before tax.",
  },
  {
    question: "How many work hours are in a year?",
    answer:
      "Multiply your weekly hours by the weeks you work. A full-time 40-hour week over 52 weeks is 2,080 hours; 37.5 hours over 52 weeks is 1,950 hours. This calculator lets you set both figures to match your contract.",
  },
  {
    question: "Should I use 52 weeks or fewer?",
    answer:
      "Use 52 if you are paid for the whole year, including paid holiday. If you only want to count weeks you actually work, lower the weeks figure — your hourly rate will rise accordingly.",
  },
  {
    question: "Is the hourly rate before or after tax?",
    answer:
      "Before tax. The figures here are gross. Your take-home hourly rate will be lower once income tax, national insurance or payroll taxes and any pension contributions are deducted.",
  },
  {
    question: "How do I convert hourly pay back to a salary?",
    answer:
      "Multiply your hourly rate by your weekly hours, then by the weeks you work in a year. For example, £24 an hour × 40 hours × 52 weeks is an annual salary of £49,920.",
  },
  {
    question: "Does this work for part-time hours?",
    answer:
      "Yes. Enter your actual weekly hours and weeks worked. The hourly rate is the same whether you are full or part time — it only depends on pay divided by hours.",
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
        calculator={<SalaryToHourlyCalculator />}
        source={SALARY_HOURLY_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>Turning a salary into an hourly rate</h2>
            <p>
              Knowing your true hourly rate makes it far easier to compare job offers, price
              freelance work, or check that overtime and extra shifts are paying their way. The
              conversion itself is simple — your annual salary divided by the hours you work in a
              year — but the answer depends heavily on the assumptions you make about hours and
              weeks, which is exactly what this calculator lets you control.
            </p>
            <p>
              Start with your weekly hours. A full-time week is often 40 hours, but many contracts
              are 37.5 or 35 once unpaid breaks are excluded, and that difference noticeably changes
              the hourly figure. Then set the weeks per year: use 52 if your salary already includes
              paid holiday, or a lower number if you only want to count the weeks you are actually at
              work. The tool shows your equivalent monthly and weekly pay alongside the hourly rate,
              so you can sense-check the result from more than one angle.
            </p>
            <p>
              Remember the result is gross — before income tax, national insurance or payroll taxes,
              and pension. Your take-home hourly rate will be lower. Download the PDF summary to keep
              a clear record of how the figure was worked out for a negotiation or a quote.
            </p>
          </>
        }
      />
    </>
  );
}
