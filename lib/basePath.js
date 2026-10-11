// Sub-path the site is served from. Empty on spezartech.com; "/spezar_new_site_2026" on the
// github.io preview. Set at build time by the deploy workflow (from actions/configure-pages).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Prefix root-relative paths ("/contact", "/industry/agri.png") with the base path.
// next/image and plain <a>/<img> don't add it themselves for string paths.
export function withBase(path) {
  return typeof path === "string" && path.startsWith("/") ? `${basePath}${path}` : path;
}
