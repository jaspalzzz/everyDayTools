"use client";

import { useMemo, useState } from "react";
import { DateField, FieldGrid, FormPanel, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { FINAL_PAY_SOURCE, STATE_FINAL_PAY, type SeparationType } from "@/lib/calculators/finalPaycheck";
import type { CalcResult } from "@/lib/types";

function addDays(value: string, days: number) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function nextBusinessDay(value: string) {
  let date = new Date(`${value}T00:00:00`);
  do {
    date.setDate(date.getDate() + 1);
  } while (date.getDay() === 0 || date.getDay() === 6);
  return date.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const start = new Date(`${a}T00:00:00`).getTime();
  const end = new Date(`${b}T00:00:00`).getTime();
  return Math.max(0, Math.ceil((end - start) / 86_400_000));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${value}T00:00:00Z`),
  );
}

function calculateDueDate(params: {
  stateCode: string;
  separationType: SeparationType;
  lastDay: string;
  nextPayday: string;
  gaveNotice: string;
}) {
  const { stateCode, separationType, lastDay, nextPayday, gaveNotice } = params;

  if (!lastDay) return { dueDate: "", note: "Enter your last day worked." };

  if (stateCode === "CA") {
    if (separationType === "fired") {
      return { dueDate: lastDay, note: "California generally requires immediate final pay when an employee is discharged." };
    }
    if (gaveNotice === "yes") {
      return { dueDate: lastDay, note: "California generally requires final pay on the last day when at least 72 hours of resignation notice was given." };
    }
    return { dueDate: addDays(lastDay, 3), note: "California generally requires final pay within 72 hours when no 72-hour resignation notice was given." };
  }

  if (stateCode === "TX") {
    if (separationType === "fired") {
      return { dueDate: addDays(lastDay, 6), note: "Texas generally requires final wages within 6 calendar days after discharge." };
    }
    return nextPayday
      ? { dueDate: nextPayday, note: "Texas generally requires final wages by the next regularly scheduled payday after resignation." }
      : { dueDate: "", note: "Enter the next regular payday for a Texas resignation." };
  }

  const state = STATE_FINAL_PAY.find((s) => s.code === stateCode);
  const phrase = separationType === "fired" ? state?.fired ?? "" : state?.quit ?? "";
  const days = phrase.match(/within (\d+) (calendar |business |working )?days?/i)?.[1];
  if (days) return { dueDate: addDays(lastDay, Number(days)), note: `${state?.name} rule shown by the deadline calculator: ${phrase}.` };
  if (/next business day/i.test(phrase)) return { dueDate: nextBusinessDay(lastDay), note: `${state?.name} rule shown by the deadline calculator: ${phrase}.` };
  const hours = phrase.match(/within (\d+) hours?/i)?.[1];
  if (hours) return { dueDate: addDays(lastDay, Math.ceil(Number(hours) / 24)), note: `${state?.name} rule shown by the deadline calculator: ${phrase}.` };
  if (/last day|immediately|on your last day/i.test(phrase)) return { dueDate: lastDay, note: `${state?.name} rule shown by the deadline calculator: ${phrase}.` };
  if (/next.*payday/i.test(phrase) || /regular payday/i.test(phrase)) {
    return nextPayday
      ? { dueDate: nextPayday, note: `${state?.name} rule shown by the deadline calculator: ${phrase}.` }
      : { dueDate: "", note: "Enter the next regular payday because this state uses the regular payroll schedule." };
  }

  return { dueDate: "", note: "This state has a rule that needs manual confirmation with the state labor office." };
}

export function FinalPaycheckLateChecker({ presetStateCode }: { presetStateCode?: string }) {
  const [stateCode, setStateCode] = useState(presetStateCode ?? "CA");
  const [separationType, setSeparationType] = useState<SeparationType>("fired");
  const [gaveNotice, setGaveNotice] = useState("no");
  const [lastDay, setLastDay] = useState("2026-07-01");
  const [nextPayday, setNextPayday] = useState("2026-07-10");
  const [paidDate, setPaidDate] = useState("2026-07-08");

  const state = STATE_FINAL_PAY.find((s) => s.code === stateCode);

  const result = useMemo<CalcResult>(() => {
    const due = calculateDueDate({ stateCode, separationType, lastDay, nextPayday, gaveNotice });
    if (!due.dueDate || !paidDate) {
      return {
        headline: "-",
        headlineCaption: "Enter the missing dates to check lateness",
        breakdown: [],
        notes: [due.note],
        valid: false,
      };
    }

    const lateDays = daysBetween(due.dueDate, paidDate);
    const isLate = lateDays > 0;
    return {
      headline: isLate ? `${lateDays} day${lateDays === 1 ? "" : "s"} late` : "On time",
      headlineCaption: isLate ? "Your final paycheck appears to be late" : "Your final paycheck appears to meet the deadline",
      breakdown: [
        { label: "State", value: state?.name ?? stateCode },
        { label: "How employment ended", value: separationType === "fired" ? "Terminated / laid off" : "Resigned / quit" },
        { label: "Legal due date", value: formatDate(due.dueDate), emphasis: true },
        { label: "Payment date", value: formatDate(paidDate) },
      ],
      notes: [
        due.note,
        "This checker estimates calendar-day lateness only; penalties depend on state law, employer intent, and wage-claim procedure.",
      ],
      valid: true,
    };
  }, [gaveNotice, lastDay, nextPayday, paidDate, separationType, state?.name, stateCode]);

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Late final paycheck checker">
        {!presetStateCode && (
          <SelectField
            id="late-state"
            label="State"
            value={stateCode}
            onChange={setStateCode}
            options={STATE_FINAL_PAY.map((s) => ({ value: s.code, label: s.name }))}
          />
        )}
        <SelectField
          id="late-separation"
          label="How did employment end?"
          value={separationType}
          onChange={(v) => setSeparationType(v as SeparationType)}
          options={[
            { value: "fired", label: "Terminated / laid off" },
            { value: "quit", label: "Resigned / quit" },
          ]}
        />
        {stateCode === "CA" && separationType === "quit" && (
          <SelectField
            id="late-notice"
            label="Did you give at least 72 hours notice?"
            value={gaveNotice}
            onChange={setGaveNotice}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
          />
        )}
        <FieldGrid>
          <DateField id="last-day" label="Last day worked" value={lastDay} onChange={setLastDay} />
          <DateField id="paid-date" label="Date final paycheck was paid" value={paidDate} onChange={setPaidDate} />
        </FieldGrid>
        <DateField
          id="next-payday"
          label="Next regular payday"
          value={nextPayday}
          onChange={setNextPayday}
          hint="Needed when the state rule uses the next scheduled payday."
        />
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
        <ResultPanel
          result={result}
          letterMeta={{
            title: "Final Paycheck Lateness Check",
            intro: "This document estimates whether a final paycheck was late based on state final-pay timing rules and the dates entered.",
            source: FINAL_PAY_SOURCE.label,
            sourceUrl: FINAL_PAY_SOURCE.url,
            inputs: [
              { label: "State", value: state?.name ?? stateCode },
              { label: "Last day worked", value: lastDay },
              { label: "Date paid", value: paidDate },
            ],
          }}
        />
      </div>
    </div>
  );
}
