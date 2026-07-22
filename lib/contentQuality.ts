import type { Metadata } from "next";
import type { UsStateWithPto } from "@/data/usStates";
import type { CaProvinceData } from "@/data/caProvinces";
import type { AuStateData } from "@/data/auStates";

/**
 * US state pages stay available to people using the state directory, but they
 * are not search inventory until the underlying state record has both:
 *
 * 1. a current-year source review; and
 * 2. substantive, sourced state-specific editorial analysis.
 *
 * This deliberately rejects synonym/position-based template variation as a
 * quality signal. A differently worded template is not the same thing as a
 * manually reviewed page with unique reporting.
 */
export const US_STATE_REVIEW_YEAR = 2026;
export const JURISDICTION_REVIEW_YEAR = 2026;

type EditorialDetail = {
  heading?: string;
  body?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  sourceReviewed?: string;
};

function wordCount(value?: string): number {
  return value?.trim().split(/\s+/).filter(Boolean).length ?? 0;
}

function hasSubstantiveSourcedDetail(detail?: EditorialDetail): boolean {
  return (
    Boolean(detail?.heading?.trim()) &&
    wordCount(detail?.body) >= 80 &&
    Boolean(detail?.sourceLabel?.trim()) &&
    /^https:\/\//.test(detail?.sourceUrl ?? "") &&
    Boolean(detail?.sourceReviewed?.trim())
  );
}

export function isIndexableUsState(state: UsStateWithPto): boolean {
  return (
    state.verifiedYear >= US_STATE_REVIEW_YEAR &&
    Boolean(state.lastContentUpdate) &&
    wordCount(state.localContext) >= 100 &&
    hasSubstantiveSourcedDetail(state.stateSpecificDetail)
  );
}

export function statePageRobots(state: UsStateWithPto): Metadata["robots"] {
  if (isIndexableUsState(state)) {
    return {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    };
  }

  return {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  };
}

/**
 * Canada and Australia pages currently expose useful directory information,
 * but their shared prose is assembled from position-based wording variants.
 * They stay out of search inventory until each record has a genuinely unique,
 * manually reviewed, sourced editorial section that is also rendered on-page.
 */
export function isIndexableCaProvince(province: CaProvinceData): boolean {
  return (
    province.verifiedYear >= JURISDICTION_REVIEW_YEAR &&
    Boolean(province.lastContentUpdate) &&
    hasSubstantiveSourcedDetail(province.editorialDetail)
  );
}

export function isIndexableAuState(state: AuStateData): boolean {
  return (
    state.verifiedYear >= JURISDICTION_REVIEW_YEAR &&
    Boolean(state.lastContentUpdate) &&
    hasSubstantiveSourcedDetail(state.editorialDetail)
  );
}

export function jurisdictionPageRobots(indexable: boolean): Metadata["robots"] {
  return indexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      }
    : {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      };
}
