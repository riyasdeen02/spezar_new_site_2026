/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so the site can be served from GitHub Pages (spezartech.com).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
