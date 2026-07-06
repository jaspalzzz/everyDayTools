/**
 * Single source of truth for the tool catalogue. Drives the homepage grid,
 * the header nav, internal-linking ("related tools"), and sitemap generation.
 * Order matters: it reflects launch priority (Tier 1 first).
 */

export type Region = "UK" | "US" | "AU" | "UK/CA" | "US/UK/CA" | "US/UK/CA/AU";

/** Launch tier. Tier 1 = hero launch set; Tier 2 = expansion; Tier 3 = long-tail funnel. */
export type Tier = 1 | 2 | 3;

export type ToolCategory = "leaving-job" | "pay-tax" | "parental-leave" | "benefits";

export const CATEGORY_META: Record<ToolCategory, { label: string; description: string }> = {
  "leaving-job": {
    label: "Leaving a Job",
    description: "Redundancy, notice periods, severance and final pay when you leave employment.",
  },
  "pay-tax": {
    label: "Pay & Tax",
    description: "Take-home pay, overtime, bonuses and contractor calculations.",
  },
  "parental-leave": {
    label: "Parental Leave",
    description: "Maternity, paternity, adoption and shared parental pay entitlements.",
  },
  benefits: {
    label: "Benefits & Entitlements",
    description: "Holiday entitlement, sick pay and working days.",
  },
};

export interface ToolMeta {
  slug: string;
  name: string;
  /** Exact-keyword H1 / nav label. */
  shortName: string;
  /** Override title tag only — if set, used for <title> and OG title instead of name. */
  seoTitle?: string;
  description: string;
  region: Region;
  /** Icon name from the Tabler set used on the homepage. */
  icon: string;
  /** Marks the high-RPM hero tools. */
  hero: boolean;
  /** Launch tier. */
  tier?: Tier;
  /** Intent-based category for homepage grouping and hub pages. */
  category: ToolCategory;
  /** Slugs of related tools for the internal-link block. */
  related: string[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "take-home-pay-calculator",
    name: "Take-home pay calculator",
    shortName: "Take-home pay",
    description:
      "Enter your salary and see what actually lands in your bank account — every tax and NI deduction calculated for UK, US and Canada.",
    region: "US/UK/CA",
    icon: "ti-wallet",
    hero: false,
    tier: 3,
    category: "pay-tax",
    related: ["salary-to-hourly-calculator", "bonus-tax-calculator", "pay-rise-calculator"],
  },
  {
    slug: "self-employment-tax-calculator",
    name: "Self-employment tax calculator",
    shortName: "SE tax",
    description:
      "Self-employed or freelancing? See how much tax you'll actually owe and what's left in your pocket — UK sole trader or US self-employed.",
    region: "US/UK/CA",
    icon: "ti-briefcase",
    hero: false,
    tier: 2,
    category: "pay-tax",
    related: ["take-home-pay-calculator", "ir35-calculator", "day-rate-calculator"],
  },
  {
    slug: "day-rate-calculator",
    name: "Day rate calculator",
    shortName: "Day rate",
    description:
      "Contracting? Convert your day rate to an annual equivalent — or find the day rate you need to match your old salary.",
    region: "US/UK/CA",
    icon: "ti-calendar-dollar",
    hero: false,
    tier: 2,
    category: "pay-tax",
    related: ["self-employment-tax-calculator", "ir35-calculator", "salary-to-hourly-calculator"],
  },
  {
    slug: "ir35-calculator",
    name: "IR35 calculator",
    shortName: "IR35 / 1099 vs W-2",
    description:
      "Inside or outside IR35? 1099 or W-2? See the real take-home difference side by side before you decide how to work.",
    region: "US/UK/CA",
    icon: "ti-scale",
    hero: false,
    tier: 2,
    category: "pay-tax",
    related: ["self-employment-tax-calculator", "day-rate-calculator", "take-home-pay-calculator"],
  },
  {
    slug: "settlement-agreement-calculator",
    name: "Settlement agreement calculator",
    shortName: "Settlement agreement",
    seoTitle: "UK Settlement Agreement Calculator 2026 | Free Estimate",
    description:
      "Estimate a UK settlement agreement value — redundancy pay, PILON, ex gratia payment, and the £30,000 tax-free threshold.",
    region: "UK",
    icon: "ti-file-certificate",
    hero: true,
    tier: 1,
    category: "leaving-job",
    related: ["tribunal-compensation-calculator", "redundancy-pay-calculator", "notice-period-calculator"],
  },
  {
    slug: "tribunal-compensation-calculator",
    name: "Employment tribunal compensation calculator",
    shortName: "Tribunal compensation",
    seoTitle: "UK Employment Tribunal Compensation Calculator 2026 | Free",
    description:
      "Estimate UK Employment Tribunal compensation — basic award, capped compensatory award, ACAS uplift, Vento bands, and contributory fault reductions.",
    region: "UK",
    icon: "ti-gavel",
    hero: true,
    tier: 1,
    category: "leaving-job",
    related: ["settlement-agreement-calculator", "redundancy-pay-calculator", "notice-period-calculator"],
  },
  {
    slug: "redundancy-pay-calculator",
    name: "Redundancy pay calculator",
    shortName: "Redundancy pay",
    seoTitle: "UK Redundancy Pay Calculator 2026 | Free & Law-Backed",
    description:
      "Just been made redundant? Calculate exactly what your employer must pay you under UK law — based on your age, service length and weekly pay.",
    region: "UK",
    icon: "ti-file-off",
    hero: true,
    tier: 1,
    category: "leaving-job",
    related: ["notice-period-calculator", "severance-pay-calculator", "au-redundancy-pay-calculator"],
  },
  {
    slug: "au-redundancy-pay-calculator",
    name: "Australia redundancy pay calculator",
    shortName: "AU redundancy pay",
    description:
      "Made redundant in Australia? Calculate your NES redundancy pay under the Fair Work Act 2009 — based on your years of service and weekly base rate.",
    region: "AU",
    icon: "ti-file-off",
    hero: false,
    tier: 1,
    category: "leaving-job",
    related: ["redundancy-pay-calculator", "notice-period-calculator", "take-home-pay-calculator"],
  },
  {
    slug: "pto-payout-calculator",
    name: "PTO payout calculator",
    shortName: "PTO payout",
    description:
      "Leaving your job with unused vacation? Find out what your employer must pay — rules vary by state and are built in for all 50.",
    region: "US",
    icon: "ti-cash",
    hero: true,
    tier: 1,
    category: "leaving-job",
    related: ["severance-pay-calculator", "take-home-overtime-calculator"],
  },
  {
    slug: "notice-period-calculator",
    name: "Notice period calculator",
    shortName: "Notice period",
    description:
      "How much notice are you actually owed? Get the statutory minimum for your length of service — UK and Canada, whichever is greater.",
    region: "UK/CA",
    icon: "ti-calendar-clock",
    hero: true,
    tier: 1,
    category: "leaving-job",
    related: ["redundancy-pay-calculator", "severance-pay-calculator"],
  },
  {
    slug: "severance-pay-calculator",
    name: "Severance pay estimator",
    shortName: "Severance pay",
    description:
      "Negotiating a severance package? See the statutory minimum you're entitled to — and what's fair to push for.",
    region: "US/UK/CA",
    icon: "ti-cash-banknote",
    hero: true,
    tier: 1,
    category: "leaving-job",
    related: ["redundancy-pay-calculator", "pto-payout-calculator"],
  },
  {
    slug: "take-home-overtime-calculator",
    name: "Overtime pay calculator",
    shortName: "Overtime pay",
    description:
      "Working extra hours? Calculate your total gross pay with overtime at the correct legal multiplier for your country.",
    region: "US/UK/CA/AU",
    icon: "ti-clock-dollar",
    hero: false,
    tier: 1,
    category: "pay-tax",
    related: ["pto-payout-calculator", "severance-pay-calculator"],
  },
  {
    slug: "salary-to-hourly-calculator",
    name: "Salary to hourly calculator",
    shortName: "Salary to hourly",
    description:
      "What's your salary worth per hour? Convert any annual figure to hourly, weekly and monthly pay for any working pattern.",
    region: "US/UK/CA/AU",
    icon: "ti-arrows-exchange",
    hero: false,
    tier: 2,
    category: "pay-tax",
    related: ["take-home-overtime-calculator", "pto-payout-calculator"],
  },
  {
    slug: "holiday-entitlement-calculator",
    name: "Holiday entitlement calculator",
    shortName: "Holiday entitlement",
    description:
      "Not sure how much holiday you're entitled to? Get your exact UK statutory leave entitlement — and how much you've accrued so far this year.",
    region: "UK",
    icon: "ti-beach",
    hero: false,
    tier: 2,
    category: "benefits",
    related: ["notice-period-calculator", "redundancy-pay-calculator"],
  },
  {
    slug: "maternity-pay-calculator",
    name: "Maternity pay calculator",
    shortName: "Maternity pay",
    description:
      "Pregnant and planning your finances? See your full 39-week UK Statutory Maternity Pay week by week from your average earnings.",
    region: "UK",
    icon: "ti-baby-carriage",
    hero: false,
    tier: 2,
    category: "parental-leave",
    related: ["holiday-entitlement-calculator", "notice-period-calculator"],
  },
  {
    slug: "paternity-pay-calculator",
    name: "Paternity pay calculator",
    shortName: "Paternity pay",
    description:
      "Taking paternity leave? Find out exactly what you'll receive for 1 or 2 weeks under UK law, based on your earnings.",
    region: "UK",
    icon: "ti-baby-bottle",
    hero: false,
    tier: 2,
    category: "parental-leave",
    related: ["maternity-pay-calculator", "shared-parental-leave-calculator"],
  },
  {
    slug: "adoption-pay-calculator",
    name: "Adoption pay calculator",
    shortName: "Adoption pay",
    description:
      "Adopting a child? Calculate your full 39-week UK Statutory Adoption Pay entitlement from your average weekly earnings.",
    region: "UK",
    icon: "ti-home-heart",
    hero: false,
    tier: 2,
    category: "parental-leave",
    related: ["maternity-pay-calculator", "shared-parental-leave-calculator"],
  },
  {
    slug: "shared-parental-leave-calculator",
    name: "Shared parental leave pay calculator",
    shortName: "Shared parental pay",
    description:
      "Splitting parental leave with your partner? See how much each of you will receive across up to 37 shared pay weeks.",
    region: "UK",
    icon: "ti-users-group",
    hero: false,
    tier: 2,
    category: "parental-leave",
    related: ["maternity-pay-calculator", "paternity-pay-calculator"],
  },
  {
    slug: "statutory-sick-pay-calculator",
    name: "Statutory sick pay calculator",
    shortName: "Statutory sick pay",
    description:
      "Off sick and unsure what you'll be paid? Find out your UK Statutory Sick Pay — including the 3 unpaid waiting days.",
    region: "UK",
    icon: "ti-mood-sick",
    hero: false,
    tier: 2,
    category: "benefits",
    related: ["holiday-entitlement-calculator", "redundancy-pay-calculator"],
  },
  {
    slug: "final-paycheck-deadline-calculator",
    name: "Final paycheck deadline calculator",
    shortName: "Final paycheck deadline",
    description:
      "Left a job and waiting for your last paycheck? Find the legal deadline your employer must meet — by state and how you left.",
    region: "US",
    icon: "ti-calendar-due",
    hero: false,
    tier: 2,
    category: "leaving-job",
    related: ["pto-payout-calculator", "severance-pay-calculator"],
  },
  {
    slug: "unemployment-benefit-calculator",
    name: "Unemployment benefit calculator",
    shortName: "Unemployment benefit",
    description:
      "Just lost your job? Estimate your weekly unemployment benefit and how long it lasts — calculated by state from your highest earning quarter.",
    region: "US",
    icon: "ti-businessplan",
    hero: false,
    tier: 2,
    category: "leaving-job",
    related: ["final-paycheck-deadline-calculator", "severance-pay-calculator"],
  },
  {
    slug: "pay-rise-calculator",
    name: "Pay rise calculator",
    shortName: "Pay rise",
    description:
      "Got a pay rise? See your new annual salary, and exactly how much more hits your pocket each month after tax.",
    region: "US/UK/CA/AU",
    icon: "ti-trending-up",
    hero: false,
    tier: 3,
    category: "pay-tax",
    related: ["salary-to-hourly-calculator", "take-home-overtime-calculator"],
  },
  {
    slug: "pro-rata-salary-calculator",
    name: "Pro-rata salary calculator",
    shortName: "Pro-rata salary",
    description:
      "Going part-time? Scale any full-time salary down to your actual hours and see your pro-rata annual and monthly pay instantly.",
    region: "US/UK/CA/AU",
    icon: "ti-clock-hour-4",
    hero: false,
    tier: 3,
    category: "pay-tax",
    related: ["salary-to-hourly-calculator", "holiday-entitlement-calculator"],
  },
  {
    slug: "bonus-tax-calculator",
    name: "Bonus tax calculator",
    shortName: "Bonus tax",
    description:
      "Getting a bonus? Find out what you'll actually take home after HMRC or the IRS takes their cut.",
    region: "US/UK/CA/AU",
    icon: "ti-gift",
    hero: false,
    tier: 3,
    category: "pay-tax",
    related: ["take-home-overtime-calculator", "pay-rise-calculator"],
  },
  {
    slug: "working-days-calculator",
    name: "Working days calculator",
    shortName: "Working days",
    description:
      "Need to count working days between two dates? Useful for notice periods, leave calculations and deadline planning.",
    region: "US/UK/CA/AU",
    icon: "ti-calendar-week",
    hero: false,
    tier: 3,
    category: "benefits",
    related: ["notice-period-calculator", "holiday-entitlement-calculator"],
  },
  {
    slug: "garden-leave-calculator",
    name: "Garden leave calculator",
    shortName: "Garden leave",
    description:
      "Being put on garden leave? Calculate the total pay you're owed for the full notice period while you're kept away from work.",
    region: "UK",
    icon: "ti-plant-2",
    hero: false,
    tier: 3,
    category: "leaving-job",
    related: ["notice-period-calculator", "redundancy-pay-calculator"],
  },
  {
    slug: "au-notice-period-calculator",
    name: "Australia notice period calculator",
    shortName: "AU Notice period",
    description:
      "Calculate your minimum notice entitlement under the Fair Work Act 2009. Includes the over-45 additional week and pay in lieu of notice estimate.",
    region: "AU",
    icon: "ti-clock-hour-4",
    hero: false,
    tier: 2,
    category: "leaving-job",
    related: ["au-redundancy-pay-calculator", "au-annual-leave-calculator"],
  },
  {
    slug: "au-annual-leave-calculator",
    name: "Australia annual leave calculator",
    shortName: "AU Annual leave",
    description:
      "Calculate your accrued annual leave balance or payout on termination under the NES. Includes optional 17.5% leave loading and shift worker entitlement.",
    region: "AU",
    icon: "ti-beach",
    hero: false,
    tier: 2,
    category: "benefits",
    related: ["au-redundancy-pay-calculator", "au-notice-period-calculator"],
  },
  {
    slug: "employer-redundancy-cost-calculator",
    name: "Employer redundancy cost calculator",
    shortName: "Redundancy cost",
    description:
      "Calculate what you owe an employee you're making redundant: statutory redundancy pay, notice pay, and accrued holiday. For UK employers.",
    region: "UK",
    icon: "ti-building",
    hero: false,
    tier: 2,
    category: "leaving-job",
    related: ["redundancy-pay-calculator", "notice-period-calculator"],
  },
  {
    slug: "employer-notice-pay-calculator",
    name: "Employer notice pay calculator",
    shortName: "Notice pay cost",
    description:
      "Calculate the statutory notice pay you owe a departing employee, or the cost of putting them on garden leave. For UK employers.",
    region: "UK",
    icon: "ti-building",
    hero: false,
    tier: 2,
    category: "leaving-job",
    related: ["notice-period-calculator", "employer-redundancy-cost-calculator"],
  },
  {
    slug: "payslip-analyser",
    name: "Payslip deduction analyser",
    shortName: "Payslip analyser",
    description:
      "UK payslip analyser: plain-English breakdown of every deduction — income tax, NI, pension, student loan, salary sacrifice — with reconciliation check.",
    region: "UK",
    icon: "ti-file-description",
    hero: false,
    tier: 2,
    category: "pay-tax",
    related: ["take-home-pay-calculator", "statutory-sick-pay-calculator"],
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function relatedTools(slug: string): ToolMeta[] {
  const tool = getTool(slug);
  if (!tool) return [];
  return tool.related
    .map((s) => getTool(s))
    .filter((t): t is ToolMeta => Boolean(t));
}
