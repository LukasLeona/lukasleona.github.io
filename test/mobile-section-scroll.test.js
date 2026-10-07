"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const navigation = require("../assets/js/mobile-section-scroll.js");

test("detects the top and bottom of a mobile section", () => {
  const section = { scrollHeight: 1200, clientHeight: 500, scrollTop: 0 };

  assert.equal(navigation.isAtBoundary(section, -1), true);
  assert.equal(navigation.isAtBoundary(section, 1), false);

  section.scrollTop = 699;
  assert.equal(navigation.isAtBoundary(section, 1), true);
  assert.equal(navigation.scrollLimit(section), 700);
});

test("moves through menu order without wrapping at either end", () => {
  const sections = ["hero", "about", "resume", "portfolio", "blog", "contact"];

  assert.equal(navigation.adjacentIndex(sections, "hero", 1), 1);
  assert.equal(navigation.adjacentIndex(sections, "portfolio", 1), 4);
  assert.equal(navigation.adjacentIndex(sections, "portfolio", -1), 2);
  assert.equal(navigation.adjacentIndex(sections, "hero", -1), -1);
  assert.equal(navigation.adjacentIndex(sections, "contact", 1), -1);
});

test("homepage loads mobile boundary navigation after the primary UI script", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const primaryScript = html.indexOf('src="assets/js/luke.js"');
  const boundaryScript = html.indexOf('src="assets/js/mobile-section-scroll.js"');

  assert.ok(primaryScript >= 0);
  assert.ok(boundaryScript > primaryScript);
});
