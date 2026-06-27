import { HomeToolList } from "@/components/HomeToolList";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroResultCard } from "@/components/home/HeroResultCard";
import { BrowseBySituation } from "@/components/home/BrowseBySituation";
import { PopularCalculators } from "@/components/home/PopularCalculators";
import { BrowseByCategory } from "@/components/home/BrowseByCategory";
import { GuidesResources } from "@/components/home/GuidesResources";
import { homepageSchemas, jsonLd } from "@/lib/seo";

const TRUST_ROW = [
  { title: "No signup", sub: "Start privately" },
  { title: "Law-based", sub: "By country" },
  { title: "Updated", sub: "2026 rules" },
  { title: "Clear next step", sub: "Know what to ask" },
] as const;

export default function HomePage() {
  const [websiteSchema, orgSchema] = homepageSchemas();
  return (
    <>
      <a
        href="#all-calculators"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
      >
        Skip to calculators
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(orgSchema)} />

      {/* ── Hero ── */}
      <section style={{ background: "radial-gradient(circle at 78% 20%,rgba(23,105,224,.10),transparent 28%),linear-gradient(180deg,#ffffff 0%,#f8fbff 74%,#f7fafc 100%)", borderBottom: "1px solid #e7edf3" }}>
        <div style={{ maxWidth: 1180, minHeight: 620, margin: "0 auto", padding: "74px 24px 54px", display: "grid", gridTemplateColumns: "minmax(0,1.02fr) minmax(410px,.78fr)", alignItems: "center", gap: 68 }}>

          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#16835b", fontSize: 12, fontWeight: 850, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16835b", boxShadow: "0 0 0 5px rgba(22,131,91,.12)", flexShrink: 0 }} />
              Private pay-rights calculators
            </div>

            <h1 style={{ maxWidth: 650, margin: "18px 0 18px", color: "#102033", fontSize: "clamp(44px,6vw,76px)", lineHeight: .96, letterSpacing: 0, fontWeight: 800 }}>
              Know what your employer owes you.
            </h1>

            <p style={{ maxWidth: 610, margin: 0, color: "#25384c", fontSize: 19, lineHeight: 1.62 }}>
              Check unpaid wages, notice pay, redundancy pay, holiday pay, sick pay and final paycheck deadlines with{" "}
              <strong style={{ color: "#16324f", fontWeight: 800 }}>country-aware estimates for the UK, US, Canada and Australia.</strong>
            </p>

            {/* Start panel */}
            <div style={{ maxWidth: 640, marginTop: 32 }}>
              <HeroSearch />
            </div>

            {/* Trust row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 20, maxWidth: 640 }}>
              {TRUST_ROW.map((t) => (
                <div key={t.title} style={{ border: "1px solid #e7edf3", borderRadius: 8, background: "rgba(255,255,255,.78)", padding: 12, color: "#52616f", fontSize: 12, fontWeight: 700 }}>
                  <strong style={{ display: "block", color: "#102033", fontSize: 13, marginBottom: 2 }}>{t.title}</strong>
                  {t.sub}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — estimate card */}
          <HeroResultCard />
        </div>
      </section>

      {/* ── Main ── */}
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "54px 24px 76px" }}>

        {/* Start with what happened */}
        <BrowseBySituation />

        {/* Most used calculators + rights panel */}
        <PopularCalculators />

        {/* Category band */}
        <BrowseByCategory />

        {/* Guides */}
        <GuidesResources />

      </main>
    </>
  );
}
