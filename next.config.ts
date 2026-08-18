import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  webpack: (config) => {
    config.resolve.modules = [
      path.resolve(process.cwd(), "node_modules"),
      ...(config.resolve.modules || []),
    ];
    return config;
  },
};

export default nextConfig;

