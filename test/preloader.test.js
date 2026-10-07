"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

test("homepage preloader has a dependency-free dismissal fallback", () => {
  assert.match(html, /window\.setTimeout\(dismissPreloader, 4000\)/);
  assert.match(html, /DOMContentLoaded[\s\S]*?dismissPreloader/);
  assert.match(html, /loader\.parentNode\.removeChild\(loader\)/);
});

test("optional external assets cannot block initial page parsing", () => {
  assert.doesNotMatch(html, /maps\.googleapis\.com\/maps\/api\/js/);
  assert.match(
    html,
    /<script defer\s+src="https:\/\/code\.iconify\.design\/iconify-icon\/3\.0\.0\/iconify-icon\.min\.js">/
  );
});
