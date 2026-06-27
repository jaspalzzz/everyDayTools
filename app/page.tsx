import { HomeToolList } from "@/components/HomeToolList";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroResultCard } from "@/components/home/HeroResultCard";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BrowseBySituation } from "@/components/home/BrowseBySituation";
import { PopularCalculators } from "@/components/home/PopularCalculators";
import { BrowseByCategory } from "@/components/home/BrowseByCategory";
import { GuidesResources } from "@/components/home/GuidesResources";
import { homepageSchemas, jsonLd } from "@/lib/seo";

const BADGES = ["Law backed", "100% Free", "No signup", "Nothing stored"] as const;

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

      {/* Hero — radial tint background */}
      <section className="bg-[radial-gradient(circle_at_top_right,rgba(230,241,251,0.6)_0%,rgba(255,255,255,0)_60%)]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left */}
          <div>
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-ink">
              Know exactly<br />
              what <span className="text-brand-600">you&apos;re owed.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Free, law-backed calculators to help you understand your employment
              rights in the UK, US, Canada and Australia.
            </p>

            <div className="mb-10 mt-8 flex flex-wrap gap-6">
              {BADGES.map((b) => (
                <span key={b} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>

            <HeroSearch />
          </div>

          {/* Right */}
          <HeroResultCard />
        </div>
      </section>

      {/* Body sections */}
      <div className="mx-auto max-w-[1180px] px-6 pb-4">
        <div className="mt-10">
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

        {/* All calculators — searchable list */}
        <section id="all-calculators" className="mt-16 scroll-mt-20">
          <h2 className="mb-8 text-2xl font-bold text-ink">All calculators</h2>
          <main>
            <HomeToolList />
          </main>
        </section>

        <p className="mx-auto mt-12 max-w-lg text-center text-xs leading-relaxed text-ink-faint">
          All figures are estimates based on current statutory rates. Always confirm
          with your employer or a qualified adviser.{" "}
          <a href="/disclaimer" className="underline-offset-2 hover:underline">
            Read the disclaimer.
          </a>
        </p>
      </div>
    </>
  );
}
