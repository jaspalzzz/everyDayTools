/**
 * Central statutory-rate registry.
 *
 * Every rate constant that could drift (statutory payments, tax bands,
 * thresholds, multipliers) lives here. Engines import from this file — a yearly
 * update is a single-file change. The shape matches the CalcResult trust layer:
 * effectiveDate lets the UI show "Rates last verified: …" badges.
 *
 * Structure: grouped by jurisdiction, then by domain.
 * Review calendar: UK rates change each April; US rates change each January.
 */

import type { SourceRef } from "./types";

// ---------------------------------------------------------------------------
// UK — Employment Rights Act / HMRC / DWP (2026/27)
// ---------------------------------------------------------------------------

export const UK_REDUNDANCY = {
  weeklyPayCap: 751,
  maxYears: 20,
  minYears: 2,
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "GOV.UK — Redundancy pay (Employment Rights Act 1996)",
    url: "https://www.gov.uk/redundancy-your-rights/redundancy-pay",
  } satisfies SourceRef,
} as const;

export const UK_SMP = {
  standardWeeklyRate: 194.32,
  lowerEarningsLimit: 129,
  higherRateFraction: 0.9,
  higherRateWeeks: 6,
  totalWeeks: 39,
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "GOV.UK — Statutory Maternity Pay and Leave",
    url: "https://www.gov.uk/maternity-pay-leave/pay",
  } satisfies SourceRef,
} as const;

export const UK_SPP = {
  weeklyRate: UK_SMP.standardWeeklyRate,
  lowerEarningsLimit: UK_SMP.lowerEarningsLimit,
  higherRateFraction: UK_SMP.higherRateFraction,
  maxWeeks: 2,
  effectiveDate: UK_SMP.effectiveDate,
  taxYear: UK_SMP.taxYear,
  source: {
    label: "GOV.UK — Statutory Paternity Pay and Leave",
    url: "https://www.gov.uk/paternity-pay-leave/pay",
  } satisfies SourceRef,
} as const;

export const UK_SAP = {
  ...UK_SMP,
  source: {
    label: "GOV.UK — Statutory Adoption Pay and Leave",
    url: "https://www.gov.uk/adoption-pay-leave/pay",
  } satisfies SourceRef,
} as const;

export const UK_SHPP = {
  weeklyRate: UK_SMP.standardWeeklyRate,
  lowerEarningsLimit: UK_SMP.lowerEarningsLimit,
  higherRateFraction: UK_SMP.higherRateFraction,
  maxWeeks: 37,
  effectiveDate: UK_SMP.effectiveDate,
  taxYear: UK_SMP.taxYear,
  source: {
    label: "GOV.UK — Shared Parental Leave and Pay",
    url: "https://www.gov.uk/shared-parental-leave-and-pay",
  } satisfies SourceRef,
} as const;

/** UK Employment Tribunal compensation limits (2026/27) */
export const UK_TRIBUNAL = {
  /** Lower of 52 weeks' gross pay or this cap — Employment Rights Act 1996 s.124 */
  compensatoryAwardCap: 115_115,
  /** Same formula as redundancy pay — ERA 1996 s.119 */
  basicAwardWeeklyPayCap: 751,
  basicAwardMaxYears: 20,
  basicAwardMinYears: 2,
  /** Total termination payment tax-free threshold — ITEPA 2003 s.403 */
  taxFreeThreshold: 30_000,
  /**
   * Vento bands — injury to feelings in discrimination claims.
   * Presidential Guidance (updated annually). Approximate 2026/27 values.
   */
  ventoLower:  { min: 1_200,  max: 11_700 },
  ventoMiddle: { min: 11_700, max: 35_200 },
  ventoUpper:  { min: 35_200, max: 58_700 },
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "Employment Rights Act 1996 — Tribunal compensation limits",
    url: "https://www.legislation.gov.uk/ukpga/1996/18/section/124",
  } satisfies SourceRef,
} as const;

/** UK settlement agreement benchmarks (2026/27) */
export const UK_SETTLEMENT = {
  weeklyPayCap: 751,
  taxFreeThreshold: 30_000,
  /** Employer legal fees contribution — market standard £500–£1,500 */
  legalFeesContribution: 750,
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "Employment Rights Act 1996 / ITEPA 2003 — Settlement agreements",
    url: "https://www.gov.uk/negotiate-settle-employment-dispute",
  } satisfies SourceRef,
} as const;

export const UK_SSP = {
  weeklyRate: 123.25,
  /** Waiting days abolished from 6 April 2026 (Employment Rights Act 2025). */
  waitingDays: 0,
  maxWeeks: 28,
  /**
   * LEL eligibility condition removed from 6 April 2026.
   * Low earners now receive the lower of the flat rate or 80% of AWE.
   */
  earningsFraction: 0.8,
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "GOV.UK — Statutory Sick Pay (SSP)",
    url: "https://www.gov.uk/statutory-sick-pay",
  } satisfies SourceRef,
} as const;

export const UK_HOLIDAY = {
  statutoryWeeks: 5.6,
  maxStatutoryDays: 28,
  effectiveDate: "1998-10-01",
  source: {
    label: "GOV.UK — Holiday entitlement",
    url: "https://www.gov.uk/holiday-entitlement-rights",
  } satisfies SourceRef,
} as const;

/** UK Income Tax — England, Wales, Northern Ireland (2026/27) */
export const UK_INCOME_TAX = {
  personalAllowance: 12_570,
  basicRateLimit: 50_270,
  higherRateLimit: 125_140,
  basicRate: 0.2,
  higherRate: 0.4,
  additionalRate: 0.45,
  paReducesAbove: 100_000,
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "HMRC — Income Tax rates and Personal Allowance",
    url: "https://www.gov.uk/income-tax-rates",
  } satisfies SourceRef,
} as const;

/** UK National Insurance — Class 1 employee (2026/27) */
export const UK_NI = {
  primaryThreshold: 12_570,
  upperEarningsLimit: 50_270,
  mainRate: 0.08,
  upperRate: 0.02,
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "HMRC — National Insurance rates and categories",
    url: "https://www.gov.uk/national-insurance/how-much-you-pay",
  } satisfies SourceRef,
} as const;

/** UK Class 2 / Class 4 NI — self-employed (2026/27) */
export const UK_NI_SELF_EMPLOYED = {
  /**
   * Class 2 NI is treated as paid (£0 charge) from April 2024 onward.
   * Self-employed people with profits above the SPT get NI credits automatically.
   */
  class2WeeklyRate: 0,
  class2SmallProfitsThreshold: 7_105,
  class4LowerProfitsLimit: 12_570,
  class4UpperProfitsLimit: 50_270,
  /** Current Class 4 main rate. */
  class4MainRate: 0.06,
  class4UpperRate: 0.02,
  effectiveDate: "2026-04-06",
  taxYear: "2026/27",
  source: {
    label: "HMRC — Self-employed National Insurance rates",
    url: "https://www.gov.uk/self-employed-national-insurance-rates",
  } satisfies SourceRef,
} as const;

// ---------------------------------------------------------------------------
// US — IRS / DOL (2026)
// ---------------------------------------------------------------------------

/** US federal income tax brackets — single filer (2026) */
export const US_INCOME_TAX = {
  standardDeductionSingle: 16_100,
  standardDeductionMarried: 32_200,
  brackets: [
    { floor: 0,       ceiling: 11_925,  rate: 0.10 },
    { floor: 11_925,  ceiling: 48_475,  rate: 0.12 },
    { floor: 48_475,  ceiling: 103_350, rate: 0.22 },
    { floor: 103_350, ceiling: 197_300, rate: 0.24 },
    { floor: 197_300, ceiling: 250_525, rate: 0.32 },
    { floor: 250_525, ceiling: 626_350, rate: 0.35 },
    { floor: 626_350, ceiling: Infinity, rate: 0.37 },
  ],
  effectiveDate: "2026-01-01",
  taxYear: "2026",
  source: {
    label: "IRS — 2026 Tax Brackets and Standard Deduction",
    url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026",
  } satisfies SourceRef,
} as const;

/** FICA — employee share (2026) */
export const US_FICA = {
  ssTaxRate: 0.062,
  /** SSA 2026 taxable maximum. */
  ssWageBase: 184_500,
  medicareTaxRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: 200_000,
  effectiveDate: "2026-01-01",
  taxYear: "2026",
  source: {
    label: "IRS — FICA (Social Security and Medicare) rates",
    url: "https://www.irs.gov/taxtopics/tc751",
  } satisfies SourceRef,
} as const;

/** US self-employment (SE) tax — both halves (2026) */
export const US_SE_TAX = {
  /** Combined SE rate (employer + employee SS + Medicare). */
  seRate: 0.153,
  ssRate: 0.124,
  medicareRate: 0.029,
  /** SSA 2026 taxable maximum: $184,500. */
  ssWageBase: 184_500,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: 200_000,
  /** SE income is reduced by half the SE tax before applying income tax. */
  deductibleFraction: 0.5,
  effectiveDate: "2026-01-01",
  taxYear: "2026",
  source: {
    label: "IRS — Self-Employment Tax (SE Tax)",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
  } satisfies SourceRef,
} as const;

/** US supplemental withholding rate for bonuses (2026) */
export const US_BONUS = {
  supplementalRate: 0.22,
  effectiveDate: "2026-01-01",
  taxYear: "2026",
  source: {
    label: "IRS — Publication 15 (supplemental wages)",
    url: "https://www.irs.gov/publications/p15",
  } satisfies SourceRef,
} as const;

/** FLSA — overtime threshold */
export const US_FLSA = {
  weeklyOvertimeThreshold: 40,
  source: {
    label: "DOL — Fair Labor Standards Act overtime rules",
    url: "https://www.dol.gov/agencies/whd/overtime",
  } satisfies SourceRef,
} as const;
