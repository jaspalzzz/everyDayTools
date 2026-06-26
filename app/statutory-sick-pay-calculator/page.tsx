import { ToolLayout } from "@/components/ToolLayout";
import { SickPayCalculator } from "@/components/calculators/SickPayCalculator";
import { SSP_SOURCE } from "@/lib/calculators/sickPay";
import { getTool } from "@/data/tools";
import { UK_SSP } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("statutory-sick-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

const faqs: FaqItem[] = [
  {
    question: "How much is Statutory Sick Pay?",
    answer:
      "SSP is £123.25 a week for the 2026/27 tax year (or 80% of your normal weekly earnings if that is lower), paid for up to 28 weeks. It is paid for the qualifying days you normally work, divided into a daily rate, once your unpaid waiting days have passed.",
  },
  {
    question: "What are SSP waiting days?",
    answer:
      "The first 3 qualifying days of any period of sickness are unpaid 'waiting days'. SSP is only payable from the 4th qualifying day you are off sick. If days off are linked within 8 weeks, the waiting days may not apply again.",
  },
  {
    question: "Do I qualify for SSP?",
    answer:
      "You normally qualify if you are classed as an employee, have been off sick for at least 4 days in a row (including non-working days), and earn at least £129 a week on average before tax.",
  },
  {
    question: "How is the SSP daily rate worked out?",
    answer:
      "Divide the effective weekly rate by the number of days you normally work that week. For someone working 5 days a week, £123.25 ÷ 5 is £24.65 a day. If your earnings are low, the 80%-of-earnings cap may apply instead — the calculator handles both cases.",
  },
  {
    question: "How long can SSP be paid for?",
    answer:
      "SSP can be paid for a maximum of 28 weeks for any single period of sickness or linked periods. After that, your employer should provide form SSP1 so you can claim other benefits if needed.",
  },
  {
    question: "Is SSP taxed?",
    answer:
      "Yes. SSP is treated as earnings and is subject to income tax and National Insurance. The figure here is a gross estimate before any deductions.",
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
        calculator={<SickPayCalculator />}
        source={SSP_SOURCE}
        verifiedDate={UK_SSP.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How Statutory Sick Pay works</h2>
            <p>
              Statutory Sick Pay is the minimum your employer must pay when you are too ill to work,
              provided you meet the qualifying conditions. It is set as a flat{" "}
              <strong>weekly rate</strong> — £123.25 for the 2026/27 tax year, or 80% of your
              normal weekly earnings if that is lower — and paid for the days you would normally have
              worked, so the practical amount depends on your working pattern. This calculator
              converts the effective weekly rate into your daily rate and applies it to the days you
              have been off.
            </p>
            <p>
              The part people most often miss is the <strong>three waiting days</strong>. The first
              three qualifying days of a sickness absence are unpaid, and SSP only starts from the
              fourth day you are off. Where separate absences are linked — within eight weeks of each
              other — the waiting days may not apply a second time. SSP can run for up to 28 weeks
              for a single or linked period of sickness, after which your employer should issue form
              SSP1 so you can look at other support.
            </p>
            <p>
              To qualify you generally need to be an employee, be off for at least four days in a
              row, and earn at least £129 a week on average. The figure shown is gross and is taxed
              like normal pay. Download the PDF summary to keep a clear record of how your sick pay
              was calculated.
            </p>
          </>
        }
      />
    </>
  );
}
