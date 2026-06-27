/**
 * Shared domain types. Every calculator engine returns a CalcResult so the
 * ToolShell can render results, document output, and breakdowns uniformly.
 */

export type CountryCode = "UK" | "US" | "CA" | "AU";

export interface Country {
  code: CountryCode;
  label: string;
  currency: string;
  /** Intl locale used for number/currency formatting. */
  locale: string;
}

export const COUNTRIES: Record<CountryCode, Country> = {
  UK: { code: "UK", label: "United Kingdom", currency: "GBP", locale: "en-GB" },
  US: { code: "US", label: "United States", currency: "USD", locale: "en-US" },
  CA: { code: "CA", label: "Canada", currency: "CAD", locale: "en-CA" },
  AU: { code: "AU", label: "Australia", currency: "AUD", locale: "en-AU" },
};

/** A single line in a result breakdown ("Years counted: 6", etc.). */
export interface BreakdownLine {
  label: string;
  value: string;
  /** Optional emphasis for the headline figure. */
  emphasis?: boolean;
}

export interface CalcResult {
  /** The headline figure, already formatted (e.g. "£8,628"). */
  headline: string;
  /** Short caption under the headline (e.g. "Estimated statutory redundancy pay"). */
  headlineCaption: string;
  /** Itemised breakdown of how the figure was reached. */
  breakdown: BreakdownLine[];
  /** Non-blocking notes/warnings (e.g. "You must have 2+ years' service"). */
  notes: string[];
  /** True when inputs are insufficient/ineligible — UI shows guidance, not a number. */
  valid: boolean;
}

/** Reference to the authoritative source, rendered as an E-E-A-T trust signal. */
export interface SourceRef {
  label: string;
  url: string;
}

/**
 * A primary legal or regulatory source for a calculator or guide.
 * Rendered as clickable legislation / guidance links in the LegalSources block.
 */
export interface LegalSource {
  /** Display name, e.g. "Employment Rights Act 1996" */
  label: string;
  /** Specific section or part, e.g. "ss.135–154" */
  section?: string;
  /** Canonical URL — must be a government or official regulatory domain */
  url: string;
  /**
   * legislation — actual statutory text (legislation.gov.uk, uscode.house.gov, etc.)
   * guidance    — official government guidance (gov.uk, dol.gov, irs.gov, etc.)
   * regulator   — independent regulatory body (acas.org.uk, fairwork.gov.au, etc.)
   * calculator  — official government calculator for cross-check
   */
  type: "legislation" | "guidance" | "regulator" | "calculator";
}

export interface FaqItem {
  question: string;
  answer: string;
}
