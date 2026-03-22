import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: '/edith',        // ← replace "edith" with your GitHub repo name
  images: { unoptimized: true },
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
