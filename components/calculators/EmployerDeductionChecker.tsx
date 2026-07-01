"use client";

import { useMemo, useState } from "react";
import { FormPanel, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import type { CalcResult } from "@/lib/types";

type DeductionType = "tax" | "garnishment" | "written-consent" | "equipment" | "uniform" | "cash-shortage" | "damage" | "other";

const OPTIONS: Array<{ value: DeductionType; label: string }> = [
  { value: "tax", label: "Taxes or payroll withholding" },
  { value: "garnishment", label: "Court order / garnishment" },
  { value: "written-consent", label: "Written authorization or signed repayment agreement" },
  { value: "equipment", label: "Unreturned laptop, phone, keys, or tools" },
  { value: "uniform", label: "Uniform or required work clothing" },
  { value: "cash-shortage", label: "Cash drawer shortage or customer walkout" },
  { value: "damage", label: "Property damage or alleged loss" },
  { value: "other", label: "Something else" },
];

export function EmployerDeductionChecker() {
  const [deductionType, setDeductionType] = useState<DeductionType>("equipment");
  const [stateRule, setStateRule] = useState("unknown");
  const [belowMinimum, setBelowMinimum] = useState("unknown");

  const result = useMemo<CalcResult>(() => {
    const allowed = deductionType === "tax" || deductionType === "garnishment" || deductionType === "written-consent";
    const risky = !allowed || belowMinimum === "yes" || stateRule === "prohibited";
    const headline = risky ? "High risk deduction" : "Usually allowed";
    const notes = [
      allowed
        ? "Deductions required by law or clearly authorized in writing are usually allowed."
        : "Employers generally cannot self-help by withholding final wages for equipment, shortages, property, or disputes unless state law and a valid authorization allow it.",
      belowMinimum === "yes"
        ? "A deduction that pushes pay below minimum wage or overtime due is especially risky under wage and hour law."
        : "Check whether the deduction affects minimum wage, overtime, or a state final-pay rule.",
      "Keep written proof of the deduction, your authorization status, and your final wage calculation before filing a wage claim.",
    ];

    return {
      headline,
      headlineCaption: risky ? "Review this before accepting the deduction" : "Still verify the written authorization and state rule",
      breakdown: [
        { label: "Deduction type", value: OPTIONS.find((o) => o.value === deductionType)?.label ?? deductionType },
        { label: "State law/policy", value: stateRule === "prohibited" ? "May prohibit or restrict" : stateRule === "allowed" ? "Appears allowed" : "Unknown" },
        { label: "Minimum wage impact", value: belowMinimum === "yes" ? "May reduce protected wages" : belowMinimum === "no" ? "No known impact" : "Unknown" },
      ],
      notes,
      valid: true,
    };
  }, [belowMinimum, deductionType, stateRule]);

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Employer deduction checker">
        <SelectField
          id="deduction-type"
          label="What did the employer deduct or withhold?"
          value={deductionType}
          onChange={(v) => setDeductionType(v as DeductionType)}
          options={OPTIONS}
        />
        <SelectField
          id="state-deduction-rule"
          label="What does your state or policy say?"
          value={stateRule}
          onChange={setStateRule}
          options={[
            { value: "unknown", label: "I am not sure" },
            { value: "allowed", label: "It clearly allows this deduction" },
            { value: "prohibited", label: "It prohibits or restricts this deduction" },
          ]}
        />
        <SelectField
          id="below-minimum"
          label="Would the deduction reduce pay below minimum wage or overtime owed?"
          value={belowMinimum}
          onChange={setBelowMinimum}
          options={[
            { value: "unknown", label: "I am not sure" },
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
        <ResultPanel
          result={result}
          letterMeta={{
            title: "Final Paycheck Deduction Check",
            intro: "This document flags whether an employer deduction from final wages may need review before accepting it.",
            source: "U.S. Department of Labor and state wage claim agencies",
            sourceUrl: "https://www.dol.gov/agencies/whd/state/contacts",
            inputs: [
              { label: "Deduction type", value: OPTIONS.find((o) => o.value === deductionType)?.label ?? deductionType },
              { label: "State rule/policy", value: stateRule },
              { label: "Minimum wage impact", value: belowMinimum },
            ],
          }}
        />
      </div>
    </div>
  );
}
