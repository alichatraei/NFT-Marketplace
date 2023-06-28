/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
    optimizeImages: true,
    dangerouslyAllowSVG: false,
  },
};

module.exports = nextConfig;
