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

- `index.html` — page structure and tourism content
- `styles.css` — responsive layout, color system, illustrations, and motion
- `script.js` — sound controls, navigation, filters, trip builder, dialogs, and reveal effects
- `assets/pulag-hero.mp4` — supplied 64-second, 1920×1080 hero film with its original audio
- `assets/favicon.svg` — palette-matched browser icon
- `site.webmanifest` — basic installable-site metadata

## Hero sound behavior

Modern browsers block autoplaying audio. The film therefore starts automatically while muted. Selecting **Enter with sound** or the speaker button enables the video's original soundtrack. Its volume fades out when the hero leaves the screen and fades back in when the visitor returns.

## Customize

- Hero copy and page content are in `index.html`.
- Colors are the first variables in `styles.css`: `#1C315E`, `#227C70`, `#88A47C`, and `#E6E2C3`.
- Destination field notes and sample itineraries are near the bottom of `script.js`.
- Replace `assets/pulag-hero.mp4` with another MP4 using the same filename to change the hero film without editing code.

Before publishing, replace sample trip guidance with verified local tourism information, current access rules, accredited-guide details, transportation information, and official contact links.
