/**
 * Comprehensive employment-law data for all 50 US states + DC.
 * Drives the /us/states/[state]/ programmatic SEO pages.
 *
 * Sources:
 * - Minimum wage: DOL Wage and Hour Division state wage data (2025)
 * - Final paycheck: DOL SHRM / state labor statutes (verified 2025)
 * - DOL URLs: official state labor agency URLs
 *
 * Rates change annually; the verifiedYear field marks when data was last
 * checked. Update annually or when a state legislature acts.
 */

import { STATE_PTO, type StatePtoPolicy } from "@/lib/calculators/ptoPayout";

export type UsCensusRegion = "Northeast" | "Midwest" | "South" | "West";

export interface UsStateData {
  slug: string;
  code: string;
  /** US Census Bureau region — drives "nearby states" cross-linking. */
  region: UsCensusRegion;
  name: string;
  /** Display string, e.g. "$16.50/hr" or "$7.25/hr (federal minimum)" */
  minimumWage: string;
  /** Optional extra context, e.g. sector-specific rates */
  minimumWageNote?: string;
  /** Final paycheck deadline when terminated by employer */
  finalPaycheckTerminated: string;
  /** Final paycheck deadline when employee voluntarily resigns */
  finalPaycheckResigned: string;
  /** Primary state labor/DOL agency URL */
  dolUrl: string;
  /** Year data was last verified */
  verifiedYear: number;
  /**
   * Optional state-specific legal context beyond the shared fields above —
   * a distinguishing mechanism, agency process, or law unique to this state.
   * Deliberately not populated for every state: only added where there's a
   * genuinely distinct, well-documented fact worth a dedicated paragraph,
   * rather than padding every page with filler for uniformity's sake.
   */
  localContext?: string;
  /**
   * A second, sourced state-only block for hubs that need more practical
   * enforcement detail. Kept structured so the source and review date are
   * always displayed with the prose rather than separated in a global footer.
   */
  stateSpecificDetail?: {
    heading: string;
    body: string;
    sourceLabel: string;
    sourceUrl: string;
    sourceReviewed: string;
  };
  /**
   * ISO date this specific state record's page content (not just the
   * shared rate fields) last genuinely changed -- e.g. when localContext
   * was added. Only set on records that actually changed; falls back to
   * `${verifiedYear}-01-01` in the sitemap for every other state rather
   * than fabricating per-state precision that doesn't exist.
   */
  lastContentUpdate?: string;
}

const RAW: UsStateData[] = [
  {
    slug: "alabama",
    code: "AL",
    region: "South",
    name: "Alabama",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next regular payday",
    finalPaycheckResigned: "Next regular payday",
    dolUrl: "https://labor.alabama.gov",
    verifiedYear: 2025,
  },
  {
    slug: "alaska",
    code: "AK",
    region: "West",
    name: "Alaska",
    minimumWage: "$11.73/hr",
    finalPaycheckTerminated: "Within 3 working days",
    finalPaycheckResigned: "Next regular payday or within 3 working days",
    dolUrl: "https://labor.alaska.gov/lss/home.htm",
    verifiedYear: 2025,
  },
  {
    slug: "arizona",
    code: "AZ",
    region: "West",
    name: "Arizona",
    minimumWage: "$14.70/hr",
    finalPaycheckTerminated: "Within 7 business days or next payday (whichever is sooner)",
    finalPaycheckResigned: "Within 7 business days or next payday (whichever is sooner)",
    dolUrl: "https://www.azica.gov/divisions/labor-department",
    verifiedYear: 2025,
  },
  {
    slug: "arkansas",
    code: "AR",
    region: "South",
    name: "Arkansas",
    minimumWage: "$11.00/hr",
    finalPaycheckTerminated: "Within 7 days of separation",
    finalPaycheckResigned: "Within 7 days of separation",
    dolUrl: "https://www.labor.arkansas.gov",
    verifiedYear: 2025,
  },
  {
    slug: "california",
    code: "CA",
    region: "West",
    name: "California",
    minimumWage: "$16.50/hr",
    minimumWageNote: "$20/hr for fast food restaurant employees (AB 1228)",
    finalPaycheckTerminated: "Immediately on the day of termination",
    finalPaycheckResigned:
      "Within 72 hours if no notice given; immediately if 72+ hours notice was provided",
    dolUrl: "https://www.dir.ca.gov/dlse/",
    verifiedYear: 2025,
    localContext:
      "California is unusual in letting workers enforce Labor Code violations directly: under the Private Attorneys General Act (PAGA), an employee can sue on behalf of themselves, coworkers, and the state to recover civil penalties for violations like late final wages or missing meal breaks — not just their own unpaid amount. This sits alongside the standard DLSE wage claim process and is one reason California final-pay disputes can carry larger exposure for employers than in most other states.",
    lastContentUpdate: "2026-07-09",
  },
  {
    slug: "colorado",
    code: "CO",
    region: "West",
    name: "Colorado",
    minimumWage: "$14.81/hr",
    finalPaycheckTerminated: "Immediately on the day of termination",
    finalPaycheckResigned: "Next scheduled payday (may be mailed within 14 days if requested)",
    dolUrl: "https://cdle.colorado.gov/wages",
    verifiedYear: 2025,
  },
  {
    slug: "connecticut",
    code: "CT",
    region: "Northeast",
    name: "Connecticut",
    minimumWage: "$16.94/hr",
    minimumWageNote:
      "Effective 1 January 2026; Connecticut indexes the statewide rate annually to the federal Employment Cost Index",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://portal.ct.gov/dol/divisions/wage-and-workplace-standards",
    verifiedYear: 2026,
    lastContentUpdate: "2026-07-18",
  },
  {
    slug: "delaware",
    code: "DE",
    region: "South",
    name: "Delaware",
    minimumWage: "$15.00/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://labor.delaware.gov",
    verifiedYear: 2025,
  },
  {
    slug: "district-of-columbia",
    code: "DC",
    region: "South",
    name: "District of Columbia",
    minimumWage: "$17.50/hr",
    finalPaycheckTerminated: "Next business day after separation",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://does.dc.gov/page/office-wage-hour",
    verifiedYear: 2025,
  },
  {
    slug: "florida",
    code: "FL",
    region: "South",
    name: "Florida",
    minimumWage: "$14.00/hr",
    minimumWageNote: "Effective 30 September 2025; increases $1/hr annually until $15 is reached",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://floridajobs.org/business-growth-and-partnerships/for-employers/labor-laws",
    verifiedYear: 2025,
    localContext:
      "Florida's minimum wage rises automatically each year under a 2020 constitutional amendment voters approved, so the rate is not something the legislature can quietly freeze or roll back the way many other states' rates are. Unlike California or New York, though, Florida has no dedicated state agency that investigates individual minimum-wage complaints — workers generally pursue underpayment through a private civil claim or the federal Department of Labor rather than a state wage-claim process.",
    lastContentUpdate: "2026-07-09",
  },
  {
    slug: "georgia",
    code: "GA",
    region: "South",
    name: "Georgia",
    minimumWage: "$7.25/hr (federal minimum)",
    minimumWageNote: "State minimum is $5.15/hr, but federal minimum of $7.25 applies to most employers",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://dol.georgia.gov",
    verifiedYear: 2025,
  },
  {
    slug: "hawaii",
    code: "HI",
    region: "West",
    name: "Hawaii",
    minimumWage: "$14.00/hr",
    finalPaycheckTerminated: "Next business day after termination",
    finalPaycheckResigned: "Next regular payday",
    dolUrl: "https://labor.hawaii.gov/wsd/",
    verifiedYear: 2025,
  },
  {
    slug: "idaho",
    code: "ID",
    region: "West",
    name: "Idaho",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next scheduled payday or within 10 days (whichever is sooner)",
    finalPaycheckResigned: "Next scheduled payday or within 10 days (whichever is sooner)",
    dolUrl: "https://labor.idaho.gov/dnn/",
    verifiedYear: 2025,
  },
  {
    slug: "illinois",
    code: "IL",
    region: "Midwest",
    name: "Illinois",
    minimumWage: "$15.00/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://labor.illinois.gov",
    verifiedYear: 2025,
  },
  {
    slug: "indiana",
    code: "IN",
    region: "Midwest",
    name: "Indiana",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.in.gov/dol/",
    verifiedYear: 2025,
  },
  {
    slug: "iowa",
    code: "IA",
    region: "Midwest",
    name: "Iowa",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next regular payday",
    finalPaycheckResigned: "Next regular payday",
    dolUrl: "https://www.iowadivisionoflabor.gov",
    verifiedYear: 2025,
  },
  {
    slug: "kansas",
    code: "KS",
    region: "Midwest",
    name: "Kansas",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next regular payday",
    finalPaycheckResigned: "Next regular payday",
    dolUrl: "https://www.dol.ks.gov",
    verifiedYear: 2026,
    localContext:
      "Kansas has a state-run wage-claim process even though most covered workers rely on the federal $7.25 minimum-wage floor. The Kansas Department of Labor's Office of Employment Standards accepts claims under the Kansas Wage Payment Law, K.S.A. 44-313 et seq., for earned wages or benefits that were not paid. After a complete claim is filed, a labor conciliator sends it to the employer and the employer must provide a written response; unresolved cases can proceed to an administrative hearing, followed by review by the Secretary of Labor. That process is materially different from states that send nearly every private wage dispute to the federal Wage and Hour Division. Kansas also has a state overtime rule after 46 hours for employees outside federal FLSA coverage, so workers should first confirm which law covers their employer rather than assuming the state threshold replaces the federal 40-hour rule.",
    stateSpecificDetail: {
      heading: "How a Kansas wage claim moves forward",
      body:
        "Kansas workers use the Department of Labor's K-ESLR 105 wage-claim form and attach records showing the work performed and the amount still due. The Office of Employment Standards first sends a complete claim to the employer and tries to resolve the dispute through a labor conciliator. If conciliation fails, the case can move to an administrative hearing and then to review by the Secretary of Labor. A successful order can also be assigned to the department for collection, although the agency warns that collection is not guaranteed. That sequence makes the state form, pay records and benefit policy important before a worker chooses a different enforcement route.",
      sourceLabel: "Kansas Department of Labor — Wage Claims",
      sourceUrl: "https://www.dol.ks.gov/employers/workplace-laws/wage-claims",
      sourceReviewed: "17 July 2026",
    },
    lastContentUpdate: "2026-07-17",
  },
  {
    slug: "kentucky",
    code: "KY",
    region: "South",
    name: "Kentucky",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next regular payday or within 14 days (whichever is later)",
    finalPaycheckResigned: "Next regular payday or within 14 days (whichever is later)",
    dolUrl: "https://labor.ky.gov/Pages/Home.aspx",
    verifiedYear: 2025,
  },
  {
    slug: "louisiana",
    code: "LA",
    region: "South",
    name: "Louisiana",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Within 15 days of separation",
    finalPaycheckResigned: "Within 15 days of separation",
    dolUrl: "https://www.laworks.net",
    verifiedYear: 2025,
  },
  {
    slug: "maine",
    code: "ME",
    region: "Northeast",
    name: "Maine",
    minimumWage: "$14.65/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.maine.gov/labor/labor_laws/",
    verifiedYear: 2025,
  },
  {
    slug: "maryland",
    code: "MD",
    region: "South",
    name: "Maryland",
    minimumWage: "$15.00/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.dllr.state.md.us/labor/wages/",
    verifiedYear: 2025,
  },
  {
    slug: "massachusetts",
    code: "MA",
    region: "Northeast",
    name: "Massachusetts",
    minimumWage: "$15.00/hr",
    finalPaycheckTerminated: "Day of termination",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.mass.gov/orgs/department-of-labor-standards",
    verifiedYear: 2025,
  },
  {
    slug: "michigan",
    code: "MI",
    region: "Midwest",
    name: "Michigan",
    minimumWage: "$10.33/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.michigan.gov/leo/bureaus-agencies/ors/wh",
    verifiedYear: 2025,
  },
  {
    slug: "minnesota",
    code: "MN",
    region: "Midwest",
    name: "Minnesota",
    minimumWage: "$10.85/hr",
    finalPaycheckTerminated: "Within 24 hours of a written demand",
    finalPaycheckResigned: "Next regular payday or within 20 days (whichever is sooner)",
    dolUrl: "https://www.dli.mn.gov/business/employment-practices/minimum-wage-minnesota",
    verifiedYear: 2025,
  },
  {
    slug: "mississippi",
    code: "MS",
    region: "South",
    name: "Mississippi",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next regular payday",
    finalPaycheckResigned: "Next regular payday",
    dolUrl: "https://mdes.ms.gov",
    verifiedYear: 2026,
    localContext:
      "Mississippi does not operate a general state wage-and-hour enforcement system comparable to California's DLSE or Kansas's Employment Standards office. The Mississippi Department of Employment Security explains that many wage, overtime, child-labor and family-leave questions are enforced by federal agencies rather than MDES; for Fair Labor Standards Act issues it directs workers to the U.S. Department of Labor's Wage and Hour Division. MDES publishes that referral in its Employment Issues guidance rather than offering an MDES wage-claim form. MDES itself principally administers unemployment insurance, workforce services and labor-market information. That division of responsibility matters in practice: a Mississippi worker with an unpaid-minimum-wage or overtime complaint should not assume an unemployment office can decide the wage claim. Preserve time records, pay stubs and the employer's written PTO policy, then confirm the correct federal or civil enforcement route for the particular dispute. The absence of a state PTO-payout mandate does not cancel a clear contractual promise in an employer policy.",
    stateSpecificDetail: {
      heading: "Which agency handles a Mississippi workplace complaint",
      body:
        "Mississippi's official Employment Issues page acts as a routing guide rather than a state wage-claim portal. It directs minimum-wage, overtime, child-labor and federal family-leave questions to the U.S. Department of Labor's Wage and Hour Division. It separately points discrimination matters to the EEOC, workplace-safety complaints to OSHA and job-injury claims to the Mississippi Workers' Compensation Commission. That split is useful before filing: identify whether the dispute is about unpaid wages, discrimination, safety or an injury, then preserve the records for the agency that actually has authority. MDES remains the relevant state contact for unemployment benefits, but it does not replace those enforcement bodies for the other categories.",
      sourceLabel: "Mississippi Department of Employment Security — Employment Issues",
      sourceUrl: "https://www.mdes.ms.gov/employers/unemployment-tax/employer-resources/employment-issues/",
      sourceReviewed: "17 July 2026",
    },
    lastContentUpdate: "2026-07-17",
  },
  {
    slug: "missouri",
    code: "MO",
    region: "Midwest",
    name: "Missouri",
    minimumWage: "$13.75/hr",
    minimumWageNote: "Increased from $12.30 under Proposition A (effective May 2025)",
    finalPaycheckTerminated: "Immediately if possible; otherwise next payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://labor.mo.gov/DLS",
    verifiedYear: 2025,
  },
  {
    slug: "montana",
    code: "MT",
    region: "West",
    name: "Montana",
    minimumWage: "$10.30/hr",
    finalPaycheckTerminated: "Next business day after separation",
    finalPaycheckResigned: "Next payday or within 10 days (whichever is earlier)",
    dolUrl: "https://erd.dli.mt.gov/labor-standards/wage-and-hour-payment-act",
    verifiedYear: 2025,
  },
  {
    slug: "nebraska",
    code: "NE",
    region: "Midwest",
    name: "Nebraska",
    minimumWage: "$13.50/hr",
    minimumWageNote: "Increases to $15.00/hr on 1 January 2026 per LB 1",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://dol.nebraska.gov/LaborStandards",
    verifiedYear: 2025,
  },
  {
    slug: "nevada",
    code: "NV",
    region: "West",
    name: "Nevada",
    minimumWage: "$12.00/hr",
    finalPaycheckTerminated: "Within 3 days of termination",
    finalPaycheckResigned: "Next regular payday or within 7 days (whichever is sooner)",
    dolUrl: "https://labor.nv.gov",
    verifiedYear: 2025,
  },
  {
    slug: "new-hampshire",
    code: "NH",
    region: "Northeast",
    name: "New Hampshire",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Within 72 hours of separation",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.nh.gov/labor/",
    verifiedYear: 2025,
  },
  {
    slug: "new-jersey",
    code: "NJ",
    region: "Northeast",
    name: "New Jersey",
    minimumWage: "$15.49/hr",
    minimumWageNote: "Rate for most employers; seasonal and agricultural workers may differ",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.nj.gov/labor/wageandhour/",
    verifiedYear: 2025,
  },
  {
    slug: "new-mexico",
    code: "NM",
    region: "West",
    name: "New Mexico",
    minimumWage: "$12.00/hr",
    finalPaycheckTerminated: "Within 5 days of termination",
    finalPaycheckResigned: "Within 10 days of resignation",
    dolUrl: "https://www.dws.state.nm.us/Labor-Relations",
    verifiedYear: 2025,
  },
  {
    slug: "new-york",
    code: "NY",
    region: "Northeast",
    name: "New York",
    minimumWage: "$16.50/hr (NYC/Nassau/Suffolk/Westchester); $15.50/hr (rest of state)",
    minimumWageNote: "Rate increases statewide scheduled annually through 2026",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://dol.ny.gov/minimum-wage",
    verifiedYear: 2025,
    localContext:
      "New York's Wage Theft Prevention Act requires employers to give every worker written notice of their pay rate and payday at the time of hire, and it lets underpaid workers recover liquidated damages of up to 100% of the unpaid amount on top of the wages owed — a materially stronger deterrent than the standard interest-only remedy in many other states. New York's minimum wage is also unusual in varying by region within the same state rather than applying one flat statewide rate.",
    lastContentUpdate: "2026-07-09",
  },
  {
    slug: "north-carolina",
    code: "NC",
    region: "South",
    name: "North Carolina",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.labor.nc.gov/workplace-rights/employee-rights-regarding-time-worked-and-wages-earned",
    verifiedYear: 2025,
  },
  {
    slug: "north-dakota",
    code: "ND",
    region: "Midwest",
    name: "North Dakota",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next payday (within 15 days)",
    finalPaycheckResigned: "Next payday (within 15 days)",
    dolUrl: "https://www.nd.gov/labor/",
    verifiedYear: 2025,
  },
  {
    slug: "ohio",
    code: "OH",
    region: "Midwest",
    name: "Ohio",
    minimumWage: "$10.45/hr",
    minimumWageNote: "For employers with gross receipts over $385,000/year; $7.25 for smaller employers",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.dol.gov/agencies/whd/state/contacts",
    verifiedYear: 2025,
  },
  {
    slug: "oklahoma",
    code: "OK",
    region: "South",
    name: "Oklahoma",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.ok.gov/odol/",
    verifiedYear: 2025,
  },
  {
    slug: "oregon",
    code: "OR",
    region: "West",
    name: "Oregon",
    minimumWage: "$14.70/hr (standard)",
    minimumWageNote: "Portland metro: $15.95/hr; nonurban counties: $13.70/hr (2025 rates)",
    finalPaycheckTerminated: "End of the next business day after termination",
    finalPaycheckResigned:
      "Last day of work if 48+ hours notice given; within 5 business days otherwise",
    dolUrl: "https://www.oregon.gov/boli/workers/Pages/paychecks.aspx",
    verifiedYear: 2025,
  },
  {
    slug: "pennsylvania",
    code: "PA",
    region: "Northeast",
    name: "Pennsylvania",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.dli.pa.gov/Individuals/Labor-Management-Relations/llc/Pages/minimum-wage.aspx",
    verifiedYear: 2025,
  },
  {
    slug: "rhode-island",
    code: "RI",
    region: "Northeast",
    name: "Rhode Island",
    minimumWage: "$15.00/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://dlt.ri.gov/employers/wage-and-hour-regulation",
    verifiedYear: 2025,
  },
  {
    slug: "south-carolina",
    code: "SC",
    region: "South",
    name: "South Carolina",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Within 48 hours or next scheduled payday (whichever is later)",
    finalPaycheckResigned: "Within 48 hours or next scheduled payday (whichever is later)",
    dolUrl: "https://llr.sc.gov/wage/",
    verifiedYear: 2025,
  },
  {
    slug: "south-dakota",
    code: "SD",
    region: "Midwest",
    name: "South Dakota",
    minimumWage: "$11.20/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://dlr.sd.gov/labor_management_assistance/labor_standards_act.aspx",
    verifiedYear: 2025,
  },
  {
    slug: "tennessee",
    code: "TN",
    region: "South",
    name: "Tennessee",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Within 21 days or next regular payday (whichever is later)",
    finalPaycheckResigned: "Within 21 days or next regular payday (whichever is later)",
    dolUrl: "https://www.tn.gov/workforce/employees/labor-laws.html",
    verifiedYear: 2025,
  },
  {
    slug: "texas",
    code: "TX",
    region: "South",
    name: "Texas",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Within 6 calendar days of discharge",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.twc.texas.gov/businesses/when-be-paid",
    verifiedYear: 2025,
    localContext:
      "Texas has no state minimum wage above the federal floor and no state income tax, which changes the calculus for both employers and workers compared to states like California or New York. Wage claims are handled under the Texas Payday Law (Labor Code Chapter 61) through the Texas Workforce Commission rather than a dedicated labor department, and a claim generally must be filed within 180 days of the date wages were due — a materially shorter window than several neighboring states allow.",
    lastContentUpdate: "2026-07-09",
  },
  {
    slug: "utah",
    code: "UT",
    region: "West",
    name: "Utah",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Within 24 hours of a written demand",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://laborcommission.utah.gov/divisions/utah-antidiscrimination-and-labor-uald/",
    verifiedYear: 2025,
  },
  {
    slug: "vermont",
    code: "VT",
    region: "Northeast",
    name: "Vermont",
    minimumWage: "$13.67/hr",
    finalPaycheckTerminated: "Within 72 hours of separation",
    finalPaycheckResigned: "Within 72 hours of separation",
    dolUrl: "https://labor.vermont.gov/wages-and-benefits",
    verifiedYear: 2025,
  },
  {
    slug: "virginia",
    code: "VA",
    region: "South",
    name: "Virginia",
    minimumWage: "$12.41/hr",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://www.doli.virginia.gov/labor-law/",
    verifiedYear: 2025,
  },
  {
    slug: "washington",
    code: "WA",
    region: "West",
    name: "Washington",
    minimumWage: "$16.66/hr",
    finalPaycheckTerminated: "End of the established pay period",
    finalPaycheckResigned: "End of the established pay period",
    dolUrl: "https://lni.wa.gov/workers-rights/wages/",
    verifiedYear: 2025,
  },
  {
    slug: "west-virginia",
    code: "WV",
    region: "South",
    name: "West Virginia",
    minimumWage: "$8.75/hr",
    finalPaycheckTerminated: "Within 72 hours of separation",
    finalPaycheckResigned: "Within 72 hours of separation",
    dolUrl: "https://labor.wv.gov",
    verifiedYear: 2025,
  },
  {
    slug: "wisconsin",
    code: "WI",
    region: "Midwest",
    name: "Wisconsin",
    minimumWage: "$7.25/hr (federal minimum)",
    finalPaycheckTerminated: "Next scheduled payday",
    finalPaycheckResigned: "Next scheduled payday",
    dolUrl: "https://dwd.wisconsin.gov/er/laborstandards/",
    verifiedYear: 2025,
  },
  {
    slug: "wyoming",
    code: "WY",
    region: "West",
    name: "Wyoming",
    minimumWage: "$7.25/hr (federal minimum)",
    minimumWageNote: "State minimum is $5.15/hr, but federal minimum of $7.25 applies to most employers",
    finalPaycheckTerminated: "Within 5 business days",
    finalPaycheckResigned: "Within 5 business days",
    dolUrl: "https://wyomingworkforce.org/businesses/labor-standards/",
    verifiedYear: 2026,
    localContext:
      "Wyoming assigns unpaid-wage enforcement to the Labor Standards program within the Department of Workforce Services. Its administrative rules provide for a signed written or electronic claim alleging wages owed under Wyoming wage statutes. Labor Standards serves the claim on the employer, and the employer generally has 10 days from the agency letter to answer; the program can investigate and order payment where liability is established. The rules define compensation broadly enough to include pay, salary, bonuses and commissions, while fringe-benefit disputes can turn on the employer's agreement or policy. This gives Wyoming workers a specific state claim route even though the federal minimum wage applies to most employment and the state does not impose a blanket PTO cash-out rule. For a final-pay dispute, keep the separation notice, final timesheet, commission terms and written vacation policy so the agency can distinguish earned compensation from a benefit the policy never promised to pay.",
    stateSpecificDetail: {
      heading: "Before filing with Wyoming Labor Standards",
      body:
        "Wyoming's Department of Workforce Services says its wage-claim process is for work performed in Wyoming and asks the worker to try resolving the shortage with the employer first. Filing the state form authorizes Labor Standards to investigate and attempt collection, including a possible partial settlement. That makes the chronology important: keep the written request to the employer, the employer's response, time and pay records, and any commission or vacation agreement. A worker whose job was performed outside Wyoming should not assume that the Wyoming form is the correct route merely because the employer is based there. The agency's form and instructions should be checked before sending sensitive payroll documents.",
      sourceLabel: "Wyoming Department of Workforce Services — File a Claim for Wages",
      sourceUrl: "https://dws.wyo.gov/dws-division/labor-standards/file-a-claim-for-wages/",
      sourceReviewed: "17 July 2026",
    },
    lastContentUpdate: "2026-07-17",
  },
];

export type UsStateWithPto = UsStateData & { pto: StatePtoPolicy };

export const US_STATES: UsStateWithPto[] = RAW.map((s) => ({
  ...s,
  pto: STATE_PTO.find((p) => p.code === s.code)!,
}));

export function getUsState(slug: string): UsStateWithPto | undefined {
  return US_STATES.find((s) => s.slug === slug);
}

/**
 * Other states in the same Census region, alphabetically ordered, excluding
 * the given state. Powers the "Compare nearby states" cross-linking module
 * on state pages so state-to-state discovery doesn't depend entirely on the
 * central /us hub.
 */
export function getNearbyStates(slug: string, limit = 5): UsStateWithPto[] {
  const current = getUsState(slug);
  if (!current) return [];
  return US_STATES.filter((s) => s.region === current.region && s.slug !== slug)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}
