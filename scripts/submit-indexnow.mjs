import { access, readFile } from "node:fs/promises";
import path from "node:path";

const KEY = "49529021-5dd7-489f-974e-e2eadb341583";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mypayrights.com";
const ENABLED = process.env.INDEXNOW_SUBMIT === "true";
const SUBMIT_ALL = process.argv.includes("--all");

function entriesFromSitemap(xml) {
  const entries = new Map();
  for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block[1]?.match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastmod = block[1]?.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? "";
    if (loc) entries.set(loc, lastmod);
  }
  return entries;
}

const keyPath = path.join(process.cwd(), "out", `${KEY}.txt`);
await access(keyPath);
const keyContents = (await readFile(keyPath, "utf8")).trim();
if (keyContents !== KEY) throw new Error("IndexNow key file does not match its filename");

if (!ENABLED) {
  console.log("IndexNow: key file verified in out/; submission disabled (set INDEXNOW_SUBMIT=true on deploy)");
  process.exit(0);
}

const currentXml = await readFile(path.join(process.cwd(), "out", "sitemap.xml"), "utf8");
const currentEntries = entriesFromSitemap(currentXml);
let previousEntries = new Map();

if (!SUBMIT_ALL) {
  try {
    const previousResponse = await fetch(`${SITE_URL}/sitemap.xml`, {
      headers: { "user-agent": "MyPayRights-IndexNow/1.0" },
    });
    if (previousResponse.ok) previousEntries = entriesFromSitemap(await previousResponse.text());
  } catch (error) {
    console.warn("IndexNow: previous live sitemap was unavailable; submitting the current sitemap", error);
  }
}

const urlList = [...currentEntries.entries()]
  .filter(([url, lastmod]) => SUBMIT_ALL || previousEntries.get(url) !== lastmod)
  .map(([url]) => url)
  .slice(0, 10_000);

if (urlList.length === 0) {
  console.log("IndexNow: no new or changed sitemap URLs to submit");
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow submission failed with HTTP ${response.status}: ${await response.text()}`);
}

console.log(`IndexNow: accepted ${urlList.length} new or changed URL(s) with HTTP ${response.status}`);
