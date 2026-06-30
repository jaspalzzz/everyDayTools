"use client";

import { useEffect, useMemo, useState } from "react";
import { FieldGrid, FormPanel, NumberField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcRedundancy, REDUNDANCY_SOURCE } from "@/lib/calculators/redundancy";
import { UK_REDUNDANCY } from "@/lib/rates";
import { RedundancyEligibilityGate } from "./RedundancyEligibilityGate";
import { readUrlParamsOnMount, writeUrlParams } from "@/hooks/useUrlSync";
import { formatCurrency } from "@/lib/format";

export function RedundancyCalculator({ startEligible = false }: { startEligible?: boolean }) {
  const [eligible, setEligible] = useState(startEligible);
  const [age, setAge] = useState<number | "">(40);
  const [years, setYears] = useState<number | "">(6);
  const [weeklyPay, setWeeklyPay] = useState<number | "">(500);

  // Seed state from URL params on mount; skip gate if params are present
  useEffect(() => {
    readUrlParamsOnMount(
      { age: (v) => setAge(v), years: (v) => setYears(v), pay: (v) => setWeeklyPay(v) },
      (found) => { if (found) setEligible(true); },
    );
  }, []);

  // Write values to URL whenever they change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      writeUrlParams({
        age: Number(age) || 0,
        years: Number(years) || 0,
        pay: Number(weeklyPay) || 0,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [age, years, weeklyPay]);

  const result = useMemo(
    () =>
      calcRedundancy({
        age: Number(age) || 0,
        yearsOfService: Number(years) || 0,
        weeklyPay: Number(weeklyPay) || 0,
      }),
    [age, years, weeklyPay],
  );

  // Scenario comparison: what if I wait N more years?
  const scenarios = useMemo(() => {
    if (!result.valid) return null;
    const a = Number(age) || 0;
    const y = Number(years) || 0;
    const pay = Number(weeklyPay) || 0;
    return [1, 2, 5].map((extra) => {
      const r = calcRedundancy({ age: a + extra, yearsOfService: y + extra, weeklyPay: pay });
      return { label: `+${extra} year${extra > 1 ? "s" : ""}`, result: r };
    });
  }, [age, years, weeklyPay, result.valid]);

  return (
    <div className="flex flex-col gap-6">
      {!eligible && (
        <RedundancyEligibilityGate onEligible={() => setEligible(true)} />
      )}

      {eligible && (
        <>
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
            <FormPanel label="Redundancy pay inputs">
              <FieldGrid>
                <NumberField id="age" label="Your age" value={age} onChange={setAge} min={16} max={100} />
                <NumberField
                  id="years"
                  label="Full years of service"
                  value={years}
                  onChange={setYears}
                  min={0}
                  max={50}
                  hint="Complete years with this employer"
                />
              </FieldGrid>
              <NumberField
                id="weekly-pay"
                label="Gross weekly pay"
                value={weeklyPay}
                onChange={setWeeklyPay}
                prefix="£"
                hint="Before tax. Capped at £751 for the 2026/27 statutory calculation."
              />
            </FormPanel>

            <div style={{ position: "sticky", top: 88 }}>
            <ResultPanel
              result={result}
              letterMeta={{
                title: "Statutory Redundancy Pay — Estimate",
                intro:
                  "This document estimates your statutory redundancy pay under the UK Employment Rights Act 1996, based on the details you entered.",
                source: REDUNDANCY_SOURCE.label,
                sourceUrl: REDUNDANCY_SOURCE.url,
                effectiveDate: UK_REDUNDANCY.effectiveDate,
                inputs: [
                  { label: "Age", value: String(Number(age) || 0) },
                  { label: "Full years of service", value: String(Number(years) || 0) },
                  { label: "Gross weekly pay", value: `£${(Number(weeklyPay) || 0).toLocaleString()}` },
                ],
              }}
            />
            </div>
          </div>

          {/* Scenario comparison */}
          {scenarios && result.valid && (
            <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
              <p className="mb-3 text-xs font-semibold text-ink">
                What if you stayed longer?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {scenarios.map(({ label, result: r }) => {
                  const current = Number(result.headline.replace(/[^0-9.]/g, "")) || 0;
                  const future = Number(r.headline.replace(/[^0-9.]/g, "")) || 0;
                  const diff = future - current;
                  return (
                    <div
                      key={label}
                      className="flex flex-col items-center rounded-lg border border-surface-line bg-white px-3 py-3 text-center"
                    >
                      <span className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                        {label}
                      </span>
                      <span className="mt-1.5 text-base font-semibold tabular-nums text-ink">
                        {r.headline}
                      </span>
                      {diff > 0 && (
                        <span className="mt-0.5 text-[11px] text-emerald-600">
                          +{formatCurrency(diff, "UK")}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] text-ink-faint">
                Assumes same weekly pay and continuous service. Statutory cap of 20 counted years applies.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
