import { ToolLayout } from "@/components/ToolLayout";
import { TakeHomePayCalculator } from "@/components/calculators/TakeHomePayCalculator";
import { TAKE_HOME_SOURCE_UK } from "@/lib/calculators/takeHomePay";
import { getTool } from "@/data/tools";
import { UK_INCOME_TAX } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("take-home-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How is take-home pay calculated in the UK?",
    answer:
      "Your employer deducts income tax and National Insurance (Class 1) from your gross salary before paying you. Income tax is calculated on your taxable income (gross minus the £12,570 personal allowance) using the basic rate (20%), higher rate (40%), and additional rate (45%) bands. National Insurance is charged at 8% on earnings between £12,570 and £50,270, and 2% above that. The result is your net, or take-home, pay.",
  },
  {
    question: "How is take-home pay calculated in the US?",
    answer:
      "Federal income tax is applied to your adjusted gross income (gross minus the standard deduction) using seven progressive brackets ranging from 10% to 37%. You also pay FICA: Social Security at 6.2% up to the wage base ($176,100 in 2026) and Medicare at 1.45% on all wages. This estimate does not include state income tax, which varies significantly by state.",
  },
  {
    question: "What is the personal allowance in the UK?",
    answer:
      "For 2026/27 the personal allowance is £12,570 — the amount you can earn before paying income tax. If your gross income exceeds £100,000, the personal allowance is reduced by £1 for every £2 earned above that threshold, reaching zero at £125,140.",
  },
  {
    question: "Does this include state tax for US calculations?",
    answer:
      "No. This calculator covers federal income tax and FICA (Social Security and Medicare) only. State income tax rates range from 0% (Florida, Texas, and others) to over 13% (California). Add your state's effective rate to get a more complete picture.",
  },
  {
    question: "What is the effective tax rate?",
    answer:
      "The effective tax rate is the percentage of your total gross income paid in taxes. It is always lower than your marginal rate (the rate on your last pound or dollar) because lower income bands are taxed at lower rates. For example, a UK earner on £50,000 pays an effective rate of around 28% even though their marginal income tax rate is 40%.",
  },
  {
    question: "Why does my actual take-home differ from this estimate?",
    answer:
      "This calculator uses standard settings: the default personal allowance (UK) or standard deduction (US), no pension contributions, no benefits-in-kind, and no pre-tax deductions. Salary sacrifice, student loan repayments, pension auto-enrolment, and other adjustments all affect your actual pay. Use this figure as a baseline and compare against your payslip.",
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
        calculator={<TakeHomePayCalculator />}
        source={TAKE_HOME_SOURCE_UK}
        verifiedDate={UK_INCOME_TAX.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How this take-home pay calculator works</h2>
            <p>
              Your gross salary is what your employer agrees to pay you. Your take-home pay —
              sometimes called net pay — is what actually lands in your bank account after{" "}
              <strong>income tax</strong> and <strong>social insurance contributions</strong> are
              deducted. This calculator works out that deduction for the UK and US using the
              current year&apos;s statutory rates.
            </p>
            <p>
              For <strong>UK workers</strong>, the calculator applies the 2026/27 income tax
              bands (20% basic, 40% higher, 45% additional) and Class 1 National Insurance (8%
              between £12,570 and £50,270; 2% above). It uses the standard personal allowance of
              £12,570, which tapers above £100,000. Scottish income tax rates differ from the
              rest of the UK and are not covered here.
            </p>
            <p>
              For <strong>US workers</strong>, the calculator applies 2026 federal income tax
              brackets for a single filer using the standard deduction ($16,100), plus FICA
              contributions: Social Security (6.2% up to $176,100) and Medicare (1.45% on all
              wages). State income tax is not included — it varies from 0% to over 13% depending
              on where you live.
            </p>
            <p>
              Both calculations are estimates. They assume a standard tax code or filing status
              with no additional deductions, pension contributions, or benefits. Your payslip will
              reflect your actual circumstances.
            </p>
          </>
        }
      />
    </>
  );
}
