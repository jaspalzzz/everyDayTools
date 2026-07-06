import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About MyPayRights — Law-Backed Employment Pay Calculators",
  description:
    "MyPayRights builds employment pay calculators backed by primary government sources for the UK, US, Canada, and Australia. Statutory rates, verified annually.",
  alternates: { canonical: `${SITE.url}/about` },
};

const CREDIBILITY_ROWS = [
  { label: "Country-aware logic", value: "UK · US · CA · AU" },
  { label: "Source discipline", value: "Official rates" },
  { label: "User privacy posture", value: "No signup first" },
  { label: "Advice boundary", value: "Estimate only" },
] as const;

const VALUE_CARDS = [
  {
    n: "1",
    title: "Practical before promotional",
    body: "People arrive with money questions, not curiosity about a company. The page must earn trust fast with tools that work, not marketing copy.",
  },
  {
    n: "2",
    title: "Country-specific by design",
    body: "Employment pay rights change by jurisdiction. Generic calculators are dangerous — they give the wrong answer for the wrong country.",
  },
  {
    n: "3",
    title: "Transparent about limits",
    body: "The product estimates rights and amounts. It should never pretend to replace legal advice or a qualified employment solicitor.",
  },
] as const;

const METHOD_STEPS = [
  { key: "A", title: "Source the rule", desc: "Start with official legislation, government guidance or statutory-rate publications — GOV.UK, DOL, Fair Work, Canada.ca." },
  { key: "B", title: "Map the calculator logic", desc: "Translate the rule into visible inputs, stated assumptions, caps and exceptions so users can verify the maths." },
  { key: "C", title: "Review on update cycles", desc: "Check rates around tax-year changes, annual wage updates and any major government rule changes." },
  { key: "D", title: "Correct quickly", desc: "Outdated or disputed figures should have a clear reporting path and be investigated within one working day." },
] as const;

const TRUST_SIGNALS = [
  { label: "Official-source basis", tag: "Required" },
  { label: "Last updated dates", tag: "Required" },
  { label: "Country jurisdiction shown", tag: "Required" },
  { label: "Advice disclaimer", tag: "Required" },
] as const;

const SOURCES = [
  { label: "GOV.UK and HMRC", href: "https://www.gov.uk/browse/working" },
  { label: "ACAS guidance", href: "https://www.acas.org.uk" },
  { label: "U.S. Department of Labor", href: "https://www.dol.gov/agencies/whd" },
  { label: "Fair Work Australia", href: "https://www.fairwork.gov.au" },
] as const;

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About My Pay Rights",
          url: `${SITE.url}/about`,
          description: "My Pay Rights builds law-backed employment pay calculators reviewed against official GOV.UK, U.S. DOL, and equivalent statutory sources.",
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          publisher: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            contactPoint: { "@type": "ContactPoint", email: SITE.contactEmail, contactType: "customer support" },
          },
          author: { "@type": "Person", name: "Jaspal Singh", jobTitle: "Founder", url: SITE.url },
        })}
      />

      {/* ── Hero ── */}
      <section
        style={{
          borderBottom: "1px solid #e7edf3",
          background: "radial-gradient(circle at 82% 14%,rgba(23,105,224,.10),transparent 30%),linear-gradient(180deg,#fff 0%,#f7fbff 100%)",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] items-end gap-10 lg:gap-12"
          style={{ maxWidth: 1180, margin: "0 auto", padding: "58px 24px 46px" }}
        >
          {/* Left */}
          <div>
            <nav aria-label="Breadcrumb" style={{ color: "#7a8794", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
              <Link href="/" style={{ color: "#7a8794" }}>Home</Link>
              {" / "}
              <span>About</span>
            </nav>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#16835b", fontSize: 12, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16835b", boxShadow: "0 0 0 5px rgba(22,131,91,.12)", flexShrink: 0 }} />
              Trust, method and limits
            </div>

            <h1 style={{ maxWidth: 820, margin: "14px 0 16px", color: "#102033", fontSize: "clamp(42px,5.4vw,68px)", lineHeight: 1, fontWeight: 850 }}>
              Built to make pay rights easier to check.
            </h1>

            <p style={{ maxWidth: 760, margin: 0, color: "#25384c", fontSize: 18, lineHeight: 1.62 }}>
              MyPayRights creates country-aware calculators and guides for employment pay
              questions: redundancy, notice, final wages, overtime, holiday pay, sick pay and
              parental leave.{" "}
              <strong style={{ color: "#16324f", fontWeight: 850 }}>
                The standard is simple: clear inputs, visible assumptions, official sources, and no false legal certainty.
              </strong>
            </p>
          </div>

          {/* Credibility card */}
          <aside
            className="hidden lg:block"
            style={{ border: "1px solid #c8d9ea", borderRadius: 10, background: "#fff", boxShadow: "0 18px 44px rgba(16,32,51,.10)", overflow: "hidden" }}
            aria-label="MyPayRights operating standards"
          >
            <header style={{ padding: "18px 20px", borderBottom: "1px solid #e7edf3", background: "#f8fbff" }}>
              <h2 style={{ margin: "0 0 4px", color: "#102033", fontSize: 18, fontWeight: 850 }}>Operating standard</h2>
              <p style={{ margin: 0, color: "#52616f", fontSize: 13, fontWeight: 700 }}>What the product must prove quickly.</p>
            </header>
            <div style={{ display: "grid", padding: "8px 20px 18px" }}>
              {CREDIBILITY_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex", justifyContent: "space-between", gap: 16,
                    borderBottom: i < CREDIBILITY_ROWS.length - 1 ? "1px solid #e7edf3" : "none",
                    padding: "12px 0", color: "#52616f", fontSize: 13, fontWeight: 700,
                  }}
                >
                  <span>{row.label}</span>
                  <strong style={{ color: "#102033", textAlign: "right", fontWeight: 850 }}>{row.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── Main ── */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 24px 74px" }}>

        {/* 3-card lead grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: 34 }}>
          {VALUE_CARDS.map((card) => (
            <article
              key={card.n}
              style={{
                minHeight: 164, border: "1px solid #c8d9ea", borderRadius: 10,
                background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.06)", padding: 17,
              }}
            >
              <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 8, background: "#eaf3ff", color: "#1769e0", fontSize: 13, fontWeight: 900 }}>
                {card.n}
              </span>
              <strong style={{ display: "block", color: "#102033", fontSize: 18, lineHeight: 1.2, margin: "12px 0 7px", fontWeight: 850 }}>
                {card.title}
              </strong>
              <p style={{ margin: 0, color: "#52616f", fontSize: 13 }}>{card.body}</p>
            </article>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-8 items-start">

          {/* Main prose column */}
          <div>
            {/* Why this exists */}
            <section style={{ paddingBottom: 30, marginBottom: 30, borderBottom: "1px solid #e7edf3" }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>Why this exists</h2>
              <p style={{ margin: "0 0 15px", color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                Most employment pay problems begin with a simple question: am I owed money? The hard part
                is that the answer depends on the country, the employment status, the reason work ended,
                statutory rates, contractual terms and timing.
              </p>
              <p style={{ margin: 0, color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                MyPayRights turns those questions into focused calculators and plain-English guides so a
                person can understand the likely range before speaking to HR, payroll, ACAS, a lawyer, or
                a government agency.
              </p>
            </section>

            {/* Who built this */}
            <section style={{ paddingBottom: 30, marginBottom: 30, borderBottom: "1px solid #e7edf3" }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>Who built this</h2>
              <p style={{ margin: "0 0 15px", color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                MyPayRights was founded by Jaspal Singh, a software engineer focused on making employment
                pay rules easier for ordinary workers and small employers to understand.
              </p>
              <p style={{ margin: 0, color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                The credibility comes from disciplined sources, careful assumptions, and fast correction
                when a rate or rule is wrong. If you spot a figure that looks off, email{" "}
                <a href={`mailto:${SITE.contactEmail}`} style={{ color: "#0f56bd", fontWeight: 800, textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {SITE.contactEmail}
                </a>{" "}
                — errors are investigated within one working day.
              </p>
            </section>

            {/* How rates are verified */}
            <section style={{ paddingBottom: 30, marginBottom: 30, borderBottom: "1px solid #e7edf3" }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>How rates are verified</h2>
              <p style={{ margin: "0 0 18px", color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                Statutory figures are sourced from official government publications wherever possible —
                GOV.UK, HMRC, ACAS, the U.S. Department of Labor, Canadian employment standards and
                Australian Fair Work material. Each tool page shows the source and the effective date.
              </p>
              {/* Method grid */}
              <div style={{ display: "grid", gap: 10 }}>
                {METHOD_STEPS.map((step) => (
                  <div
                    key={step.key}
                    style={{
                      display: "grid", gridTemplateColumns: "40px 1fr", gap: 14,
                      border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", padding: 14,
                    }}
                  >
                    <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 8, background: "#eaf3ff", color: "#1769e0", fontSize: 13, fontWeight: 900 }}>
                      {step.key}
                    </span>
                    <span>
                      <strong style={{ display: "block", color: "#102033", fontSize: 15, marginBottom: 3, fontWeight: 850 }}>{step.title}</strong>
                      <span style={{ color: "#52616f", fontSize: 13 }}>{step.desc}</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Why country-aware matters */}
            <section style={{ paddingBottom: 30, marginBottom: 30, borderBottom: "1px solid #e7edf3" }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>Why country-aware matters</h2>
              <p style={{ margin: "0 0 15px", color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                A PTO payout rule in California, a redundancy cap in the UK, a provincial termination
                rule in Canada and an Australian NES entitlement are not interchangeable. A premium
                pay-rights product must never blur those lines.
              </p>
              <p style={{ margin: 0, color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                That is why country selection is part of the core product experience, not decoration.
                Users should always know which jurisdiction is being used and when the calculation may
                depend on local or contractual details.
              </p>
            </section>

            {/* What this site is not */}
            <section>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>What this site is not</h2>
              <div
                style={{
                  border: "1px solid #f1d9aa", borderRadius: 10,
                  background: "#fff4df", padding: 18, color: "#5d461d", fontSize: 14, lineHeight: 1.7,
                }}
              >
                <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 6, fontSize: 15 }}>
                  Educational estimates, not legal advice
                </strong>
                The calculators provide general information and estimates. They do not replace legal,
                financial or tax advice. Complex cases, disputed employment status, enhanced contractual
                terms and litigation decisions need qualified advice from a solicitor, ACAS (UK), or
                the relevant government labour authority.
              </div>
            </section>
          </div>

          {/* Side rail */}
          <aside
            className="hidden lg:grid gap-4"
            style={{ position: "sticky", top: 88 }}
            aria-label="Trust signals and sources"
          >
            {/* Trust signals */}
            <section style={{ border: "1px solid #d8e2ec", borderRadius: 10, background: "#fff", padding: 18 }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 18, lineHeight: 1.2, fontWeight: 850 }}>Trust signals</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {TRUST_SIGNALS.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex", justifyContent: "space-between", gap: 10,
                      border: "1px solid #e7edf3", borderRadius: 8,
                      background: "#f6f9fc", padding: "9px 10px",
                      color: "#25384c", fontSize: 13, fontWeight: 850,
                    }}
                  >
                    {s.label}
                    <span style={{ color: "#0f56bd", fontWeight: 900 }}>{s.tag}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Source examples */}
            <section style={{ border: "1px solid #d8e2ec", borderRadius: 10, background: "#fff", padding: 18 }}>
              <h2 style={{ margin: "0 0 10px", color: "#102033", fontSize: 18, lineHeight: 1.2, fontWeight: 850 }}>Source examples</h2>
              <p style={{ margin: "0 0 13px", color: "#52616f", fontSize: 13 }}>
                Proof points used near relevant calculators and guide pages — not buried in a footer.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {SOURCES.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", justifyContent: "space-between", gap: 10,
                      border: "1px solid #e7edf3", borderRadius: 8,
                      background: "#f6f9fc", padding: "9px 10px",
                      color: "#25384c", fontSize: 13, fontWeight: 850, textDecoration: "none",
                    }}
                  >
                    {s.label}
                    <span style={{ color: "#0f56bd" }}>→</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Design note */}
            <section style={{ border: "1px solid #f1d9aa", borderRadius: 10, background: "#fff4df", padding: 16, color: "#5d461d", fontSize: 13 }}>
              <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 5 }}>Design standard</strong>
              The About page is a trust page — method, sources, correction policy, limits and mission. Not a founder essay.
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
