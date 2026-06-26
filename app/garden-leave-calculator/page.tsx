import { ToolLayout } from "@/components/ToolLayout";
import { GardenLeaveCalculator } from "@/components/calculators/GardenLeaveCalculator";
import { GARDEN_LEAVE_SOURCE } from "@/lib/calculators/gardenLeave";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("garden-leave-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "What is garden leave?",
    answer:
      "Garden leave is when your employer asks you to stay away from work during your notice period while keeping you on full pay. You remain employed, so you keep your salary and benefits but do not come into work.",
  },
  {
    question: "Do I get paid during garden leave?",
    answer:
      "Yes. You receive your normal full pay throughout garden leave, because you are still employed. This calculator multiplies your weekly pay by the number of weeks to show the total.",
  },
  {
    question: "Can I start a new job during garden leave?",
    answer:
      "Usually not. Because you are still employed by your current employer, you remain bound by your contract — including any restrictions on working elsewhere or for a competitor — until the garden leave ends.",
  },
  {
    question: "Do I still accrue holiday on garden leave?",
    answer:
      "Generally yes. You normally continue to build up statutory holiday while on garden leave, and your employer may require you to use some of it during the period.",
  },
  {
    question: "How is garden leave different from payment in lieu of notice?",
    answer:
      "On garden leave you stay employed and are paid over time while away from work. With payment in lieu of notice (PILON), your employment ends immediately and you are paid a lump sum instead of working the notice.",
  },
  {
    question: "Is garden leave pay taxed?",
    answer:
      "Yes. Garden leave pay is normal salary, so it is taxed and has deductions like any other pay. The figure shown here is gross, before tax.",
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
        calculator={<GardenLeaveCalculator />}
        source={GARDEN_LEAVE_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How garden leave pay works</h2>
            <p>
              Garden leave is a notice-period arrangement where your employer keeps you on the
              payroll but asks you to stay away from the workplace. You remain employed for the whole
              period, so your <strong>full pay and benefits continue</strong> — you simply do not come
              in. This calculator multiplies your weekly pay by the number of weeks of garden leave to
              show the total you will receive.
            </p>
            <p>
              Employers use garden leave to keep a departing employee — often one heading to a
              competitor — away from clients, colleagues and sensitive information while still under
              contract. The trade-off for you is that, because the employment relationship has not
              ended, you stay <strong>bound by your contract terms</strong>: typically you cannot
              start a new job or work for a competitor until the period is over, and you usually keep
              accruing holiday, some of which your employer may ask you to take during the leave.
            </p>
            <p>
              Garden leave is different from payment in lieu of notice, where the job ends at once and
              you get a lump sum instead. The pay here is ordinary salary and is taxed as normal; the
              figure shown is gross. Download the PDF summary to keep a record of the total for your
              own planning during the notice period.
            </p>
          </>
        }
      />
    </>
  );
}
