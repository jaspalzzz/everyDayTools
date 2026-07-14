import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { SITE, jsonLd } from "@/lib/seo";
import { CountryPage } from "@/components/country/CountryPage";
import type { CountryTool } from "@/components/country/CountryPage";

const url = `${SITE.url}/uk`;

export const metadata: Metadata = {
  title: "UK Employment Pay Calculators — Statutory Rates 2026/27",
  description:
    "Free UK employment calculators covering redundancy pay, maternity pay, notice periods, sick pay and more. All built on the current 2026/27 statutory rates from GOV.UK.",
  alternates: {
    canonical: url,
    languages: {
      en: SITE.url,
      "en-GB": url,
      "en-US": `${SITE.url}/us`,
      "en-CA": `${SITE.url}/ca`,
      "en-AU": `${SITE.url}/au`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "UK Employment Pay Calculators — Statutory Rates 2026/27",
    description:
      "Law-backed calculators for UK workers: redundancy pay, notice periods, overtime, parental leave and more. Free, instant, no signup.",
    url,
  },
};

const UK_TOOLS: CountryTool[] = TOOLS.filter((t) => t.region.includes("UK")).map((t) => ({
  slug: t.slug,
  name: t.name,
  shortName: t.shortName,
  description: t.description,
  category: t.category,
  hero: t.hero,
}));

const UK_EXIT_LINKS = [
  { label: "Leaving job hub", href: "/uk/leaving-job" },
  { label: "Redundancy rights", href: "/uk/redundancy" },
  { label: "Pay rights", href: "/uk/pay-rights" },
] as const;

function UKLeavingJobLinks() {
  return (
    <section aria-labelledby="uk-leaving-job-heading">
      <h2 id="uk-leaving-job-heading" style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
        Leaving a job in the UK
      </h2>
      <p style={{ margin: "0 0 14px", color: "#52616f", fontSize: 14 }}>
        Check final pay, redundancy, notice, holiday pay, and settlement money before you sign or leave.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {UK_EXIT_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-lg border border-surface-line bg-white p-4 text-sm font-semibold text-ink hover:bg-surface-muted">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function UKPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UK Employment Pay Calculators",
    url,
    numberOfItems: UK_TOOLS.length,
    itemListElement: UK_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE.url}/${t.slug}`,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UK Employment Pay Calculators",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <CountryPage
        code="UK"
        name="United Kingdom"
        eyebrow="UK employment law · 2026/27 statutory rates"
        heroCopy={
          <>
            Statutory employment calculators for UK workers — redundancy pay, notice periods,
            maternity pay, sick pay, holiday entitlement and take-home pay.{" "}
            <strong style={{ color: "#16324f", fontWeight: 850 }}>
              All figures are built on the 2026/27 statutory rates from GOV.UK and HMRC.
            </strong>
          </>
        }
        rates={[
          { label: "Redundancy pay cap", value: "£751/week" },
          { label: "SMP / SPP / ShPP", value: "£194.32/week" },
          { label: "SSP", value: "£123.25/week" },
          { label: "National Living Wage", value: "£12.21/hour" },
          { label: "Lower Earnings Limit", value: "£129/week" },
        ]}
        ratesNote="Verified against GOV.UK and HMRC (2026/27)"
        searchPlaceholder="Search UK calculators: redundancy, notice, maternity…"
        tools={UK_TOOLS}
        sources={[
          { label: "GOV.UK — working, jobs and pensions", href: "https://www.gov.uk/browse/working" },
          { label: "GOV.UK — redundancy pay", href: "https://www.gov.uk/redundancy-your-rights/redundancy-pay" },
          { label: "ACAS — workplace guidance", href: "https://www.acas.org.uk" },
        ]}
        note={
          <>
            <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 5 }}>Statutory minimum</strong>
            These calculators show the legal floor. Contractual terms may give more — your contract always applies if it is more generous.
          </>
        }
        extraContent={<UKLeavingJobLinks />}
      />
    </>
  );
}
