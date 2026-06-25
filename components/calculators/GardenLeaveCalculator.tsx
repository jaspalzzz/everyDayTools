"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { GARDEN_LEAVE_SOURCE, calcGardenLeave } from "@/lib/calculators/gardenLeave";
import { COUNTRIES, type CountryCode } from "@/lib/types";

export function GardenLeaveCalculator() {
  const [country, setCountry] = useState<CountryCode>("UK");
  const [weeklyPay, setWeeklyPay] = useState<number | "">(1000);
  const [weeks, setWeeks] = useState<number | "">(8);

  const result = useMemo(
    () =>
      calcGardenLeave({
        country,
        weeklyPay: Number(weeklyPay) || 0,
        weeks: Number(weeks) || 0,
      }),
    [country, weeklyPay, weeks],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Garden leave inputs">
        <SelectField
          id="country"
          label="Country"
          value={country}
          onChange={(v) => setCountry(v as CountryCode)}
          options={Object.values(COUNTRIES).map((c) => ({ value: c.code, label: c.label }))}
        />
        <FieldGrid>
          <NumberField
            id="weekly-pay"
            label="Weekly pay (gross)"
            value={weeklyPay}
            onChange={setWeeklyPay}
            step={50}
          />
          <NumberField
            id="garden-leave-weeks"
            label="Duration"
            value={weeks}
            onChange={setWeeks}
            suffix="weeks"
            max={104}
            hint="Length of garden leave in weeks"
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Garden Leave Pay — Summary",
          intro:
            "This document summarises the total pay you receive during a period of garden leave, based on your weekly pay and notice length.",
          source: GARDEN_LEAVE_SOURCE.label,
        }}
      />
    </div>
  );
}
