"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcPtoPayout, PTO_SOURCE, STATE_PTO } from "@/lib/calculators/ptoPayout";

export function PtoPayoutCalculator() {
  const [stateCode, setStateCode] = useState<string>("CA");
  const [hours, setHours] = useState<number | "">(80);
  const [rate, setRate] = useState<number | "">(30);

  const result = useMemo(
    () =>
      calcPtoPayout({
        stateCode,
        unusedHours: Number(hours) || 0,
        hourlyRate: Number(rate) || 0,
      }),
    [stateCode, hours, rate],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="PTO payout inputs">
        <SelectField
          id="state"
          label="Your state"
          value={stateCode}
          onChange={setStateCode}
          options={STATE_PTO.map((s) => ({ value: s.code, label: s.name }))}
          hint="Each state sets its own payout rules"
        />
        <FieldGrid>
          <NumberField
            id="pto-hours"
            label="Unused PTO hours"
            value={hours}
            onChange={setHours}
            min={0}
          />
          <NumberField
            id="pto-rate"
            label="Hourly rate"
            value={rate}
            onChange={setRate}
            prefix="$"
            step={0.5}
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "PTO Payout — Estimate",
          intro:
            "This document estimates the gross value of your accrued, unused PTO at separation, with your state's payout rule noted.",
          source: PTO_SOURCE.label,
        }}
      />
    </div>
  );
}
