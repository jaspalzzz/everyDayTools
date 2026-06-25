import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * US unemployment weekly benefit ESTIMATOR. Uses the simplest official
 * approximation — highest-quarter wages ÷ a state divisor, clamped to the
 * state's min/max weekly benefit. Coverage is limited to states that use the
 * highest-quarter-wage basis with verified caps; others (GA, IL, PA, OH) use a
 * different earnings basis and are intentionally excluded for now.
 *
 * Figures verified against state agency sources, tagged with effective dates.
 * These are uprated periodically — re-verify each benefit year.
 */
export const UNEMPLOYMENT_SOURCE: SourceRef = {
  label: "U.S. DOL — State Unemployment Insurance agencies",
  url: "https://www.dol.gov/general/topic/unemployment-insurance",
};

interface UnemploymentState {
  code: string;
  name: string;
  /** Weekly benefit ≈ highest-quarter wages ÷ divisor. */
  divisor: number;
  /** Minimum weekly benefit; 0 means the state floor is not applied in this estimate. */
  minWBA: number;
  /** Maximum weekly benefit (the cap). */
  maxWBA: number;
  /** Maximum weeks benefits can be drawn. */
  maxWeeks: number;
  /** Effective date / vintage of the max figure. */
  effective: string;
  /** Optional per-state caveat. */
  note?: string;
}

export const UNEMPLOYMENT_STATES: UnemploymentState[] = [
  {
    code: "CA",
    name: "California",
    divisor: 26,
    minWBA: 40,
    maxWBA: 450,
    maxWeeks: 26,
    effective: "statutory cap — CA EDD",
  },
  {
    code: "TX",
    name: "Texas",
    divisor: 25,
    minWBA: 75,
    maxWBA: 605,
    maxWeeks: 26,
    effective: "effective Oct 2025",
  },
  {
    code: "FL",
    name: "Florida",
    divisor: 26,
    minWBA: 32,
    maxWBA: 275,
    maxWeeks: 12,
    effective: "statutory cap (Fla. Stat. 443.111)",
    note: "Florida's maximum duration ranges 12–23 weeks with the state jobless rate; 12 weeks is the current floor.",
  },
  {
    code: "NY",
    name: "New York",
    divisor: 26,
    minWBA: 0,
    maxWBA: 869,
    maxWeeks: 26,
    effective: "effective Oct 2025",
    note: "New York's minimum benefit floor is not applied in this estimate; very low earners may receive more than shown.",
  },
];

export interface UnemploymentInput {
  stateCode: string;
  /** Gross wages in your highest-earning base-period quarter. */
  highestQuarterWages: number;
}

export function calcUnemployment(input: UnemploymentInput): CalcResult {
  const state = UNEMPLOYMENT_STATES.find((s) => s.code === input.stateCode);
  const hqw = safeNumber(input.highestQuarterWages);

  if (!state) {
    return {
      headline: "—",
      headlineCaption: "Select your state",
      breakdown: [],
      notes: [
        "Select a state to estimate your weekly benefit. Coverage is a curated set of states for now — more are being added.",
      ],
      valid: false,
    };
  }

  if (hqw <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your highest-quarter wages",
      breakdown: [],
      notes: ["Enter the gross wages from your highest-earning quarter to estimate your weekly benefit."],
      valid: false,
    };
  }

  const rawWBA = hqw / state.divisor;
  const wba = Math.min(state.maxWBA, Math.max(state.minWBA, rawWBA));
  const total = wba * state.maxWeeks;
  const cappedAtMax = rawWBA > state.maxWBA;

  const notes: string[] = [
    "This is a simplified estimate. Your actual benefit depends on your full base-period wages and eligibility — confirm with your state agency.",
    `${state.name} max weekly benefit: ${formatCurrency(state.maxWBA, "US")} (${state.effective}).`,
  ];
  if (cappedAtMax) {
    notes.push(`Your calculated amount exceeds the state cap, so it is limited to ${formatCurrency(state.maxWBA, "US")}.`);
  }
  if (state.note) notes.push(state.note);
  notes.push("Only a curated set of states is covered so far — more are being added. Benefit figures are uprated periodically.");

  return {
    headline: formatCurrency(wba, "US"),
    headlineCaption: `Estimated weekly unemployment benefit (${state.name})`,
    breakdown: [
      { label: "State", value: state.name },
      { label: "Highest-quarter wages", value: formatCurrency(hqw, "US") },
      { label: `Formula (wages ÷ ${state.divisor})`, value: formatCurrency(rawWBA, "US") },
      { label: "Estimated weekly benefit", value: formatCurrency(wba, "US"), emphasis: true },
      { label: "Maximum weeks", value: `${state.maxWeeks} weeks` },
      { label: "Maximum potential total", value: formatCurrency(total, "US") },
    ],
    notes,
    valid: true,
  };
}
