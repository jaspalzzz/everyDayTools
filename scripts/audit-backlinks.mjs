import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "data", "backlink-monitor.csv");
const outputPath = path.join(root, "reports", "backlink-monitor.json");
const requiredHeaders = [
  "date",
  "gsc_external_links",
  "referring_domains",
  "referral_sessions",
  "research_sessions",
  "outreach_sent",
  "replies",
  "links_won",
  "lost_links",
  "notes",
];
const numericHeaders = requiredHeaders.slice(1, 9);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if (char === "\n" && !quoted) {
      row.push(field.replace(/\r$/, ""));
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  if (quoted) throw new Error("Unclosed quoted field in backlink monitor CSV");
  return rows;
}

function parseOptionalInteger(value, header, rowNumber) {
  if (value === "") return null;
  if (!/^\d+$/.test(value)) {
    throw new Error("Row " + rowNumber + ": " + header + " must be a non-negative integer or blank");
  }
  return Number(value);
}

const raw = await fs.readFile(inputPath, "utf8");
const [headers, ...sourceRows] = parseCsv(raw);

if (headers.join("|") !== requiredHeaders.join("|")) {
  throw new Error("Unexpected headers in " + inputPath + ". Expected: " + requiredHeaders.join(","));
}

const seenDates = new Set();
const rows = sourceRows.map((values, index) => {
  const rowNumber = index + 2;
  if (values.length !== requiredHeaders.length) {
    throw new Error("Row " + rowNumber + " has " + values.length + " fields; expected " + requiredHeaders.length);
  }

  const date = values[0];
  const parsedDate = new Date(date + "T00:00:00Z");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error("Row " + rowNumber + ": date must be a real YYYY-MM-DD date");
  }
  if (seenDates.has(date)) throw new Error("Duplicate snapshot date: " + date);
  seenDates.add(date);

  const record = { date };
  numericHeaders.forEach((header, numericIndex) => {
    record[header] = parseOptionalInteger(values[numericIndex + 1], header, rowNumber);
  });
  record.notes = values[9];
  return record;
}).sort((left, right) => left.date.localeCompare(right.date));

const latest = rows.at(-1) ?? null;
const previous = rows.at(-2) ?? null;
const change = {};

for (const header of numericHeaders) {
  change[header] =
    latest?.[header] == null || previous?.[header] == null
      ? null
      : latest[header] - previous[header];
}

const totals = rows.reduce(
  (result, row) => {
    for (const header of ["outreach_sent", "replies", "links_won", "lost_links"]) {
      result[header] += row[header] ?? 0;
    }
    return result;
  },
  { outreach_sent: 0, replies: 0, links_won: 0, lost_links: 0 },
);

const report = {
  generatedAt: new Date().toISOString(),
  source: "data/backlink-monitor.csv",
  snapshotCount: rows.length,
  latest,
  previous,
  change,
  campaignTotals: totals,
  rates: {
    replyRate: totals.outreach_sent ? totals.replies / totals.outreach_sent : 0,
    linkWinRate: totals.outreach_sent ? totals.links_won / totals.outreach_sent : 0,
  },
  checks: {
    duplicateDates: false,
    invalidNumericValues: false,
    latestSnapshotOlderThan45Days: latest
      ? Date.now() - Date.parse(latest.date + "T00:00:00Z") > 45 * 24 * 60 * 60 * 1000
      : true,
  },
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, JSON.stringify(report, null, 2) + "\n");

console.log("Backlink snapshots: " + rows.length);
console.log("Latest snapshot: " + (latest?.date ?? "none"));
console.log("Campaign links won: " + totals.links_won);
console.log("Report: " + path.relative(root, outputPath));
