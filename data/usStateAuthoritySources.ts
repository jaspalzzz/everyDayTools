/**
 * Official state labour-agency or statute endpoints used to substantiate the
 * state-level PTO and final-paycheck datasets. The U.S. Department of Labor's
 * State Labor Offices directory is the discovery/identity check for these
 * authorities; the per-state URL is stored on every exported calculator row.
 */

export interface UsStateAuthoritySource {
  name: string;
  sourceUrl: string;
  /** ISO date on which the authority endpoint was checked. */
  lastVerified: string;
}

export const US_STATE_AUTHORITY_SOURCES = {
  AL: { name: "Alabama", sourceUrl: "https://labor.alabama.gov", lastVerified: "2026-07-13" },
  AK: { name: "Alaska", sourceUrl: "https://labor.alaska.gov/lss/home.htm", lastVerified: "2026-07-13" },
  AZ: { name: "Arizona", sourceUrl: "https://www.azica.gov/divisions/labor-department", lastVerified: "2026-07-13" },
  AR: { name: "Arkansas", sourceUrl: "https://www.labor.arkansas.gov", lastVerified: "2026-07-13" },
  CA: { name: "California", sourceUrl: "https://www.dir.ca.gov/dlse/", lastVerified: "2026-07-13" },
  CO: { name: "Colorado", sourceUrl: "https://cdle.colorado.gov/wages", lastVerified: "2026-07-13" },
  CT: { name: "Connecticut", sourceUrl: "https://portal.ct.gov/dol", lastVerified: "2026-07-13" },
  DE: { name: "Delaware", sourceUrl: "https://labor.delaware.gov", lastVerified: "2026-07-13" },
  DC: { name: "District of Columbia", sourceUrl: "https://does.dc.gov/page/office-wage-hour", lastVerified: "2026-07-13" },
  FL: { name: "Florida", sourceUrl: "https://floridajobs.org/business-growth-and-partnerships/for-employers/labor-laws", lastVerified: "2026-07-13" },
  GA: { name: "Georgia", sourceUrl: "https://dol.georgia.gov", lastVerified: "2026-07-13" },
  HI: { name: "Hawaii", sourceUrl: "https://labor.hawaii.gov/wsd/", lastVerified: "2026-07-13" },
  ID: { name: "Idaho", sourceUrl: "https://labor.idaho.gov/dnn/", lastVerified: "2026-07-13" },
  IL: { name: "Illinois", sourceUrl: "https://labor.illinois.gov", lastVerified: "2026-07-13" },
  IN: { name: "Indiana", sourceUrl: "https://www.in.gov/dol/", lastVerified: "2026-07-13" },
  IA: { name: "Iowa", sourceUrl: "https://www.iowadivisionoflabor.gov", lastVerified: "2026-07-13" },
  KS: { name: "Kansas", sourceUrl: "https://www.dol.ks.gov", lastVerified: "2026-07-13" },
  KY: { name: "Kentucky", sourceUrl: "https://labor.ky.gov/Pages/Home.aspx", lastVerified: "2026-07-13" },
  LA: { name: "Louisiana", sourceUrl: "https://www.laworks.net", lastVerified: "2026-07-13" },
  ME: { name: "Maine", sourceUrl: "https://www.maine.gov/labor/labor_laws/", lastVerified: "2026-07-13" },
  MD: { name: "Maryland", sourceUrl: "https://www.dllr.state.md.us/labor/wages/", lastVerified: "2026-07-13" },
  MA: { name: "Massachusetts", sourceUrl: "https://www.mass.gov/orgs/department-of-labor-standards", lastVerified: "2026-07-13" },
  MI: { name: "Michigan", sourceUrl: "https://www.michigan.gov/leo/bureaus-agencies/ors/wh", lastVerified: "2026-07-13" },
  MN: { name: "Minnesota", sourceUrl: "https://www.dli.mn.gov/business/employment-practices/minimum-wage-minnesota", lastVerified: "2026-07-13" },
  MS: { name: "Mississippi", sourceUrl: "https://mdes.ms.gov", lastVerified: "2026-07-13" },
  MO: { name: "Missouri", sourceUrl: "https://labor.mo.gov/DLS", lastVerified: "2026-07-13" },
  MT: { name: "Montana", sourceUrl: "https://erd.dli.mt.gov/labor-standards/wage-and-hour-payment-act", lastVerified: "2026-07-13" },
  NE: { name: "Nebraska", sourceUrl: "https://dol.nebraska.gov/LaborStandards", lastVerified: "2026-07-13" },
  NV: { name: "Nevada", sourceUrl: "https://labor.nv.gov", lastVerified: "2026-07-13" },
  NH: { name: "New Hampshire", sourceUrl: "https://www.nh.gov/labor/", lastVerified: "2026-07-13" },
  NJ: { name: "New Jersey", sourceUrl: "https://www.nj.gov/labor/wageandhour/", lastVerified: "2026-07-13" },
  NM: { name: "New Mexico", sourceUrl: "https://www.dws.state.nm.us/Labor-Relations", lastVerified: "2026-07-13" },
  NY: { name: "New York", sourceUrl: "https://dol.ny.gov/minimum-wage", lastVerified: "2026-07-13" },
  NC: { name: "North Carolina", sourceUrl: "https://www.labor.nc.gov/workplace-rights/employee-rights-regarding-time-worked-and-wages-earned", lastVerified: "2026-07-13" },
  ND: { name: "North Dakota", sourceUrl: "https://www.nd.gov/labor/", lastVerified: "2026-07-13" },
  OH: { name: "Ohio", sourceUrl: "https://codes.ohio.gov/ohio-revised-code/section-4113.15", lastVerified: "2026-07-13" },
  OK: { name: "Oklahoma", sourceUrl: "https://www.ok.gov/odol/", lastVerified: "2026-07-13" },
  OR: { name: "Oregon", sourceUrl: "https://www.oregon.gov/boli/workers/Pages/paychecks.aspx", lastVerified: "2026-07-13" },
  PA: { name: "Pennsylvania", sourceUrl: "https://www.pa.gov/agencies/dli", lastVerified: "2026-07-13" },
  RI: { name: "Rhode Island", sourceUrl: "https://dlt.ri.gov/employers/wage-and-hour-regulation", lastVerified: "2026-07-13" },
  SC: { name: "South Carolina", sourceUrl: "https://llr.sc.gov/wage/", lastVerified: "2026-07-13" },
  SD: { name: "South Dakota", sourceUrl: "https://dlr.sd.gov/labor_management_assistance/labor_standards_act.aspx", lastVerified: "2026-07-13" },
  TN: { name: "Tennessee", sourceUrl: "https://www.tn.gov/workforce/employees/labor-laws.html", lastVerified: "2026-07-13" },
  TX: { name: "Texas", sourceUrl: "https://www.twc.texas.gov/businesses/when-be-paid", lastVerified: "2026-07-13" },
  UT: { name: "Utah", sourceUrl: "https://laborcommission.utah.gov/divisions/utah-antidiscrimination-and-labor-uald/", lastVerified: "2026-07-13" },
  VT: { name: "Vermont", sourceUrl: "https://labor.vermont.gov/wages-and-benefits", lastVerified: "2026-07-13" },
  VA: { name: "Virginia", sourceUrl: "https://www.doli.virginia.gov/labor-law/", lastVerified: "2026-07-13" },
  WA: { name: "Washington", sourceUrl: "https://lni.wa.gov/workers-rights/wages/", lastVerified: "2026-07-13" },
  WV: { name: "West Virginia", sourceUrl: "https://labor.wv.gov", lastVerified: "2026-07-13" },
  WI: { name: "Wisconsin", sourceUrl: "https://dwd.wisconsin.gov/er/laborstandards/", lastVerified: "2026-07-13" },
  WY: { name: "Wyoming", sourceUrl: "https://wyomingworkforce.org/businesses/labor-standards/", lastVerified: "2026-07-13" },
} as const satisfies Record<string, UsStateAuthoritySource>;

export type UsStateCode = keyof typeof US_STATE_AUTHORITY_SOURCES;

export function getUsStateAuthoritySource(code: string): UsStateAuthoritySource {
  const source = US_STATE_AUTHORITY_SOURCES[code as UsStateCode];
  if (!source) throw new Error(`Missing official authority source for state code: ${code}`);
  return source;
}
