"use client";

import { useMemo, useState } from "react";
import { DateField, FieldGrid, FormPanel, NumberField, SelectField } from "@/components/fields";
import { ResultPanel } from "@/components/ResultPanel";
import {
  PROBATION_END_SOURCE,
  calcProbationEndDate,
  type ProbationDurationUnit,
} from "@/lib/calculators/probationEndDate";

export function ProbationEndDateCalculator() {
  const [startDate, setStartDate] = useState("2026-07-13");
  const [duration, setDuration] = useState<number | "">(6);
  const [unit, setUnit] = useState<ProbationDurationUnit>("months");
  const result = useMemo(
    () => calcProbationEndDate({ startDate, duration: Number(duration) || 0, unit }),
    [startDate, duration, unit],
  );

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Probation period dates">
        <DateField
          id="probation-start-date"
          label="Employment / probation start date"
          value={startDate}
          onChange={setStartDate}
        />
        <FieldGrid>
          <NumberField
            id="probation-duration"
            label="Probation length"
            value={duration}
            onChange={setDuration}
            min={1}
            max={60}
          />
          <SelectField
            id="probation-duration-unit"
            label="Length measured in"
            value={unit}
            onChange={(value) => setUnit(value as ProbationDurationUnit)}
            options={[
              { value: "months", label: "Calendar months" },
              { value: "weeks", label: "Weeks" },
            ]}
          />
        </FieldGrid>
        <p className="text-xs leading-relaxed text-ink-soft">
          This gives the calendar anniversary and the day immediately before it. Check the exact
          wording in your contract because it may specify an inclusive date or extension process.
        </p>
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
        <ResultPanel
          result={result}
          letterMeta={{
            title: "Probation Period — Date Worksheet",
            intro:
              "This document records the probation date calculation from the contract start date and duration entered.",
            source: PROBATION_END_SOURCE.label,
            sourceUrl: PROBATION_END_SOURCE.url,
            inputs: [
              { label: "Start date", value: startDate },
              { label: "Probation length", value: `${Number(duration) || 0} ${unit}` },
            ],
          }}
        />
      </div>
    </div>
  );
}
