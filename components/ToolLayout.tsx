import Link from "next/link";
import type { ReactNode } from "react";
import { Faq } from "./Faq";
import { SourceBadge } from "./SourceBadge";
import { LegalSources } from "./LegalSources";
import { AdSlot } from "./AdSlot";
import { relatedTools, CATEGORY_META, type ToolMeta } from "@/data/tools";
import { TablerIcon } from "./TablerIcon";
import type { FaqItem, SourceRef } from "@/lib/types";
import { LEGAL_SOURCES } from "@/data/legalSources";

/**
 * The shared tool-page contract. Every calculator page renders through this
 * so structure, heading hierarchy, ad placement and internal linking are
 * identical site-wide. Order enforces the SEO rules: tool above the fold,
 * ads only below the tool, content block + FAQ + source beneath.
 */
export function ToolLayout({
  tool,
  calculator,
  contentBlock,
  faqs,
  source,
  verifiedDate,
}: {
  tool: ToolMeta;
  /** The interactive client calculator (inputs + live results). */
  calculator: ReactNode;
  /** ~300-word context/explanation block (E-E-A-T + AdSense). */
  contentBlock: ReactNode;
  faqs: FaqItem[];
  source: SourceRef;
  verifiedDate?: string;
}) {
  const related = relatedTools(tool.slug);

  return (
    <article className="mx-auto max-w-content px-5 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-faint">
        <Link href="/" className="hover:text-ink-soft">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="hover:text-ink-soft">
          {CATEGORY_META[tool.category].label}
        </span>
        <span className="mx-1.5">/</span>
        <span>{tool.shortName}</span>
      </nav>

      {/* H1 = exact keyword */}
      <h1 className="text-2xl font-medium tracking-tight text-ink">{tool.name}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{tool.description}</p>

      {/* Verified date — visible above fold for E-E-A-T and user trust */}
      {verifiedDate && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-surface-line bg-surface-muted px-3 py-1 text-[11px] text-ink-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Rates verified{" "}
          {new Date(verifiedDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      )}

      {/* Tool — above the fold, no ad before it */}
      <div className="mt-6">{calculator}</div>

      {/* Ad slot 1 — below tool result, highest RPM position */}
      <AdSlot slot="2957844781" format="rectangle" className="my-8 max-w-sm" />

      {/* 300-word context block */}
      <section className="prose-tool max-w-2xl text-sm leading-relaxed text-ink-soft">
        {contentBlock}
      </section>

      <Faq items={faqs} />

      {/* Legal basis block — primary sources auto-looked up by tool slug */}
      <LegalSources sources={LEGAL_SOURCES[tool.slug] ?? []} />

      {/* Ad slot 2 — below FAQs, second-highest dwell position */}
      <AdSlot slot="6483920154" format="rectangle" className="mt-6 max-w-sm" />

      <SourceBadge source={source} verifiedDate={verifiedDate} />

      {/* Internal links to related tools */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-10">
          <h2 id="related-heading" className="text-sm font-medium text-ink">
            Related tools
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="flex items-center justify-between rounded-md border border-surface-line bg-white px-4 py-3 transition-colors hover:bg-surface-muted"
              >
                <span>
                  <span className="block text-sm font-medium text-ink">{r.name}</span>
                  <span className="block text-xs text-ink-faint">{r.region}</span>
                </span>
                <TablerIcon name="ti-arrow-right" className="text-ink-faint" size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
