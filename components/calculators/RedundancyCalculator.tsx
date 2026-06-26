"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcRedundancy, REDUNDANCY_SOURCE } from "@/lib/calculators/redundancy";
import { UK_REDUNDANCY } from "@/lib/rates";

export function RedundancyCalculator() {
  const [age, setAge] = useState<number | "">(40);
  const [years, setYears] = useState<number | "">(6);
  const [weeklyPay, setWeeklyPay] = useState<number | "">(500);

  const result = useMemo(
    () =>
      calcRedundancy({
        age: Number(age) || 0,
        yearsOfService: Number(years) || 0,
        weeklyPay: Number(weeklyPay) || 0,
      }),
    [age, years, weeklyPay],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Redundancy pay inputs">
        <FieldGrid>
          <NumberField id="age" label="Your age" value={age} onChange={setAge} min={16} max={100} />
          <NumberField
            id="years"
            label="Full years of service"
            value={years}
            onChange={setYears}
            min={0}
            max={50}
            hint="Complete years with this employer"
          />
        </FieldGrid>
        <NumberField
          id="weekly-pay"
          label="Gross weekly pay"
          value={weeklyPay}
          onChange={setWeeklyPay}
          prefix="£"
          hint="Before tax. Capped at £751 for the 2026/27 statutory calculation."
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Statutory Redundancy Pay — Estimate",
          intro:
            "This document estimates your statutory redundancy pay under the UK Employment Rights Act 1996, based on the details you entered.",
          source: REDUNDANCY_SOURCE.label,
          sourceUrl: REDUNDANCY_SOURCE.url,
          effectiveDate: UK_REDUNDANCY.effectiveDate,
          inputs: [
            { label: "Age", value: String(Number(age) || 0) },
            { label: "Full years of service", value: String(Number(years) || 0) },
            { label: "Gross weekly pay", value: `£${(Number(weeklyPay) || 0).toLocaleString()}` },
          ],
        }}
      />
    </div>
  );
}
