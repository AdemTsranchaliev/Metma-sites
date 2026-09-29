import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/Metma-sites" : "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  ...(isGithubPages
    ? { output: "export", basePath, assetPrefix: basePath, trailingSlash: true }
    : {}),
};

export default nextConfig;
