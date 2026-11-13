# MEIY — The Truth by Design

An interactive design-fiction storefront set in 2032. This release is organised around a material-interaction philosophy, with eight concept products and their transformation videos presented as the main product media.

## Start

Open `index.html` in a browser. Files work locally without a server and do not require installation. For a local development server, run `python -m http.server 8000` inside this directory and open `http://localhost:8000`.

## Homepage

The homepage begins with the central question: **What if everyday objects could speak softly?** It explains how ordinary material properties communicate before describing four expressive channels: shape, colour, texture and light. The home of 2032 and its questions about agency precede the complete eight-product collection.

## Product pages

Each object has a page in `products/` where an MP4 transformation video is the first, largest media. All videos are local and autoplay muted when the browser allows, with native playback controls. Users can inspect the six keyframes and return to the animation. The site honours reduced-motion preferences.

The original five transitions (lamp, chair, pot, door and tap) are present from the provided archive. The Companion Phone, HEARTH cooking pot and KŌKA kettle have **nine-second conceptual sequences assembled from six visual states using cross-dissolves**, rather than recorded physical transitions. These three should not be presented as verified geometric morphing footage.

## Interaction and transparency

Product category filters, search, colour and texture selections, quantity controls and a persistent shopping bag are implemented. The bag opens an explanatory dialog; no orders, payments, shipping or fulfilment exist. All objects, engineering details and prices are concept material for DE714 design fiction, not manufactured products.

## Files

- `index.html` — homepage
- `products/*.html` — eight product pages
- `assets/` — photos, stills and MP4 videos
- `styles.css` — shared styles
- `site.js` — interactions
- `products.js` — bag pricing and product catalogue metadata

The website keeps the phone's two-dot camera design specific to Companion, and uses natural, warm earthy aesthetics for the household objects.


## Ratings and reviews (2026 update)

Every product page now contains a scenario rating, three clearly labeled *imagined 2032 perspectives*, and a form for the visitor to save their own **private browser-local reflection**. Shared, public reviews are not supported without a backend. The seed content is in `review-data.js` and the interactive behavior in `reviews.js`.

## Deployment

This folder is ready for GitHub Pages with `.nojekyll` and `.github/workflows/pages.yml`. See `DEPLOY_TO_GITHUB.md` for GitHub Desktop or Git instructions. GitHub account authentication and publication need to be completed in GitHub.
