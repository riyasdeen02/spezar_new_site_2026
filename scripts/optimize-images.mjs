// Makes web-sized WebP copies of the site's images (the originals stay as high-res masters).
// The site is a static export, so Next.js can't resize images at request time; this does it once.
// Usage: npm run optimize-images   (re-run after replacing or adding an image below)
import sharp from "sharp";
import { statSync } from "node:fs";
import { dirname, join, basename, extname } from "node:path";

// [source, max width in px (about 2x the largest size it's shown at), quality]
const jobs = [
  // Photos
  ["media/IMG_2149.jpg", 1200, 78],
  ["media/capabilities-bench.jpg", 1600, 80],
  ["media/contact.png", 1200, 78],
  ["media/whatwedo.png", 1400, 78],
  ["media/tnsi.jpg", 900, 78],
  ["media/isc.jpg", 900, 78],
  ...["agri", "assistivetech", "consumeriot", "energy", "industrialsys", "medtech", "oilgas", "remotesol"].map(
    (name) => [`public/industry/${name}.png`, 1400, 75]
  ),
  // Logos (keep transparency, higher quality for crisp edges)
  ["media/logo-white.png", 440, 90],
  ["media/logo-dark.png", 440, 90],
  ["logo/Asset-1@3x.png", 480, 90],
  ["logo/sastralogo.png", 480, 90],
  ["logo/spez sat-3.png", 480, 90],
  ["logo/spez sat-4.png", 480, 90],
  ["logo/TEAM SPEZAR-3.png", 480, 90],
  ["logo/tnsi_logo_web.png", 480, 90],
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
let before = 0;
let after = 0;

for (const [src, width, quality] of jobs) {
  const out = join(dirname(src), `${basename(src, extname(src))}.webp`);
  const info = await sharp(src)
    .rotate() // respect camera orientation
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6, alphaQuality: 100 })
    .toFile(out);
  const original = statSync(src).size;
  before += original;
  after += info.size;
  console.log(`${src.padEnd(34)} ${kb(original).padStart(9)} -> ${kb(info.size).padStart(7)}  (${info.width}x${info.height})`);
}

console.log(`\nTotal: ${kb(before)} -> ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`);
