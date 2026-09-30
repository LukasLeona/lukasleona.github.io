"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const core = require("../assets/js/tracking-core.js");

function createStorage(initialValues) {
  const values = new Map(Object.entries(initialValues || {}));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, value); },
    removeItem(key) { values.delete(key); }
  };
}

test("accepts GA4 measurement IDs and rejects placeholders", () => {
  assert.equal(core.isValidMeasurementId("G-ABC12345"), true);
  assert.equal(core.isValidMeasurementId(""), false);
  assert.equal(core.isValidMeasurementId("G-XXXX"), false);
  assert.equal(core.isValidMeasurementId("UA-12345"), false);
});

test("honors Do Not Track and Global Privacy Control", () => {
  assert.equal(core.prefersNoTracking({ doNotTrack: "1" }), true);
  assert.equal(core.prefersNoTracking({ globalPrivacyControl: true }), true);
  assert.equal(core.prefersNoTracking({ doNotTrack: "0" }), false);
});

test("allows only an exact configured production hostname", () => {
  const hosts = ["lukasleona.com", "www.lukasleona.com"];
  assert.equal(core.isAllowedHost("lukasleona.com", hosts), true);
  assert.equal(core.isAllowedHost("WWW.LUKASLEONA.COM", hosts), true);
  assert.equal(core.isAllowedHost("evil.lukasleona.com", hosts), false);
  assert.equal(core.isAllowedHost("localhost", hosts), false);
});

test("detects common automated and preview user agents", () => {
  assert.equal(core.isLikelyAutomated({ webdriver: true, userAgent: "Chrome" }), true);
  assert.equal(core.isLikelyAutomated({ userAgent: "facebookexternalhit/1.1" }), true);
  assert.equal(core.isLikelyAutomated({ userAgent: "Mozilla/5.0 Chrome/120" }), false);
});

test("builds context without query strings or referrer paths", () => {
  const windowObject = {
    innerWidth: 390,
    location: { pathname: "/packages", search: "?private=value" },
    navigator: { language: "en-PH", maxTouchPoints: 5 }
  };
  const documentObject = {
    title: "Packages",
    referrer: "https://example.com/private/campaign?customer=123"
  };
  const context = core.buildEventContext(windowObject, documentObject, new Date("2026-09-30T00:00:00Z"));

  assert.equal(context.pagePath, "/packages");
  assert.equal(context.referrer, "example.com");
  assert.equal(context.device, "Mobile");
  assert.equal(JSON.stringify(context).includes("private=value"), false);
  assert.equal(JSON.stringify(context).includes("customer=123"), false);
});

test("enforces and clears notification cooldown timestamps", () => {
  const storage = createStorage();
  const now = 1_000_000;

  assert.equal(core.isOutsideCooldown(storage, "visit", 60_000, now), true);
  assert.equal(core.markNotification(storage, "visit", now), true);
  assert.equal(core.isOutsideCooldown(storage, "visit", 60_000, now + 30_000), false);
  assert.equal(core.isOutsideCooldown(storage, "visit", 60_000, now + 60_000), true);
  core.clearNotificationMark(storage, "visit");
  assert.equal(core.isOutsideCooldown(storage, "visit", 60_000, now + 1), true);
});

test("queues analytics configuration without exposing precise location", () => {
  const appendedScripts = [];
  const windowObject = { navigator: {}, dataLayer: [] };
  const documentObject = {
    querySelector() { return null; },
    createElement() { return { dataset: {} }; },
    head: { appendChild(script) { appendedScripts.push(script); } }
  };

  assert.equal(core.loadAnalytics(windowObject, documentObject, {
    enabled: true,
    measurementId: "G-ABC12345"
  }), true);
  assert.equal(appendedScripts.length, 1);
  assert.equal(appendedScripts[0].src.includes("G-ABC12345"), true);
  assert.equal(windowObject.dataLayer.length, 2);
});

test("homepage loads tracking in dependency order and marks the hero CTA", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const configIndex = html.indexOf("assets/js/tracking-config.js");
  const coreIndex = html.indexOf("assets/js/tracking-core.js");
  const emailIndex = html.indexOf("assets/js/email-client.js");
  const trackerIndex = html.indexOf("assets/js/visitor-tracking.js");

  assert.ok(configIndex > -1 && configIndex < coreIndex);
  assert.ok(coreIndex < emailIndex && emailIndex < trackerIndex);
  assert.match(html, /id="seeMyWorkBtn"[\s\S]{0,240}data-notify-owner="true"/);
});
