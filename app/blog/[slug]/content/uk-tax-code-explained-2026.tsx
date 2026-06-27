export default function Content() {
  return (
    <div className="prose-content">
      <p>
        If you are on PAYE (Pay As You Earn), your employer uses a tax code to calculate how much
        income tax to deduct each pay period. Most workers have never been told what their tax code
        means, how to check if it is correct, or what to do when HMRC gets it wrong — and it gets
        wrong surprisingly often. Errors can mean you are paying hundreds (sometimes thousands) of
        pounds too much in tax each year.
      </p>

      <h2>What is a tax code?</h2>
      <p>
        A tax code is a combination of numbers and letters that tells your employer how much of your
        income is free from income tax (your tax-free personal allowance) and at what rate to tax
        the rest. HMRC issues tax codes directly to employers — you receive a copy on a P2 &quot;Tax
        Code Notice&quot; or on your payslip.
      </p>
      <p>
        The most common tax code for most workers in the 2026/27 tax year is <strong>1257L</strong>.
        This breaks down as:
      </p>
      <ul>
        <li>
          <strong>1257</strong>: The number indicates your personal allowance divided by 10. 1257 × 10 =
          £12,570 — the standard personal allowance for 2026/27.
        </li>
        <li>
          <strong>L</strong>: The letter indicates you are entitled to the standard personal allowance.
        </li>
      </ul>
      <p>
        So 1257L means your employer will deduct tax only on income above £12,570 per year.
      </p>

      <h2>Decoding the letter suffixes</h2>
      <p>
        The letter in your tax code carries specific meaning:
      </p>
      <ul>
        <li><strong>L</strong>: Standard personal allowance. The most common code.</li>
        <li><strong>M</strong>: You have received 10% of your spouse or civil partner&apos;s personal allowance via Marriage Allowance.</li>
        <li><strong>N</strong>: You have transferred 10% of your personal allowance to your spouse or civil partner.</li>
        <li><strong>T</strong>: HMRC needs to review your code and is making adjustments — often seen with higher earners.</li>
        <li><strong>0T</strong>: Zero personal allowance — either you have used it all up, or you are on an emergency code. Tax is deducted from all income.</li>
        <li><strong>BR</strong>: All income taxed at the basic rate (20%). Used for second jobs or where there is no personal allowance to allocate here.</li>
        <li><strong>D0</strong>: All income taxed at the higher rate (40%). Used for second jobs or pension income.</li>
        <li><strong>D1</strong>: All income taxed at the additional rate (45%). Rare.</li>
        <li><strong>NT</strong>: No tax to be deducted. Used for some special situations.</li>
        <li><strong>K</strong>: Negative allowance — you owe tax on something (e.g., an outstanding tax debt, untaxed state pension), so the figure added to your income before tax is applied.</li>
        <li><strong>W1 / M1</strong>: Emergency code (week 1 or month 1 basis). Tax is calculated each period on its own rather than cumulatively. You may be overpaying or underpaying.</li>
        <li><strong>X</strong>: Emergency basis — similar to W1/M1.</li>
      </ul>

      <h2>The emergency tax code problem</h2>
      <p>
        Emergency codes (0T, BR, or codes followed by W1/M1/X) are frequently applied when:
      </p>
      <ul>
        <li>You start a new job and your employer does not receive a P45 from your previous employer in time</li>
        <li>You take on a second job</li>
        <li>You return to work after a gap</li>
        <li>You receive a benefit in kind that your employer has not yet received updated guidance on</li>
      </ul>
      <p>
        Emergency codes often result in <strong>overtaxation</strong> in the short term. They apply your
        full personal allowance in the first pay period only (on the cumulative basis) or every pay period
        as if it were your first (on the W1/M1 basis). Once the correct code is applied, the overpaid
        tax should be refunded automatically through the PAYE system — but it can take several months.
      </p>

      <h2>How personal allowance adjustments affect your code</h2>
      <p>
        HMRC adjusts the standard 1257L code for various reasons:
      </p>
      <ul>
        <li>
          <strong>Income over £100,000</strong>: Your personal allowance is tapered at £1 for every
          £2 of income above £100,000 — disappearing entirely at £125,140. Someone earning £112,570
          would have a tax code of 257L (allowance reduced to £2,570).
        </li>
        <li>
          <strong>Untaxed income</strong>: If you have income that cannot be taxed through another
          source (e.g., rental income, interest, dividends above the relevant allowances), HMRC
          reduces your allowance to recover the additional tax. Your code may appear lower than 1257L.
        </li>
        <li>
          <strong>Benefits in kind</strong>: Company car, private medical insurance, and other employer
          benefits are taxable. HMRC reduces your allowance to account for the tax owed on these benefits.
        </li>
        <li>
          <strong>Unpaid tax from previous years</strong>: HMRC sometimes collects underpaid tax from
          earlier years by reducing your current-year allowance (resulting in a K code or a lower L code).
        </li>
        <li>
          <strong>Marriage Allowance</strong>: If you have claimed the Marriage Allowance transfer, your
          code may be M (if you received) or N (if you transferred). The transferred amount adjusts the
          number in the code.
        </li>
      </ul>

      <h2>How to check if your code is wrong</h2>
      <p>
        Common signs of a wrong tax code:
      </p>
      <ul>
        <li>Your code has been BR or 0T for more than one or two pay periods without explanation</li>
        <li>You have recently changed jobs and are paying significantly more tax than expected</li>
        <li>You have received a P800 notice from HMRC saying you have underpaid or overpaid tax</li>
        <li>Your code has not updated after a change in circumstances (e.g., you left a second job, or a benefit in kind ended)</li>
        <li>You are above £100,000 income but your code is still 1257L (meaning benefits may not have been deducted)</li>
      </ul>
      <p>
        The quickest way to check is through your <strong>Personal Tax Account</strong> on GOV.UK
        (login with your Government Gateway). You can see your current tax code, the reason for it,
        and any adjustments — and you can update HMRC directly if something is wrong.
      </p>

      <h2>How to correct your tax code</h2>
      <ol>
        <li>
          <strong>Log in to your Personal Tax Account</strong> at gov.uk/personal-tax-account. Review
          your tax code and check whether the adjustments HMRC has made make sense.
        </li>
        <li>
          <strong>Contact HMRC directly</strong>: Call 0300 200 3300 (Mon–Fri) or use the HMRC app.
          Have your National Insurance number and employer details ready. HMRC can issue a corrected
          code same day.
        </li>
        <li>
          <strong>Claim a refund</strong>: If you have overpaid tax in the current year, it will
          usually be refunded automatically through PAYE once the correct code is applied. For
          overpayments in past years, claim via your Personal Tax Account or by writing to HMRC.
          You can claim refunds going back 4 tax years.
        </li>
      </ol>

      <h2>What about the P800 and Simple Assessment?</h2>
      <p>
        After each tax year, HMRC reconciles PAYE records and issues a <strong>P800 Tax Calculation</strong>
        if you have underpaid or overpaid. If you have underpaid (a tax bill), HMRC will collect it
        through your tax code in the following year (spreading the payment over 12 months) or ask for
        payment directly. If you have overpaid, HMRC will issue a refund — check your bank details
        are up to date on your Personal Tax Account.
      </p>
      <p>
        If you receive a P800 saying you owe tax, check it carefully. Errors are not unheard of —
        particularly where income sources or benefits in kind were incorrectly reported. You can
        dispute a P800 by contacting HMRC.
      </p>
    </div>
  );
}
