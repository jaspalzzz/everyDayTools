import { pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * Statutory minimum notice period an employer must give an employee.
 * UK source: Employment Rights Act 1996, s.86.
 * CA source: provincial Employment Standards Acts (federal/Ontario baseline used).
 */
export const NOTICE_SOURCE: SourceRef = {
  label: "GOV.UK — Handing in your notice & notice periods",
  url: "https://www.gov.uk/handing-in-your-notice/giving-notice",
};

export type NoticeRegion = "UK" | "CA";

export interface NoticeInput {
  region: NoticeRegion;
  completedYears: number;
  /** Notice stated in the employment contract, in weeks (optional). */
  contractualWeeks: number;
}

/** UK statutory: 1 week per complete year between 2 and 12 years, capped at 12. */
function ukStatutoryWeeks(years: number): number {
  if (years < 2) return years >= 1 / 52 ? 1 : 0; // 1 week once past one month
  return Math.min(years, 12);
}

/** Ontario ESA baseline: 1 week per year, capped at 8. */
function caStatutoryWeeks(years: number): number {
  if (years < 1 / 4) return 0; // under 3 months: none
  return Math.min(Math.max(Math.floor(years), 1), 8);
}

export function calcNoticePeriod(input: NoticeInput): CalcResult {
  const years = safeNumber(input.completedYears);
  const contractual = safeNumber(input.contractualWeeks);

  const statutory =
    input.region === "CA" ? caStatutoryWeeks(years) : ukStatutoryWeeks(years);
  const entitled = Math.max(statutory, contractual);

  if (entitled <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your length of service to see your notice",
      breakdown: [],
      notes: [
        "In your first month of employment there is usually no statutory notice requirement.",
      ],
      valid: false,
    };
  }

  const notes: string[] = [];
  if (contractual > statutory) {
    notes.push(
      "Your contract gives more notice than the statutory minimum, so your contractual notice applies.",
    );
  } else if (contractual > 0 && contractual < statutory) {
    notes.push(
      "Your contract cannot give less than the statutory minimum, so the statutory figure applies.",
    );
  }
  notes.push(
    "This is the minimum notice your employer must give you. The notice you give them may differ — check your contract.",
  );

  return {
    headline: pluralUnit(entitled, "week"),
    headlineCaption: "Minimum notice you are entitled to",
    breakdown: [
      { label: "Statutory minimum notice", value: pluralUnit(statutory, "week") },
      {
        label: "Contractual notice",
        value: contractual > 0 ? pluralUnit(contractual, "week") : "Not specified",
      },
      { label: "Notice that applies", value: pluralUnit(entitled, "week"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
