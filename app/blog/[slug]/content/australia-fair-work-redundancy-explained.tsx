import Link from "next/link";

export default function AustraliaFairWorkRedundancyExplained() {
  const scale = [
    { years: "1 to 2", weeks: 4 },
    { years: "2 to 3", weeks: 6 },
    { years: "3 to 4", weeks: 7 },
    { years: "4 to 5", weeks: 8 },
    { years: "5 to 6", weeks: 10 },
    { years: "6 to 7", weeks: 11 },
    { years: "7 to 8", weeks: 13 },
    { years: "8 to 9", weeks: 14 },
    { years: "9 to 10", weeks: 16 },
    { years: "10+", weeks: 12 },
  ];

  return (
    <>
      <h2>What is redundancy pay under the Fair Work Act?</h2>
      <p>
        Redundancy pay in Australia is governed by the <strong>National Employment Standards (NES)</strong>,
        specifically Division 11 of Part 2-2 of the Fair Work Act 2009 (Cth). It is a lump-sum payment
        your employer must make when your position is made redundant and you meet the eligibility
        requirements. It is separate from, and in addition to, your notice of termination.
      </p>

      <h2>Who qualifies for redundancy pay?</h2>
      <p>
        To receive NES redundancy pay you must:
      </p>
      <ul>
        <li>Be a <strong>national system employee</strong> (covered by the Fair Work Act — most private sector workers)</li>
        <li>Have completed at least <strong>1 year of continuous service</strong> with the same employer</li>
        <li>Be dismissed because of a <strong>genuine redundancy</strong></li>
        <li>Not be employed by a <strong>small business employer</strong> (fewer than 15 employees)</li>
      </ul>
      <p>
        Casual employees do not receive redundancy pay, nor do employees on fixed-term contracts where
        the termination arises from the expiry of the term.
      </p>

      <h2>What is a genuine redundancy?</h2>
      <p>
        Under section 389 of the Fair Work Act, a dismissal is a <strong>genuine redundancy</strong> only if:
      </p>
      <ol>
        <li>The employer no longer requires the employee's job to be performed by anyone (due to changes in operational requirements)</li>
        <li>The employer has complied with any consultation obligations in the applicable modern award or enterprise agreement</li>
        <li>It would not have been reasonable to redeploy the employee in the employer's enterprise or an associated entity</li>
      </ol>
      <p>
        If your employer dismisses you as redundant but then hires someone else to do your job, or
        fails to consider redeployment opportunities, the redundancy may not be genuine — and you may
        have an unfair dismissal claim at the Fair Work Commission.
      </p>

      <h2>NES redundancy pay scale</h2>
      <p>
        The amount of redundancy pay is calculated using your <strong>base rate of pay</strong> for
        ordinary hours (not including overtime, penalty rates, or allowances) multiplied by the number
        of weeks in the following scale:
      </p>

      <div className="my-6 overflow-x-auto rounded-xl border border-surface-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-line bg-surface-muted">
              <th className="px-4 py-3 text-left font-semibold text-ink">Years of continuous service</th>
              <th className="px-4 py-3 text-right font-semibold text-ink">Redundancy pay (weeks)</th>
            </tr>
          </thead>
          <tbody>
            {scale.map((row, i) => (
              <tr key={row.years} className={`border-b border-surface-line ${i % 2 === 0 ? "" : "bg-surface-muted/30"}`}>
                <td className="px-4 py-2.5 text-ink-soft">{row.years} years</td>
                <td className="px-4 py-2.5 text-right font-semibold text-ink">{row.weeks} weeks</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-ink-faint mt-2">
        Note: the entitlement reduces from 16 weeks at 9–10 years to 12 weeks at 10+ years because
        the NES was designed to complement (not stack with) long service leave entitlements.
      </p>

      <div className="my-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
        <p className="font-semibold text-brand-700 mb-2">Calculate your exact entitlement</p>
        <p className="text-sm">
          Enter your weekly base rate of pay and years of service for an instant calculation of
          your NES redundancy pay.
        </p>
        <Link href="/au-redundancy-pay-calculator" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
          AU redundancy pay calculator →
        </Link>
      </div>

      <h2>Small business exemption</h2>
      <p>
        If your employer has fewer than 15 employees (a "small business employer" under the Fair Work
        Act), they are <strong>exempt from paying NES redundancy pay</strong>. This is a significant
        carve-out — around 96% of Australian businesses are small businesses by this definition.
        However, small business employees are still entitled to notice of termination and any
        entitlements under their modern award or enterprise agreement.
      </p>
      <p>
        If your employer has grown beyond 15 employees recently, or if they have associated entities,
        the headcount calculation can be complex. The Fair Work Commission considers both the employer
        entity and any related entities when determining small business status.
      </p>

      <h2>Is redundancy pay taxable in Australia?</h2>
      <p>
        Genuine redundancy payments receive favourable tax treatment in Australia. For the 2025–26
        income year, the <strong>tax-free component</strong> of a genuine redundancy payment is:
      </p>
      <ul>
        <li>Base amount: <strong>$11,985</strong></li>
        <li>Plus <strong>$5,994</strong> for each complete year of service</li>
      </ul>
      <p>
        The tax-free amount is indexed annually by the ATO. Amounts above the tax-free threshold
        are taxed at a concessional rate (32% including Medicare levy, or your marginal rate if
        lower). Seek advice from an accountant on your specific situation, particularly if your
        total termination payment is large.
      </p>

      <h2>Redundancy pay and notice of termination</h2>
      <p>
        Redundancy pay and notice pay are <strong>separate entitlements</strong>. Your employer must
        pay both:
      </p>
      <ul>
        <li>
          <strong>Notice of termination</strong> under s.117 of the Fair Work Act (1–4 weeks
          depending on service, plus 1 extra week if aged over 45 with 2+ years service) — or pay in
          lieu of notice at your full base rate
        </li>
        <li>
          <strong>NES redundancy pay</strong> under the scale above
        </li>
        <li>
          <strong>Annual leave payout</strong> — all accrued but untaken annual leave at your base
          rate (plus any applicable leave loading)
        </li>
      </ul>

      <h2>Modern award and enterprise agreement entitlements</h2>
      <p>
        The NES sets the minimum redundancy pay. Your modern award or enterprise agreement may
        provide a more generous scale — always check the instrument that covers your employment.
        The Pay and Conditions Tool (PACT) on the Fair Work Ombudsman website can identify which
        modern award applies to your role and the redundancy provisions it contains.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/au-redundancy-pay-calculator"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-brand-700"
        >
          Calculate your redundancy pay
        </Link>
        <Link
          href="/au-notice-period-calculator"
          className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft no-underline hover:border-brand-600 hover:text-brand-600"
        >
          Notice period calculator
        </Link>
      </div>
    </>
  );
}
