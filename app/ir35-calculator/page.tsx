import { ToolLayout } from "@/components/ToolLayout";
import { ContractorComparisonCalculator } from "@/components/calculators/ContractorComparisonCalculator";
import { IR35_SOURCE } from "@/lib/calculators/ir35";
import { getTool } from "@/data/tools";
import { UK_INCOME_TAX } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("ir35-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "What is IR35?",
    answer:
      "IR35 (officially the 'off-payroll working rules') is UK legislation designed to ensure that contractors who work like employees pay broadly the same tax as employees. If HMRC or your client determines you are 'inside IR35', your income is treated as a deemed salary and taxed via PAYE, which significantly reduces your take-home pay compared to operating through a limited company outside IR35.",
  },
  {
    question: "How much less do I take home inside IR35?",
    answer:
      "It depends on your day rate and expenses, but the typical reduction is 15–25%. Inside IR35, your client deducts employer NI (currently 13.8%) from your contract rate before paying you, and you then pay employee NI and income tax on the remainder. Outside IR35, you pay the lower self-employed Class 2/4 NI on profits after allowable expenses.",
  },
  {
    question: "What is the difference between 1099 and W-2 in the US?",
    answer:
      "A W-2 employee has income tax and FICA (Social Security + Medicare) withheld by their employer, who also pays the employer's 7.65% FICA share. A 1099 contractor pays self-employment tax (15.3%) on net profit — both halves — but can deduct business expenses before tax, deduct half the SE tax, and often charge a higher gross rate. The net result depends heavily on expenses and the rate differential.",
  },
  {
    question: "What expenses can I claim as a contractor?",
    answer:
      "In the UK, allowable business expenses include equipment and hardware, software subscriptions, professional indemnity insurance, accountancy fees, relevant training, and a proportion of home-office costs. In the US, Schedule C deductions include similar categories plus the home-office deduction, health insurance premiums (if self-paid), and retirement plan contributions. Personal costs cannot be claimed.",
  },
  {
    question: "Does IR35 status affect my pension?",
    answer:
      "Yes. Inside IR35 you may be entitled to auto-enrolment pension contributions from the agency or end-client, but the contribution rates are typically lower than what a limited company director could put in via employer contributions. Outside IR35, you can make substantial employer pension contributions through your limited company, often making pensions the most tax-efficient way to extract profit.",
  },
  {
    question: "Is this calculator a substitute for professional IR35 advice?",
    answer:
      "No. This tool models the income tax and NI arithmetic but does not determine your IR35 status — that depends on the specifics of your contract, working practices, and control, substitution, and mutuality of obligation tests. Always get a professional contract review from a specialist IR35 advisor before taking on a new engagement.",
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
        calculator={<ContractorComparisonCalculator />}
        source={IR35_SOURCE}
        verifiedDate={UK_INCOME_TAX.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>IR35 and 1099 vs W-2 — what the tax difference really is</h2>
            <p>
              The financial gap between contracting and employment is not just about the gross rate —
              it is about how that income is taxed. This tool makes the comparison concrete by
              running both scenarios through the actual 2026/27 UK or 2026 US tax rules and showing
              you the take-home figure for each.
            </p>
            <p>
              In the <strong>UK</strong>, operating outside IR35 through a limited company means
              your income is treated as self-employed profit: you pay Class 2 and Class 4 National
              Insurance on net profit after allowable business expenses, plus income tax. Inside
              IR35, your contract rate is treated as a deemed salary — employer NI (13.8%) is
              deducted first, then you pay employee NI and PAYE income tax on the remainder. The
              difference can be £10,000–£20,000 a year on a typical day rate.
            </p>
            <p>
              In the <strong>US</strong>, the equivalent comparison is 1099 self-employed versus
              W-2 employee. As a 1099 worker you pay self-employment tax (15.3%) on your net profit
              — both the employer and employee shares of FICA — but you can deduct business
              expenses and half the SE tax before applying income tax. A W-2 employee pays only the
              employee FICA share (7.65%) but cannot deduct business expenses and typically earns a
              lower gross rate.
            </p>
            <p>
              Enter your contractor gross income, the equivalent employee salary, and your expenses
              to see the take-home difference side by side.
            </p>
          </>
        }
      />
    </>
  );
}
