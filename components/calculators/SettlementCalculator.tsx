"use client";

import { useMemo, useState } from "react";
import { NumberField, SelectField, FieldGrid } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcSettlement, SETTLEMENT_SOURCE, type SettlementReason } from "@/lib/calculators/settlementAgreement";
import { UK_SETTLEMENT } from "@/lib/rates";

const REASON_OPTIONS: { value: SettlementReason; label: string }[] = [
  { value: "redundancy",       label: "Redundancy" },
  { value: "unfair-dismissal", label: "Unfair dismissal" },
  { value: "discrimination",   label: "Discrimination / protected characteristic" },
  { value: "without-reason",   label: "Leaving without a clear claim" },
];

export function SettlementCalculator() {
  const [salary, setSalary]   = useState<number | "">(40000);
  const [years, setYears]     = useState<number | "">(4);
  const [age, setAge]         = useState<number | "">(35);
  const [reason, setReason]   = useState<SettlementReason>("unfair-dismissal");

  const result = useMemo(
    () =>
      calcSettlement({
        annualSalary:    Number(salary) || 0,
        yearsOfService:  Number(years)  || 0,
        age:             Number(age)    || 0,
        reason,
      }),
    [salary, years, age, reason],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
        <form className="flex flex-col gap-4" aria-label="Settlement agreement inputs">
          <NumberField
            id="salary"
            label="Gross annual salary"
            value={salary}
            onChange={setSalary}
            prefix="£"
            hint="Your current gross salary before tax"
          />
          <FieldGrid>
            <NumberField
              id="years"
              label="Years of service"
              value={years}
              onChange={setYears}
              min={0}
              max={50}
              hint="Complete years with this employer"
            />
            <NumberField
              id="age"
              label="Your age"
              value={age}
              onChange={setAge}
              min={16}
              max={100}
            />
          </FieldGrid>
          <SelectField
            id="reason"
            label="Reason for leaving"
            value={reason}
            onChange={(v) => setReason(v as SettlementReason)}
            options={REASON_OPTIONS}
            hint="Affects the ex gratia / compensatory element of the estimate"
          />
        </form>

        <ResultPanel
          result={result}
          letterMeta={{
            title: "Settlement Agreement — Value Estimate",
            intro:
              "This document estimates the likely value of a settlement agreement based on your employment details and the reason for leaving. It covers statutory entitlements, notice pay, ex gratia payments, and the tax position.",
            source: SETTLEMENT_SOURCE.label,
            sourceUrl: SETTLEMENT_SOURCE.url,
            effectiveDate: UK_SETTLEMENT.effectiveDate,
            inputs: [
              { label: "Annual salary",     value: `£${(Number(salary) || 0).toLocaleString()}` },
              { label: "Years of service",  value: String(Number(years) || 0) },
              { label: "Age",               value: String(Number(age) || 0) },
              { label: "Reason",            value: REASON_OPTIONS.find((o) => o.value === reason)?.label ?? reason },
            ],
          }}
        />
      </div>

      {/* Range context */}
      {result.valid && (
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="mb-1 text-xs font-semibold text-brand-700">What the range means</p>
          <p className="text-xs leading-relaxed text-brand-600">
            <strong>Low end</strong> — a quick settlement covering statutory rights only, with minimal ex gratia. Employers offer this when they believe their position is strong.
            <br />
            <strong>Typical</strong> — a reasonable commercial settlement reflecting the cost and risk of Tribunal proceedings. Most settlements land in this range.
            <br />
            <strong>High end</strong> — a settlement reflecting a strong claim, good evidence, or an employer keen to avoid publicity. Discrimination claims can exceed this estimate.
          </p>
        </div>
      )}
    </div>
  );
}
