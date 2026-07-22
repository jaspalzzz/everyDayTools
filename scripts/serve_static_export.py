#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse
import argparse
import os


ROOT = Path.cwd()
OUT_DIR = ROOT / "out"


class StaticExportHandler(SimpleHTTPRequestHandler):
    def _resolve_existing(self):
        """Return the on-disk file for the request, or None if it does not exist."""
        parsed = urlparse(self.path)
        decoded = unquote(parsed.path).rstrip("/") or "/"
        relative = "index.html" if decoded == "/" else decoded.lstrip("/")

        candidates = [
            OUT_DIR / relative,
            OUT_DIR / f"{relative}.html",
            OUT_DIR / relative / "index.html",
        ]

        out_root = OUT_DIR.resolve()
        for candidate in candidates:
            resolved = candidate.resolve()
            if (out_root in resolved.parents or resolved == out_root) and resolved.is_file():
                return resolved
        return None

    def translate_path(self, request_path):
        resolved = self._resolve_existing()
        return str(resolved) if resolved else str(OUT_DIR / "404.html")

    def send_head(self):
        # A missing path must return a real HTTP 404 (serving 404.html with a 200
        # status is a soft-404). This mirrors the production static host, so the
        # "gated routes 404" e2e assertions hold under this server too.
        if self._resolve_existing() is None:
            fallback = OUT_DIR / "404.html"
            try:
                stream = open(fallback, "rb")
            except OSError:
                self.send_error(404, "Not Found")
                return None
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(os.fstat(stream.fileno()).st_size))
            self.end_headers()
            return stream
        return super().send_head()

    def log_message(self, format, *args):
        if os.environ.get("STATIC_EXPORT_LOGS") == "1":
            super().log_message(format, *args)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=3100)
    args = parser.parse_args()

    server = ThreadingHTTPServer(("", args.port), StaticExportHandler)
    print(f"serve_static_export.py serving out at http://127.0.0.1:{args.port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
