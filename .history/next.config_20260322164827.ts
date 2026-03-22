import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/edith", // ← replace "edith" with your GitHub repo name
  images: { unoptimized: true },
};

export default nextConfig;
