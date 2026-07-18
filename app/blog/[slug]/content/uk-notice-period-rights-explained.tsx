import Link from "next/link";

export default function UkNoticePeriodRightsExplained() {
  return (
    <>
      <h2>Statutory minimum vs contractual notice</h2>
      <p>
        In the UK, notice periods are governed by two sources: <strong>statute</strong> (the Employment
        Rights Act 1996 s.86) and your <strong>employment contract</strong>. You are always entitled to
        whichever is <em>greater</em>.
      </p>
      <p>
        The statutory minimum notice an employer must give you depends on your length of continuous
        service:
      </p>
      <ul>
        <li>1 month to 2 years service: <strong>1 week</strong></li>
        <li>2–12 years service: <strong>1 week per complete year</strong> (so 5 years = 5 weeks)</li>
        <li>12 or more years service: <strong>12 weeks</strong> (the cap)</li>
      </ul>
      <p>
        If your contract says "3 months' notice" and you have 2 years of service (statutory = 2 weeks),
        you are entitled to the contractual 3 months — the contract wins because it is more generous.
        Conversely, if your contract says "1 week" after 8 years of service, you are entitled to the
        statutory 8 weeks — statute overrides a less generous contract.
      </p>

      <h2>Notice the employee must give</h2>
      <p>
        The law only requires an employee to give <strong>1 week's notice</strong> after 1 month of
        service (ERA 1996 s.86(2)) — regardless of how long they have worked there. In practice, most
        employment contracts specify a longer notice period for the employee (typically 1–3 months for
        salaried roles). If your contract requires more, you are legally bound by it.
      </p>
      <p>
        If you resign without giving the required notice, your employer may withhold pay for the
        unworked period — but only if the contract expressly allows this as a liquidated damages clause.
        In practice, most employers do not pursue employees who resign short, though they can bring a
        breach of contract claim.
      </p>

      <h2>Pay in lieu of notice (PILON)</h2>
      <p>
        Pay in lieu of notice (PILON) means your employer pays you the cash equivalent of your notice
        period rather than asking you to work it. PILON requires either an express PILON clause in your
        contract, or your agreement at the time of termination. Without one of these, your employer
        asking you to leave immediately without pay for the notice period is <strong>wrongful dismissal</strong>.
      </p>
      <p>
        Since 6 April 2018, <strong>all PILON is fully taxable as earnings</strong> — income tax and NI
        apply at source. There is no longer any distinction between contractual and non-contractual PILON
        for tax purposes. PILON does not benefit from the £30,000 termination payment exemption.
      </p>

      <div className="my-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
        <p className="font-semibold text-brand-700 mb-2">What must PILON include?</p>
        <p className="text-sm">
          PILON must cover your full contractual pay for the notice period — including any regular
          overtime, commission, or benefits that form part of your normal pay. It cannot be based
          on basic salary alone if you routinely receive commission on top. Courts look at what you
          would have <em>actually</em> received had you worked the notice period.
        </p>
      </div>

      <h2>Garden leave</h2>
      <p>
        Garden leave is a middle ground: you remain employed, continue to receive full pay and benefits,
        but are told not to come in to work. Your employer keeps you "on the bench" during the notice
        period — usually to protect client relationships, confidential information, or to prevent you
        going directly to a competitor while still bound by your employment contract.
      </p>
      <p>
        Garden leave requires either an express garden leave clause in your contract, or your agreement
        at the time. During garden leave you remain subject to all contractual obligations — including
        post-termination restrictions (non-competes, non-solicitation clauses) — because you are still
        technically employed.
      </p>
      <p>
        Garden leave costs the same as PILON in base salary terms, but pension contributions, private
        medical insurance, and other benefits continue to accrue — making it potentially more expensive
        for the employer.
      </p>

      <h2>Wrongful dismissal</h2>
      <p>
        Wrongful dismissal is a <strong>breach of contract</strong> claim — it arises when your employer
        dismisses you without giving you the full notice (or PILON) you are entitled to, without
        justification. Unlike unfair dismissal, wrongful dismissal:
      </p>
      <ul>
        <li>Can be claimed from <strong>day one</strong> of employment (no 2-year qualifying period)</li>
        <li>Can be brought in the <strong>Employment Tribunal</strong> (up to £25,000) or in the <strong>county court</strong> (unlimited)</li>
        <li>The claim value is typically the pay you would have received during your notice period</li>
      </ul>
      <p>
        Summary dismissal (firing someone on the spot without notice) is only lawful where the employee
        has committed <strong>gross misconduct</strong> — a serious breach of contract that justifies
        immediate termination. Examples include theft, fraud, violence, or a serious safety breach.
        If there is no genuine gross misconduct, summary dismissal is wrongful.
      </p>

      <h2>Notice periods and restrictive covenants</h2>
      <p>
        Post-termination restrictions (non-competes, non-solicitation, non-dealing clauses) only take
        effect after your employment ends. The notice period is therefore important: the longer your
        notice period, the later your restrictions start running. For senior employees with lengthy notice
        periods, this can mean non-compete clauses run 6–12 months from the end of your last day of
        employment — not from the day you were first told you were leaving.
      </p>
      <p>
        If you are put on garden leave during your notice period, UK courts often reduce the effective
        duration of a post-termination restriction to reflect the time already spent on garden leave.
        Seek legal advice if your employer is trying to enforce a non-compete after a long garden leave.
      </p>

      <div className="my-6 flex gap-3 flex-wrap">
        <Link
          href="/notice-period-calculator"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-brand-700"
        >
          Calculate your notice period
        </Link>
        <Link
          href="/garden-leave-calculator"
          className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft no-underline hover:border-brand-600 hover:text-brand-600"
        >
          Garden leave pay calculator
        </Link>
      </div>
    </>
  );
}
