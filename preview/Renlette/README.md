# Renlette Trading website rebuild

This is a standalone HTML, CSS and JavaScript rebuild of the Renlette Trading website.

## Run locally

From this folder, start any static web server. For example:

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Project structure

- `index.html`: semantic page content, metadata and structured data
- `assets/css/styles.css`: design system, layouts, motion and responsive rules
- `assets/js/main.js`: navigation, filters, accordions, form validation and chatbot logic
- `assets/images/`: transparent logo, optimized generated photography and catalog imagery

## Integration notes

- The contact form intentionally does not transmit data. Connect its submit handler to a secure server endpoint before launch.
- The chatbot uses local response matching. Replace `getLocalResponse()` with a secure server request when an AI backend is available.
- Update the canonical and social preview URLs if the final deployment path changes.
- Product specifications, current availability and quotation details should be confirmed by the Renlette team before launch.

## Image notes

The logo was extracted from the supplied image onto a transparent background. The hero and training photographs were generated for this build. Product photographs were collected from the current Renlette Trading website to preserve catalog accuracy.
