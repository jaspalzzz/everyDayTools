export interface ComparisonRow {
  aspect: string;
  a: string;
  b: string;
}

export interface ComparisonMeta {
  slug: string;
  title: string;
  h1: string;
  description: string;
  /** Short label used in hub listing */
  summary: string;
  country: "UK" | "US" | "UK/US";
  /** Label for left column */
  aLabel: string;
  /** Label for right column */
  bLabel: string;
  intro: string;
  rows: ComparisonRow[];
  verdict: string;
  faqs: { q: string; a: string }[];
  /** Tool slugs for CTA buttons */
  relatedTools: { name: string; slug: string }[];
  datePublished: string;
  dateModified: string;
}

export const COMPARISONS: ComparisonMeta[] = [
  {
    slug: "pilon-vs-garden-leave",
    title: "PILON vs Garden Leave: Key Differences Explained 2026 | MyPayRights",
    h1: "PILON vs garden leave: what's the difference?",
    description:
      "PILON and garden leave both end your working relationship during the notice period — but they work very differently. This guide explains the legal, tax, and practical differences.",
    summary: "Two ways to handle notice — which applies to you and what you're owed.",
    country: "UK",
    aLabel: "PILON",
    bLabel: "Garden leave",
    intro:
      "When an employer ends your employment or you resign, you are entitled to a notice period. Rather than having you work that notice, employers can either pay you a lump sum in lieu of notice (PILON) or put you on garden leave. Both bring your active working to an end immediately, but the legal and financial consequences are different.",
    rows: [
      { aspect: "Employment status", a: "Employment ends immediately on the day PILON is paid", b: "Employment continues for the full notice period" },
      { aspect: "Payment", a: "Lump sum equal to your notice period pay, paid immediately", b: "Normal salary continues monthly during the notice period" },
      { aspect: "Tax treatment (post-April 2018)", a: "Fully taxable as earnings under ITEPA 2003 s.402E", b: "Fully taxable as normal salary" },
      { aspect: "Benefits continuation", a: "Benefits (health, pension) normally cease immediately", b: "Benefits continue for the duration of the notice period" },
      { aspect: "Restrictive covenants", a: "Courts may be reluctant to enforce post-employment restrictions if employer chose to end employment early", b: "Covenants supported by continued employment — more easily enforceable" },
      { aspect: "Right to work elsewhere", a: "Free to start new job immediately (unless covenant restricts)", b: "Cannot work for a competitor; employer can require you to stay available" },
      { aspect: "Holiday accrual", a: "No further accrual after termination; accrued balance paid in final payment", b: "Holiday continues to accrue; employer may require you to take it during garden leave" },
      { aspect: "Bonus and commission", a: "Depends on contract wording — may be excluded", b: "Bonus/commission may continue to accrue if the relevant period falls within garden leave" },
      { aspect: "When employer uses it", a: "To end the relationship quickly, especially where the employee's presence is a risk", b: "To honour the notice period legally while keeping the employee out of the office" },
    ],
    verdict:
      "PILON gets you your money faster and frees you to start a new job immediately — but you lose the benefit continuation and possibly bonus accrual you would have received on garden leave. Garden leave is better if you have a bonus, commission, or long-term incentive vesting during the notice period. Always check your contract: some contracts include an express PILON clause, which determines whether your employer has the right to pay you out rather than require you to work or put you on garden leave.",
    faqs: [
      {
        q: "Is PILON taxable in the UK?",
        a: "Yes, fully. Since 6 April 2018, all PILON — whether or not your contract includes a PILON clause — is treated as earnings and is subject to income tax and National Insurance contributions under ITEPA 2003 s.402E. The old distinction between contractual and non-contractual PILON no longer exists for tax purposes.",
      },
      {
        q: "Can my employer put me on garden leave without my consent?",
        a: "Only if your contract includes an express garden leave clause. Without one, an employer cannot simply instruct you to stay away from the office — you have an implied right to work (particularly important for roles where skills must be maintained, such as surgeons or traders). In practice, most senior employment contracts include express garden leave provisions.",
      },
      {
        q: "Can I negotiate between PILON and garden leave?",
        a: "Yes, particularly at senior levels. The choice often depends on what you want: if you have a new job offer, PILON lets you start immediately. If you have bonuses vesting during the notice period, garden leave may be worth more. Settlement agreements often involve negotiating the structure of the exit payment, including how the notice period is handled.",
      },
      {
        q: "Does garden leave count towards continuous employment?",
        a: "Yes. Garden leave is a period of employment — you remain employed throughout, your service years accumulate, and your employment rights continue. PILON ends employment immediately, so the date of termination is the date the payment is made, not the end of what would have been the notice period.",
      },
      {
        q: "What is the difference between PILON and a settlement agreement payment?",
        a: "PILON is specifically the payment of notice period wages instead of working notice. A settlement agreement is a broader agreement terminating the employment relationship, which can include PILON, statutory redundancy pay, ex gratia payments (up to £30,000 tax-free), and other elements. PILON is always fully taxable; the ex gratia element of a settlement may benefit from the £30,000 exemption.",
      },
    ],
    relatedTools: [
      { name: "Notice period calculator", slug: "notice-period-calculator" },
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "unfair-vs-wrongful-dismissal",
    title: "Unfair vs Wrongful Dismissal: Key Differences 2026",
    h1: "Unfair dismissal vs wrongful dismissal: what's the difference?",
    description:
      "Unfair dismissal and wrongful dismissal are two different legal claims. One is a statutory right, the other is a contract claim. They have different qualifying periods, compensation caps, and tribunals.",
    summary: "Two different legal claims — one statutory, one contractual. Which do you have?",
    country: "UK",
    aLabel: "Unfair dismissal",
    bLabel: "Wrongful dismissal",
    intro:
      "Many people use 'unfair dismissal' and 'wrongful dismissal' interchangeably — but they are distinct legal claims with different qualifying periods, different compensation structures, and different routes to justice. Understanding which applies to your situation determines how much you can claim and where you can bring your case.",
    rows: [
      { aspect: "Legal basis", a: "Employment Rights Act 1996 (ERA 1996) — statutory right", b: "Common law contract claim — breach of employment contract" },
      { aspect: "Qualifying period", a: "2 years' continuous employment (with exceptions for automatically unfair dismissal)", b: "None — available from day one of employment" },
      { aspect: "What it covers", a: "Dismissal without a fair reason or without a fair procedure, even if notice was given", b: "Dismissal without the correct notice (or pay in lieu) — regardless of reason" },
      { aspect: "Compensation (2026/27)", a: "Basic award up to £22,530 + compensatory award up to £123,543 or 52 weeks' pay (lower figure)", b: "Loss of earnings during the notice period only — typically weeks to months of pay" },
      { aspect: "Where to claim", a: "Employment Tribunal", b: "Employment Tribunal (up to £25,000) or county court (no cap)" },
      { aspect: "Time limit", a: "3 months less one day from effective date of termination (ACAS early conciliation first)", b: "3 months less one day (ET) or 6 years (county court)" },
      { aspect: "Notice requirement", a: "Irrelevant — about the reason and process, not notice", b: "Core of the claim: employer failed to give contractual/statutory notice" },
      { aspect: "Employer's valid defences", a: "Show a fair reason (capability, conduct, redundancy, SOSR, statutory bar) AND follow a fair procedure", b: "Show notice was given or there was gross misconduct justifying summary dismissal" },
      { aspect: "Reinstatement remedy", a: "Yes — tribunal can order reinstatement or re-engagement", b: "No — damages only" },
    ],
    verdict:
      "If your employer fired you without giving you any notice (or pay in lieu), you likely have a wrongful dismissal claim regardless of how long you've worked there. If they gave you notice but the reason was unfair or the process was flawed, and you have 2+ years' service, you likely have an unfair dismissal claim. Many dismissals involve both claims — a tribunal can hear both simultaneously. The compensation potential is much higher for unfair dismissal, but wrongful dismissal is available from day one.",
    faqs: [
      {
        q: "Can I claim both unfair dismissal and wrongful dismissal?",
        a: "Yes. If you have 2+ years' service and were dismissed without proper notice and without a fair reason/process, you can bring both claims in the Employment Tribunal simultaneously. The tribunal will assess each separately. You cannot, however, recover the same loss twice.",
      },
      {
        q: "What counts as 'automatically unfair' dismissal?",
        a: "Certain dismissal reasons are automatically unfair regardless of length of service: dismissal related to pregnancy or maternity leave, whistleblowing (protected disclosures under ERA 1996 s.103A), trade union activities, exercising statutory rights (such as requesting flexible working), TUPE transfers, jury service, or working time rights. No 2-year qualifying period is needed for these.",
      },
      {
        q: "Is wrongful dismissal the same as constructive dismissal?",
        a: "No. Wrongful dismissal occurs when an employer fires you without giving proper notice. Constructive dismissal occurs when you resign because your employer fundamentally breached your contract — for example, by cutting your pay, bullying you, or removing your responsibilities. Constructive dismissal is a type of unfair dismissal claim (you are treated as dismissed), not a wrongful dismissal claim.",
      },
      {
        q: "What is the time limit to bring a dismissal claim?",
        a: "For Employment Tribunal claims (both unfair and wrongful dismissal), the time limit is 3 months less one day from the effective date of termination. Before starting a claim, you must notify ACAS and go through the early conciliation process — this pauses the time limit while conciliation is ongoing. Missing the time limit is almost always fatal to your claim.",
      },
      {
        q: "Does it matter if my employer says I was dismissed 'with cause'?",
        a: "Yes, significantly. For wrongful dismissal, the only relevant question is whether you were given your contractual (or statutory minimum) notice — unless there was genuine gross misconduct justifying summary dismissal. For unfair dismissal, the employer must show the reason falls within one of the five potentially fair reasons AND that they followed a fair procedure. 'With cause' is not a magic phrase that defeats either claim.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
      { name: "Notice period calculator", slug: "notice-period-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "redundancy-vs-dismissal",
    title: "Redundancy vs Dismissal: Key Differences & Your Rights 2026",
    h1: "Redundancy vs dismissal: what's the difference?",
    description:
      "Redundancy and dismissal are both ways your employer can end your employment — but they have completely different legal consequences, different pay entitlements, and different rights.",
    summary: "Both end your job — but only one triggers redundancy pay and different rights.",
    country: "UK",
    aLabel: "Redundancy",
    bLabel: "Dismissal",
    intro:
      "Both redundancy and dismissal result in your employment ending, but they arise from different circumstances and carry very different consequences for your pay, benefits, and ability to claim further compensation. Employers sometimes blur the line between them — understanding the distinction protects your rights.",
    rows: [
      { aspect: "Definition", a: "Your role is no longer required — the business ceases, the workplace closes, or the need for employees doing your type of work diminishes", b: "Your employer ends your employment for a reason relating to you personally — conduct, capability, or another substantial reason" },
      { aspect: "Qualifying period for pay", a: "2 years' continuous employment for statutory redundancy pay", b: "2 years for unfair dismissal; wrongful dismissal available from day one" },
      { aspect: "Redundancy pay", a: "Statutory: up to £22,530 based on age, service, and weekly pay (capped at £751). Contract may provide more.", b: "None. Redundancy pay is only owed on genuine redundancy." },
      { aspect: "Notice entitlement", a: "Full statutory or contractual notice (or PILON) is owed in addition to redundancy pay", b: "Full statutory or contractual notice owed, unless gross misconduct justifies summary dismissal" },
      { aspect: "Consultation requirement", a: "Individual consultation required; 45-day collective consultation if 100+ redundancies", b: "Depends on reason: capability requires support and warnings; conduct requires disciplinary procedure (ACAS Code)" },
      { aspect: "Tax treatment", a: "Redundancy pay up to £30,000 is tax-free. Amounts above £30,000 are taxable.", b: "No tax-free element for dismissal compensation (unless part of a settlement agreement)" },
      { aspect: "Benefit entitlement", a: "Eligible for Universal Credit/JSA immediately (no reduction for statutory redundancy pay for first 26 weeks)", b: "May face a waiting period if you resigned, or questions about conduct if dismissed for gross misconduct" },
      { aspect: "Challenge at tribunal", a: "Can challenge if dismissal was not genuine redundancy or selection was unfair", b: "Unfair dismissal claim if reason not fair or procedure flawed (2-year service required)" },
    ],
    verdict:
      "If your employer is calling your departure 'redundancy' but your role is being filled by someone else, your duties are simply being transferred, or you were selected for personal reasons, this may not be a genuine redundancy — and you may be entitled to challenge the decision at tribunal. Genuine redundancy entitles you to statutory redundancy pay (and possibly a tax-free payment) on top of your notice pay. Dismissal for conduct or performance carries no redundancy pay entitlement.",
    faqs: [
      {
        q: "Can I be made redundant if someone else is taking over my job?",
        a: "No. If your role continues and is simply being done by someone else (or by a new hire), this is not redundancy in law — it is dismissal. The definition of redundancy in ERA 1996 s.139 requires that the requirement for employees to carry out work of a particular kind has ceased or diminished. A genuine redundancy means the role itself disappears, not that you as an individual are replaced.",
      },
      {
        q: "Does my employer have to offer me alternative employment before making me redundant?",
        a: "Your employer must consider suitable alternative roles before making you redundant. If a suitable vacancy exists and they fail to offer it to you, the redundancy may be unfair. If they do offer a suitable alternative and you unreasonably refuse it, you may lose your right to statutory redundancy pay.",
      },
      {
        q: "Is redundancy pay taxable?",
        a: "Statutory redundancy pay is tax-free up to £30,000 in total (combined with any other termination payments). The weekly pay used to calculate it is also subject to the £751/week cap. Contractual redundancy pay above the statutory minimum is also tax-free up to the £30,000 threshold. Amounts above £30,000 are subject to income tax (but not National Insurance).",
      },
      {
        q: "Can I be dismissed for redundancy if I'm on sick leave or maternity leave?",
        a: "Yes, but with significant restrictions. You cannot be selected for redundancy because you are on sick leave or maternity leave — that would be automatically unfair. Employees on maternity, adoption, or shared parental leave have a right to be offered any suitable alternative vacancy before other employees at risk of redundancy. The pool for selection must be genuinely fair and not skewed against protected groups.",
      },
      {
        q: "What is 'bumping' in the redundancy context?",
        a: "Bumping is where an employee whose role is redundant is moved into another role (displacing the person in that role, who is then made redundant instead). It is a legitimate redundancy process in the UK, provided the selection is fair and the employee who is 'bumped' has not been selected on discriminatory grounds. Employers are not required to bump, but failure to consider it may make a redundancy unfair.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
      { name: "Notice period calculator", slug: "notice-period-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "statutory-vs-enhanced-redundancy",
    title: "Statutory vs Enhanced Redundancy Pay: What's the Difference? 2026",
    h1: "Statutory vs enhanced redundancy pay: what are you owed?",
    description:
      "Statutory redundancy pay is the legal minimum. Enhanced redundancy pay is a more generous contractual or discretionary scheme. Here's how to tell which applies and how to calculate both.",
    summary: "The legal minimum vs what your employer may owe you — and how to calculate both.",
    country: "UK",
    aLabel: "Statutory redundancy pay",
    bLabel: "Enhanced redundancy pay",
    intro:
      "Every eligible employee is entitled to statutory redundancy pay — a minimum set by Parliament and updated annually. Many employers, particularly larger organisations, pay more than this through contractual or discretionary enhanced redundancy schemes. Knowing which applies to you can make a substantial difference to what you receive.",
    rows: [
      { aspect: "Source", a: "Employment Rights Act 1996 (ERA 1996 s.162)", b: "Employment contract, collective agreement, staff handbook, or employer discretion" },
      { aspect: "Qualifying service", a: "2 years' continuous employment", b: "Often 1 year or from day one (depends on employer scheme)" },
      { aspect: "Weekly pay cap (2026/27)", a: "£751 per week maximum", b: "Uncapped — employer may use actual salary or a higher cap" },
      { aspect: "Maximum years counted", a: "20 years", b: "Often higher — some schemes count all years of service" },
      { aspect: "Age multiplier", a: "Under 22: 0.5 week per year; 22–40: 1 week per year; 41+: 1.5 weeks per year", b: "Varies — many employers use a flat 1 or 1.5 week per year regardless of age" },
      { aspect: "Maximum statutory pay (2026/27)", a: "£22,530 (20 years × £751 × 1.5 for 41+ age bracket)", b: "No upper limit — can be significantly higher" },
      { aspect: "Tax treatment", a: "First £30,000 of total termination payment is tax-free", b: "First £30,000 of total termination payment is tax-free (statutory + enhanced combined)" },
      { aspect: "If employer refuses to pay", a: "Can claim at Employment Tribunal within 6 months of termination", b: "Can claim breach of contract at Employment Tribunal or county court" },
    ],
    verdict:
      "Always check your employment contract, any staff handbooks, and applicable collective agreements before accepting a redundancy offer. If your contract or handbook specifies an enhanced scheme, your employer is contractually bound to apply it — paying only the statutory minimum when a higher scheme is in place is a breach of contract. Even where a scheme is described as 'discretionary', if it has been applied consistently, employees may have a legitimate expectation that it will apply to them.",
    faqs: [
      {
        q: "How is statutory redundancy pay calculated?",
        a: "Statutory redundancy pay = number of complete years of continuous employment (up to 20) × weekly pay (capped at £751 from 6 April 2026) × age multiplier (0.5 for under-22 service years, 1 for 22–40 service years, 1.5 for 41+ service years). The maximum is £22,530. Use the government's redundancy pay calculator or ours to get the exact figure.",
      },
      {
        q: "What is the £30,000 tax-free threshold?",
        a: "The first £30,000 of your total termination payment is exempt from income tax and National Insurance contributions. This threshold applies to the combination of statutory redundancy pay, any enhanced redundancy pay, and any ex gratia payments. Notice pay (PILON) does not benefit from this exemption — it is fully taxable. If your total redundancy and termination payment exceeds £30,000, the excess is subject to income tax.",
      },
      {
        q: "Can my employer cut my enhanced redundancy scheme without telling me?",
        a: "If the enhanced scheme is a contractual term (in your contract or incorporated by a collective agreement), your employer cannot remove it without your consent and following a proper process — doing so is a breach of contract. If it is a genuinely discretionary scheme that has never been committed to contractually, your employer has more flexibility, but consistent past practice can create a reasonable expectation that makes removal legally risky.",
      },
      {
        q: "Does enhanced redundancy pay affect my statutory entitlement?",
        a: "No. Enhanced pay is paid in addition to, and separately from, the statutory calculation. If your employer's scheme pays 2 weeks per year of service on actual salary, you are also owed the statutory calculation as a minimum. In practice, most enhanced schemes are expressed as a multiple of or substitute for statutory pay — your contract will specify which.",
      },
      {
        q: "What if I was only employed for 18 months — am I owed anything?",
        a: "Statutory redundancy pay requires 2 years' continuous service, so you would not qualify for the statutory payment. However, if your employer has an enhanced scheme with a shorter qualifying period (some start from day one or after 1 year), check your contract and handbook. You are also entitled to your notice period (or PILON) regardless of length of service.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "constructive-vs-unfair-dismissal",
    title: "Constructive vs Unfair Dismissal: Key Differences 2026",
    h1: "Constructive dismissal vs unfair dismissal: what's the difference?",
    description:
      "Constructive dismissal is where you resign; unfair dismissal is where your employer fires you. Both can lead to an Employment Tribunal claim — but the burden of proof and process differ significantly.",
    summary: "You resign vs your employer fires you — both can lead to tribunal.",
    country: "UK",
    aLabel: "Constructive dismissal",
    bLabel: "Unfair dismissal",
    intro:
      "Both constructive dismissal and unfair dismissal are types of claim you can bring in the Employment Tribunal, and both require 2 years' continuous employment (unless automatically unfair). The fundamental difference is who ends the employment: in constructive dismissal, you resign; in unfair dismissal, your employer fires you. The legal tests, burden of proof, and risks involved are very different.",
    rows: [
      { aspect: "Who ends the employment", a: "You resign — because your employer's conduct left you no reasonable alternative", b: "Your employer fires you" },
      { aspect: "Legal basis", a: "ERA 1996 s.95(1)(c) — employee terminates with or without notice in response to employer's repudiatory breach of contract", b: "ERA 1996 s.98 — employer dismisses without a fair reason or without a fair process" },
      { aspect: "Qualifying period", a: "2 years (unless automatically unfair ground applies)", b: "2 years (unless automatically unfair ground applies)" },
      { aspect: "Burden of proof", a: "Employee must prove: (1) fundamental breach of contract, (2) resignation was caused by the breach, (3) they did not affirm the breach by continuing too long", b: "Employer must show a potentially fair reason; tribunal then assesses fairness of reason and procedure" },
      { aspect: "Risk to employee", a: "High — if the tribunal finds the breach was not fundamental, or you affirmed it, you lose and receive nothing. You also lose your job voluntarily.", b: "Lower — employer must justify the dismissal; employee does not need to establish a breach" },
      { aspect: "What triggers it", a: "Fundamental breach of contract: pay cuts, demotion, bullying, hostile working environment, removing duties, changing location unreasonably", b: "Employer dismisses for no good reason, unfair reason, or without following a fair process (even if reason was potentially fair)" },
      { aspect: "Notice on resignation", a: "Can resign with or without notice — either can found a constructive dismissal claim. Resigning without notice does not amount to misconduct if the breach was serious enough.", b: "Employer must give notice (or PILON) unless gross misconduct justifies summary dismissal" },
      { aspect: "Compensation", a: "Same as unfair dismissal: basic award + compensatory award up to £123,543 or 52 weeks' pay", b: "Basic award + compensatory award up to £123,543 or 52 weeks' pay" },
    ],
    verdict:
      "Constructive dismissal claims are harder to win than unfair dismissal claims — you carry the burden of proving your employer committed a fundamental breach, and any delay in resigning risks being taken as 'affirming' the breach. Always take legal advice before resigning with a view to claiming constructive dismissal. If your employer has fired you and the reason or process was unfair, an unfair dismissal claim is usually more straightforward.",
    faqs: [
      {
        q: "Do I need to resign to claim constructive dismissal?",
        a: "Yes. Constructive dismissal by definition requires you to resign. You must treat the contract as repudiated by your employer (i.e. resign) before you can bring the claim. If you continue working for too long after the breach, you risk being found to have 'affirmed' the contract — meaning you accepted the breach — which ends your ability to claim.",
      },
      {
        q: "Does constructive dismissal always involve bullying?",
        a: "No. Constructive dismissal can arise from any fundamental breach of the employment contract — the most common are: unjustified pay cuts, demotion, changes to location or working hours without contractual right, removal of duties or responsibilities (making the role untenable), and sustained failure to support an employee against workplace bullying. A single serious breach or a course of cumulative conduct can both found a claim.",
      },
      {
        q: "What is the 'last straw' doctrine in constructive dismissal?",
        a: "The last straw doctrine allows an employee to rely on a series of acts by the employer, none of which individually amounted to a fundamental breach, where the final act (the 'last straw') tips the balance. The last straw itself does not need to be a fundamental breach — it just needs to contribute to the breach of the implied term of trust and confidence. The final act must not be entirely innocuous.",
      },
      {
        q: "What is the implied term of trust and confidence?",
        a: "Every employment contract contains an implied term that the employer will not, without reasonable and proper cause, act in a manner calculated or likely to destroy or seriously damage the relationship of trust and confidence between employer and employee (Malik v BCCI [1997] UKHL 23). Breach of this implied term — typically through serious or sustained misconduct by the employer — is the most commonly relied upon ground for constructive dismissal.",
      },
      {
        q: "Can I bring an unfair dismissal claim if I resigned?",
        a: "Yes — if your resignation qualifies as a constructive dismissal. Under ERA 1996 s.95(1)(c), a resignation in response to a fundamental breach by the employer is treated as a dismissal for unfair dismissal purposes. You are not claiming 'unfair dismissal' in the sense of being fired — you are claiming that the constructive dismissal was also unfair, which follows almost automatically once the constructive dismissal is established.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
      { name: "Notice period calculator", slug: "notice-period-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "gross-misconduct-vs-misconduct",
    title: "Gross Misconduct vs Misconduct: What's the Difference? 2026",
    h1: "Gross misconduct vs misconduct: what's the difference?",
    description:
      "Gross misconduct allows summary dismissal — no notice, no pay in lieu. Ordinary misconduct requires a formal disciplinary process with warnings. Here is how employers and tribunals distinguish them.",
    summary: "One allows instant dismissal without pay — the other requires warnings first.",
    country: "UK",
    aLabel: "Gross misconduct",
    bLabel: "Misconduct",
    intro:
      "Misconduct is behaviour that falls below the standard your employer reasonably expects. Gross misconduct is a subset that is so serious it fundamentally destroys the employment relationship — allowing summary dismissal (immediate, without notice or pay in lieu). The distinction matters enormously: gross misconduct means you lose your notice pay; ordinary misconduct typically means a warning, not dismissal.",
    rows: [
      { aspect: "Definition", a: "Conduct so serious it fundamentally destroys the employer–employee relationship", b: "Behaviour falling below the expected standard, but not serious enough to justify immediate dismissal" },
      { aspect: "Dismissal outcome", a: "Summary dismissal — immediate, without notice or pay in lieu", b: "Formal warnings (verbal → written → final written); dismissal only after process exhausted" },
      { aspect: "Notice pay on dismissal", a: "None — summary dismissal means no notice entitlement if the finding is upheld", b: "Full statutory or contractual notice (or PILON) is owed even on dismissal" },
      { aspect: "Common examples", a: "Theft, fraud, physical violence, sexual harassment, serious health & safety breaches, deliberate data destruction", b: "Poor timekeeping, minor insubordination, low performance (conduct-based), occasional policy breaches" },
      { aspect: "Investigation requirement", a: "Still required — employer must investigate before dismissing, even for gross misconduct (ACAS Code)", b: "Required at every stage — investigation, disciplinary hearing, right of appeal" },
      { aspect: "ACAS Code compliance", a: "Applies — failure to follow the Code can result in up to 25% uplift on any award at tribunal", b: "Applies — employer must follow: investigation, written invitation, hearing, outcome letter, right of appeal" },
      { aspect: "Unfair dismissal risk", a: "Dismissal may still be unfair if the employer did not genuinely believe in guilt, had insufficient grounds, or followed an unfair process", b: "High risk of unfair dismissal if employer skips warnings or fails to follow a fair process" },
      { aspect: "Redundancy pay", a: "Not affected by gross misconduct — if redundancy is genuine, pay is owed regardless", b: "Not affected" },
    ],
    verdict:
      "Even where the conduct is genuinely serious, employers are not free to dismiss without following the ACAS Code of Practice. A finding of gross misconduct that is arrived at after an inadequate investigation, without a proper disciplinary hearing, or without a right of appeal may still be unfair — and a 25% uplift may apply to any award. If you have been dismissed for alleged gross misconduct and dispute the finding, you may have an unfair dismissal claim.",
    faqs: [
      {
        q: "Can I be dismissed for gross misconduct without a warning?",
        a: "Yes — summary dismissal for gross misconduct does not require prior warnings, because the conduct itself is so serious. However, your employer must still carry out a fair investigation and disciplinary procedure before dismissing. Skipping the investigation, not giving you a chance to respond, or failing to offer a right of appeal can make the dismissal procedurally unfair.",
      },
      {
        q: "Do I lose my redundancy pay if I'm dismissed for gross misconduct?",
        a: "No. Statutory redundancy pay is owed when a genuine redundancy situation exists, regardless of any prior misconduct. The only way misconduct can affect redundancy pay is if your employer dismisses you for misconduct as an alternative to making you redundant — but a dismissal for gross misconduct during a genuine redundancy process could be challenged as unfair if the conduct was used as a pretext.",
      },
      {
        q: "What is the ACAS Code of Practice on disciplinary procedures?",
        a: "The ACAS Code of Practice on Disciplinary and Grievance Procedures sets out the steps an employer should take in any disciplinary situation: investigate, inform the employee in writing, hold a hearing (with the right to be accompanied by a colleague or trade union representative), inform the employee of the outcome, and offer a right of appeal. Failure to follow the Code does not automatically make a dismissal unfair, but an Employment Tribunal can increase any award by up to 25% if the employer unreasonably failed to follow it.",
      },
      {
        q: "I was dismissed for gross misconduct but I deny the allegation. What can I do?",
        a: "If you have 2 years' continuous employment, you can bring an unfair dismissal claim at the Employment Tribunal (after going through ACAS early conciliation). The tribunal will ask whether the employer had a genuine belief in your guilt, whether there were reasonable grounds for that belief after a proper investigation, and whether the sanction of dismissal was within the range of reasonable responses. You do not need to prove your innocence — you need to show the employer's process or conclusion was outside the range of reasonable responses.",
      },
      {
        q: "Can I be put on suspension during a gross misconduct investigation?",
        a: "Yes. Suspension on full pay during a disciplinary investigation is common and is not, in itself, a disciplinary sanction or a breach of contract (unless your contract prohibits it). However, automatic or lengthy suspension without genuine reason can in some circumstances amount to a breach of the implied term of trust and confidence — particularly for senior employees or those whose professional reputation could be damaged.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
      { name: "Notice period calculator", slug: "notice-period-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "resignation-vs-redundancy",
    title: "Resignation vs Redundancy: Rights, Pay & Benefits 2026",
    h1: "Resignation vs redundancy: how your rights differ",
    description:
      "Resigning and being made redundant both end your employment — but your pay entitlements, benefit access, and legal rights are very different. Here's what changes depending on which applies.",
    summary: "Voluntary vs involuntary exit — pay entitlements, benefits, and rights differ significantly.",
    country: "UK",
    aLabel: "Resignation",
    bLabel: "Redundancy",
    intro:
      "Whether you leave a job voluntarily (resignation) or involuntarily (redundancy) dramatically affects what money you're owed, your access to benefits, and your ongoing rights. If your employer is pressuring you to resign rather than making you redundant, you may be losing significant entitlements — understanding the difference is critical.",
    rows: [
      { aspect: "Who initiates", a: "You — you choose to leave", b: "Your employer — they eliminate your role" },
      { aspect: "Statutory redundancy pay", a: "None — resignation carries no redundancy pay entitlement", b: "Yes — up to £22,530 for eligible employees with 2+ years' service" },
      { aspect: "Notice entitlement", a: "You must give your contractual or statutory minimum notice period to your employer", b: "Your employer must give you statutory or contractual notice (or PILON)" },
      { aspect: "Tax-free payment", a: "None (unless leaving as part of a settlement)", b: "Redundancy pay up to £30,000 total termination payment is tax-free" },
      { aspect: "Universal Credit / JSA", a: "Voluntary unemployment may result in a benefit sanction period (typically 9–26 weeks)", b: "No sanction for redundancy; redundancy pay is disregarded for Universal Credit purposes for first 26 weeks" },
      { aspect: "P45 and final pay", a: "Employer must provide P45 and pay outstanding wages/holiday within the last payroll cycle", b: "Same, plus statutory redundancy pay (and any enhanced pay) on or before agreed date" },
      { aspect: "Constructive dismissal risk", a: "If forced/pressured to resign, this may be constructive dismissal — and treated as redundancy for pay purposes", b: "N/A — genuinely involuntary" },
      { aspect: "COBRA / health insurance (US context)", a: "Resignation typically qualifies for COBRA continuation at full premium cost", b: "Redundancy/layoff qualifies for COBRA; may also qualify for Medicaid/ACA subsidised plan" },
    ],
    verdict:
      "Never resign under pressure without understanding what you are giving up. If your employer is threatening dismissal or making your working conditions untenable to force a resignation, this may be constructive dismissal — which entitles you to the same rights as redundancy. If you are genuinely in a redundancy situation, insist on being made redundant rather than resigning: the difference can be £22,530 in redundancy pay plus a tax-free exit, versus nothing.",
    faqs: [
      {
        q: "If I resign during a redundancy consultation, do I still get redundancy pay?",
        a: "It depends on timing. If you resign during the notice period given to you in a redundancy situation (after being told your role is at risk and given a termination date), you may still be entitled to statutory redundancy pay under ERA 1996 s.136(3), provided you give the employer written notice during the statutory notice period. However, resigning before you are formally put at risk of redundancy typically ends your entitlement. Take advice before resigning during any redundancy process.",
      },
      {
        q: "Can my employer ask me to resign instead of making me redundant?",
        a: "Employers often prefer employees to resign rather than be made redundant — it avoids paying redundancy pay and can avoid the appearance of a dismissal. You are under no legal obligation to resign. If the role is genuinely redundant and you have 2+ years' service, you are entitled to be formally made redundant and to receive redundancy pay. Agreeing to resign to avoid the formal process is giving up significant legal rights.",
      },
      {
        q: "What notice must I give if I resign?",
        a: "You must give the notice specified in your employment contract. If your contract is silent, the statutory minimum is 1 week after 1 month's employment. Most contracts specify 1–3 months for professional roles. Failing to work or pay in lieu of your full notice period can result in a breach of contract claim by your employer, though this is rarely pursued in practice for junior roles.",
      },
      {
        q: "Does redundancy affect my state pension?",
        a: "Being made redundant does not directly reduce your state pension entitlement — your qualifying years are not affected. However, if you are out of work for an extended period and not making National Insurance contributions, this can affect future state pension accrual. You may be able to claim National Insurance credits while on Universal Credit or JSA, which protects your qualifying years.",
      },
      {
        q: "What if my employer offers me a settlement agreement to leave?",
        a: "A settlement agreement (formerly called a compromise agreement) is a legally binding agreement to end your employment. The employer typically offers an enhanced exit package in exchange for you giving up your right to bring tribunal claims. A settlement agreement must be signed with independent legal advice to be valid — your employer usually contributes to your legal fees. Carefully compare the settlement offer against what you would receive through a redundancy process before signing.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
      { name: "Notice period calculator", slug: "notice-period-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "tupe-vs-standard-redundancy",
    title: "TUPE vs Standard Redundancy: What Are Your Rights? 2026",
    h1: "TUPE vs standard redundancy: different rules, different rights",
    description:
      "TUPE transfers preserve your terms and conditions and make transfer-related dismissal automatically unfair. Standard redundancy follows a different consultation and pay process. Here's how to tell which applies.",
    summary: "A business transfer triggers TUPE — not standard redundancy. The rules are very different.",
    country: "UK",
    aLabel: "TUPE transfer",
    bLabel: "Standard redundancy",
    intro:
      "When a business is sold, outsourced, or a service contract changes hands, the Transfer of Undertakings (Protection of Employment) Regulations 2006 (TUPE) applies — not standard redundancy. TUPE gives you stronger protections than a standard redundancy situation, including automatic preservation of your terms and conditions and special rules around dismissal. Understanding which regime applies to you is essential.",
    rows: [
      { aspect: "Legal framework", a: "Transfer of Undertakings (Protection of Employment) Regulations 2006 (as amended 2014)", b: "Employment Rights Act 1996 (ERA 1996) s.135–s.145" },
      { aspect: "When it applies", a: "Business sale, outsourcing, re-tendering of a service contract, or insourcing (service provision change)", b: "When the employer's need for employees doing your type of work diminishes or ceases" },
      { aspect: "Terms and conditions", a: "Automatically preserved — new employer inherits your existing terms exactly. Changes connected to the transfer are void.", b: "No preservation — your terms remain as agreed with your employer; employer can propose changes with proper notice" },
      { aspect: "Dismissal", a: "Dismissal connected to the TUPE transfer is automatically unfair (Reg 7), unless there is an ETO reason", b: "Potentially fair if genuine redundancy, with fair selection, consultation, and notice" },
      { aspect: "Redundancy pay on dismissal", a: "If dismissal is for a genuine ETO reason (not just the transfer itself), statutory redundancy pay applies as normal", b: "Statutory redundancy pay applies: up to £22,530 with 2+ years' service" },
      { aspect: "Consultation obligation", a: "Information and consultation before the transfer with employee representatives; failure = up to 13 weeks' pay per employee (uncapped)", b: "Individual consultation required; 45-day collective consultation if 100+ redundancies" },
      { aspect: "Continuous employment", a: "Service years with old employer transfer to new employer — your continuity is unbroken", b: "Redundancy ends employment; new employment starts fresh service count" },
      { aspect: "Pension rights", a: "New employer must offer broadly comparable pension — accrued DB pension rights do not automatically transfer", b: "No pension obligation beyond what is owed on termination" },
    ],
    verdict:
      "TUPE gives you significantly stronger protections than a standard redundancy. If you are at risk of dismissal around the time of a business transfer or contract re-tender, always establish whether TUPE applies first. If TUPE applies, your employer cannot simply make you redundant because of the transfer — they need an ETO reason unconnected to it. The information and consultation compensation (up to 13 weeks' pay, uncapped) can be substantial if the employer failed to follow the TUPE consultation rules.",
    faqs: [
      {
        q: "Can I be made redundant under TUPE?",
        a: "Not because of the transfer itself. Regulation 7 TUPE 2006 makes dismissal automatically unfair if the sole or principal reason is the transfer. However, if the new employer can show an economic, technical, or organisational (ETO) reason entailing a change in the workforce — such as a genuine post-transfer restructuring — dismissal may be fair, provided a fair procedure is followed. The ETO reason must be genuine and not a pretext for dismissal related to the transfer.",
      },
      {
        q: "How do I know if TUPE applies to my situation?",
        a: "TUPE applies in two situations: (1) a business transfer — where an economic entity retaining its identity moves from one employer to another (typically a company or division sale); and (2) a service provision change — where a service contract is outsourced, re-tendered to a different contractor, or brought back in-house. If your employer is selling the business or losing/winning a service contract and your role is connected to it, TUPE likely applies.",
      },
      {
        q: "What is an ETO reason under TUPE?",
        a: "An ETO (economic, technical, or organisational) reason is one that entails a change in the workforce — a reduction in headcount, a change in the type of roles, or a reorganisation affecting how work is carried out. It must be a genuine business reason unconnected to the transfer itself. A new employer wanting to cut staff simply because they consider the workforce too large for the transferred business is not an ETO reason — that is the transfer. A genuine restructuring to address financial losses that would have happened transfer or not may qualify.",
      },
      {
        q: "Does my service with my old employer count under TUPE?",
        a: "Yes. One of the most important consequences of TUPE is that your continuous employment transfers with you. Your service years with the old employer count towards your rights with the new employer — including unfair dismissal qualifying period, statutory redundancy pay entitlement, and notice entitlement. This is the case even if the new employer is a completely different legal entity.",
      },
      {
        q: "What happens to my pension under TUPE?",
        a: "Occupational pension rights are only partially protected under TUPE. The new employer must offer a broadly comparable pension scheme — they cannot simply leave you without pension provision. However, your accrued defined benefit (final salary) pension rights do not automatically transfer in the same way as other contractual terms — you remain a deferred member of the old employer's scheme for those accrued rights. Active future pension accrual is governed by the comparable scheme the new employer must provide.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
      { name: "Notice period calculator", slug: "notice-period-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "pto-vs-vacation",
    title: "PTO vs Vacation: Difference and Payout Rules 2026",
    h1: "PTO vs vacation: what's the difference and what gets paid out?",
    description:
      "PTO and vacation are often used interchangeably — but they are different leave structures with very different payout rules when you leave a job. Here's what the difference means for what you're owed.",
    summary: "One pooled bank vs one dedicated bucket — and payout rules differ by state.",
    country: "US",
    aLabel: "PTO (Paid Time Off)",
    bLabel: "Vacation",
    intro:
      "Many US employers now offer PTO — a single bank of paid leave that covers vacation, sick days, and personal days — instead of separate vacation and sick leave. Whether your unused leave is called PTO or vacation can matter significantly when you leave a job, because some states require vacation payout but not PTO payout. Understanding the distinction may determine whether you are owed hundreds or thousands of dollars.",
    rows: [
      { aspect: "What it covers", a: "A single pooled bank: vacation, sick leave, and personal days combined", b: "Dedicated vacation days only — sick leave and personal days are separate" },
      { aspect: "Flexibility", a: "Employee uses hours for any absence — no categorisation required", b: "Employee uses vacation days for planned time off; sick leave is separate" },
      { aspect: "Employer preference", a: "Simpler administration; reduces tracking of separate leave types", b: "Traditional structure; some employers prefer to track reasons for absence" },
      { aspect: "State payout rules", a: "Some states treat PTO as wages and require full payout on termination; others treat the sick component differently", b: "Many states explicitly require vacation payout on termination (California, Colorado, Illinois, and others); vacation is treated as earned wages" },
      { aspect: "Risk on termination", a: "If your state treats sick leave differently from vacation, employer may argue PTO is partly sick leave and not payable", b: "In states requiring vacation payout, employer must pay all accrued but unused vacation — no forfeiture allowed" },
      { aspect: "Use-it-or-lose-it policies", a: "Permitted in some states (e.g. New York for PTO with proper notice); prohibited in others (e.g. California for any accrued leave)", b: "Permitted in most states for vacation if clearly stated in policy; prohibited in California and a few others" },
      { aspect: "Accrual structure", a: "May accrue per pay period or be front-loaded at the start of the year", b: "Usually accrues per pay period or per month; some employers front-load" },
      { aspect: "Cap on accrual", a: "Employers may cap accrual once a certain balance is reached", b: "Employers may cap accrual; cap does not usually trigger automatic payout" },
    ],
    verdict:
      "Whether you are owed payout for unused PTO or vacation depends almost entirely on your state. California, Colorado, Illinois, and several others treat accrued vacation (and often PTO) as earned wages that cannot be forfeited. If you are in one of these states and your employer refuses to pay out your accrued balance on termination, they may be violating wage and hour law. Check your state's rule — and your employer's written policy — before assuming either way.",
    faqs: [
      {
        q: "Does federal law require PTO or vacation payout when I leave a job?",
        a: "No. There is no federal law requiring employers to provide vacation or PTO, or to pay it out on termination. The rules are entirely state-by-state. Some states (California, Colorado, Illinois, Louisiana, Massachusetts, Minnesota, Montana, Nebraska) treat accrued vacation as earned wages and require full payout. Others allow use-it-or-lose-it policies. Most states fall somewhere in between.",
      },
      {
        q: "My employer calls it PTO but I think it should be treated as vacation — does the name matter?",
        a: "In some states, yes. A few states distinguish between vacation pay (which must be paid out) and sick leave (which need not be). If your employer labels your leave 'PTO' but it effectively functions as vacation, a court may treat it as vacation for payout purposes. Conversely, if the PTO policy genuinely combines sick leave with vacation, the employer may be able to argue that the sick component is not payable. The label matters less than the substance and how the state defines leave for payout purposes.",
      },
      {
        q: "Can my employer have a use-it-or-lose-it policy for vacation?",
        a: "It depends on your state. California explicitly prohibits use-it-or-lose-it vacation policies — accrued vacation is earned wages that cannot be forfeited. Colorado and a few other states take a similar position. Most states permit use-it-or-lose-it policies provided the employer communicates them clearly in writing. Your employer's written leave policy governs — but it cannot override state law.",
      },
      {
        q: "What happens to my PTO if I'm laid off vs if I quit?",
        a: "In states that require vacation/PTO payout, it does not matter whether you were laid off or resigned — accrued, unused leave must be paid in your final paycheck (in California, on your last day; in other states, within the final paycheck deadline). In states that do not require payout, your employer's written policy governs, and many employers choose to pay out on layoff but not on resignation (or vice versa).",
      },
      {
        q: "Is PTO payout taxable?",
        a: "Yes. PTO and vacation payouts are treated as regular wages and are subject to federal income tax, FICA (Social Security and Medicare), and state income tax where applicable. If you receive a large lump sum of unused PTO in your final paycheck, it may push you into a higher tax bracket for that pay period — though your annual tax liability will be assessed when you file.",
      },
    ],
    relatedTools: [
      { name: "PTO payout calculator", slug: "pto-payout-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
  {
    slug: "severance-vs-redundancy-pay",
    title: "Severance Pay vs Redundancy Pay: What's the Difference? 2026",
    h1: "Severance pay vs redundancy pay: are they the same thing?",
    description:
      "In the UK, redundancy pay and severance pay are often confused — but they are different concepts. Redundancy pay is a statutory entitlement; severance can mean a broader contractual or negotiated exit payment.",
    summary: "Statutory entitlement vs negotiated exit package — understanding what you're owed.",
    country: "UK",
    aLabel: "Statutory redundancy pay",
    bLabel: "Severance pay",
    intro:
      "In UK employment law, 'redundancy pay' has a specific statutory meaning — it is the payment owed under the Employment Rights Act 1996 when you are made redundant after 2 years' service. 'Severance pay' is a broader, informal term that can refer to the total exit package including notice pay, redundancy pay, accrued holiday, and any ex gratia payment. Knowing what each element is and how it is taxed is essential before signing any settlement.",
    rows: [
      { aspect: "Definition", a: "A statutory payment owed under ERA 1996 when employment ends by reason of redundancy", b: "An umbrella term for any payment made on termination — may include notice pay, redundancy pay, holiday pay, and ex gratia payments" },
      { aspect: "Legal basis", a: "Mandatory under ERA 1996 s.135 — employer has no discretion to refuse if conditions are met", b: "Contractual or negotiated — depends on what the employer agrees to pay (or the contract requires)" },
      { aspect: "Qualifying condition", a: "2 years' continuous employment; genuine redundancy", b: "As agreed — may be available from day one if the contract provides it" },
      { aspect: "Calculation", a: "Statutory formula: age × years × weekly pay (capped at £751); maximum £22,530", b: "Depends on the exit agreement — may be a multiple of salary, a fixed sum, or a formula" },
      { aspect: "Tax treatment", a: "Tax-free up to £30,000 (combined with other qualifying termination payments)", b: "Notice pay is fully taxable. Redundancy and ex gratia elements are tax-free up to £30,000 combined. Amounts above £30,000 are taxed." },
      { aspect: "Can employer refuse?", a: "No — withholding statutory redundancy pay is unlawful; can claim at tribunal within 6 months", b: "If contractual: no — breach of contract claim available. If discretionary: employer has more latitude, but consistent past practice creates expectations." },
      { aspect: "Typical components", a: "Statutory formula payment only", b: "Notice pay (PILON) + statutory redundancy pay + enhanced redundancy + ex gratia + accrued holiday + benefits buyout" },
    ],
    verdict:
      "When your employer offers you a 'severance package', check each component separately. Statutory redundancy pay is a legal floor — it can be enhanced but not reduced. Notice pay (or PILON) is a separate entitlement. Any amount described as 'ex gratia' or 'compensation' is negotiable and may benefit from the £30,000 tax-free threshold. Always get the breakdown of each element in writing before signing a settlement agreement.",
    faqs: [
      {
        q: "Is redundancy pay the same as a settlement agreement payment?",
        a: "No. Redundancy pay is a specific statutory entitlement under ERA 1996. A settlement agreement is a legally binding contract under which you waive your right to bring tribunal claims in exchange for an agreed payment. The settlement payment may include statutory redundancy pay, enhanced redundancy pay, PILON, and an ex gratia payment — but the settlement agreement itself is a broader document that ends the employment relationship and settles all claims.",
      },
      {
        q: "Can I negotiate my severance package?",
        a: "Yes — within limits. You cannot negotiate below the statutory minimums (statutory redundancy pay, statutory notice). But the ex gratia component, any enhanced redundancy, and the notice payment structure are all negotiable. Your strongest negotiating lever is any potential tribunal claim — unfair dismissal, discrimination, or breach of contract claims give you leverage to negotiate a higher exit package.",
      },
      {
        q: "What is an ex gratia payment?",
        a: "Ex gratia means 'as a favour' — a payment not required by contract or statute but paid by the employer as a goodwill gesture (often to settle potential claims or incentivise a clean exit). Ex gratia payments qualify for the £30,000 tax-free threshold when combined with statutory redundancy pay. They are often the negotiable element of an exit package and should be maximised in settlement negotiations.",
      },
      {
        q: "Is statutory redundancy pay always tax-free?",
        a: "Statutory redundancy pay is part of the £30,000 tax-free threshold on termination payments. Provided your total qualifying termination payments (statutory redundancy pay + any enhanced redundancy + ex gratia) do not exceed £30,000, you pay no tax or National Insurance on them. If the total exceeds £30,000, only the excess is taxable. Note that notice pay (PILON) is always fully taxable and does not count towards the £30,000.",
      },
      {
        q: "My employer is calling my exit a 'mutual agreement' — do I still get redundancy pay?",
        a: "Possibly not automatically. Statutory redundancy pay requires a dismissal by reason of redundancy — if you agree to leave voluntarily (even in a redundancy situation), this may be treated as a consensual termination that does not trigger the statutory entitlement. However, if the underlying reason is genuinely that your role is redundant, many employers still pay statutory redundancy pay as part of the package. If they do not, and the redundancy situation is genuine, you may be able to challenge the characterisation at tribunal.",
      },
    ],
    relatedTools: [
      { name: "Redundancy pay calculator", slug: "redundancy-pay-calculator" },
    ],
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
  },
];

export function getComparison(slug: string): ComparisonMeta | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
