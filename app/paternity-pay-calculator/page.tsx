import { ToolLayout } from "@/components/ToolLayout";
import { PaternityPayCalculator } from "@/components/calculators/PaternityPayCalculator";
import { PATERNITY_SOURCE } from "@/lib/calculators/paternityPay";
import { getTool } from "@/data/tools";
import { UK_SPP } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("paternity-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

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
        calculator={<PaternityPayCalculator />}
        source={PATERNITY_SOURCE}
        verifiedDate={UK_SPP.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How Statutory Paternity Pay is calculated</h2>
            <p>
              Statutory Paternity Pay (SPP) is the minimum weekly payment available during ordinary
              paternity leave. You can take either one week or two consecutive weeks — you cannot
              split them. The weekly amount is whichever is lower: the government&apos;s statutory
              weekly rate (£{UK_SPP.weeklyRate} for {UK_SPP.taxYear}) or 90% of your average
              weekly earnings (AWE) in the relevant calculation period.
            </p>
            <p>
              Your AWE is usually based on your gross earnings in the eight weeks (or two months)
              before the end of the 15th week before the baby is due — known as the{" "}
              <strong>qualifying week</strong>. If you are paid monthly, your employer takes two
              months&apos; gross pay and divides by two to get the weekly figure. Bonus payments and
              irregular earnings in that period count toward AWE.
            </p>
            <p>
              To qualify for SPP you normally need: 26 weeks&apos; continuous employment with the same
              employer by the end of the qualifying week; average weekly earnings of at least the
              Lower Earnings Limit (£{UK_SPP.lowerEarningsLimit} per week for {UK_SPP.taxYear});
              and you must give your employer the correct notice — usually by the end of the 15th
              week before the expected week of childbirth. You must also be the biological father,
              the mother&apos;s spouse or partner, or the child&apos;s adopter.
            </p>
            <p>
              Paternity leave must be taken within 52 weeks of the birth. SPP is paid via your
              normal payroll in the same way as your salary — income tax and National Insurance are
              deducted. Employers can reclaim most of the statutory amount from HMRC. Many employers
              offer enhanced paternity pay above the statutory minimum; use this calculator&apos;s
              result as the legal floor when comparing your contract.
            </p>
          </>
        }
      />
    </>
  );
}
