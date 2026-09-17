export const siteConfig = {
  code: "De" as const,
  name: "Metma Germany",
  locale: "de",
  domain: "metma-de.com",
};

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5080";
