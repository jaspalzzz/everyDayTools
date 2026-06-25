import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { UnemploymentCalculator } from "@/components/calculators/UnemploymentCalculator";
import { UNEMPLOYMENT_SOURCE } from "@/lib/calculators/unemployment";
import { getTool } from "@/data/tools";
import { SITE, faqSchema, jsonLd, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("unemployment-benefit-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  alternates: { canonical: url },
};

const faqs: FaqItem[] = [
  {
    question: "How much unemployment benefit will I get?",
    answer:
      "It varies widely by state. Most states pay roughly half your prior weekly wages up to a state maximum — and those caps differ dramatically, from $275 a week in Florida to $869 in New York. This tool estimates your weekly amount from your highest-quarter wages.",
  },
  {
    question: "How is the weekly benefit amount calculated?",
    answer:
      "Most states base it on the wages in your highest-earning quarter of the base period, divided by a set number (often 25 or 26), then capped at the state maximum. Some states use a different basis, which is why this tool currently covers a curated set.",
  },
  {
    question: "How long can I collect unemployment?",
    answer:
      "Typically up to 26 weeks, though it varies. Florida, for example, currently caps benefits at 12 weeks, and some states tie the duration to the statewide jobless rate. The maximum potential total shown multiplies your weekly benefit by your state's maximum weeks.",
  },
  {
    question: "Are unemployment benefits taxable?",
    answer:
      "Yes. Unemployment benefits are taxable income at the federal level and in many states. You can usually choose to have tax withheld from your payments to avoid a bill at tax time.",
  },
  {
    question: "Why might my actual benefit differ from this estimate?",
    answer:
      "This is a simplified estimate from a single figure. Your real benefit depends on your full base-period wages across all quarters, your eligibility, dependents in some states, and any deductions. Always confirm with your state workforce agency.",
  },
  {
    question: "Which states does this calculator cover?",
    answer:
      "It currently covers California, Texas, Florida and New York — states that use a highest-quarter-wage formula with verified benefit caps. More states are being added; others use a different earnings basis that needs separate handling.",
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
        calculator={<UnemploymentCalculator />}
        source={UNEMPLOYMENT_SOURCE}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How unemployment benefits are estimated</h2>
            <p>
              Unemployment insurance in the United States is run state by state, so there is no
              single national formula. What the states share is the basic idea: your weekly benefit
              replaces part of what you used to earn, up to a maximum the state sets. This calculator
              applies the most common approach — taking the wages from your{" "}
              <strong>highest-earning quarter</strong> and dividing by a state-specific number — then
              caps the result at your state&apos;s maximum weekly benefit.
            </p>
            <p>
              The caps are where states differ most. Florida tops out at $275 a week, California at
              $450, while New York raised its maximum to $869 in late 2025 — its first increase in
              years. Duration varies too: most states pay up to 26 weeks, but Florida currently caps
              benefits at 12. Because these figures are uprated periodically, this tool tags each
              with its effective date and covers only the states whose formula and caps could be
              verified against official sources — more are being added rather than guessed at.
            </p>
            <p>
              Treat the result as a planning estimate, not a determination. Your actual benefit
              depends on your full base-period earnings, your eligibility, and state-specific rules
              like dependent allowances. Benefits are also taxable. Download the PDF summary to keep
              a record of the estimate, and confirm the exact figure with your state workforce
              agency when you file.
            </p>
          </>
        }
      />
    </>
  );
}
