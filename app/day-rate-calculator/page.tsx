import { ToolLayout } from "@/components/ToolLayout";
import { DayRateCalculator } from "@/components/calculators/DayRateCalculator";
import { DAY_RATE_SOURCE } from "@/lib/calculators/dayRate";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("day-rate-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

const faqs: FaqItem[] = [
  {
    question: "How do I convert a day rate to an annual salary equivalent?",
    answer:
      "Multiply your day rate by your billable days per year. A typical UK contractor works around 220 billable days (52 weeks × 5 days, minus bank holidays, holiday, and downtime). A £500/day rate over 220 days gives £110,000 gross — but to compare fairly with an employee salary, you need to account for the extras employees receive that you must self-fund.",
  },
  {
    question: "Why is the equivalent employee salary lower than my day rate annualised?",
    answer:
      "As a contractor you must self-fund employer National Insurance contributions, pension, paid holiday, sick pay, and periods between contracts. The equivalent employee salary is therefore around 25–35% lower than the raw annualised day rate. A £500/day contractor earning £110,000 might be equivalent to an employee on £80,000–£85,000 when you factor in those costs.",
  },
  {
    question: "How many billable days should I use?",
    answer:
      "A safe starting point for UK contractors is 220 days: 260 working days in the year, minus 8 bank holidays and 20–25 days of holiday and between-contract gaps. US contractors often use 240–250 days as there are fewer public holidays. Reduce further if you expect significant downtime.",
  },
  {
    question: "What day rate do I need to match my current salary?",
    answer:
      "Use the 'Annual salary → Day rate' mode. The calculator adds a premium to cover the costs you must self-fund as a contractor: employer NI equivalent, pension, holiday pay, and non-billable time. A £60,000 employee salary roughly equates to a £350–£400/day contractor rate depending on your expenses and billable day assumption.",
  },
  {
    question: "Should I set up a limited company or go umbrella?",
    answer:
      "This calculator covers the financial comparison. The right structure depends on your IR35 status, the volume of work, and your accountant's advice. Umbrella companies are simpler but take a margin; limited companies offer more flexibility but more administration. Use the IR35 comparison tool to see the tax impact of each route.",
  },
  {
    question: "Does this include VAT?",
    answer:
      "No. Day rates are quoted exclusive of VAT. If you are VAT-registered and your client is not (or cannot reclaim VAT), your effective rate is higher. Most B2B contractor work involves VAT-registered clients who reclaim it, so VAT is typically neutral for both parties.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))}
      />
      <ToolLayout
        tool={tool}
        calculator={<DayRateCalculator />}
        source={DAY_RATE_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>Day rate to annual salary — why the conversion is not simple division</h2>
            <p>
              Converting a contractor day rate to an annual salary equivalent — or the other way
              around — is not as simple as multiplying by working days. Employees receive a package
              of benefits that contractors must self-fund: employer National Insurance contributions,
              auto-enrolment pension, paid annual leave, sick pay, and income during gaps between
              contracts. Ignoring these leads to contractors underpricing their services or employees
              overestimating what contracting would earn them.
            </p>
            <p>
              This calculator models both directions. <strong>Day rate to annual</strong> shows
              your gross contractor income and the equivalent employee salary after applying a
              premium uplift (~35% in the UK, ~25% in the US) that accounts for the costs you bear
              that an employer would otherwise cover. <strong>Annual salary to day rate</strong>
              works in reverse, giving you the floor rate you need to charge to match your current
              package.
            </p>
            <p>
              The <strong>billable days</strong> field is the most important variable. A UK
              contractor working 220 days earns very differently from one working 180 days — the
              latter must charge a proportionally higher day rate to achieve the same annual income.
              A realistic 220-day assumption accounts for bank holidays, your own holiday, and
              between-contract gaps.
            </p>
          </>
        }
      />
    </>
  );
}
