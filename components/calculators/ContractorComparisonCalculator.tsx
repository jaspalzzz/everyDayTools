"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcContractorComparison, contractorComparisonSource } from "@/lib/calculators/ir35";
import { UK_INCOME_TAX, US_INCOME_TAX } from "@/lib/rates";
import type { CountryCode } from "@/lib/types";

const COUNTRY_OPTIONS = [
  { value: "UK", label: "United Kingdom — IR35" },
  { value: "US", label: "United States — 1099 vs W-2" },
];

export function ContractorComparisonCalculator() {
  const [country, setCountry] = useState<CountryCode>("UK");
  const [contractorGross, setContractorGross] = useState<number | "">(80_000);
  const [employeeSalary, setEmployeeSalary] = useState<number | "">(60_000);
  const [expenses, setExpenses] = useState<number | "">(5_000);

  const result = useMemo(
    () =>
      calcContractorComparison({
        country,
        contractorGross: Number(contractorGross) || 0,
        employeeSalary: Number(employeeSalary) || 0,
        expenses: Number(expenses) || 0,
      }),
    [country, contractorGross, employeeSalary, expenses],
  );

  const prefix = country === "UK" ? "£" : "$";
  const contractorLabel = country === "UK" ? "Contractor gross (outside IR35)" : "1099 gross income";
  const employeeLabel = country === "UK" ? "Equivalent employee salary (inside IR35)" : "Equivalent W-2 salary";
  const expensesLabel = country === "UK" ? "Allowable business expenses" : "Business deductions (Schedule C)";
  const source = contractorComparisonSource(country);
  const effectiveDate =
    country === "UK" ? UK_INCOME_TAX.effectiveDate : US_INCOME_TAX.effectiveDate;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Contractor comparison inputs">
        <SelectField
          id="cc-country"
          label="Country / comparison type"
          value={country}
          onChange={(v) => setCountry(v as CountryCode)}
          options={COUNTRY_OPTIONS}
        />
        <FieldGrid>
          <NumberField
            id="contractor-gross"
            label={contractorLabel}
            value={contractorGross}
            onChange={setContractorGross}
            prefix={prefix}
            min={0}
            step={1000}
            hint={country === "UK" ? "Day rate × billable days" : "Total 1099 / freelance income"}
          />
          <NumberField
            id="employee-salary"
            label={employeeLabel}
            value={employeeSalary}
            onChange={setEmployeeSalary}
            prefix={prefix}
            min={0}
            step={1000}
            hint={country === "UK" ? "Deemed salary if caught by IR35" : "Comparable W-2 job offer"}
          />
        </FieldGrid>
        <NumberField
          id="expenses"
          label={expensesLabel}
          value={expenses}
          onChange={setExpenses}
          prefix={prefix}
          min={0}
          step={500}
          hint="Equipment, software, professional fees, travel"
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: country === "UK" ? "IR35 Take-Home Comparison" : "1099 vs W-2 Take-Home Comparison",
          intro:
            "This document compares estimated take-home pay as a contractor versus an equivalent employee based on your inputs.",
          source: source.label,
          sourceUrl: source.url,
          effectiveDate,
          inputs: [
            { label: "Country / comparison", value: country === "UK" ? "United Kingdom — IR35" : "United States — 1099 vs W-2" },
            { label: contractorLabel, value: `${prefix}${(Number(contractorGross) || 0).toLocaleString()}` },
            { label: employeeLabel, value: `${prefix}${(Number(employeeSalary) || 0).toLocaleString()}` },
            { label: expensesLabel, value: `${prefix}${(Number(expenses) || 0).toLocaleString()}` },
          ],
        }}
      />
    </div>
  );
}
