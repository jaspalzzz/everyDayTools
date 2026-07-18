import Link from "next/link";

export default function UsFinalPaycheckLawsByState() {
  const stateGroups = [
    {
      label: "Same day or immediate (if fired)",
      states: ["California", "Colorado", "Hawaii", "Massachusetts", "Minnesota", "Missouri (terminated)", "Nevada", "New Hampshire", "South Carolina"],
      note: "California is the strictest: immediate payment is required at the time of termination if the employer is the one who initiates the separation.",
    },
    {
      label: "Within 1–3 business days",
      states: ["Alaska (3 working days)", "Arizona (7 business days or next payday — whichever is sooner)", "Connecticut (next business day)", "Maine (next business day if notified)", "Montana (next business day if possible)"],
      note: "",
    },
    {
      label: "Next regular payday",
      states: ["Alabama", "Arkansas", "Florida", "Georgia", "Idaho", "Indiana", "Kansas", "Kentucky", "Louisiana", "Maryland", "Michigan", "Mississippi", "Nebraska", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
      note: "This is the most common rule. 'Next regular payday' means the regularly scheduled pay date — not the next calendar day.",
    },
  ];

  return (
    <>
      <h2>Why final paycheck timing matters</h2>
      <p>
        When you leave a job — whether you quit, are fired, or are laid off — your employer is
        legally required to pay your final wages by a specific deadline. Miss that deadline and
        you may be entitled to additional penalties on top of the unpaid wages. The catch is that
        the rules vary dramatically by state: California requires immediate payment at the moment
        of termination; many other states allow the employer until the next regular payday.
      </p>

      <h2>The federal baseline: FLSA</h2>
      <p>
        The Fair Labor Standards Act (FLSA) requires that wages be paid on the established payday
        for the pay period — but it does not set a specific final paycheck deadline for departing
        employees. That gap is filled by state law, which is almost always stricter and more
        employee-friendly than the federal minimum.
      </p>

      <h2>Does it matter how you left?</h2>
      <p>
        In many states, the deadline differs based on whether you were <strong>terminated by your
        employer</strong> or <strong>resigned voluntarily</strong>. States with stricter rules for
        termination than resignation include California, Nevada, Montana, and several others.
        The logic is that an employer who initiates a separation has advance notice and should be
        prepared to pay immediately; an employee who resigns may give less notice.
      </p>

      <div className="my-6 space-y-4">
        {stateGroups.map((group) => (
          <div key={group.label} className="rounded-xl border border-surface-line p-5">
            <p className="mb-3 font-bold text-ink text-sm">{group.label}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {group.states.map((s) => (
                <span key={s} className="rounded-full bg-surface-muted border border-surface-line px-2.5 py-0.5 text-xs text-ink-soft">
                  {s}
                </span>
              ))}
            </div>
            {group.note && <p className="text-xs text-ink-faint">{group.note}</p>}
          </div>
        ))}
      </div>

      <h2>What must your final paycheck include?</h2>
      <p>
        Your final paycheck must include all earned and unpaid wages through your last day of
        work. This includes:
      </p>
      <ul>
        <li>Regular wages and salary through your last day</li>
        <li>Any earned but unpaid overtime</li>
        <li>Commissions that have been earned and are calculable at the time</li>
        <li>Accrued vacation or PTO (in states that require it — see below)</li>
      </ul>
      <p>
        Your employer <strong>cannot</strong> withhold your final paycheck as leverage to get
        you to return equipment, complete a project, or sign a non-disclosure agreement.
        Withholding final wages is unlawful in every state.
      </p>

      <h2>PTO and vacation pay in the final paycheck</h2>
      <p>
        Whether accrued vacation or PTO must be paid out in your final paycheck depends entirely
        on your state. Approximately 24 states (including California, Illinois, and Massachusetts)
        require employers to pay out all accrued, unused vacation as wages. Many others leave it
        to employer policy — if your handbook says "use it or lose it," that policy is enforceable
        in those states.
      </p>

      <div className="my-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
        <p className="font-semibold text-brand-700 mb-2">Check your state's PTO rules</p>
        <p className="text-sm">
          Use the PTO payout calculator to find the rules for your specific state — and calculate
          the dollar value of any unused PTO you may be entitled to.
        </p>
        <Link href="/pto-payout-calculator" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
          PTO payout calculator →
        </Link>
      </div>

      <h2>Penalties for late final paychecks</h2>
      <p>
        Most states provide penalties if your employer misses the final paycheck deadline:
      </p>
      <ul>
        <li>
          <strong>California:</strong> Waiting-time penalties of one day's wages for every day the
          paycheck is late, up to 30 days (Labor Code s.203). On a $3,000/month salary, this can
          reach $3,000 in penalties alone.
        </li>
        <li>
          <strong>New York:</strong> Liquidated damages of 100% of unpaid wages plus interest and
          attorney fees.
        </li>
        <li>
          <strong>Washington:</strong> Double damages (200%) of wages owed if the employer wilfully
          fails to pay.
        </li>
        <li>
          <strong>Most states:</strong> At minimum, the right to file a wage claim and recover unpaid
          wages plus interest, and in many cases attorney fees.
        </li>
      </ul>

      <h2>What to do if your employer is late</h2>
      <ol>
        <li>
          <strong>Document everything:</strong> Your last day worked, your regular pay rate, when
          payment was due, and all communications with your employer about payment.
        </li>
        <li>
          <strong>Send a written demand:</strong> Email your HR department or direct manager
          requesting payment by a specific date. Keep a copy.
        </li>
        <li>
          <strong>File a state wage claim:</strong> Contact your state's Department of Labor. Most
          allow online filing. There is typically no cost and no attorney required.
        </li>
        <li>
          <strong>Consider a private lawsuit:</strong> If the wage claim process is slow or your
          employer disputes the amount, a private lawsuit — often handled on contingency by
          employment lawyers — can recover wages plus penalties and attorney fees.
        </li>
        <li>
          <strong>Federal DOL backup:</strong> If your employer is covered by the FLSA and your
          state claim does not resolve the issue, the US Department of Labor Wage and Hour Division
          (WHD) can also investigate and recover wages.
        </li>
      </ol>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/final-paycheck-deadline-calculator"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-brand-700"
        >
          Look up your state's deadline
        </Link>
        <Link
          href="/pto-payout-calculator"
          className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft no-underline hover:border-brand-600 hover:text-brand-600"
        >
          PTO payout calculator
        </Link>
      </div>
    </>
  );
}
