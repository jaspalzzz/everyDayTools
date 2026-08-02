import { US_STATES, type UsStateWithPto } from "@/data/usStates";

export const FINAL_PAYCHECK_DATASET_PATH = "/research/us-final-paycheck-laws";
export const FINAL_PAYCHECK_CSV_PATH = "/research/us-final-paycheck-laws.csv";
export const FINAL_PAYCHECK_REVIEWED = "2026-07-12";

export type TerminationDeadlineBand =
  | "Same day or next business day"
  | "Within 2–3 days"
  | "Regular pay cycle"
  | "Other fixed or conditional deadline";

const DEADLINE_BANDS: TerminationDeadlineBand[] = [
  "Same day or next business day",
  "Within 2–3 days",
  "Regular pay cycle",
  "Other fixed or conditional deadline",
];

export function classifyTerminationDeadline(deadline: string): TerminationDeadlineBand {
  const normalized = deadline.toLowerCase();

  if (/immediately|day of termination|next business day/.test(normalized)) {
    return "Same day or next business day";
  }

  if (/24 hours|48 hours|72 hours|within 3 days|within 3 working days/.test(normalized)) {
    return "Within 2–3 days";
  }

  if (/next (regular|scheduled) payday|established pay period/.test(normalized)) {
    return "Regular pay cycle";
  }

  return "Other fixed or conditional deadline";
}

export function getTerminationDeadlineDistribution(states: UsStateWithPto[] = US_STATES) {
  return DEADLINE_BANDS.map((label) => ({
    label,
    count: states.filter((state) => classifyTerminationDeadline(state.finalPaycheckTerminated) === label).length,
  }));
}

export function getFinalPaycheckFindings(states: UsStateWithPto[] = US_STATES) {
  const differingDeadlines = states.filter(
    (state) => state.finalPaycheckTerminated !== state.finalPaycheckResigned,
  );
  const rapidTerminationStates = states.filter((state) => {
    const band = classifyTerminationDeadline(state.finalPaycheckTerminated);
    return band === "Same day or next business day" || band === "Within 2–3 days";
  });
  const writtenDemandStates = states.filter((state) =>
    /written demand/i.test(state.finalPaycheckTerminated + " " + state.finalPaycheckResigned),
  );

  return {
    jurisdictionCount: states.length,
    differingDeadlineCount: differingDeadlines.length,
    sameDeadlineCount: states.length - differingDeadlines.length,
    rapidTerminationCount: rapidTerminationStates.length,
    rapidTerminationStates: rapidTerminationStates.map((state) => state.name),
    writtenDemandCount: writtenDemandStates.length,
    writtenDemandStates: writtenDemandStates.map((state) => state.name),
  };
}

function csvEscape(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

export function buildFinalPaycheckCsv(states: UsStateWithPto[] = US_STATES) {
  const rows = [
    [
      "State",
      "Code",
      "Region",
      "Terminated deadline",
      "Resigned deadline",
      "Minimum wage",
      "Verified year",
      "Official source",
    ],
    ...states.map((state) => [
      state.name,
      state.code,
      state.region,
      state.finalPaycheckTerminated,
      state.finalPaycheckResigned,
      state.minimumWage,
      state.verifiedYear,
      state.dolUrl,
    ]),
  ];

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n") + "\n";
}
