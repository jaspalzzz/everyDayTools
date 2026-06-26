import { ToolLayout } from "@/components/ToolLayout";
import { PtoPayoutCalculator } from "@/components/calculators/PtoPayoutCalculator";
import { PTO_SOURCE } from "@/lib/calculators/ptoPayout";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("pto-payout-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

const faqs: FaqItem[] = [
  {
    question: "Does my employer have to pay out unused PTO when I leave?",
    answer:
      "It depends on your state. Some states (such as California, Colorado, Illinois and Massachusetts) treat earned vacation as wages that must be paid out. Others leave it to the employer's written policy, and a few have no requirement at all.",
  },
  {
    question: "How is my PTO payout calculated?",
    answer:
      "Your accrued, unused PTO hours are multiplied by your regular hourly rate. The result is the gross amount before tax. Bonuses, overtime premiums and other pay are usually excluded.",
  },
  {
    question: "Is a PTO payout taxed?",
    answer:
      "Yes. A PTO payout is treated as supplemental wages and is subject to federal, state and payroll taxes, so your take-home amount will be lower than the gross figure shown.",
  },
  {
    question: "What is a 'use it or lose it' PTO policy?",
    answer:
      "It is a policy where unused PTO is forfeited rather than paid out. These policies are legal in some states but banned in others, such as California, where earned vacation cannot be forfeited.",
  },
  {
    question: "How do I find my unused PTO balance?",
    answer:
      "Your most recent pay stub or your employer's payroll/HR system usually shows your accrued PTO and how much you have used. The difference is your unused balance — the number to enter in this calculator.",
  },
  {
    question: "Does a PTO payout include unused sick leave?",
    answer:
      "Usually not. Payout rules generally cover vacation or combined PTO, while separately-accrued sick leave has its own state rules and is often not paid out on separation. Check how your employer classifies the time.",
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
        calculator={<PtoPayoutCalculator />}
        source={PTO_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>What your state says about PTO payout</h2>
            <p>
              There is no federal law in the United States requiring employers to pay out unused
              paid time off when you leave a job. Instead, the rules are set state by state — and
              they differ sharply. This calculator pairs your unused hours and hourly rate with the
              payout rule that applies in your state, so you know whether the money is something you
              are legally owed or something governed by your employer&apos;s policy.
            </p>
            <p>
              In states like California, earned vacation is treated as a form of wages: it cannot be
              taken away, and it must be paid out on separation. In policy-driven states such as
              Texas or Florida, what you receive depends on what your employee handbook or offer
              letter says. Reading that policy carefully is the single most useful thing you can do
              before you leave.
            </p>
            <p>
              A third group of states sits in between: they allow an employer to cap accrual or
              decline a payout, but <em>only</em> where there is a clear written policy the employee
              agreed to. That is why the wording of your handbook matters so much — an ambiguous or
              unwritten policy often defaults back to paying out earned time. When the rule is
              conditional, this tool flags it so you know to read the policy rather than assume.
            </p>
            <p>
              The figure shown is gross — PTO payouts are taxed as supplemental wages. Download the
              PDF summary to keep a record of the amount and the state rule for any conversation
              with HR.
            </p>
          </>
        }
      />
    </>
  );
}
