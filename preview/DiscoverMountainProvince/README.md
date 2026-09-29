# Discover Mountain Province

A responsive, single-page tourism concept built with plain HTML, CSS, and JavaScript. No build tool or package installation is required.

## Open the website

For a quick preview, double-click `index.html`.

For the most reliable video and font behavior, serve the folder with any local web server. One simple option, if Python is installed, is:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

## Included files

- `index.html` - page structure and tourism content
- `styles.css` - responsive layout, photographic cards, color system, and motion
- `script.js` - sound controls, navigation, filters, activity rail, trip builder, dialogs, counters, parallax, and reveal effects
- `assets/pulag-hero.mp4` - supplied 64-second, 1920×1080 hero film with its original audio
- `assets/ritual-dance.mp4` - supplied 50-second, 1920×1080 culture-section film
- `assets/images/` - optimized WebP versions of the supplied destination photographs and the culture illustration
- `assets/favicon.svg` - palette-matched browser icon
- `site.webmanifest` - basic installable-site metadata

## Media behavior

All website videos are permanently muted and the sound prompt and speaker control have been removed. On desktop, the hero and culture films may play silently; on mobile, video autoplay and motion are disabled to keep the experience static.

The desktop ritual-dance film remains user-controllable through its play/pause control.

## Customize

- Hero copy and page content are in `index.html`.
- Colors are the first variables in `styles.css`: `#1C315E`, `#227C70`, `#88A47C`, and `#E6E2C3`.
- Destination field notes and sample itineraries are near the bottom of `script.js`.
- Replace `assets/pulag-hero.mp4` with another MP4 using the same filename to change the hero film without editing code.

The cultural dance visual is an AI-generated editorial illustration and is labeled as such on the page. It should not be presented as a documentary photograph of a specific event or community.

Before publishing, replace sample trip guidance with verified local tourism information, current access rules, accredited-guide details, transportation information, and official contact links.
