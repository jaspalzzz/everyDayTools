import { formatCurrency, safeNumber } from "../format";
import { UK_REDUNDANCY, UK_TRIBUNAL } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const TRIBUNAL_SOURCE: SourceRef = UK_TRIBUNAL.source;

export type ClaimType = "unfair-dismissal" | "discrimination" | "whistleblowing";
export type VentoBand = "lower" | "middle" | "upper";

export interface TribunalInput {
  annualSalary: number;
  yearsOfService: number;
  age: number;
  claimType: ClaimType;
  monthsToFindWork: number;
  acasBreach: boolean;
  contributoryFaultPct: number; // 0 | 25 | 50 | 75
  ventoBand?: VentoBand;        // only for discrimination
}

function calcBasicAward(age: number, years: number, weeklyPay: number): number {
  if (years < UK_REDUNDANCY.minYears) return 0;
  const counted = Math.min(years, UK_TRIBUNAL.basicAwardMaxYears);
  const capped = Math.min(weeklyPay, UK_TRIBUNAL.basicAwardWeeklyPayCap);
  let weeks = 0;
  for (let i = 0; i < counted; i++) {
    const a = age - 1 - i;
    if (a >= 41) weeks += 1.5;
    else if (a >= 22) weeks += 1.0;
    else weeks += 0.5;
  }
  return weeks * capped;
}

export function calcTribunal(input: TribunalInput): CalcResult {
  const salary  = safeNumber(input.annualSalary);
  const years   = Math.floor(safeNumber(input.yearsOfService));
  const age     = Math.floor(safeNumber(input.age));
  const months  = safeNumber(input.monthsToFindWork);
  const C = UK_TRIBUNAL;

  if (salary <= 0 || age <= 0 || months <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your details to see an estimate",
      breakdown: [],
      notes: ["Enter your salary, service length, age, and estimated time to find new work."],
      valid: false,
    };
  }

  const weeklyPay = salary / 52;

  // 1. Basic award (same formula as redundancy; day-one right for discrimination/whistleblowing)
  const hasBasicAward = years >= 2 || input.claimType !== "unfair-dismissal";
  const basicAward = hasBasicAward ? calcBasicAward(age, years, weeklyPay) : 0;

  // 2. Compensatory award — financial loss during period out of work
  const weeksOut = months * (52 / 12);
  const rawCompensatory = weeklyPay * weeksOut;
  const uncapped = input.claimType === "discrimination" || input.claimType === "whistleblowing";
  const compensatoryAward = uncapped
    ? rawCompensatory
    : Math.min(rawCompensatory, C.compensatoryAwardCap);
  const wasCapped = !uncapped && rawCompensatory > C.compensatoryAwardCap;

  // 3. ACAS uplift (up to 25% on compensatory award if employer failed code)
  const acasUplift = input.acasBreach ? compensatoryAward * 0.25 : 0;

  // 4. Injury to feelings — Vento band (discrimination only)
  let ventoPay = 0;
  let ventoBandLabel = "";
  if (input.claimType === "discrimination" && input.ventoBand) {
    const band = C[`vento${input.ventoBand.charAt(0).toUpperCase() + input.ventoBand.slice(1)}` as "ventoLower" | "ventoMiddle" | "ventoUpper"];
    ventoPay = (band.min + band.max) / 2; // midpoint of band
    const bandNames = { lower: "Lower", middle: "Middle", upper: "Upper" };
    ventoBandLabel = `${bandNames[input.ventoBand]} Vento band (${formatCurrency(band.min, "UK")}–${formatCurrency(band.max, "UK")})`;
  }

  // 5. Total before contribution reduction
  const totalBeforeReduction = basicAward + compensatoryAward + acasUplift + ventoPay;

  // 6. Contributory fault reduction
  const reduction = totalBeforeReduction * (safeNumber(input.contributoryFaultPct) / 100);
  const finalTotal = totalBeforeReduction - reduction;

  const notes: string[] = [];
  if (!hasBasicAward) {
    notes.push("Basic award requires 2+ years' service for unfair dismissal claims. Discrimination and whistleblowing claims have no qualifying period.");
  }
  if (wasCapped) {
    notes.push(`Compensatory award capped at £${C.compensatoryAwardCap.toLocaleString()} (lower of 52 weeks' pay or the statutory cap). Discrimination and whistleblowing claims are uncapped.`);
  }
  if (uncapped) {
    notes.push("Discrimination and whistleblowing compensatory awards are uncapped — financial loss beyond the £115,115 cap can be recovered in full.");
  }
  if (input.acasBreach) {
    notes.push("ACAS uplift of 25% applied because the employer failed to follow the ACAS Code of Practice on Disciplinary and Grievance Procedures.");
  }
  if (input.contributoryFaultPct > 0) {
    notes.push(`${input.contributoryFaultPct}% contributory fault reduction applied. Tribunals reduce awards where the claimant's own conduct contributed to the dismissal.`);
  }
  if (input.claimType === "discrimination" && input.ventoBand) {
    notes.push(`Injury to feelings award uses the midpoint of the ${input.ventoBand} Vento band. Exact award is at the Tribunal's discretion within the band. Vento bands are reviewed annually by Presidential Guidance.`);
  }
  notes.push("This is an estimate. Actual awards depend on specific evidence, Tribunal findings, and judicial discretion. Always take independent legal advice.");

  return {
    headline: formatCurrency(finalTotal, "UK"),
    headlineCaption: "Estimated total compensation",
    breakdown: [
      ...(basicAward > 0
        ? [{ label: "Basic award", value: formatCurrency(basicAward, "UK") }]
        : []),
      { label: `Compensatory award (${months} month${months !== 1 ? "s" : ""} out of work)`, value: formatCurrency(compensatoryAward, "UK") },
      ...(acasUplift > 0
        ? [{ label: "ACAS uplift (25%)", value: formatCurrency(acasUplift, "UK") }]
        : []),
      ...(ventoPay > 0
        ? [{ label: `Injury to feelings — ${ventoBandLabel}`, value: formatCurrency(ventoPay, "UK") }]
        : []),
      { label: "Total before reduction", value: formatCurrency(totalBeforeReduction, "UK") },
      ...(reduction > 0
        ? [{ label: `Contributory fault reduction (${input.contributoryFaultPct}%)`, value: `−${formatCurrency(reduction, "UK")}` }]
        : []),
      { label: "Estimated total award", value: formatCurrency(finalTotal, "UK"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
