import Link from "next/link";
import type { ReactNode } from "react";
import { Faq } from "./Faq";
import { LegalSources } from "./LegalSources";
import { AdSlot } from "./AdSlot";
import { relatedTools, CATEGORY_META, type ToolMeta } from "@/data/tools";
import type { FaqItem, SourceRef } from "@/lib/types";
import { LEGAL_SOURCES } from "@/data/legalSources";

export interface LearnMoreMeta {
  guideSlug?: string;
  guideTitle?: string;
  faqs: Array<{ slug: string; question: string }>;
}

export interface MethodologyCard {
  title: string;
  desc: string;
}

export function ToolLayout({
  tool,
  calculator,
  contentBlock,
  faqs,
  source,
  verifiedDate,
  learnMore,
  methodologyCards,
}: {
  tool: ToolMeta;
  calculator: ReactNode;
  /** Prose explanation shown in the Methodology section. */
  contentBlock: ReactNode;
  faqs: FaqItem[];
  source: SourceRef;
  verifiedDate?: string;
  learnMore?: LearnMoreMeta;
  /** Optional 2-col methodology card grid shown below prose. */
  methodologyCards?: MethodologyCard[];
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

  const legalSources = LEGAL_SOURCES[tool.slug] ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid #e7edf3",
          background:
            "radial-gradient(circle at 82% 18%,rgba(23,105,224,.10),transparent 30%),linear-gradient(180deg,#fff 0%,#f7fbff 100%)",
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: 1180, padding: "46px 24px 34px" }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ color: "#7a8794", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
            <span style={{ margin: "0 6px" }}>/</span>
            <Link href="/" style={{ color: "inherit" }}>{CATEGORY_META[tool.category].label}</Link>
            <span style={{ margin: "0 6px" }}>/</span>
            <span style={{ color: "#52616f" }}>{tool.shortName}</span>
          </nav>

          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "#16835b", fontSize: 12, fontWeight: 900,
              letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 0,
            }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%", background: "#16835b",
                boxShadow: "0 0 0 5px rgba(22,131,91,.12)", flexShrink: 0,
              }}
            />
            {tool.region} calculator · employment rights estimate
          </div>

          {/* H1 */}
          <h1
            style={{
              maxWidth: 760, margin: "12px 0 12px", color: "#102033",
              fontSize: "clamp(34px,4.8vw,56px)", lineHeight: 1.03,
              letterSpacing: 0, fontWeight: 800,
            }}
          >
            {tool.name}
          </h1>

          {/* Description */}
          <p style={{ maxWidth: 760, margin: "0 0 18px", color: "#25384c", fontSize: 17, lineHeight: 1.62 }}>
            {tool.description}{" "}
            <strong style={{ color: "#16324f", fontWeight: 800 }}>
              This is an educational estimate, not legal advice.
            </strong>
          </p>

          {/* Trust strip */}
          <div
            aria-label="Calculator trust signals"
            style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
          >
            {tool.region.split("/").map((r) => (
              <span key={r} style={PILL_STYLE}>{r} rules</span>
            ))}
            {verifiedLabel && (
              <span style={PILL_STYLE}>Updated {verifiedLabel}</span>
            )}
            <span style={PILL_STYLE}>Private estimate</span>
            <span style={PILL_STYLE}>No signup</span>
            <Link href="/methodology" style={{ ...PILL_STYLE, color: "#1769e0", borderColor: "#a8c9ef", background: "#eaf3ff" }}>
              Methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 76px" }}>

        {/* Calculator form + result */}
        <section aria-label={`${tool.shortName} calculator`}>
          {calculator}
        </section>

        {/* Ad slot 1 — below tool, highest RPM */}
        <AdSlot slot="2957844781" format="rectangle" className="my-8 max-w-sm" />

        {/* ── Methodology ────────────────────────────────────────────── */}
        <section
          aria-labelledby="methodology-heading"
          style={{
            marginTop: 28, border: "1px solid #c8d9ea", borderRadius: 10,
            background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
          }}
        >
          <h2 id="methodology-heading" style={{ margin: "0 0 12px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
            How {tool.shortName.toLowerCase()} {tool.shortName.toLowerCase().endsWith("s") ? "are" : "is"} calculated
          </h2>
          <div className="prose-tool text-sm leading-relaxed" style={{ color: "#25384c" }}>
            {contentBlock}
          </div>

          {methodologyCards && methodologyCards.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: 12, marginTop: 16 }}
            >
              {methodologyCards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    border: "1px solid #e7edf3", borderRadius: 8,
                    background: "#f7fafc", padding: 14,
                    color: "#52616f", fontSize: 13,
                  }}
                >
                  <strong style={{ display: "block", color: "#102033", marginBottom: 5 }}>{card.title}</strong>
                  {card.desc}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section
            aria-labelledby="faq-heading"
            style={{
              marginTop: 28, border: "1px solid #c8d9ea", borderRadius: 10,
              background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
            }}
          >
            <h2 id="faq-heading" style={{ margin: "0 0 4px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
              Frequently asked questions
            </h2>
            <div style={{ marginTop: 4 }}>
              {faqs.map((item) => (
                <details
                  key={item.question}
                  style={{ borderTop: "1px solid #e7edf3" }}
                  className="group"
                >
                  <summary
                    style={{
                      minHeight: 50, display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: 16,
                      color: "#102033", cursor: "pointer",
                      fontSize: 14, fontWeight: 850, listStyle: "none",
                    }}
                    className="[&::-webkit-details-marker]:hidden"
                  >
                    {item.question}
                    <span style={{ color: "#1769e0", fontWeight: 900, flexShrink: 0, fontSize: 20, lineHeight: 1 }} className="group-open:hidden">+</span>
                    <span style={{ color: "#1769e0", fontWeight: 900, flexShrink: 0, fontSize: 20, lineHeight: 1 }} className="hidden group-open:block">−</span>
                  </summary>
                  <p style={{ margin: "0 0 15px", color: "#52616f", fontSize: 14, lineHeight: 1.65 }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── Sources ────────────────────────────────────────────────── */}
        {legalSources.length > 0 && (
          <section
            aria-labelledby="sources-heading"
            style={{
              marginTop: 28, border: "1px solid #c8d9ea", borderRadius: 10,
              background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
            }}
          >
            <h2 id="sources-heading" style={{ margin: "0 0 16px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
              Legal basis and primary sources
            </h2>
            {legalSources.map((src) => (
              <div
                key={src.url}
                style={{
                  display: "grid", gridTemplateColumns: "110px 1fr",
                  gap: 12, alignItems: "center",
                  borderTop: "1px solid #e7edf3", padding: "12px 0",
                  color: "#52616f", fontSize: 13,
                }}
              >
                <span
                  style={{
                    display: "inline-flex", alignItems: "center",
                    border: "1px solid #c8d9ea", borderRadius: 999,
                    background: "#f8fbff", color: "#16324f",
                    padding: "5px 8px", fontSize: 11,
                    textTransform: "uppercase", letterSpacing: ".04em",
                    fontWeight: 700, whiteSpace: "nowrap",
                  }}
                >
                  {src.type}
                </span>
                <span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1769e0", fontWeight: 700, fontSize: 13 }}
                  >
                    {src.label}
                  </a>
                  {src.section && (
                    <span style={{ display: "block", color: "#52616f", fontSize: 12, marginTop: 2 }}>
                      {src.section}
                    </span>
                  )}
                </span>
              </div>
            ))}
            <p style={{ margin: "12px 0 0", color: "#7a8794", fontSize: 11, lineHeight: 1.6 }}>
              All statutory figures are sourced directly from official government legislation and guidance.{" "}
              <Link href="/methodology" style={{ color: "#1769e0" }}>See our methodology →</Link>
            </p>
          </section>
        )}

        {/* ── Related tools and guides ────────────────────────────────── */}
        {(related.length > 0 || (learnMore && (learnMore.guideSlug || learnMore.faqs.length > 0))) && (
          <section
            aria-labelledby="related-heading"
            style={{
              marginTop: 28, border: "1px solid #c8d9ea", borderRadius: 10,
              background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
            }}
          >
            <h2 id="related-heading" style={{ margin: "0 0 4px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
              Related tools and guides
            </h2>

            {learnMore?.guideSlug && learnMore.guideTitle && (
              <Link
                href={`/guides/${learnMore.guideSlug}`}
                style={RELATED_ROW_STYLE}
              >
                <strong style={{ color: "#102033" }}>{learnMore.guideTitle}</strong>
                <span style={{ color: "#1769e0" }}>→</span>
              </Link>
            )}

            {learnMore?.faqs.map((faq) => (
              <Link key={faq.slug} href={`/faq/${faq.slug}`} style={RELATED_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{faq.question}</strong>
                <span style={{ color: "#1769e0" }}>→</span>
              </Link>
            ))}

            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} style={RELATED_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{r.name}</strong>
                <span style={{ color: "#1769e0" }}>→</span>
              </Link>
            ))}
          </section>
        )}

        {/* Ad slot 2 — below content */}
        <AdSlot slot="6483920154" format="rectangle" className="mt-8 max-w-sm" />

        {/* Disclaimer callout */}
        <div
          style={{
            marginTop: 28, border: "1px solid #f1d9aa", borderRadius: 10,
            background: "#fff4df", padding: 18, color: "#5d461d", fontSize: 13,
          }}
        >
          <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 5 }}>Educational estimates only</strong>
          Results are approximate and for guidance purposes only. They do not constitute legal or financial advice.
          Statutory rates are based on {verifiedLabel ? `figures verified ${verifiedLabel}` : "current published rates"} from {source.label}.{" "}
          <Link href="/disclaimer" style={{ color: "#b7791f", fontWeight: 700 }}>Read the full disclaimer →</Link>
        </div>
      </main>
    </>
  );
}

const PILL_STYLE: React.CSSProperties = {
  display: "inline-flex", alignItems: "center",
  minHeight: 34, border: "1px solid #c8d9ea", borderRadius: 999,
  background: "#fff", color: "#25384c",
  padding: "0 11px", fontSize: 12, fontWeight: 850,
  whiteSpace: "nowrap",
};

const RELATED_ROW_STYLE: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  gap: 12, border: "1px solid #e7edf3", borderRadius: 8,
  background: "#f7fafc", padding: "13px 14px",
  color: "#25384c", fontSize: 13, fontWeight: 850,
  marginTop: 10, textDecoration: "none",
};
