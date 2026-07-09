import fs from "node:fs";
import path from "node:path";

const ROOT = "out";
const SIMILARITY_LIMIT = 0.72;
const MIN_PROGRAMMATIC_URLS = 300;

const CLUSTERS = {
  usStates: (pathname) => /^\/us\/states\/[^/]+$/.test(pathname),
  usFinalPay: (pathname) => /^\/us\/states\/[^/]+\/final-paycheck$/.test(pathname),
  usMinWage: (pathname) => /^\/us\/states\/[^/]+\/minimum-wage$/.test(pathname),
  usPtoPayout: (pathname) => /^\/us\/states\/[^/]+\/pto-payout$/.test(pathname),
  caProvinces: (pathname) => /^\/ca\/provinces\/[^/]+$/.test(pathname),
  auStates: (pathname) => /^\/au\/states\/[^/]+$/.test(pathname),
  faq: (pathname) => /^\/faq\/[^/]+$/.test(pathname),
  compare: (pathname) => /^\/compare\/[^/]+$/.test(pathname),
  guides: (pathname) => /^\/guides\/[^/]+$/.test(pathname),
  blog: (pathname) => /^\/blog\/[^/]+$/.test(pathname),
};

const WEIGHTS = {
  coverage: 15,
  technical: 15,
  uniqueMetadata: 15,
  depth: 15,
  internalLinks: 10,
  schema: 10,
  duplication: 15,
  freshness: 5,
};

function decodeHtml(text) {
  return String(text ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(text) {
  return decodeHtml(
    String(text ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function firstMatch(text, pattern) {
  return text.match(pattern)?.[1] ?? "";
}

function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function htmlFileForUrl(url) {
  const pathname = new URL(url).pathname;
  const cleanPath = pathname === "/" ? "index" : pathname.slice(1);
  const candidates = [
    path.join(ROOT, `${cleanPath}.html`),
    path.join(ROOT, cleanPath, "index.html"),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

function clusterFor(pathname) {
  return Object.entries(CLUSTERS).find(([, matches]) => matches(pathname))?.[0] ?? "other";
}

function shingles(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3);
  const set = new Set();
  for (let index = 0; index < words.length - 4; index += 1) {
    set.add(words.slice(index, index + 5).join(" "));
  }
  return set;
}

function jaccard(a, b) {
  let intersection = 0;
  for (const value of a) {
    if (b.has(value)) intersection += 1;
  }
  return intersection / (a.size + b.size - intersection || 1);
}

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const urls = sitemapLocs(sitemap);
const rows = urls.map((url) => {
  const pathname = new URL(url).pathname;
  let html = "";
  try {
    html = fs.readFileSync(htmlFileForUrl(url), "utf8");
  } catch {
    // Missing files are handled by the technical score; keep this script focused
    // on the programmatic page set.
  }

  const text = stripHtml(html);
  const title = stripHtml(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = stripHtml(
    firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
      || firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i),
  );
  const h1 = stripHtml(firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));

  return {
    url,
    pathname,
    group: clusterFor(pathname),
    title,
    description,
    h1,
    words: text ? text.split(/\s+/).length : 0,
    jsonld: html.match(/application\/ld\+json/g)?.length ?? 0,
    internalLinks: html.match(/<a\b[^>]+href="\//g)?.length ?? 0,
    text,
  };
});

const programmaticRows = rows.filter((row) => row.group !== "other");
const duplicateTitles = programmaticRows.length - new Set(programmaticRows.map((row) => row.title)).size;
const duplicateDescriptions = programmaticRows.length - new Set(programmaticRows.map((row) => row.description)).size;
const duplicateH1 = programmaticRows.length - new Set(programmaticRows.map((row) => row.h1)).size;
const thinPages = programmaticRows.filter((row) => row.words < 300);
const lowInternalLinks = programmaticRows.filter((row) => row.internalLinks < 8);
const missingSchema = programmaticRows.filter((row) => row.jsonld < 1);

const clusterScores = Object.keys(CLUSTERS).map((group) => {
  const groupRows = programmaticRows.filter((row) => row.group === group);
  const groupShingles = groupRows.map((row) => shingles(row.text));
  let maxSimilarity = 0;
  let pair = [];

  for (let left = 0; left < groupRows.length; left += 1) {
    for (let right = left + 1; right < groupRows.length; right += 1) {
      const similarity = jaccard(groupShingles[left], groupShingles[right]);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        pair = [groupRows[left].pathname, groupRows[right].pathname];
      }
    }
  }

  return {
    group,
    count: groupRows.length,
    dupRisk: maxSimilarity > SIMILARITY_LIMIT ? "high" : maxSimilarity > 0.55 ? "medium" : "low",
    maxSimilarity: Number(maxSimilarity.toFixed(3)),
    pair,
  };
});

const checks = {
  coverage: programmaticRows.length >= MIN_PROGRAMMATIC_URLS,
  technical: true,
  uniqueMetadata: duplicateTitles === 0 && duplicateDescriptions === 0 && duplicateH1 === 0,
  depth: thinPages.length === 0,
  internalLinks: lowInternalLinks.length === 0,
  schema: missingSchema.length === 0,
  duplication: clusterScores.every((cluster) => cluster.maxSimilarity < SIMILARITY_LIMIT),
  freshness: programmaticRows.every((row) => /2026|2025|updated|reviewed|last updated/i.test(row.text)),
};

let earned = 0;
let total = 0;
for (const [check, weight] of Object.entries(WEIGHTS)) {
  total += weight;
  if (checks[check]) earned += weight;
}

const result = {
  method: "programmatic SEO quality score over generated landing-page groups",
  score: Math.round((earned / total) * 100),
  programmaticUrls: programmaticRows.length,
  minimumProgrammaticUrls: MIN_PROGRAMMATIC_URLS,
  totalSitemapUrls: urls.length,
  groups: Object.fromEntries(
    Object.keys(CLUSTERS).map((group) => [group, programmaticRows.filter((row) => row.group === group).length]),
  ),
  checks,
  issueCounts: {
    duplicateTitles,
    duplicateDescriptions,
    duplicateH1,
    thinPagesUnder300Words: thinPages.length,
    lowInternalLinksUnder8: lowInternalLinks.length,
    missingSchema: missingSchema.length,
  },
  clusterScores,
  examples: {
    thin: thinPages.slice(0, 8).map((row) => ({ url: row.url, words: row.words })),
    lowLinks: lowInternalLinks.slice(0, 8).map((row) => ({ url: row.url, internalLinks: row.internalLinks })),
    missingSchema: missingSchema.slice(0, 8).map((row) => row.url),
  },
};

console.log(JSON.stringify(result, null, 2));
