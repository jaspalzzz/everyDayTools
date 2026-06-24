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

export interface FaqItem {
  question: string;
  answer: string;
}
