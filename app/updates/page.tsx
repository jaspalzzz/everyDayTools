import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd, webPageSchema } from "@/lib/seo";

const url = `${SITE.url}/updates`;

export const metadata: Metadata = {
  title: "Content & Rate Update Log — My Pay Rights",
  description:
    "A public record of material statutory-rate, calculator, methodology, and employment-law content changes published by My Pay Rights.",
  alternates: { canonical: url },
  openGraph: {
    title: "Content & Rate Update Log — My Pay Rights",
    description: "Material changes to My Pay Rights calculators, legal summaries, sources, and methodology.",
    url,
  },
};

const UPDATES = [
  {
    date: "2026-07-12",
    title: "Accessibility, mobile rendering, and review-language audit",
    items: [
      "Corrected remaining low-contrast interface labels and verified automated accessibility checks.",
      "Removed webfont downloads and inlined production CSS to reduce the mobile critical rendering path.",
      "Changed editorial labels to distinguish internal primary-source checks from independent legal review.",
    ],
  },
  {
    date: "2026-07-09",
    title: "US state-page differentiation review",
    items: [
      "Added state-specific enforcement and legal context where a documented local distinction exists.",
      "Retained shared language only for genuinely shared federal or procedural rules instead of manufacturing superficial variation.",
    ],
  },
  {
    date: "2026-07-01",
    title: "2026/27 statutory-rate and source review",
    items: [
      "Reviewed UK statutory rates and calculator caps against current government publications.",
      "Rebuilt the sitemap with per-page modification dates and revalidated canonical URLs, metadata, internal links, and JSON-LD.",
      "Expanded primary-source trails across UK, US, Canadian, and Australian content.",
    ],
  },
  {
    date: "2026-06-27",
    title: "Editorial and structured-data baseline",
    items: [
      "Published the editorial policy, methodology, corrections route, privacy policy, and advice disclaimers.",
      "Added named authorship and machine-readable publisher, article, application, breadcrumb, and FAQ data where visible content supports it.",
    ],
  },
] as const;

export default function UpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({
          name: "Content and rate update log",
          description: metadata.description as string,
          url,
          dateModified: UPDATES[0].date,
        }))}
      />
      <main className="mx-auto max-w-content px-5 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-soft">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Update log</span>
        </nav>

        <header className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.08em] text-brand-600">Transparency</p>
          <h1 className="text-3xl font-bold text-ink">Content and rate update log</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            This log records material changes to statutory figures, calculator logic, legal summaries,
            source trails, and editorial methodology. It does not record spelling or visual-only changes.
          </p>
        </header>

        <div className="mt-10 max-w-2xl space-y-5">
          {UPDATES.map((update) => (
            <article key={update.date} className="rounded-lg border border-surface-line bg-white p-5 sm:p-6">
              <time dateTime={update.date} className="text-xs font-bold text-brand-700">{update.date}</time>
              <h2 className="mt-1 text-lg font-bold text-ink">{update.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
                {update.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <aside className="mt-8 max-w-2xl rounded-lg border border-surface-line bg-surface-muted p-5 text-sm text-ink-soft">
          Found a possible error? Read our <Link href="/editorial-policy" className="font-semibold text-brand-600 hover:underline">editorial policy</Link>{" "}
          or <Link href="/contact" className="font-semibold text-brand-600 hover:underline">send a correction</Link>.
        </aside>
      </main>
    </>
  );
}
