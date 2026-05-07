import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Keep config deployable across machines/CI (no absolute paths).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
