"use client";

import { useState } from "react";
import { TablerIcon } from "../TablerIcon";

type Answer = "yes" | "no" | null;

interface Step {
  id: string;
  question: string;
  hint: string;
  yesLabel: string;
  noLabel: string;
}

const STEPS: Step[] = [
  {
    id: "employment",
    question: "Have you been continuously employed by the same employer for at least 2 years?",
    hint: "This counts from your start date to the date your notice period ends, not when you were told about redundancy.",
    yesLabel: "Yes, 2+ years",
    noLabel: "No, less than 2 years",
  },
  {
    id: "employee",
    question: "Are you an employee (not self-employed or a worker)?",
    hint: "Agency workers, zero-hours contractors and self-employed people are generally not entitled to statutory redundancy pay, though you may have other rights.",
    yesLabel: "Yes, I'm an employee",
    noLabel: "No — agency / self-employed",
  },
  {
    id: "genuine",
    question: "Was your role made redundant? (Not dismissed for another reason?)",
    hint: "Genuine redundancy means the job itself has disappeared or reduced headcount — not dismissal for performance or conduct.",
    yesLabel: "Yes, genuine redundancy",
    noLabel: "I'm not sure / another reason",
  },
];

interface Props {
  onEligible: () => void;
}

export function RedundancyEligibilityGate({ onEligible }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [ineligibleReason, setIneligibleReason] = useState<string | null>(null);
  const [skipped, setSkipped] = useState(false);

  if (skipped) return null;

  const current = STEPS[step]!;
  const progress = Math.round((step / STEPS.length) * 100);

  function answer(val: "yes" | "no") {
    const newAnswers = { ...answers, [current.id]: val };
    setAnswers(newAnswers);

    if (val === "no") {
      const reasons: Record<string, string | undefined> = {
        employment:
          "You need at least 2 years' continuous employment with the same employer to qualify for statutory redundancy pay. If you have less than 2 years, you have no automatic entitlement under UK law — though your employer may offer an ex-gratia payment.",
        employee:
          "Statutory redundancy pay applies to employees only. If you work through an agency or are self-employed, you won't automatically qualify — but you may have other employment rights. Check with ACAS or an employment solicitor.",
        genuine:
          "Statutory redundancy pay only applies to genuine redundancy situations. If you were dismissed for a different reason, different rules apply. If you're uncertain, ACAS provides free, impartial advice.",
      };
      setIneligibleReason(reasons[current.id] ?? "You may not meet the eligibility criteria for statutory redundancy pay.");
      return;
    }

    if (step + 1 < STEPS.length) {
      setStep(step + 1);
    } else {
      onEligible();
    }
  }

  if (ineligibleReason) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <TablerIcon name="ti-alert-triangle" className="mt-0.5 shrink-0 text-amber-500" size={18} aria-hidden="true" />
          <div className="flex-1 text-sm">
            <p className="font-medium text-amber-900">You may not qualify for statutory redundancy pay</p>
            <p className="mt-1.5 leading-relaxed text-amber-800">{ineligibleReason}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.acas.org.uk/redundancy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-200"
              >
                ACAS redundancy guide
                <TablerIcon name="ti-arrow-right" size={12} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => onEligible()}
                className="text-xs text-ink-faint underline-offset-2 hover:text-ink-soft hover:underline"
              >
                Calculate anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-widest text-brand-600">
          Eligibility check · {step + 1} of {STEPS.length}
        </span>
        <button
          type="button"
          onClick={() => { setSkipped(true); onEligible(); }}
          className="text-[11px] text-ink-faint underline-offset-2 hover:text-ink-soft hover:underline"
        >
          Skip check
        </button>
      </div>
      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-surface-line">
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={0}
          aria-valuemax={STEPS.length}
        />
      </div>

      {/* Question */}
      <p className="text-sm font-medium text-ink">{current.question}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">{current.hint}</p>

      {/* Answers */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => answer("yes")}
          className="flex-1 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-700 transition-colors hover:border-brand-400 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          {current.yesLabel}
        </button>
        <button
          type="button"
          onClick={() => answer("no")}
          className="flex-1 rounded-lg border border-surface-line bg-white px-4 py-2.5 text-sm text-ink-soft transition-colors hover:border-ink-faint hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          {current.noLabel}
        </button>
      </div>
    </div>
  );
}
