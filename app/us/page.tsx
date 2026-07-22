import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { US_STATES } from "@/data/usStates";
import { isIndexableUsState } from "@/lib/contentQuality";
import { SITE, jsonLd } from "@/lib/seo";
import { CountryPage } from "@/components/country/CountryPage";
import type { CountryTool } from "@/components/country/CountryPage";

const url = `${SITE.url}/us`;

export const metadata: Metadata = {
  title: "US Employment Pay Calculators — Federal & State Rules 2026",
  description:
    "Free US employment calculators: PTO payout by state, final paycheck deadlines, unemployment benefit, overtime pay and more. Federal and state law built in.",
  alternates: {
    canonical: url,
    languages: {
      en: SITE.url,
      "en-US": url,
      "en-GB": `${SITE.url}/uk`,
      "en-CA": `${SITE.url}/ca`,
      "en-AU": `${SITE.url}/au`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "US Employment Pay Calculators — Federal & State Rules 2026",
    description:
      "Law-backed calculators for US workers: PTO payout, final paycheck deadlines, unemployment benefit, overtime and take-home pay. All 50 states covered.",
    url,
  },
};

const US_TOOLS: CountryTool[] = TOOLS.filter((t) => t.region.includes("US")).map((t) => ({
  slug: t.slug,
  name: t.name,
  shortName: t.shortName,
  description: t.description,
  category: t.category,
  hero: t.hero,
}));

const US_EXIT_LINKS = [
  { label: "Final paycheck hub", href: "/us/final-paycheck" },
  { label: "Late paycheck checker", href: "/us/final-paycheck/was-my-final-paycheck-late" },
  { label: "Deduction checker", href: "/us/final-paycheck/employer-deduction-checker" },
] as const;

function USStatesGrid() {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <section aria-labelledby="us-job-exit-heading">
        <h2 id="us-job-exit-heading" style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
          Job exit pay tools
        </h2>
        <p style={{ margin: "0 0 14px", color: "#52616f", fontSize: 14 }}>
          Final paycheck timing, PTO payout, deductions, and wage claim next steps.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {US_EXIT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg border border-surface-line bg-white p-4 text-sm font-semibold text-ink hover:bg-surface-muted">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="us-states-heading">
        <h2 id="us-states-heading" style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
          PTO payout status by state
        </h2>
      <p style={{ margin: "0 0 14px", color: "#52616f", fontSize: 14 }}>
        Whether unused vacation must be paid out when you leave — all 50 states + DC. In-depth
        state guides link through as each state is individually reviewed against current sources.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {US_STATES.map((s) => {
          const cellStyle = {
            display: "flex" as const, alignItems: "center" as const, gap: 6,
            border: "1px solid #EAE5D8", borderRadius: 8,
            background: "#fff", padding: "9px 10px",
            textDecoration: "none" as const,
          };
          const inner = (
            <>
              <span
                style={{
                  width: 8, height: 8, flexShrink: 0, borderRadius: "50%",
                  background: s.pto.rule === "required" ? "#10b981" : s.pto.rule === "conditional" ? "#f59e0b" : "#d1d5db",
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#102033", flex: 1, minWidth: 0 }}>{s.name}</span>
              <span className="hidden min-[400px]:inline" style={{ fontSize: 11, fontWeight: 900, color: "#52616f" }}>{s.code}</span>
            </>
          );
          // Only states with a manually reviewed, current-year page link through.
          // The rest render as an at-a-glance status reference (no thin pages exposed).
          return isIndexableUsState(s) ? (
            <Link key={s.slug} href={`/us/states/${s.slug}`} style={cellStyle}>{inner}</Link>
          ) : (
            <div key={s.slug} style={cellStyle}>{inner}</div>
          );
        })}
      </div>
      <p style={{ marginTop: 12, color: "#52616f", fontSize: 12, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          Required by law
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
          Depends on policy
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
          No requirement
        </span>
      </p>
      </section>
    </div>
  );
}

export default function USPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "US Employment Pay Calculators",
    url,
    numberOfItems: US_TOOLS.length,
    itemListElement: US_TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE.url}/${t.slug}`,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "US Employment Pay Calculators",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <CountryPage
        code="US"
        name="United States"
        eyebrow="US employment law · federal & state rules 2026"
        heroCopy={
          <>
            Employment calculators for US workers covering federal and state rules — PTO payout,
            final paycheck deadlines, overtime pay, unemployment benefit and take-home pay.{" "}
            <strong style={{ color: "#16324f", fontWeight: 850 }}>
              State law applies automatically: all 50 states covered.
            </strong>
          </>
        }
        rates={[
          { label: "Federal minimum wage", value: "$7.25/hr" },
          { label: "FLSA overtime threshold", value: "1.5× after 40 hrs/wk" },
          { label: "Federal bonus withholding", value: "22% supplemental" },
          { label: "FICA — Social Security", value: "6.2%" },
          { label: "FICA — Medicare", value: "1.45%" },
        ]}
        ratesNote="Federal rates · state minimums may be higher"
        searchPlaceholder="Search US calculators: PTO, overtime, final paycheck…"
        tools={US_TOOLS}
        sources={[
          { label: "U.S. Department of Labor (DOL)", href: "https://www.dol.gov/agencies/whd" },
          { label: "IRS — withholding rates", href: "https://www.irs.gov/publications/p15" },
          { label: "FLSA overtime guide", href: "https://www.dol.gov/agencies/whd/overtime" },
        ]}
        note={
          <>
            <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 5 }}>State law varies</strong>
            PTO payout and final paycheck deadlines differ by state. These calculators apply the correct rule automatically — always verify with your state labor board.
          </>
        }
        extraContent={<USStatesGrid />}
      />
    </>
  );
}
