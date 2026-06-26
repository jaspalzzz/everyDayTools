import { ToolLayout } from "@/components/ToolLayout";
import { SeveranceCalculator } from "@/components/calculators/SeveranceCalculator";
import { SEVERANCE_SOURCE } from "@/lib/calculators/severance";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("severance-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

const faqs: FaqItem[] = [
  {
    question: "Is severance pay required by law?",
    answer:
      "In most US states and in the UK private sector, severance is not legally required — it is set by your contract or employer policy. Canada is an exception, where employment-standards law sets a statutory minimum termination and severance pay.",
  },
  {
    question: "How much severance is typical?",
    answer:
      "A common benchmark is one to two weeks of pay for each year of service, though senior roles and negotiated exits can be higher. This calculator lets you set the weeks-per-year figure to match your situation.",
  },
  {
    question: "Is severance pay taxable?",
    answer:
      "Yes. Severance is generally treated as taxable income and is subject to income tax and, in many cases, payroll taxes. The figure shown here is a gross, pre-tax estimate.",
  },
  {
    question: "Can I negotiate my severance?",
    answer:
      "Often, yes — especially where severance is policy-based rather than statutory. Your length of service, the reason for termination and any release of claims are common negotiating points.",
  },
  {
    question: "When is severance usually paid?",
    answer:
      "Most often as a lump sum on or shortly after your last day, though some agreements pay it in instalments over a few months. The timing is set by the severance agreement, so check the document for the exact schedule.",
  },
  {
    question: "Does accepting severance mean I waive my right to sue?",
    answer:
      "Frequently, yes. Severance agreements commonly include a release of claims, meaning that by signing you give up the right to bring certain legal claims against your employer. Because this is a legal waiver, it is worth reviewing carefully before signing.",
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
        calculator={<SeveranceCalculator />}
        source={SEVERANCE_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How severance pay is estimated</h2>
            <p>
              Severance pay is the money some employers provide when they end your employment,
              usually in a layoff or restructuring. Unlike redundancy pay in the UK or termination
              pay in Canada, severance in the United States is rarely required by law — it is driven
              by your contract, an employee handbook, or a negotiated exit agreement.
            </p>
            <p>
              This estimator multiplies your years of service by a weeks-per-year figure and your
              gross weekly pay. The default of one week per year reflects a common policy, but you
              can adjust it to match an offer you have received. For Canada, the calculator applies
              the federal statutory minimum where it exceeds the policy figure, so you never see a
              number below your legal entitlement.
            </p>
            <p>
              Severance is also separate from any notice you are owed. In a large layoff, US
              employers may have to give advance notice under the federal WARN Act, and a severance
              offer is usually tied to a written agreement that releases the employer from future
              claims. Treat the number this tool produces as your baseline, then weigh it against
              what you may be giving up by signing.
            </p>
            <p>
              Because severance is so often negotiable, it helps to walk into the conversation with
              a clear number. Download the PDF summary and use it as the starting point for
              discussions with your employer.
            </p>
          </>
        }
      />
    </>
  );
}
