import { TablerIcon } from "@/components/TablerIcon";
import { HomeToolList } from "@/components/HomeToolList";
import { homepageSchemas, jsonLd } from "@/lib/seo";

const FEATURES = [
  { icon: "ti-bolt", title: "Live results", sub: "Updates as you type" },
  { icon: "ti-world", title: "Country-aware", sub: "UK, US, CA & AU rules" },
  { icon: "ti-file-download", title: "PDF output", sub: "Download a summary" },
  { icon: "ti-lock", title: "Nothing stored", sub: "Runs in your browser" },
] as const;

export default function HomePage() {
  const [websiteSchema, orgSchema] = homepageSchemas();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(orgSchema)} />
      <div className="mx-auto max-w-content px-5">
        {/* Hero */}
        <section className="py-12 text-center sm:py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Free · No signup · Instant results
          </p>
          <h1 className="mx-auto mt-3 max-w-xl text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
            Free employment pay calculators{" "}
            <span className="text-brand-600">for UK, US & more</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Redundancy, PTO payout, notice, severance, overtime and more — with the
            law built in. Enter your numbers, get your answer, download a PDF.
          </p>
        </section>

        {/* Tool search + list */}
        <HomeToolList />

        {/* Trust feature strip */}
        <section aria-labelledby="features-heading" className="mx-auto mt-14 max-w-2xl">
          <h2
            id="features-heading"
            className="mb-4 text-center text-sm font-medium text-ink-soft"
          >
            Why use My Pay Rights?
          </h2>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-surface-line bg-surface-line sm:grid-cols-4">
            {FEATURES.map((f) => (
              <dl
                key={f.title}
                className="flex flex-col items-center bg-white px-4 py-5 text-center"
              >
                <dd aria-hidden="true">
                  <TablerIcon name={f.icon} className="text-brand-400" size={20} />
                </dd>
                <dt className="mt-2 text-xs font-medium text-ink">{f.title}</dt>
                <dd className="text-[11px] text-ink-faint">{f.sub}</dd>
              </dl>
            ))}
          </div>
        </section>

        {/* Bottom trust copy */}
        <p className="mx-auto mt-8 max-w-lg text-center text-xs leading-relaxed text-ink-faint">
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
