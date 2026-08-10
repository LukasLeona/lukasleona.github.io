# Lumo API backend

Lumo's browser code already defaults to `POST /api/chat`. Place `api/chat.js` at the root of the same project and deploy the project to Vercel.

## Required environment variable

Add this protected environment variable in the Vercel project settings:

```text
OPENAI_API_KEY=your_openai_api_key
```

Do not put the real key in HTML, browser JavaScript, Git, or a public `.env` file.

## Optional environment variables

```text
OPENAI_CHAT_MODEL=gpt-5.6-luna
CHATBOT_ALLOWED_ORIGIN=https://lukasleona.com,https://www.lukasleona.com
```

`OPENAI_CHAT_MODEL` defaults to `gpt-5.6-luna`. Add preview or alternate frontend domains to `CHATBOT_ALLOWED_ORIGIN`, separated by commas, when the frontend and API are hosted on different domains.

## Deploy on the same Vercel project

Use this structure:

```text
project-root/
├── api/
│   └── chat.js
├── assets/
│   └── js/
│       └── luke.js
└── index.html
```

After adding the environment variable, redeploy. The existing frontend will call `/api/chat` automatically.

## Keep the portfolio on static hosting

Deploy this API folder as a small Vercel project. Then add this before `assets/js/luke.js` in the portfolio HTML:

```html
<script>
  window.LUKE_CHATBOT_API_URL = "https://your-api-project.vercel.app/api/chat";
</script>
```

Set `CHATBOT_ALLOWED_ORIGIN` to the exact public portfolio origin and redeploy the API.

## Verification

Test the deployed function with a POST request:

```bash
curl -X POST "https://your-domain.example/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"What day is it today?","history":[],"page":"index.html"}'
```

A successful response has this shape:

```json
{"reply":"Today is ..."}
```

The endpoint accepts only POST requests, validates message/history lengths, restricts browser origins, applies a basic per-instance rate limit, and keeps API responses out of caches.
