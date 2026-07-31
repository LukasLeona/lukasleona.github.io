const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    mode: hasSmtpConfig() ? "smtp" : "demo",
  });
});

app.post("/api/send", async (req, res) => {
  try {
    const {
      campaignName,
      subject,
      fromName,
      replyTo,
      recipients,
      html,
      testOnly = false,
    } = req.body || {};

    if (!subject || !fromName || !replyTo || !Array.isArray(recipients) || recipients.length === 0 || !html) {
      return res.status(400).json({ ok: false, message: "Missing campaign fields or recipients." });
    }

    const cleanRecipients = [...new Set(
      recipients
        .map((email) => String(email).trim().toLowerCase())
        .filter(isValidEmail)
    )];

    const maxRecipients = Number(process.env.MAX_RECIPIENTS || 100);
    if (cleanRecipients.length > maxRecipients) {
      return res.status(400).json({
        ok: false,
        message: `This starter server allows up to ${maxRecipients} recipients per request.`,
      });
    }

    if (!hasSmtpConfig()) {
      return res.json({
        ok: true,
        mode: "demo",
        message: testOnly
          ? "Test email simulated. Add SMTP settings in .env to send real email."
          : "Campaign recorded in demo mode. Add SMTP settings in .env to send real email.",
        campaignName,
        accepted: cleanRecipients.length,
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    // Sends one message per recipient to avoid exposing the contact list.
    // For large production sends, replace this with a provider's bulk/broadcast API.
    const results = [];
    for (const recipient of cleanRecipients) {
      const info = await transporter.sendMail({
        from: `"${fromName}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: recipient,
        replyTo,
        subject,
        html,
      });
      results.push({ recipient, messageId: info.messageId });
    }

    res.json({
      ok: true,
      mode: "smtp",
      message: testOnly ? "Test email sent." : "Campaign sent.",
      accepted: results.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "The server could not send the email. Check your SMTP settings.",
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`LayoutLetter running at http://localhost:${PORT}`);
  console.log(`Email mode: ${hasSmtpConfig() ? "SMTP" : "demo"}`);
});

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    (process.env.FROM_EMAIL || process.env.SMTP_USER)
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}
