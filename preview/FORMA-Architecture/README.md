# FORMA — Scroll-driven architecture concept

A dependency-free static website concept built around a scroll-scrubbed 16-second house construction film.

## Run locally

Serve this directory from a local web server. For example:

```powershell
node serve.mjs
```

Then open `http://localhost:4173`.

The included server supports byte-range requests so the hero can seek smoothly while scrolling. The hero video is muted and mapped to scroll progress. Gallery motion and text transitions are implemented with CSS and vanilla JavaScript. The site includes a reduced-motion fallback.
