import { ToolLayout } from "@/components/ToolLayout";
import { RedundancyCalculator } from "@/components/calculators/RedundancyCalculator";
import { REDUNDANCY_SOURCE } from "@/lib/calculators/redundancy";
import { getTool } from "@/data/tools";
import { UK_REDUNDANCY } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("employer-redundancy-cost-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({
  title: "Employer Redundancy Cost Calculator UK 2026 — What Do I Owe?",
  description: "Calculate the statutory redundancy pay you owe a departing employee under the Employment Rights Act 1996. Enter their age, service length, and weekly pay.",
  url,
  slug: tool.slug,
});

const faqs: FaqItem[] = [
  {
    question: "When am I legally required to pay statutory redundancy pay?",
    answer:
      "You must pay statutory redundancy pay when you dismiss an employee by reason of redundancy (Employment Rights Act 1996 s.135) and they have 2 or more years of continuous employment. The qualifying period runs from their start date to the effective date of termination (not the date notice is given). Failure to pay is unlawful — the employee can bring a tribunal claim within 6 months.",
  },
  {
    question: "What is the statutory formula for redundancy pay?",
    answer:
      "Statutory redundancy pay = complete years of service (up to 20) × weekly pay (capped at £751 from 6 April 2026) × age multiplier. The multiplier is 0.5 per year worked under age 22, 1 per year aged 22–40, and 1.5 per year aged 41 or over. The maximum payment is £22,530.",
  },
  {
    question: "Can I offer enhanced redundancy pay instead?",
    answer:
      "Yes. You can pay more than the statutory minimum — using the employee's actual salary, a higher multiplier, or uncapped years of service. Any payment above the statutory minimum is described as enhanced redundancy pay. The tax treatment is the same: the first £30,000 of total termination payments (statutory + enhanced + ex gratia) is tax-free. Amounts above £30,000 are subject to income tax (but not employee National Insurance).",
  },
  {
    question: "What else do I owe in addition to redundancy pay?",
    answer:
      "Statutory redundancy pay is a separate entitlement from notice pay. You must also pay: the employee's notice period (or pay in lieu at their full contractual rate), any accrued but untaken annual leave, outstanding wages, and any contractual bonus or commission that has accrued. PILON (pay in lieu of notice) is always fully taxable — it does not benefit from the £30,000 exemption.",
  },
  {
    question: "What if the employee refuses a suitable alternative role?",
    answer:
      "If you offer a suitable alternative role before the redundancy takes effect and the employee unreasonably refuses it, they lose their right to statutory redundancy pay. The employee is entitled to a 4-week trial period in the alternative role before deciding. Whether a role is 'suitable' depends on factors including pay, location, seniority, and working hours. Always document the offer in writing.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(tool.name, url))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webApplicationSchema({ name: tool.name, description: tool.description, url, region: tool.region }))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <ToolLayout
        tool={tool}
        calculator={<RedundancyCalculator startEligible />}
        source={REDUNDANCY_SOURCE}
        verifiedDate={UK_REDUNDANCY.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>What you must pay when making someone redundant</h2>
            <p>
              When you make an employee redundant with 2 or more years' continuous service, you are
              legally required to pay <strong>statutory redundancy pay</strong> under the Employment
              Rights Act 1996. This calculator applies the statutory formula: service years (up to 20)
              × weekly pay (capped at £751 from 6 April 2026) × age multiplier. The maximum statutory
              payment is £22,530.
            </p>
            <p>
              Redundancy pay is <strong>separate from and in addition to</strong> notice pay. You must
              also pay the employee their full notice period (or pay in lieu), plus any accrued holiday
              pay. Use the notice period calculator to determine the notice obligation separately.
            </p>
            <h2>Tax treatment — the £30,000 threshold</h2>
            <p>
              The first £30,000 of total qualifying termination payments — statutory redundancy pay,
              enhanced redundancy, and ex gratia amounts combined — is free of income tax and
              National Insurance for both employer and employee. Amounts above £30,000 attract income
              tax at the employee's marginal rate. Note that notice pay (PILON) is always fully
              taxable and does not count toward the £30,000 threshold.
            </p>
            <h2>Collective redundancy obligations (45-day consultation)</h2>
            <p>
              If you are proposing to dismiss 100 or more employees at the same establishment within
              90 days, you must begin collective consultation <strong>at least 45 days</strong> before
              the first dismissal takes effect and notify the Insolvency Service (via HR1 form).
              For 20–99 redundancies, the minimum is 30 days. Failure to collectively consult entitles
              each affected employee to a protective award of up to 90 days' pay.
            </p>
          </>
        }
      />
    </>
  );
}
