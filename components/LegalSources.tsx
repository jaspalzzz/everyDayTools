/**
 * LegalSources — primary legislation and government guidance trust block.
 *
 * Renders below the FAQ on every calculator/guide that has entries in
 * data/legalSources.ts. Links open in a new tab with noopener.
 * Primary government sources remain the authority; editorial review explains
 * how My Pay Rights checks and corrects its summaries of those sources.
 */

import type { LegalSource } from "@/lib/types";

const TYPE_META: Record<
  LegalSource["type"],
  { label: string; iconPath: string; chipClass: string }
> = {
  legislation: {
    label: "Legislation",
    iconPath:
      "M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7L12 19.82 4 15.5v-7l8-4.32zM12 7a1 1 0 100 2 1 1 0 000-2zm-1 4h2v5h-2v-5z",
    chipClass: "bg-brand-50 text-brand-700 border-brand-100",
  },
  guidance: {
    label: "Guidance",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    chipClass: "bg-surface-muted text-ink-soft border-surface-line",
  },
  regulator: {
    label: "Regulator",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    chipClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  calculator: {
    label: "Official calculator",
    iconPath:
      "M9 7H7v2h2V7zm0 4H7v2h2v-2zm0 4H7v2h2v-2zm4-8h-2v2h2V7zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zm4-8h-2v2h2V7zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zM5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z",
    chipClass: "bg-amber-50 text-amber-700 border-amber-100",
  },
};

export function LegalSources({ sources }: { sources: LegalSource[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section
      aria-labelledby="legal-sources-heading"
      className="mt-8 rounded-xl border border-surface-line bg-surface-muted/50 px-5 py-4"
    >
      <h2
        id="legal-sources-heading"
        className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-faint"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Legal basis &amp; primary sources
      </h2>

      <ul className="space-y-2.5" role="list">
        {sources.map((src) => {
          const meta = TYPE_META[src.type];
          return (
            <li key={src.url} className="flex flex-wrap items-start gap-x-3 gap-y-1">
              {/* Type chip */}
              <span
                className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold leading-none ${meta.chipClass}`}
              >
                {meta.label}
              </span>

              {/* Link + section */}
              <span className="min-w-0">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-600 underline-offset-2 hover:underline"
                >
                  {src.label}
                </a>
                {src.section && (
                  <span className="ml-1.5 text-xs text-ink-faint">{src.section}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
        All statutory figures are sourced directly from official government legislation and guidance.
        No secondary aggregators or third-party payroll providers are used.{" "}
        <a href="/methodology" className="text-brand-600 hover:underline">
          See our methodology →
        </a>
      </p>
    </section>
  );
}
