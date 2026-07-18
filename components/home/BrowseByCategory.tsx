"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TABS = [
  { label: "Leaving a job", id: "leaving-job" },
  { label: "Pay & tax", id: "pay-tax" },
  { label: "Parental leave", id: "parental-leave" },
  { label: "Benefits", id: "benefits" },
  { label: "Workplace hours", id: "hours" },
  { label: "Guides", id: "guides" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

const TAB_IDS = new Set<TabId>(TABS.map((tab) => tab.id));

const TAB_SEARCH_KEYWORDS: Record<TabId, string[]> = {
  "leaving-job": [
    "dismissal",
    "final paycheck",
    "final pay",
    "garden leave",
    "leaving",
    "notice",
    "notice pay",
    "notice period",
    "pilon",
    "redundancy",
    "settlement",
    "severance",
    "tribunal",
  ],
  "pay-tax": [
    "bonus",
    "day rate",
    "deduction",
    "deductions",
    "income tax",
    "ir35",
    "national insurance",
    "overtime",
    "pay rise",
    "pay slip",
    "payslip",
    "salary",
    "salary to hourly",
    "take home",
    "take-home",
    "tax",
    "unpaid wages",
    "wage",
    "wages",
  ],
  "parental-leave": [
    "adoption",
    "adoption pay",
    "keep in touch",
    "kit day",
    "maternity",
    "maternity pay",
    "parental",
    "paternity",
    "paternity pay",
    "shared parental",
  ],
  benefits: [
    "annual leave",
    "benefit",
    "benefits",
    "holiday",
    "holiday pay",
    "pto",
    "pto payout",
    "sick",
    "sick pay",
    "statutory sick",
    "unemployment",
    "vacation",
  ],
  hours: [
    "contract rate",
    "daily rate",
    "hourly",
    "hours",
    "part time",
    "part-time",
    "pro rata",
    "pro-rata",
    "self employed",
    "self-employment",
    "working days",
    "working hours",
  ],
  guides: [
    "acas",
    "explain",
    "guide",
    "guides",
    "rights",
    "what should i do",
  ],
};

export function directoryTabForSearch(query: string): TabId {
  const q = query.trim().toLowerCase();
  if (!q) return "leaving-job";

  let best: { tab: TabId; score: number } | null = null;

  for (const [tab, keywords] of Object.entries(TAB_SEARCH_KEYWORDS) as [TabId, string[]][]) {
    for (const keyword of keywords) {
      const k = keyword.toLowerCase();
      const score = q === k ? k.length + 100 : q.includes(k) || k.includes(q) ? k.length : 0;
      if (score > (best?.score ?? 0)) best = { tab, score };
    }
  }

  return best?.tab ?? "leaving-job";
}

const COMPACT_TOOLS: Record<TabId, { icon: string; title: string; desc: string; href: string }[]> = {
  "leaving-job": [
    { icon: "S", title: "Settlement agreement calculator", desc: "Estimate possible settlement value and notice pay.", href: "/settlement-agreement-calculator" },
    { icon: "E", title: "Employment tribunal compensation", desc: "Check possible award ranges and caps.", href: "/tribunal-compensation-calculator" },
    { icon: "R", title: "Redundancy pay calculator", desc: "Statutory and contractual redundancy pay estimates.", href: "/redundancy-pay-calculator" },
    { icon: "N", title: "Notice pay calculator", desc: "What notice pay may be owed after dismissal.", href: "/notice-period-calculator" },
    { icon: "G", title: "Garden leave calculator", desc: "Estimate pay owed during garden leave.", href: "/garden-leave-calculator" },
    { icon: "F", title: "Final paycheck deadline calculator", desc: "Find when your final wage payment should be made.", href: "/final-paycheck-deadline-calculator" },
    { icon: "V", title: "Severance pay estimator", desc: "Separate statutory entitlements from a negotiable severance offer.", href: "/severance-pay-calculator" },
    { icon: "C", title: "Employer redundancy cost", desc: "Estimate redundancy, notice and accrued-holiday costs for a UK employer.", href: "/employer-redundancy-cost-calculator" },
    { icon: "E", title: "Employer notice pay", desc: "Calculate statutory notice pay or the cost of garden leave.", href: "/employer-notice-pay-calculator" },
    { icon: "T", title: "TUPE transfer checker", desc: "Check whether TUPE protections may apply when an employer or service changes.", href: "/tupe-wizard" },
  ],
  "pay-tax": [
    { icon: "U", title: "Payslip analyser", desc: "Check your payslip for missing wages and deductions.", href: "/payslip-analyser" },
    { icon: "O", title: "Overtime pay calculator", desc: "Check overtime rates and unpaid overtime.", href: "/take-home-overtime-calculator" },
    { icon: "T", title: "Take-home pay calculator", desc: "Net pay after tax and national insurance.", href: "/take-home-pay-calculator" },
    { icon: "P", title: "Pay rise calculator", desc: "Calculate new salary and percentage increase.", href: "/pay-rise-calculator" },
    { icon: "D", title: "Day rate calculator", desc: "Convert salary to daily or contract rate.", href: "/day-rate-calculator" },
    { icon: "S", title: "Salary to hourly calculator", desc: "Convert annual salary to hourly equivalent.", href: "/salary-to-hourly-calculator" },
  ],
  "parental-leave": [
    { icon: "M", title: "Maternity pay calculator", desc: "Statutory maternity pay entitlement by week.", href: "/maternity-pay-calculator" },
    { icon: "P", title: "Paternity pay calculator", desc: "Statutory paternity leave and pay rights.", href: "/paternity-pay-calculator" },
    { icon: "S", title: "Shared parental leave", desc: "Split leave entitlement between partners.", href: "/shared-parental-leave-calculator" },
    { icon: "A", title: "Adoption pay calculator", desc: "Statutory adoption pay and leave estimate.", href: "/adoption-pay-calculator" },
    { icon: "H", title: "Holiday accrual on leave", desc: "Holiday rights during parental leave.", href: "/holiday-entitlement-calculator" },
    { icon: "K", title: "Keep in touch days", desc: "Calculate KIT day pay during maternity leave.", href: "/maternity-pay-calculator" },
  ],
  "benefits": [
    { icon: "U", title: "Unemployment benefit calculator", desc: "Estimate weekly benefit amount by location.", href: "/unemployment-benefit-calculator" },
    { icon: "S", title: "Sick pay calculator", desc: "Statutory sick pay entitlement estimates.", href: "/statutory-sick-pay-calculator" },
    { icon: "H", title: "Holiday pay calculator", desc: "Calculate accrued holiday entitlement.", href: "/holiday-entitlement-calculator" },
    { icon: "P", title: "PTO payout calculator", desc: "Estimate unused paid time off after leaving.", href: "/pto-payout-calculator" },
    { icon: "B", title: "Bonus tax calculator", desc: "Estimate tax on a bonus or one-off payment.", href: "/bonus-tax-calculator" },
    { icon: "I", title: "IR35 calculator", desc: "Check IR35 status and contractor take-home.", href: "/ir35-calculator" },
    { icon: "A", title: "Australia annual leave calculator", desc: "Calculate accrued NES annual leave and termination payout.", href: "/au-annual-leave-calculator" },
    { icon: "N", title: "New York PTO payout calculator", desc: "Check a New York unused-vacation balance against the employer policy rule.", href: "/us/new-york/pto-payout-calculator" },
  ],
  "hours": [
    { icon: "O", title: "Overtime pay calculator", desc: "Check overtime rates and unpaid overtime.", href: "/take-home-overtime-calculator" },
    { icon: "H", title: "Salary to hourly calculator", desc: "Convert annual salary to hourly equivalent.", href: "/salary-to-hourly-calculator" },
    { icon: "D", title: "Day rate calculator", desc: "Convert salary to daily or contract rate.", href: "/day-rate-calculator" },
    { icon: "W", title: "Working days calculator", desc: "Count working days between two dates.", href: "/working-days-calculator" },
    { icon: "P", title: "Pro-rata salary calculator", desc: "Calculate pay for part-time or part-year work.", href: "/pro-rata-salary-calculator" },
    { icon: "S", title: "Self-employment tax calculator", desc: "Estimate tax and NI for self-employed workers.", href: "/self-employment-tax-calculator" },
  ],
  "guides": [
    { icon: "R", title: "Redundancy rights guide", desc: "Everything you need to know about redundancy.", href: "/guides/uk-redundancy-pay" },
    { icon: "S", title: "Settlement agreement guide", desc: "Before you sign — what to check.", href: "/guides/uk-settlement-agreement" },
    { icon: "N", title: "Notice period guide", desc: "Rights and obligations during notice.", href: "/guides/uk-notice-period-law" },
    { icon: "U", title: "Unfair dismissal guide", desc: "Rights and remedies when dismissed unfairly.", href: "/guides/uk-unfair-dismissal" },
    { icon: "P", title: "Parental leave guide", desc: "Maternity, paternity and shared leave.", href: "/guides/uk-maternity-pay" },
    { icon: "F", title: "PILON guide", desc: "Pay in lieu of notice — what you are owed.", href: "/guides/uk-pilon" },
  ],
};

const DIRECTORY_NOTE: Record<TabId, { title: string; body: string }> = {
  "leaving-job": { title: "Most common category", body: "Redundancy, notice pay and settlement tools are the most searched. Start here if you are leaving or have left work." },
  "pay-tax": { title: "Check your pay", body: "Use these tools if you think your wages, overtime or deductions are incorrect." },
  "parental-leave": { title: "Leave entitlements", body: "Statutory pay rules differ by country and employment type. Select your situation above." },
  "benefits": { title: "Entitlement checks", body: "Sick pay, holiday pay and unemployment benefit rules vary significantly by jurisdiction." },
  "hours": { title: "Working time rules", body: "Maximum hours, rest breaks and shift pay differ by country and contract type." },
  "guides": { title: "Read before you act", body: "Plain-English guides to employment law. Understand your rights before talking to an employer or adviser." },
};

export function BrowseByCategory() {
  const [active, setActive] = useState<TabId>("leaving-job");

  useEffect(() => {
    function handleDirectoryTab(event: Event) {
      const tab = (event as CustomEvent<{ tab?: TabId }>).detail?.tab;
      if (tab && TAB_IDS.has(tab)) setActive(tab);
    }

    window.addEventListener("calculator-directory:select-tab", handleDirectoryTab);
    return () => window.removeEventListener("calculator-directory:select-tab", handleDirectoryTab);
  }, []);

  return (
    <section
      aria-labelledby="directory-title"
      style={{ marginTop: 58, border: "1px solid #E4DECF", borderRadius: 8, background: "#fff", overflow: "hidden" }}
    >
      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-[#FBF9F3] border-b border-surface-line" aria-label="Calculator topics">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`directory-tab-${tab.id}`}
            type="button"
            aria-pressed={active === tab.id}
            aria-controls={`directory-panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            style={{
              minHeight: 66, display: "grid", placeItems: "center",
              borderRight: "1px solid #EAE5D8", borderBottom: "1px solid #EAE5D8", borderTop: "none", borderLeft: "none",
              background: active === tab.id ? "#fff" : "transparent",
              boxShadow: active === tab.id ? "inset 0 -3px 0 #1E4E8C" : "none",
              color: active === tab.id ? "#163C6B" : "#25384c",
              fontSize: 13, fontWeight: 850, textAlign: "center", padding: 8, cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Keep every topic panel in the initial HTML so search crawlers can
          discover the same contextual links that visitors reveal with a tab. */}
      {TABS.map((tab) => {
        const tools = COMPACT_TOOLS[tab.id];
        const note = DIRECTORY_NOTE[tab.id];
        return (
          <div
            key={tab.id}
            id={`directory-panel-${tab.id}`}
            aria-labelledby={`directory-tab-${tab.id}`}
            hidden={active !== tab.id}
            className={active === tab.id ? "grid grid-cols-1 md:grid-cols-[230px_1fr] gap-6" : "hidden"}
            style={{ padding: 22 }}
          >
            <div>
              <h2
                id={tab.id === "leaving-job" ? "directory-title" : undefined}
                style={{ margin: "0 0 16px", fontSize: 22, color: "#102033" }}
              >
                Calculator directory
              </h2>
              <div style={{ borderRadius: 8, background: "#fff4df", border: "1px solid #f1d9aa", padding: 15, color: "#5d461d", fontSize: 13 }}>
                <strong style={{ display: "block", color: "#3c2c0d", fontSize: 15, marginBottom: 4 }}>{note.title}</strong>
                {note.body}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tools.map((tool) => (
                <Link
                  key={tool.href + tool.title}
                  href={tool.href}
                  style={{ minHeight: 78, border: "1px solid #EAE5D8", borderRadius: 8, background: "#FBF9F3", padding: 13, display: "grid", gridTemplateColumns: "34px 1fr", gap: 12, alignItems: "start", textDecoration: "none" }}
                >
                  <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 8, background: "#EAF0F8", color: "#1E4E8C", fontWeight: 900, fontSize: 14 }}>
                    {tool.icon}
                  </span>
                  <span>
                    <strong style={{ display: "block", color: "#102033", fontSize: 14, lineHeight: 1.25 }}>{tool.title}</strong>
                    <span style={{ display: "block", marginTop: 3, color: "#52616f", fontSize: 12 }}>{tool.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
