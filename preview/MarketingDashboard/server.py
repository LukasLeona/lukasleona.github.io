"""Signal Desk local server and live-data bridge.

Uses only Python's standard library. It serves the dashboard and combines two
public, keyless internet signals: Google Trends RSS and Wikimedia page views.
"""

from __future__ import annotations

import argparse
import json
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
CACHE_TTL_SECONDS = 15 * 60
USER_AGENT = "SignalDesk/1.0 (public-data marketing dashboard; local demo)"
ALLOWED_MARKETS = {"PH", "US", "GB", "AU", "SG", "CA"}
PLATFORM_PAGES = {
    "Facebook": "Facebook",
    "Instagram": "Instagram",
    "X": "X_(social_network)",
    "TikTok": "TikTok",
    "Threads": "Threads_(social_network)",
    "YouTube": "YouTube",
    "LinkedIn": "LinkedIn",
}
TRENDS_NAMESPACE = "https://trends.google.com/trending/rss"

_cache: dict[str, tuple[float, Any]] = {}
_cache_lock = threading.Lock()


def cached(key: str, loader, force: bool = False):
    now = time.time()
    with _cache_lock:
        hit = _cache.get(key)
        if hit and not force and now - hit[0] < CACHE_TTL_SECONDS:
            return hit[1]
    value = loader()
    with _cache_lock:
        _cache[key] = (now, value)
    return value


def fetch_bytes(url: str, timeout: int = 12) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "application/json, application/xml, text/xml;q=0.9, */*;q=0.8"},
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.read()


def get_trends(market: str) -> list[dict[str, str]]:
    url = f"https://trends.google.com/trending/rss?geo={urllib.parse.quote(market)}"
    root = ET.fromstring(fetch_bytes(url))
    trends = []
    for item in root.findall("./channel/item")[:10]:
        title = item.findtext("title", default="").strip()
        link = item.findtext("link", default="https://trends.google.com/trending/").strip()
        traffic = item.findtext(f"{{{TRENDS_NAMESPACE}}}approx_traffic", default="Trending").strip()
        if title:
            trends.append({"title": title, "link": link, "traffic": traffic})
    return trends


def get_attention() -> list[dict[str, Any]]:
    end = datetime.now(timezone.utc).date() - timedelta(days=1)
    start = end - timedelta(days=8)
    start_text = start.strftime("%Y%m%d")
    end_text = end.strftime("%Y%m%d")
    results = []
    for name, article in PLATFORM_PAGES.items():
        encoded_article = urllib.parse.quote(article, safe="()_")
        url = (
            "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/"
            f"en.wikipedia/all-access/user/{encoded_article}/daily/{start_text}/{end_text}"
        )
        try:
            payload = json.loads(fetch_bytes(url))
            items = payload.get("items", [])
            if not items:
                continue
            latest = int(items[-1].get("views", 0))
            previous_window = [int(item.get("views", 0)) for item in items[-8:-1]]
            baseline = sum(previous_window) / max(1, len(previous_window))
            change = ((latest - baseline) / baseline * 100) if baseline else 0.0
            results.append(
                {
                    "name": name,
                    "views": latest,
                    "change": round(change, 1),
                    "date": end.isoformat(),
                    "article": article,
                }
            )
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError):
            continue
    return results


def dashboard_payload(market: str, force: bool = False) -> dict[str, Any]:
    sources = {"googleTrends": False, "wikimedia": False}
    trends: list[dict[str, str]] = []
    attention: list[dict[str, Any]] = []
    try:
        trends = cached(f"trends:{market}", lambda: get_trends(market), force=force)
        sources["googleTrends"] = bool(trends)
    except (urllib.error.URLError, TimeoutError, ET.ParseError, ValueError):
        pass
    try:
        attention = cached("attention", get_attention, force=force)
        sources["wikimedia"] = bool(attention)
    except (urllib.error.URLError, TimeoutError, ValueError):
        pass
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "market": market,
        "trends": trends,
        "attention": attention,
        "sources": sources,
        "cacheSeconds": CACHE_TTL_SECONDS,
    }


class DashboardHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):  # noqa: N802 - required by BaseHTTPRequestHandler
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/dashboard":
            query = urllib.parse.parse_qs(parsed.query)
            market = query.get("geo", ["PH"])[0].upper()
            if market not in ALLOWED_MARKETS:
                market = "PH"
            force = query.get("refresh", ["0"])[0] == "1"
            payload = dashboard_payload(market, force=force)
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(body)
            return
        if parsed.path == "/health":
            body = b'{"status":"ok"}'
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def end_headers(self):
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        super().end_headers()

    def log_message(self, message: str, *args):
        print(f"[{self.log_date_time_string()}] {message % args}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the Signal Desk dashboard locally.")
    parser.add_argument("--host", default="127.0.0.1", help="Listening host (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000, help="Listening port (default: 8000)")
    parser.add_argument("--no-open", action="store_true", help="Do not open the browser automatically")
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), DashboardHandler)
    url = f"http://{args.host}:{args.port}"
    print(f"Signal Desk is running at {url}")
    print("Press Ctrl+C to stop.")
    if not args.no_open:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Signal Desk.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
