export const siteConfig = {
  code: "Usa" as const,
  name: "METMA USA LTD.",
  locale: "en",
  domain: "metma-usa.com",
};

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5080";
