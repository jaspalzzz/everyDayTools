import { formatCurrency, safeNumber } from "../format";
import {
  UK_INCOME_TAX,
  UK_NI,
  UK_NI_SELF_EMPLOYED,
  US_INCOME_TAX,
  US_FICA,
  US_SE_TAX,
} from "../rates";
import type { CalcResult, CountryCode, SourceRef } from "../types";

export const IR35_SOURCE: SourceRef = {
  label: "HMRC — IR35 off-payroll working rules",
  url: "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35",
};

export const W2_VS_1099_SOURCE: SourceRef = {
  label: "IRS — Self-Employment Tax vs W-2 Employment",
  url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
};

export function contractorComparisonSource(country: CountryCode): SourceRef {
  return country === "UK" ? IR35_SOURCE : W2_VS_1099_SOURCE;
}

export interface ContractorComparisonInput {
  country: CountryCode;
  /** Annual gross income (contractor rate × days OR W-2 salary). */
  contractorGross: number;
  /** Equivalent employee salary (inside IR35 / W-2 comparator). */
  employeeSalary: number;
  /** UK: allowable business expenses before tax. US: business deductions (Schedule C). */
  expenses?: number;
}

// ---------------------------------------------------------------------------
// UK engine — outside IR35 (Ltd/umbrella) vs inside IR35 (deemed employee)
// ---------------------------------------------------------------------------
function calcUKComparison(
  contractorGross: number,
  employeeSalary: number,
  expenses: number,
): CalcResult {
  const T = UK_INCOME_TAX;
  const NE = UK_NI; // employee Class 1
  const NS = UK_NI_SELF_EMPLOYED; // contractor Class 2/4

  // Outside IR35: profit = gross - expenses; pay self-employed NI + income tax
  const outsideProfit = Math.max(0, contractorGross - expenses);
  let outsidePA: number = T.personalAllowance;
  if (outsideProfit > T.paReducesAbove) outsidePA = Math.max(0, outsidePA - Math.floor((outsideProfit - T.paReducesAbove) / 2));
  const outsideTaxable = Math.max(0, outsideProfit - outsidePA);

  let outsideIT = 0;
  if (outsideProfit <= T.basicRateLimit) outsideIT = outsideTaxable * T.basicRate;
  else if (outsideProfit <= T.higherRateLimit) {
    const basic = Math.max(0, T.basicRateLimit - outsidePA);
    outsideIT = basic * T.basicRate + Math.max(0, outsideTaxable - basic) * T.higherRate;
  } else {
    const b = T.basicRateLimit - outsidePA;
    const h = Math.max(0, T.higherRateLimit - T.basicRateLimit);
    const a = Math.max(0, outsideTaxable - b - h);
    outsideIT = Math.max(0, b) * T.basicRate + h * T.higherRate + a * T.additionalRate;
  }

  const class2 = outsideProfit >= NS.class2SmallProfitsThreshold ? NS.class2WeeklyRate * 52 : 0;
  let class4 = 0;
  if (outsideProfit > NS.class4LowerProfitsLimit) {
    class4 += (Math.min(outsideProfit, NS.class4UpperProfitsLimit) - NS.class4LowerProfitsLimit) * NS.class4MainRate;
  }
  if (outsideProfit > NS.class4UpperProfitsLimit) {
    class4 += (outsideProfit - NS.class4UpperProfitsLimit) * NS.class4UpperRate;
  }
  const outsideTakeHome = outsideProfit - outsideIT - class2 - class4;

  // Inside IR35 / employee: standard PAYE
  let insidePA: number = T.personalAllowance;
  if (employeeSalary > T.paReducesAbove) insidePA = Math.max(0, insidePA - Math.floor((employeeSalary - T.paReducesAbove) / 2));
  const insideTaxable = Math.max(0, employeeSalary - insidePA);

  let insideIT = 0;
  if (employeeSalary <= T.basicRateLimit) insideIT = insideTaxable * T.basicRate;
  else if (employeeSalary <= T.higherRateLimit) {
    const basic = Math.max(0, T.basicRateLimit - insidePA);
    insideIT = basic * T.basicRate + Math.max(0, insideTaxable - basic) * T.higherRate;
  } else {
    const b = T.basicRateLimit - insidePA;
    const h = Math.max(0, T.higherRateLimit - T.basicRateLimit);
    const a = Math.max(0, insideTaxable - b - h);
    insideIT = Math.max(0, b) * T.basicRate + h * T.higherRate + a * T.additionalRate;
  }

  let insideNI = 0;
  if (employeeSalary > NE.primaryThreshold) insideNI += (Math.min(employeeSalary, NE.upperEarningsLimit) - NE.primaryThreshold) * NE.mainRate;
  if (employeeSalary > NE.upperEarningsLimit) insideNI += (employeeSalary - NE.upperEarningsLimit) * NE.upperRate;
  const insideTakeHome = employeeSalary - insideIT - insideNI;

  const diff = outsideTakeHome - insideTakeHome;
  const diffLabel = diff >= 0 ? `+${formatCurrency(diff, "UK")} outside IR35` : `${formatCurrency(diff, "UK")} outside IR35`;

  return {
    headline: formatCurrency(outsideTakeHome, "UK"),
    headlineCaption: "Estimated take-home outside IR35",
    breakdown: [
      { label: "Outside IR35 — gross income", value: formatCurrency(contractorGross, "UK") },
      { label: "Allowable expenses", value: `−${formatCurrency(expenses, "UK")}` },
      { label: "Outside IR35 — income tax + NI", value: `−${formatCurrency(outsideIT + class2 + class4, "UK")}` },
      { label: "Outside IR35 — take-home", value: formatCurrency(outsideTakeHome, "UK"), emphasis: true },
      { label: "Inside IR35 — employee salary", value: formatCurrency(employeeSalary, "UK") },
      { label: "Inside IR35 — PAYE tax + NI", value: `−${formatCurrency(insideIT + insideNI, "UK")}` },
      { label: "Inside IR35 — take-home", value: formatCurrency(insideTakeHome, "UK") },
      { label: "Difference", value: diffLabel },
    ],
    notes: [
      "Outside IR35 uses self-employed income tax + Class 2/4 NI on net profit after expenses.",
      "Inside IR35 uses employee PAYE income tax + Class 1 NI on the equivalent salary.",
      "This does not model dividend extraction, pension contributions, or employer NI — all of which affect the real comparison. Consult an accountant for a full IR35 analysis.",
    ],
    valid: true,
  };
}

// ---------------------------------------------------------------------------
// US engine — 1099 self-employed vs W-2 employee
// ---------------------------------------------------------------------------
function calcUSComparison(
  contractorGross: number,
  employeeSalary: number,
  expenses: number,
): CalcResult {
  const T = US_INCOME_TAX;
  const F = US_FICA;
  const S = US_SE_TAX;

  // 1099: SE tax + income tax on net profit
  const profit1099 = Math.max(0, contractorGross - expenses);
  const seBase = profit1099 * 0.9235;
  const ss1099 = Math.min(seBase, S.ssWageBase) * S.ssRate;
  const med1099 = seBase * S.medicareRate;
  const addMed1099 = profit1099 > S.additionalMedicareThreshold ? (profit1099 - S.additionalMedicareThreshold) * S.additionalMedicareRate : 0;
  const seTax = ss1099 + med1099 + addMed1099;
  const halfSE = seTax * S.deductibleFraction;
  const agi1099 = Math.max(0, profit1099 - halfSE - T.standardDeductionSingle);
  let fedTax1099 = 0;
  for (const band of T.brackets) {
    if (agi1099 <= band.floor) break;
    fedTax1099 += (Math.min(agi1099, band.ceiling) - band.floor) * band.rate;
  }
  const takeHome1099 = profit1099 - seTax - fedTax1099;

  // W-2: employee FICA + federal income tax
  const agiW2 = Math.max(0, employeeSalary - T.standardDeductionSingle);
  let fedTaxW2 = 0;
  for (const band of T.brackets) {
    if (agiW2 <= band.floor) break;
    fedTaxW2 += (Math.min(agiW2, band.ceiling) - band.floor) * band.rate;
  }
  const ssW2 = Math.min(employeeSalary, F.ssWageBase) * F.ssTaxRate;
  const medW2 = employeeSalary * F.medicareTaxRate;
  const addMedW2 = employeeSalary > F.additionalMedicareThreshold ? (employeeSalary - F.additionalMedicareThreshold) * F.additionalMedicareRate : 0;
  const ficaW2 = ssW2 + medW2 + addMedW2;
  const takeHomeW2 = employeeSalary - fedTaxW2 - ficaW2;

  const diff = takeHome1099 - takeHomeW2;
  const diffLabel = diff >= 0 ? `+${formatCurrency(diff, "US")} as 1099` : `${formatCurrency(diff, "US")} as 1099`;

  return {
    headline: formatCurrency(takeHome1099, "US"),
    headlineCaption: "Estimated take-home as 1099 contractor",
    breakdown: [
      { label: "1099 — gross income", value: formatCurrency(contractorGross, "US") },
      { label: "Business expenses", value: `−${formatCurrency(expenses, "US")}` },
      { label: "1099 — SE tax", value: `−${formatCurrency(seTax, "US")}` },
      { label: "1099 — federal income tax", value: `−${formatCurrency(fedTax1099, "US")}` },
      { label: "1099 — take-home", value: formatCurrency(takeHome1099, "US"), emphasis: true },
      { label: "W-2 — salary", value: formatCurrency(employeeSalary, "US") },
      { label: "W-2 — FICA + federal income tax", value: `−${formatCurrency(ficaW2 + fedTaxW2, "US")}` },
      { label: "W-2 — take-home", value: formatCurrency(takeHomeW2, "US") },
      { label: "Difference", value: diffLabel },
    ],
    notes: [
      "1099 calculation: SE tax (15.3%) applies to 92.35% of net profit; half is deductible before income tax.",
      "W-2 calculation: employee FICA (7.65%) + federal income tax on salary using standard deduction.",
      "State taxes, health insurance, and retirement plan contributions are not included — all materially affect the real comparison.",
    ],
    valid: true,
  };
}

export function calcContractorComparison(input: ContractorComparisonInput): CalcResult {
  const contractorGross = safeNumber(input.contractorGross);
  const employeeSalary = safeNumber(input.employeeSalary);
  const expenses = safeNumber(input.expenses);

  if (contractorGross <= 0 || employeeSalary <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter both contractor income and equivalent salary",
      breakdown: [],
      notes: [],
      valid: false,
    };
  }

  if (input.country === "UK") return calcUKComparison(contractorGross, employeeSalary, expenses);
  if (input.country === "US") return calcUSComparison(contractorGross, employeeSalary, expenses);

  return {
    headline: "—",
    headlineCaption: "UK and US are currently supported",
    breakdown: [],
    notes: [],
    valid: false,
  };
}
