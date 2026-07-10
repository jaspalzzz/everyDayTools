"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPost, type BlogCategory } from "@/data/blogPosts";
import { HeroSketchScene } from "@/components/HeroSketchScene";

// ── Display groups matching the reference design ──────────────────────────────
const DISPLAY_GROUPS: { label: string; description: string; categories: BlogCategory[] }[] = [
  {
    label: "Redundancy",
    description: "Redundancy pay, consultation rights, settlement agreements and what happens when a job ends.",
    categories: ["redundancy"],
  },
  {
    label: "Pay Rights",
    description: "Minimum wage, final pay, payslips, deductions, overtime and unlawful withholding.",
    categories: ["pay-rights", "leaving-job", "tax"],
  },
  {
    label: "Parental Leave & Workplace Rights",
    description: "Maternity, paternity, dismissal, discrimination, whistleblowing and workplace changes.",
    categories: ["parental-leave", "workplace-rights", "employment-law-changes"],
  },
];

const COUNTRY_OPTIONS = [
  { value: "all", label: "All countries" },
  { value: "UK",  label: "United Kingdom" },
  { value: "US",  label: "United States" },
  { value: "CA",  label: "Canada" },
  { value: "AU",  label: "Australia" },
];

const TOPIC_OPTIONS = [
  { value: "all",                  label: "All topics" },
  { value: "redundancy",           label: "Redundancy" },
  { value: "pay-rights",           label: "Pay rights" },
  { value: "parental-leave",       label: "Parental leave" },
  { value: "tax",                  label: "Tax & pay" },
  { value: "leaving-job",          label: "Leaving a job" },
  { value: "workplace-rights",     label: "Workplace rights" },
  { value: "employment-law-changes", label: "Law changes" },
];

const CALC_LINKS = [
  { label: "Redundancy pay",           href: "/redundancy-pay-calculator" },
  { label: "Final paycheck deadline",  href: "/final-paycheck-deadline-calculator" },
  { label: "Overtime pay",             href: "/take-home-overtime-calculator" },
  { label: "Sick pay",                 href: "/statutory-sick-pay-calculator" },
];

// Country badge pill
function CountryBadge({ region }: { region: string }) {
  return (
    <span style={{
      border: "1px solid #A6C2E0", borderRadius: 7, background: "#FBF9F3",
      color: "#16324f", padding: "4px 7px", fontSize: 11, fontWeight: 950,
      letterSpacing: ".04em", textTransform: "uppercase" as const,
    }}>
      {region}
    </span>
  );
}

// Article card in the 2-col grid
function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{
        minHeight: 190, border: "1px solid #E4DECF", borderRadius: 10, background: "#fff",
        padding: 17, display: "flex", flexDirection: "column", justifyContent: "space-between",
        textDecoration: "none",
      }}
      className="hover:border-[#A6C2E0] transition-colors"
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, color: "#52616f", fontSize: 12, fontWeight: 800 }}>
          <CountryBadge region={post.region} />
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        <h3 style={{ margin: "0 0 8px", color: "#102033", fontSize: 17, lineHeight: 1.25, fontWeight: 800 }}>
          {post.title}
        </h3>
        <p style={{ margin: 0, color: "#52616f", fontSize: 13, lineHeight: 1.5 }}>
          {post.excerpt}
        </p>
      </div>
      <span style={{ marginTop: 16, color: "#163C6B", fontSize: 13, fontWeight: 900 }}>
        Read article →
      </span>
    </Link>
  );
}

export function NewsIndex() {
  const [searchQ, setSearchQ]   = useState("");
  const [country, setCountry]   = useState("all");
  const [topic, setTopic]       = useState("all");
  const [searchInput, setSearchInput] = useState("");

  // Featured post = first redundancy article (guaranteed to exist in current data)
  const featuredPost = (BLOG_POSTS.find((p) => p.category === "redundancy") ?? BLOG_POSTS[0])!;

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      if (p.slug === featuredPost.slug) return false; // always separate
      if (country !== "all" && p.region !== country) return false;
      if (topic !== "all" && p.category !== topic) return false;
      if (searchQ) {
        const q = searchQ.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQ, country, topic, featuredPost.slug]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchQ(searchInput);
  }

  const isFiltering = searchQ !== "" || country !== "all" || topic !== "all";

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid #EAE5D8",
          background: "radial-gradient(circle at 84% 16%,rgba(30,78,140,.10),transparent 30%),linear-gradient(180deg,#fff 0%,#FBF9F3 100%)",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px]"
          style={{ maxWidth: 1180, margin: "0 auto", padding: "58px 24px 42px", gap: 46, alignItems: "end" }}
        >
          <div>
            <nav style={{ marginBottom: 14, fontSize: 12, color: "#52616f", fontWeight: 700 }}>
              <Link href="/" style={{ color: "#52616f", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 6px" }}>/</span>
              <span style={{ color: "#102033" }}>News</span>
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1E4E8C", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 900, color: "#1E4E8C", letterSpacing: ".08em", textTransform: "uppercase" as const }}>
                Employment law updates, explained
              </span>
            </div>
            <h1 style={{ margin: "0 0 16px", maxWidth: 820, fontSize: "clamp(42px,5.4vw,68px)", lineHeight: 1, fontWeight: 900, color: "#102033" }}>
              News that helps people understand pay rights.
            </h1>
            <p style={{ margin: 0, maxWidth: 750, color: "#52616f", fontSize: 18, lineHeight: 1.62 }}>
              Articles explain changes in employment pay law, statutory rates and workplace rights across the UK, US, Canada and Australia.{" "}
              <strong style={{ color: "#16324f", fontWeight: 850 }}>
                This is not a generic blog — it is an editorial layer that points people to the right calculator or guide.
              </strong>
            </p>
          </div>

          {/* Editorial standard card */}
          <aside
            className="hidden lg:block"
            style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", boxShadow: "0 18px 44px rgba(16,32,51,.10)", padding: 20 }}
          >
            <h2 style={{ margin: "0 0 10px", color: "#102033", fontSize: 18, lineHeight: 1.2, fontWeight: 850 }}>
              Editorial standard
            </h2>
            <p style={{ margin: 0, color: "#52616f", fontSize: 13, fontWeight: 700, lineHeight: 1.55 }}>
              Every article shows country, topic, update date, source basis, and the next useful calculator.
            </p>
          </aside>
        </div>
      </section>

      {/* ── Filter band ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1180, margin: "-22px auto 0", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <form
          aria-label="Find news articles"
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-[1fr_160px_180px_52px]"
          style={{
            border: "1px solid #E4DECF", borderRadius: 10, background: "#fff",
            boxShadow: "0 14px 32px rgba(16,32,51,.08)", padding: 14, gap: 10,
          }}
        >
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search: redundancy, PTO payout, final paycheck, sick pay"
            aria-label="Search news"
            style={{
              minHeight: 50, border: "1px solid var(--color-control-border)", borderRadius: 8,
              background: "#fff", color: "#102033", padding: "0 14px", outline: "none", fontSize: 14,
            }}
          />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-label="Country"
            style={{
              minHeight: 50, border: "1px solid var(--color-control-border)", borderRadius: 8,
              background: "#fff", color: "#102033", padding: "0 14px", outline: "none", fontSize: 14,
            }}
          >
            {COUNTRY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Topic"
            style={{
              minHeight: 50, border: "1px solid var(--color-control-border)", borderRadius: 8,
              background: "#fff", color: "#102033", padding: "0 14px", outline: "none", fontSize: 14,
            }}
          >
            {TOPIC_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            type="submit"
            aria-label="Search"
            style={{
              minHeight: 50, borderRadius: 8, background: "#1E4E8C", color: "#fff",
              border: "none", fontSize: 20, fontWeight: 900, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
            →
          </button>
        </form>
      </div>

      {/* ── Content layout ───────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px]"
        style={{ maxWidth: 1180, margin: "36px auto 0", padding: "0 24px 64px", gap: 32, alignItems: "start" }}
      >
        {/* Main column */}
        <section aria-label="Employment law news">

          {/* Featured article card (hidden when filtering) */}
          {!isFiltering && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              style={{
                display: "block", border: "1px solid #E4DECF", borderRadius: 10, background: "#fff",
                boxShadow: "0 18px 44px rgba(16,32,51,.10)", overflow: "hidden", marginBottom: 24,
                textDecoration: "none",
              }}
            >
              <div style={{
                position: "relative", overflow: "hidden",
                minHeight: 230, display: "grid", alignContent: "end", padding: 24, color: "#fff",
                background: "linear-gradient(180deg,rgba(16,32,51,.18) 0%,rgba(16,32,51,.86) 100%),linear-gradient(135deg,#0f2338 0%,#16324f 55%,#1E4E8C 100%)",
              }}>
                <HeroSketchScene />
                <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, alignItems: "center" }}>
                  <span style={{ background: "rgba(255,255,255,.18)", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 900, letterSpacing: ".04em" }}>
                    {featuredPost.region}
                  </span>
                  <span style={{ background: "rgba(255,255,255,.18)", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 900, letterSpacing: ".04em" }}>
                    {BLOG_CATEGORIES[featuredPost.category].label}
                  </span>
                  <span style={{ background: "rgba(255,255,255,.18)", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 900, letterSpacing: ".04em" }}>
                    2026 update
                  </span>
                </div>
                <h2 style={{ position: "relative", maxWidth: 720, margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 850 }}>
                  {featuredPost.title}
                </h2>
              </div>
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ padding: "18px 22px", gap: 18 }}
              >
                <p style={{ margin: 0, color: "#25384c", fontSize: 15, flex: 1, lineHeight: 1.5 }}>
                  {featuredPost.excerpt}
                </p>
                <span style={{
                  flexShrink: 0, minHeight: 44, display: "inline-flex", alignItems: "center",
                  justifyContent: "center", borderRadius: 8, background: "#1E4E8C",
                  color: "#fff", padding: "0 15px", fontSize: 13, fontWeight: 900, whiteSpace: "nowrap",
                }}>
                  Read article →
                </span>
              </div>
            </Link>
          )}

          {/* Article groups */}
          {isFiltering ? (
            /* Flat search results */
            <div>
              <h2 style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </h2>
              <p style={{ margin: "0 0 16px", color: "#52616f", fontSize: 14 }}>
                {filtered.length === 0 ? "No articles match your search. Try adjusting the filters." : ""}
              </p>
              {filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filtered.map((post) => <ArticleCard key={post.slug} post={post} />)}
                </div>
              )}
            </div>
          ) : (
            DISPLAY_GROUPS.map((group, gi) => {
              const posts = BLOG_POSTS.filter(
                (p) => group.categories.includes(p.category) && p.slug !== featuredPost.slug
              );
              if (posts.length === 0) return null;
              return (
                <section key={group.label} style={{ marginTop: gi === 0 ? 0 : 30 }}>
                  <h2 style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
                    {group.label}
                  </h2>
                  <p style={{ margin: "0 0 12px", color: "#52616f", fontSize: 14 }}>
                    {group.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {posts.map((post) => <ArticleCard key={post.slug} post={post} />)}
                  </div>
                </section>
              );
            })
          )}
        </section>

        {/* Side rail */}
        <aside
          className="hidden lg:grid gap-4"
          style={{ position: "sticky", top: 88 }}
          aria-label="Browse and tools"
        >
          {/* Read by country */}
          <section style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid #EAE5D8", background: "#FBF9F3" }}>
              <h2 style={{ margin: 0, color: "#102033", fontSize: 15, fontWeight: 850 }}>Read by country</h2>
            </div>
            <div className="grid grid-cols-2 gap-2" style={{ padding: 14 }}>
              {[
                { code: "UK", href: "/uk" },
                { code: "US", href: "/us" },
                { code: "CA", href: "/ca" },
                { code: "AU", href: "/au" },
              ].map((c) => (
                <Link
                  key={c.code}
                  href={c.href}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid #EAE5D8", borderRadius: 8, background: "#FBF9F3",
                    padding: "10px 0", textDecoration: "none",
                    fontSize: 13, fontWeight: 900, color: "#16324f",
                  }}
                  className="hover:border-[#A6C2E0] transition-colors"
                >
                  {c.code}
                </Link>
              ))}
            </div>
          </section>

          {/* Use a calculator next */}
          <section style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid #EAE5D8", background: "#FBF9F3" }}>
              <h2 style={{ margin: 0, color: "#102033", fontSize: 15, fontWeight: 850 }}>Use a calculator next</h2>
            </div>
            <div style={{ padding: "6px 0" }}>
              {CALC_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 24px", alignItems: "center",
                    padding: "11px 16px", borderBottom: "1px solid #f1f5f9",
                    textDecoration: "none", fontSize: 13, fontWeight: 700, color: "#102033",
                  }}
                  className="hover:bg-[#FBF9F3] transition-colors"
                >
                  <span>{l.label}</span>
                  <span style={{ color: "#1E4E8C", fontWeight: 900 }}>→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Editorial standard note */}
          <div style={{
            border: "1px solid #f1d9aa", borderRadius: 10, background: "#fff4df",
            padding: "14px 16px", fontSize: 13, color: "#3c2c0d", lineHeight: 1.55,
          }}>
            <strong style={{ display: "block", marginBottom: 5 }}>News standard</strong>
            The blog should not be broad content marketing. It should be timely rights analysis tied to countries, official sources and calculators.
          </div>
        </aside>
      </div>
    </>
  );
}
