"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(
  path.join(__dirname, "..", "assets", "css", "solid-surfaces.css"),
  "utf8"
);
const heroScript = fs.readFileSync(
  path.join(__dirname, "..", "assets", "js", "luke.js"),
  "utf8"
);

test("mobile hero arrow uses visible gold-on-dark contrast", () => {
  const mobileRule = css.match(/@media \(max-width: 991px\) \{[\s\S]*?#hero \.hero-work-arrow,[\s\S]*?\n\}/);

  assert.ok(mobileRule, "expected a mobile arrow override");
  assert.match(mobileRule[0], /color:\s*#f6b916\s*!important/);
  assert.match(mobileRule[0], /background:\s*#17181b\s*!important/);
});

test("hero stars drift across viewports only when reduced motion is not requested", () => {
  assert.match(css, /@keyframes hero-star-drift/);
  assert.match(
    css,
    /@media \(prefers-reduced-motion: no-preference\)[\s\S]*?animation:\s*hero-star-drift 14s ease-in-out infinite alternate !important/
  );
  assert.match(css, /@media \(max-width: 991px\) and \(prefers-reduced-motion: no-preference\)[\s\S]*?animation-duration:\s*11s !important/);
});

test("base portrait, reveal source, and brush canvas share one geometry", () => {
  assert.match(
    css,
    /#hero \.hero-portrait-base,[\s\S]*?#hero \.hero-portrait-layer,[\s\S]*?#hero \.hero-portrait-brush \{[\s\S]*?inset:\s*0 !important;[\s\S]*?transform:\s*scale\(var\(--hero-portrait-scale\)\) !important;/
  );
  assert.match(heroScript, /canvasWidth = Math\.max\(1, portrait\.clientWidth\)/);
  assert.doesNotMatch(heroScript, /brushCanvas\.style\.transform\s*=/);
});
