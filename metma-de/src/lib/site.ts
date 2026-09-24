export const siteConfig = {
  code: "De" as const,
  name: "METMA Ltd.",
  shortName: "METMA",
  locale: "de",
  ogLocale: "de_DE",
  domain: "metma-de.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metma-de.com",
  email: "sales@metma-de.com",
  phone: "+359 885 828 771",
  phoneE164: "+359885828771",
  defaultTitle: "METMA | Eierfarben und Osterdekorationen",
  defaultDescription:
    "Hersteller von Eierfarben, Dekorationssets, Werbedisplays und Osterprodukten. Eigene Produktion seit 1999 — für Handel und Familie.",
  ogImage: "/images/hero-color-burst.jpg",
  address: {
    street: "General Gurko 6, et. 3",
    city: "Pazardzhik",
    postalCode: "4400",
    country: "BG",
  },
};

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5080";
