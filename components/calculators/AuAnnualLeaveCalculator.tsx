"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcAuAnnualLeave, AU_ANNUAL_LEAVE_SOURCE, type AuLeaveCalcMode } from "@/lib/calculators/auAnnualLeave";

export function AuAnnualLeaveCalculator() {
  const [mode, setMode] = useState<AuLeaveCalcMode>("accrued");
  const [hoursPerWeek, setHoursPerWeek] = useState<number | "">(38);
  const [hourlyRate, setHourlyRate] = useState<number | "">(30);
  const [weeksWorked, setWeeksWorked] = useState<number | "">(26);
  const [accruedHours, setAccruedHours] = useState<number | "">("");
  const [hasLeaveLoading, setHasLeaveLoading] = useState(false);
  const [isShiftWorker, setIsShiftWorker] = useState(false);

  const result = useMemo(
    () =>
      calcAuAnnualLeave({
        mode,
        hoursPerWeek: Number(hoursPerWeek) || 38,
        hourlyRate: Number(hourlyRate) || 0,
        weeksWorked: Number(weeksWorked) || 0,
        accruedHours: Number(accruedHours) || 0,
        hasLeaveLoading,
        isShiftWorker,
      }),
    [mode, hoursPerWeek, hourlyRate, weeksWorked, accruedHours, hasLeaveLoading, isShiftWorker],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="AU annual leave inputs">
        <SelectField
          id="au-leave-mode"
          label="What do you want to calculate?"
          value={mode}
          onChange={(v) => setMode(v as AuLeaveCalcMode)}
          options={[
            { value: "accrued", label: "Accrued leave balance" },
            { value: "payout", label: "Leave payout on termination" },
          ]}
        />

        <FieldGrid>
          <NumberField
            id="au-leave-rate"
            label="Hourly rate of pay"
            value={hourlyRate}
            onChange={setHourlyRate}
            prefix="A$"
            hint="Your base hourly rate, excluding overtime and loadings"
          />
          <NumberField
            id="au-leave-hours"
            label="Ordinary hours per week"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            min={1}
            max={38}
            hint="38 hours for full-time NES employees"
          />
        </FieldGrid>

        {mode === "accrued" ? (
          <NumberField
            id="au-leave-weeks-worked"
            label="Weeks worked"
            value={weeksWorked}
            onChange={setWeeksWorked}
            min={1}
            max={3120}
            hint="Total weeks of continuous service"
          />
        ) : (
          <NumberField
            id="au-leave-accrued"
            label="Accrued leave balance (hours)"
            value={accruedHours}
            onChange={setAccruedHours}
            min={0}
            hint="Total accrued but untaken annual leave hours"
          />
        )}

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={isShiftWorker}
              onChange={(e) => setIsShiftWorker(e.target.checked)}
              className="h-4 w-4 rounded accent-brand-600"
            />
            Shift worker (entitled to 5 weeks leave instead of 4)
          </label>
          <label className="flex items-center gap-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={hasLeaveLoading}
              onChange={(e) => setHasLeaveLoading(e.target.checked)}
              className="h-4 w-4 rounded accent-brand-600"
            />
            Annual leave loading applies (17.5% — check your award or contract)
          </label>
        </div>
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Annual Leave Calculation — Australia",
          intro:
            "This document calculates your annual leave entitlement or payout under the National Employment Standards (NES), Fair Work Act 2009 (Cth) s.87.",
          source: AU_ANNUAL_LEAVE_SOURCE.label,
          sourceUrl: AU_ANNUAL_LEAVE_SOURCE.url,
          effectiveDate: "Fair Work Act 2009 (Cth) s.87",
          inputs: [
            { label: "Calculation type", value: mode === "accrued" ? "Accrued balance" : "Termination payout" },
            { label: "Hours per week", value: String(Number(hoursPerWeek) || 38) },
            { label: "Hourly rate", value: `A$${(Number(hourlyRate) || 0).toFixed(2)}` },
            mode === "accrued"
              ? { label: "Weeks worked", value: String(Number(weeksWorked) || 0) }
              : { label: "Accrued hours", value: String(Number(accruedHours) || 0) },
          ],
        }}
      />
      </div>
    </div>
  );
}
