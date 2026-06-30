"use client";

import { useMemo, useState } from "react";
import { NumberField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { ADOPTION_SOURCE, calcAdoptionPay } from "@/lib/calculators/adoptionPay";
import { UK_SAP } from "@/lib/rates";

export function AdoptionPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState<number | "">(600);

  const result = useMemo(
    () => calcAdoptionPay({ averageWeeklyEarnings: Number(averageWeeklyEarnings) || 0 }),
    [averageWeeklyEarnings],
  );

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Adoption pay inputs">
        <NumberField
          id="average-weekly-earnings"
          label="Average gross weekly earnings"
          value={averageWeeklyEarnings}
          onChange={setAverageWeeklyEarnings}
          prefix="£"
          step={10}
          hint="Usually based on gross average weekly earnings in the relevant period"
        />
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Statutory Adoption Pay — Estimate",
          intro:
            "This document estimates your Statutory Adoption Pay over the 39-week period, based on your average weekly earnings and current UK statutory rates.",
          source: ADOPTION_SOURCE.label,
          sourceUrl: ADOPTION_SOURCE.url,
          effectiveDate: UK_SAP.effectiveDate,
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
