import { ToolLayout } from "@/components/ToolLayout";
import { ContinuousServiceCalculator } from "@/components/calculators/ContinuousServiceCalculator";
import { CONTINUOUS_SERVICE_SOURCE } from "@/lib/calculators/continuousService";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("continuous-service-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "How is continuous employment calculated in the UK?",
    answer: "Continuous employment normally runs from your legal start date to the date being checked. Complete calendar years matter for rights such as redundancy pay. Employment Rights Act 1996 sections 210–219 explain when weeks count and when continuity can survive an absence or temporary break.",
  },
  {
    question: "Does a TUPE transfer reset my continuous service?",
    answer: "Normally no. On a protected TUPE transfer, the new employer generally inherits the employment contract and the original continuous-employment start date. Check the transfer documents and raise any incorrect reset date promptly.",
  },
  {
    question: "Do maternity leave and sick leave count as continuous employment?",
    answer: "Authorised statutory leave and many periods of sickness normally preserve the employment relationship, so the calendar service continues. The detailed result can depend on employment status and the reason for any break, so check the statutory continuity rules for unusual gaps.",
  },
  {
    question: "How much continuous service is needed for redundancy pay?",
    answer: "UK statutory redundancy pay normally requires at least two years of continuous employment as an employee. Other conditions still apply, including that the dismissal is genuinely by reason of redundancy.",
  },
  {
    question: "How much service is needed for statutory notice?",
    answer: "An employee normally becomes entitled to at least one week of statutory notice after one month of continuous employment. The minimum then rises with complete years of service, up to 12 weeks, subject to the contract and statutory rules.",
  },
  {
    question: "Can a break between contracts preserve continuous employment?",
    answer: "Sometimes. Certain temporary cessations, arrangements or statutory absences can preserve continuity, while other breaks may interrupt it. This calculator measures elapsed calendar time and cannot decide whether a disputed break legally counts.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(tool.name, url))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webApplicationSchema({ name: tool.name, description: tool.description, url, region: tool.region }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <ToolLayout
        tool={tool}
        calculator={<ContinuousServiceCalculator />}
        source={CONTINUOUS_SERVICE_SOURCE}
        verifiedDate="2026-07-13"
        faqs={faqs}
        contentBlock={
          <>
            <h2>Measuring continuous employment correctly</h2>
            <p>
              Continuous employment is the legal service period used for several UK employment
              rights. The starting point is usually the date your employment with the employer began,
              not the date you moved role, changed hours or received a replacement contract. Enter
              that date and the leaving or review date to see the complete calendar years, elapsed
              weeks and the dates of the common one-month and two-year thresholds.
            </p>
            <p>
              Calendar arithmetic is only the first step. The Employment Rights Act contains rules
              that can preserve continuity during sickness, statutory leave, temporary cessations of
              work and some arrangements where no work is performed. A TUPE transfer also normally
              carries the original start date to the incoming employer. Conversely, a genuine break
              that is not protected may interrupt the chain. Keep contracts, payslips, transfer
              letters and absence records if the start date is disputed.
            </p>
            <p>
              The highlighted thresholds are signposts, not automatic findings of entitlement. Two
              years is commonly relevant to statutory redundancy pay and ordinary unfair-dismissal
              protection, while one month is relevant to statutory notice. Employment status, the
              reason employment ended, special day-one protections and contract terms can all change
              the answer. Use the downloadable worksheet to record the dates, then confirm any
              disputed continuity with your employer, ACAS or an employment adviser.
            </p>
          </>
        }
      />
    </>
  );
}
