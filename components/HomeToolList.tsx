"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TablerIcon } from "./TablerIcon";
import { TOOLS } from "@/data/tools";

/**
 * Search-first homepage tool list. Filtering is done in JS (no round-trip)
 * so the list updates instantly as the user types — the dwell-time behaviour
 * Google rewards.
 */
export function HomeToolList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortName.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <div className="relative mx-auto max-w-md">
        <TablerIcon name="ti-search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={16} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "redundancy" or "overtime"…'
          aria-label="Search tools"
          className="w-full rounded-lg border border-surface-line bg-surface-muted py-3 pl-11 pr-4 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-50"
        />
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-2">
        {filtered.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className={`flex items-center gap-4 rounded-lg border px-4 py-4 transition-colors ${
              tool.hero
                ? "border-brand-100 bg-brand-50 hover:bg-brand-100/40"
                : "border-surface-line bg-white hover:bg-surface-muted"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                tool.hero ? "bg-white text-brand-600" : "bg-surface-muted text-ink-soft"
              }`}
            >
              <TablerIcon name={tool.icon} size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-ink">{tool.name}</span>
              <span className="block truncate text-xs text-ink-soft">{tool.description}</span>
            </span>
            <span className="hidden shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-brand-800 sm:inline">
              {tool.region}
            </span>
            <TablerIcon name="ti-arrow-right" className="shrink-0 text-ink-faint" size={16} aria-hidden="true" />
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-ink-faint">
            No tools match “{query}”. Try a different word.
          </p>
        )}
      </div>
    </div>
  );
}
