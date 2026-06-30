"use client";

import { useMemo, useState } from "react";
import { NumberField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { MATERNITY_SOURCE, calcMaternityPay } from "@/lib/calculators/maternityPay";
import { UK_SMP } from "@/lib/rates";

export function MaternityPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState<number | "">(600);

  const result = useMemo(
    () => calcMaternityPay({ averageWeeklyEarnings: Number(averageWeeklyEarnings) || 0 }),
    [averageWeeklyEarnings],
  );

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Maternity pay inputs">
        <NumberField
          id="average-weekly-earnings"
          label="Average gross weekly earnings"
          value={averageWeeklyEarnings}
          onChange={setAverageWeeklyEarnings}
          prefix="£"
          step={10}
          hint="Your average pay over the 8 weeks before the qualifying week"
        />
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Statutory Maternity Pay — Estimate",
          intro:
            "This document estimates your Statutory Maternity Pay over the 39-week period, based on your average weekly earnings and the current UK statutory rates.",
          source: MATERNITY_SOURCE.label,
          sourceUrl: MATERNITY_SOURCE.url,
          effectiveDate: UK_SMP.effectiveDate,
          inputs: [
            {
              label: "Average gross weekly earnings",
              value: `£${(Number(averageWeeklyEarnings) || 0).toLocaleString()}`,
            },
          ],
        }}
      />
      </div>
    </div>
  );
}
