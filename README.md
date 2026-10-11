# Spezar Tech — Marketing Site

Hardware & systems R&D landing site for Spezar Tech Private Limited, built with
**Next.js (App Router)**.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **Tailwind CSS 3** (`@tailwindcss/forms`, `@tailwindcss/container-queries`)
- `next/font` (Space Grotesk, Geist, JetBrains Mono — self-hosted, zero layout shift)
- `next/image` for optimized remote images
- Metadata API for SEO / Open Graph / Twitter cards

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

> On Windows PowerShell, if script execution is blocked, run commands via
> `cmd /c "npm run dev"` or allow scripts with
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Architecture

Server Components by default; `"use client"` only where interactivity is required.

| Component | Type | Why |
| --- | --- | --- |
| `app/layout.jsx` | Server | fonts, metadata, root `<html>` |
| `app/page.jsx` | Server | composes all sections |
| `components/layout/InteractionProvider` | **Client** | mounts scroll-reveal + smooth-scroll hooks |
| `components/layout/Header` | **Client** | mobile menu, theme toggle, scroll state |
| `components/ui/SpotlightCard` | **Client** | mouse-tracking glow |
| `components/sections/Contact` | **Client** | form state + validation |
| all other sections / `Icon` / `Footer` / `AmbientBackground` | Server | static markup |

## Dynamic behavior

- **Scroll reveal** — sections fade/slide in on first view (`useScrollReveal`).
- **Spotlight cards** — mouse-tracking radial glow (`useSpotlight`).
- **Smooth scroll** — anchor links ease to targets, offset for the fixed header (`useSmoothScroll`).
- **Mobile nav** — animated dropdown with body-scroll lock.
- **Theme toggle** — toggles the root `dark` class.
- **Contact form** — client-side validation with a submitted confirmation state
  (wire `handleSubmit` in `components/sections/Contact.jsx` to your API or form service).

All animations respect `prefers-reduced-motion`.

## Project structure

```
app/
  layout.jsx      # fonts + metadata + root html/body
  page.jsx        # home route composition
  globals.css     # Tailwind layers + spotlight / reveal styles
components/
  layout/         # Header, Footer, AmbientBackground, InteractionProvider
  sections/       # Hero, Capabilities, Process, ... Contact
  ui/             # Icon, SpotlightCard, SectionHeading
hooks/            # useSpotlight, useScrollReveal, useSmoothScroll
data/             # nav.js, content.js (all section copy)
next.config.mjs   # image remotePatterns, strict mode
tailwind.config.js
```

Editing site copy? Most of it lives in `data/content.js`.
```
