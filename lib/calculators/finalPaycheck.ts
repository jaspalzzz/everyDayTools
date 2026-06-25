import type { CalcResult, SourceRef } from "../types";

/**
 * US final-paycheck deadline by state and separation type. These are statutory
 * RULES (when pay is due), not dollar amounts — more stable than uprated
 * figures. Coverage is a curated set of high-population states; the result
 * notes that more states are coming (no silent caps).
 */
export const FINAL_PAY_SOURCE: SourceRef = {
  label: "U.S. DOL — State Labor Offices",
  url: "https://www.dol.gov/agencies/whd/state/contacts",
};

export type SeparationType = "fired" | "quit";

interface PayRule {
  /** Short headline phrase, e.g. "Next regular payday". */
  deadline: string;
  /** One-sentence explanation of the state rule. */
  note: string;
}

interface StateFinalPay {
  code: string;
  name: string;
  fired: PayRule;
  quit: PayRule;
  /** True where the state has no specific statute and defaults to the pay schedule. */
  noLaw?: boolean;
}

export const STATE_FINAL_PAY: StateFinalPay[] = [
  {
    code: "CA",
    name: "California",
    fired: {
      deadline: "On your last day",
      note: "California requires all final wages, including accrued vacation, to be paid immediately at the time of termination.",
    },
    quit: {
      deadline: "Within 72 hours",
      note: "If you give at least 72 hours' notice, final pay is due on your last day; otherwise within 72 hours of quitting.",
    },
  },
  {
    code: "TX",
    name: "Texas",
    fired: {
      deadline: "Within 6 days",
      note: "Texas requires final pay within six calendar days of an involuntary termination.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "If you quit, Texas requires payment by the next regularly scheduled payday.",
    },
  },
  {
    code: "NY",
    name: "New York",
    fired: {
      deadline: "Next regular payday",
      note: "New York requires final wages by the next regular payday whether you are discharged or resign.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "New York requires final wages by the next regular payday whether you are discharged or resign.",
    },
  },
  {
    code: "FL",
    name: "Florida",
    noLaw: true,
    fired: {
      deadline: "Next regular payday",
      note: "Florida has no state-specific final-paycheck law, so wages follow your employer's normal schedule — typically the next payday.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "Florida has no state-specific final-paycheck law, so wages follow your employer's normal schedule — typically the next payday.",
    },
  },
  {
    code: "IL",
    name: "Illinois",
    fired: {
      deadline: "Next regular payday",
      note: "Illinois requires final compensation by the next regularly scheduled payday.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "Illinois requires final compensation by the next regularly scheduled payday.",
    },
  },
  {
    code: "PA",
    name: "Pennsylvania",
    fired: {
      deadline: "Next regular payday",
      note: "Pennsylvania requires final wages by the next regular payday.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "Pennsylvania requires final wages by the next regular payday.",
    },
  },
  {
    code: "MA",
    name: "Massachusetts",
    fired: {
      deadline: "On your last day",
      note: "Massachusetts requires discharged employees to be paid in full on their last day of work.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "If you resign, Massachusetts requires payment by the next regular payday (or the following Saturday).",
    },
  },
  {
    code: "CO",
    name: "Colorado",
    fired: {
      deadline: "Immediately",
      note: "Colorado requires final wages to be paid immediately upon an employer-initiated termination.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "If you quit, Colorado requires payment by the next regular payday.",
    },
  },
  {
    code: "WA",
    name: "Washington",
    fired: {
      deadline: "Next regular payday",
      note: "Washington requires final wages by the end of the established pay period — the next regular payday.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "Washington requires final wages by the end of the established pay period — the next regular payday.",
    },
  },
  {
    code: "GA",
    name: "Georgia",
    noLaw: true,
    fired: {
      deadline: "Next regular payday",
      note: "Georgia has no state-specific final-paycheck law, so wages follow your employer's normal schedule.",
    },
    quit: {
      deadline: "Next regular payday",
      note: "Georgia has no state-specific final-paycheck law, so wages follow your employer's normal schedule.",
    },
  },
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
      notes: [
        "Select a state to see its final-paycheck deadline. More states are being added — only a curated set is covered so far.",
      ],
      valid: false,
    };
  }

  const rule = input.separationType === "fired" ? state.fired : state.quit;
  const separationLabel = input.separationType === "fired" ? "let go / fired" : "resigned / quit";

  const notes: string[] = [rule.note];
  if (state.noLaw) {
    notes.push("This state has no specific final-paycheck statute, so your employer's pay schedule applies.");
  }
  notes.push(
    "Coverage is a curated set of high-population states for now — more are being added. Always confirm with your state labor office.",
  );

  return {
    headline: rule.deadline,
    headlineCaption: `When your final paycheck is due (${state.name}, ${separationLabel})`,
    breakdown: [
      { label: "State", value: state.name },
      { label: "How you left", value: input.separationType === "fired" ? "Let go / fired" : "Resigned / quit" },
      { label: "Final pay due", value: rule.deadline, emphasis: true },
    ],
    notes,
    valid: true,
  };
}
