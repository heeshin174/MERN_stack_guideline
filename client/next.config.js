/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/api/users/:slug*",
      destination: `http://localhost:5000/api/users/:slug*`,
    },
    {
      source: "/api/goals/:slug*",
      destination: `http://localhost:5000/api/goals/:slug*`,
    },
  ],

  images: {
    domains: ["tailwindui.com"],
    path: "/",
  },
};

module.exports = nextConfig;
