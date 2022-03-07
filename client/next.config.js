/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com"],
    loader: "custom",
    path: "/",
  },
};

module.exports = nextConfig;
