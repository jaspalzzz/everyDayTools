"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcAuNoticePeriod, AU_NOTICE_SOURCE } from "@/lib/calculators/auNoticePeriod";

export function AuNoticePeriodCalculator() {
  const [years, setYears] = useState<number | "">(3);
  const [age, setAge] = useState<number | "">(35);
  const [weeklyPay, setWeeklyPay] = useState<number | "">(1200);

  const result = useMemo(
    () =>
      calcAuNoticePeriod({
        completedYears: Number(years) || 0,
        age: Number(age) || 0,
        weeklyPay: Number(weeklyPay) || 0,
      }),
    [years, age, weeklyPay],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="AU notice period inputs">
        <FieldGrid>
          <NumberField
            id="au-notice-years"
            label="Years of continuous service"
            value={years}
            onChange={setYears}
            min={0}
            max={50}
            hint="Complete years with the same employer"
          />
          <NumberField
            id="au-notice-age"
            label="Your age"
            value={age}
            onChange={setAge}
            min={15}
            max={80}
            hint="Over-45s with 2+ years get an extra week"
          />
          <NumberField
            id="au-notice-pay"
            label="Weekly base rate of pay"
            value={weeklyPay}
            onChange={setWeeklyPay}
            prefix="A$"
            hint="Used to calculate pay in lieu of notice (PILON)"
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Notice Period Entitlement — Australia",
          intro:
            "This document estimates your minimum notice entitlement under the Fair Work Act 2009 (Cth) s.117. Your modern award, enterprise agreement, or employment contract may provide a longer notice period.",
          source: AU_NOTICE_SOURCE.label,
          sourceUrl: AU_NOTICE_SOURCE.url,
          effectiveDate: "Fair Work Act 2009 (Cth) s.117",
          inputs: [
            { label: "Years of continuous service", value: String(Number(years) || 0) },
            { label: "Age", value: String(Number(age) || 0) },
            { label: "Weekly base pay", value: `A$${(Number(weeklyPay) || 0).toLocaleString("en-AU")}` },
          ],
        }}
      />
    </div>
  );
}
