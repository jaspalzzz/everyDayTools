import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { SITE, jsonLd } from "@/lib/seo";
import { TablerIcon } from "@/components/TablerIcon";

const url = `${SITE.url}/guides`;

export const metadata: Metadata = {
  title: "Employment Rights Guides — UK, US & More",
  description:
    "Plain-English guides to employment rights, pay calculations, and statutory entitlements. Written by employment law specialists and verified against official government sources.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employment Rights Guides — UK, US & More",
    description:
      "Plain-English guides to employment rights — redundancy pay, notice periods, PTO laws, maternity pay and take-home pay explained with worked examples.",
    url,
  },
};

const COUNTRY_FLAG: Record<string, string> = {
  UK: "🇬🇧",
  US: "🇺🇸",
  CA: "🇨🇦",
  AU: "🇦🇺",
  "UK/US": "🇬🇧🇺🇸",
};

export default function GuidesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <div className="mx-auto max-w-content px-5 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Guides</span>
        </nav>

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Employment Rights · Plain English
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Employment Rights Guides
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            In-depth guides to UK and US employment rights — written for people who need
            a clear answer, not a law degree. Every guide cites the official source and
            links directly to the relevant calculator for your own figures.
          </p>
        </div>

        {/* Guide cards */}
        <div className="flex flex-col gap-4 max-w-2xl">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-surface-line bg-white p-5 transition-colors hover:border-brand-200 hover:bg-brand-50"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{COUNTRY_FLAG[guide.country]}</span>
                <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                  {guide.category}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-ink group-hover:text-brand-700 transition-colors">
                {guide.title}
              </h2>
              <p className="text-xs leading-relaxed text-ink-faint line-clamp-2">
                {guide.description}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs font-medium text-brand-600">
                Read guide
                <TablerIcon name="ti-arrow-right" size={13} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        {/* Editorial note */}
        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ink-faint">
          All guides are reviewed against official government publications — GOV.UK, HMRC, and the
          U.S. Department of Labor — and updated when statutory rates change. Guides reflect the
          2026/27 tax year for UK content and 2026 for US content.
          These guides are for general information only and do not constitute legal advice.
        </p>
      </div>
    </>
  );
}
