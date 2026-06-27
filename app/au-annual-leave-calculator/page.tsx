import { ToolLayout } from "@/components/ToolLayout";
import { AuAnnualLeaveCalculator } from "@/components/calculators/AuAnnualLeaveCalculator";
import { AU_ANNUAL_LEAVE_SOURCE } from "@/lib/calculators/auAnnualLeave";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("au-annual-leave-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: "Australia Annual Leave Calculator — NES Entitlement 2025", description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How much annual leave am I entitled to in Australia?",
    answer:
      "Under the National Employment Standards (NES) in the Fair Work Act 2009 (s.87), full-time employees are entitled to 4 weeks of paid annual leave per year. Eligible shift workers are entitled to 5 weeks. Leave accrues progressively throughout the year based on ordinary hours worked — not as a lump sum at the start of the year.",
  },
  {
    question: "What is annual leave loading and does everyone get it?",
    answer:
      "Annual leave loading is an additional 17.5% payment on top of your ordinary pay when you take annual leave. It applies only to employees covered by a modern award or enterprise agreement that provides for it — not all employees receive it. Check your modern award (via the Fair Work Ombudsman website) or your enterprise agreement to see if it applies to you.",
  },
  {
    question: "What happens to my annual leave when I leave a job?",
    answer:
      "When your employment ends — for any reason, including resignation, redundancy, or termination — your employer must pay out all accrued but untaken annual leave at your base rate of pay. Leave loading may also apply to the payout depending on your award or agreement. This payment is treated as ordinary income and is fully taxable.",
  },
  {
    question: "Can my employer make me take annual leave?",
    answer:
      "Yes, in certain circumstances. An employer can direct an employee to take annual leave if the direction is reasonable — for example, during a business shutdown over the Christmas/New Year period. Your modern award or enterprise agreement may also set rules about when leave can or must be taken. Employers cannot cash out more than 2 weeks of leave per year without written agreement.",
  },
  {
    question: "Do casual employees get annual leave?",
    answer:
      "No. Casual employees do not accrue annual leave under the NES. Instead, they receive a casual loading (typically 25% on top of the ordinary rate), which is intended to compensate for the absence of entitlements like annual leave and sick leave. If your employer has wrongly classified you as casual when you are in fact a regular employee, you may have a back-pay claim for unpaid leave.",
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
        calculator={<AuAnnualLeaveCalculator />}
        source={AU_ANNUAL_LEAVE_SOURCE}
        verifiedDate="2025-07-01"
        faqs={faqs}
        contentBlock={
          <>
            <h2>How annual leave accrues under the NES</h2>
            <p>
              Annual leave under the <strong>Fair Work Act 2009 (Cth) s.87</strong> accrues
              progressively throughout the year based on ordinary hours worked. For a standard
              38-hour full-time employee entitled to 4 weeks (152 hours) per year, this equals
              approximately <strong>2.923 hours of leave per week</strong> worked. There is no
              qualifying period — accrual begins from the first day of employment.
            </p>
            <h2>Shift worker entitlement: 5 weeks</h2>
            <p>
              Employees who are "shift workers" as defined by their modern award or enterprise
              agreement — typically those rostered across all seven days of the week on rotating
              shifts — are entitled to 5 weeks of annual leave per year instead of 4. The extra
              week recognises the impact of shift work on work-life balance.
            </p>
            <h2>Annual leave loading (17.5%)</h2>
            <p>
              Leave loading is an additional payment of 17.5% of ordinary pay while on annual leave.
              It does not apply to all workers — check your modern award (most in retail, hospitality,
              manufacturing, and clerical sectors include it) or enterprise agreement. If neither
              applies, check your employment contract.
            </p>
          </>
        }
      />
    </>
  );
}
