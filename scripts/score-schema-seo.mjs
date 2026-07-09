import fs from "node:fs";
import path from "node:path";

const ROOT = "out";
const WEIGHTS = {
  jsonLdOnEverySitemapPage: 20,
  allJsonLdParses: 20,
  expectedTypesPresent: 25,
  requiredFieldsPresent: 25,
  hasRichResultTypes: 10,
};

function decodeHtml(text) {
  return String(text ?? "")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
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

function jsonLdScripts(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => decodeHtml(match[1]).trim())
    .filter(Boolean);
}

function asArray(value) {
  return Array.isArray(value) ? value : [value];
}

function schemaTypes(schema) {
  return asArray(schema?.["@type"] ?? []);
}

function hasType(schemas, type) {
  return schemas.some((schema) => schemaTypes(schema).includes(type));
}

function missingFields(schema, fields) {
  return fields.filter((field) => schema?.[field] === undefined || schema?.[field] === null || schema?.[field] === "");
}

function expectedTypes(pathname) {
  if (pathname === "/") return ["WebSite", "Organization"];
  if (/^\/faq\/[^/]+$/.test(pathname)) return ["BreadcrumbList", "FAQPage", "Article"];
  if (pathname === "/faq") return ["BreadcrumbList", "FAQPage", "ItemList"];
  if (/^\/guides\/[^/]+$/.test(pathname)) return ["Article", "FAQPage", "BreadcrumbList"];
  if (/^\/blog\/[^/]+$/.test(pathname)) return ["Article"];
  if (/^\/compare\/[^/]+$/.test(pathname)) return ["BreadcrumbList", "Article", "FAQPage"];
  if (/^\/us\/states\/[^/]+\/(final-paycheck|minimum-wage|pto-payout)$/.test(pathname)) {
    return ["BreadcrumbList", "Article", "FAQPage"];
  }
  if (/^\/us\/states\/[^/]+$/.test(pathname)) return ["BreadcrumbList", "WebPage", "FAQPage"];
  if (/^\/ca\/provinces\/[^/]+$/.test(pathname)) return ["BreadcrumbList", "WebPage", "FAQPage"];
  if (/^\/au\/states\/[^/]+$/.test(pathname)) return ["BreadcrumbList", "WebPage", "FAQPage"];
  if (["/privacy", "/terms", "/disclaimer"].includes(pathname)) return ["WebPage"];
  if (pathname.includes("calculator") || pathname === "/tupe-wizard") return ["BreadcrumbList", "WebApplication"];
  return [];
}

function validateRequiredFields(schema) {
  const types = schemaTypes(schema);
  const missing = [];

  if (types.includes("Article")) {
    missing.push(...missingFields(schema, ["headline", "description", "url", "datePublished", "dateModified", "author", "publisher"]));
  }
  if (types.includes("FAQPage")) {
    missing.push(...missingFields(schema, ["mainEntity"]));
    if (Array.isArray(schema.mainEntity) && schema.mainEntity.length === 0) missing.push("mainEntity[]");
  }
  if (types.includes("WebPage")) {
    missing.push(...missingFields(schema, ["name", "description", "url"]));
  }
  if (types.includes("WebApplication")) {
    missing.push(...missingFields(schema, ["name", "description", "url", "offers"]));
  }
  if (types.includes("BreadcrumbList")) {
    missing.push(...missingFields(schema, ["itemListElement"]));
    if (Array.isArray(schema.itemListElement) && schema.itemListElement.length < 2) {
      missing.push("itemListElement>=2");
    }
  }
  if (types.includes("Organization")) {
    missing.push(...missingFields(schema, ["name", "url"]));
  }
  if (types.includes("WebSite")) {
    missing.push(...missingFields(schema, ["name", "url"]));
  }

  return missing;
}

const urls = sitemapLocs(fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8"));
const issues = [];
const typeCounts = {};
let pagesWithSchema = 0;
let parseErrors = 0;
let missingExpectedTypes = 0;
let missingRequiredSchemas = 0;

for (const url of urls) {
  const pathname = new URL(url).pathname;
  let html = "";
  try {
    html = fs.readFileSync(htmlFileForUrl(url), "utf8");
  } catch (error) {
    issues.push({ url, type: "missing-html", message: error.message });
    continue;
  }

  const rawScripts = jsonLdScripts(html);
  if (rawScripts.length > 0) pagesWithSchema += 1;

  const schemas = [];
  for (const text of rawScripts) {
    try {
      for (const schema of asArray(JSON.parse(text))) {
        schemas.push(schema);
        for (const type of schemaTypes(schema)) {
          typeCounts[type] = (typeCounts[type] ?? 0) + 1;
        }
      }
    } catch (error) {
      parseErrors += 1;
      issues.push({ url, type: "json-parse", message: error.message });
    }
  }

  for (const type of expectedTypes(pathname)) {
    if (!hasType(schemas, type)) {
      missingExpectedTypes += 1;
      issues.push({ url, type: "missing-type", message: `missing ${type}` });
    }
  }

  for (const schema of schemas) {
    const missing = validateRequiredFields(schema);
    if (missing.length > 0) {
      missingRequiredSchemas += 1;
      issues.push({
        url,
        type: "missing-required",
        schema: schemaTypes(schema).join("|"),
        message: missing.join(", "),
      });
    }
  }
}

const checks = {
  jsonLdOnEverySitemapPage: pagesWithSchema === urls.length,
  allJsonLdParses: parseErrors === 0,
  expectedTypesPresent: missingExpectedTypes === 0,
  requiredFieldsPresent: missingRequiredSchemas === 0,
  hasRichResultTypes: ["Article", "FAQPage", "BreadcrumbList", "WebApplication", "WebPage", "Organization", "WebSite"]
    .every((type) => typeCounts[type] > 0),
};

let earned = 0;
let total = 0;
for (const [check, weight] of Object.entries(WEIGHTS)) {
  total += weight;
  if (checks[check]) earned += weight;
}

console.log(JSON.stringify({
  method: "schema SEO score over exported sitemap JSON-LD",
  score: Math.round((earned / total) * 100),
  checkedUrls: urls.length,
  pagesWithSchema,
  checks,
  issueCounts: {
    parseErrors,
    missingExpectedTypes,
    missingRequiredSchemas,
    totalIssues: issues.length,
  },
  typeCounts: Object.fromEntries(Object.entries(typeCounts).sort()),
  topIssues: issues.slice(0, 20),
}, null, 2));
