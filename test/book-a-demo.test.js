"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const booking = require("../book-a-demo/book-a-demo.js");

test("blocks Wednesday and Thursday while allowing the other weekdays", () => {
  assert.equal(booking.isUnavailableWeekday("2026-10-06"), false);
  assert.equal(booking.isUnavailableWeekday("2026-10-07"), true);
  assert.equal(booking.isUnavailableWeekday("2026-10-08"), true);
  assert.equal(booking.isUnavailableWeekday("2026-10-09"), false);
});

test("rejects past and malformed dates", () => {
  assert.equal(booking.isBookableDate("2026-10-05", "2026-10-06"), false);
  assert.equal(booking.isBookableDate("2026-10-09", "2026-10-06"), true);
  assert.equal(booking.isBookableDate("not-a-date", "2026-10-06"), false);
});

test("formats the requested schedule for the EmailJS template", () => {
  const summary = booking.buildComments({
    topic: "AI or automation",
    date: "2026-10-09",
    time: "14:30",
    phone: "",
    message: "Show the workflow dashboard."
  });

  assert.match(summary, /Friday, October 9, 2026 at 2:30 PM/);
  assert.match(summary, /Philippine Time, UTC\+8/);
  assert.match(summary, /Phone number: Not provided/);
  assert.match(summary, /Show the workflow dashboard/);
});

test("booking page contains the concise required fields and EmailJS client", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "book-a-demo", "index.html"), "utf8");
  const requiredNames = ["name", "email", "demo_topic", "demo_date", "demo_time", "consent"];

  requiredNames.forEach((name) => {
    assert.match(html, new RegExp(`name="${name}"[^>]*required|required[^>]*name="${name}"`));
  });
  assert.match(html, /assets\/js\/email-client\.js/);
  assert.match(html, /book-a-demo\/book-a-demo\.js/);
});

test("packages page links visitors to the demo booking page", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "packages", "index.html"), "utf8");
  assert.match(html, /href="\.\.\/book-a-demo\/"/);
  assert.match(html, /Book a demo/i);
});
