# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website served via GitHub Pages (angelomaia.github.io). Pure static site — no build step, no package manager, no framework.

## Development

Open `index.html` directly in a browser, or serve locally with any HTTP server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Deployment is automatic: push to GitHub and GitHub Pages serves the result.

## Architecture

Single-page site with four scroll sections: About, Tools, Projects, Contact.

- `index.html` — all markup and section structure
- `styles.css` — layout, color variables, animations, responsive breakpoints
- `script.js` — smooth scrolling, scroll-triggered fade-in via IntersectionObserver, navbar styling on scroll
- `assets/` — project screenshots and profile photos
- `icons/` — SVG social/favicon icons

## Dependencies

All loaded via CDN (no local installs needed):
- Bootstrap 5.3.0 (CSS + JS bundle)
- Bootstrap Icons 1.11.0
- Google Fonts — Inter

## Key Conventions

- CSS custom properties are defined at `:root` in `styles.css`; use them for any color additions.
- Tool icons use a `filter: grayscale(100%)` → color transition on hover — maintain this pattern when adding new tech icons.
- Cards and sections use the IntersectionObserver in `script.js` for fade-in; add the `.fade-in` class to new animated elements.
