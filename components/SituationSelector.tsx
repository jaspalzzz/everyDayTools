"use client";

import { useState } from "react";
import Link from "next/link";
import { TablerIcon } from "./TablerIcon";

const SITUATIONS = [
  {
    id: "redundant",
    label: "I was made redundant",
    icon: "ti-briefcase-off",
    color: "bg-red-50 border-red-200 text-red-700",
    activeColor: "bg-red-600 border-red-600 text-white",
    tools: [
      { slug: "redundancy-pay-calculator", name: "Redundancy pay", desc: "How much are you legally owed?" },
      { slug: "notice-period-calculator", name: "Notice period", desc: "Paid notice or garden leave?" },
      { slug: "settlement-agreement-calculator", name: "Settlement agreement", desc: "Is the offer fair?" },
      { slug: "tribunal-compensation-calculator", name: "Employment tribunal", desc: "Was the dismissal unfair?" },
    ],
  },
  {
    id: "fired",
    label: "I was fired",
    icon: "ti-user-off",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    activeColor: "bg-orange-600 border-orange-600 text-white",
    tools: [
      { slug: "tribunal-compensation-calculator", name: "Unfair dismissal", desc: "What compensation could you get?" },
      { slug: "notice-period-calculator", name: "Notice pay", desc: "Were you paid your full notice?" },
      { slug: "settlement-agreement-calculator", name: "Settlement offer", desc: "Is the payout fair?" },
      { slug: "take-home-pay-calculator", name: "Final paycheck", desc: "Check your last pay is correct" },
    ],
  },
  {
    id: "resigned",
    label: "I resigned",
    icon: "ti-logout",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    activeColor: "bg-blue-600 border-blue-600 text-white",
    tools: [
      { slug: "notice-period-calculator", name: "Notice period", desc: "How long must you stay?" },
      { slug: "garden-leave-calculator", name: "Garden leave", desc: "Can your employer keep you at home?" },
      { slug: "pto-payout-calculator", name: "Unused holiday payout", desc: "Get paid for untaken leave" },
      { slug: "take-home-pay-calculator", name: "Final pay", desc: "Check your last payslip" },
    ],
  },
  {
    id: "unpaid",
    label: "My employer hasn't paid me",
    icon: "ti-coins-off",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    activeColor: "bg-yellow-600 border-yellow-600 text-white",
    tools: [
      { slug: "take-home-pay-calculator", name: "Take-home pay", desc: "What should you actually receive?" },
      { slug: "overtime-calculator", name: "Overtime owed", desc: "Unpaid overtime you're owed" },
      { slug: "pto-payout-calculator", name: "Holiday pay", desc: "Unpaid leave entitlement" },
      { slug: "tribunal-compensation-calculator", name: "Employment tribunal", desc: "Recover what you're owed" },
    ],
  },
  {
    id: "parental",
    label: "Parental leave is coming",
    icon: "ti-baby-carriage",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    activeColor: "bg-emerald-600 border-emerald-600 text-white",
    tools: [
      { slug: "maternity-pay-calculator", name: "Maternity pay", desc: "SMP, MA and enhanced pay" },
      { slug: "paternity-pay-calculator", name: "Paternity pay", desc: "SPP and qualifying conditions" },
      { slug: "shared-parental-leave-calculator", name: "Shared parental leave", desc: "Split the leave between you" },
      { slug: "adoption-pay-calculator", name: "Adoption pay", desc: "SAP rates and eligibility" },
    ],
  },
] as const;

export function SituationSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = SITUATIONS.find((s) => s.id === selected);

  return (
    <section aria-labelledby="situation-heading" className="mx-auto mt-10 max-w-2xl">
      <h2 id="situation-heading" className="text-center text-base font-semibold text-ink">
        Why are you here today?
      </h2>
      <p className="mt-1 text-center text-xs text-ink-faint">
        Select your situation — we&apos;ll show you exactly what to calculate.
      </p>

      {/* Situation pills */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SITUATIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelected(selected === s.id ? null : s.id)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              selected === s.id ? s.activeColor : s.color
            }`}
          >
            <TablerIcon name={s.icon} size={13} aria-hidden="true" />
            {s.label}
          </button>
        ))}
      </div>

      {/* Recommended tools */}
      {active && (
        <div className="mt-5 rounded-xl border border-surface-line bg-white p-4 shadow-sm">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
            Recommended for you
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {active.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="flex items-start gap-3 rounded-lg border border-surface-line px-3 py-2.5 text-sm transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <TablerIcon name="ti-calculator" size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-medium text-ink">{tool.name}</p>
                  <p className="text-[11px] text-ink-faint">{tool.desc}</p>
                </div>
                <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" className="ml-auto mt-0.5 shrink-0 text-ink-faint" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
