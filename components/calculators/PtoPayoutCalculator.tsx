"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField, FormPanel } from "../fields";
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
  const state = STATE_PTO.find((s) => s.code === stateCode);

  const ruleBanner = state ? (
    <div
      className={`rounded-lg border px-4 py-3 text-xs leading-relaxed ${
        state.rule === "required"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : state.rule === "conditional"
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : "border-surface-line bg-surface-muted text-ink-faint"
      }`}
    >
      <strong className="font-semibold">
        {state.rule === "required" && `${state.name}: PTO payout required by law`}
        {state.rule === "conditional" && `${state.name}: PTO payout depends on your employer's policy`}
        {state.rule === "no-requirement" && `${state.name}: No law requires PTO payout`}
      </strong>
      <span className="ml-1">{state.note}</span>
    </div>
  ) : null;

  return (
    <div className="flex flex-col gap-4">
      {ruleBanner}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="PTO payout inputs">
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
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "PTO Payout — Estimate",
          intro:
            "This document estimates the gross value of your accrued, unused PTO at separation, with your state's payout rule noted.",
          source: PTO_SOURCE.label,
          sourceUrl: PTO_SOURCE.url,
          inputs: [
            { label: "State", value: state?.name ?? stateCode },
            { label: "Unused PTO hours", value: String(Number(hours) || 0) },
            { label: "Hourly rate", value: `$${(Number(rate) || 0).toLocaleString()}` },
          ],
        }}
      />
      </div>
    </div>
    </div>
  );
}
