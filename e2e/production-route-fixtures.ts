import { AU_STATES } from "../data/auStates";
import { BLOG_POSTS } from "../data/blogPosts";
import { CA_PROVINCES } from "../data/caProvinces";
import { COMPARISONS } from "../data/comparisons";
import { FAQS } from "../data/faqs";
import { GUIDES } from "../data/guides";
import { TOOLS } from "../data/tools";
import { US_STATES } from "../data/usStates";

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
  ...AU_STATES.map((state) => `/au/states/${state.slug}`),
  ...CA_PROVINCES.map((province) => `/ca/provinces/${province.slug}`),
  ...US_STATES.map((state) => `/us/states/${state.slug}`),
  ...US_STATES.map((state) => `/us/states/${state.slug}/final-paycheck`),
  ...US_STATES.map((state) => `/us/states/${state.slug}/minimum-wage`),
])).sort();
