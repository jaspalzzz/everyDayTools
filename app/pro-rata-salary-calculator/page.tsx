import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { ProRataSalaryCalculator } from "@/components/calculators/ProRataSalaryCalculator";
import { PRO_RATA_SOURCE } from "@/lib/calculators/proRataSalary";
import { getTool } from "@/data/tools";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("pro-rata-salary-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "How do I calculate a pro-rata salary?",
    answer:
      "Divide your weekly hours by the full-time hours, then multiply by the full-time salary. Working 24 hours against a 40-hour full-time week on £50,000 gives 24 ÷ 40 × £50,000 = £30,000.",
  },
  {
    question: "What does pro-rata mean for salary?",
    answer:
      "Pro-rata means 'in proportion'. A job advertised at a full-time salary 'pro-rata' pays you the share that matches your hours, so part-time staff are paid fairly relative to full-time colleagues.",
  },
  {
    question: "Is a pro-rata salary before or after tax?",
    answer:
      "This calculator shows the gross pro-rata figure, before tax. Your take-home will be lower once income tax and other deductions are applied to the reduced salary.",
  },
  {
    question: "Do part-time workers get pro-rata holiday too?",
    answer:
      "Yes. Holiday entitlement is also pro-rata: you get the same number of weeks as a full-time worker, which translates to fewer days because your week is shorter.",
  },
  {
    question: "How is pro-rata pay worked out for benefits?",
    answer:
      "Many benefits — bonuses, pension contributions, allowances — are also scaled to your hours. Part-time workers are legally entitled to the same benefits, pro-rata, as comparable full-time staff.",
  },
  {
    question: "Does the full-time hours figure matter?",
    answer:
      "Yes, a lot. The same salary against a 35-hour full-time week gives a higher pro-rata figure than against 40 hours, because each of your hours represents a bigger share. Always use your employer's full-time standard.",
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
        calculator={<ProRataSalaryCalculator />}
        source={PRO_RATA_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How pro-rata salary works</h2>
            <p>
              When a role is advertised at a full-time salary &quot;pro-rata&quot;, the figure you
              actually earn depends on the hours you work. Pro-rata simply means &quot;in
              proportion&quot;: you take the share of the full-time salary that matches your hours.
              This calculator does that in one step — divide your hours by the full-time week,
              multiply by the full-time salary, and you have your annual and monthly pay.
            </p>
            <p>
              The figure that trips people up is the <strong>full-time hours</strong> baseline. A
              £50,000 salary pro-rata across a 40-hour week gives a different result from the same
              salary across a 35-hour week, because in the shorter week each of your hours represents
              a larger slice of the whole. Always use the full-time standard your employer actually
              applies, which you will find in the contract or job advert. The same proportional logic
              extends beyond pay: holiday, bonuses and pension are typically pro-rata too, and
              part-time staff are legally entitled to the same benefits on that basis as comparable
              full-time colleagues.
            </p>
            <p>
              All the figures here are gross, before tax — your take-home will be lower once
              deductions come off the reduced salary. Download the PDF summary to keep a record of
              the calculation when comparing a part-time offer or agreeing new hours.
            </p>
          </>
        }
      />
    </>
  );
}
