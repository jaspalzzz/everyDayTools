/**
 * Single source of truth for the tool catalogue. Drives the homepage grid,
 * the header nav, internal-linking ("related tools"), and sitemap generation.
 * Order matters: it reflects launch priority (Tier 1 first).
 */

export type Region = "UK" | "US" | "UK/CA" | "US/UK/CA" | "US/UK/CA/AU";

/** Launch tier. Tier 1 = hero launch set; Tier 2 = expansion (added in batches). */
export type Tier = 1 | 2;

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
