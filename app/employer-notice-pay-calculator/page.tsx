import { ToolLayout } from "@/components/ToolLayout";
import { NoticePeriodCalculator } from "@/components/calculators/NoticePeriodCalculator";
import { NOTICE_SOURCE } from "@/lib/calculators/noticePeriod";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("employer-notice-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({
  title: "Employer Notice Pay Calculator UK 2026 — What Notice Do I Owe?",
  description: "Calculate the statutory minimum notice you owe a departing employee under the Employment Rights Act 1996, or the cost of PILON and garden leave. For UK employers.",
  url,
  slug: tool.slug,
});

const faqs: FaqItem[] = [
  {
    question: "What is the minimum notice I must give an employee?",
    answer:
      "Under the Employment Rights Act 1996 s.86, the statutory minimum notice you must give an employee depends on their length of continuous service: 1 week after 1 month; then 1 week per complete year of service from 2 years up to 12 weeks maximum at 12+ years. You must give whichever is greater — the statutory minimum or the contractual notice period specified in the employee's contract.",
  },
  {
    question: "Can I pay in lieu of notice instead of requiring the employee to work?",
    answer:
      "Yes. You can pay in lieu of notice (PILON) instead of requiring the employee to work through their notice period, provided the employment contract includes an express PILON clause or the employee agrees. Since April 2018, all PILON is fully taxable as earnings — deduct income tax and National Insurance through payroll as normal. PILON must be at the employee's full contractual rate of pay for the notice period.",
  },
  {
    question: "What is garden leave and when should I use it?",
    answer:
      "Garden leave means the employee remains employed and continues to be paid but does not work. It keeps them bound by their employment contract (including confidentiality and non-compete obligations) for the duration of the notice period. It is most appropriate for senior employees with access to sensitive client relationships or information, where immediate departure would pose a business risk. Your contract should include an express garden leave clause to rely on it.",
  },
  {
    question: "Is notice pay taxable?",
    answer:
      "Yes — all notice pay (including PILON) is fully taxable as earnings and subject to income tax and employer/employee National Insurance contributions. Since April 2018, PILON does not benefit from the £30,000 termination payment exemption regardless of whether it is contractual or non-contractual. Process it through payroll using the employee's current tax code.",
  },
  {
    question: "What happens if I dismiss an employee without giving notice?",
    answer:
      "Dismissing an employee without notice (or pay in lieu) — unless for genuine gross misconduct — is wrongful dismissal. The employee can bring a breach of contract claim at the Employment Tribunal (up to £25,000) or in the county court. The claim value is typically the pay they would have received during the notice period. Wrongful dismissal claims can be brought from day one of employment — no 2-year qualifying period applies.",
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
        calculator={<NoticePeriodCalculator />}
        source={NOTICE_SOURCE}
        verifiedDate="2025-04-06"
        faqs={faqs}
        contentBlock={
          <>
            <h2>Statutory notice obligations for UK employers</h2>
            <p>
              The <strong>Employment Rights Act 1996 s.86</strong> sets the minimum notice you must
              give an employee before terminating their employment. The statutory minimum runs from
              1 week (after 1 month's service) to 12 weeks (after 12 or more years). Your employment
              contracts may specify a longer notice period — you must honour whichever is greater.
            </p>
            <h2>PILON vs garden leave — cost implications</h2>
            <p>
              Both options cost the same in base salary terms, but garden leave carries additional
              employer costs: pension contributions continue, benefits (private medical, company car
              etc.) continue to accrue, and the employee may continue to earn commission or bonus
              on deals that close during the period. PILON ends these obligations immediately on
              the termination date. For employees with significant benefits, PILON is usually the
              lower-cost option.
            </p>
            <h2>Notice pay and the termination payment tax rules</h2>
            <p>
              Since 6 April 2018, all notice pay — whether worked, garden leave, or PILON — is
              fully taxable as earnings and subject to both income tax and National Insurance
              contributions. Notice pay does not benefit from the £30,000 termination payment
              exemption. You must deduct tax and NI through payroll. The £30,000 exemption applies
              only to genuinely non-contractual payments such as ex gratia payments and statutory
              redundancy pay.
            </p>
          </>
        }
      />
    </>
  );
}
