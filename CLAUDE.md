# Spezar Tech website

Marketing site for Spezar Tech Private Limited (hardware & systems R&D).
Next.js 15 (App Router) + React 19 + Tailwind CSS 3. See README.md for the architecture.

## Git workflow
- Repo: https://github.com/riyasdeen02/spezar_new_site_2026 (private). Branch: `main`.
- Before starting work, `git pull origin main` (the user may have edited on the GitHub website).
- After every completed change, commit it with a short descriptive message and `git push origin main`.
- A push to `main` runs `.github/workflows/deploy.yml`, which rebuilds and publishes the live site,
  so run `npm run build` first for anything that could break the build.

## Commands
- `npm run dev` → dev server at http://localhost:3000
- `npm run build` / `npm run start` → production build / serve
- On Windows PowerShell, if scripts are blocked: `cmd /c "npm run dev"`

## Where things live
- Site copy: `data/content.js` (most text), `data/nav.js` (nav links)
- Sections: `components/sections/*` and the home page composition is in `app/page.jsx`
- Local images: `media/` and `logo/` (imported via the `@/` alias), plus `public/industry/` and `public/technology-logos/`

## Notes
- **Tech logos:** `public/technology-logos/*.svg` are brand-coloured Simple Icons (v13.21.0).
  Brands not in that set (Azure, LoRa, Fusion 360, u-blox, Microchip, SIMCom/Quectel) use a
  `wordmark` text label in `TechnologyLandscape`. To use a real logo instead, add the file and swap
  `wordmark` for `file`. Dark logos use `invertOnDark`.
- **Card/hero images:** `public/images/*.svg` are placeholder illustrations (hero-lab, project-nexus07,
  project-auranode). Replace them with real lab photos when available (paths are set in `data/content.js`).
- `components/sections/SupportedBy.jsx` is unused; `Recognition` already shows the same partner logos.
- `components/sections/WhySpezar.jsx` is unused; its key points were merged into `ClientAdvantages`.
- `SectionHeading` renders only the title and lead. The small "01 // KICKER — TAG" eyebrow lines
  were removed on request, so don't add them back.
- Footer social links live in `socialLinks` (`data/content.js`); entries without an `href` are hidden.
- Small mono/uppercase labels were removed or restyled site-wide on request; keep new text in
  normal sentence case.
- About section facts live in `aboutFacts` (`data/content.js`); founding year and team size are
  intentionally not shown until confirmed. The testimonial rating (4.9) is in `Testimonials.jsx`.

## Deployment
- The site is a static export (`output: "export"` in `next.config.mjs`, images unoptimized, trailing slashes)
  deployed to GitHub Pages at spezartech.com by `.github/workflows/deploy.yml` on every push to `main`.
- `public/CNAME` holds the custom domain; `public/.nojekyll` keeps Pages from ignoring `_next/`.
- Don't add API routes, server actions or middleware; they can't run on GitHub Pages.
- If `npm run build` fails with "Cannot find module for page: /_document", delete `.next` and rebuild.

## Known issues
- **Contact form:** `handleSubmit` in `components/sections/Contact.jsx` isn't wired to a backend yet.

The build otherwise passes cleanly. Both routes, `/` and `/contact`, are prerendered as static pages.
