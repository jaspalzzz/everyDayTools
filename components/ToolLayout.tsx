import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot } from "./AdSlot";
import { EditorialReview } from "./EditorialReview";
import { relatedTools, CATEGORY_META, type ToolMeta } from "@/data/tools";
import { situationsForTool, guidesForTool, comparesForTool, pillarForTool } from "@/data/relatedContent";
import type { FaqItem, SourceRef } from "@/lib/types";
import { LEGAL_SOURCES } from "@/data/legalSources";
import { SITE } from "@/lib/seo";

export interface LearnMoreMeta {
  guideSlug?: string;
  guideTitle?: string;
  faqs: Array<{ slug: string; question: string }>;
}

export interface MethodologyCard {
  title: string;
  desc: string;
}

export interface MeaningPanel {
  low: string;
  typical: string;
  high: string;
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
  meaningPanel,
}: {
  tool: ToolMeta;
  calculator: ReactNode;
  contentBlock: ReactNode;
  faqs: FaqItem[];
  source: SourceRef;
  verifiedDate?: string;
  learnMore?: LearnMoreMeta;
  methodologyCards?: MethodologyCard[];
  /** Optional Low / Typical / High interpretation grid shown below the calculator. */
  meaningPanel?: MeaningPanel;
}) {
  const related = relatedTools(tool.slug);
  const situations = situationsForTool(tool.slug);
  // Derived cross-links (deduped against the manually-set learnMore guide).
  const derivedGuides = guidesForTool(tool.slug).filter((g) => g.slug !== learnMore?.guideSlug).slice(0, 2);
  const compares = comparesForTool(tool.slug);
  const pillar = pillarForTool(tool.slug);

  const verifiedLabel = verifiedDate
    ? new Date(verifiedDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;

  const legalSources = LEGAL_SOURCES[tool.slug] ?? [];
  const showExitKit = tool.category === "leaving-job";

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid #EAE5D8",
          background:
            "radial-gradient(circle at 82% 18%,rgba(30,78,140,.10),transparent 30%),linear-gradient(180deg,#fff 0%,#FBF9F3 100%)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1180, padding: "46px 24px 34px" }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ color: "#7a8794", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
            <span style={{ margin: "0 6px" }}>/</span>
            <Link href="/#all-calculators" style={{ color: "inherit" }}>{CATEGORY_META[tool.category].label}</Link>
            <span style={{ margin: "0 6px" }}>/</span>
            <span style={{ color: "#52616f" }}>{tool.shortName}</span>
          </nav>

          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "#16835b", fontSize: 12, fontWeight: 900,
              letterSpacing: ".08em", textTransform: "uppercase",
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
              fontSize: "clamp(38px,4.8vw,58px)", lineHeight: 1.03,
              fontWeight: 800,
            }}
          >
            {tool.name}
          </h1>

          {/* Description */}
          <p style={{ maxWidth: 760, margin: 0, color: "#25384c", fontSize: 17, lineHeight: 1.62 }}>
            {tool.description}{" "}
            <strong style={{ color: "#16324f", fontWeight: 800 }}>
              This is an educational estimate, not legal advice.
            </strong>
          </p>

          {/* Trust strip */}
          <div aria-label="Calculator trust signals" style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 18 }}>
            {tool.region.split("/").map((r) => (
              <span key={r} style={PILL_STYLE}>{r.trim()} rules</span>
            ))}
            {verifiedLabel && (
              <span style={PILL_STYLE}>Last reviewed {verifiedLabel}</span>
            )}
            <span style={PILL_STYLE}>Private estimate</span>
            <span style={PILL_STYLE}>No signup</span>
            <Link href="/methodology" style={{ ...PILL_STYLE, color: "#1E4E8C", borderColor: "#A6C2E0", background: "#EAF0F8" }}>
              Methodology →
            </Link>
            <Link href="/editorial-policy" style={{ ...PILL_STYLE, color: "#1E4E8C", borderColor: "#A6C2E0", background: "#EAF0F8" }}>
              Editorial review →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 76px" }}>

        {/* Calculator: form (left) + result panel (right) — grid managed inside each calculator component */}
        <section aria-label={`${tool.shortName} calculator`}>
          {calculator}
        </section>

        <EditorialReview
          lastReviewed={verifiedDate}
          sourceLabel={source.label}
          className="mt-6"
        />

        <section
          aria-label="Review and correction details"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          style={{ marginTop: 24 }}
        >
          <div style={TRUST_CARD_STYLE}>
            <strong style={TRUST_CARD_TITLE_STYLE}>Editorial review</strong>
            <span style={TRUST_CARD_TEXT_STYLE}>Checked against official sources before publication</span>
          </div>
          <div style={TRUST_CARD_STYLE}>
            <strong style={TRUST_CARD_TITLE_STYLE}>Source basis</strong>
            <span style={TRUST_CARD_TEXT_STYLE}>Figures are linked to official sources below</span>
          </div>
          <div style={TRUST_CARD_STYLE}>
            <strong style={TRUST_CARD_TITLE_STYLE}>Corrections</strong>
            <Link href="/contact" style={{ ...TRUST_CARD_TEXT_STYLE, color: "#163C6B", fontWeight: 850 }}>
              Report a calculation or source issue
            </Link>
          </div>
        </section>

        {/* "What this estimate means" — Low / Typical / High */}
        {meaningPanel && (
          <section
            aria-label="What this estimate means"
            style={{
              marginTop: 24, border: "1px solid #E4DECF", borderRadius: 10,
              background: "#F5F1E8", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 18,
            }}
          >
            <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
              What this estimate means
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(["Low", "Typical", "High"] as const).map((tier) => (
                <div
                  key={tier}
                  style={{
                    border: "1px solid #E4DECF", borderRadius: 8,
                    background: "#fff", padding: 13,
                    color: "#52616f", fontSize: 13,
                  }}
                >
                  <strong style={{ display: "block", color: "#102033", marginBottom: 4 }}>{tier}</strong>
                  {meaningPanel[tier.toLowerCase() as "low" | "typical" | "high"]}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ad slot 1 — below tool */}
        <AdSlot slot="2957844781" format="rectangle" className="my-8 max-w-sm" />

        {showExitKit && (
          <section
            aria-labelledby="next-steps-heading"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            style={{ marginBottom: 28 }}
          >
            <div style={ACTION_BOX_STYLE}>
              <h2 id="next-steps-heading" style={ACTION_BOX_TITLE_STYLE}>Employer email template</h2>
              <p style={ACTION_BOX_TEXT_STYLE}>Subject: Request for final pay review</p>
              <p style={ACTION_BOX_TEXT_STYLE}>
                I am writing to ask you to review my final pay. Based on the information
                available to me, I believe the amount or deadline may not match the applicable
                rule. Please confirm the calculation, the pay period covered, any deductions,
                and the expected payment date.
              </p>
            </div>
            <div style={ACTION_BOX_STYLE}>
              <h2 style={ACTION_BOX_TITLE_STYLE}>Wage claim checklist</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
                {["Final payslip or pay statement", "Employment contract or handbook policy", "Dates worked and termination/resignation date", "Written request sent to employer", "Official state or country claim link"].map((item) => (
                  <li key={item} style={{ color: "#52616f", fontSize: 13, lineHeight: 1.5 }}>
                    <strong style={{ color: "#16835b" }}>OK</strong> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Methodology ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="methodology-heading"
          style={{
            border: "1px solid #E4DECF", borderRadius: 10,
            background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
          }}
        >
          <div style={{ color: "#25384c", fontSize: 15, lineHeight: 1.72 }}>
            {contentBlock}
          </div>

          {methodologyCards && methodologyCards.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, marginTop: 16 }}>
              {methodologyCards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    border: "1px solid #EAE5D8", borderRadius: 8,
                    background: "#F4F1E9", padding: 14,
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

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section
            aria-labelledby="faq-heading"
            style={{
              marginTop: 28, border: "1px solid #E4DECF", borderRadius: 10,
              background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
            }}
          >
            <h2 id="faq-heading" style={{ margin: "0 0 4px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
              Frequently asked questions
            </h2>
            {faqs.map((item, i) => (
              <details
                key={item.question}
                style={{ borderTop: i === 0 ? "none" : "1px solid #EAE5D8" }}
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
                  <span style={{ color: "#1E4E8C", fontWeight: 900, flexShrink: 0, fontSize: 20, lineHeight: 1 }} className="group-open:hidden">+</span>
                  <span style={{ color: "#1E4E8C", fontWeight: 900, flexShrink: 0, fontSize: 20, lineHeight: 1 }} className="hidden group-open:block">−</span>
                </summary>
                <p style={{ margin: "0 0 15px", color: "#52616f", fontSize: 14, lineHeight: 1.65 }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </section>
        )}

        {/* ── Sources ──────────────────────────────────────────────────── */}
        {legalSources.length > 0 && (
          <section
            aria-labelledby="sources-heading"
            style={{
              marginTop: 28, border: "1px solid #E4DECF", borderRadius: 10,
              background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
            }}
          >
            <h2 id="sources-heading" style={{ margin: "0 0 16px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
              Legal basis and primary sources
            </h2>
            {legalSources.map((src, i) => (
              <div
                key={src.url}
                className="grid grid-cols-1 sm:grid-cols-[130px_1fr_auto] gap-2 sm:gap-3 items-start sm:items-center"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid #EAE5D8",
                  padding: "12px 0",
                  color: "#52616f", fontSize: 13,
                }}
              >
                <span
                  style={{
                    display: "inline-flex", alignItems: "center",
                    border: "1px solid #E4DECF", borderRadius: 999,
                    background: "#FBF9F3", color: "#16324f",
                    padding: "5px 8px", fontSize: 11,
                    textTransform: "uppercase", letterSpacing: ".04em",
                    fontWeight: 700, whiteSpace: "nowrap",
                  }}
                >
                  {src.type}
                </span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1E4E8C", fontWeight: 700, fontSize: 13 }}
                >
                  {src.label}
                </a>
                <span style={{ color: "#52616f", fontSize: 12 }}>
                  {src.section ?? ""}
                </span>
              </div>
            ))}
            <p style={{ margin: "12px 0 0", color: "#7a8794", fontSize: 11, lineHeight: 1.6 }}>
              All statutory figures are sourced directly from official government legislation and guidance.{" "}
              <Link href="/methodology" style={{ color: "#1E4E8C" }}>See our methodology →</Link>
            </p>
          </section>
        )}

        <section
          aria-labelledby="review-history-heading"
          style={{
            marginTop: 28, border: "1px solid #E4DECF", borderRadius: 10,
            background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
          }}
        >
          <h2 id="review-history-heading" style={{ margin: "0 0 12px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
            Review history
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            {verifiedLabel && (
              <div className="grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)]" style={CHANGELOG_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{verifiedLabel}</strong>
                <span style={{ color: "#52616f" }}>
                  Rate figures and source links reviewed against the official source cited below.
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)]" style={CHANGELOG_ROW_STYLE}>
              <strong style={{ color: "#102033" }}>Editorial policy</strong>
              <span style={{ color: "#52616f" }}>
                Calculator logic is built from public legislation, government guidance, and regulator material.
                Advertising relationships do not influence statutory figures.{" "}
                <Link href="/editorial-policy" style={{ color: "#163C6B", fontWeight: 850 }}>
                  Read the editorial policy.
                </Link>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)]" style={CHANGELOG_ROW_STYLE}>
              <strong style={{ color: "#102033" }}>Correction path</strong>
              <span style={{ color: "#52616f" }}>
                If a rate or source has changed, email{" "}
                <a href={`mailto:${SITE.contactEmail}`} style={{ color: "#163C6B", fontWeight: 850, overflowWrap: "anywhere" }}>
                  {SITE.contactEmail}
                </a>{" "}
                with the page URL and official source.
              </span>
            </div>
          </div>
        </section>

        {/* ── Related tools ────────────────────────────────────────────── */}
        {(related.length > 0 || situations.length > 0 || derivedGuides.length > 0 || compares.length > 0 || pillar || (learnMore && (learnMore.guideSlug || learnMore.faqs.length > 0))) && (
          <section
            aria-labelledby="related-heading"
            style={{
              marginTop: 28, border: "1px solid #E4DECF", borderRadius: 10,
              background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.05)", padding: 22,
            }}
          >
            <h2 id="related-heading" style={{ margin: "0 0 4px", color: "#102033", fontSize: 22, lineHeight: 1.2 }}>
              Related tools and guides
            </h2>
            {learnMore?.guideSlug && learnMore.guideTitle && (
              <Link href={`/guides/${learnMore.guideSlug}`} style={RELATED_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{learnMore.guideTitle}</strong>
                <span style={{ color: "#1E4E8C" }}>→</span>
              </Link>
            )}
            {learnMore?.faqs.map((faq) => (
              <Link key={faq.slug} href={`/faq/${faq.slug}`} style={RELATED_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{faq.question}</strong>
                <span style={{ color: "#1E4E8C" }}>→</span>
              </Link>
            ))}
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} style={RELATED_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{r.name}</strong>
                <span style={{ color: "#1E4E8C" }}>→</span>
              </Link>
            ))}
            {situations.map((s) => (
              <Link key={s.slug} href={`/situations/${s.slug}`} style={RELATED_ROW_STYLE}>
                <span>
                  <strong style={{ color: "#102033" }}>{s.label}</strong>
                  <span style={{ display: "block", marginTop: 2, fontWeight: 600, color: "#5c7189", fontSize: 12 }}>
                    {s.blurb}
                  </span>
                </span>
                <span style={{ color: "#1E4E8C" }}>→</span>
              </Link>
            ))}
            {pillar && (
              <Link href={pillar.href} style={RELATED_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{pillar.label}</strong>
                <span style={{ color: "#1E4E8C" }}>→</span>
              </Link>
            )}
            {derivedGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} style={RELATED_ROW_STYLE}>
                <strong style={{ color: "#102033" }}>{g.title}</strong>
                <span style={{ color: "#1E4E8C" }}>→</span>
              </Link>
            ))}
            {compares.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} style={RELATED_ROW_STYLE}>
                <span>
                  <strong style={{ color: "#102033" }}>{c.label}</strong>
                  <span style={{ display: "block", marginTop: 2, fontWeight: 600, color: "#5c7189", fontSize: 12 }}>
                    {c.summary}
                  </span>
                </span>
                <span style={{ color: "#1E4E8C" }}>→</span>
              </Link>
            ))}
          </section>
        )}

        {/* Ad slot 2 */}
        <AdSlot slot="6483920154" format="rectangle" className="mt-8 max-w-sm" />

        {/* Disclaimer */}
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
  minHeight: 34, border: "1px solid #E4DECF", borderRadius: 999,
  background: "#fff", color: "#25384c",
  padding: "0 11px", fontSize: 12, fontWeight: 850,
  whiteSpace: "nowrap",
};

const RELATED_ROW_STYLE: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  gap: 12, border: "1px solid #EAE5D8", borderRadius: 8,
  background: "#F4F1E9", padding: "13px 14px",
  color: "#25384c", fontSize: 13, fontWeight: 850,
  marginTop: 10, textDecoration: "none",
};

const TRUST_CARD_STYLE: React.CSSProperties = {
  border: "1px solid #E4DECF",
  borderRadius: 8,
  background: "#fff",
  padding: 14,
};

const TRUST_CARD_TITLE_STYLE: React.CSSProperties = {
  display: "block",
  color: "#102033",
  fontSize: 13,
  marginBottom: 4,
};

const TRUST_CARD_TEXT_STYLE: React.CSSProperties = {
  display: "block",
  color: "#52616f",
  fontSize: 12,
  lineHeight: 1.5,
};

const ACTION_BOX_STYLE: React.CSSProperties = {
  border: "1px solid #E4DECF",
  borderRadius: 10,
  background: "#FBF9F3",
  padding: 18,
};

const ACTION_BOX_TITLE_STYLE: React.CSSProperties = {
  margin: "0 0 10px",
  color: "#102033",
  fontSize: 18,
  lineHeight: 1.2,
};

const ACTION_BOX_TEXT_STYLE: React.CSSProperties = {
  margin: "0 0 10px",
  color: "#52616f",
  fontSize: 13,
  lineHeight: 1.6,
};

const CHANGELOG_ROW_STYLE: React.CSSProperties = {
  gap: 12,
  border: "1px solid #EAE5D8",
  borderRadius: 8,
  background: "#F4F1E9",
  padding: 12,
  fontSize: 13,
  lineHeight: 1.55,
  minWidth: 0,
  overflowWrap: "anywhere",
};
