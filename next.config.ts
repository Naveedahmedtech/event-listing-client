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
    PREDICTHQ_API_ACCESS_TOKEN: "nGLVkytwyqFNpwm2Y1TQPa_ao_V7S_me5fYuRLNR",
    PREDICTHQ_API_URL: "https://api.predicthq.com/v1",
    IPSTACK_ACCESS_TOKEN: "667b48f0640937c8783ce093e245c0b6",
    MONGODB_URL: "mongodb+srv://event_listing_naveed:TFY8U39lmoDiwEJM@atlascluster.kur4ae8.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
  },
};

export default nextConfig;
