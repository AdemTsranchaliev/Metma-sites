export const siteConfig = {
  code: "Bg" as const,
  name: "Metma Bulgaria",
  locale: "bg",
  domain: "metma.bg",
};

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5080";
