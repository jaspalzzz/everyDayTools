import { HomeToolList } from "@/components/HomeToolList";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroResultCard } from "@/components/home/HeroResultCard";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BrowseBySituation } from "@/components/home/BrowseBySituation";
import { PopularCalculators } from "@/components/home/PopularCalculators";
import { BrowseByCategory } from "@/components/home/BrowseByCategory";
import { GuidesResources } from "@/components/home/GuidesResources";
import { homepageSchemas, jsonLd } from "@/lib/seo";

const TRUST_BADGES = [
  { label: "100% Free",       color: "text-emerald-500" },
  { label: "Law Backed",      color: "text-emerald-500" },
  { label: "No Sign Up",      color: "text-emerald-500" },
  { label: "Private & Secure",color: "text-emerald-500" },
  { label: "Fast Results",    color: "text-emerald-500" },
] as const;

function CheckIcon({ className }: { className: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

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
      <section className="bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(214,233,251,0.45)_0%,rgba(255,255,255,0)_70%)]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-14 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* Left */}
          <div>
            {/* Top tagline */}
            <div className="mb-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-emerald-600">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Free
              <span className="text-ink-faint">·</span>
              Law Backed
              <span className="text-ink-faint">·</span>
              No Sign Up
            </div>

            <h1 className="text-[3.25rem] font-extrabold leading-[1.08] tracking-tight text-ink">
              Know exactly<br />
              <span className="text-brand-600">what you&apos;re owed.</span>
            </h1>

            <p className="mt-5 max-w-[480px] text-[1.0625rem] leading-relaxed text-ink-soft">
              Whether you&apos;ve been made redundant, you&apos;re leaving a job, or your employer hasn&apos;t paid you — our free calculators are backed by employment law in the UK, US, Canada and Australia.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {TRUST_BADGES.map((b) => (
                <span key={b.label} className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft">
                  <CheckIcon className={b.color} />
                  {b.label}
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
