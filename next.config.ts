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
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    BASE_URL: process.env.BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
