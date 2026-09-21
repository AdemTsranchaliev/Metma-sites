/**
 * next/image with unoptimized skips custom loaders, so static export still
 * emits /images/... — prefix only those public assets for GitHub Pages.
 * Do NOT rewrite page hrefs (that doubles basePath on client navigation).
 */
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "/metma-de";
const outDir = path.join(process.cwd(), "out");

function rewrite(content) {
  let next = content.replaceAll(`${BASE}/images/`, "\0BASEIMG\0");
  next = next.replaceAll(`${BASE}/videos/`, "\0BASEVID\0");
  next = next.replaceAll(`${BASE}/favicon.png`, "\0BASEFAV\0");
  next = next.replaceAll("/images/", `${BASE}/images/`);
  next = next.replaceAll("/videos/", `${BASE}/videos/`);
  next = next.replaceAll("/favicon.png", `${BASE}/favicon.png`);
  next = next.replaceAll("\0BASEIMG\0", `${BASE}/images/`);
  next = next.replaceAll("\0BASEVID\0", `${BASE}/videos/`);
  next = next.replaceAll("\0BASEFAV\0", `${BASE}/favicon.png`);
  return next;
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(html|js|css|json|txt)$/.test(name)) continue;
    const before = fs.readFileSync(full, "utf8");
    if (
      !before.includes("/images/") &&
      !before.includes("/videos/") &&
      !before.includes("/favicon.png")
    ) {
      continue;
    }
    const after = rewrite(before);
    if (after !== before) fs.writeFileSync(full, after);
  }
}

if (!fs.existsSync(outDir)) {
  console.error("out/ missing — run next build first");
  process.exit(1);
}

walk(outDir);
console.log(`Prefixed /images, /videos and /favicon with ${BASE}`);
