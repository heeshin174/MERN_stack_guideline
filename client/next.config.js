/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/api/users/:slug*",
      destination: `http://172.29.74.246:5000/api/users/:slug*`,
    },
    {
      source: "/api/goals/:slug*",
      destination: `http://172.29.74.246:5000/api/goals/:slug*`,
    },
  ],

  images: {
    domains: ["tailwindui.com"],
    path: "/",
  },
};

module.exports = nextConfig;
