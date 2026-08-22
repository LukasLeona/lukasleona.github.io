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
- `videos.html`: responsive library of the 12 videos embedded on the previous WordPress videos page
- `assets/css/styles.css`: design system, layouts, motion and responsive rules
- `assets/js/main.js`: navigation, filters, accordions, form validation and chatbot logic
- `assets/images/`: transparent logo, optimized generated photography and catalog imagery

## Integration notes

- The contact form intentionally does not transmit data. Connect its submit handler to a secure server endpoint before launch.
- The chatbot uses local response matching. Replace `getLocalResponse()` with a secure server request when an AI backend is available.
- Update the canonical and social preview URLs if the final deployment path changes.
- Product specifications, current availability and quotation details should be confirmed by the Renlette team before launch.
- The PVSTOP calculator uses the supplied `dist=pvstop-mx` attribution tag. Do not change that tag. Its width and height may be adjusted for the final host layout.
- The PVSTOP calculator content is served by `pvstop.com.au`. Any calculator availability or lead-routing issue must be handled by the PVSTOP team.

## Image notes

The logo was extracted from the supplied image onto a transparent background. The hero and training photographs were generated for this build. The updated catalog uses transparent, single-product cutouts recreated from the supplied Renlette social product references.
