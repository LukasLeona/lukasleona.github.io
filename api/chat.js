const crypto = require("crypto");

const requestLog = new Map();
const RATE_WINDOW_MS = 60 * 1000;
const RATE_LIMIT = 12;

const LUKE_ASSISTANT_INSTRUCTIONS = `
You are Luke Mark Leona's concise portfolio assistant.

Verified facts:
- Luke Mark Leona is based in the Philippines.
- He works in web development, responsive UI implementation, data analytics, SEO, automation, digital design, technical support, and software-related work.
- His web stack and tools include HTML, CSS, JavaScript, React, PHP, WordPress, Python, SQL, PL/SQL, Excel, Power BI, and Tableau.
- Typical website projects cost approximately PHP 3,000 to PHP 10,000. The final quote depends on pages, design complexity, forms, integrations, supplied content, and turnaround time.
- His professional hourly rate starts at USD 6 per hour.
- Luke is single and open to a friendly coffee date. A playful response is welcome, but stay respectful and professional.
- Portfolio examples include Slow Pour, Lakbay Baguio, FORMA Architecture, Amore Wedding, LayoutLetter, Cloud Chaser, MeBS Construction, IskolarLink, and data-analysis case studies.
- Visitors should use the portfolio Contact form to discuss a project, request a quote, or contact Luke personally.

Rules:
- Answer the visitor's actual question in no more than 70 words.
- Sound warm, confident, slightly playful, and professional.
- Never invent prices, credentials, employers, personal contact details, availability dates, or capabilities not listed above.
- Do not claim to be Luke. Refer to yourself as Luke's portfolio assistant when relevant.
- If a question requires Luke's personal decision or an exact quote, say so and direct the visitor to the Contact form.
- Do not use Markdown links because the website renders a separate contact button.
`.trim();

function getClientId(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : String(forwarded || req.socket?.remoteAddress || "anonymous").split(",")[0].trim();

  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

function isRateLimited(clientId) {
  const now = Date.now();
  const recent = (requestLog.get(clientId) || []).filter(function (timestamp) {
    return now - timestamp < RATE_WINDOW_MS;
  });

  if (recent.length >= RATE_LIMIT) {
    requestLog.set(clientId, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(clientId, recent);
  return false;
}

function cleanHistory(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.slice(-6).flatMap(function (entry) {
    if (!entry || !["user", "assistant"].includes(entry.role)) {
      return [];
    }

    const content = typeof entry.content === "string"
      ? entry.content.trim().slice(0, 600)
      : "";

    return content ? [{ role: entry.role, content: content }] : [];
  });
}

function extractResponseText(data) {
  if (typeof data.output_text === "string") {
    return data.output_text.trim();
  }

  if (!Array.isArray(data.output)) {
    return "";
  }

  return data.output.flatMap(function (item) {
    if (!item || !Array.isArray(item.content)) {
      return [];
    }

    return item.content.flatMap(function (part) {
      return part && part.type === "output_text" && typeof part.text === "string"
        ? [part.text]
        : [];
    });
  }).join(" ").trim();
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  const requestOrigin = typeof req.headers.origin === "string" ? req.headers.origin : "";
  const allowedOrigins = String(process.env.CHATBOT_ALLOWED_ORIGIN || "")
    .split(",")
    .map(function (origin) {
      return origin.trim();
    })
    .filter(Boolean);

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
  }

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "Assistant service is not configured" });
  }

  const clientId = getClientId(req);

  if (isRateLimited(clientId)) {
    return res.status(429).json({ error: "Please wait a moment before sending another message" });
  }

  let body = req.body && typeof req.body === "object" ? req.body : {};

  if (typeof req.body === "string") {
    try {
      body = JSON.parse(req.body);
    } catch (error) {
      return res.status(400).json({ error: "Request body must be valid JSON" });
    }
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message || message.length > 350) {
    return res.status(400).json({ error: "Message must contain 1 to 350 characters" });
  }

  const input = cleanHistory(body.history);
  input.push({ role: "user", content: message });

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Safety-Identifier": clientId
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || "gpt-5.6-luna",
        instructions: LUKE_ASSISTANT_INSTRUCTIONS,
        input: input,
        max_output_tokens: 180
      })
    });

    const data = await openAIResponse.json();

    if (!openAIResponse.ok) {
      console.error("OpenAI chatbot request failed", openAIResponse.status, data.error?.type || "unknown_error");
      return res.status(502).json({ error: "Assistant service is temporarily unavailable" });
    }

    const reply = extractResponseText(data);

    if (!reply) {
      return res.status(502).json({ error: "Assistant returned an empty response" });
    }

    return res.status(200).json({ reply: reply.slice(0, 600) });
  } catch (error) {
    console.error("Portfolio chatbot error", error instanceof Error ? error.message : "unknown_error");
    return res.status(502).json({ error: "Assistant service is temporarily unavailable" });
  }
};
