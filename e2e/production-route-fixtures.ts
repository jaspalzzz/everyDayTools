import { AU_STATES } from "../data/auStates";
import { BLOG_POSTS } from "../data/blogPosts";
import { CA_PROVINCES } from "../data/caProvinces";
import { COMPARISONS } from "../data/comparisons";
import { FAQS } from "../data/faqs";
import { GUIDES } from "../data/guides";
import { TOOLS } from "../data/tools";
import { US_STATES } from "../data/usStates";
import { isIndexableAuState, isIndexableCaProvince, isIndexableUsState } from "../lib/contentQuality";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/au",
  "/blog",
  "/ca",
  "/compare",
  "/contact",
  "/disclaimer",
  "/editorial-policy",
  "/faq",
  "/fr",
  "/fr/informations-legales",
  "/fr/ca/indemnite-de-depart",
  "/fr/ca/paie-de-vacances",
  "/fr/ca/preavis",
  "/guides",
  "/methodology",
  "/press",
  "/privacy",
  "/terms",
  "/tupe-wizard",
  "/uk",
  "/uk/leaving-job",
  "/uk/maternity-leave",
  "/uk/pay-rights",
  "/uk/redundancy",
  "/us",
  "/us/final-paycheck",
  "/us/final-paycheck/employer-deduction-checker",
  "/us/final-paycheck/was-my-final-paycheck-late",
  "/us/new-york/pto-payout-calculator",
  "/us/overtime",
  "/us/pto-payout",
] as const;

export const PRODUCTION_ROUTES = Array.from(new Set([
  ...STATIC_ROUTES,
  ...TOOLS.map((tool) => `/${tool.slug}`),
  ...GUIDES.map((guide) => `/guides/${guide.slug}`),
  ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
  ...FAQS.map((faq) => `/faq/${faq.slug}`),
  ...COMPARISONS.map((comparison) => `/compare/${comparison.slug}`),
  // Only gate-passing jurisdiction records are emitted; the rest 404 and must
  // not be asserted as live routes. Only the state hub is published — the
  // minimum-wage/final-paycheck/pto-payout child routes were removed. See
  // lib/contentQuality.ts.
  ...AU_STATES.filter(isIndexableAuState).map((state) => `/au/states/${state.slug}`),
  ...CA_PROVINCES.filter(isIndexableCaProvince).map((province) => `/ca/provinces/${province.slug}`),
  ...US_STATES.filter(isIndexableUsState).map((state) => `/us/states/${state.slug}`),
])).sort();
