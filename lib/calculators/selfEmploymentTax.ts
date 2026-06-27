import { formatCurrency, safeNumber } from "../format";
import { UK_INCOME_TAX, UK_NI_SELF_EMPLOYED, US_INCOME_TAX, US_SE_TAX } from "../rates";
import type { CalcResult, CountryCode, SourceRef } from "../types";

export const SE_TAX_SOURCE_UK: SourceRef = UK_NI_SELF_EMPLOYED.source;
export const SE_TAX_SOURCE_US: SourceRef = US_SE_TAX.source;

export function seTaxSource(country: CountryCode): SourceRef {
  return country === "UK" ? SE_TAX_SOURCE_UK : SE_TAX_SOURCE_US;
}

export interface SelfEmploymentTaxInput {
  country: CountryCode;
  netProfit: number;
}

function calcUKSE(profit: number): CalcResult {
  const T = UK_INCOME_TAX;
  const N = UK_NI_SELF_EMPLOYED;

  // Class 2 NI: flat weekly rate if profit above SPT
  const class2Annual = profit >= N.class2SmallProfitsThreshold
    ? N.class2WeeklyRate * 52
    : 0;

  // Class 4 NI: 6% on profits between LPL and UPL, 2% above
  let class4 = 0;
  if (profit > N.class4LowerProfitsLimit) {
    const main = Math.min(profit, N.class4UpperProfitsLimit) - N.class4LowerProfitsLimit;
    class4 += main * N.class4MainRate;
  }
  if (profit > N.class4UpperProfitsLimit) {
    class4 += (profit - N.class4UpperProfitsLimit) * N.class4UpperRate;
  }

  // Income tax: profit minus personal allowance
  let pa: number = T.personalAllowance;
  if (profit > T.paReducesAbove) {
    pa = Math.max(0, pa - Math.floor((profit - T.paReducesAbove) / 2));
  }
  const taxable = Math.max(0, profit - pa);
  let incomeTax = 0;
  if (profit <= T.basicRateLimit) {
    incomeTax = taxable * T.basicRate;
  } else if (profit <= T.higherRateLimit) {
    const basic = Math.max(0, T.basicRateLimit - pa);
    incomeTax = basic * T.basicRate + Math.max(0, taxable - basic) * T.higherRate;
  } else {
    const basicBand = T.basicRateLimit - pa;
    const higherBand = Math.max(0, T.higherRateLimit - T.basicRateLimit);
    const addBand = Math.max(0, taxable - basicBand - higherBand);
    incomeTax = Math.max(0, basicBand) * T.basicRate + higherBand * T.higherRate + addBand * T.additionalRate;
  }

  const totalNI = class2Annual + class4;
  const totalTax = incomeTax + totalNI;
  const takeHome = profit - totalTax;
  const effectiveRate = profit > 0 ? (totalTax / profit) * 100 : 0;

  return {
    headline: formatCurrency(takeHome, "UK"),
    headlineCaption: "Estimated take-home after tax and NI",
    breakdown: [
      { label: "Net profit", value: formatCurrency(profit, "UK") },
      { label: "Income tax", value: `−${formatCurrency(incomeTax, "UK")}` },
      { label: "Class 2 NI", value: `−${formatCurrency(class2Annual, "UK")}` },
      { label: "Class 4 NI", value: `−${formatCurrency(class4, "UK")}` },
      { label: "Total tax & NI", value: `−${formatCurrency(totalTax, "UK")}` },
      { label: "Effective rate", value: `${effectiveRate.toFixed(1)}%` },
      { label: "Monthly take-home", value: formatCurrency(takeHome / 12, "UK") },
      { label: "Annual take-home", value: formatCurrency(takeHome, "UK"), emphasis: true },
    ],
    notes: [
      `Based on ${N.taxYear} rates. Class 2 NI: £${N.class2WeeklyRate}/week. Class 4 NI: ${N.class4MainRate * 100}% on profits £${N.class4LowerProfitsLimit.toLocaleString()}–£${N.class4UpperProfitsLimit.toLocaleString()}, ${N.class4UpperRate * 100}% above.`,
      "This is a simplified estimate using your net profit. Actual liability depends on allowable expenses, pension contributions, and your other income. Use HMRC Self Assessment for your final tax bill.",
      "Scottish taxpayers pay different income tax rates.",
    ],
    valid: true,
  };
}

function calcUSSE(profit: number): CalcResult {
  const T = US_INCOME_TAX;
  const S = US_SE_TAX;

  // SE tax on 92.35% of net profit (self-employed person's share)
  const seBase = profit * 0.9235;
  const ssTax = Math.min(seBase, S.ssWageBase) * S.ssRate;
  const medicareTax = seBase * S.medicareRate;
  const additionalMedicare = profit > S.additionalMedicareThreshold
    ? (profit - S.additionalMedicareThreshold) * S.additionalMedicareRate
    : 0;
  const seTax = ssTax + medicareTax + additionalMedicare;

  // Deduct half SE tax from income before applying income tax
  const halfSE = seTax * S.deductibleFraction;
  const agi = Math.max(0, profit - halfSE - T.standardDeductionSingle);

  let fedTax = 0;
  for (const band of T.brackets) {
    if (agi <= band.floor) break;
    fedTax += (Math.min(agi, band.ceiling) - band.floor) * band.rate;
  }

  const totalTax = fedTax + seTax;
  const takeHome = profit - totalTax;
  const effectiveRate = profit > 0 ? (totalTax / profit) * 100 : 0;

  const notes: string[] = [
    `SE tax (${S.seRate * 100}%) applies to 92.35% of net profit. Half is deductible before calculating income tax.`,
    `Federal income tax based on ${T.taxYear} brackets for a single filer using the standard deduction ($${T.standardDeductionSingle.toLocaleString()}).`,
    "State income tax and quarterly estimated payment obligations are not included. Consult a tax professional for your full liability.",
  ];
  if (profit > S.ssWageBase) {
    notes.push(`Social Security SE tax stops at the $${S.ssWageBase.toLocaleString()} wage base; Medicare applies to all net profit.`);
  }

  return {
    headline: formatCurrency(takeHome, "US"),
    headlineCaption: "Estimated take-home after SE tax and federal income tax",
    breakdown: [
      { label: "Net profit", value: formatCurrency(profit, "US") },
      { label: "SE tax (SS + Medicare)", value: `−${formatCurrency(seTax, "US")}` },
      { label: "½ SE tax deduction", value: `−${formatCurrency(halfSE, "US")}` },
      { label: "Federal income tax", value: `−${formatCurrency(fedTax, "US")}` },
      { label: "Total tax", value: `−${formatCurrency(totalTax, "US")}` },
      { label: "Effective rate", value: `${effectiveRate.toFixed(1)}%` },
      { label: "Monthly take-home", value: formatCurrency(takeHome / 12, "US") },
      { label: "Annual take-home", value: formatCurrency(takeHome, "US"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}

export function calcSelfEmploymentTax(input: SelfEmploymentTaxInput): CalcResult {
  const profit = safeNumber(input.netProfit);
  if (profit <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your net profit to see your estimate",
      breakdown: [],
      notes: [],
      valid: false,
    };
  }
  if (input.country === "UK") return calcUKSE(profit);
  if (input.country === "US") return calcUSSE(profit);
  return {
    headline: "—",
    headlineCaption: "UK and US are currently supported",
    breakdown: [],
    notes: ["Self-employment tax calculation is currently available for the UK and US."],
    valid: false,
  };
}
