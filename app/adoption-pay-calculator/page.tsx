import { ToolLayout } from "@/components/ToolLayout";
import { AdoptionPayCalculator } from "@/components/calculators/AdoptionPayCalculator";
import { ADOPTION_SOURCE } from "@/lib/calculators/adoptionPay";
import { getTool } from "@/data/tools";
import { UK_SAP } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("adoption-pay-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How much is Statutory Adoption Pay?",
    answer:
      "SAP is paid for up to 39 weeks: 90% of average weekly earnings for 6 weeks, then the lower of £194.32 a week or 90% of earnings for 33 weeks.",
  },
  {
    question: "Do I qualify for Statutory Adoption Pay?",
    answer:
      "You normally need 26 weeks' continuous employment by the week you are matched with a child, average weekly earnings of at least £129, and the right notice and evidence.",
  },
  {
    question: "Is adoption pay taxed?",
    answer:
      "Yes. Statutory Adoption Pay is paid through payroll and is subject to income tax and National Insurance.",
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
        calculator={<AdoptionPayCalculator />}
        source={ADOPTION_SOURCE}
        verifiedDate={UK_SAP.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How Statutory Adoption Pay is calculated</h2>
            <p>
              Statutory Adoption Pay (SAP) mirrors the payment structure of Statutory Maternity Pay.
              For the first six weeks you receive 90% of your average weekly earnings (AWE) with no
              cap. For the remaining 33 weeks the weekly amount is the lower of the statutory rate
              (£{UK_SAP.standardWeeklyRate} for {UK_SAP.taxYear}) or 90% of your AWE. The total
              entitlement covers up to 39 weeks.
            </p>
            <p>
              Your AWE is based on your gross earnings in the eight weeks (or two months) up to and
              including the week you are matched with a child — the <strong>matching week</strong>.
              To qualify, you normally need 26 weeks&apos; continuous employment with the same employer
              by the matching week, average weekly earnings of at least £{UK_SAP.lowerEarningsLimit}{" "}
              ({UK_SAP.taxYear}), and you must give your employer written notice with the matching
              certificate as evidence. Only one adopter in a couple can claim SAP; the other may be
              able to claim Statutory Paternity Pay or take Shared Parental Leave instead.
            </p>
            <p>
              SAP is paid through your regular payroll, so income tax and National Insurance are
              deducted in the usual way. Employers reclaim most of the statutory amount from HMRC.
              Adoption leave can start from the date of placement (or up to 14 days before, for UK
              adoptions). If you are adopting from overseas, the rules on when leave can begin
              differ slightly — check GOV.UK for the current guidance.
            </p>
            <p>
              Many employers offer enhanced adoption pay that matches or exceeds enhanced maternity
              pay. Your contract or staff handbook should specify the enhanced rate and any service
              or return-to-work conditions. Use this calculator&apos;s result as the statutory minimum
              when planning your finances.
            </p>
          </>
        }
      />
    </>
  );
}
