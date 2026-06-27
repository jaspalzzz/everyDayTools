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
      "You normally need 26 weeks' continuous employment by the end of the 15th week before the baby is due, average weekly earnings of at least £129, and you must give the required notice by the end of that same 15th week.",
  },
  {
    question: "Is paternity pay taxed?",
    answer:
      "Yes. Statutory Paternity Pay is treated as earnings, so income tax and National Insurance can be deducted in the normal way via PAYE.",
  },
  {
    question: "Can I take paternity leave in separate weeks?",
    answer:
      "No. Ordinary paternity leave must be taken as either one whole week or two consecutive weeks — you cannot split the weeks or take odd days. Leave must start on or after the birth and end within 56 days of the birth.",
  },
  {
    question: "What if my employer offers enhanced paternity pay?",
    answer:
      "Enhanced paternity pay is any amount above the statutory minimum. Your contract or staff handbook will specify the enhanced rate and any conditions (such as a minimum return-to-work period). The statutory figure is the legal floor; your employer can pay more but not less.",
  },
  {
    question: "Can employers reclaim SPP from HMRC?",
    answer:
      "Yes. Most employers can recover 92% of SPP from HMRC by deducting it from their PAYE payments. Small employers (those whose annual NI liability is £45,000 or less) can recover 103% under the Small Employers Relief scheme.",
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
              split them or take odd days. The weekly amount is whichever is lower: the
              government&apos;s statutory weekly rate (£{UK_SPP.weeklyRate} for {UK_SPP.taxYear})
              or 90% of your average weekly earnings (AWE) in the relevant calculation period.
            </p>
            <p>
              Your AWE is usually based on your gross earnings in the eight weeks (or two months)
              before the end of the 15th week before the baby is due — known as the{" "}
              <strong>qualifying week</strong>. If you are paid monthly, your employer takes two
              months&apos; gross pay and divides by two to get the weekly figure. Bonus payments and
              irregular earnings in that period count toward AWE. Statutory pay elements (such as
              Statutory Sick Pay) are excluded from the AWE calculation.
            </p>
            <p>
              To qualify for SPP you normally need: 26 weeks&apos; continuous employment with the
              same employer by the end of the qualifying week; average weekly earnings of at least
              the Lower Earnings Limit (£{UK_SPP.lowerEarningsLimit} per week for{" "}
              {UK_SPP.taxYear}); and you must give your employer the correct notice — usually a
              completed SC3 form, submitted by the end of the 15th week before the expected week of
              childbirth. You must also be the biological father, the mother&apos;s spouse or
              partner, or the child&apos;s adopter, and you must have responsibility for the
              child&apos;s upbringing.
            </p>
            <h2>When paternity leave can be taken</h2>
            <p>
              Paternity leave must start on or after the date of birth and must be completed within
              56 days of the birth (or the expected week of birth if the baby is early). You can
              choose to start leave on the day of the birth itself, a pre-agreed number of days
              after birth, or the first day of the week following the birth. If the baby is born
              early, you may start earlier than originally planned as long as the birth has occurred.
            </p>
            <p>
              You cannot take paternity leave in non-consecutive chunks. If you choose two weeks,
              those two weeks must follow each other without a break. This is different from Shared
              Parental Leave, which can be taken in up to three separate blocks and is far more
              flexible — though you can take both ordinary paternity leave and then opt into Shared
              Parental Leave separately if both parents meet the eligibility criteria.
            </p>
            <h2>How SPP is paid and what employers can reclaim</h2>
            <p>
              SPP is paid through your normal payroll in the same way as your salary — income tax
              and National Insurance contributions are deducted under PAYE. You receive it on your
              usual pay date. Employers can reclaim most of the statutory amount from HMRC by
              deducting it from their monthly PAYE payments: most employers recover 92% of what they
              paid out, while small employers (those whose annual Class 1 NI liability was £45,000
              or less in the previous tax year) can recover 103% under Small Employers Relief,
              which covers the employer&apos;s own NI cost on the payment.
            </p>
            <p>
              Many employers offer enhanced paternity pay above the statutory minimum — sometimes
              matching enhanced maternity pay, sometimes at a fixed enhanced rate for the first week
              and statutory for the second. Your staff handbook or employment contract will specify
              the enhanced rate and any conditions (such as a minimum period of service before the
              birth or a requirement to return to work for a certain period). Use this
              calculator&apos;s result as the legal floor when reviewing your contract or comparing
              offers. If your employer pays less than SPP for an eligible week, that is unlawful and
              you should raise it with HR or contact ACAS.
            </p>
          </>
        }
      />
    </>
  );
}
