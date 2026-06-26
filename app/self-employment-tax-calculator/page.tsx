import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { SelfEmploymentTaxCalculator } from "@/components/calculators/SelfEmploymentTaxCalculator";
import { SE_TAX_SOURCE_UK } from "@/lib/calculators/selfEmploymentTax";
import { getTool } from "@/data/tools";
import { UK_NI_SELF_EMPLOYED } from "@/lib/rates";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("self-employment-tax-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "What is self-employment tax in the US?",
    answer:
      "Self-employment (SE) tax covers both the employer and employee shares of Social Security (12.4%) and Medicare (2.9%), totalling 15.3%. As a self-employed person you pay both halves. However, you can deduct half the SE tax from your income before calculating federal income tax, which reduces the effective cost.",
  },
  {
    question: "What National Insurance do self-employed people pay in the UK?",
    answer:
      "Self-employed workers pay Class 2 NI (a flat £3.50/week if profits exceed £12,570) and Class 4 NI (9% on profits between £12,570 and £50,270, then 2% above). This is lower than the combined employee + employer Class 1 NI, which is one reason contracting can be more tax-efficient.",
  },
  {
    question: "What counts as net profit for this calculation?",
    answer:
      "Net profit is your total income minus allowable business expenses — things like equipment, software subscriptions, professional fees, and a proportion of home-office costs. In the UK this is your self-assessment profit figure. In the US it is Schedule C net profit. Enter the figure after deducting your costs but before paying tax.",
  },
  {
    question: "Do I need to make quarterly tax payments?",
    answer:
      "In the US, self-employed workers generally must pay estimated taxes quarterly (April, June, September, January) if they expect to owe $1,000 or more. In the UK, self-assessment tax is paid in two instalments (January and July) plus a balancing payment. This calculator estimates your annual liability — divide by four for a rough quarterly amount.",
  },
  {
    question: "How does the UK personal allowance affect self-employed tax?",
    answer:
      "Self-employed income uses the same personal allowance (£12,570 in 2026/27) and income tax bands as employees. You pay 20% on taxable profits up to £50,270, 40% up to £125,140, and 45% above that. The allowance tapers above £100,000.",
  },
  {
    question: "Why is my effective rate lower than the headline rate?",
    answer:
      "The effective rate is your total tax as a percentage of gross profit. It is lower than your marginal rate because lower portions of your income are taxed at lower rates. For example, a self-employed person earning £60,000 pays 20% on the first taxable slice and 40% only on the portion above £50,270 — so the effective rate sits well below 40%.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))}
      />
      <ToolLayout
        tool={tool}
        calculator={<SelfEmploymentTaxCalculator />}
        source={SE_TAX_SOURCE_UK}
        verifiedDate={UK_NI_SELF_EMPLOYED.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How self-employment tax is calculated</h2>
            <p>
              When you work for yourself — as a freelancer, sole trader, or contractor — you are
              responsible for paying your own tax and social insurance contributions. There is no
              employer to withhold PAYE or run payroll on your behalf; the full bill lands at
              year-end, which is why estimating it early matters.
            </p>
            <p>
              In the <strong>UK</strong>, self-employed people pay income tax on profits using the
              same bands as employees (20%, 40%, 45%) and the same personal allowance (£12,570 in
              2026/27). On top of that they pay <strong>Class 2 National Insurance</strong> (a flat
              £3.50/week) and <strong>Class 4 NI</strong> (9% on profits between £12,570 and
              £50,270, then 2%). The total NI burden is lower than the combined employee + employer
              Class 1 rate, which is part of why outside-IR35 contracting can be more tax-efficient.
            </p>
            <p>
              In the <strong>US</strong>, self-employed workers pay{" "}
              <strong>self-employment (SE) tax</strong> of 15.3% — covering both the employer and
              employee shares of Social Security (12.4%) and Medicare (2.9%). SE tax is calculated
              on 92.35% of net profit. You can deduct half the SE tax before applying income tax,
              which partially offsets the cost. Federal income tax then applies to adjusted gross
              income using the standard deduction and 2026 brackets.
            </p>
            <p>
              Enter your net profit (income minus allowable expenses) to see your estimated
              take-home and effective rate.
            </p>
          </>
        }
      />
    </>
  );
}
