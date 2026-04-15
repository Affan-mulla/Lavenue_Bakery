import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Restrict and optimize remote images for performance and security.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [75, 85, 90],
    maximumRedirects: 1,
  },
};

export default nextConfig;
