import type { CalcResult, SourceRef } from "../types";

/**
 * US final-paycheck deadline by state and separation type. These are statutory
 * RULES (when pay is due), not dollar amounts. Covers all 50 states + DC.
 *
 * Data cross-checked across payroll-law aggregators (Patriot Software, Paycom,
 * Nolo) with primary sources for the high-stakes immediate-pay states. This is
 * legal information, not advice — the result tells users to confirm with their
 * state labor office, and demand-triggered states carry an explicit caveat.
 */
export const FINAL_PAY_SOURCE: SourceRef = {
  label: "U.S. DOL — State Labor Offices",
  url: "https://www.dol.gov/agencies/whd/state/contacts",
};

export type SeparationType = "fired" | "quit";

interface StateFinalPay {
  code: string;
  name: string;
  /** Deadline phrase when the employee is dismissed/laid off. */
  fired: string;
  /** Deadline phrase when the employee resigns. */
  quit: string;
  /** No specific statute — the employer's pay schedule governs. */
  noLaw?: boolean;
  /** Extra caveat for special cases (e.g. demand-triggered deadlines). */
  caveat?: string;
}

export const STATE_FINAL_PAY: StateFinalPay[] = [
  { code: "AL", name: "Alabama", fired: "Next regular payday", quit: "Next regular payday", noLaw: true },
  { code: "AK", name: "Alaska", fired: "Within 3 days", quit: "Next regular payday" },
  { code: "AZ", name: "Arizona", fired: "Next payday or 7 days", quit: "Next regular payday" },
  { code: "AR", name: "Arkansas", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "CA", name: "California", fired: "On your last day", quit: "Within 72 hours" },
  { code: "CO", name: "Colorado", fired: "On your last day", quit: "Next regular payday" },
  { code: "CT", name: "Connecticut", fired: "Next business day", quit: "Next regular payday" },
  { code: "DE", name: "Delaware", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "DC", name: "District of Columbia", fired: "Next business day", quit: "Next payday or 7 days" },
  { code: "FL", name: "Florida", fired: "Next regular payday", quit: "Next regular payday", noLaw: true },
  { code: "GA", name: "Georgia", fired: "Next regular payday", quit: "Next regular payday", noLaw: true },
  { code: "HI", name: "Hawaii", fired: "On your last day", quit: "Next regular payday" },
  { code: "ID", name: "Idaho", fired: "Next payday or 10 days", quit: "Next payday or 10 days" },
  { code: "IL", name: "Illinois", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "IN", name: "Indiana", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "IA", name: "Iowa", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "KS", name: "Kansas", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "KY", name: "Kentucky", fired: "Next payday or 14 days", quit: "Next payday or 14 days" },
  { code: "LA", name: "Louisiana", fired: "Next payday or 15 days", quit: "Next payday or 15 days" },
  { code: "ME", name: "Maine", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "MD", name: "Maryland", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "MA", name: "Massachusetts", fired: "On your last day", quit: "Next regular payday" },
  { code: "MI", name: "Michigan", fired: "Next regular payday", quit: "Next regular payday" },
  {
    code: "MN",
    name: "Minnesota",
    fired: "Within 24 hours",
    quit: "Next regular payday",
    caveat: "Minnesota's 24-hour deadline runs from your written demand for payment, not automatically.",
  },
  { code: "MS", name: "Mississippi", fired: "Next regular payday", quit: "Next regular payday", noLaw: true },
  {
    code: "MO",
    name: "Missouri",
    fired: "On your last day",
    quit: "Next regular payday",
    caveat: "Missouri's immediate-pay rule is triggered by your demand and applies mainly to certain employers.",
  },
  { code: "MT", name: "Montana", fired: "On your last day", quit: "Next payday or 15 days" },
  { code: "NE", name: "Nebraska", fired: "Next payday or 2 weeks", quit: "Next payday or 2 weeks" },
  { code: "NV", name: "Nevada", fired: "Within 3 days", quit: "Next payday or 7 days" },
  { code: "NH", name: "New Hampshire", fired: "Within 72 hours", quit: "Next regular payday" },
  { code: "NJ", name: "New Jersey", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "NM", name: "New Mexico", fired: "Within 5 days", quit: "Next regular payday" },
  { code: "NY", name: "New York", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "NC", name: "North Carolina", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "ND", name: "North Dakota", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "OH", name: "Ohio", fired: "Next payday or 15 days", quit: "Next payday or 15 days" },
  { code: "OK", name: "Oklahoma", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "OR", name: "Oregon", fired: "Next business day", quit: "Next payday or 5 days" },
  { code: "PA", name: "Pennsylvania", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "RI", name: "Rhode Island", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "SC", name: "South Carolina", fired: "Within 48 hours or next payday", quit: "Within 48 hours or next payday" },
  { code: "SD", name: "South Dakota", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "TN", name: "Tennessee", fired: "Next payday or 21 days", quit: "Next payday or 21 days" },
  { code: "TX", name: "Texas", fired: "Within 6 days", quit: "Next regular payday" },
  { code: "UT", name: "Utah", fired: "Within 24 hours", quit: "Next regular payday" },
  { code: "VT", name: "Vermont", fired: "Within 72 hours", quit: "Next regular payday" },
  { code: "VA", name: "Virginia", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "WA", name: "Washington", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "WV", name: "West Virginia", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "WI", name: "Wisconsin", fired: "Next regular payday", quit: "Next regular payday" },
  { code: "WY", name: "Wyoming", fired: "Next regular payday", quit: "Next regular payday" },
];

export interface FinalPaycheckInput {
  stateCode: string;
  separationType: SeparationType;
}

export function calcFinalPaycheck(input: FinalPaycheckInput): CalcResult {
  const state = STATE_FINAL_PAY.find((s) => s.code === input.stateCode);

  if (!state) {
    return {
      headline: "—",
      headlineCaption: "Select your state",
      breakdown: [],
      notes: ["Select a state to see its final-paycheck deadline."],
      valid: false,
    };
  }

  const deadline = input.separationType === "fired" ? state.fired : state.quit;
  const separationLabel = input.separationType === "fired" ? "let go / fired" : "resigned / quit";

  const notes: string[] = [
    `In ${state.name}, your final paycheck after you ${
      input.separationType === "fired" ? "are let go" : "resign"
    } is due: ${deadline.toLowerCase()}.`,
  ];
  if (state.noLaw) {
    notes.push("This state has no specific final-paycheck statute, so your employer's regular pay schedule applies.");
  }
  if (state.caveat) notes.push(state.caveat);
  notes.push(
    "Deadlines can depend on a written demand or the type of employer — confirm the detail with your state labor office.",
  );

  return {
    headline: deadline,
    headlineCaption: `When your final paycheck is due (${state.name}, ${separationLabel})`,
    breakdown: [
      { label: "State", value: state.name },
      { label: "How you left", value: input.separationType === "fired" ? "Let go / fired" : "Resigned / quit" },
      { label: "Final pay due", value: deadline, emphasis: true },
    ],
    notes,
    valid: true,
  };
}
