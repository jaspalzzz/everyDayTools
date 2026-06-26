import { ToolLayout } from "@/components/ToolLayout";
import { BonusTaxCalculator } from "@/components/calculators/BonusTaxCalculator";
import { BONUS_TAX_SOURCE } from "@/lib/calculators/bonusTax";
import { getTool } from "@/data/tools";
import { US_BONUS } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("bonus-tax-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How much tax will I pay on my bonus?",
    answer:
      "In the US, employers commonly withhold a flat 22% federal rate on bonuses (the supplemental wage rate), with Social Security, Medicare and any state tax on top. This tool estimates your take-home from the deduction rate you enter.",
  },
  {
    question: "Why is so much taken out of my bonus?",
    answer:
      "Bonuses are treated as supplemental wages and are often withheld at a flat rate that may be higher than your usual paycheck withholding. It can look like the bonus is 'taxed more', but it is withholding — your real tax is settled when you file.",
  },
  {
    question: "Is a bonus taxed at a higher rate?",
    answer:
      "Not in terms of your actual tax rate. The 22% US figure is a withholding rate, not your final tax rate. If too much was withheld, you get it back as a refund; if too little, you owe the difference at filing.",
  },
  {
    question: "What is the 22% bonus tax rate?",
    answer:
      "It is the IRS flat federal withholding rate for supplemental wages such as bonuses, up to $1 million. Above $1 million, the excess is withheld at the top federal rate. This is the default in the calculator for the US.",
  },
  {
    question: "How do I estimate my take-home bonus in other countries?",
    answer:
      "Outside the US, bonuses are usually taxed at your marginal income-tax rate plus social contributions. Enter your combined effective deduction percentage to estimate the net amount.",
  },
  {
    question: "Will my bonus push me into a higher tax bracket?",
    answer:
      "Only the portion of income above a bracket threshold is taxed at the higher rate — not your whole income. A bonus can increase withholding for that period, but it does not retroactively raise the tax on your other earnings.",
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
        calculator={<BonusTaxCalculator />}
        source={BONUS_TAX_SOURCE}
        verifiedDate={US_BONUS.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How your bonus is taxed</h2>
            <p>
              A bonus almost never lands in your account at full value, and the reason is{" "}
              <strong>withholding</strong>. In the United States, bonuses count as supplemental
              wages, and employers commonly withhold a flat 22% for federal tax — separate from how
              your regular paycheck is taxed. On top of that come Social Security and Medicare (FICA)
              and any state income tax. This calculator lets you set a single combined deduction rate
              and shows what actually reaches you.
            </p>
            <p>
              The key thing to understand is that withholding is not the same as your final tax
              bill. The 22% is a flat rate the employer applies up front; your true liability depends
              on your total income for the year and is reconciled when you file your return. If too
              much was held back, the excess comes back as a refund. Outside the US the mechanics
              differ — a bonus is usually taxed at your marginal rate plus social contributions — so
              you can enter your own effective percentage to model it.
            </p>
            <p>
              Treat the result as a planning estimate rather than an exact net figure, since
              real-world deductions depend on your full circumstances. Download the PDF summary to
              keep a record of the estimate when budgeting around a bonus.
            </p>
          </>
        }
      />
    </>
  );
}
