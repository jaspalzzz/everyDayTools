import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * US unemployment weekly benefit ESTIMATOR. Where a state uses a clean
 * highest-quarter-wage divisor, the estimate is highest-quarter wages ÷ divisor,
 * clamped to the state's min/max weekly benefit. Where the state uses a
 * different basis, divisor is 0 and the tool returns the state maximum as a
 * capped estimate with an explicit agency-check note.
 *
 * Figures are from the U.S. DOL Significant Provisions of State UI Laws report,
 * effective January 1, 2026. They exclude extensions and special programs.
 */
export const UNEMPLOYMENT_SOURCE: SourceRef = {
  label: "U.S. DOL — Significant Provisions of State UI Laws (Jan 2026)",
  url: "https://oui.doleta.gov/unemploy/content/sigpros/2020-2029/January2026.pdf",
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

const EFFECTIVE = "effective Jan 1, 2026 (U.S. DOL)";

function nonDivisorNote(method: string): string {
  return `This state uses ${method} — the figure shown is capped at the state maximum; consult your state agency for an exact estimate.`;
}

export const UNEMPLOYMENT_STATES: UnemploymentState[] = [
  {
    code: "AL",
    name: "Alabama",
    divisor: 0,
    minWBA: 45,
    maxWBA: 275,
    maxWeeks: 14,
    effective: EFFECTIVE,
    note: nonDivisorNote("the average of wages in the two highest quarters"),
  },
  {
    code: "AK",
    name: "Alaska",
    divisor: 0,
    minWBA: 56,
    maxWBA: 442,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("annual base-period wages plus dependent allowances"),
  },
  { code: "AZ", name: "Arizona", divisor: 25, minWBA: 229, maxWBA: 320, maxWeeks: 24, effective: EFFECTIVE },
  {
    code: "AR",
    name: "Arkansas",
    divisor: 0,
    minWBA: 81,
    maxWBA: 451,
    maxWeeks: 12,
    effective: EFFECTIVE,
    note: nonDivisorNote("the average of wages across four base-period quarters"),
  },
  {
    code: "CA",
    name: "California",
    divisor: 26,
    minWBA: 40,
    maxWBA: 450,
    maxWeeks: 26,
    effective: EFFECTIVE,
  },
  {
    code: "CO",
    name: "Colorado",
    divisor: 0,
    minWBA: 25,
    maxWBA: 844,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("the higher of two average-weekly-wage calculations"),
  },
  {
    code: "CT",
    name: "Connecticut",
    divisor: 0,
    minWBA: 44,
    maxWBA: 796,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("average wages in the two highest quarters plus dependent allowances"),
  },
  {
    code: "DE",
    name: "Delaware",
    divisor: 0,
    minWBA: 20,
    maxWBA: 450,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("total wages in the two highest quarters"),
  },
  { code: "DC", name: "District of Columbia", divisor: 26, minWBA: 50, maxWBA: 444, maxWeeks: 26, effective: EFFECTIVE },
  {
    code: "FL",
    name: "Florida",
    divisor: 26,
    minWBA: 32,
    maxWBA: 275,
    maxWeeks: 12,
    effective: EFFECTIVE,
    note: "Florida's maximum duration ranges 9-12 weeks with the state jobless rate; 12 weeks is the DOL January 2026 maximum.",
  },
  {
    code: "GA",
    name: "Georgia",
    divisor: 0,
    minWBA: 55,
    maxWBA: 365,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("either wages in the two highest quarters or highest-quarter wages under Georgia's alternate formula"),
  },
  { code: "HI", name: "Hawaii", divisor: 21, minWBA: 5, maxWBA: 868, maxWeeks: 26, effective: EFFECTIVE },
  { code: "ID", name: "Idaho", divisor: 26, minWBA: 72, maxWBA: 624, maxWeeks: 26, effective: EFFECTIVE },
  {
    code: "IL",
    name: "Illinois",
    divisor: 0,
    minWBA: 51,
    maxWBA: 859,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("average weekly wages in the two highest quarters plus dependent allowances"),
  },
  {
    code: "IN",
    name: "Indiana",
    divisor: 0,
    minWBA: 37,
    maxWBA: 390,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("47% of average weekly wages in the base period"),
  },
  { code: "IA", name: "Iowa", divisor: 23, minWBA: 93, maxWBA: 763, maxWeeks: 16, effective: EFFECTIVE },
  { code: "KS", name: "Kansas", divisor: 100 / 4.25, minWBA: 159, maxWBA: 637, maxWeeks: 16, effective: EFFECTIVE },
  {
    code: "KY",
    name: "Kentucky",
    divisor: 0,
    minWBA: 39,
    maxWBA: 720,
    maxWeeks: 24,
    effective: EFFECTIVE,
    note: nonDivisorNote("a percentage of total base-period wages"),
  },
  {
    code: "LA",
    name: "Louisiana",
    divisor: 0,
    minWBA: 35,
    maxWBA: 282,
    maxWeeks: 20,
    effective: EFFECTIVE,
    note: nonDivisorNote("the average of wages in all four base-period quarters"),
  },
  {
    code: "ME",
    name: "Maine",
    divisor: 0,
    minWBA: 108,
    maxWBA: 1090,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("average wages in the two highest quarters plus dependent allowances"),
  },
  { code: "MD", name: "Maryland", divisor: 24, minWBA: 50, maxWBA: 430, maxWeeks: 26, effective: EFFECTIVE },
  {
    code: "MA",
    name: "Massachusetts",
    divisor: 0,
    minWBA: 60,
    maxWBA: 1105,
    maxWeeks: 30,
    effective: EFFECTIVE,
    note: nonDivisorNote("50% of average weekly wage plus dependent allowances"),
  },
  {
    code: "MI",
    name: "Michigan",
    divisor: 0,
    minWBA: 218,
    maxWBA: 530,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("4.1% of highest-quarter wages plus dependent allowances"),
  },
  {
    code: "MN",
    name: "Minnesota",
    divisor: 0,
    minWBA: 37,
    maxWBA: 948,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("the higher of high-quarter and base-period wage formulas"),
  },
  { code: "MS", name: "Mississippi", divisor: 26, minWBA: 30, maxWBA: 235, maxWeeks: 26, effective: EFFECTIVE },
  {
    code: "MO",
    name: "Missouri",
    divisor: 0,
    minWBA: 35,
    maxWBA: 320,
    maxWeeks: 20,
    effective: EFFECTIVE,
    note: nonDivisorNote("4% of the average of the two highest quarters"),
  },
  {
    code: "MT",
    name: "Montana",
    divisor: 0,
    minWBA: 227,
    maxWBA: 767,
    maxWeeks: 24,
    effective: EFFECTIVE,
    note: nonDivisorNote("base-period wages or wages in the two highest quarters"),
  },
  {
    code: "NE",
    name: "Nebraska",
    divisor: 0,
    minWBA: 70,
    maxWBA: 582,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("one-half of average weekly wage in the high quarter"),
  },
  { code: "NV", name: "Nevada", divisor: 25, minWBA: 16, maxWBA: 631, maxWeeks: 26, effective: EFFECTIVE },
  {
    code: "NH",
    name: "New Hampshire",
    divisor: 0,
    minWBA: 32,
    maxWBA: 427,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("a percentage of annual wages"),
  },
  {
    code: "NJ",
    name: "New Jersey",
    divisor: 0,
    minWBA: 186,
    maxWBA: 905,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("60% of average weekly wage plus dependent allowances"),
  },
  {
    code: "NM",
    name: "New Mexico",
    divisor: 0,
    minWBA: 116,
    maxWBA: 674,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("53.5% of average weekly wage in the highest-paid quarter"),
  },
  {
    code: "NY",
    name: "New York",
    divisor: 26,
    minWBA: 140,
    maxWBA: 869,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: "New York uses a 1/25 to 1/26 highest-quarter formula; this estimate uses 1/26 for a conservative quick estimate.",
  },
  {
    code: "NC",
    name: "North Carolina",
    divisor: 0,
    minWBA: 15,
    maxWBA: 350,
    maxWeeks: 20,
    effective: EFFECTIVE,
    note: nonDivisorNote("wages in the last two base-period quarters divided by 52"),
  },
  {
    code: "ND",
    name: "North Dakota",
    divisor: 0,
    minWBA: 43,
    maxWBA: 815,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("a weighted formula using wages in the two highest and third-highest quarters"),
  },
  {
    code: "OH",
    name: "Ohio",
    divisor: 0,
    minWBA: 176,
    maxWBA: 842,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("one-half of average weekly wage plus dependent allowances"),
  },
  { code: "OK", name: "Oklahoma", divisor: 23, minWBA: 16, maxWBA: 649, maxWeeks: 16, effective: EFFECTIVE },
  {
    code: "OR",
    name: "Oregon",
    divisor: 0,
    minWBA: 204,
    maxWBA: 872,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("a percentage of total base-period wages"),
  },
  {
    code: "PA",
    name: "Pennsylvania",
    divisor: 0,
    minWBA: 68,
    maxWBA: 613,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("a highest-quarter formula adjusted by statutory factors and dependent allowances"),
  },
  {
    code: "RI",
    name: "Rhode Island",
    divisor: 0,
    minWBA: 82,
    maxWBA: 931,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("average wages in the two highest quarters plus dependent allowances"),
  },
  { code: "SC", name: "South Carolina", divisor: 26, minWBA: 42, maxWBA: 350, maxWeeks: 20, effective: EFFECTIVE },
  { code: "SD", name: "South Dakota", divisor: 26, minWBA: 28, maxWBA: 553, maxWeeks: 26, effective: EFFECTIVE },
  {
    code: "TN",
    name: "Tennessee",
    divisor: 0,
    minWBA: 55,
    maxWBA: 325,
    maxWeeks: 20,
    effective: EFFECTIVE,
    note: nonDivisorNote("the average of wages in the two highest quarters"),
  },
  {
    code: "TX",
    name: "Texas",
    divisor: 25,
    minWBA: 75,
    maxWBA: 605,
    maxWeeks: 26,
    effective: EFFECTIVE,
  },
  { code: "UT", name: "Utah", divisor: 0, minWBA: 47, maxWBA: 806, maxWeeks: 26, effective: EFFECTIVE, note: nonDivisorNote("highest-quarter wages divided by 26 minus a statutory adjustment") },
  {
    code: "VT",
    name: "Vermont",
    divisor: 0,
    minWBA: 94,
    maxWBA: 757,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("wages in the two highest quarters divided by 45"),
  },
  {
    code: "VA",
    name: "Virginia",
    divisor: 0,
    minWBA: 112,
    maxWBA: 430,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("statutory benefit tables based on wages in the two highest quarters"),
  },
  {
    code: "WA",
    name: "Washington",
    divisor: 0,
    minWBA: 366,
    maxWBA: 1152,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("3.85% of the average of the two highest quarters"),
  },
  {
    code: "WV",
    name: "West Virginia",
    divisor: 0,
    minWBA: 24,
    maxWBA: 662,
    maxWeeks: 26,
    effective: EFFECTIVE,
    note: nonDivisorNote("a median-wage-class schedule"),
  },
  { code: "WI", name: "Wisconsin", divisor: 25, minWBA: 54, maxWBA: 370, maxWeeks: 26, effective: EFFECTIVE },
  { code: "WY", name: "Wyoming", divisor: 25, minWBA: 47, maxWBA: 651, maxWeeks: 26, effective: EFFECTIVE },
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
        "Select a state to estimate your weekly benefit.",
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

  const usesDivisor = state.divisor > 0;
  const rawWBA = usesDivisor ? hqw / state.divisor : state.maxWBA;
  const wba = usesDivisor ? Math.min(state.maxWBA, Math.max(state.minWBA, rawWBA)) : state.maxWBA;
  const total = wba * state.maxWeeks;
  const cappedAtMax = usesDivisor && rawWBA > state.maxWBA;

  const notes: string[] = [
    "This is a simplified estimate. Your actual benefit depends on your full base-period wages and eligibility — confirm with your state agency.",
    `${state.name} max weekly benefit: ${formatCurrency(state.maxWBA, "US")} (${state.effective}).`,
  ];
  if (cappedAtMax) {
    notes.push(`Your calculated amount exceeds the state cap, so it is limited to ${formatCurrency(state.maxWBA, "US")}.`);
  }
  if (state.note) notes.push(state.note);
  notes.push("Benefit figures are uprated periodically and do not include extensions or special programs.");

  return {
    headline: formatCurrency(wba, "US"),
    headlineCaption: `Estimated weekly unemployment benefit (${state.name})`,
    breakdown: [
      { label: "State", value: state.name },
      { label: "Highest-quarter wages", value: formatCurrency(hqw, "US") },
      {
        label: usesDivisor ? `Formula (wages ÷ ${state.divisor.toFixed(2).replace(/\.00$/, "")})` : "Formula",
        value: usesDivisor ? formatCurrency(rawWBA, "US") : "State maximum estimate",
      },
      { label: "Estimated weekly benefit", value: formatCurrency(wba, "US"), emphasis: true },
      { label: "Maximum weeks", value: `${state.maxWeeks} weeks` },
      { label: "Maximum potential total", value: formatCurrency(total, "US") },
    ],
    notes,
    valid: true,
  };
}
