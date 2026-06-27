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
      "You normally need 26 weeks' continuous employment by the week you are matched with a child, average weekly earnings of at least £129, and the right notice and evidence — including the matching certificate from the adoption agency.",
  },
  {
    question: "Is adoption pay taxed?",
    answer:
      "Yes. Statutory Adoption Pay is paid through payroll and is subject to income tax and National Insurance deductions in the normal way.",
  },
  {
    question: "Can both adoptive parents claim SAP at the same time?",
    answer:
      "No. Only one person in a couple can claim SAP. The other can take Statutory Paternity Leave (and SPP if eligible) or opt into Shared Parental Leave to share the remaining leave weeks.",
  },
  {
    question: "Does SAP apply to overseas adoption?",
    answer:
      "Yes, but the rules on when leave can start differ. For domestic UK adoptions, leave can begin up to 14 days before placement. For overseas adoption, leave can start either when you arrive in Great Britain with the child or when the child arrives in Great Britain, whichever is earlier.",
  },
  {
    question: "Can my employer reclaim SAP from HMRC?",
    answer:
      "Yes. Most employers recover 92% of SAP paid by deducting it from their PAYE liability. Small Employers Relief allows smaller employers (annual NI bill of £45,000 or less) to recover 103%, covering the employer's NI cost on the payment.",
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
              entitlement covers up to 39 weeks of pay, running alongside up to 52 weeks of
              Statutory Adoption Leave.
            </p>
            <p>
              Your AWE is calculated from your gross earnings in the eight weeks (or two months) up
              to and including the week you are matched with a child — called the{" "}
              <strong>matching week</strong>. For monthly-paid employees, your employer takes two
              months&apos; gross pay and divides by two to arrive at a weekly figure. Irregular
              earnings and bonuses paid in that period count toward AWE; Statutory Sick Pay and
              other statutory payments do not.
            </p>
            <p>
              To qualify for SAP you normally need: 26 weeks&apos; continuous employment with the
              same employer by the end of the matching week; average weekly earnings of at least £
              {UK_SAP.lowerEarningsLimit} per week ({UK_SAP.taxYear}); written notice to your
              employer within 7 days of being matched (or as soon as reasonably practicable); and
              the matching certificate from the adoption agency as documentary evidence. Only one
              person in a couple can claim SAP — the other may take Statutory Paternity Leave or
              opt into Shared Parental Leave.
            </p>
            <h2>When adoption leave and pay can start</h2>
            <p>
              For UK domestic adoption, leave can start on the date of placement or up to 14 days
              before the expected placement date — you choose the start date when you give notice.
              For intercountry (overseas) adoption, leave can begin either when you arrive in Great
              Britain with the child or when the child arrives in Great Britain — whichever is
              earlier. If placement is delayed, you can change the agreed start date provided you
              give your employer 28 days&apos; notice of the revised date (unless that is not
              reasonably practicable).
            </p>
            <p>
              Adoption leave and pay cover one child per adoption even if you adopt a sibling group
              simultaneously. The 39-week SAP period runs continuously — it does not pause during
              any period the child is in hospital. If the placement falls through after SAP has
              started, pay stops 8 weeks after the disruption.
            </p>
            <h2>Employer reclaim and enhanced adoption pay</h2>
            <p>
              SAP is paid through your regular payroll and is subject to income tax and National
              Insurance in the normal way. Employers reclaim most of what they pay out: standard
              reclaim is 92% of SAP paid; small employers (annual Class 1 NI liability of £45,000
              or less in the prior tax year) recover 103% under Small Employers Relief. Reclaim is
              made by offsetting the amount against monthly PAYE payments to HMRC.
            </p>
            <p>
              Many employers offer enhanced adoption pay that matches or exceeds enhanced maternity
              pay — often at full pay for some weeks, then dropping to the statutory rate. Your
              contract or staff handbook will specify the enhanced rate and any conditions (minimum
              service, return-to-work period, claw-back clause). Use this calculator&apos;s output
              as the statutory floor when comparing your contract entitlements or planning finances
              for the adoption period.
            </p>
          </>
        }
      />
    </>
  );
}
