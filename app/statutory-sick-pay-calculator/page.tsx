import { ToolLayout } from "@/components/ToolLayout";
import { SickPayCalculator } from "@/components/calculators/SickPayCalculator";
import { SSP_SOURCE } from "@/lib/calculators/sickPay";
import { getTool } from "@/data/tools";
import { UK_SSP } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("statutory-sick-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How much is Statutory Sick Pay?",
    answer:
      "SSP is £123.25 a week for the 2026/27 tax year (or 80% of your normal weekly earnings if that is lower). It is paid from the first day you are ill, for up to 28 weeks, for the qualifying days you normally work.",
  },
  {
    question: "Do I qualify for SSP?",
    answer:
      "From 6 April 2026, you qualify if you are an employee, you have done some work for your employer, and you are ill for at least one full working day. The old Lower Earnings Limit (LEL) eligibility condition and the 3 unpaid waiting days are both abolished from that date.",
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
              From <strong>6 April 2026</strong>, the three unpaid waiting days are abolished — SSP
              is now payable from your first qualifying day of illness under the Employment Rights Act
              2025. Where separate absences are linked — within eight weeks of each other — they count
              as a single period of incapacity, so the 28-week maximum runs continuously across the
              linked absences. After 28 weeks your employer should issue form SSP1 so you can look at
              other support such as Employment and Support Allowance.
            </p>
            <p>
              To qualify from April 2026 you need to be an employee and have done at least one day's
              work for that employer — the old Lower Earnings Limit (£129/week) no longer applies. The
              figure shown is gross and is taxed like normal pay. Download the PDF summary to keep a
              clear record of how your sick pay was calculated.
            </p>
          </>
        }
      />
    </>
  );
}
