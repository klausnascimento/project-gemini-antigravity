import type { NextConfig } from "next";

const origins = ["http://127.0.0.1:3000", "http://localhost:3000"];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: origins,
    },
  },
  // @ts-ignore
  allowedDevOrigins: origins,
};

export default nextConfig;
