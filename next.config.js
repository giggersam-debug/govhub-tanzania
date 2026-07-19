const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  // Service workers can make local development confusing (stale caches
  // during hot-reload), so this only builds the PWA in production.
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
