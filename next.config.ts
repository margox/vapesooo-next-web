import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "vapesooo.com",
      },
      {
        hostname: "vapesooo-1318551956.cos.accelerate.myqcloud.com",
      },
    ],
  },
};

export default nextConfig;
