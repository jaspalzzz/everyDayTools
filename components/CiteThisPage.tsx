"use client";

import { useState } from "react";
import { SITE } from "@/lib/seo";

/**
 * "Cite this page" affordance (Phase 5, off-page: link-earning).
 *
 * Comprehensive reference pages earn backlinks when writers, HR teams and
 * researchers can quote and attribute them easily. This renders a ready-made,
 * copyable citation plus the last-reviewed date, lowering the friction to link
 * back. The citation text stays selectable even if the clipboard API is
 * unavailable, so it degrades gracefully.
 */
export function CiteThisPage({
  title,
  url,
  updated,
}: {
  title: string;
  url: string;
  updated: string;
}) {
  const [copied, setCopied] = useState(false);

  const year = updated.slice(0, 4);
  const reviewedLabel = new Date(updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const citation = `${SITE.name}. (${year}). ${title}. Retrieved from ${url}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the citation text is still selectable below */
    }
  };

  return (
    <section
      aria-labelledby="cite-heading"
      className="mt-12 max-w-2xl rounded-xl border border-surface-line bg-surface-muted p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="cite-heading" className="text-sm font-semibold text-ink">
          Cite this page
        </h2>
        <span className="text-xs text-ink-faint">Last reviewed {reviewedLabel}</span>
      </div>
      <p className="mt-3 select-all rounded-lg border border-surface-line bg-white px-3 py-2.5 text-xs leading-relaxed text-ink-soft">
        {citation}
      </p>
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex min-h-9 items-center rounded-lg border border-surface-line bg-white px-3 text-xs font-semibold text-ink transition-colors hover:bg-surface-muted"
      >
        {copied ? "Copied ✓" : "Copy citation"}
      </button>
    </section>
  );
}
