import { formatCurrency, pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * US PTO (paid time off) payout at termination.
 * There is no federal requirement; rules are set per state. The map below
 * encodes whether accrued, unused PTO must be paid out on separation.
 * This is the "drift moat" — state rulings change; keep this maintained.
 */
export const PTO_SOURCE: SourceRef = {
  label: "U.S. Department of Labor — State Labor Offices",
  url: "https://www.dol.gov/agencies/whd/state/contacts",
};

export type PtoRule = "required" | "conditional" | "no-requirement";

export interface StatePtoPolicy {
  code: string;
  name: string;
  rule: PtoRule;
  note: string;
}

/** Representative subset of US states. Expand as the tool matures. */
export const STATE_PTO: StatePtoPolicy[] = [
  { code: "CA", name: "California", rule: "required", note: "Earned vacation is treated as wages and must be paid out. 'Use it or lose it' is illegal." },
  { code: "CO", name: "Colorado", rule: "required", note: "Earned vacation must be paid out on separation." },
  { code: "IL", name: "Illinois", rule: "required", note: "Earned vacation must be paid out unless a valid forfeiture agreement exists." },
  { code: "MA", name: "Massachusetts", rule: "required", note: "Accrued vacation is treated as wages and must be paid out." },
  { code: "NE", name: "Nebraska", rule: "required", note: "Earned vacation must be paid out; forfeiture is not allowed." },
  { code: "NY", name: "New York", rule: "conditional", note: "Must be paid out unless the employer's written policy clearly states otherwise." },
  { code: "TX", name: "Texas", rule: "conditional", note: "Governed by the employer's written policy or agreement." },
  { code: "FL", name: "Florida", rule: "conditional", note: "Governed by the employer's established policy or contract." },
  { code: "GA", name: "Georgia", rule: "no-requirement", note: "No state requirement to pay out unused PTO." },
  { code: "PA", name: "Pennsylvania", rule: "conditional", note: "Depends on the employer's policy or contract." },
];

export interface PtoInput {
  stateCode: string;
  unusedHours: number;
  hourlyRate: number;
}

export function calcPtoPayout(input: PtoInput): CalcResult {
  const hours = safeNumber(input.unusedHours);
  const rate = safeNumber(input.hourlyRate);
  const policy = STATE_PTO.find((s) => s.code === input.stateCode);

  if (!policy || hours <= 0 || rate <= 0) {
    return {
      headline: "—",
      headlineCaption: "Select your state and enter your details",
      breakdown: [],
      notes: ["Choose your state, then enter your unused PTO hours and hourly rate."],
      valid: false,
    };
  }

  const gross = hours * rate;
  const ruleLabel: Record<PtoRule, string> = {
    required: "Payout required by state law",
    conditional: "Depends on employer policy",
    "no-requirement": "No state payout requirement",
  };

  const notes: string[] = [policy.note];
  if (policy.rule !== "required") {
    notes.push(
      "Because your state does not mandate payout, check your employer's written PTO policy and your offer letter.",
    );
  }
  notes.push(
    "This estimate is the gross value before tax. PTO payouts are taxed as supplemental wages.",
  );

  return {
    headline: formatCurrency(gross, "US"),
    headlineCaption: `Estimated gross PTO payout — ${policy.name}`,
    breakdown: [
      { label: "State", value: policy.name },
      { label: "State rule", value: ruleLabel[policy.rule] },
      { label: "Unused PTO", value: pluralUnit(hours, "hour") },
      { label: "Hourly rate", value: formatCurrency(rate, "US", { decimals: 2 }) },
      { label: "Gross payout", value: formatCurrency(gross, "US"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
