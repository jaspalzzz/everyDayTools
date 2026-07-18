import type { Metadata } from "next";
import { GuideArticleLayout } from "@/components/guides/GuideArticleLayout";
import { SITE, clampMetaDescription } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const slug = "us-final-paycheck-late";
const title = "Final Paycheck Late? What US Workers Can Do in 2026";
const description =
  "A state-aware action plan for a missing or late final paycheck: identify the deadline, preserve payroll evidence, send a written demand, and choose the correct labor agency.";
const url = `${SITE.url}/guides/${slug}`;

export const metadata: Metadata = {
  title,
  description: clampMetaDescription(description),
  alternates: { canonical: url },
  openGraph: { title, description: clampMetaDescription(description), url, type: "article" },
};

const faqs: FaqItem[] = [
  {
    question: "Does federal law require an immediate final paycheck?",
    answer:
      "No. The US Department of Labor says federal law does not require an immediate final paycheck. State law may impose an earlier deadline. If the regular payday for the final pay period has passed and wages remain unpaid, the Department recommends contacting its Wage and Hour Division or the relevant state labor department.",
  },
  {
    question: "Does the deadline change if I was fired instead of resigning?",
    answer:
      "Often. Some states use different deadlines for a discharge, resignation with notice, and resignation without notice. Record how employment ended and the exact date before checking the state rule.",
  },
  {
    question: "Must unused PTO be included in my final paycheck?",
    answer:
      "It depends on state law and the employer's written policy. Some states treat earned vacation as wages, while others generally enforce the employer's policy. Check the PTO rule separately from the final-wage deadline.",
  },
  {
    question: "What evidence should I keep?",
    answer:
      "Keep the offer letter or contract, handbook and PTO policy, time records, schedules, commission plan, recent pay stubs, separation notice, bank statements, and every message about final pay. Save copies outside an employer-controlled account.",
  },
  {
    question: "Should I contact the federal or state labor department?",
    answer:
      "Use the agency that enforces the right involved. State final-pay deadlines and state penalties usually go to the state labor agency. Federal minimum-wage or overtime underpayments may also fall within the US Department of Labor Wage and Hour Division's jurisdiction.",
  },
  {
    question: "Can an employer hold my whole paycheck until I return equipment?",
    answer:
      "An employer should not assume it can withhold all earned wages. Deduction rules vary by state and federal law restricts deductions that cut covered pay below required minimum wage or overtime. Document the equipment return and ask for any proposed deduction in writing.",
  },
];

export default function USFinalPaycheckLateGuide() {
  return (
    <GuideArticleLayout
      slug={slug}
      title={title}
      description={description}
      country="US"
      category="Leaving a Job"
      datePublished="2026-07-18"
      dateModified="2026-07-18"
      sourceLabel="US Department of Labor — Last Paycheck"
      legalTopic="US final paycheck deadlines and unpaid wages"
      quickAnswer="Start with state law, not a single nationwide deadline. Federal law does not require immediate final payment, but states can require payment on discharge, within a set number of days, or by the next regular payday. Record how the job ended, calculate the state deadline, preserve your evidence, and make a dated written demand before filing with the appropriate labor agency."
      actions={[
        {
          label: "Check your final-pay deadline",
          href: "/final-paycheck-deadline-calculator",
          description: "Select your state and how employment ended.",
        },
        {
          label: "Check unused PTO separately",
          href: "/pto-payout-calculator",
          description: "PTO payout and wage-payment timing are different rules.",
        },
      ]}
      relatedLinks={[
        { label: "US final-paycheck law dataset", href: "/research/us-final-paycheck-laws" },
        { label: "Was my final paycheck late?", href: "/us/final-paycheck/was-my-final-paycheck-late" },
        { label: "Employer deduction checker", href: "/us/final-paycheck/employer-deduction-checker" },
      ]}
      faqs={faqs}
      sources={[
        {
          label: "US Department of Labor — Last Paycheck",
          href: "https://www.dol.gov/general/topic/wages/lastpaycheck",
          detail: "Federal baseline and direction to contact WHD or a state labor department after the regular payday passes. Checked 18 July 2026.",
        },
        {
          label: "US Department of Labor — State Labor Offices",
          href: "https://www.dol.gov/agencies/whd/state/contacts",
          detail: "Official directory for state wage-enforcement contacts. Checked 18 July 2026.",
        },
        {
          label: "US Department of Labor — How to File a Complaint",
          href: "https://www.dol.gov/agencies/whd/contact/complaints",
          detail: "Wage and Hour Division complaint process for covered federal wage claims. Checked 18 July 2026.",
        },
      ]}
    >
      <section>
        <h2>Step 1: identify the rule that applies</h2>
        <p>
          There is no single US deadline that answers every final-paycheck dispute. The US
          Department of Labor states that federal law does not require employers to pay former
          employees immediately. State law can be stricter, and several states distinguish between
          an employee who was discharged and one who resigned.
        </p>
        <p>
          Write down your work state, final day, whether you quit or were discharged, whether you
          gave advance notice, and the next scheduled payday. Those facts determine which deadline
          row to use. Do not rely only on the location of company headquarters; the law of the state
          where you worked will usually be the starting point.
        </p>
      </section>

      <section>
        <h2>Step 2: separate each amount you may be owed</h2>
        <p>A final payment can contain several legally distinct amounts:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>regular wages for all hours worked through the final day;</li>
          <li>overtime already earned under federal or state law;</li>
          <li>commissions or bonuses that have become earned under the plan and applicable law;</li>
          <li>unused vacation or PTO where state law or the employer's policy requires payout;</li>
          <li>expense reimbursements or other contractual amounts; and</li>
          <li>an itemized explanation of lawful deductions.</li>
        </ul>
        <p>
          Calculate each line separately. A correct base-wage payment does not resolve an unpaid
          commission or PTO claim, and a PTO dispute does not extend the deadline for undisputed
          earned wages.
        </p>
      </section>

      <section>
        <h2>Step 3: build a clean evidence file</h2>
        <p>
          Save documents before access to company systems disappears. Download pay stubs, time
          sheets, schedules, commission reports, the handbook, PTO policy, and your separation
          notice. Keep bank records showing that payment was not received. If a manager gave a
          payment date verbally, send a neutral follow-up email confirming what was said.
        </p>
        <p>
          Your calculation should show the pay period, hours, rate, overtime, earned commission,
          PTO balance, deductions, amount paid, and balance claimed. A short, checkable worksheet is
          more persuasive than a demand that gives only a total.
        </p>
      </section>

      <section>
        <h2>Step 4: send a dated written demand</h2>
        <p>
          State the employment end date, the applicable deadline, the amounts missing, and the
          official source you used. Attach supporting records, request an itemized response, and set
          a reasonable written-response date. Keep the tone factual and send the message through a
          channel you can preserve.
        </p>
        <div className="rounded-lg border border-surface-line bg-surface-muted p-4 text-xs">
          <strong className="text-ink">Useful structure:</strong> “My employment ended on [date].
          Based on [state rule/source], my final wages were due on [date]. My records show [hours or
          other amount] remains unpaid. Please provide payment and an itemized wage statement, or
          explain any difference in writing.”
        </div>
      </section>

      <section>
        <h2>Step 5: choose the correct enforcement route</h2>
        <p>
          State labor departments usually enforce state final-pay deadlines and state waiting-time
          or wage penalties. The federal Wage and Hour Division handles covered federal minimum-wage
          and overtime violations. Depending on the state and the amount, small claims court, a
          civil wage action, arbitration, or another contract remedy may also exist.
        </p>
        <p>
          Filing limits, penalty rules, and available attorney-fee awards vary. Do not delay while
          waiting for an informal promise if a filing deadline may be running. A labor agency or
          licensed local attorney can confirm the route for your facts.
        </p>
      </section>

      <section>
        <h2>Common mistakes that weaken a final-pay claim</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>using the next-payday federal baseline when state law requires earlier payment;</li>
          <li>assuming discharge and resignation have the same deadline;</li>
          <li>combining wages, PTO, commission and expenses without showing the calculation;</li>
          <li>sending evidence only from a work email account that is later disabled; and</li>
          <li>signing a release without checking which wage claims it covers.</li>
        </ul>
      </section>
    </GuideArticleLayout>
  );
}
