const TRANSFORM = /^(?:[a-z]{1,3}_[^/,]+,)*[a-z]{1,3}_[^/,]+$/;

/** Cloudinary delivery URL sized for the slot it fills. Replaces an earlier transform. */
export function optimizeMediaUrl(url: string, opts?: { width?: number; quality?: "good" | "eco" }): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  if (url.includes("/video/upload/")) return url;
  const width = opts?.width ?? 640;
  const quality = opts?.quality ?? "good";
  const marker = "/upload/";
  const start = url.indexOf(marker);
  const parts = url.slice(start + marker.length).split("/");
  while (parts.length > 1 && TRANSFORM.test(parts[0])) parts.shift();
  return `${url.slice(0, start)}${marker}f_auto,q_auto:${quality},c_limit,w_${width}/${parts.join("/")}`;
}
