"use client";

import { useMemo, useState } from "react";
import { NumberField } from "../fields";
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Adoption pay inputs">
        <NumberField
          id="average-weekly-earnings"
          label="Average gross weekly earnings"
          value={averageWeeklyEarnings}
          onChange={setAverageWeeklyEarnings}
          prefix="£"
          step={10}
          hint="Usually based on gross average weekly earnings in the relevant period"
        />
      </form>

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
  );
}
