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

export interface LearnMoreMeta {
  guideSlug?: string;
  guideTitle?: string;
  faqs: Array<{ slug: string; question: string }>;
}

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
  learnMore,
}: {
  tool: ToolMeta;
  /** The interactive client calculator (inputs + live results). */
  calculator: ReactNode;
  /** ~300-word context/explanation block (E-E-A-T + AdSense). */
  contentBlock: ReactNode;
  faqs: FaqItem[];
  source: SourceRef;
  verifiedDate?: string;
  /** Optional deep-dive links shown below FAQs. */
  learnMore?: LearnMoreMeta;
}) {
  const related = relatedTools(tool.slug);

  const verifiedLabel = verifiedDate
    ? new Date(verifiedDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;

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

      {/* Trust bar — E-E-A-T signals above the fold */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-ink-faint">
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Law-backed
        </span>
        {verifiedLabel && (
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Updated {verifiedLabel}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Free · No signup
        </span>
        <Link href="/methodology" className="inline-flex items-center gap-0.5 text-brand-600 hover:underline">
          Methodology
          <TablerIcon name="ti-arrow-up-right" size={10} aria-hidden="true" />
        </Link>
      </div>

      {/* Tool — above the fold, no ad before it */}
      <div className="mt-6">{calculator}</div>

      {/* Ad slot 1 — below tool result, highest RPM position */}
      <AdSlot slot="2957844781" format="rectangle" className="my-8 max-w-sm" />

      {/* 300-word context block */}
      <section className="prose-tool max-w-2xl text-sm leading-relaxed text-ink-soft">
        {contentBlock}
      </section>

      <Faq items={faqs} />

      {/* Learn more — guide + FAQ deep-dives */}
      {learnMore && (learnMore.guideSlug || learnMore.faqs.length > 0) && (
        <section aria-labelledby="learn-more-heading" className="mt-8 max-w-2xl">
          <h2 id="learn-more-heading" className="text-sm font-semibold text-ink">
            Go deeper
          </h2>
          <div className="mt-3 flex flex-col gap-2">
            {learnMore.guideSlug && learnMore.guideTitle && (
              <Link
                href={`/guides/${learnMore.guideSlug}`}
                className="flex items-center gap-3 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 transition-colors hover:bg-brand-100/60"
              >
                <TablerIcon name="ti-book-2" className="shrink-0 text-brand-600" size={16} aria-hidden="true" />
                <span>
                  <span className="block text-xs font-semibold text-brand-700">Full guide</span>
                  <span className="block text-xs text-ink-soft">{learnMore.guideTitle}</span>
                </span>
                <TablerIcon name="ti-arrow-right" className="ml-auto shrink-0 text-ink-faint" size={14} aria-hidden="true" />
              </Link>
            )}
            {learnMore.faqs.map((faq) => (
              <Link
                key={faq.slug}
                href={`/faq/${faq.slug}`}
                className="flex items-center gap-3 rounded-lg border border-surface-line bg-white px-4 py-3 text-xs text-ink-soft transition-colors hover:bg-surface-muted"
              >
                <TablerIcon name="ti-question-mark" className="shrink-0 text-ink-faint" size={14} aria-hidden="true" />
                <span className="flex-1">{faq.question}</span>
                <TablerIcon name="ti-arrow-right" className="shrink-0 text-ink-faint" size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

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
