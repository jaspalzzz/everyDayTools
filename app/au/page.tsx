import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { AU_STATES } from "@/data/auStates";
import { isIndexableAuState } from "@/lib/contentQuality";
import { SITE, jsonLd } from "@/lib/seo";
import { CountryPage } from "@/components/country/CountryPage";
import type { CountryTool } from "@/components/country/CountryPage";

const url = `${SITE.url}/au`;

export const metadata: Metadata = {
  title: "Australia Employment Pay Calculators — Fair Work Act 2026",
  description:
    "Free Australian employment calculators for overtime pay, salary conversion and more. Built on the Fair Work Act 2009 and National Employment Standards.",
  alternates: {
    canonical: url,
    languages: {
      en: SITE.url,
      "en-AU": url,
      "en-GB": `${SITE.url}/uk`,
      "en-US": `${SITE.url}/us`,
      "en-CA": `${SITE.url}/ca`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "Australia Employment Pay Calculators — Fair Work Act 2026",
    description:
      "Law-backed calculators for Australian workers. Built on the Fair Work Act 2009 and National Employment Standards (NES).",
    url,
  },
};

const AU_TOOLS: CountryTool[] = TOOLS.filter((t) => t.region.includes("AU")).map((t) => ({
  slug: t.slug,
  name: t.name,
  shortName: t.shortName,
  description: t.description,
  category: t.category,
  hero: t.hero,
}));

function AUStatesGrid() {
  // Only states with a manually reviewed, sourced page are linked. When none
  // qualify, the section is omitted rather than showing dead links.
  // MAINTENANCE: the /au/states/[state] route is currently deleted; restore
  // app/au/states/[state]/page.tsx before curating a state, or a qualifying
  // record links here to a 404.
  const states = AU_STATES.filter(isIndexableAuState);
  if (states.length === 0) return null;
  return (
    <section aria-labelledby="au-states-heading">
      <h2 id="au-states-heading" style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
        Browse by state &amp; territory
      </h2>
      <p style={{ margin: "0 0 14px", color: "#52616f", fontSize: 14 }}>
        Fair Work applies nationally — state tools and workers&apos; comp rules vary by jurisdiction
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {states.map((s) => (
          <Link
            key={s.slug}
            href={`/au/states/${s.slug}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
              border: "1px solid #EAE5D8", borderRadius: 8, background: "#fff",
              padding: "10px 12px", textDecoration: "none",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#102033" }}>{s.name}</span>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#52616f" }}>{s.code}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function AUPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Australia Employment Pay Calculators",
    url,
    numberOfItems: AU_TOOLS.length,
    itemListElement: AU_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE.url}/${t.slug}`,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Australia Employment Pay Calculators",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <CountryPage
        code="AU"
        name="Australia"
        eyebrow="Australian employment law · Fair Work Act 2026"
        heroCopy={
          <>
            Employment calculators for Australian workers built on the Fair Work Act 2009
            and National Employment Standards — redundancy, overtime, salary conversion and more.{" "}
            <strong style={{ color: "#16324f", fontWeight: 850 }}>
              NES entitlements apply to all national system employees.
            </strong>
          </>
        }
        rates={[
          { label: "National minimum wage", value: "AU$26.44/hr" },
          { label: "Casual loading", value: "25% on top of base rate" },
          { label: "Redundancy — 1 yr service", value: "4 weeks' pay" },
          { label: "Redundancy — 10 yr service", value: "12 weeks' pay (max)" },
          { label: "Superannuation rate", value: "11.5% (2026)" },
        ]}
        ratesNote="Fair Work Ombudsman · NES rates (2026–27)"
        searchPlaceholder="Search Australian calculators: redundancy, overtime, salary…"
        tools={AU_TOOLS}
        sources={[
          { label: "Fair Work Ombudsman", href: "https://www.fairwork.gov.au" },
          { label: "Fair Work — minimum wages", href: "https://www.fairwork.gov.au/pay-and-wages/minimum-wages" },
          { label: "ATO — super & tax", href: "https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee" },
        ]}
        note={
          <>
            <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 5 }}>NES is the floor</strong>
            The National Employment Standards set minimum entitlements. Awards and enterprise agreements may provide more — your contract applies if it is more generous.
          </>
        }
        extraContent={<AUStatesGrid />}
      />
    </>
  );
}
