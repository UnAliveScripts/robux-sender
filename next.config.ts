import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnails.roblox.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.rbxcdn.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
