import { HomeToolList } from "@/components/HomeToolList";
import { HeroResultCard } from "@/components/home/HeroResultCard";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BrowseBySituation } from "@/components/home/BrowseBySituation";
import { PopularCalculators } from "@/components/home/PopularCalculators";
import { GuidesResources } from "@/components/home/GuidesResources";
import { homepageSchemas, jsonLd } from "@/lib/seo";

const TRUST = [
  "Law backed",
  "100% Free",
  "No signup",
  "Nothing stored",
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

      <div className="mx-auto max-w-5xl px-5">
        {/* Hero */}
        <section className="grid items-center gap-10 pb-6 pt-12 sm:pt-16 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
              Know exactly{" "}
              <span className="text-brand-600">what you&apos;re owed.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Free, law-backed calculators to help you understand your employment
              rights in the UK, US, Canada and Australia.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <HeroResultCard />
        </section>

        {/* How it works */}
        <HowItWorks />

        {/* Browse by situation */}
        <BrowseBySituation />

        {/* Popular calculators */}
        <PopularCalculators />

        {/* Guides & resources */}
        <GuidesResources />

        {/* All calculators — searchable list */}
        <section id="all-calculators" className="mt-16 scroll-mt-6">
          <h2 className="mb-6 text-center text-lg font-semibold text-ink">All calculators</h2>
          <main>
            <HomeToolList />
          </main>
        </section>

        {/* Disclaimer */}
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
