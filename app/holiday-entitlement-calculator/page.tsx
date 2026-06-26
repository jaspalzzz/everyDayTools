import { ToolLayout } from "@/components/ToolLayout";
import { HolidayEntitlementCalculator } from "@/components/calculators/HolidayEntitlementCalculator";
import { HOLIDAY_SOURCE } from "@/lib/calculators/holidayAccrual";
import { getTool } from "@/data/tools";
import { UK_HOLIDAY } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("holiday-entitlement-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url });

const faqs: FaqItem[] = [
  {
    question: "How much holiday am I entitled to in the UK?",
    answer:
      "Almost all workers are legally entitled to 5.6 weeks of paid annual leave a year. For someone working 5 days a week that is 28 days, which can include bank holidays. Working fewer days a week reduces the number of days proportionally.",
  },
  {
    question: "How is statutory holiday calculated?",
    answer:
      "Multiply the days you work each week by 5.6. So 5 days × 5.6 = 28 days, 4 days × 5.6 = 22.4 days, and 3 days × 5.6 = 16.8 days. The statutory entitlement is capped at 28 days.",
  },
  {
    question: "Can my employer include bank holidays in my entitlement?",
    answer:
      "Yes. There is no legal right to take bank holidays off, and an employer can count them towards your 5.6-week statutory entitlement. Your contract should state whether bank holidays are included or on top.",
  },
  {
    question: "How does holiday accrue in my first year?",
    answer:
      "In the first year of a job, many employers let you build up leave monthly — roughly one twelfth of your annual entitlement for each month worked. This calculator shows the amount accrued for the months you enter.",
  },
  {
    question: "Do part-time workers get less holiday?",
    answer:
      "They get the same 5.6 weeks, but because a week is fewer days, the number of days is lower. A part-time worker should not be treated less favourably than a comparable full-time worker on a pro-rata basis.",
  },
  {
    question: "What happens to unused holiday when I leave?",
    answer:
      "You are normally entitled to be paid for any statutory holiday you have accrued but not taken by your leaving date. Your final pay should include this as holiday pay.",
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
        calculator={<HolidayEntitlementCalculator />}
        source={HOLIDAY_SOURCE}
        verifiedDate={UK_HOLIDAY.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How UK statutory holiday works</h2>
            <p>
              Under the Working Time Regulations 1998, almost every worker in the UK is entitled to{" "}
              <strong>5.6 weeks of paid annual leave</strong> each year. The figure is expressed in
              weeks rather than days on purpose: it scales to whatever pattern you work. Multiply the
              days you work each week by 5.6 and you have your entitlement in days — which is exactly
              what this calculator does.
            </p>
            <p>
              For a five-day week that comes to 28 days, and the law caps the statutory minimum at 28
              days, so working a sixth or seventh day does not add more. Work four days a week and
              you are entitled to 22.4 days; three days gives 16.8. Part-time staff receive the same
              5.6 weeks as full-time colleagues — the number of days is simply lower because a week
              is shorter. An employer can choose to count bank holidays towards this minimum, so
              check whether your contract treats them as included or as extra.
            </p>
            <p>
              In your first year, leave often accrues month by month, at roughly a twelfth of the
              annual total for each month worked. Enter the months you have completed to see the
              amount built up so far, and download the PDF summary to keep a record for a holiday
              request or a final-pay calculation when you leave.
            </p>
          </>
        }
      />
    </>
  );
}
