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
    title: "UK Maternity Pay Rights 2026: SMP, OMP, and What You Are Entitled To",
    description:
      "Everything pregnant employees in the UK need to know about Statutory Maternity Pay — the 39-week entitlement, qualifying conditions, the 90% first-6-weeks rule, and how enhanced (occupational) maternity pay works.",
    excerpt:
      "UK Statutory Maternity Pay pays 90% of average earnings for 6 weeks, then £184.03/week (or 90% if lower) for up to 33 more weeks. Here is how to qualify and what to expect week by week.",
    region: "UK",
    category: "parental-leave",
    datePublished: "2026-06-27",
    dateModified: "2026-06-27",
    readingTimeMinutes: 8,
    tags: ["maternity pay", "SMP", "maternity leave", "UK employment law"],
    relatedTools: ["maternity-pay-calculator", "shared-parental-leave-calculator"],
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
