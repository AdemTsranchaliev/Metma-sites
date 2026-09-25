export const siteConfig = {
  code: "Bg" as const,
  name: "METMA ЕАД",
  shortName: "METMA",
  legalName: "МЕТМА ЕАД",
  locale: "bg",
  ogLocale: "bg_BG",
  domain: "metma-bg.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metma-bg.com",
  email: "contacts@metma-bg.com",
  phone: "+359 884 624 024",
  phoneE164: "+359884624024",
  phoneAlt: "+359 885 828 771",
  phoneAltE164: "+359885828771",
  phoneOffice: "+359 34 443 888",
  defaultTitle: "METMA | Боя за яйца и великденски украси",
  defaultDescription:
    "Единствената фирма за боя за яйца в България с изцяло затворено производство. Бои, комплекти, украси и рекламни дисплеи от 1999 г.",
  ogImage: "/images/hero/metma-baner.png",
  address: {
    street: "Генерал Гурко 6, ет. 3",
    city: "Пазарджик",
    postalCode: "4400",
    country: "BG",
  },
  social: {
    facebook: "https://www.facebook.com/MetmaBulgaria",
    instagram: "https://www.instagram.com/metma_bg/",
    instagramEaster: "https://www.instagram.com/chudesata.na.velikden/",
    tiktok: "https://www.tiktok.com/@metma.eu",
    youtube: "https://www.youtube.com/channel/UCzY6FBzb_mcHeoCmr82m7Og",
  },
};

export const socialProfiles = [
  {
    id: "facebook",
    label: "Facebook",
    handle: "MetmaBulgaria",
    href: siteConfig.social.facebook,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@metma_bg",
    href: siteConfig.social.instagram,
  },
  {
    id: "instagram-easter",
    label: "Чудесата на Великден",
    handle: "@chudesata.na.velikden",
    href: siteConfig.social.instagramEaster,
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "METMA",
    href: siteConfig.social.youtube,
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@metma.eu",
    href: siteConfig.social.tiktok,
  },
] as const;
