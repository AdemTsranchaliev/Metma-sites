import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/metma-de" : "";

const remotePatterns = [
  {
    protocol: "https" as const,
    hostname: "metma-de.com",
    pathname: "/wp-content/uploads/**",
  },
  {
    protocol: "https" as const,
    hostname: "firebasestorage.googleapis.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "res.cloudinary.com",
    pathname: "/**",
  },
];

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: {
          unoptimized: true,
          loader: "custom",
          loaderFile: "./imageLoader.ts",
          remotePatterns,
        },
        env: {
          NEXT_PUBLIC_BASE_PATH: basePath,
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          deviceSizes: [640, 750, 828, 1080, 1200, 1920],
          imageSizes: [96, 128, 256, 384],
          remotePatterns,
        },
      }),
};

export default nextConfig;
