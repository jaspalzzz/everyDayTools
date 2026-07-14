import { getTool, type ToolMeta } from "./tools";
import { GUIDES, type GuideMeta } from "./guides";
import { COMPARISONS } from "./comparisons";

/**
 * Central "situation" cross-linking map.
 *
 * The /situations/* pages are the highest-intent pages on the site (someone
 * who has just been made redundant or isn't being paid), but they were
 * contextually orphaned -- no in-content links pointed to them, so neither
 * PageRank nor users flowed in. This map fixes that in one place:
 *
 *  - `situationsForTool()` lets ToolLayout surface the relevant situation on
 *    every calculator page (inbound links to situations, zero per-page edits).
 *  - `SITUATION_TOOLS` / `SITUATION_RELATED` power the cross-link block on the
 *    situation pages themselves (situation -> calculators + sibling situations).
 *
 * Only situation -> tool is authored by hand; tool -> situation is derived, so
 * the two directions can never drift out of sync.
 */

export interface SituationMeta {
  slug: string;
  /** Short link label (not the long SEO <title>). */
  label: string;
  /** One-line description for the link row. */
  blurb: string;
}

export const SITUATIONS: Record<string, SituationMeta> = {
  "made-redundant-uk": {
    slug: "made-redundant-uk",
    label: "Made redundant: what you're owed",
    blurb: "Redundancy pay, notice, holiday and settlement — step by step.",
  },
  "unfair-dismissal-uk": {
    slug: "unfair-dismissal-uk",
    label: "Unfairly dismissed: what to do",
    blurb: "Check eligibility, ACAS early conciliation, and the ET1 claim.",
  },
  "constructive-dismissal-uk": {
    slug: "constructive-dismissal-uk",
    label: "Constructive dismissal claim",
    blurb: "Forced to resign? Document the breach and build a claim.",
  },
  "leaving-job-uk": {
    slug: "leaving-job-uk",
    label: "Leaving a job: what you're owed",
    blurb: "Notice, final pay, holiday, garden leave and covenants.",
  },
  "employer-not-paying": {
    slug: "employer-not-paying",
    label: "Employer not paying you",
    blurb: "Recover unpaid wages, holiday or notice — demand to tribunal.",
  },
  "employer-gone-bust": {
    slug: "employer-gone-bust",
    label: "Employer gone bust: how to claim",
    blurb: "Claim redundancy and unpaid wages from the Insolvency Service.",
  },
  "sacked-while-pregnant-uk": {
    slug: "sacked-while-pregnant-uk",
    label: "Sacked while pregnant: your rights",
    blurb: "Pregnancy/maternity dismissal is automatically unfair.",
  },
  "workplace-discrimination-uk": {
    slug: "workplace-discrimination-uk",
    label: "Workplace discrimination rights",
    blurb: "Protected characteristics, evidence, and Vento award bands.",
  },
  "us-wrongful-termination": {
    slug: "us-wrongful-termination",
    label: "US wrongful termination rights",
    blurb: "At-will limits, illegal reasons, and where to file.",
  },
};

/** Situation -> calculators that naturally help with it. Authored by hand. */
export const SITUATION_TOOLS: Record<string, string[]> = {
  "made-redundant-uk": [
    "redundancy-pay-calculator",
    "notice-period-calculator",
    "settlement-agreement-calculator",
    "take-home-pay-calculator",
  ],
  "unfair-dismissal-uk": [
    "tribunal-compensation-calculator",
    "settlement-agreement-calculator",
  ],
  "constructive-dismissal-uk": [
    "tribunal-compensation-calculator",
    "settlement-agreement-calculator",
  ],
  "leaving-job-uk": [
    "notice-period-calculator",
    "garden-leave-calculator",
    "holiday-entitlement-calculator",
    "take-home-pay-calculator",
  ],
  "employer-not-paying": [
    "holiday-entitlement-calculator",
    "notice-period-calculator",
    "take-home-pay-calculator",
  ],
  "employer-gone-bust": [
    "redundancy-pay-calculator",
    "notice-period-calculator",
  ],
  "sacked-while-pregnant-uk": [
    "maternity-pay-calculator",
    "tribunal-compensation-calculator",
  ],
  "workplace-discrimination-uk": [
    "tribunal-compensation-calculator",
    "settlement-agreement-calculator",
  ],
  "us-wrongful-termination": [
    "unemployment-benefit-calculator",
    "severance-pay-calculator",
  ],
};

/** Situation -> sibling situations, for peer cross-linking. */
export const SITUATION_RELATED: Record<string, string[]> = {
  "made-redundant-uk": ["employer-gone-bust", "leaving-job-uk", "unfair-dismissal-uk"],
  "unfair-dismissal-uk": ["constructive-dismissal-uk", "workplace-discrimination-uk", "made-redundant-uk"],
  "constructive-dismissal-uk": ["unfair-dismissal-uk", "workplace-discrimination-uk", "leaving-job-uk"],
  "leaving-job-uk": ["made-redundant-uk", "unfair-dismissal-uk", "employer-not-paying"],
  "employer-not-paying": ["leaving-job-uk", "employer-gone-bust", "made-redundant-uk"],
  "employer-gone-bust": ["made-redundant-uk", "employer-not-paying", "unfair-dismissal-uk"],
  "sacked-while-pregnant-uk": ["workplace-discrimination-uk", "unfair-dismissal-uk", "made-redundant-uk"],
  "workplace-discrimination-uk": ["unfair-dismissal-uk", "constructive-dismissal-uk", "sacked-while-pregnant-uk"],
  "us-wrongful-termination": [],
};

/** Derived inverse: which situations should a given calculator surface. */
export function situationsForTool(toolSlug: string, limit = 2): SituationMeta[] {
  const matches = Object.entries(SITUATION_TOOLS)
    .filter(([, tools]) => tools.includes(toolSlug))
    .map(([slug]) => SITUATIONS[slug])
    .filter((s): s is SituationMeta => Boolean(s));
  return matches.slice(0, limit);
}

/** Sibling situations for a situation page. */
export function relatedSituations(slug: string): SituationMeta[] {
  return (SITUATION_RELATED[slug] ?? [])
    .map((s) => SITUATIONS[s])
    .filter((s): s is SituationMeta => Boolean(s));
}

/** Calculators to surface on a situation page, resolved to full tool metadata. */
export function situationTools(slug: string): ToolMeta[] {
  return (SITUATION_TOOLS[slug] ?? [])
    .map((t) => getTool(t))
    .filter((t): t is ToolMeta => Boolean(t));
}

/**
 * Guides whose primary related tool is this calculator. Every guide already
 * declares its `relatedTool`; this is the derived inverse so calculators link
 * back to their guide(s) -- previously several guides had no inbound link at
 * all because only a handful of calculators set `learnMore.guideSlug`.
 */
export function guidesForTool(toolSlug: string, limit = 3): GuideMeta[] {
  return GUIDES.filter((g) => g.relatedTool === toolSlug).slice(0, limit);
}

export interface CompareLink {
  slug: string;
  label: string;
  summary: string;
}

/**
 * Comparison pages that list this calculator in their related tools. The
 * inverse of ComparisonMeta.relatedTools, so the "X vs Y" pages (previously
 * only 1-2 inbound links each) get discovered from the relevant calculator.
 */
export function comparesForTool(toolSlug: string, limit = 2): CompareLink[] {
  return COMPARISONS.filter((c) => c.relatedTools.some((t) => t.slug === toolSlug))
    .map((c) => ({ slug: c.slug, label: `${c.aLabel} vs ${c.bLabel}`, summary: c.summary }))
    .slice(0, limit);
}

export interface PillarLink {
  href: string;
  label: string;
}

/**
 * Topical pillar hub for a calculator. These country pillar pages
 * (/uk/maternity-leave, /us/overtime) are meant to be hubs but were orphaned;
 * their spoke calculators now link up to them.
 */
export const PILLAR_FOR_TOOL: Record<string, PillarLink> = {
  "redundancy-pay-calculator": { href: "/uk/redundancy", label: "UK redundancy rights guide" },
  "settlement-agreement-calculator": { href: "/uk/redundancy", label: "UK redundancy rights guide" },
  "tribunal-compensation-calculator": { href: "/uk/redundancy", label: "UK redundancy rights guide" },
  "notice-period-calculator": { href: "/uk/redundancy", label: "UK redundancy rights guide" },
  "garden-leave-calculator": { href: "/uk/redundancy", label: "UK redundancy rights guide" },
  "employer-redundancy-cost-calculator": { href: "/uk/redundancy", label: "UK redundancy rights guide" },
  "maternity-pay-calculator": { href: "/uk/maternity-leave", label: "UK maternity leave & pay" },
  "paternity-pay-calculator": { href: "/uk/maternity-leave", label: "UK family leave & pay" },
  "adoption-pay-calculator": { href: "/uk/maternity-leave", label: "UK family leave & pay" },
  "shared-parental-leave-calculator": { href: "/uk/maternity-leave", label: "UK family leave & pay" },
  "take-home-overtime-calculator": { href: "/us/overtime", label: "US overtime pay rules" },
};

export function pillarForTool(toolSlug: string): PillarLink | undefined {
  return PILLAR_FOR_TOOL[toolSlug];
}
