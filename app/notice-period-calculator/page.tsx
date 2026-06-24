import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { NoticePeriodCalculator } from "@/components/calculators/NoticePeriodCalculator";
import { NOTICE_SOURCE } from "@/lib/calculators/noticePeriod";
import { getTool } from "@/data/tools";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("notice-period-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "How much notice is my employer required to give me?",
    answer:
      "In the UK, the statutory minimum is one week's notice once you have been employed for one month, then one week for each complete year of service up to a maximum of 12 weeks. Your contract may give more, in which case the higher figure applies.",
  },
  {
    question: "Can my contract give less notice than the statutory minimum?",
    answer:
      "No. A contract can give more notice than the statutory minimum but never less. If your contract states a shorter period, the statutory minimum still applies.",
  },
  {
    question: "Is the notice I give the same as the notice I receive?",
    answer:
      "Not necessarily. The statutory minimum that your employer must give increases with your length of service, but the notice you must give them is usually a flat one week unless your contract says otherwise.",
  },
  {
    question: "Do I get paid during my notice period?",
    answer:
      "Yes. You are normally entitled to your normal pay throughout your notice period, whether you work it or your employer places you on garden leave or pays in lieu of notice.",
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
        calculator={<NoticePeriodCalculator />}
        source={NOTICE_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>Statutory vs contractual notice</h2>
            <p>
              Your notice period is whichever is greater: the <strong>statutory minimum</strong>{" "}
              set by law, or the <strong>contractual notice</strong> written into your employment
              contract. This calculator works out both and shows you which one applies, for the UK
              and for Canada&apos;s Ontario baseline.
            </p>
            <p>
              In the UK, the statutory minimum your employer must give you starts at one week after
              a month of employment, then rises by one week for every complete year you have worked,
              up to a ceiling of twelve weeks at twelve years&apos; service. A contract can improve
              on this but can never undercut it. In Canada, provincial employment-standards rules
              set a comparable sliding scale, commonly one week per year up to eight weeks.
            </p>
            <p>
              Knowing your correct notice matters whether you are resigning or being let go — it
              affects your final pay, your leaving date and any payment in lieu. Download the PDF to
              keep a dated record of the figures.
            </p>
          </>
        }
      />
    </>
  );
}
