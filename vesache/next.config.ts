import type { NextConfig } from "next";
import path from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/vesache").replace(/\/$/, "") : "";
const actionsStub = path.join(__dirname, "src/app/kontakti/actions.static.ts");

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
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
        turbopack: {
          resolveAlias: {
            "@/app/kontakti/actions": "./src/app/kontakti/actions.static.ts",
          },
        },
        webpack: (config) => {
          config.resolve.alias["@/app/kontakti/actions"] = actionsStub;
          return config;
        },
      }
    : {}),
};

export default nextConfig;
