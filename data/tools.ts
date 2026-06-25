/**
 * Single source of truth for the tool catalogue. Drives the homepage grid,
 * the header nav, internal-linking ("related tools"), and sitemap generation.
 * Order matters: it reflects launch priority (Tier 1 first).
 */

export type Region = "UK" | "US" | "UK/CA" | "US/UK/CA" | "US/UK/CA/AU";

/** Launch tier. Tier 1 = hero launch set; Tier 2 = expansion; Tier 3 = long-tail funnel. */
export type Tier = 1 | 2 | 3;

export interface ToolMeta {
  slug: string;
  name: string;
  /** Exact-keyword H1 / nav label. */
  shortName: string;
  description: string;
  region: Region;
  /** Icon name from the Tabler set used on the homepage. */
  icon: string;
  /** Marks the high-RPM hero tools. */
  hero: boolean;
  /** Launch tier (defaults to 1 when omitted). */
  tier?: Tier;
  /** Slugs of related tools for the internal-link block. */
  related: string[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "redundancy-pay-calculator",
    name: "Redundancy pay calculator",
    shortName: "Redundancy pay",
    description:
      "Your exact statutory redundancy pay under UK law — age bands, capped weekly pay and length of service built in.",
    region: "UK",
    icon: "ti-file-off",
    hero: true,
    related: ["notice-period-calculator", "severance-pay-calculator"],
  },
  {
    slug: "pto-payout-calculator",
    name: "PTO payout calculator",
    shortName: "PTO payout",
    description:
      "What your employer owes for unused PTO when you leave — with the payout rule for your US state built in.",
    region: "US",
    icon: "ti-cash",
    hero: true,
    related: ["severance-pay-calculator", "take-home-overtime-calculator"],
  },
  {
    slug: "notice-period-calculator",
    name: "Notice period calculator",
    shortName: "Notice period",
    description:
      "Your minimum statutory notice vs your contractual notice — for the UK and Canada, whichever is greater.",
    region: "UK/CA",
    icon: "ti-calendar-clock",
    hero: true,
    related: ["redundancy-pay-calculator", "severance-pay-calculator"],
  },
  {
    slug: "severance-pay-calculator",
    name: "Severance pay estimator",
    shortName: "Severance pay",
    description:
      "Estimate your severance from years of service and weekly pay, with the Canadian statutory minimum applied.",
    region: "US/UK/CA",
    icon: "ti-cash-banknote",
    hero: true,
    related: ["redundancy-pay-calculator", "pto-payout-calculator"],
  },
  {
    slug: "take-home-overtime-calculator",
    name: "Overtime pay calculator",
    shortName: "Overtime pay",
    description:
      "Your gross pay with overtime — hourly rate, regular hours and overtime at your country's multiplier.",
    region: "US/UK/CA/AU",
    icon: "ti-clock-dollar",
    hero: false,
    related: ["pto-payout-calculator", "severance-pay-calculator"],
  },
  {
    slug: "salary-to-hourly-calculator",
    name: "Salary to hourly calculator",
    shortName: "Salary to hourly",
    description:
      "Convert an annual salary into the equivalent hourly, weekly and monthly pay — for any working pattern.",
    region: "US/UK/CA/AU",
    icon: "ti-arrows-exchange",
    hero: false,
    tier: 2,
    related: ["take-home-overtime-calculator", "pto-payout-calculator"],
  },
  {
    slug: "holiday-entitlement-calculator",
    name: "Holiday entitlement calculator",
    shortName: "Holiday entitlement",
    description:
      "Your statutory annual leave under UK law — days per week converted to your 5.6-week entitlement, with accrual to date.",
    region: "UK",
    icon: "ti-beach",
    hero: false,
    tier: 2,
    related: ["notice-period-calculator", "redundancy-pay-calculator"],
  },
  {
    slug: "maternity-pay-calculator",
    name: "Maternity pay calculator",
    shortName: "Maternity pay",
    description:
      "Estimate your UK Statutory Maternity Pay across the 39-week period from your average weekly earnings.",
    region: "UK",
    icon: "ti-baby-carriage",
    hero: false,
    tier: 2,
    related: ["holiday-entitlement-calculator", "notice-period-calculator"],
  },
  {
    slug: "statutory-sick-pay-calculator",
    name: "Statutory sick pay calculator",
    shortName: "Statutory sick pay",
    description:
      "Your UK SSP for time off sick — the weekly rate, the 3 unpaid waiting days and your daily entitlement built in.",
    region: "UK",
    icon: "ti-mood-sick",
    hero: false,
    tier: 2,
    related: ["holiday-entitlement-calculator", "redundancy-pay-calculator"],
  },
  {
    slug: "final-paycheck-deadline-calculator",
    name: "Final paycheck deadline calculator",
    shortName: "Final paycheck deadline",
    description:
      "When your employer must pay your final wages after you leave — by US state and whether you quit or were let go.",
    region: "US",
    icon: "ti-calendar-due",
    hero: false,
    tier: 2,
    related: ["pto-payout-calculator", "severance-pay-calculator"],
  },
  {
    slug: "unemployment-benefit-calculator",
    name: "Unemployment benefit calculator",
    shortName: "Unemployment benefit",
    description:
      "Estimate your weekly US unemployment benefit and total payout from your highest-quarter wages, by state.",
    region: "US",
    icon: "ti-businessplan",
    hero: false,
    tier: 2,
    related: ["final-paycheck-deadline-calculator", "severance-pay-calculator"],
  },
  {
    slug: "pay-rise-calculator",
    name: "Pay rise calculator",
    shortName: "Pay rise",
    description:
      "See your new salary after a percentage pay rise — plus the extra you take home each year and month.",
    region: "US/UK/CA/AU",
    icon: "ti-trending-up",
    hero: false,
    tier: 3,
    related: ["salary-to-hourly-calculator", "take-home-overtime-calculator"],
  },
  {
    slug: "pro-rata-salary-calculator",
    name: "Pro-rata salary calculator",
    shortName: "Pro-rata salary",
    description:
      "Scale a full-time salary to your part-time hours — your pro-rata annual and monthly pay, in seconds.",
    region: "US/UK/CA/AU",
    icon: "ti-clock-hour-4",
    hero: false,
    tier: 3,
    related: ["salary-to-hourly-calculator", "holiday-entitlement-calculator"],
  },
  {
    slug: "bonus-tax-calculator",
    name: "Bonus tax calculator",
    shortName: "Bonus tax",
    description:
      "Estimate your take-home bonus after tax — with the US 22% federal supplemental rate built in.",
    region: "US/UK/CA/AU",
    icon: "ti-gift",
    hero: false,
    tier: 3,
    related: ["take-home-overtime-calculator", "pay-rise-calculator"],
  },
  {
    slug: "working-days-calculator",
    name: "Working days calculator",
    shortName: "Working days",
    description:
      "Count the working days (Mon–Fri) between two dates — useful for notice periods and leave.",
    region: "US/UK/CA/AU",
    icon: "ti-calendar-week",
    hero: false,
    tier: 3,
    related: ["notice-period-calculator", "holiday-entitlement-calculator"],
  },
  {
    slug: "garden-leave-calculator",
    name: "Garden leave calculator",
    shortName: "Garden leave",
    description:
      "Work out your total pay during garden leave from your weekly pay and notice length.",
    region: "UK",
    icon: "ti-plant-2",
    hero: false,
    tier: 3,
    related: ["notice-period-calculator", "redundancy-pay-calculator"],
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
