"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { TOOLS } from "@/data/tools";
import { directoryTabForSearch, type TabId } from "./BrowseByCategory";

const COUNTRIES = [
  { code: "UK", label: "UK" },
  { code: "US", label: "US" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
] as const;

const QUICK_LINKS = [
  { label: "Payslip analyser" },
  { label: "Redundancy pay" },
  { label: "Notice period" },
  { label: "Final paycheck" },
  { label: "Holiday pay" },
] as const;

const DIRECT_ALIASES: Record<string, string> = {
  "final pay": "final-paycheck-deadline-calculator",
  "final paycheck": "final-paycheck-deadline-calculator",
  "holiday pay": "holiday-entitlement-calculator",
  "notice": "notice-period-calculator",
  "notice pay": "notice-period-calculator",
  "notice period": "notice-period-calculator",
  "payslip": "payslip-analyser",
  "payslip analyser": "payslip-analyser",
  "pto": "pto-payout-calculator",
  "redundancy": "redundancy-pay-calculator",
  "redundancy pay": "redundancy-pay-calculator",
  "sick pay": "statutory-sick-pay-calculator",
};

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .replace(/[-–—]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\bcalculator\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function directCalculatorHrefForSearch(searchText: string) {
  const q = normalizeSearch(searchText);
  if (!q) return null;

  const aliasSlug = DIRECT_ALIASES[q];
  if (aliasSlug) return `/${aliasSlug}`;

  let best: { slug: string; score: number } | null = null;

  for (const tool of TOOLS) {
    const candidates = [
      tool.name,
      tool.shortName,
      tool.slug,
      tool.slug.replace(/-/g, " "),
    ];

    for (const candidate of candidates) {
      const label = normalizeSearch(candidate);
      const score =
        q === label ? 1000 + label.length :
        q.length >= 4 && label.startsWith(q) ? 800 + q.length :
        label.length >= 5 && q.includes(label) ? 700 + label.length :
        0;

      if (score > (best?.score ?? 0)) best = { slug: tool.slug, score };
    }
  }

  return best && best.score >= 700 ? `/${best.slug}` : null;
}

/**
 * Reads ?q= on mount and runs it through the same search logic as a manual
 * submit. This is what makes the homepage WebSite/SearchAction schema
 * (potentialAction targeting /?q={search_term_string}) actually functional
 * rather than a claimed capability the site doesn't implement -- if Google
 * renders a sitelinks search box from that schema, this makes it work.
 * Isolated in its own component because useSearchParams() requires a
 * Suspense boundary in a static export.
 */
function QueryParamSync({
  onQuery,
  setQuery,
}: {
  onQuery: (value: string) => void;
  setQuery: (value: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q.trim()) {
      setQuery(q);
      onQuery(q);
    }
    // Only run on initial load -- deliberately not re-triggering on every
    // searchParams change, since that would fight the user's own typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function HeroSearch() {
  const router = useRouter();
  const [active, setActive] = useState<"UK" | "US" | "CA" | "AU">("UK");
  const [query, setQuery] = useState("");

  function scrollToDirectoryTab(searchText: string) {
    const tab: TabId = directoryTabForSearch(searchText);
    window.dispatchEvent(new CustomEvent("calculator-directory:select-tab", { detail: { tab } }));

    const el = document.getElementById("all-calculators");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function openSearchResult(searchText: string) {
    const directHref = directCalculatorHrefForSearch(searchText);
    if (directHref) {
      router.push(directHref);
      return;
    }

    scrollToDirectoryTab(searchText);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    openSearchResult(query);
  }

  return (
    <div
      className="overflow-hidden rounded-lg border bg-white"
      style={{ borderColor: "#E4DECF", boxShadow: "0 10px 28px rgba(16,32,51,.08)" }}
      aria-label="Start a pay rights check"
    >
      <Suspense fallback={null}>
        <QueryParamSync onQuery={openSearchResult} setQuery={setQuery} />
      </Suspense>
      {/* Country tabs */}
      <div className="grid grid-cols-4 border-b" style={{ background: "#FBF9F3", borderColor: "#EAE5D8" }}>
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => setActive(c.code)}
            style={{
              borderRight: "1px solid #EAE5D8",
              borderBottom: active === c.code ? "3px solid #1E4E8C" : "3px solid transparent",
              background: active === c.code ? "#ffffff" : "transparent",
              color: active === c.code ? "#16324f" : "#52616f",
            }}
            className="min-h-[46px] px-1 text-[12px] font-bold transition-colors last:border-r-0 min-[360px]:px-2 min-[360px]:text-[13px]"
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Finder row */}
      <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_54px] sm:grid-cols-[170px_1fr_54px] gap-2.5 p-4">
        <select
          aria-label="Country"
          className="col-span-2 sm:col-span-1 min-h-[52px] rounded-lg border px-3.5 text-[13px] font-medium text-ink outline-none"
          style={{ borderColor: "var(--color-control-border)" }}
          value={active}
          onChange={(e) => setActive(e.target.value as typeof active)}
        >
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>
        <input
          type="search"
          aria-label="Search calculator"
          placeholder='Describe your issue: unpaid wages, notice pay…'
          className="min-h-[52px] rounded-lg border px-3.5 text-[13px] text-ink outline-none placeholder:text-[#8795a3]"
          style={{ borderColor: "var(--color-control-border)" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Find calculator"
          className="flex min-h-[52px] w-[54px] items-center justify-center rounded-lg text-white text-lg font-bold transition-colors"
          style={{ background: "#1E4E8C", boxShadow: "0 10px 20px rgba(30,78,140,.22)" }}
        >
          →
        </button>
      </form>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        {QUICK_LINKS.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => {
              setQuery(q.label);
              openSearchResult(q.label);
            }}
            className="rounded-full border px-2.5 py-[7px] text-[12px] font-bold text-ink-soft transition-colors hover:border-brand-300 hover:text-ink"
            style={{ borderColor: "#E4DECF", background: "#FBF9F3" }}
          >
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}
