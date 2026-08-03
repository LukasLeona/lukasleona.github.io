# LayoutLetter

A responsive neumorphic newsletter-builder prototype using the requested palette:

- `#DB1A1A`
- `#FFF6F6`
- `#8CC7C4`
- `#2C687B`
- Poppins typography

## Included

- Drag-and-drop newsletter builder with keyboard undo/redo, duplicate, delete, copy, and paste shortcuts
- Sixteen editable content blocks: heading, paragraph, rich text, quote, list, image, logo, gallery, hero, columns, callout, product, button, social links, divider, and spacer
- Local image upload, image clipboard paste, drag-and-drop images, automatic large-image resizing, alt text, and image hyperlinks
- Formatted newsletter paste from email clients and document editors with safe HTML cleanup
- Nine font choices with email-safe fallback stacks
- Palette presets, reusable brand colors, and direct color application to selected blocks
- Social icon labels and destination links
- Desktop and mobile preview
- Six ready-made templates with real-content previews in the Templates tab
- Save any current newsletter as a reusable custom template
- Export finished newsletter HTML
- Manual audience entry
- CSV and Excel import with email-column detection
- Duplicate and invalid-email handling
- Campaign history and dashboard statistics
- Browser persistence through `localStorage`
- Optional Node/Express email endpoint
- Safe demo mode when SMTP is not configured

## Quick browser preview

Double-click the root `index.html`. The builder, templates, audience import, local saving, previews, and demo sending work in the browser.

## Run with the optional email server

On Windows, double-click `START_LAYOUTLETTER.bat`, or follow these steps:

1. Install Node.js 18 or newer.
2. Open this project folder in a terminal.
3. Run:

```bash
npm install
npm start
```

4. Open `http://localhost:3000`.

You can also open `public/index.html` directly for most front-end features. Real sending requires the Node server.

## Enable real email sending

1. Copy `.env.example` to `.env`.
2. Add your SMTP provider details.
3. Restart the server.

The starter server sends one message per recipient and defaults to a maximum of 100 recipients per request. For a production newsletter product, connect a bulk email provider such as Amazon SES, Postmark, Mailgun, SendGrid, Brevo, or Resend, and add provider-managed unsubscribe, suppression, bounce, and complaint handling.

## Notes

- The app stores campaigns, contacts, and editor content in the browser.
- Sending is simulated until SMTP settings are configured.
- Excel import uses SheetJS from a CDN.
- Poppins is loaded through Google Fonts.
