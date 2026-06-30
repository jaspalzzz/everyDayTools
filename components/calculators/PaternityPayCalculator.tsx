"use client";

import { useMemo, useState } from "react";
import { NumberField, SelectField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { PATERNITY_SOURCE, calcPaternityPay } from "@/lib/calculators/paternityPay";
import { UK_SPP } from "@/lib/rates";

export function PaternityPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState<number | "">(600);
  const [weeks, setWeeks] = useState<1 | 2>(2);

  const result = useMemo(
    () =>
      calcPaternityPay({
        averageWeeklyEarnings: Number(averageWeeklyEarnings) || 0,
        weeks,
      }),
    [averageWeeklyEarnings, weeks],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Paternity pay inputs">
        <NumberField
          id="average-weekly-earnings"
          label="Average gross weekly earnings"
          value={averageWeeklyEarnings}
          onChange={setAverageWeeklyEarnings}
          prefix="£"
          step={10}
          hint="Usually based on gross average weekly earnings in the relevant period"
        />
        <SelectField
          id="paternity-weeks"
          label="Paternity leave weeks"
          value={String(weeks)}
          onChange={(v) => setWeeks(v === "2" ? 2 : 1)}
          options={[
            { value: "1", label: "1 week" },
            { value: "2", label: "2 weeks" },
          ]}
        />
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Statutory Paternity Pay — Estimate",
          intro:
            "This document estimates your Statutory Paternity Pay based on your average weekly earnings and selected leave weeks.",
          source: PATERNITY_SOURCE.label,
          sourceUrl: PATERNITY_SOURCE.url,
          effectiveDate: UK_SPP.effectiveDate,
          inputs: [
            {
              label: "Average gross weekly earnings",
              value: `£${(Number(averageWeeklyEarnings) || 0).toLocaleString()}`,
            },
            { label: "Paternity leave weeks", value: `${weeks}` },
          ],
        }}
      />
      </div>
    </div>
  );
}
