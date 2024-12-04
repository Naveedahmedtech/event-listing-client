import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "picsum.photos",
      "fastly.picsum.photos",
      "via.placeholder.com",
    ],
  },
  env: {
    PREDICTHQ_API_ACCESS_TOKEN: process.env.PREDICTHQ_API_ACCESS_TOKEN,
    PREDICTHQ_API_URL: process.env.PREDICTHQ_API_URL,
    IPSTACK_ACCESS_TOKEN: process.env.IPSTACK_ACCESS_TOKEN,
    MONGODB_URL: process.env.MONGODB_URL,
  },
};

export default nextConfig;
