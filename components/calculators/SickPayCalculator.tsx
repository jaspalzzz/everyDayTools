"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { SSP_SOURCE, calcSickPay } from "@/lib/calculators/sickPay";
import { UK_SSP } from "@/lib/rates";

export function SickPayCalculator() {
  const [qualifyingDaysPerWeek, setQualifyingDaysPerWeek] = useState<number | "">(5);
  const [daysOffSick, setDaysOffSick] = useState<number | "">(10);
  const [weeklyEarnings, setWeeklyEarnings] = useState<number | "">(200);

  const result = useMemo(
    () =>
      calcSickPay({
        qualifyingDaysPerWeek: Number(qualifyingDaysPerWeek) || 0,
        daysOffSick: Number(daysOffSick) || 0,
        averageWeeklyEarnings: weeklyEarnings === "" ? undefined : Number(weeklyEarnings),
      }),
    [qualifyingDaysPerWeek, daysOffSick, weeklyEarnings],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Statutory sick pay inputs">
        <FieldGrid>
          <NumberField
            id="qualifying-days"
            label="Working days per week"
            value={qualifyingDaysPerWeek}
            onChange={setQualifyingDaysPerWeek}
            min={1}
            max={7}
          />
          <NumberField
            id="days-off-sick"
            label="Working days off sick"
            value={daysOffSick}
            onChange={setDaysOffSick}
            min={0}
            hint="Total working days you have been off"
          />
        </FieldGrid>
        <NumberField
          id="weekly-earnings"
          label="Average weekly earnings (gross)"
          value={weeklyEarnings}
          onChange={setWeeklyEarnings}
          prefix="£"
          step={10}
          hint="Required — confirms eligibility (LEL £129/wk) and applies the 80% earnings cap"
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Statutory Sick Pay — Estimate",
          intro:
            "This document estimates your Statutory Sick Pay, accounting for the 3 unpaid waiting days and the current UK weekly rate.",
          source: SSP_SOURCE.label,
          sourceUrl: SSP_SOURCE.url,
          effectiveDate: UK_SSP.effectiveDate,
          inputs: [
            { label: "Working days per week", value: String(Number(qualifyingDaysPerWeek) || 0) },
            { label: "Working days off sick", value: String(Number(daysOffSick) || 0) },
            {
              label: "Average weekly earnings",
              value: `£${(Number(weeklyEarnings) || 0).toLocaleString()}`,
            },
          ],
        }}
      />
    </div>
  );
}
