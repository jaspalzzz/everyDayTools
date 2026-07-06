import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { AU_STATES } from "@/data/auStates";
import { CA_PROVINCES } from "@/data/caProvinces";
import { GUIDES } from "@/data/guides";
import { LEGAL_SOURCES } from "@/data/legalSources";
import { TOOLS, type Region } from "@/data/tools";
import { US_STATES } from "@/data/usStates";

const ROOT = process.cwd();
const OFFICIAL_HOSTS = [
  "gov.uk",
  "legislation.gov.uk",
  "dol.gov",
  "irs.gov",
  "govinfo.gov",
  "eeoc.gov",
  "ssa.gov",
  "ada.gov",
  "fairwork.gov.au",
  "legislation.gov.au",
  "calculate.fairwork.gov.au",
  "canada.ca",
  "ontario.ca",
  "justice.gc.ca",
  "laws-lois.justice.gc.ca",
  "acas.org.uk",
  "ato.gov.au",
] as const;

const EXPECTED_REGION_COUNTS: Record<Region, number> = {
  UK: 0,
  US: 0,
  AU: 0,
  "UK/CA": 0,
  "US/UK/CA": 0,
  "US/UK/CA/AU": 0,
};

function isOfficialUrl(url: string) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return OFFICIAL_HOSTS.some((officialHost) => host === officialHost || host.endsWith(`.${officialHost}`));
}

describe("site USP integrity", () => {
  it("keeps every calculator discoverable, sourced, and implemented", () => {
    const slugs = new Set<string>();

    for (const tool of TOOLS) {
      expect(slugs.has(tool.slug), `${tool.slug} duplicate slug`).toBe(false);
      slugs.add(tool.slug);

      expect(existsSync(path.join(ROOT, "app", tool.slug, "page.tsx")), `${tool.slug} page`).toBe(true);
      expect(tool.name.trim(), `${tool.slug} name`).not.toBe("");
      expect(tool.shortName.trim(), `${tool.slug} shortName`).not.toBe("");
      expect(tool.description.length, `${tool.slug} useful description`).toBeGreaterThan(55);
      expect(tool.related.length, `${tool.slug} related tools`).toBeGreaterThanOrEqual(2);

      const sources = LEGAL_SOURCES[tool.slug] ?? [];
      expect(sources.length, `${tool.slug} legal sources`).toBeGreaterThan(0);
      expect(sources.some((source) => source.type === "legislation" || source.type === "guidance"), `${tool.slug} authoritative source`).toBe(true);

      for (const source of sources) {
        expect(source.label.trim(), `${tool.slug} source label`).not.toBe("");
        expect(() => new URL(source.url), `${tool.slug} source URL ${source.url}`).not.toThrow();
        expect(isOfficialUrl(source.url), `${tool.slug} official source URL ${source.url}`).toBe(true);
      }

      for (const relatedSlug of tool.related) {
        expect(slugs.has(relatedSlug) || TOOLS.some((candidate) => candidate.slug === relatedSlug), `${tool.slug} related ${relatedSlug}`).toBe(true);
      }
    }
  });

  it("keeps country coverage complete enough for the core proposition", () => {
    expect(US_STATES.length, "US states + DC").toBe(51);
    expect(AU_STATES.length, "AU states and territories").toBe(8);
    expect(CA_PROVINCES.length, "Canada provinces and territories").toBe(13);

    for (const state of US_STATES) {
      expect(state.name.trim(), `${state.slug} name`).not.toBe("");
      expect(state.minimumWage.trim(), `${state.slug} minimum wage`).not.toBe("");
      expect(state.finalPaycheckTerminated.trim(), `${state.slug} terminated deadline`).not.toBe("");
      expect(state.finalPaycheckResigned.trim(), `${state.slug} resigned deadline`).not.toBe("");
      expect(() => new URL(state.dolUrl), `${state.slug} authority URL`).not.toThrow();
    }

    for (const state of AU_STATES) {
      expect(state.nationalMinWage.trim(), `${state.slug} national wage`).not.toBe("");
      expect(state.lslSummary.length, `${state.slug} long service leave summary`).toBeGreaterThan(30);
      expect(() => new URL(state.workersCompUrl), `${state.slug} workers comp URL`).not.toThrow();
      expect(() => new URL(state.employmentAuthorityUrl), `${state.slug} employment authority URL`).not.toThrow();
    }

    for (const province of CA_PROVINCES) {
      expect(province.minimumWage.trim(), `${province.slug} minimum wage`).not.toBe("");
      expect(province.noticeTiers.length, `${province.slug} notice tiers`).toBeGreaterThan(0);
      expect(province.vacationEntitlement.length, `${province.slug} vacation entitlement`).toBeGreaterThan(20);
      expect(() => new URL(province.labourMinistryUrl), `${province.slug} labour ministry URL`).not.toThrow();
    }
  });

  it("keeps guides tied to calculators so users do not feel lost after reading", () => {
    for (const guide of GUIDES) {
      expect(guide.title.length, `${guide.slug} title`).toBeGreaterThan(18);
      expect(guide.description.length, `${guide.slug} description`).toBeGreaterThan(50);
      expect(TOOLS.some((tool) => tool.slug === guide.relatedTool), `${guide.slug} related tool`).toBe(true);
    }
  });

  it("keeps all core regions represented in calculator catalogue", () => {
    for (const tool of TOOLS) {
      EXPECTED_REGION_COUNTS[tool.region] += 1;
    }

    expect(TOOLS.some((tool) => tool.region.includes("UK")), "UK calculators").toBe(true);
    expect(TOOLS.some((tool) => tool.region.includes("US")), "US calculators").toBe(true);
    expect(TOOLS.some((tool) => tool.region.includes("CA")), "Canada calculators").toBe(true);
    expect(TOOLS.some((tool) => tool.region.includes("AU")), "Australia calculators").toBe(true);
  });
});
