import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Expliciete projectroot (map van next.config.ts) — voorkomt verkeerde detectie door lockfile in home directory
    root: __dirname,
  },
};

export default nextConfig;
