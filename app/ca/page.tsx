import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { CA_PROVINCES } from "@/data/caProvinces";
import { SITE, jsonLd } from "@/lib/seo";
import { CountryPage } from "@/components/country/CountryPage";
import type { CountryTool } from "@/components/country/CountryPage";

const url = `${SITE.url}/ca`;

export const metadata: Metadata = {
  title: "Canada Pay Calculators — Federal & Provincial Rules 2026",
  description:
    "Free Canadian employment calculators covering notice periods, severance pay, take-home pay and overtime. Federal Canada Labour Code and provincial standards applied.",
  alternates: {
    canonical: url,
    languages: {
      en: SITE.url,
      "en-CA": url,
      "en-GB": `${SITE.url}/uk`,
      "en-US": `${SITE.url}/us`,
      "en-AU": `${SITE.url}/au`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "Canada Pay Calculators — Federal & Provincial Rules 2026",
    description:
      "Law-backed calculators for Canadian workers: notice periods, severance, take-home pay and overtime. Federal and provincial law built in.",
    url,
  },
};

const CA_TOOLS: CountryTool[] = TOOLS.filter((t) => t.region.includes("CA")).map((t) => ({
  slug: t.slug,
  name: t.name,
  shortName: t.shortName,
  description: t.description,
  category: t.category,
  hero: t.hero,
}));

function CAProvincesGrid() {
  const provinces = Array.isArray(CA_PROVINCES) ? CA_PROVINCES : [];
  if (provinces.length === 0) return null;
  return (
    <section aria-labelledby="ca-provinces-heading">
      <h2 id="ca-provinces-heading" style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
        Browse by province
      </h2>
      <p style={{ margin: "0 0 14px", color: "#52616f", fontSize: 14 }}>
        Employment standards, minimum wage and notice rules by province and territory
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {provinces.map((p: { slug: string; name: string; code: string }) => (
          <Link
            key={p.slug}
            href={`/ca/provinces/${p.slug}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
              border: "1px solid #EAE5D8", borderRadius: 8, background: "#fff",
              padding: "10px 12px", textDecoration: "none",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#102033" }}>{p.name}</span>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#52616f" }}>{p.code}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function CAPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Canada Employment Pay Calculators",
    url,
    numberOfItems: CA_TOOLS.length,
    itemListElement: CA_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE.url}/${t.slug}`,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Canada Employment Pay Calculators",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <CountryPage
        code="CA"
        name="Canada"
        eyebrow="Canadian employment law · federal & provincial 2026"
        heroCopy={
          <>
            Employment calculators for Canadian workers — notice periods, severance pay,
            take-home pay and overtime across federal and provincial rules.{" "}
            <strong style={{ color: "#16324f", fontWeight: 850 }}>
              Provincial employment standards apply automatically by jurisdiction.
            </strong>
          </>
        }
        rates={[
          { label: "Federal minimum wage", value: "CA$17.75/hr" },
          { label: "Federal CPP contribution", value: "5.95% (2026)" },
          { label: "EI premium rate (employee)", value: "1.66% of insurable earnings" },
          { label: "Basic Personal Amount", value: "CA$16,129 (2026)" },
          { label: "Federal termination notice", value: "1–8 weeks (by service length)" },
        ]}
        ratesNote="Federal Canada Labour Code · provincial rates may differ"
        searchPlaceholder="Search Canadian calculators: notice, severance, take-home…"
        tools={CA_TOOLS}
        sources={[
          { label: "Canada Labour Code (CLC)", href: "https://www.canada.ca/en/employment-social-development/programs/employment-standards.html" },
          { label: "CRA — payroll deductions", href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll.html" },
          { label: "Federal labour standards", href: "https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards.html" },
        ]}
        note={
          <>
            <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 5 }}>Provincial rules vary</strong>
            Most workers in Canada are covered by their province's employment standards, not the federal Canada Labour Code. Select your province for the correct rules.
          </>
        }
        extraContent={<CAProvincesGrid />}
      />
    </>
  );
}
