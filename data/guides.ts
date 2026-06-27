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
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
