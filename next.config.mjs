/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so the site can be served from GitHub Pages (spezartech.com).
  output: "export",
  // Empty for spezartech.com; the workflow sets it for the github.io sub-path preview (see lib/basePath.js).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
