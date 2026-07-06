#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse
import argparse
import os


ROOT = Path.cwd()
OUT_DIR = ROOT / "out"


class StaticExportHandler(SimpleHTTPRequestHandler):
    def translate_path(self, request_path):
        parsed = urlparse(request_path)
        decoded = unquote(parsed.path).rstrip("/") or "/"
        relative = "index.html" if decoded == "/" else decoded.lstrip("/")

        candidates = [
            OUT_DIR / relative,
            OUT_DIR / f"{relative}.html",
            OUT_DIR / relative / "index.html",
        ]

        for candidate in candidates:
            resolved = candidate.resolve()
            if OUT_DIR.resolve() in resolved.parents or resolved == OUT_DIR.resolve():
                if resolved.is_file():
                    return str(resolved)

        return str(OUT_DIR / "404.html")

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
