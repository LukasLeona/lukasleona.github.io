# Wedding Invitation Website Demo

A responsive, romantic wedding invitation website built with plain HTML, CSS, and JavaScript.

## Open the website

Double-click `index.html`, or open the folder in VS Code and use the Live Server extension.

## Main files

- `index.html` — page structure and content
- `style.css` — earth-tone design, responsiveness, and animations
- `script.js` — countdown, RSVP popup, gift reservation demo, gallery, navigation, and calendar download
- `assets/images/` — optimized generated wedding images
- `assets/icons/favicon.svg` — custom A&R favicon

## Update names and date

Open `script.js` and edit the `WEDDING_CONFIG` object near the top:

```js
const WEDDING_CONFIG = {
  brideName: "Amelia",
  groomName: "Rafael",
  weddingDate: "2026-12-12T16:00:00+08:00",
  weddingDateLabel: "December 12, 2026",
  venue: "The Peninsula Manila",
  calendarEnd: "2026-12-12T22:00:00+08:00"
};
```

## Demo behavior

- The RSVP form validates fields, displays a success popup, and then resets.
- Gift reservation forms display a confirmation and update the selected gift to `Reserved` during the current browser session.
- No information is stored or sent anywhere.
- The Google Map requires an internet connection.
- Poppins is loaded from Google Fonts.
