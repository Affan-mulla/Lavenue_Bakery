import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only keep currently used remote image host(s).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
