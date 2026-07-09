import fs from "node:fs";
import path from "node:path";

const ROOT = "out";
const WEIGHTS = {
  https: 8,
  robots: 8,
  sitemap: 14,
  status: 12,
  indexable: 12,
  canonical: 12,
  title: 10,
  description: 8,
  h1: 5,
  jsonld: 5,
  images: 3,
  links: 3,
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
  return decodeHtml(String(text ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
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

function addIssue(issues, key, row, message) {
  issues[key] ??= [];
  issues[key].push({ url: row.url, message });
}

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const robots = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
const urls = sitemapLocs(sitemap);
const duplicateSitemapUrls = [...new Set(urls.filter((url, index) => urls.indexOf(url) !== index))];

const rows = urls.map((url) => {
  const file = htmlFileForUrl(url);
  let html = "";
  let status = 200;

  try {
    html = fs.readFileSync(file, "utf8");
  } catch {
    status = 404;
  }

  const title = stripHtml(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = stripHtml(
    firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
      || firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i),
  );
  const canonical = firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)
    || firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
  const robotsMeta = (html.match(/<meta[^>]+name=["']robots["'][^>]*>/gi) ?? []).join(" ").toLowerCase();
  const h1 = html.match(/<h1\b/gi)?.length ?? 0;
  const jsonld = html.match(/type=["']application\/ld\+json["']/gi)?.length ?? 0;
  const images = html.match(/<img\b[^>]*>/gi) ?? [];
  const missingAlt = images.filter((image) => !/\salt=/.test(image)).length;
  const anchorBad = html.match(/<a\b[^>]*href=["'](?:#|javascript:|)["'][^>]*>/gi)?.length ?? 0;

  return {
    url,
    status,
    titleLength: title.length,
    descriptionLength: description.length,
    canonical,
    indexable: !/(noindex|none)/.test(robotsMeta),
    h1,
    jsonld,
    imageCount: images.length,
    missingAlt,
    anchorBad,
  };
});

const issues = {};

for (const row of rows) {
  if (row.status !== 200) addIssue(issues, "status", row, `status ${row.status}`);
  if (!row.indexable) addIssue(issues, "indexable", row, "noindex");
  if (!row.canonical) {
    addIssue(issues, "canonical", row, "missing canonical");
  } else if (row.canonical.replace(/\/$/, "") !== row.url.replace(/\/$/, "")) {
    addIssue(issues, "canonical", row, `canonical ${row.canonical}`);
  }
  if (row.titleLength < 10 || row.titleLength > 70) {
    addIssue(issues, "title", row, `title length ${row.titleLength}`);
  }
  if (row.descriptionLength < 50 || row.descriptionLength > 170) {
    addIssue(issues, "description", row, `description length ${row.descriptionLength}`);
  }
  if (row.h1 !== 1) addIssue(issues, "h1", row, `h1 count ${row.h1}`);
  if (row.jsonld < 1) addIssue(issues, "jsonld", row, "missing JSON-LD");
  if (row.missingAlt > 0) {
    addIssue(issues, "images", row, `${row.missingAlt}/${row.imageCount} images missing alt`);
  }
  if (row.anchorBad > 0) addIssue(issues, "links", row, `${row.anchorBad} empty/js anchors`);
}

const checks = {
  https: urls.every((url) => url.startsWith("https://")),
  robots: /sitemap:/i.test(robots) && !/disallow:\s*\//i.test(robots),
  sitemap: urls.length > 0 && duplicateSitemapUrls.length === 0,
  status: !(issues.status?.length),
  indexable: !(issues.indexable?.length),
  canonical: !(issues.canonical?.length),
  title: !(issues.title?.length),
  description: !(issues.description?.length),
  h1: !(issues.h1?.length),
  jsonld: !(issues.jsonld?.length),
  images: !(issues.images?.length),
  links: !(issues.links?.length),
};

let earned = 0;
let total = 0;
for (const [key, weight] of Object.entries(WEIGHTS)) {
  total += weight;
  if (checks[key]) earned += weight;
}

const result = {
  method: "exported technical SEO score, not Lighthouse",
  score: Math.round((earned / total) * 100),
  checkedUrls: rows.length,
  sitemapUrlCount: urls.length,
  duplicateSitemapUrls,
  checks,
  issueCounts: Object.fromEntries(Object.entries(issues).map(([key, value]) => [key, value.length])),
  topIssues: Object.fromEntries(Object.entries(issues).map(([key, value]) => [key, value.slice(0, 12)])),
};

console.log(JSON.stringify(result, null, 2));
