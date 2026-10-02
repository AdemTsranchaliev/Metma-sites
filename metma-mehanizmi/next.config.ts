import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
// Nested under the BG custom domain at /mehanizmi
const basePath = isGithubPages
  ? (process.env.NEXT_PUBLIC_BASE_PATH || "/mehanizmi").replace(/\/$/, "") ||
    "/mehanizmi"
  : "";

const nextConfig: NextConfig = isGithubPages
  ? {
      output: "export",
      basePath,
      assetPrefix: basePath,
      trailingSlash: true,
      images: { unoptimized: true },
      env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
      },
    }
  : {};

export default nextConfig;
