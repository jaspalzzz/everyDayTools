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
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "uk-redundancy-pay-guide-2026",
    title: "UK Redundancy Pay: The Complete Guide for 2026",
    description:
      "Everything you need to know about statutory redundancy pay in the UK — who qualifies, how it is calculated, tax treatment, and what to do if your employer refuses to pay.",
    excerpt:
      "Made redundant and not sure what you are owed? This guide covers every aspect of UK statutory redundancy pay — from the 2-year qualifying period to the £22,530 cap — in plain English.",
    quickAnswer:
      "If you have at least 2 years' continuous service and were genuinely made redundant, you are legally entitled to statutory redundancy pay — calculated by your age, years of service (up to 20), and weekly pay capped at £751 (2026/27). The maximum is £22,530.",
    region: "UK",
    category: "redundancy",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    readingTimeMinutes: 9,
    tags: ["redundancy", "statutory redundancy pay", "employment rights", "UK"],
    relatedTools: ["redundancy-pay-calculator", "notice-period-calculator"],
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
    dateModified: "2026-06-27",
    readingTimeMinutes: 8,
    tags: ["severance pay", "settlement agreement", "redundancy negotiation", "UK"],
    relatedTools: ["redundancy-pay-calculator", "severance-pay-calculator"],
  },
  {
    slug: "us-final-paycheck-laws-by-state",
    title: "US Final Paycheck Laws by State: Every Deadline in 2026",
    description:
      "When does your employer have to pay your final paycheck? The deadline varies from 'immediately' to 'next regular payday' depending on the state and how your employment ended.",
    excerpt:
      "Final paycheck deadlines range from the same day (California if you are fired) to the next regular payday in over 20 states. Here is every state's rules in one place.",
    quickAnswer:
      "Your final paycheck deadline depends on your state and how employment ended. California requires immediate payment on the day of discharge; most states require payment by the next regular payday. Employers who miss the deadline typically owe penalties of one to three days' wages for each day late.",
    region: "US",
    category: "pay-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    readingTimeMinutes: 7,
    tags: ["final paycheck", "wages", "state employment law", "US"],
    relatedTools: ["final-paycheck-deadline-calculator", "pto-payout-calculator"],
  },
  {
    slug: "uk-notice-period-rights-explained",
    title: "UK Notice Period Rights Explained: Statutory Minimum, Contractual Notice & PILON",
    description:
      "Confused about notice periods? This guide explains the statutory minimum, what happens if your contract gives more, garden leave, pay in lieu of notice, and wrongful dismissal.",
    excerpt:
      "Notice periods in the UK are governed by statute, your contract, and what is reasonable. Here is how they work — and what your employer must pay you if they let you go early.",
    quickAnswer:
      "UK statutory minimum notice is one week per complete year of service, up to 12 weeks (Employment Rights Act 1996 s.86). Your contract may give more — and if it does, that higher figure applies. If your employer lets you go without notice they must pay you PILON (pay in lieu of notice), which is fully taxable as earnings.",
    region: "UK",
    category: "leaving-job",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    readingTimeMinutes: 7,
    tags: ["notice period", "PILON", "garden leave", "UK employment law"],
    relatedTools: ["notice-period-calculator", "garden-leave-calculator"],
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
    dateModified: "2026-06-27",
    readingTimeMinutes: 8,
    tags: ["redundancy pay", "NES", "Fair Work Act", "Australia"],
    relatedTools: ["au-redundancy-pay-calculator", "au-notice-period-calculator"],
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
    dateModified: "2026-06-27",
    readingTimeMinutes: 8,
    tags: ["maternity pay", "SMP", "maternity leave", "UK employment law"],
    relatedTools: ["maternity-pay-calculator", "shared-parental-leave-calculator"],
  },
  {
    slug: "constructive-dismissal-uk-guide",
    quickAnswer:
      "Constructive dismissal occurs when your employer fundamentally breaches your employment contract — such as cutting your pay, demoting you without justification, or creating an unbearable working environment — forcing you to resign. That resignation is treated in law as a dismissal, giving you the right to claim unfair dismissal at Employment Tribunal (requires 2 years' service). You must act promptly and not accept the breach.",
    title: "Constructive Dismissal UK: What It Is, How to Prove It, and What You're Owed",
    description:
      "A complete guide to constructive dismissal in the UK — what counts as a fundamental breach, how to build your case, and how much compensation you can expect from the Employment Tribunal.",
    excerpt:
      "Being forced to resign because of your employer's conduct? Constructive dismissal is legally a dismissal — and you can claim compensation. Here is everything you need to know.",
    region: "UK",
    category: "workplace-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    readingTimeMinutes: 9,
    tags: ["constructive dismissal", "unfair dismissal", "Employment Tribunal", "UK employment law"],
    relatedTools: ["notice-period-calculator"],
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
    dateModified: "2026-06-27",
    readingTimeMinutes: 7,
    tags: ["pay cut", "unlawful deduction", "wages", "UK employment law", "breach of contract"],
    relatedTools: ["take-home-pay-calculator", "payslip-analyser"],
  },
  {
    slug: "uk-sick-pay-rights-2026",
    quickAnswer:
      "Statutory Sick Pay (SSP) is £123.25 per week (2026/27) and is paid from day one of illness — the three waiting days were abolished by the Employment Rights Act 2025 with effect from April 2026. SSP is paid for up to 28 weeks. You qualify if you earn at least £129/week. Your contract may provide more generous enhanced sick pay.",
    title: "UK Sick Pay Rights 2026: SSP, Qualifying Days, and What Your Employer Must Pay",
    description:
      "Statutory Sick Pay is £123.25/week from day 4 of illness — but many workers don't know when it starts, how long it lasts, or what to do when it runs out. This guide covers all of it.",
    excerpt:
      "Everything UK workers need to know about Statutory Sick Pay in 2026: eligibility, waiting days, the 28-week maximum, enhanced sick pay, and what happens when SSP ends.",
    region: "UK",
    category: "pay-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    readingTimeMinutes: 8,
    tags: ["sick pay", "SSP", "statutory sick pay", "sick leave", "UK employment law"],
    relatedTools: ["statutory-sick-pay-calculator"],
  },
  {
    slug: "us-overtime-law-explained",
    quickAnswer:
      "Under the FLSA, non-exempt employees must be paid at least 1.5× their regular rate for every hour over 40 in a workweek. Salaried employees earning under $684/week ($35,568/year) are non-exempt by default. The key exception is the duties test: executive, administrative, and professional employees who primarily perform exempt duties may be exempt regardless of salary.",
    title: "US Overtime Law Explained: Who Qualifies and How Much You're Owed",
    description:
      "The Fair Labor Standards Act requires time-and-a-half for hours over 40 per week — but exemptions are wide and complex. This guide explains who qualifies, how to calculate overtime, and what to do if you're not being paid correctly.",
    excerpt:
      "Most US workers are entitled to overtime pay at 1.5× their regular rate. Here is how to tell if you qualify, how overtime is calculated, and how to recover unpaid overtime.",
    region: "US",
    category: "pay-rights",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    readingTimeMinutes: 9,
    tags: ["overtime", "FLSA", "wage theft", "US employment law", "exempt vs non-exempt"],
    relatedTools: ["overtime-calculator"],
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
    dateModified: "2026-06-27",
    readingTimeMinutes: 7,
    tags: ["tax code", "PAYE", "income tax", "HMRC", "tax refund", "UK"],
    relatedTools: ["take-home-pay-calculator", "payslip-analyser"],
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
