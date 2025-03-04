import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // for gh-pages deployment
  output: "export",
  basePath: "/microwave",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
