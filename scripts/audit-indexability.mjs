import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const SITEMAP_PATH = path.join(OUT_DIR, "sitemap.xml");
const REPORT_PATH = path.join(ROOT, "reports", "indexability-audit.json");
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mypayrights.com";
const ERROR_MARKERS = [
  "Application error",
  "NEXT_STATIC_GEN_BAILOUT",
  "Page Not Found",
  "Page not found",
];

function normalizeRoute(route) {
  if (!route || route === "/") return "/";
  return route.endsWith("/") ? route.slice(0, -1) : route;
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&apos;/gi, "'")
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function stripTags(html) {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function countWords(text) {
  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
}

function extractTag(html, pattern) {
  const match = html.match(pattern)?.[1];
  return match ? decodeEntities(match).trim() : "";
}

function extractMetaContent(html, attr, value) {
  const pattern = new RegExp(
    `<meta[^>]+${attr}=["']${escapeRegex(value)}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  return extractTag(html, pattern);
}

function extractLinkHref(html, rel) {
  const pattern = new RegExp(
    `<link[^>]+rel=["']${escapeRegex(rel)}["'][^>]+href=["']([^"']+)["'][^>]*>`,
    "i",
  );
  return extractTag(html, pattern);
}

function htmlPathForRoute(route) {
  if (route === "/") return [path.join(OUT_DIR, "index.html")];
  const trimmed = route.replace(/^\//, "");
  return [
    path.join(OUT_DIR, `${trimmed}.html`),
    path.join(OUT_DIR, trimmed, "index.html"),
  ];
}

function parseSitemapRoutes(xml) {
  const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
  return Array.from(matches, (match) => {
    const url = new URL(match[1]);
    if (url.origin !== SITE_URL) return null;
    return normalizeRoute(url.pathname);
  }).filter(Boolean);
}

function minimumWordsForRoute(route) {
  if (route === "/") return 180;
  if (["/about", "/contact", "/editorial-policy", "/methodology"].includes(route)) return 140;
  if (["/privacy", "/terms", "/disclaimer"].includes(route)) return 100;
  if (
    route === "/guides" ||
    route === "/blog" ||
    route === "/compare" ||
    route === "/faq" ||
    route === "/uk" ||
    route === "/us" ||
    route === "/ca" ||
    route === "/au" ||
    route === "/fr"
  ) {
    return 150;
  }
  if (route.startsWith("/faq/")) return 170;
  if (route.startsWith("/blog/") || route.startsWith("/guides/") || route.startsWith("/compare/")) {
    return 220;
  }
  return 180;
}

function expectsStructuredData(route) {
  return !["/contact", "/privacy", "/terms", "/disclaimer"].includes(route);
}

const sitemapXml = await readFile(SITEMAP_PATH, "utf8");
const sitemapRoutes = parseSitemapRoutes(sitemapXml);

const failures = [];
const warnings = [];
const results = [];

for (const route of sitemapRoutes) {
  const expectedCanonical = route === "/" ? SITE_URL : `${SITE_URL}${route}`;
  const candidates = htmlPathForRoute(route);
  let htmlPath = null;
  let html = "";

  for (const candidate of candidates) {
    try {
      html = await readFile(candidate, "utf8");
      htmlPath = candidate;
      break;
    } catch {
      // try next candidate
    }
  }

  if (!htmlPath) {
    failures.push({ route, reason: "missing_html" });
    continue;
  }

  const title = extractTag(html, /<title>(.*?)<\/title>/i);
  const description = extractMetaContent(html, "name", "description");
  const robots = extractMetaContent(html, "name", "robots");
  const canonical = extractLinkHref(html, "canonical");
  const h1 = extractTag(html, /<h1[^>]*>(.*?)<\/h1>/i);
  const jsonLdCount = (html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>/gi) ?? []).length;
  const visibleText = stripTags(html);
  const words = countWords(visibleText);
  const minWords = minimumWordsForRoute(route);
  const hasErrorMarker =
    title === "Page Not Found" ||
    ERROR_MARKERS.some((marker) => visibleText.includes(marker));

  results.push({
    route,
    htmlPath: path.relative(ROOT, htmlPath),
    title,
    descriptionLength: description.length,
    canonical,
    robots: robots || "index, follow (implicit)",
    jsonLdCount,
    h1,
    words,
    minimumWords: minWords,
  });

  if (!title) failures.push({ route, reason: "missing_title" });
  if (!description) failures.push({ route, reason: "missing_description" });
  if (!canonical) failures.push({ route, reason: "missing_canonical" });
  if (canonical && canonical !== expectedCanonical) {
    failures.push({ route, reason: "canonical_mismatch", expected: expectedCanonical, actual: canonical });
  }
  if (robots && /\bnoindex\b/i.test(robots)) failures.push({ route, reason: "noindex_in_sitemap" });
  if (hasErrorMarker) failures.push({ route, reason: "error_marker_present" });

  if (description.length > 180) {
    warnings.push({ route, reason: "description_too_long", length: description.length });
  } else if (description && description.length < 60) {
    warnings.push({ route, reason: "description_too_short", length: description.length });
  }

  if (!h1) warnings.push({ route, reason: "missing_h1" });
  if (expectsStructuredData(route) && jsonLdCount === 0) {
    warnings.push({ route, reason: "missing_json_ld" });
  }
  if (words < minWords) {
    warnings.push({ route, reason: "low_word_count", words, minimumWords: minWords });
  }
}

await mkdir(path.dirname(REPORT_PATH), { recursive: true });
await writeFile(
  REPORT_PATH,
  `${JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      siteUrl: SITE_URL,
      sitemapRoutes: sitemapRoutes.length,
      failures,
      warnings,
      results,
    },
    null,
    2,
  )}\n`,
);

console.log(`Checked ${sitemapRoutes.length} sitemap routes for indexability.`);

if (warnings.length > 0) {
  console.warn("\nIndexability warnings:");
  for (const warning of warnings.slice(0, 80)) {
    const details = Object.entries(warning)
      .filter(([key]) => key !== "route" && key !== "reason")
      .map(([key, value]) => `${key}=${value}`)
      .join(" ");
    console.warn(`- ${warning.route} ${warning.reason}${details ? ` (${details})` : ""}`);
  }
  if (warnings.length > 80) {
    console.warn(`... ${warnings.length - 80} more warnings`);
  }
}

if (failures.length > 0) {
  console.error("\nIndexability failures:");
  for (const failure of failures) {
    const details = Object.entries(failure)
      .filter(([key]) => key !== "route" && key !== "reason")
      .map(([key, value]) => `${key}=${value}`)
      .join(" ");
    console.error(`- ${failure.route} ${failure.reason}${details ? ` (${details})` : ""}`);
  }
  console.error(`\nFull report written to ${path.relative(ROOT, REPORT_PATH)}`);
  process.exit(1);
}

console.log("\nIndexability audit passed with no blocking SEO issues.");
console.log(`Full report written to ${path.relative(ROOT, REPORT_PATH)}`);
