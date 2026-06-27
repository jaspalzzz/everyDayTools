import Link from "next/link";

export default function UkRedundancyPayGuide2026() {
  return (
    <>
      <h2>What is statutory redundancy pay?</h2>
      <p>
        Statutory redundancy pay is a lump-sum payment your employer is legally required to make when
        they dismiss you by reason of redundancy, and you have at least 2 years of continuous employment.
        It is a right set by the <strong>Employment Rights Act 1996 (s.135–s.154)</strong> and cannot be
        contracted out of — even if your employment contract says otherwise.
      </p>
      <p>
        The amount is calculated using a fixed formula based on three things: your <strong>age</strong>,
        your <strong>length of continuous service</strong> (capped at 20 years), and your{" "}
        <strong>weekly pay</strong> (capped at £643 for 2025/26). The maximum statutory payment is
        therefore £22,530. Many employers pay more (enhanced redundancy pay) — the statutory amount is
        the legal minimum, not the target.
      </p>

      <h2>Who qualifies for redundancy pay?</h2>
      <p>To receive statutory redundancy pay in the UK, you must:</p>
      <ul>
        <li>Be an <strong>employee</strong> (not a worker or self-employed contractor)</li>
        <li>Have at least <strong>2 years of continuous employment</strong> with the same employer</li>
        <li>Have been dismissed by reason of <strong>redundancy</strong></li>
        <li>Not have unreasonably refused a suitable alternative role offered by your employer</li>
      </ul>
      <p>
        Your employer cannot make you redundant and then immediately hire someone else to do the same
        job — that is not a genuine redundancy and may be unfair dismissal. A genuine redundancy means the
        business need for your role has diminished or ceased, or the workplace is closing.
      </p>

      <h2>How is statutory redundancy pay calculated?</h2>
      <p>The formula multiplies three factors:</p>
      <ul>
        <li><strong>Service years under age 22:</strong> 0.5 week's pay per complete year</li>
        <li><strong>Service years aged 22–40:</strong> 1 week's pay per complete year</li>
        <li><strong>Service years aged 41 or over:</strong> 1.5 week's pay per complete year</li>
      </ul>
      <p>
        Only the last 20 years of service count. Weekly pay is capped at £643 (2025/26 — reviewed
        annually each April 6). The maximum payment is therefore 20 years × 1.5 × £643 = £19,290
        for service entirely after age 41, or £643 × 30 × 0.5 / 1 = up to £22,530 across age bands.
      </p>

      <div className="my-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
        <p className="font-semibold text-brand-700 mb-2">Quick example</p>
        <p className="text-sm">
          Age 45, 8 years of service, weekly pay £800 (capped to £643):<br />
          Years aged 22–40: 7 years × £643 × 1.0 = £4,501<br />
          Years aged 41–45: 1 year × £643 × 1.5 = £964.50<br />
          <strong>Total: £5,465.50</strong>
        </p>
        <Link href="/redundancy-pay-calculator" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
          Calculate your exact entitlement →
        </Link>
      </div>

      <h2>Is redundancy pay taxable?</h2>
      <p>
        The first <strong>£30,000</strong> of total qualifying termination payments is free of income
        tax. Statutory redundancy pay counts toward this threshold, as does any enhanced (ex gratia)
        redundancy pay. The £30,000 exemption applies to the combined total — if you receive £15,000
        statutory pay and £20,000 enhanced pay, £5,000 is taxable.
      </p>
      <p>
        Importantly, <strong>notice pay is excluded</strong> from the £30,000 exemption. Pay in lieu
        of notice (PILON) is always fully taxable as earnings and subject to income tax and National
        Insurance, regardless of whether it is contractual or non-contractual.
      </p>

      <h2>What if your employer refuses to pay?</h2>
      <p>
        If your employer is insolvent or simply refuses to pay, you have options:
      </p>
      <ul>
        <li>
          <strong>Employment Tribunal:</strong> You have 6 months from the effective date of termination
          (the date your employment ended) to bring a tribunal claim for unpaid redundancy pay.
        </li>
        <li>
          <strong>Insolvency Service (National Insurance Fund):</strong> If your employer is insolvent,
          you can apply directly to the government to pay your statutory redundancy entitlement via the
          Redundant Employees Lump Sum Payments Scheme.
        </li>
        <li>
          <strong>ACAS early conciliation:</strong> Before filing a tribunal claim, you must contact
          ACAS to attempt early conciliation — this is mandatory and often resolves disputes faster
          than formal proceedings.
        </li>
      </ul>

      <h2>Collective redundancy: when 20 or more people are affected</h2>
      <p>
        If your employer proposes to make 20 or more employees redundant at the same establishment
        within 90 days, additional rules apply:
      </p>
      <ul>
        <li>
          <strong>20–99 redundancies:</strong> employer must begin collective consultation at least
          30 days before the first dismissal
        </li>
        <li>
          <strong>100+ redundancies:</strong> minimum 45-day consultation period
        </li>
        <li>
          The employer must also notify the Insolvency Service via a <strong>HR1 form</strong>
        </li>
      </ul>
      <p>
        Failure to collectively consult entitles each affected employee to a <strong>protective
        award</strong> of up to 90 days' pay — awarded by the Employment Tribunal.
      </p>

      <h2>Redundancy vs dismissal: what is the difference?</h2>
      <p>
        Redundancy is a specific type of dismissal defined in the Employment Rights Act 1996 (s.139).
        A dismissal is a redundancy only if it is caused by:
      </p>
      <ul>
        <li>The employer ceasing to carry on the business</li>
        <li>The employer ceasing to carry on the business at the place where the employee was employed</li>
        <li>The requirement for employees to carry out a particular kind of work having diminished or ceased</li>
      </ul>
      <p>
        If your employer dismisses you for conduct or performance while calling it a "redundancy," that
        is likely unfair dismissal — not a genuine redundancy. The selection process must also be fair:
        employers must not use discriminatory criteria (age, sex, pregnancy) for selection.
      </p>

      <h2>Key checklist before accepting redundancy</h2>
      <ul>
        <li>Confirm you have been formally placed at risk and given notice of the proposed redundancy</li>
        <li>Check your contract for any enhanced redundancy provisions</li>
        <li>Calculate your statutory entitlement using the official formula</li>
        <li>Ask for the selection criteria in writing and challenge any that seem unfair</li>
        <li>Explore whether suitable alternative roles exist within the organisation</li>
        <li>Consider consulting an employment solicitor if the package seems low or the process unfair</li>
        <li>Do not sign a settlement agreement without independent legal advice (your employer should pay for this)</li>
      </ul>
    </>
  );
}
