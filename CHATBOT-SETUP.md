# Luke portfolio assistant setup

The verified local answers and browser voice mode work without an API key. Generated answers use the server-side function at `api/chat.js`.

## Enable generated answers

1. Deploy the portfolio to a host that supports JavaScript serverless functions, such as Vercel.
2. Add `OPENAI_API_KEY` as a protected environment variable in the host dashboard.
3. Optionally set `OPENAI_CHAT_MODEL`; the default is `gpt-5.6-luna`.
4. Redeploy and confirm that a POST request to `/api/chat` succeeds.

Never add the real API key to HTML, browser JavaScript, Git, or `.env.example`.

## Keep the website on static hosting

If the portfolio stays on GitHub Pages, deploy `api/chat.js` separately on a function-capable host. Then configure the public endpoint before `assets/js/luke.js` loads:

```html
<script>
  window.LUKE_CHATBOT_API_URL = "https://your-secure-function.example/api/chat";
</script>
```

Set `CHATBOT_ALLOWED_ORIGIN=https://lukasleona.com` on the function host. Multiple allowed origins can be comma-separated.

## Voice mode

The microphone button uses the visitor's browser speech recognition, and the speaker button controls spoken replies. Microphone permission is requested only after the visitor presses the microphone button. Browser support varies, so typed chat remains available at all times.
