import { ToolLayout } from "@/components/ToolLayout";
import { AuNoticePeriodCalculator } from "@/components/calculators/AuNoticePeriodCalculator";
import { AU_NOTICE_SOURCE } from "@/lib/calculators/auNoticePeriod";
import { getTool } from "@/data/tools";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("au-notice-period-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: "Australia Notice Period Calculator — Fair Work Act 2009", description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "What is the minimum notice an employer must give in Australia?",
    answer:
      "Under the Fair Work Act 2009 (s.117), the minimum notice period depends on your length of continuous service: less than 1 year — 1 week; 1–3 years — 2 weeks; 3–5 years — 3 weeks; 5+ years — 4 weeks. If you are over 45 and have completed at least 2 years of continuous service, you are entitled to an additional 1 week.",
  },
  {
    question: "Does my employer have to give me the notice or can they pay me instead?",
    answer:
      "Your employer can either require you to work your notice period or pay you in lieu of notice (PILON). If paid in lieu, the payment must be at least equal to your full base rate of pay for the notice period (plus any other entitlements you would have received had you worked). Some modern awards and enterprise agreements require more.",
  },
  {
    question: "Does this notice period apply to all Australian workers?",
    answer:
      "The Fair Work Act minimum notice applies to national system employees — most private sector employees in Australia. Some workers are covered by state industrial relations systems (notably in WA for non-constitutional corporations) and may have different rules. Workers covered by a modern award or enterprise agreement may be entitled to longer notice periods than the statutory minimum.",
  },
  {
    question: "Can my employer dismiss me without notice?",
    answer:
      "Yes, if there is serious misconduct (serious and wilful misconduct, theft, fraud, assault, or a serious safety breach) — your employer can dismiss you without notice (summary dismissal). However, if the employer cannot demonstrate genuine serious misconduct, summary dismissal may be an unfair dismissal, entitling you to claim at the Fair Work Commission.",
  },
  {
    question: "What notice do I need to give my employer when I resign?",
    answer:
      "There is no statutory minimum notice an employee must give on resignation — it is governed by your employment contract or modern award. Most contracts specify 2–4 weeks. If you resign without giving the required notice, your employer may withhold pay for the unworked notice period (if the contract permits) or pursue a breach of contract claim, though this is uncommon in practice.",
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
        calculator={<AuNoticePeriodCalculator />}
        source={AU_NOTICE_SOURCE}
        verifiedDate="2025-01-01"
        faqs={faqs}
        contentBlock={
          <>
            <h2>How the Fair Work Act notice period works</h2>
            <p>
              The <strong>Fair Work Act 2009 (Cth) s.117</strong> sets the minimum notice an employer
              must give before terminating an employee's employment (other than for serious misconduct).
              The entitlement is based solely on your length of continuous service with that employer —
              not your age, occupation, or pay level (except for the over-45 bonus week).
            </p>
            <h2>Over-45 additional notice</h2>
            <p>
              Employees who are over 45 years old <em>and</em> have completed at least 2 years of
              continuous service with the employer are entitled to 1 additional week of notice on
              top of the standard entitlement. This is a cumulative total — for example, a 46-year-old
              with 4 years of service gets 3 weeks (standard) + 1 week (over-45) = 4 weeks total.
            </p>
            <h2>Notice periods under modern awards and enterprise agreements</h2>
            <p>
              The Fair Work Act sets a floor. Your modern award or enterprise agreement may provide
              a longer notice period — for example, some awards specify 4 weeks for certain classifications.
              Your individual employment contract may also provide more. You are entitled to whichever
              is highest: the statutory minimum, the award, or the contract.
            </p>
          </>
        }
      />
    </>
  );
}
