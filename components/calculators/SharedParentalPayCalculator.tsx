"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import {
  SHARED_PARENTAL_SOURCE,
  calcSharedParentalPay,
} from "@/lib/calculators/sharedParentalPay";
import { UK_SHPP } from "@/lib/rates";

export function SharedParentalPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState<number | "">(600);
  const [shppWeeks, setShppWeeks] = useState<number | "">(20);

  const result = useMemo(
    () =>
      calcSharedParentalPay({
        averageWeeklyEarnings: Number(averageWeeklyEarnings) || 0,
        shppWeeks: Number(shppWeeks) || 0,
      }),
    [averageWeeklyEarnings, shppWeeks],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Shared parental pay inputs">
        <FieldGrid>
          <NumberField
            id="average-weekly-earnings"
            label="Average gross weekly earnings"
            value={averageWeeklyEarnings}
            onChange={setAverageWeeklyEarnings}
            prefix="£"
            step={10}
          />
          <NumberField
            id="shpp-weeks"
            label="Payable ShPP weeks"
            value={shppWeeks}
            onChange={setShppWeeks}
            min={1}
            max={UK_SHPP.maxWeeks}
            hint={`Maximum ${UK_SHPP.maxWeeks} payable weeks`}
          />
        </FieldGrid>
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Statutory Shared Parental Pay — Estimate",
          intro:
            "This document estimates your Statutory Shared Parental Pay based on your average weekly earnings and payable weeks.",
          source: SHARED_PARENTAL_SOURCE.label,
          sourceUrl: SHARED_PARENTAL_SOURCE.url,
          effectiveDate: UK_SHPP.effectiveDate,
          inputs: [
            {
              label: "Average gross weekly earnings",
              value: `£${(Number(averageWeeklyEarnings) || 0).toLocaleString()}`,
            },
            { label: "Payable ShPP weeks", value: String(Number(shppWeeks) || 0) },
          ],
        }}
      />
      </div>
    </div>
  );
}
