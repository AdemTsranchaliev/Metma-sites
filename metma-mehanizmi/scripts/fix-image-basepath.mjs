/**
 * next/image with unoptimized skips custom loaders, so static export still
 * emits /images/... — prefix only those public assets for GitHub Pages.
 * Do NOT rewrite page hrefs (that doubles basePath on client navigation).
 */
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "/Metma-sites/mehanizmi";
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

/**
 * Flight text rows are `ID:T<hexLen>,<bytes>`. Prefixing URLs inside them
 * changes the byte length; the client then never sees the following rows
 * and throws React error 412 (connection closed).
 */
function patchFlightBuffer(input) {
  const row = /([0-9a-f]+):T([0-9a-f]+),/g;
  const text = input.toString("utf8");
  const pieces = [];
  let cursor = 0;
  for (const match of text.matchAll(row)) {
    const start = Buffer.byteLength(text.slice(0, match.index), "utf8");
    const declared = parseInt(match[2], 16);
    const bodyStart = start + Buffer.byteLength(match[0], "utf8");
    if (bodyStart + declared > input.length) break;
    const body = input.subarray(bodyStart, bodyStart + declared).toString("utf8");
    const rewritten = Buffer.from(rewrite(body), "utf8");
    const header = Buffer.from(
      `${match[1]}:T${rewritten.length.toString(16)},`,
      "utf8",
    );
    pieces.push(input.subarray(cursor, start), header, rewritten);
    cursor = bodyStart + declared;
  }
  pieces.push(input.subarray(cursor));
  const joined = Buffer.concat(pieces);
  const outside = rewrite(joined.toString("utf8"));
  return Buffer.from(outside, "utf8");
}

function patchHtml(content) {
  return content.replace(
    /self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)/g,
    (_full, encoded) => {
      const decoded = Buffer.from(JSON.parse(`"${encoded}"`), "utf8");
      const patched = patchFlightBuffer(decoded).toString("utf8");
      return `self.__next_f.push([1,${JSON.stringify(patched)}])`;
    },
  );
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
    const after = name.endsWith(".txt")
      ? patchFlightBuffer(Buffer.from(before, "utf8")).toString("utf8")
      : name.endsWith(".html")
        ? rewrite(patchHtml(before))
        : rewrite(before);
    if (after !== before) fs.writeFileSync(full, after);
  }
}

if (!fs.existsSync(outDir)) {
  console.error("out/ missing — run next build first");
  process.exit(1);
}

function copyDir(src, dest) {
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

walk(outDir);

const bgDir = path.join(outDir, "bg");
if (fs.existsSync(bgDir)) {
  copyDir(bgDir, outDir);
  console.log("Copied Bulgarian pages to the site root");
}

console.log(`Prefixed /images, /videos and /favicon with ${BASE}`);
