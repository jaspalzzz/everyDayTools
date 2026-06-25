"use client";

import { useMemo, useState } from "react";
import { NumberField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { MATERNITY_SOURCE, calcMaternityPay } from "@/lib/calculators/maternityPay";

export function MaternityPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState<number | "">(600);

  const result = useMemo(
    () => calcMaternityPay({ averageWeeklyEarnings: Number(averageWeeklyEarnings) || 0 }),
    [averageWeeklyEarnings],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Maternity pay inputs">
        <NumberField
          id="average-weekly-earnings"
          label="Average gross weekly earnings"
          value={averageWeeklyEarnings}
          onChange={setAverageWeeklyEarnings}
          prefix="£"
          step={10}
          hint="Your average pay over the 8 weeks before the qualifying week"
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Statutory Maternity Pay — Estimate",
          intro:
            "This document estimates your Statutory Maternity Pay over the 39-week period, based on your average weekly earnings and the current UK statutory rates.",
          source: MATERNITY_SOURCE.label,
        }}
      />
    </div>
  );
}
