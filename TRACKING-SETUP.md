# Portfolio visit and CTA notifications

The homepage now supports two free tracking paths:

- EmailJS sends Luke an alert after a real-looking visitor keeps the live portfolio visible for 10 seconds.
- EmailJS sends Luke an immediate alert when the home hero’s **Explore My Work** button is selected.
- Google Analytics 4 support is ready for aggregate page and CTA reporting once a Measurement ID is supplied.

## Current notification behavior

Email notifications run only on `lukasleona.com` and `www.lukasleona.com`. They are disabled on localhost, GitHub previews, and other copied hosts.

Visit notifications are limited to one per browser every 24 hours. Explore-button notifications are limited to one every 30 minutes in the same browser tab session. A quick Explore click also suppresses the ordinary visit alert, avoiding two emails for the same short visit.

Obvious crawlers, link-preview bots, automated browsers, hidden tabs, Do Not Track, and Global Privacy Control are excluded. Messages contain only:

- Asia/Manila timestamp
- page title and path, without query parameters
- referring domain, without its page path
- broad device category
- browser language
- CTA placement for button-click alerts

The site does not add the visitor’s IP address, exact location, or fingerprint to the notification.

## Enable Google Analytics 4

1. Create a GA4 web data stream for `https://lukasleona.com`.
2. Copy its Measurement ID, which starts with `G-`.
3. Open `assets/js/tracking-config.js`.
4. Replace the empty `measurementId` value with the real ID.
5. Deploy and check GA4 Realtime while visiting the live domain.

When enabled, GA4 records its standard page view and the custom events `engaged_visit` and `explore_work_click`. The configuration requests IP anonymization and respects supported browser privacy signals.

## Confirm EmailJS protection

The website reuses the existing EmailJS service and template so no additional paid service is required. In the EmailJS dashboard:

1. Add `https://lukasleona.com` and `https://www.lukasleona.com` to the allowed-origin list.
2. Keep the current service and template active.
3. Confirm the template renders the `comments` or `message` variable.
4. Confirm emails are delivered to `luke@lukasleona.com`.

The browser SDK is initialized with headless-browser blocking. The EmailJS public key is intentionally client-visible; never add an email-provider secret key to frontend files.

## Test safely

Run the tracking checks with:

```powershell
node --test test/tracking.test.js
```

Live emails are deliberately not sent from localhost. After deployment, use a private browser window and keep the homepage visible for 10 seconds. Open a new private session to test again without waiting for the local cooldown.

The public explanation of the collected data and visitor choices is at `/privacy.html`.
