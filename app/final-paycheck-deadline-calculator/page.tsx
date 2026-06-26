import { ToolLayout } from "@/components/ToolLayout";
import { FinalPaycheckCalculator } from "@/components/calculators/FinalPaycheckCalculator";
import { FINAL_PAY_SOURCE } from "@/lib/calculators/finalPaycheck";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("final-paycheck-deadline-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "When does my employer have to give me my final paycheck?",
    answer:
      "It depends on your state and how you left. Some states require payment immediately on termination — California, for example, requires final wages on your last day if you are fired. Others allow until the next regular payday. Select your state above to see the rule.",
  },
  {
    question: "Is the deadline different if I quit versus being fired?",
    answer:
      "Often, yes. Many states set a faster deadline when an employer ends the job than when an employee resigns. In California a fired employee must be paid immediately, while someone who quits without notice is paid within 72 hours.",
  },
  {
    question: "What if my state has no specific law?",
    answer:
      "A few states (such as Alabama, Florida, Georgia and Mississippi) have no specific final-paycheck statute. In those states, final wages generally follow your employer's normal pay schedule — usually the next regular payday. This tool covers all 50 states and DC.",
  },
  {
    question: "Does my final paycheck include unused PTO?",
    answer:
      "That is a separate question governed by your state's PTO payout rules. Some states treat earned vacation as wages that must be paid out, while others leave it to employer policy. Check a PTO payout calculator for your state.",
  },
  {
    question: "What can I do if my final paycheck is late?",
    answer:
      "You can file a wage claim with your state labor office. Some states impose 'waiting-time penalties' — additional pay for each day the final wages are late — which can add up quickly for a missed deadline.",
  },
  {
    question: "Can my employer withhold my final paycheck?",
    answer:
      "Generally no. You must be paid for all hours worked, even if you have not returned equipment or a uniform. Deductions are tightly restricted, so withholding an entire final paycheck is usually unlawful.",
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
        calculator={<FinalPaycheckCalculator />}
        source={FINAL_PAY_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>When your final paycheck is legally due</h2>
            <p>
              There is no single federal deadline for a final paycheck in the United States. Instead
              each state sets its own rule, and two factors decide it: which state you worked in, and
              whether you <strong>quit</strong> or were <strong>let go</strong>. This tool pairs those
              two inputs to show the deadline that applies to you, rather than a vague &quot;it
              depends&quot;.
            </p>
            <p>
              The strictest states require payment the moment employment ends. California and
              Massachusetts, for instance, require a fired employee&apos;s full final wages on their
              last day. Many states are more relaxed and allow until the next regular payday, and a
              handful have no specific statute at all — in which case your employer&apos;s normal pay
              schedule governs. Several states also impose <strong>waiting-time penalties</strong>:
              extra pay for every day the final wages are late, which gives the deadline real teeth.
            </p>
            <p>
              Note that whether your final pay must include unused vacation is a separate question,
              decided by your state&apos;s PTO payout rules rather than its paycheck-timing law. If
              your deadline passes without payment, your state labor office is the place to file a
              wage claim. Download the PDF summary to keep a dated record of the rule that applied
              when you left.
            </p>
          </>
        }
      />
    </>
  );
}
