import type { Metadata } from "next";
import { GuideArticleLayout } from "@/components/guides/GuideArticleLayout";
import { SITE, clampMetaDescription } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const slug = "uk-severance-vs-redundancy";
const title = "Severance Pay vs Redundancy Pay: UK Guide 2026/27";
const description =
  "Separate statutory redundancy pay from notice pay, enhanced severance, holiday pay and settlement compensation before checking or negotiating an exit package.";
const url = `${SITE.url}/guides/${slug}`;

export const metadata: Metadata = {
  title,
  description: clampMetaDescription(description),
  alternates: { canonical: url },
  openGraph: { title, description: clampMetaDescription(description), url, type: "article" },
};

const faqs: FaqItem[] = [
  {
    question: "Are severance pay and redundancy pay the same in the UK?",
    answer:
      "Not necessarily. Statutory redundancy pay is a defined legal entitlement for eligible employees made redundant. Severance is a broader label often used for an enhanced or negotiated exit payment, sometimes within a settlement agreement.",
  },
  {
    question: "What is the statutory redundancy cap for 2026/27?",
    answer:
      "For redundancies on or after 6 April 2026, weekly pay is capped at £751, service is capped at 20 years, and the maximum statutory redundancy payment is £22,530. The age-weighted formula still applies.",
  },
  {
    question: "Is notice pay included in redundancy pay?",
    answer:
      "No. Notice pay or payment in lieu of notice is a separate entitlement. An exit statement should show it separately from statutory or enhanced redundancy pay.",
  },
  {
    question: "Is the first £30,000 of every exit payment tax free?",
    answer:
      "No. GOV.UK says unpaid wages, holiday pay, bonuses and notice-equivalent payments are taxable earnings. The first combined £30,000 of qualifying statutory redundancy, additional severance or enhanced redundancy, and certain non-cash benefits may usually be tax free.",
  },
  {
    question: "Can an employer offer more than statutory redundancy pay?",
    answer:
      "Yes. A contract, collective agreement, handbook scheme, established practice, or negotiated settlement can provide enhanced redundancy or severance. It should not reduce a statutory entitlement that is already due.",
  },
  {
    question: "Do I need legal advice before signing a settlement agreement?",
    answer:
      "For a UK settlement agreement to validly waive statutory employment claims, the employee must receive advice from a qualifying independent adviser and the agreement must meet statutory requirements. The employer commonly contributes toward that advice.",
  },
];

export default function UKSeveranceVsRedundancyGuide() {
  return (
    <GuideArticleLayout
      slug={slug}
      title={title}
      description={description}
      country="UK"
      category="Leaving a Job"
      datePublished="2026-07-18"
      dateModified="2026-07-18"
      sourceLabel="GOV.UK — Redundancy pay and termination-payment tax"
      legalTopic="UK redundancy pay, severance and termination payments"
      quickAnswer="Statutory redundancy pay is the legal minimum produced by the age-and-service formula. Severance usually means an additional contractual or negotiated payment. Notice pay, unpaid wages, holiday pay and bonuses are separate again. Check every line independently because eligibility, tax treatment and negotiation leverage differ."
      actions={[
        {
          label: "Estimate a severance package",
          href: "/severance-pay-calculator",
          description: "Model contractual or negotiated exit components.",
        },
        {
          label: "Calculate statutory redundancy",
          href: "/redundancy-pay-calculator",
          description: "Apply the official 2026/27 age, service and pay caps.",
        },
      ]}
      relatedLinks={[
        { label: "Side-by-side severance comparison", href: "/compare/severance-vs-redundancy-pay" },
        { label: "Settlement agreement guide", href: "/guides/uk-settlement-agreement" },
        { label: "Notice period law", href: "/guides/uk-notice-period-law" },
      ]}
      faqs={faqs}
      sources={[
        {
          label: "GOV.UK — Statutory redundancy pay",
          href: "https://www.gov.uk/redundancy-your-rights/redundancy-pay",
          detail: "Eligibility, age bands and the £751 weekly cap / £22,530 maximum effective 6 April 2026. Checked 18 July 2026.",
        },
        {
          label: "GOV.UK — Tax on termination payments",
          href: "https://www.gov.uk/termination-payments-and-tax-when-you-leave-a-job/what-you-pay-tax-and-national-insurance-on",
          detail: "Taxable earnings, the combined £30,000 qualifying threshold, PILON and post-employment notice pay. Checked 18 July 2026.",
        },
        {
          label: "Employment Rights Act 1996 — Part XI",
          href: "https://www.legislation.gov.uk/ukpga/1996/18/part/XI",
          detail: "Primary legislation for the statutory right to redundancy payment and calculation framework. Checked 18 July 2026.",
        },
      ]}
    >
      <section>
        <h2>The four payments people commonly combine</h2>
        <p>
          “Severance package” is often used as shorthand for everything paid when employment ends.
          That wording can hide legally different components. Ask for an itemised statement that
          separates at least the following:
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-surface-line">
          <table className="min-w-[620px] w-full text-xs">
            <thead className="bg-surface-muted text-left text-ink">
              <tr>
                <th className="px-3 py-2">Component</th>
                <th className="px-3 py-2">Why it is due</th>
                <th className="px-3 py-2">Typical tax position</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-surface-line">
                <td className="px-3 py-2 font-semibold text-ink">Statutory redundancy</td>
                <td className="px-3 py-2">Legal minimum for eligible redundancy</td>
                <td className="px-3 py-2">Qualifying termination payment</td>
              </tr>
              <tr className="border-t border-surface-line">
                <td className="px-3 py-2 font-semibold text-ink">Enhanced severance</td>
                <td className="px-3 py-2">Contract, policy, custom or negotiation</td>
                <td className="px-3 py-2">May fall within the combined £30,000 threshold</td>
              </tr>
              <tr className="border-t border-surface-line">
                <td className="px-3 py-2 font-semibold text-ink">Notice / PILON</td>
                <td className="px-3 py-2">Contractual or statutory notice entitlement</td>
                <td className="px-3 py-2">Tax and National Insurance as earnings</td>
              </tr>
              <tr className="border-t border-surface-line">
                <td className="px-3 py-2 font-semibold text-ink">Wages, bonus, holiday</td>
                <td className="px-3 py-2">Amounts already earned or accrued</td>
                <td className="px-3 py-2">Normally taxable earnings</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Statutory redundancy pay: the non-negotiable floor</h2>
        <p>
          An employee will normally qualify after two years' continuous service when the role is
          genuinely redundant. The statutory calculation weights each complete service year by the
          employee's age during that year: half a week's pay under 22, one week from 22 to 40, and
          one and a half weeks at 41 or over.
        </p>
        <p>
          For redundancies taking effect on or after <strong>6 April 2026</strong>, GOV.UK caps the
          weekly-pay input at <strong>£751</strong>, counts no more than 20 years, and gives a
          statutory maximum of <strong>£22,530</strong>. These are statutory figures with a stated
          effective date; an enhanced scheme can use actual pay or a more generous multiplier.
        </p>
      </section>

      <section>
        <h2>Severance: the contractual or negotiated layer</h2>
        <p>
          UK legislation does not give “severance pay” one universal formula. Employers use the term
          for enhanced redundancy, an ex-gratia payment, compensation for waiving claims, or the
          whole exit package. Identify the legal reason for each amount before deciding whether the
          offer is fair.
        </p>
        <p>
          Check the employment contract, redundancy policy, collective agreement and previous
          company practice. A settlement offer may also reflect the value and risk of possible
          claims, seniority, restrictive covenants, bonus timing, benefits, references and the
          employer's desire for confidentiality or a clean departure.
        </p>
      </section>

      <section>
        <h2>How the £30,000 tax threshold actually works</h2>
        <p>
          The first £30,000 is not a blanket exemption for everything on the final statement.
          GOV.UK lists unpaid wages, holiday pay, bonuses and payments equivalent to notice as
          taxable earnings. The first combined £30,000 of qualifying statutory redundancy,
          additional severance or enhanced redundancy, and certain non-cash benefits may usually be
          tax free.
        </p>
        <p>
          Payment in lieu of notice and post-employment notice pay remain taxable even if the
          agreement labels them “compensation”. Ask the employer for the proposed tax breakdown and
          obtain professional tax advice where the package is large or includes unusual benefits.
        </p>
      </section>

      <section>
        <h2>A practical way to check an offer</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5">
          <li>Calculate statutory redundancy independently using the correct effective-date cap.</li>
          <li>Calculate contractual notice, then identify whether it will be worked, paid as PILON, or spent on garden leave.</li>
          <li>Add wages, accrued holiday, earned bonus and expenses already due.</li>
          <li>Identify the genuinely additional severance or ex-gratia amount.</li>
          <li>Check tax treatment line by line instead of applying £30,000 to the total.</li>
          <li>List non-cash terms: reference, announcement, legal fees, benefits, shares, confidentiality and restrictions.</li>
        </ol>
      </section>

      <section>
        <h2>When negotiation may be appropriate</h2>
        <p>
          A statutory redundancy calculation is not normally negotiated downward. The enhanced
          layer can be negotiated where the employer wants a settlement agreement or where there is
          uncertainty about consultation, selection, discrimination, notice, bonus, restrictive
          covenants, or another potential claim. Focus on specific evidence rather than asking for
          an arbitrary number.
        </p>
        <p>
          Do not sign under artificial time pressure. A settlement agreement that waives statutory
          employment claims requires advice from a qualifying independent adviser. Ask for the
          proposed agreement, calculation schedule and employer legal-fee contribution in writing.
        </p>
      </section>
    </GuideArticleLayout>
  );
}
