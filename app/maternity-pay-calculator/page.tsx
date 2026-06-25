import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { MaternityPayCalculator } from "@/components/calculators/MaternityPayCalculator";
import { MATERNITY_SOURCE } from "@/lib/calculators/maternityPay";
import { getTool } from "@/data/tools";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("maternity-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "How much is Statutory Maternity Pay?",
    answer:
      "SMP is paid for up to 39 weeks. For the first 6 weeks you get 90% of your average weekly earnings. For the remaining 33 weeks you get the lower of the standard weekly rate (£187.18 for 2025/26) or 90% of your average weekly earnings.",
  },
  {
    question: "Do I qualify for SMP?",
    answer:
      "You normally qualify if you have worked for your employer continuously for at least 26 weeks by the 15th week before your due date, and earn at least £125 a week on average. If you do not qualify, you may be able to claim Maternity Allowance.",
  },
  {
    question: "How are my average weekly earnings worked out?",
    answer:
      "They are based on your gross pay over a set 8-week period before the qualifying week (roughly 15 weeks before your due date). Bonuses and overtime paid in that period are included.",
  },
  {
    question: "Is maternity pay taxed?",
    answer:
      "Yes. SMP is treated as earnings, so it is subject to income tax and National Insurance in the normal way. The figure shown here is a gross estimate before deductions.",
  },
  {
    question: "What is the difference between SMP and Maternity Allowance?",
    answer:
      "SMP is paid by your employer if you meet the employment and earnings tests. Maternity Allowance is paid by the government to those who do not qualify for SMP, such as the self-employed or recent job changers.",
  },
  {
    question: "Can I get more than the statutory minimum?",
    answer:
      "Yes. Many employers offer enhanced or 'occupational' maternity pay above SMP. Check your contract or staff handbook — this calculator shows the statutory minimum you are legally entitled to.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <ToolLayout
        tool={tool}
        calculator={<MaternityPayCalculator />}
        source={MATERNITY_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How Statutory Maternity Pay is calculated</h2>
            <p>
              Statutory Maternity Pay is the minimum your employer must pay while you are on
              maternity leave, and it comes in two stages. For the <strong>first six weeks</strong>{" "}
              you receive 90% of your average weekly earnings with no cap. For the{" "}
              <strong>following 33 weeks</strong> you receive whichever is lower: the standard weekly
              rate set by the government, or 90% of your average weekly earnings. Together that is up
              to 39 weeks of pay, which this calculator totals for you.
            </p>
            <p>
              The standard rate is £187.18 a week for the 2025/26 tax year and is uprated every
              April, which is why a maintained tool is more reliable than a remembered figure. To
              qualify you generally need 26 weeks&apos; continuous service by the 15th week before
              your due date and average earnings of at least £125 a week. If you fall short — for
              example as a recent job changer or a self-employed parent — you may be able to claim
              Maternity Allowance instead.
            </p>
            <p>
              Remember the result is gross: SMP is taxed and has National Insurance deducted like
              normal pay, and many employers offer enhanced maternity pay on top. Download the PDF
              summary to keep a dated record of the statutory figure for planning or for a
              conversation with your employer.
            </p>
          </>
        }
      />
    </>
  );
}
