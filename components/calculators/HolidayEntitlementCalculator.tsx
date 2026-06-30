"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { HOLIDAY_SOURCE, calcHolidayAccrual } from "@/lib/calculators/holidayAccrual";
import { UK_HOLIDAY } from "@/lib/rates";

export function HolidayEntitlementCalculator() {
  const [daysPerWeek, setDaysPerWeek] = useState<number | "">(5);
  const [monthsWorked, setMonthsWorked] = useState<number | "">(12);

  const result = useMemo(
    () =>
      calcHolidayAccrual({
        daysPerWeek: Number(daysPerWeek) || 0,
        monthsWorked: Number(monthsWorked) || 0,
      }),
    [daysPerWeek, monthsWorked],
  );

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Holiday entitlement inputs">
        <FieldGrid>
          <NumberField
            id="days-per-week"
            label="Days worked per week"
            value={daysPerWeek}
            onChange={setDaysPerWeek}
            min={1}
            max={7}
          />
          <NumberField
            id="months-worked"
            label="Months into leave year"
            value={monthsWorked}
            onChange={setMonthsWorked}
            min={0}
            max={12}
            hint="12 for a full year"
          />
        </FieldGrid>
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Holiday Entitlement — Summary",
          intro:
            "This document summarises your statutory annual leave entitlement under the UK Working Time Regulations, including the amount accrued so far this leave year.",
          source: HOLIDAY_SOURCE.label,
          sourceUrl: HOLIDAY_SOURCE.url,
          effectiveDate: UK_HOLIDAY.effectiveDate,
          inputs: [
            { label: "Days worked per week", value: String(Number(daysPerWeek) || 0) },
            { label: "Months into leave year", value: String(Number(monthsWorked) || 0) },
          ],
        }}
      />
      </div>
    </div>
  );
}
