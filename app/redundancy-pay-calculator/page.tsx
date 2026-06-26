import { ToolLayout } from "@/components/ToolLayout";
import { RedundancyCalculator } from "@/components/calculators/RedundancyCalculator";
import { REDUNDANCY_SOURCE } from "@/lib/calculators/redundancy";
import { getTool } from "@/data/tools";
import { UK_REDUNDANCY } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("redundancy-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How is statutory redundancy pay calculated in the UK?",
    answer:
      "It is based on your age, your length of service (capped at 20 years) and your weekly pay (capped at £751 from 6 April 2026). You get 0.5 week's pay for each year worked under 22, 1 week for each year aged 22–40, and 1.5 weeks for each year aged 41 or over.",
  },
  {
    question: "Do I qualify for statutory redundancy pay?",
    answer:
      "You normally need at least two years' continuous service with your employer and to be classed as an employee. Agency workers, the self-employed and some other groups may not qualify.",
  },
  {
    question: "Is redundancy pay taxed?",
    answer:
      "Statutory redundancy pay is tax-free. Additional contractual or enhanced redundancy payments may be taxable above the £30,000 threshold.",
  },
  {
    question: "What is the maximum statutory redundancy pay?",
    answer:
      "The maximum is 30 weeks' pay (20 years × 1.5 weeks) at the capped weekly rate, giving a statutory maximum of £22,530 from 6 April 2026.",
  },
  {
    question: "What counts as a week's pay for redundancy?",
    answer:
      "It is your normal gross weekly pay before tax. If your pay varies, an average over the 12 weeks before you were made redundant is used. The figure is then capped at £751 a week for the 2026/27 tax year, even if you earn more.",
  },
  {
    question: "Can I lose my redundancy pay if I am offered another job?",
    answer:
      "Possibly. If your employer offers suitable alternative work and you turn it down without good reason, you can lose your statutory redundancy pay. You are entitled to a four-week trial period in the new role before deciding.",
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
        calculator={<RedundancyCalculator />}
        source={REDUNDANCY_SOURCE}
        verifiedDate={UK_REDUNDANCY.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How this redundancy calculator works</h2>
            <p>
              If you are made redundant in the UK and have at least two years&apos; continuous
              service, you are legally entitled to <strong>statutory redundancy pay</strong>. This
              calculator applies the formula set out in the Employment Rights Act 1996: it counts
              your years of service (up to a maximum of 20), weights each year by your age during
              that year, and multiplies the total by your weekly pay — capped at £751 for the
              2026/27 tax year.
            </p>
            <p>
              The age weighting is the part most people get wrong. Each full year worked while you
              were 41 or older is worth 1.5 weeks&apos; pay; each year between 22 and 40 is worth
              one week; and each year under 22 is worth half a week. Because the weekly-pay figure
              is capped, higher earners receive the same statutory amount as someone earning £751 a
              week — though your contract may promise more.
            </p>
            <p>
              Only <strong>continuous employment</strong> counts towards your years of service, and
              the clock stops on the date your employment ends, not the date you were told. Periods
              of sickness, maternity or paternity leave usually count, but a genuine break in
              employment can reset it. If you are unsure of your start date, your contract or your
              first payslip is the reliable reference.
            </p>
            <p>
              The figures change every April, which is why a maintained tool gives a more reliable
              answer than a general estimate. Use the PDF summary to keep a dated record of your
              estimate for discussions with your employer.
            </p>
          </>
        }
      />
    </>
  );
}
