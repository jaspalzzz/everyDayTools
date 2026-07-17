/**
 * Employment law data for all 8 Australian states and territories.
 * National minimum wage and most employment conditions are set federally
 * under the Fair Work Act 2009 (Cth). Long service leave (LSL) is the main
 * area where state/territory law still varies significantly.
 *
 * Sources:
 * - National Minimum Wage: Fair Work Commission Annual Wage Review 2026-27 ($26.44/hr from 1 July 2026)
 * - Long service leave: state/territory LSL Acts (verified 2025; wage reviewed 2026)
 * - Workers comp authority: state/territory gov websites (verified 2025)
 */

export interface AuStateData {
  slug: string;
  code: string;
  name: string;
  /** Display string for the national minimum wage (all states same under Fair Work) */
  nationalMinWage: string;
  /** State IR system for non-constitutional corporations (WA only has its own) */
  hasStateIrSystem: boolean;
  /** WA state-system wage note if applicable */
  stateMinWage?: string;
  /** Long service leave entitlement summary */
  lslSummary: string;
  /** LSL qualifying period in years */
  lslQualifyingYears: number;
  /** LSL entitlement weeks */
  lslEntitlementWeeks: number;
  /** Whether pro-rata LSL is payable on termination before the qualifying period */
  lslProRataOnTermination: string;
  /** Name of the LSL legislation */
  lslLegislation: string;
  /** Workers compensation authority name */
  workersCompAuthority: string;
  /** Workers compensation authority URL */
  workersCompUrl: string;
  /** Primary IR/employment authority URL */
  employmentAuthorityUrl: string;
  /** Year data was last verified */
  verifiedYear: number;
  /**
   * ISO date this specific state/territory record's page content last
   * genuinely changed -- mirrors `usStates.ts`'s field of the same name.
   * Only set on records that actually changed; falls back to
   * `${verifiedYear}-01-01` in the sitemap for every other entry rather
   * than fabricating per-state precision that doesn't exist.
   */
  lastContentUpdate?: string;
}

export const AU_STATES: AuStateData[] = [
  {
    slug: "new-south-wales",
    code: "NSW",
    name: "New South Wales",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: false,
    lslSummary: "2 months (8.67 weeks) after 10 years of continuous service. Pro-rata entitlement if dismissed or constructively dismissed after 5 years.",
    lslQualifyingYears: 10,
    lslEntitlementWeeks: 8.67,
    lslProRataOnTermination: "After 5 years if dismissed or employer-initiated",
    lslLegislation: "Long Service Leave Act 1955 (NSW)",
    workersCompAuthority: "SIRA (State Insurance Regulatory Authority)",
    workersCompUrl: "https://www.sira.nsw.gov.au",
    employmentAuthorityUrl: "https://www.fairwork.gov.au",
    verifiedYear: 2026,
  },
  {
    slug: "victoria",
    code: "VIC",
    name: "Victoria",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: false,
    lslSummary: "6 weeks after 7 years of continuous service, then 1 additional week for each subsequent 60 weeks. Pro-rata after 7 years on any separation; after 1 year if employer dismisses or constructively dismisses.",
    lslQualifyingYears: 7,
    lslEntitlementWeeks: 6,
    lslProRataOnTermination: "After 7 years on any separation; after 1 year if employer-initiated",
    lslLegislation: "Long Service Leave Act 2018 (Vic)",
    workersCompAuthority: "WorkSafe Victoria",
    workersCompUrl: "https://www.worksafe.vic.gov.au",
    employmentAuthorityUrl: "https://www.fairwork.gov.au",
    verifiedYear: 2026,
  },
  {
    slug: "queensland",
    code: "QLD",
    name: "Queensland",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: false,
    lslSummary: "8.67 weeks after 10 years of continuous service. Pro-rata payable on termination after 7 years if employer-initiated or after 10 years for any reason.",
    lslQualifyingYears: 10,
    lslEntitlementWeeks: 8.67,
    lslProRataOnTermination: "After 7 years if employer-initiated; after 10 years for any reason",
    lslLegislation: "Industrial Relations Act 2016 (Qld) — Long Service Leave provisions",
    workersCompAuthority: "WorkCover Queensland",
    workersCompUrl: "https://www.workcoverqld.com.au",
    employmentAuthorityUrl: "https://www.fairwork.gov.au",
    verifiedYear: 2026,
  },
  {
    slug: "western-australia",
    code: "WA",
    name: "Western Australia",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: true,
    stateMinWage: "WA state-system minimum wage is set separately by the WA Industrial Relations Commission; verify the current State Wage Order before acting",
    lslSummary: "8.67 weeks after 10 years of continuous service. Pro-rata payable if dismissed without fault after 7 years, or if employee resigns due to illness, domestic pressing necessity, or end of fixed-term contract after 7 years.",
    lslQualifyingYears: 10,
    lslEntitlementWeeks: 8.67,
    lslProRataOnTermination: "After 7 years in certain circumstances",
    lslLegislation: "Long Service Leave Act 1958 (WA)",
    workersCompAuthority: "WorkCover WA",
    workersCompUrl: "https://www.workcover.wa.gov.au",
    employmentAuthorityUrl: "https://www.commerce.wa.gov.au/labour-relations",
    verifiedYear: 2026,
  },
  {
    slug: "south-australia",
    code: "SA",
    name: "South Australia",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: false,
    lslSummary: "9.33 weeks after 10 years of continuous service. Pro-rata on termination after 7 years (any reason).",
    lslQualifyingYears: 10,
    lslEntitlementWeeks: 9.33,
    lslProRataOnTermination: "After 7 years for any reason",
    lslLegislation: "Long Service Leave Act 1987 (SA)",
    workersCompAuthority: "ReturnToWorkSA",
    workersCompUrl: "https://www.rtwsa.com",
    employmentAuthorityUrl: "https://www.fairwork.gov.au",
    verifiedYear: 2026,
  },
  {
    slug: "tasmania",
    code: "TAS",
    name: "Tasmania",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: false,
    lslSummary: "8.67 weeks after 10 years of continuous service. Pro-rata payable if dismissed after 7 years, or if employee dies.",
    lslQualifyingYears: 10,
    lslEntitlementWeeks: 8.67,
    lslProRataOnTermination: "After 7 years if employer-initiated",
    lslLegislation: "Long Service Leave Act 1976 (Tas)",
    workersCompAuthority: "WorkSafe Tasmania",
    workersCompUrl: "https://worksafe.tas.gov.au",
    employmentAuthorityUrl: "https://www.fairwork.gov.au",
    verifiedYear: 2026,
  },
  {
    slug: "australian-capital-territory",
    code: "ACT",
    name: "Australian Capital Territory",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: false,
    lslSummary: "6.067 weeks after 7 years of continuous service, then an additional 0.867 weeks for each subsequent year. Pro-rata on termination after 1 year if employer-initiated.",
    lslQualifyingYears: 7,
    lslEntitlementWeeks: 6.067,
    lslProRataOnTermination: "After 1 year if employer-initiated",
    lslLegislation: "Long Service Leave Act 1976 (ACT)",
    workersCompAuthority: "WorkSafe ACT",
    workersCompUrl: "https://www.worksafe.act.gov.au",
    employmentAuthorityUrl: "https://www.fairwork.gov.au",
    verifiedYear: 2026,
  },
  {
    slug: "northern-territory",
    code: "NT",
    name: "Northern Territory",
    nationalMinWage: "$26.44/hr (national minimum from 1 July 2026)",
    hasStateIrSystem: false,
    lslSummary: "6 weeks after 7 years of continuous service. Pro-rata payable on termination after 4 years if employer-initiated or by death; after 6 years for any reason.",
    lslQualifyingYears: 7,
    lslEntitlementWeeks: 6,
    lslProRataOnTermination: "After 4 years if employer-initiated; after 6 years for any reason",
    lslLegislation: "Long Service Leave Act 1981 (NT)",
    workersCompAuthority: "NT WorkSafe",
    workersCompUrl: "https://worksafe.nt.gov.au",
    employmentAuthorityUrl: "https://www.fairwork.gov.au",
    verifiedYear: 2026,
  },
];

export function getAuState(slug: string): AuStateData | undefined {
  return AU_STATES.find((s) => s.slug === slug);
}
