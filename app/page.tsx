import { HomeToolList } from "@/components/HomeToolList";
import { SituationSelector } from "@/components/SituationSelector";
import { homepageSchemas, jsonLd } from "@/lib/seo";

const TRUST = [
  "Based on official legislation",
  "Free forever · No login",
  "UK, US, Canada & Australia",
  "Nothing stored — runs in your browser",
] as const;

export default function HomePage() {
  const [websiteSchema, orgSchema] = homepageSchemas();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(orgSchema)} />

      <div className="mx-auto max-w-content px-5">
        {/* Hero */}
        <section className="pb-6 pt-12 text-center sm:pt-16">
          <h1 className="mx-auto max-w-xl text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
            Leaving your job?{" "}
            <span className="text-brand-600">Find out exactly what your employer owes you.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Employment law is stressful. We make it simple — instant, law-backed answers for redundancy, dismissal, pay disputes, and parental leave across the UK, US, Canada and Australia.
          </p>

          {/* Trust signals — above the fold */}
          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-xs text-ink-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Situation selector */}
        <SituationSelector />

        {/* Divider */}
        <div className="mx-auto mt-10 flex items-center gap-3 text-xs text-ink-faint">
          <div className="h-px flex-1 bg-surface-line" />
          <span>or browse all calculators</span>
          <div className="h-px flex-1 bg-surface-line" />
        </div>

        {/* Tool search + filtered list */}
        <main id="main" className="mt-6">
          <HomeToolList />
        </main>

        {/* Bottom disclaimer */}
        <p className="mx-auto mt-10 max-w-lg text-center text-xs leading-relaxed text-ink-faint">
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
