/**
 * Employment law editorial blog.
 * Each post is a standalone article targeting informational/educational search intent.
 * Full content lives in app/blog/[slug]/content/ as TSX components.
 */

export type BlogRegion = "UK" | "US" | "AU" | "CA" | "Global";
export type BlogCategory =
  | "redundancy"
  | "pay-rights"
  | "leaving-job"
  | "parental-leave"
  | "workplace-rights"
  | "tax"
  | "employment-law-changes";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** Short summary for cards */
  excerpt: string;
  /** 1–2 sentence direct answer shown as a callout at the top of the article. */
  quickAnswer?: string;
  region: BlogRegion;
  category: BlogCategory;
  datePublished: string;
  dateModified: string;
  readingTimeMinutes: number;
  tags: string[];
  relatedTools: string[];
  /** In-article next steps tailored to this post's subject, never generic hubs. */
  contextualLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "uk-redundancy-pay-guide-2026",
    title: "UK Redundancy Pay 2026/27: What Changed This Year",
    description:
      "The 2026/27 UK redundancy-pay update: the new £751 weekly cap, the £22,530 maximum, what stayed unchanged, and what workers should check now.",
    excerpt:
      "A focused annual update on the 2026/27 statutory limits and their practical effect, with links to the evergreen rules guide and calculator.",
    quickAnswer:
      "From 6 April 2026, the weekly-pay cap used for statutory redundancy calculations is £751 and the maximum statutory award is £22,530. The age multipliers, 20-year service cap, 2-year qualifying period and £30,000 termination-payment tax threshold are unchanged.",
    region: "UK",
    category: "redundancy",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 7,
    tags: ["redundancy", "statutory redundancy pay", "employment rights", "UK"],
    relatedTools: ["redundancy-pay-calculator", "notice-period-calculator"],
    contextualLinks: [
      { href: "/redundancy-pay-calculator", label: "Calculate statutory redundancy pay", description: "Apply the 2026/27 weekly cap to your age, service and weekly pay." },
      { href: "/guides/uk-redundancy-pay", label: "Read the complete redundancy guide", description: "Check eligibility, worked examples, tax treatment and dispute steps." },
      { href: "/faq/what-is-the-redundancy-pay-cap", label: "Understand the weekly-pay cap", description: "See how the statutory cap limits the pay used in the calculation." },
    ],
  },
  {
    slug: "how-to-negotiate-severance-pay-uk",
    title: "How to Negotiate Severance Pay in the UK: A Step-by-Step Guide",
    description:
      "Statutory redundancy pay is the floor, not the ceiling. Learn how to negotiate enhanced severance — what leverage you have, what to ask for, and what employers will agree to.",
    excerpt:
      "Your employer offered you statutory redundancy pay. Here is how to negotiate an enhanced severance package — including settlement agreements, ex gratia payments, and common employer concessions.",
    quickAnswer:
      "Statutory redundancy pay is a legal minimum, not the ceiling. You can negotiate enhanced severance by citing your potential tribunal claims, seniority, and the disruption cost to your employer — the most common result is a settlement agreement paying 2–6 months' salary above the statutory figure.",
    region: "UK",
    category: "redundancy",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 8,
    tags: ["severance pay", "settlement agreement", "redundancy negotiation", "UK"],
    relatedTools: ["redundancy-pay-calculator", "severance-pay-calculator"],
    contextualLinks: [
      { href: "/settlement-agreement-calculator", label: "Estimate a settlement range", description: "Model notice pay, statutory entitlements and a negotiated ex gratia amount." },
      { href: "/guides/uk-settlement-agreement", label: "Review settlement agreement rights", description: "Understand independent advice, tax treatment and common clauses before negotiating." },
      { href: "/faq/how-much-is-a-settlement-agreement-worth", label: "What might an agreement be worth?", description: "Compare the practical factors that influence an employer's offer." },
    ],
  },
  {
    slug: "us-final-paycheck-laws-by-state",
    title: "US Final Paycheck Laws by State: Every Deadline in 2026",
    description:
      "Final paycheck deadlines vary by state and by how employment ended. Check every 2026 deadline in one place.",
    excerpt:
      "Final paycheck deadlines range from the same day (California if you are fired) to the next regular payday in over 20 states. Here is every state's rules in one place.",
    quickAnswer:
      "Your final paycheck deadline depends on your state and how employment ended. California requires immediate payment on the day of discharge; most states require payment by the next regular payday. Employers who miss the deadline typically owe penalties of one to three days' wages for each day late.",
    region: "US",
    category: "pay-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 7,
    tags: ["final paycheck", "wages", "state employment law", "US"],
    relatedTools: ["final-paycheck-deadline-calculator", "pto-payout-calculator"],
    contextualLinks: [
      { href: "/final-paycheck-deadline-calculator", label: "Check your final-pay deadline", description: "Select your state and how the job ended to find the applicable deadline." },
      { href: "/pto-payout-calculator", label: "Check unused PTO payout rules", description: "See whether state law or the employer's written policy controls unused leave." },
      { href: "/research/us-final-paycheck-laws", label: "Explore the sourced state-law dataset", description: "Compare every state's rule and follow the underlying agency sources." },
    ],
  },
  {
    slug: "uk-notice-period-rights-explained",
    title: "UK Notice Period Rights: Notice, Garden Leave and PILON",
    description:
      "Confused about notice periods? This guide explains the statutory minimum, what happens if your contract gives more, garden leave, pay in lieu of notice, and wrongful dismissal.",
    excerpt:
      "Notice periods in the UK are governed by statute, your contract, and what is reasonable. Here is how they work — and what your employer must pay you if they let you go early.",
    quickAnswer:
      "UK statutory minimum notice is one week per complete year of service, up to 12 weeks (Employment Rights Act 1996 s.86). Your contract may give more — and if it does, that higher figure applies. If your employer lets you go without notice they must pay you PILON (pay in lieu of notice), which is fully taxable as earnings.",
    region: "UK",
    category: "leaving-job",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 7,
    tags: ["notice period", "PILON", "garden leave", "UK employment law"],
    relatedTools: ["notice-period-calculator", "garden-leave-calculator"],
    contextualLinks: [
      { href: "/notice-period-calculator", label: "Calculate statutory notice", description: "Turn complete years of service into the UK statutory minimum notice period." },
      { href: "/garden-leave-calculator", label: "Estimate garden-leave pay", description: "Work through salary and benefits owed while you remain employed away from work." },
      { href: "/guides/uk-notice-period-law", label: "Read the notice-period law guide", description: "Compare contractual notice, statutory notice and pay in lieu." },
    ],
  },
  {
    slug: "australia-fair-work-redundancy-explained",
    quickAnswer:
      "Under Australia's Fair Work Act 2009, redundancy pay ranges from 4 weeks (1 year of service) to 16 weeks (9+ years) at your base rate of pay. Small business employers (fewer than 15 employees) are exempt. The redundancy must be 'genuine' — your role must truly be redundant, not just used as cover for dismissal.",
    title: "Australia Fair Work Redundancy: NES Entitlements Explained for 2026",
    description:
      "How redundancy pay works under the National Employment Standards (NES) in Australia — who qualifies, the scale based on years of service, small business exemption, and what 'genuine redundancy' means.",
    excerpt:
      "Under Australia's Fair Work Act, redundancy pay ranges from 4 to 16 weeks depending on your years of service. This guide explains when you qualify, how much you get, and what 'genuine redundancy' requires.",
    region: "AU",
    category: "redundancy",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 8,
    tags: ["redundancy pay", "NES", "Fair Work Act", "Australia"],
    relatedTools: ["au-redundancy-pay-calculator", "au-notice-period-calculator"],
    contextualLinks: [
      { href: "/au-redundancy-pay-calculator", label: "Calculate NES redundancy pay", description: "Estimate the number of redundancy weeks from continuous service." },
      { href: "/au-notice-period-calculator", label: "Check Australian notice entitlement", description: "Calculate the NES minimum notice period separately from redundancy pay." },
    ],
  },
  {
    slug: "uk-maternity-pay-rights-2026",
    quickAnswer:
      "UK Statutory Maternity Pay (SMP) pays 90% of your average weekly earnings for the first 6 weeks, then £194.32/week (or 90% of earnings if lower) for up to 33 more weeks — 39 weeks total. You must have 26 weeks' service by the 15th week before your due date and earn at least £129/week to qualify.",
    title: "UK Maternity Pay Rights 2026: SMP, OMP, and What You Are Entitled To",
    description:
      "Everything pregnant employees in the UK need to know about Statutory Maternity Pay — the 39-week entitlement, qualifying conditions, the 90% first-6-weeks rule, and how enhanced (occupational) maternity pay works.",
    excerpt:
      "UK Statutory Maternity Pay pays 90% of average earnings for 6 weeks, then £194.32/week (or 90% if lower) for up to 33 more weeks. Here is how to qualify and what to expect week by week.",
    region: "UK",
    category: "parental-leave",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 8,
    tags: ["maternity pay", "SMP", "maternity leave", "UK employment law"],
    relatedTools: ["maternity-pay-calculator", "shared-parental-leave-calculator"],
    contextualLinks: [
      { href: "/maternity-pay-calculator", label: "Calculate maternity pay", description: "Estimate the 90% period and the remaining statutory-rate weeks." },
      { href: "/shared-parental-leave-calculator", label: "Plan shared parental leave", description: "Compare how leave and pay could be divided between eligible parents." },
      { href: "/guides/uk-maternity-pay", label: "Read the maternity pay guide", description: "Check qualifying dates, earnings tests and employer notice requirements." },
    ],
  },
  {
    slug: "constructive-dismissal-uk-guide",
    quickAnswer:
      "Constructive dismissal occurs when your employer fundamentally breaches your employment contract — such as cutting your pay, demoting you without justification, or creating an unbearable working environment — forcing you to resign. That resignation is treated in law as a dismissal, giving you the right to claim unfair dismissal at Employment Tribunal (requires 2 years' service). You must act promptly and not accept the breach.",
    title: "Constructive Dismissal UK: How to Prove It",
    description:
      "A complete guide to constructive dismissal in the UK — what counts as a fundamental breach, how to build your case, and how much compensation you can expect from the Employment Tribunal.",
    excerpt:
      "Being forced to resign because of your employer's conduct? Constructive dismissal is legally a dismissal — and you can claim compensation. Here is everything you need to know.",
    region: "UK",
    category: "workplace-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 9,
    tags: ["constructive dismissal", "unfair dismissal", "Employment Tribunal", "UK employment law"],
    relatedTools: ["notice-period-calculator"],
    contextualLinks: [
      { href: "/tribunal-compensation-calculator", label: "Estimate tribunal compensation", description: "Model a basic award and potential compensatory award using your circumstances." },
      { href: "/guides/uk-constructive-dismissal", label: "Build a constructive-dismissal checklist", description: "Review fundamental breach, resignation timing, evidence and ACAS steps." },
      { href: "/faq/what-is-constructive-dismissal-uk", label: "Check what counts as constructive dismissal", description: "Use the focused FAQ before deciding whether the legal test may fit." },
    ],
  },
  {
    slug: "can-employer-cut-my-pay-uk",
    quickAnswer:
      "No — your employer cannot unilaterally reduce your pay. Your salary is a contractual term; changing it requires your consent. A pay cut without agreement is both a breach of contract and, if deducted from wages already owed, an unlawful deduction under the Employment Rights Act 1996 s.13. You can reject the change, claim breach of contract, or — if serious enough — resign and claim constructive dismissal.",
    title: "Can My Employer Cut My Pay Without My Consent? UK Rights Explained",
    description:
      "Unilaterally cutting your pay is a breach of contract — and may be an unlawful deduction from wages. This guide explains what your employer can and cannot do, and how to respond.",
    excerpt:
      "Your employer cannot simply cut your pay. Here is what the law says about unlawful deductions, the right to refuse, and how to bring a claim if they do it anyway.",
    region: "UK",
    category: "pay-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 7,
    tags: ["pay cut", "unlawful deduction", "wages", "UK employment law", "breach of contract"],
    relatedTools: ["take-home-pay-calculator", "payslip-analyser"],
    contextualLinks: [
      { href: "/take-home-pay-calculator", label: "Model the effect of a pay cut", description: "Compare estimated take-home pay before and after a proposed salary change." },
      { href: "/payslip-analyser", label: "Check deductions on a payslip", description: "Review gross pay, tax, National Insurance and other deductions line by line." },
      { href: "/faq/can-employer-cut-my-pay", label: "Review the pay-cut FAQ", description: "Check consent, contractual-change and unlawful-deduction principles." },
    ],
  },
  {
    slug: "uk-sick-pay-rights-2026",
    quickAnswer:
      "Statutory Sick Pay (SSP) is £123.25 per week (2026/27) and is paid from day one of illness — the three waiting days were abolished by the Employment Rights Act 2025 with effect from April 2026. SSP is paid for up to 28 weeks. You qualify if you earn at least £129/week. Your contract may provide more generous enhanced sick pay.",
    title: "UK Sick Pay Rights 2026: SSP Rules and Employer Duties",
    description:
      "Statutory Sick Pay is £123.25/week from day 4 of illness — but many workers don't know when it starts, how long it lasts, or what to do when it runs out. This guide covers all of it.",
    excerpt:
      "Everything UK workers need to know about Statutory Sick Pay in 2026: eligibility, waiting days, the 28-week maximum, enhanced sick pay, and what happens when SSP ends.",
    region: "UK",
    category: "pay-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 8,
    tags: ["sick pay", "SSP", "statutory sick pay", "sick leave", "UK employment law"],
    relatedTools: ["statutory-sick-pay-calculator"],
    contextualLinks: [
      { href: "/statutory-sick-pay-calculator", label: "Calculate Statutory Sick Pay", description: "Estimate qualifying days, weekly amounts and the total statutory payment." },
      { href: "/guides/uk-sick-pay", label: "Read the UK sick-pay guide", description: "Check eligibility, evidence, employer duties and what happens when SSP ends." },
      { href: "/faq/how-is-sick-pay-calculated-uk", label: "See how sick pay is calculated", description: "Work through the calculation rules in a focused question-and-answer format." },
    ],
  },
  {
    slug: "us-overtime-law-explained",
    quickAnswer:
      "Under the FLSA, covered non-exempt employees must receive at least 1.5× their regular rate for hours over 40 in a workweek. In 2026, most executive, administrative and professional exemptions require at least $684 per week ($35,568 per year) plus the relevant duties test.",
    title: "US Overtime Law 2026: FLSA Rules, Eligibility and Pay",
    description:
      "Federal overtime law under the FLSA: who gets time-and-a-half after 40 hours, the current $684 salary threshold, state rules and unpaid-overtime claims.",
    excerpt:
      "Most US workers are entitled to overtime pay at 1.5× their regular rate. Here is how to tell if you qualify, how overtime is calculated, and how to recover unpaid overtime.",
    region: "US",
    category: "pay-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-07-18",
    readingTimeMinutes: 9,
    tags: ["overtime", "FLSA", "wage theft", "US employment law", "exempt vs non-exempt"],
    relatedTools: ["take-home-overtime-calculator"],
    contextualLinks: [
      { href: "/take-home-overtime-calculator", label: "Calculate overtime take-home pay", description: "Compare gross overtime earnings with estimated deductions and net pay." },
      { href: "/faq/what-is-overtime-law-us", label: "Review the federal overtime rule", description: "Check the 40-hour threshold, regular-rate calculation and common exclusions." },
      { href: "/faq/are-salaried-employees-exempt-from-overtime-us", label: "Check salaried-worker exemptions", description: "Separate salary basis from the duties tests that determine exemption." },
    ],
  },
  {
    slug: "uk-tax-code-explained-2026",
    quickAnswer:
      "Your UK tax code tells your employer how much tax-free pay you get before income tax is deducted. The most common code is 1257L — that means a £12,570 personal allowance for 2026/27. An 'emergency' code (e.g. 1257L W1/M1) means HMRC hasn't received information yet and you may be over-taxed. Check your code on the HMRC app or at gov.uk and call HMRC on 0300 200 3300 if it's wrong.",
    title: "How to Read Your UK Tax Code — and What to Do If It's Wrong",
    description:
      "Most UK workers on PAYE have a tax code they don't understand. This guide decodes common codes, explains why they go wrong, and how to get HMRC to fix it — potentially recovering thousands in overpaid tax.",
    excerpt:
      "Your tax code controls how much income tax your employer deducts. Here is how to read it, spot errors (emergency codes, wrong allowances), and get a refund if you've overpaid.",
    region: "UK",
    category: "tax",
    datePublished: "2026-06-27",
    dateModified: "2026-07-17",
    readingTimeMinutes: 7,
    tags: ["tax code", "PAYE", "income tax", "HMRC", "tax refund", "UK"],
    relatedTools: ["take-home-pay-calculator", "payslip-analyser"],
    contextualLinks: [
      { href: "/take-home-pay-calculator", label: "Estimate pay under your tax code", description: "Compare take-home pay after entering salary, tax and National Insurance details." },
      { href: "/payslip-analyser", label: "Read your PAYE deductions", description: "Break down the tax-code and deduction lines shown on a payslip." },
      { href: "/guides/uk-take-home-pay", label: "Understand UK take-home pay", description: "Follow how PAYE tax, National Insurance and allowances interact." },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  redundancy: { label: "Redundancy", description: "Redundancy pay, consultation rights, and what happens when you lose your job." },
  "pay-rights": { label: "Pay Rights", description: "Minimum wage, final pay, payslips, and unlawful deductions." },
  "leaving-job": { label: "Leaving a Job", description: "Notice periods, resignation rights, garden leave, and final pay." },
  "parental-leave": { label: "Parental Leave", description: "Maternity, paternity, adoption, and shared parental leave pay." },
  "workplace-rights": { label: "Workplace Rights", description: "Discrimination, unfair dismissal, whistleblowing, and more." },
  tax: { label: "Tax & Pay", description: "Income tax, National Insurance, payslips, and take-home pay." },
  "employment-law-changes": { label: "Law Changes", description: "New legislation, rate changes, and what they mean for workers." },
};
