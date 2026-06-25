"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcOvertime, OVERTIME_SOURCE, type OvertimeCountry } from "@/lib/calculators/overtime";

const CURRENCY_PREFIX: Record<OvertimeCountry, string> = {
  US: "$",
  UK: "£",
  CA: "$",
  AU: "$",
};

export function OvertimeCalculator() {
  const [country, setCountry] = useState<OvertimeCountry>("US");
  const [rate, setRate] = useState<number | "">(25);
  const [regular, setRegular] = useState<number | "">(40);
  const [ot, setOt] = useState<number | "">(8);
  const [multiplier, setMultiplier] = useState<number | "">(1.5);

  const result = useMemo(
    () =>
      calcOvertime({
        country,
        hourlyRate: Number(rate) || 0,
        regularHours: Number(regular) || 0,
        overtimeHours: Number(ot) || 0,
        multiplier: Number(multiplier) || 1.5,
      }),
    [country, rate, regular, ot, multiplier],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Overtime pay inputs">
        <SelectField
          id="ot-country"
          label="Country"
          value={country}
          onChange={(v) => setCountry(v as OvertimeCountry)}
          options={[
            { value: "US", label: "United States" },
            { value: "UK", label: "United Kingdom" },
            { value: "CA", label: "Canada" },
            { value: "AU", label: "Australia" },
          ]}
        />
        <FieldGrid>
          <NumberField
            id="ot-rate"
            label="Hourly rate"
            value={rate}
            onChange={setRate}
            prefix={CURRENCY_PREFIX[country]}
            step={0.5}
          />
          <NumberField
            id="ot-multiplier"
            label="Overtime multiplier"
            value={multiplier}
            onChange={setMultiplier}
            min={1}
            max={3}
            step={0.1}
            suffix="×"
          />
          <NumberField
            id="ot-regular"
            label="Regular hours"
            value={regular}
            onChange={setRegular}
            min={0}
            max={168}
          />
          <NumberField
            id="ot-overtime"
            label="Overtime hours"
            value={ot}
            onChange={setOt}
            min={0}
            max={168}
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Overtime Pay — Estimate",
          intro:
            "This document breaks down your gross weekly pay, separating regular pay from overtime at your stated multiplier.",
          source: OVERTIME_SOURCE.label,
        }}
      />
    </div>
  );
}
