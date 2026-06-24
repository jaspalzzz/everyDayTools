import Link from "next/link";
import type { ReactNode } from "react";
import { Faq } from "./Faq";
import { relatedTools, type ToolMeta } from "@/data/tools";
import type { FaqItem, SourceRef } from "@/lib/types";

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
}: {
  tool: ToolMeta;
  /** The interactive client calculator (inputs + live results). */
  calculator: ReactNode;
  /** ~300-word context/explanation block (E-E-A-T + AdSense). */
  contentBlock: ReactNode;
  faqs: FaqItem[];
  source: SourceRef;
}) {
  const related = relatedTools(tool.slug);

  return (
    <article className="mx-auto max-w-content px-5 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-faint">
        <Link href="/" className="hover:text-ink-soft">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span>{tool.shortName}</span>
      </nav>

      {/* H1 = exact keyword */}
      <h1 className="text-2xl font-medium tracking-tight text-ink">{tool.name}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{tool.description}</p>

      {/* Tool — above the fold, no ad before it */}
      <div className="mt-6">{calculator}</div>

      {/* First ad slot — below the tool output only */}
      <div
        className="my-8 flex items-center justify-center rounded-md border border-dashed border-surface-line bg-surface-muted py-3"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-wide text-ink-faint">
          Advertisement
        </span>
      </div>

      {/* 300-word context block */}
      <section className="prose-tool max-w-2xl text-sm leading-relaxed text-ink-soft">
        {contentBlock}
      </section>

      <Faq items={faqs} />

      {/* Source link — E-E-A-T trust signal */}
      <p className="mt-8 text-xs text-ink-faint">
        Source:{" "}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 underline hover:text-brand-800"
        >
          {source.label}
        </a>
      </p>

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
                <i className="ti ti-arrow-right text-ink-faint" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
