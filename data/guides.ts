export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date string — when this guide was written / last reviewed */
  datePublished: string;
  dateModified: string;
  /** Country context label */
  country: "UK" | "US" | "CA" | "AU" | "UK/US";
  /** Slug of the primary related tool */
  relatedTool: string;
  /** Short category label for display */
  category: string;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "uk-redundancy-pay",
    title: "UK Redundancy Pay: Complete Guide 2026",
    description:
      "Everything you need to know about statutory redundancy pay in the UK — who qualifies, how it's calculated, how much you can get, and what to do if your employer refuses to pay.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "redundancy-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-notice-period-law",
    title: "UK Notice Period Law: Your Rights Explained 2026",
    description:
      "How statutory notice works in the UK, the difference between statutory and contractual notice, garden leave, PILON, and what to do if your employer ignores your notice entitlement.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "notice-period-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "us-pto-payout-laws-by-state",
    title: "US PTO Payout Laws by State 2026: Do You Get Paid for Unused Vacation?",
    description:
      "There is no federal law requiring PTO payout. Whether your employer owes you money for unused vacation depends entirely on your state. Here is the rule for all 50 states.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "US",
    relatedTool: "pto-payout-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "us-final-paycheck-late",
    title: "Final Paycheck Late? What US Workers Can Do in 2026",
    description:
      "A state-aware action plan for a missing or late final paycheck: identify the deadline, preserve payroll evidence, send a written demand, and choose the correct labor agency.",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    country: "US",
    relatedTool: "final-paycheck-deadline-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-severance-vs-redundancy",
    title: "Severance Pay vs Redundancy Pay: UK Guide 2026/27",
    description:
      "Separate statutory redundancy pay from notice pay, enhanced severance, holiday pay and settlement compensation before checking or negotiating an exit package.",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    country: "UK",
    relatedTool: "severance-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "ca-ontario-termination-severance-pay",
    title: "Ontario Termination and Severance Pay Guide 2026",
    description:
      "Understand Ontario ESA termination notice, pay in lieu and the separate severance-pay test, including the five-year threshold, employer-size test and 26-week cap.",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    country: "CA",
    relatedTool: "severance-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "au-redundancy-final-entitlements",
    title: "Australia Redundancy Pay and Final Entitlements Guide 2026",
    description:
      "Check NES redundancy pay, notice, unused leave and other final entitlements under the Fair Work Act, including the small-business exemption and award exceptions.",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    country: "AU",
    relatedTool: "au-redundancy-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-take-home-pay",
    title: "How to Calculate UK Take-Home Pay 2026/27",
    description:
      "A plain-English guide to how your salary is taxed in the UK — income tax bands, National Insurance rates, student loan deductions, and how to work out exactly what you take home.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "take-home-pay-calculator",
    category: "Pay & Tax",
  },
  {
    slug: "uk-maternity-pay",
    title: "UK Maternity Pay: Complete Guide to SMP 2026/27",
    description:
      "How Statutory Maternity Pay works, who qualifies, how to calculate your 39-week entitlement, what Maternity Allowance covers when SMP doesn't apply, and your rights to return.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "maternity-pay-calculator",
    category: "Parental Leave",
  },
  {
    slug: "uk-constructive-dismissal",
    title: "Constructive Dismissal UK: Your Rights & How to Claim 2026",
    description:
      "What constructive dismissal is, when it applies, how to resign correctly to preserve your claim, what compensation you can get, and the 3-month time limit to act.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "redundancy-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-settlement-agreement",
    title: "UK Settlement Agreements: What You're Owed & How to Negotiate 2026",
    description:
      "What a settlement agreement is, what it must contain to be valid, the tax-free £30,000 threshold, typical settlement amounts by role, and how to negotiate a better offer.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "severance-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-pilon",
    title: "PILON UK: Pay in Lieu of Notice Explained 2026",
    description:
      "What PILON is, how it differs from garden leave, how it's taxed after the 2018 rule change, how to calculate it, and what to do if your employer doesn't pay.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "notice-period-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-unfair-dismissal",
    title: "Unfair Dismissal UK: Your Rights, Compensation & How to Claim 2026",
    description:
      "What unfair dismissal is, the 2-year qualifying period, automatically unfair grounds (no qualifying period), compensation caps for 2026/27, and how to bring a tribunal claim.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "redundancy-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-tupe",
    title: "TUPE UK: Your Rights When Your Employer Changes 2026",
    description:
      "What TUPE is, when it applies (business transfers and service provision changes), what it protects, how redundancy interacts with TUPE, and what to do if your employer breaches it.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "redundancy-pay-calculator",
    category: "Leaving a Job",
  },
  {
    slug: "uk-paternity-pay",
    title: "UK Paternity Pay & Leave 2026: SPP, Qualifying Conditions & New Rights",
    description:
      "How Statutory Paternity Pay works in the UK, who qualifies, the 2-week entitlement and rate (£194.32/week), the extended 'paternity leave 2.0' rights from April 2025, and how to apply.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "paternity-pay-calculator",
    category: "Parental Leave",
  },
  {
    slug: "uk-holiday-entitlement",
    title: "UK Holiday Entitlement 2026: Statutory Leave, Pay & Carry-Over Rules",
    description:
      "How UK statutory holiday entitlement works — the 28-day minimum (including bank holidays), how part-time and irregular-hours workers accrue leave, rolled-up holiday pay, and the rules on carry-over and payout.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "holiday-entitlement-calculator",
    category: "Benefits & Entitlements",
  },
  {
    slug: "uk-sick-pay",
    title: "UK Sick Pay 2026: SSP Rules, Qualifying Days & What Happens When It Runs Out",
    description:
      "Statutory Sick Pay is £123.25/week from day one of illness (no waiting days from April 2026). This guide covers who qualifies, how long SSP lasts, enhanced sick pay, fit notes, and options when SSP ends.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "statutory-sick-pay-calculator",
    category: "Benefits & Entitlements",
  },
  {
    slug: "uk-adoption-pay",
    title: "UK Adoption Pay & Leave 2026: SAP, Qualifying Conditions & Paternity Rights",
    description:
      "How Statutory Adoption Pay (SAP) works — the 39-week entitlement at £194.32/week, qualifying conditions, adoption leave periods, the partner's 2-week entitlement, and interaction with Shared Parental Leave.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "adoption-pay-calculator",
    category: "Parental Leave",
  },
  {
    slug: "uk-shared-parental-leave",
    title: "UK Shared Parental Leave 2026: ShPL, ShPP & How to Split Leave",
    description:
      "How Shared Parental Leave and Shared Parental Pay work in the UK — who can use it, how to curtail maternity leave, how to split the remaining 37 weeks, discontinuous leave blocks, and ShPP at £194.32/week.",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    country: "UK",
    relatedTool: "shared-parental-leave-calculator",
    category: "Parental Leave",
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
