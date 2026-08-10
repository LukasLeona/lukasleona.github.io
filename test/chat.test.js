"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const handler = require("../api/chat.js");

function createRequest(overrides) {
  return Object.assign({
    method: "POST",
    headers: {
      origin: "https://lukasleona.com",
      host: "lukasleona.com",
      "x-forwarded-for": "203.0.113.10"
    },
    socket: { remoteAddress: "203.0.113.10" },
    body: {
      message: "What day is it today?",
      history: [],
      page: "index.html"
    }
  }, overrides || {});
}

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    payload: undefined,
    ended: false,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      this.ended = true;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    }
  };
}

test("rejects methods other than POST and OPTIONS", async () => {
  const response = createResponse();
  await handler(createRequest({ method: "GET" }), response);

  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, "POST, OPTIONS");
});

test("answers an allowed CORS preflight", async () => {
  const response = createResponse();
  await handler(createRequest({ method: "OPTIONS" }), response);

  assert.equal(response.statusCode, 204);
  assert.equal(response.headers["Access-Control-Allow-Origin"], "https://lukasleona.com");
});

test("rejects an unapproved cross-origin browser request", async () => {
  const response = createResponse();
  const request = createRequest({
    headers: {
      origin: "https://untrusted.example",
      host: "lumo-api.vercel.app",
      "x-forwarded-for": "203.0.113.11"
    }
  });

  await handler(request, response);
  assert.equal(response.statusCode, 403);
});

test("returns a clear configuration error when the API key is absent", async () => {
  const previousKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const response = createResponse();

  await handler(createRequest(), response);
  assert.equal(response.statusCode, 503);
  assert.match(response.payload.error, /temporarily unavailable/i);

  if (previousKey) {
    process.env.OPENAI_API_KEY = previousKey;
  }
});

test("validates that a message was supplied", async () => {
  process.env.OPENAI_API_KEY = "test-key";
  const response = createResponse();

  await handler(createRequest({ body: { message: "", history: [] } }), response);
  assert.equal(response.statusCode, 400);
});

test("returns extracted text and forwards sanitized conversation context", async () => {
  process.env.OPENAI_API_KEY = "test-key";
  const originalFetch = global.fetch;
  let upstreamRequest;

  global.fetch = async (url, options) => {
    upstreamRequest = { url, options, body: JSON.parse(options.body) };
    return {
      ok: true,
      status: 200,
      async json() {
        return {
          output: [{
            type: "message",
            content: [{ type: "output_text", text: "Today is Monday in the Philippines." }]
          }]
        };
      }
    };
  };

  const response = createResponse();
  await handler(createRequest({
    headers: {
      origin: "https://lukasleona.com",
      host: "lukasleona.com",
      "x-forwarded-for": "203.0.113.12"
    },
    body: {
      message: "What day is it today?",
      history: [{ role: "user", content: "Hello\u0000 there" }],
      page: "index.html"
    }
  }), response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.reply, "Today is Monday in the Philippines.");
  assert.equal(upstreamRequest.url, "https://api.openai.com/v1/responses");
  assert.equal(upstreamRequest.body.input.at(-1).content, "What day is it today?");
  assert.equal(upstreamRequest.body.input[0].content, "Hello there");
  assert.equal(upstreamRequest.body.store, false);

  global.fetch = originalFetch;
});
