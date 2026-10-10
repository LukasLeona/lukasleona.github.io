"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const experience = html.match(
  /<section class="resume-experience-v2[\s\S]*?<section class="resume-education-v2/
)[0];

function panel(name) {
  const match = experience.match(
    new RegExp('data-career-panel="' + name + '"[\\s\\S]*?<\\/article>')
  );

  assert.ok(match, "expected the " + name + " experience panel");
  return match[0];
}

test("professional experience follows the published resume order", () => {
  const freelanceIndex = experience.indexOf('data-career-panel="freelance"');
  const accentureIndex = experience.indexOf('data-career-panel="accenture"');
  const venturesIndex = experience.indexOf('data-career-panel="ventures"');

  assert.ok(freelanceIndex >= 0);
  assert.ok(accentureIndex > freelanceIndex);
  assert.ok(venturesIndex > accentureIndex);
  assert.doesNotMatch(experience, /data-career-panel="pythonph"/);
});

test("Accenture is identified as the current software engineering role", () => {
  const accenture = panel("accenture");

  assert.match(accenture, /<strong>Accenture<\/strong>/);
  assert.match(accenture, /MAY 2025 TO PRESENT/);
  assert.match(accenture, /<h3>\s*Software Engineer\s*<\/h3>/);
  assert.doesNotMatch(accenture, /Confidential|JULY 2026/i);
});

test("General Web VA dates match the resume", () => {
  const ventures = panel("ventures");

  assert.match(ventures, /FEB 2024 TO SEPT 2025/);
  assert.match(ventures, /Next\.js, React, WordPress, Elementor, HTML and CSS/);
});

test("both requested roles show Web Development as a capability", () => {
  assert.match(panel("freelance"), /class="career-focus"[\s\S]*?Web Development/);
  assert.match(panel("ventures"), /class="career-focus"[\s\S]*?Web Development/);
});
