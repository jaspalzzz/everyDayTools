import { ToolLayout } from "@/components/ToolLayout";
import { WorkingDaysCalculator } from "@/components/calculators/WorkingDaysCalculator";
import { WORKING_DAYS_SOURCE } from "@/lib/calculators/workingDays";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("working-days-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How do I count working days between two dates?",
    answer:
      "Count every day from the start to the end date, then remove Saturdays and Sundays. This calculator does it instantly and includes both the start and end dates in the total.",
  },
  {
    question: "Does this include the start and end date?",
    answer:
      "Yes. The count is inclusive of both ends — so if your start and end are the same weekday, that single day counts as one working day.",
  },
  {
    question: "Are bank holidays excluded?",
    answer:
      "No. Public and bank holidays vary by country and region, so they are not removed automatically. If holidays fall within your range, subtract them from the working-day total yourself.",
  },
  {
    question: "What counts as a working day?",
    answer:
      "Here a working day is Monday to Friday. Weekend days (Saturday and Sunday) are excluded. If your own working week is different, treat the result as a standard Mon–Fri count.",
  },
  {
    question: "Why do I need to count working days?",
    answer:
      "Working-day counts matter for notice periods, statutory deadlines, holiday booking and project planning, where weekends usually do not count toward the total.",
  },
  {
    question: "How many working days are in a year?",
    answer:
      "A typical year has about 260–262 weekday working days before public holidays. After removing bank holidays, most countries land somewhere around 250–253 working days.",
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
        calculator={<WorkingDaysCalculator />}
        source={WORKING_DAYS_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>Counting the working days between two dates</h2>
            <p>
              Plenty of everyday decisions hinge on working days rather than calendar days — when a
              notice period ends, how long a deadline really gives you, or how much leave a holiday
              actually uses. This calculator takes a start and end date and counts the{" "}
              <strong>Monday-to-Friday days</strong> between them, including both ends, so you get a
              clean figure without counting on your fingers across a calendar.
            </p>
            <p>
              The one thing it deliberately does not do is remove <strong>public holidays</strong>.
              Bank and national holidays differ by country, region and year, and quietly subtracting
              the wrong ones would make the answer less reliable, not more. So the tool gives you the
              accurate weekday count and leaves you to subtract any holidays that genuinely fall in
              your range — which you can look up for your location. Weekends are always excluded, and
              the count is inclusive, so a single weekday entered as both start and end returns one
              working day.
            </p>
            <p>
              For reference, a full year holds roughly 260 weekday working days before holidays, and
              about 250 once typical bank holidays are removed. Download the PDF summary to keep a
              record of a specific date range for a notice calculation or a leave request.
            </p>
          </>
        }
      />
    </>
  );
}
