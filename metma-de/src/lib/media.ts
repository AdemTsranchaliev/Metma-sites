/**
 * Cloudinary delivery URL: auto WebP/AVIF + quality + max width.
 * No SDK needed on the storefront.
 */
export function optimizeMediaUrl(
  url: string,
  opts?: { width?: number },
): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  if (/\/upload\/[^/]*f_auto/.test(url)) return url;
  const width = opts?.width ?? 1200;
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto:good,c_limit,w_${width}/`,
  );
}
