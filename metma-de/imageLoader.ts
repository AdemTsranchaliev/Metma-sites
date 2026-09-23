/**
 * Custom loader so static GitHub Pages gets /metma-de prefix on images.
 */
export default function imageLoader({ src }: { src: string }) {
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base) return src;
  if (src.startsWith(base + "/") || src === base) return src;
  return src.startsWith("/") ? `${base}${src}` : `${base}/${src}`;
}
