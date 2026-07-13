import { formatCurrency, pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";
import { getUsStateAuthoritySource } from "@/data/usStateAuthoritySources";

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
  /** Official state labour-agency or statute endpoint for this row. */
  sourceUrl: string;
  /** ISO date on which the official authority endpoint was checked. */
  lastVerified: string;
}

/**
 * All 50 states + DC. Classification cross-checked across payroll-law
 * aggregators (Patriot Software, Paycor, OnPay) with primary sources for the
 * clear "required" states. "required" = earned vacation vests and cannot be
 * forfeited; "conditional" = a compliant written policy can limit/defeat the
 * payout; "no-requirement" = no state law mandates payout.
 */
type StatePtoPolicySeed = Omit<StatePtoPolicy, "sourceUrl" | "lastVerified">;

const STATE_PTO_RULES: StatePtoPolicySeed[] = [
  { code: "AL", name: "Alabama", rule: "no-requirement", note: "No statute requires vacation payout; governed by employer policy or contract." },
  { code: "AK", name: "Alaska", rule: "no-requirement", note: "No state law mandates payout of accrued unused vacation; policy controls." },
  { code: "AZ", name: "Arizona", rule: "no-requirement", note: "No payout requirement; use-it-or-lose-it is permitted if disclosed." },
  { code: "AR", name: "Arkansas", rule: "no-requirement", note: "No statute requires vacation payout at separation." },
  { code: "CA", name: "California", rule: "required", note: "Earned vacation is wages that vest and cannot be forfeited; use-it-or-lose-it is banned and payout is due at separation." },
  { code: "CO", name: "Colorado", rule: "required", note: "Colorado treats earned vacation as wages; forfeiture of accrued vacation is prohibited." },
  { code: "CT", name: "Connecticut", rule: "conditional", note: "No general mandate; payout is owed only if the employer's policy or agreement provides it." },
  { code: "DE", name: "Delaware", rule: "no-requirement", note: "No state law requires vacation payout; employer policy controls." },
  { code: "DC", name: "District of Columbia", rule: "conditional", note: "Accrued vacation is generally payable unless a written policy or agreement provides otherwise." },
  { code: "FL", name: "Florida", rule: "no-requirement", note: "No statute requires payout; entirely policy-driven." },
  { code: "GA", name: "Georgia", rule: "no-requirement", note: "No payout requirement; governed by employer policy." },
  { code: "HI", name: "Hawaii", rule: "no-requirement", note: "No state law mandates vacation payout at termination." },
  { code: "ID", name: "Idaho", rule: "no-requirement", note: "No payout requirement; policy or contract controls." },
  { code: "IL", name: "Illinois", rule: "required", note: "Earned vacation cannot be forfeited and must be paid at separation." },
  { code: "IN", name: "Indiana", rule: "required", note: "Courts treat accrued vacation as deferred compensation payable per the policy's terms." },
  { code: "IA", name: "Iowa", rule: "no-requirement", note: "No statute requires payout; employer policy controls." },
  { code: "KS", name: "Kansas", rule: "no-requirement", note: "No payout mandate; policy-driven." },
  { code: "KY", name: "Kentucky", rule: "no-requirement", note: "No state law requires vacation payout at separation." },
  { code: "LA", name: "Louisiana", rule: "conditional", note: "If the employer offers earned vacation, accrued amounts must be paid out following the policy's terms." },
  { code: "ME", name: "Maine", rule: "required", note: "Since 2023, private employers with 11+ employees must pay accrued vacation at separation; smaller and public employers are exempt." },
  { code: "MD", name: "Maryland", rule: "conditional", note: "Accrued vacation must be paid out unless the employer's written policy, provided at hire, limits it." },
  { code: "MA", name: "Massachusetts", rule: "required", note: "The Wage Act treats earned vacation as wages; unused vacation must be paid at separation." },
  { code: "MI", name: "Michigan", rule: "no-requirement", note: "No statute requires payout; governed by employer policy." },
  { code: "MN", name: "Minnesota", rule: "conditional", note: "No general mandate; payout is owed if the employer's policy or contract provides it." },
  { code: "MS", name: "Mississippi", rule: "no-requirement", note: "No state law requires vacation payout at termination." },
  { code: "MO", name: "Missouri", rule: "no-requirement", note: "No payout requirement; policy-driven." },
  { code: "MT", name: "Montana", rule: "required", note: "Earned vacation is wages; use-it-or-lose-it is prohibited and accrued vacation must be paid at separation." },
  { code: "NE", name: "Nebraska", rule: "required", note: "Earned vacation is wages that must be paid at separation; broad forfeiture is restricted." },
  { code: "NV", name: "Nevada", rule: "no-requirement", note: "No statute requires payout of accrued vacation; policy controls." },
  { code: "NH", name: "New Hampshire", rule: "conditional", note: "Payout is required if the employer's policy or practice provides for it." },
  { code: "NJ", name: "New Jersey", rule: "no-requirement", note: "No state law mandates vacation payout; employer policy controls." },
  { code: "NM", name: "New Mexico", rule: "conditional", note: "Accrued vacation is generally payable unless the written policy provides otherwise." },
  { code: "NY", name: "New York", rule: "conditional", note: "Accrued vacation must be paid unless the employer has a written forfeiture policy communicated in advance." },
  { code: "NC", name: "North Carolina", rule: "conditional", note: "Payout is required unless the employer has a clearly written forfeiture policy notifying employees." },
  { code: "ND", name: "North Dakota", rule: "conditional", note: "Accrued vacation is wages; an employer may withhold only under narrow written-notice conditions." },
  { code: "OH", name: "Ohio", rule: "no-requirement", note: "No statute requires payout; governed by employer policy or contract." },
  { code: "OK", name: "Oklahoma", rule: "no-requirement", note: "No state law requires vacation payout at separation." },
  { code: "OR", name: "Oregon", rule: "conditional", note: "Payout depends entirely on the employer's policy or agreement." },
  { code: "PA", name: "Pennsylvania", rule: "no-requirement", note: "No statute requires payout; policy or contract controls." },
  { code: "RI", name: "Rhode Island", rule: "required", note: "After one year of service, accrued vacation must be paid as wages within 24 hours of separation." },
  { code: "SC", name: "South Carolina", rule: "conditional", note: "No general mandate; payout is owed per the employer's written policy." },
  { code: "SD", name: "South Dakota", rule: "no-requirement", note: "No state law requires vacation payout at termination." },
  { code: "TN", name: "Tennessee", rule: "conditional", note: "Payout is governed by the employer's established policy or contract." },
  { code: "TX", name: "Texas", rule: "no-requirement", note: "No statute requires payout; entirely policy-driven." },
  { code: "UT", name: "Utah", rule: "no-requirement", note: "No state law mandates payout of accrued vacation." },
  { code: "VT", name: "Vermont", rule: "no-requirement", note: "No statute requires vacation payout; employer policy controls." },
  { code: "VA", name: "Virginia", rule: "no-requirement", note: "No state law requires payout of accrued unused vacation." },
  { code: "WA", name: "Washington", rule: "no-requirement", note: "No statute requires payout; governed by employer policy." },
  { code: "WV", name: "West Virginia", rule: "conditional", note: "Earned vacation is treated as wages, but the payout obligation follows the employer's policy terms." },
  { code: "WI", name: "Wisconsin", rule: "conditional", note: "Accrued vacation is payable as wages unless a written forfeiture policy provides otherwise." },
  { code: "WY", name: "Wyoming", rule: "conditional", note: "Accrued vacation must be paid unless a written forfeiture policy was provided and acknowledged." },
];

export const STATE_PTO: StatePtoPolicy[] = STATE_PTO_RULES.map((policy) => {
  const authority = getUsStateAuthoritySource(policy.code);
  return { ...policy, sourceUrl: authority.sourceUrl, lastVerified: authority.lastVerified };
});

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
