import { HomeToolList } from "@/components/HomeToolList";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroResultCard } from "@/components/home/HeroResultCard";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BrowseBySituation } from "@/components/home/BrowseBySituation";
import { PopularCalculators } from "@/components/home/PopularCalculators";
import { BrowseByCategory } from "@/components/home/BrowseByCategory";
import { GuidesResources } from "@/components/home/GuidesResources";
import { homepageSchemas, jsonLd } from "@/lib/seo";

const TRUST_SIGNALS = [
  { icon: "✓", text: "No signup required" },
  { icon: "✓", text: "Private — no data stored" },
  { icon: "✓", text: "Updated for 2026 pay rates" },
  { icon: "✓", text: "UK · US · Canada · Australia" },
  { icon: "✓", text: "Educational estimates, not legal advice" },
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

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left */}
          <div>
            {/* Authority pill */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-surface-line bg-surface-muted px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Free · Law Backed · No Sign Up
            </div>

            <h1 className="text-[3rem] font-extrabold leading-[1.07] tracking-[-0.02em] text-ink">
              Know exactly<br />
              <span className="text-brand-600">what you&apos;re owed.</span>
            </h1>

            <p className="mt-4 max-w-[460px] text-[1rem] leading-[1.7] text-ink-soft">
              Redundancy pay, notice period, holiday pay, overtime — calculated against current employment law. No signup. No data stored. Updated for 2026.
            </p>

            {/* Trust signals — 2 col grid */}
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {TRUST_SIGNALS.map((t) => (
                <span key={t.text} className="flex items-center gap-1.5 text-[12px] font-medium text-ink-soft">
                  <span className="text-success font-bold text-[11px]">{t.icon}</span>
                  {t.text}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <HeroSearch />
            </div>
          </div>

          {/* Right */}
          <HeroResultCard />
        </div>
      </section>

      {/* Authority trust bar */}
      <div className="border-y border-surface-line bg-navy">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-3">
          <span className="text-[12px] font-semibold text-white/80 uppercase tracking-wider">Built on employment law for:</span>
          {["🇬🇧 United Kingdom", "🇺🇸 United States", "🇨🇦 Canada", "🇦🇺 Australia"].map((c) => (
            <span key={c} className="text-[13px] font-semibold text-white">{c}</span>
          ))}
          <span className="text-[11px] text-white/50">Updated 2026</span>
        </div>
      </div>

      {/* Body sections */}
      <div className="bg-surface-muted">
        <div className="mx-auto max-w-[1180px] px-6 pb-12">
          <div className="pt-10">
            <HowItWorks />
          </div>
          <div className="mt-14">
            <BrowseBySituation />
          </div>
          <div className="mt-14">
            <PopularCalculators />
          </div>
          <div className="mt-14">
            <BrowseByCategory />
          </div>
          <div className="mt-14">
            <GuidesResources />
          </div>

          {/* All calculators */}
          <section id="all-calculators" className="mt-16 scroll-mt-20">
            <div className="mb-6">
              <h2 className="text-[1.375rem] font-bold tracking-tight text-ink">All calculators</h2>
              <p className="mt-1 text-[13px] text-ink-soft">Complete directory — filter by country or search by topic.</p>
            </div>
            <main>
              <HomeToolList />
            </main>
          </section>

          <p className="mx-auto mt-12 max-w-lg text-center text-[11px] leading-relaxed text-ink-faint">
            All figures are educational estimates based on current statutory rates and are not legal advice. Always confirm
            with your employer or a qualified adviser.{" "}
            <a href="/disclaimer" className="underline underline-offset-2 hover:text-ink">
              Read the disclaimer.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
