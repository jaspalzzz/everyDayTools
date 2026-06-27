import Link from "next/link";

export default function UkMaternityPayRights2026() {
  const weeks = [
    { period: "Weeks 1–6", rate: "90% of average weekly earnings (no cap)", type: "higher" },
    { period: "Weeks 7–39", rate: "£184.03/week, or 90% of AWE if lower", type: "standard" },
    { period: "Weeks 40–52", rate: "Unpaid (statutory maternity leave continues)", type: "unpaid" },
  ];

  return (
    <>
      <h2>What is Statutory Maternity Pay?</h2>
      <p>
        Statutory Maternity Pay (SMP) is the minimum amount your employer must pay you during
        maternity leave, set by the Maternity and Parental Leave etc. Regulations 1999 and the
        Social Security Contributions and Benefits Act 1992. It covers up to <strong>39 weeks</strong>{" "}
        of maternity leave, though you are entitled to take up to 52 weeks of maternity leave in
        total (the final 13 weeks are unpaid if you have used your full SMP entitlement).
      </p>

      <h2>SMP rates for 2025/26</h2>
      <div className="my-6 overflow-x-auto rounded-xl border border-surface-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-line bg-surface-muted">
              <th className="px-4 py-3 text-left font-semibold text-ink">Period</th>
              <th className="px-4 py-3 text-left font-semibold text-ink">Rate</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((row, i) => (
              <tr
                key={row.period}
                className={`border-b border-surface-line last:border-0 ${
                  row.type === "unpaid" ? "text-ink-faint" : i % 2 === 0 ? "" : "bg-surface-muted/30"
                }`}
              >
                <td className="px-4 py-3 font-medium">{row.period}</td>
                <td className="px-4 py-3">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-ink-faint">
        The flat-rate SMP (£184.03/week for 2025/26) is reviewed each April by the government.
        Your employer pays SMP through payroll and recovers most of it from HMRC. SMP is taxable as income.
      </p>

      <div className="my-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
        <p className="font-semibold text-brand-700 mb-2">Calculate your SMP week by week</p>
        <p className="text-sm">
          Enter your average weekly earnings and start date to see your full 39-week SMP schedule
          — including the 6-week 90% period and all 33 weeks at the flat rate.
        </p>
        <Link href="/maternity-pay-calculator" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
          Maternity pay calculator →
        </Link>
      </div>

      <h2>Do you qualify for SMP?</h2>
      <p>
        To receive SMP you must meet <strong>all four</strong> of the following conditions:
      </p>
      <ol>
        <li>
          <strong>Employed by the same employer</strong> continuously for at least 26 weeks up to
          and including the 15th week before your expected week of childbirth (EWC) — this is the
          "qualifying week"
        </li>
        <li>
          <strong>Earning at or above the Lower Earnings Limit (LEL)</strong> — £125/week for
          2025/26 — during the 8-week averaging period
        </li>
        <li>
          <strong>Still pregnant at 11 weeks before the EWC</strong> (or have already given birth)
        </li>
        <li>
          Have given your employer proper notice and, where asked, provided a MATB1 certificate
          (issued by your GP or midwife from week 20 of pregnancy)
        </li>
      </ol>
      <p>
        Agency workers, zero-hours workers, and employees on short fixed-term contracts can qualify
        if they meet the service and earnings conditions with a single employer. Self-employed people
        do not get SMP but may qualify for Maternity Allowance (MA) instead — paid directly by
        HMRC at up to £184.03/week for 39 weeks.
      </p>

      <h2>How average weekly earnings (AWE) are calculated</h2>
      <p>
        Your AWE is calculated over an 8-week reference period ending with the last payday before
        the end of the 15th week before your EWC. It includes:
      </p>
      <ul>
        <li>Basic salary</li>
        <li>Overtime (if paid regularly)</li>
        <li>Commission and bonuses (averaged over the 8-week period)</li>
        <li>Statutory sick pay paid during that period</li>
      </ul>
      <p>
        It does not include non-cash benefits (company car, health insurance, childcare vouchers).
        If you received a salary increase during or after the 8-week period that backdates to before
        it, the higher amount should normally be used.
      </p>

      <h2>Enhanced (occupational) maternity pay</h2>
      <p>
        Statutory Maternity Pay is the legal minimum. Many employers offer enhanced or occupational
        maternity pay (OMP) on top — for example, full pay for the first 13 weeks, half pay for the
        next 13, then SMP for the remainder. OMP is entirely at the employer's discretion (unless
        it is in your contract or a collective agreement) and the terms vary significantly.
      </p>
      <p>
        Key points about OMP:
      </p>
      <ul>
        <li>Your employer cannot pay less than SMP — the statutory minimum is always the floor</li>
        <li>OMP may be conditional on returning to work for a minimum period (often 3–6 months)</li>
        <li>If you do not return and your contract has a repayment clause, you may have to repay
        some or all of the OMP (but never the SMP component)</li>
        <li>OMP must not discriminate — a woman on enhanced maternity pay is entitled to the same
        enhanced pay as a man on enhanced paternity pay for equivalent circumstances (following
        <em> Capita Hartshead v Darch</em> and the Equality Act 2010)</li>
      </ul>

      <h2>Rights during maternity leave</h2>
      <p>
        During ordinary maternity leave (weeks 1–26) and additional maternity leave (weeks 27–52),
        your employment contract continues. You retain:
      </p>
      <ul>
        <li>All contractual benefits (company car, private medical insurance, pension contributions)</li>
        <li>Continuous service accrual</li>
        <li>Annual leave accrual (full holiday entitlement continues to accrue during the whole 52 weeks)</li>
        <li>Protection from unfair dismissal and redundancy — if your role is genuinely redundant
        while you are on maternity leave, you have a right of first refusal on any suitable
        alternative vacancy before other employees at risk</li>
      </ul>

      <h2>Keeping-in-touch (KIT) days</h2>
      <p>
        You can work up to <strong>10 Keeping-in-Touch (KIT) days</strong> during maternity leave
        without losing SMP. KIT days are voluntary — both you and your employer must agree. You
        and your employer should agree the rate of pay for KIT days (usually your normal daily
        rate). Only the days actually worked count — attending an all-hands meeting for part of a
        day uses one full KIT day.
      </p>

      <h2>Shared Parental Leave (SPL)</h2>
      <p>
        If you and your partner want to share the remaining leave after the first 2 weeks of
        maternity leave, Shared Parental Leave allows you to split up to 50 weeks of leave (and
        up to 37 weeks of Statutory Shared Parental Pay) between you. SPL can be taken in blocks,
        and both parents can be on leave simultaneously.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/maternity-pay-calculator"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Calculate your maternity pay
        </Link>
        <Link
          href="/shared-parental-leave-calculator"
          className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600"
        >
          Shared parental leave calculator
        </Link>
      </div>
    </>
  );
}
