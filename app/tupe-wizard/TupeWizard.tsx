"use client";

import { useState } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4 | 5;

type Answers = {
  employerChanging: boolean | null;
  changeType: "business-sale" | "outsourcing" | "re-tendering" | "insourcing" | "other" | null;
  serviceYears: "under-1" | "1-2" | "2-plus" | null;
  termsChanged: boolean | null;
  dismissalRisk: boolean | null;
};

type Verdict = "applies" | "may-apply" | "unlikely" | null;

function getVerdict(answers: Answers): Verdict {
  if (!answers.employerChanging) return "unlikely";
  if (answers.changeType === "other") return "may-apply";
  if (["business-sale", "outsourcing", "re-tendering", "insourcing"].includes(answers.changeType ?? "")) {
    return "applies";
  }
  return "may-apply";
}

const CHANGE_TYPE_OPTIONS = [
  { value: "business-sale", label: "The business (or part of it) is being sold or transferred to a new owner" },
  { value: "outsourcing", label: "A service is being outsourced to a contractor for the first time" },
  { value: "re-tendering", label: "A service contract is changing from one contractor to another" },
  { value: "insourcing", label: "A service is being brought back in-house from a contractor" },
  { value: "other", label: "Something else is changing — I'm not sure of the type" },
] as const;

function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              n < step
                ? "bg-brand-600 text-white"
                : n === step
                ? "bg-brand-100 text-brand-600 ring-2 ring-brand-600"
                : "bg-surface-muted text-ink-faint"
            }`}
          >
            {n < step ? "✓" : n}
          </div>
        ))}
      </div>
      <div className="relative h-1.5 rounded-full bg-surface-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-brand-600 transition-all"
          style={{ width: `${((step - 1) / 4) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-right text-xs text-ink-faint">Step {step} of 5</p>
    </div>
  );
}

function YesNoButtons({ onYes, onNo }: { onYes: () => void; onNo: () => void }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onYes}
        className="flex-1 rounded-xl border-2 border-brand-600 bg-brand-50 px-6 py-4 font-semibold text-brand-700 transition-colors hover:bg-brand-100"
      >
        Yes
      </button>
      <button
        onClick={onNo}
        className="flex-1 rounded-xl border-2 border-surface-line px-6 py-4 font-semibold text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
      >
        No
      </button>
    </div>
  );
}

function VerdictPanel({ verdict, answers }: { verdict: Verdict; answers: Answers }) {
  if (verdict === "unlikely") {
    return (
      <div className="rounded-xl border border-surface-line bg-surface-muted p-6">
        <p className="mb-1 text-lg font-bold text-ink">TUPE is unlikely to apply</p>
        <p className="mb-4 text-ink-soft">
          If your employer is not changing, TUPE (the Transfer of Undertakings (Protection of Employment)
          Regulations 2006) generally does not apply. Your employment continues with the same employer and
          your existing rights are unaffected.
        </p>
        <p className="text-sm text-ink-faint">
          If you believe your employer is changing but you were not told, read our TUPE guide for more detail.
        </p>
      </div>
    );
  }

  if (verdict === "may-apply") {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <p className="mb-1 text-lg font-bold text-amber-900">TUPE may apply — seek advice</p>
        <p className="mb-4 text-amber-800 text-sm">
          The type of change you described may or may not be covered by TUPE depending on the specific
          circumstances. Whether TUPE applies is a legal question — you should speak to an employment
          solicitor or contact ACAS for free advice.
        </p>
        <a
          href="https://www.acas.org.uk/tupe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          ACAS TUPE guidance →
        </a>
      </div>
    );
  }

  // applies
  const protections = [
    "Your employment transfers automatically to the new employer on the same terms and conditions",
    "Your continuous service is preserved — your start date carries over",
    "The new employer cannot change your terms and conditions for a reason connected to the transfer",
    answers.dismissalRisk
      ? "Dismissal because of the transfer is automatically unfair (from day 1 — no 2-year qualifying period)"
      : "Any dismissal connected to the transfer is automatically unfair from day 1 of employment",
    "You must be informed and consulted before the transfer takes place",
  ];

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
      <p className="mb-1 text-lg font-bold text-emerald-900">TUPE applies to your situation</p>
      <p className="mb-4 text-emerald-800 text-sm">
        Based on your answers, TUPE 2006 is likely to apply. This gives you the following protections:
      </p>
      <ul className="mb-4 space-y-2">
        {protections.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-emerald-900">
            <span className="mt-0.5 font-bold text-emerald-600">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {answers.termsChanged && (
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <strong>Your terms have been changed.</strong> If those changes are connected to the transfer,
          they may be void and you may be entitled to revert to your original terms. Get legal advice.
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/guides/uk-tupe"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Read our full TUPE guide
        </Link>
        <a
          href="https://www.acas.org.uk/tupe"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600"
        >
          ACAS TUPE advice
        </a>
      </div>
    </div>
  );
}

export function TupeWizard() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>({
    employerChanging: null,
    changeType: null,
    serviceYears: null,
    termsChanged: null,
    dismissalRisk: null,
  });
  const [done, setDone] = useState(false);

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const advance = () => {
    if (step === 5) {
      setDone(true);
    } else {
      setStep((s) => (s + 1) as Step);
    }
  };

  const reset = () => {
    setStep(1);
    setAnswers({ employerChanging: null, changeType: null, serviceYears: null, termsChanged: null, dismissalRisk: null });
    setDone(false);
  };

  if (done) {
    const verdict = getVerdict(answers);
    return (
      <div>
        <VerdictPanel verdict={verdict} answers={answers} />
        <button onClick={reset} className="mt-4 text-sm text-brand-600 hover:underline">
          ← Start again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-surface-line bg-white p-6 shadow-sm">
      <ProgressBar step={step} />

      {step === 1 && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-ink">Is your employer changing?</h2>
          <p className="mb-6 text-sm text-ink-soft">
            For example: the business is being sold, the contract you work on is changing hands, or a
            service is being outsourced or brought back in-house.
          </p>
          <YesNoButtons
            onYes={() => { update("employerChanging", true); advance(); }}
            onNo={() => { update("employerChanging", false); setDone(true); }}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-ink">What is happening?</h2>
          <p className="mb-4 text-sm text-ink-soft">Choose the option that best describes your situation.</p>
          <div className="space-y-2">
            {CHANGE_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { update("changeType", opt.value); advance(); }}
                className="w-full rounded-xl border border-surface-line px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-ink">How long have you worked there?</h2>
          <p className="mb-4 text-sm text-ink-soft">Your length of service affects some TUPE rights.</p>
          <div className="space-y-2">
            {[
              { value: "under-1", label: "Less than 1 year" },
              { value: "1-2", label: "1 to 2 years" },
              { value: "2-plus", label: "2 years or more" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { update("serviceYears", opt.value as Answers["serviceYears"]); advance(); }}
                className="w-full rounded-xl border border-surface-line px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-ink">Has your employer told you your terms will change?</h2>
          <p className="mb-6 text-sm text-ink-soft">
            For example: a pay cut, different shift patterns, a change to your job title, location, or
            benefits — with the change connected to the transfer.
          </p>
          <YesNoButtons
            onYes={() => { update("termsChanged", true); advance(); }}
            onNo={() => { update("termsChanged", false); advance(); }}
          />
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="mb-2 text-xl font-bold text-ink">Have you been told you might be dismissed?</h2>
          <p className="mb-6 text-sm text-ink-soft">
            This includes being told your role is at risk, that there will be redundancies after the
            transfer, or that you will not be transferred at all.
          </p>
          <YesNoButtons
            onYes={() => { update("dismissalRisk", true); setDone(true); }}
            onNo={() => { update("dismissalRisk", false); setDone(true); }}
          />
        </div>
      )}
    </div>
  );
}
