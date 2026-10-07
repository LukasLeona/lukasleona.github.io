"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(
  path.join(__dirname, "..", "assets", "css", "solid-surfaces.css"),
  "utf8"
);

test("mobile hero arrow uses visible gold-on-dark contrast", () => {
  const mobileRule = css.match(/@media \(max-width: 991px\) \{[\s\S]*?#hero \.hero-work-arrow,[\s\S]*?\n\}/);

  assert.ok(mobileRule, "expected a mobile arrow override");
  assert.match(mobileRule[0], /color:\s*#f6b916\s*!important/);
  assert.match(mobileRule[0], /background:\s*#17181b\s*!important/);
});

test("mobile stars drift only when reduced motion is not requested", () => {
  assert.match(css, /@keyframes mobile-hero-star-drift/);
  assert.match(
    css,
    /@media \(max-width: 991px\) and \(prefers-reduced-motion: no-preference\)[\s\S]*?animation:\s*mobile-hero-star-drift 11s ease-in-out infinite alternate !important/
  );
});
