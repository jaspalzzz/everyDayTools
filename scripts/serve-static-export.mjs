import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const DEFAULT_PORT = 3100;

const argPort = process.argv.find((arg) => arg.startsWith("--port="))?.split("=")[1];
const port = Number.parseInt(argPort ?? process.env.PORT ?? String(DEFAULT_PORT), 10);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

function safeDecodePath(urlPath) {
  try {
    return decodeURIComponent(urlPath);
  } catch {
    return "/";
  }
}

function candidatePaths(urlPath) {
  const decoded = safeDecodePath(urlPath).replace(/\/+$/, "") || "/";
  const cleaned = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const relative = cleaned === "/" ? "index.html" : cleaned.replace(/^\/+/, "");

  return [
    path.join(OUT_DIR, relative),
    path.join(OUT_DIR, `${relative}.html`),
    path.join(OUT_DIR, relative, "index.html"),
  ];
}

function resolveFile(urlPath) {
  for (const candidate of candidatePaths(urlPath)) {
    if (!candidate.startsWith(OUT_DIR)) continue;
    if (!existsSync(candidate)) continue;
    const stats = statSync(candidate);
    if (stats.isFile()) return { filePath: candidate, stats };
  }

  const notFoundPath = path.join(OUT_DIR, "404.html");
  if (existsSync(notFoundPath)) {
    return { filePath: notFoundPath, stats: statSync(notFoundPath), notFound: true };
  }

  return null;
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const resolved = resolveFile(url.pathname);

  if (!resolved) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = path.extname(resolved.filePath);
  response.writeHead(resolved.notFound ? 404 : 200, {
    "Content-Length": resolved.stats.size,
    "Content-Type": contentTypes.get(extension) ?? "application/octet-stream",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(resolved.filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  const scriptName = path.basename(fileURLToPath(import.meta.url));
  console.log(`${scriptName} serving ${path.relative(ROOT, OUT_DIR)} at http://127.0.0.1:${port}`);
});
