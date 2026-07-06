import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "data", "lib"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);
const IGNORE_HOSTS = new Set([
  "schema.org",
  "www.w3.org",
  "github.com",
  "pagead2.googlesyndication.com",
]);
const IGNORE_PATTERNS = [
  /google-analytics/i,
  /googletagmanager/i,
  /gstatic\.com/i,
  /youtube(-nocookie)?\.com/i,
];
const URL_RE = /https?:\/\/[^\s"'<>`\\]+/g;
const MAX_CONCURRENCY = 6;
const TIMEOUT_MS = 20_000;
const REPORT_PATH = path.join(ROOT, "reports", "external-link-audit.json");

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".next", "node_modules", "test-results"].includes(entry.name)) continue;
      files.push(...await listFiles(fullPath));
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function cleanUrl(raw) {
  return raw
    .replace(/[),.;\]}]+$/g, "")
    .replace(/&amp;/g, "&");
}

function shouldIgnore(url) {
  const parsed = new URL(url);
  if (IGNORE_HOSTS.has(parsed.hostname)) return true;
  return IGNORE_PATTERNS.some((pattern) => pattern.test(url));
}

async function collectUrls() {
  const found = new Map();

  for (const dir of SCAN_DIRS) {
    const files = await listFiles(path.join(ROOT, dir));
    for (const file of files) {
      const text = await readFile(file, "utf8");
      const matches = text.matchAll(URL_RE);
      for (const match of matches) {
        const url = cleanUrl(match[0]);
        if (!url.startsWith("http")) continue;
        if (shouldIgnore(url)) continue;
        const rel = path.relative(ROOT, file);
        const refs = found.get(url) ?? [];
        refs.push(rel);
        found.set(url, refs);
      }
    }
  }

  return Array.from(found.entries())
    .map(([url, refs]) => ({ url, refs: Array.from(new Set(refs)).sort() }))
    .sort((a, b) => a.url.localeCompare(b.url));
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "MyPayRightsLinkAudit/1.0 (+https://mypayrights.com)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Range": "bytes=0-4096",
      },
    });

    return {
      ok: response.status >= 200 && response.status < 400,
      status: response.status,
      finalUrl: response.url,
    };
  } catch (error) {
    return {
      ok: false,
      status: "ERR",
      finalUrl: url,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function runPool(items, worker) {
  const results = [];
  let index = 0;

  async function next() {
    while (index < items.length) {
      const current = items[index++];
      results.push(await worker(current));
    }
  }

  await Promise.all(Array.from({ length: MAX_CONCURRENCY }, next));
  return results;
}

const urls = await collectUrls();
console.log(`Auditing ${urls.length} unique external URLs...`);

const results = await runPool(urls, async (item) => ({
  ...item,
  ...await checkUrl(item.url),
}));

const failures = results.filter((result) => !result.ok);
const notFoundFailures = failures.filter((result) => result.status === 404 || result.status === 410);
const warnings = failures.filter((result) => !notFoundFailures.includes(result));

await mkdir(path.dirname(REPORT_PATH), { recursive: true });
await writeFile(
  REPORT_PATH,
  `${JSON.stringify({
    checkedAt: new Date().toISOString(),
    total: results.length,
    failures: failures.length,
    notFoundFailures: notFoundFailures.length,
    warnings: warnings.length,
    results,
  }, null, 2)}\n`,
);

for (const result of results) {
  const marker = result.ok ? "OK" : "FAIL";
  const detail = result.error ? `${result.status} ${result.error}` : result.status;
  console.log(`${marker} ${detail} ${result.url}`);
}

if (warnings.length > 0) {
  console.warn("\nExternal link audit warnings (blocked, timed out, or server error):");
  for (const warning of warnings) {
    console.warn(`- ${warning.url} -> ${warning.status}${warning.error ? ` (${warning.error})` : ""}`);
    console.warn(`  refs: ${warning.refs.slice(0, 8).join(", ")}`);
  }
}

if (notFoundFailures.length > 0) {
  console.error("\nExternal link audit not-found failures:");
  for (const failure of notFoundFailures) {
    console.error(`- ${failure.url} -> ${failure.status}${failure.error ? ` (${failure.error})` : ""}`);
    console.error(`  refs: ${failure.refs.slice(0, 8).join(", ")}`);
  }
  console.error(`\nFull report written to ${path.relative(ROOT, REPORT_PATH)}`);
  process.exit(1);
}

console.log("\nExternal link audit passed with no 404/410 links.");
console.log(`Full report written to ${path.relative(ROOT, REPORT_PATH)}`);
