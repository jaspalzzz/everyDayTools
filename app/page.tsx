import { HomeToolList } from "@/components/HomeToolList";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroResultCard } from "@/components/home/HeroResultCard";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BrowseBySituation } from "@/components/home/BrowseBySituation";
import { PopularCalculators } from "@/components/home/PopularCalculators";
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
      <section
        style={{
          background: "radial-gradient(circle at 78% 20%, rgba(23,105,224,.10), transparent 28%), linear-gradient(180deg,#ffffff 0%,#f8fbff 74%,#f7fafc 100%)",
          borderBottom: "1px solid #e7edf3",
        }}
      >
        <div
          className="mx-auto grid items-center gap-[68px] px-6"
          style={{
            maxWidth: 1180,
            minHeight: 620,
            padding: "74px 24px 54px",
            gridTemplateColumns: "minmax(0,1.02fr) minmax(410px,.78fr)",
          }}
        >
          {/* Left */}
          <div>
            {/* Eyebrow */}
            <div
              className="mb-5 inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[.08em]"
              style={{ color: "#16835b" }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "#16835b", boxShadow: "0 0 0 5px rgba(22,131,91,.12)" }}
              />
              Private pay-rights calculators
            </div>

            <h1
              className="font-extrabold text-ink"
              style={{ fontSize: "clamp(44px,6vw,76px)", lineHeight: 0.96, maxWidth: 650, margin: "18px 0" }}
            >
              Know what your employer owes you.
            </h1>

            <p
              className="m-0"
              style={{ maxWidth: 610, color: "#25384c", fontSize: 19, lineHeight: 1.62 }}
            >
              Check unpaid wages, notice pay, redundancy pay, holiday pay, sick pay and final paycheck deadlines with{" "}
              <strong style={{ color: "#16324f", fontWeight: 800 }}>
                country-aware estimates for the UK, US, Canada and Australia.
              </strong>
            </p>

            {/* Start panel */}
            <div className="mt-8 max-w-[640px]">
              <HeroSearch />
            </div>

            {/* Trust row — 4 cards */}
            <div
              className="mt-5 grid max-w-[640px] gap-2.5"
              style={{ gridTemplateColumns: "repeat(4,1fr)" }}
            >
              {TRUST_ROW.map((t) => (
                <div
                  key={t.title}
                  className="rounded-lg p-3"
                  style={{
                    border: "1px solid #e7edf3",
                    background: "rgba(255,255,255,.78)",
                    color: "#52616f",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  <strong style={{ display: "block", color: "#102033", fontSize: 13, marginBottom: 2 }}>
                    {t.title}
                  </strong>
                  {t.sub}
                </div>
              ))}
            </div>
          </div>

          {/* Right — estimate card */}
          <HeroResultCard />
        </div>
      </section>

      {/* ── Body ── */}
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "54px 24px 76px" }}>

        {/* Situation paths */}
        <BrowseBySituation />

        {/* Popular calculators + rights panel */}
        <div className="mt-[50px]">
          <PopularCalculators />
        </div>

        {/* Guides */}
        <div className="mt-[58px]">
          <GuidesResources />
        </div>

        {/* All calculators directory */}
        <section id="all-calculators" className="mt-[58px] scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-[1.625rem] font-bold text-ink">All calculators</h2>
            <p className="mt-1.5 text-[15px]" style={{ color: "#52616f" }}>
              Complete directory — filter by country or search by topic.
            </p>
          </div>
          <HomeToolList />
        </section>

        {/* Disclaimer */}
        <p
          className="mx-auto mt-12 max-w-lg text-center text-[11px] leading-relaxed"
          style={{ color: "#8A9BA8" }}
        >
          All figures are educational estimates based on current statutory rates and are not legal advice. Always confirm
          with your employer or a qualified adviser.{" "}
          <a href="/disclaimer" className="underline underline-offset-2 hover:text-ink-soft">
            Read the disclaimer.
          </a>
        </p>
      </main>
    </>
  );
}
