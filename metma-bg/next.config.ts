import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
// Custom domain (metma-bg.com) serves from site root — no /Metma-sites prefix.
const basePath = isGithubPages
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")
  : "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  ...(isGithubPages
    ? {
        output: "export" as const,
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
        trailingSlash: true,
        env: {
          NEXT_PUBLIC_BASE_PATH: basePath,
        },
      }
    : {}),
};

export default nextConfig;
