import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", //For Firebase Deployment

  images: {
    // unoptimized: true, //For Firebase Deployment
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      }
    ]
  }
};

export default nextConfig;