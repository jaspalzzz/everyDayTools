import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { PaternityPayCalculator } from "@/components/calculators/PaternityPayCalculator";
import { PATERNITY_SOURCE } from "@/lib/calculators/paternityPay";
import { getTool } from "@/data/tools";
import { UK_SPP } from "@/lib/rates";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("paternity-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "How much is Statutory Paternity Pay?",
    answer:
      "SPP is paid for 1 or 2 weeks at the lower of the statutory weekly rate (£194.32 for 2026/27) or 90% of your average weekly earnings.",
  },
  {
    question: "Do I qualify for Statutory Paternity Pay?",
    answer:
      "You normally need 26 weeks' continuous employment by the end of the 15th week before the baby is due, average weekly earnings of at least £129, and you must give the required notice.",
  },
  {
    question: "Is paternity pay taxed?",
    answer:
      "Yes. Statutory Paternity Pay is treated as earnings, so income tax and National Insurance can be deducted.",
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
        calculator={<PaternityPayCalculator />}
        source={PATERNITY_SOURCE}
        verifiedDate={UK_SPP.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How Statutory Paternity Pay is calculated</h2>
            <p>
              Statutory Paternity Pay is the minimum weekly payment available during ordinary
              paternity leave. It is usually paid for either one week or two consecutive weeks. The
              weekly amount is whichever is lower: the government&apos;s statutory weekly rate or 90%
              of your average weekly earnings.
            </p>
            <p>
              To qualify, you generally need to have worked for your employer continuously for 26
              weeks by the end of the 15th week before the baby is due, earn at least the Lower
              Earnings Limit, and give the right notice. This calculator checks the earnings part
              and gives a gross statutory estimate.
            </p>
            <p>
              Some employers offer enhanced paternity pay. If your contract or staff handbook gives
              a better amount, use this result as the statutory floor rather than the full package.
            </p>
          </>
        }
      />
    </>
  );
}
