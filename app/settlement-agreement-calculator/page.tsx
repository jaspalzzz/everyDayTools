import { ToolLayout } from "@/components/ToolLayout";
import { SettlementCalculator } from "@/components/calculators/SettlementCalculator";
import { SETTLEMENT_SOURCE } from "@/lib/calculators/settlementAgreement";
import { getTool } from "@/data/tools";
import { UK_SETTLEMENT } from "@/lib/rates";
import { SITE, breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webApplicationSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const tool = getTool("settlement-agreement-calculator")!;
const url = `${SITE.url}/${tool.slug}`;

export const metadata = toolMetadata({ title: tool.name, description: tool.description, url, slug: tool.slug });

const faqs: FaqItem[] = [
  {
    question: "What is a settlement agreement?",
    answer:
      "A settlement agreement (formerly called a compromise agreement) is a legally binding contract between an employer and employee that resolves an employment dispute or ends employment. In exchange for a payment, you waive your right to bring (or continue) Employment Tribunal claims. It must be in writing, and you must have received independent legal advice from a qualified adviser before signing — otherwise it is not legally valid.",
  },
  {
    question: "How is a settlement agreement value calculated?",
    answer:
      "A settlement agreement typically includes three elements: your statutory entitlements (redundancy pay and notice pay), an ex gratia payment to compensate for your claims, and a contribution to your legal fees (usually £500–£1,500). The ex gratia element is negotiated and reflects the strength of your potential claim, the cost of Tribunal proceedings, and your employer's risk appetite. Stronger claims (particularly discrimination claims, which are uncapped at Tribunal) attract larger ex gratia payments.",
  },
  {
    question: "Is a settlement agreement taxable?",
    answer:
      "The first £30,000 of a total termination payment (including statutory redundancy pay, ex gratia, and enhanced notice pay) is tax-free. Amounts above £30,000 are subject to income tax at your marginal rate but not employee National Insurance. Pay in lieu of notice (PILON) is always fully taxable regardless of the £30,000 threshold. Your employer usually deducts tax on the taxable portion before paying you.",
  },
  {
    question: "Do I need a solicitor to sign a settlement agreement?",
    answer:
      "Yes — by law. A settlement agreement is only legally binding if you have received independent legal advice from a qualified adviser (usually a solicitor or trade union rep) who has a practising certificate and professional liability insurance. Your employer will normally contribute £500–£1,500 towards your legal fees for this advice. You are not obliged to sign the agreement, and taking advice does not commit you to accepting it.",
  },
  {
    question: "Can I negotiate a settlement agreement?",
    answer:
      "Yes. The initial offer from your employer is rarely their final position. Common negotiating points include the ex gratia payment, the wording of the reference, garden leave or immediate departure, and the scope of the claims being waived. Settlement discussions take place under 'without prejudice' privilege — meaning they cannot be used against you at Tribunal if negotiations break down. Your solicitor can negotiate on your behalf.",
  },
  {
    question: "What happens if I refuse to sign?",
    answer:
      "If you do not sign, the employment relationship continues (if you are still employed) or you retain the right to bring Tribunal claims. Refusing to sign does not automatically mean you will lose your job — though if your employer has already started a dismissal process, that process will continue independently. 'Without prejudice' conversations cannot normally be used in evidence against you.",
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
        calculator={<SettlementCalculator />}
        source={SETTLEMENT_SOURCE}
        verifiedDate={UK_SETTLEMENT.effectiveDate}
        faqs={faqs}
        contentBlock={
          <>
            <h2>How settlement agreement values are calculated</h2>
            <p>
              A settlement agreement is not a fixed formula — it is a negotiated outcome. But every
              settlement has a <strong>statutory floor</strong>: the legal minimum your employer must
              pay regardless of whether you sign anything. That floor includes your statutory
              redundancy pay (if you are being made redundant and have 2+ years&apos; service) and
              your notice pay (PILON — pay in lieu of notice for your statutory minimum notice
              period). These figures are non-negotiable; the rest is.
            </p>
            <p>
              The <strong>ex gratia payment</strong> is the negotiated element — compensation for
              the claims you are agreeing to waive. Employers pay it because Tribunal claims are
              expensive, slow, and unpredictable. For unfair dismissal, the typical ex gratia
              reflects 2–4 months&apos; salary. Discrimination claims attract significantly more
              because compensation is uncapped at Tribunal — a motivated claimant with good evidence
              can recover full financial loss and injury to feelings, which changes the employer&apos;s
              risk calculation entirely.
            </p>
            <p>
              The <strong>£30,000 tax-free threshold</strong> applies to the total termination
              payment (redundancy + ex gratia combined). Statutory redundancy pay and ex gratia
              payments within this limit are paid gross. Any amount over £30,000 is subject to income
              tax at your marginal rate — though not employee National Insurance. Pay in lieu of
              notice sits outside this exemption and is always taxable.
            </p>
            <p>
              This calculator gives you a range — floor, typical, and strong-claim values — so you
              can enter negotiations informed. Use the PDF export as a private reference during
              discussions. Always take independent legal advice before signing.
            </p>
          </>
        }
      />
    </>
  );
}
