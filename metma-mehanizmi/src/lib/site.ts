export const siteConfig = {
  code: "Bg" as const,
  name: "МЕТМА",
  shortName: "МЕТМА",
  legalName: "МЕТМА ООД",
  locale: "bg",
  ogLocale: "bg_BG",
  domain: "metma.bg",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metma.bg",
  tagline: "Механизми за мебели",
  defaultTitle: "МЕТМА | Механизми за мека мебел",
  defaultDescription:
    "МЕТМА ООД произвежда механизми, модули и детайли за мебелната промишленост в Пазарджик. Серийно производство, наличности и поръчки по заявка.",
  ogImage: "/images/products/meh8.jpg",
  logo: "/images/logo.png",
  phone: "+359 (0) 34 443 888",
  phoneHref: "tel:+35934443888",
  phoneE164: "+35934443888",
  mobile: "+359 (0) 884 624 024",
  mobileHref: "tel:+359884624024",
  mobileE164: "+359884624024",
  fax: "+359 (0) 34 443 888",
  email: "metma@abv.bg",
  addressLines: ["Генерал Гурко 6, ет. 3", "Пазарджик, България"],
  address: {
    street: "Генерал Гурко 6, ет. 3",
    city: "Пазарджик",
    postalCode: "4400",
    country: "BG",
  },
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D0%BB+%D0%93%D1%83%D1%80%D0%BA%D0%BE+6+%D0%9F%D0%B0%D0%B7%D0%B0%D1%80%D0%B4%D0%B6%D0%B8%D0%BA",
};

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5080";

export const aboutParagraphs = [
  "През последните години МЕТМА ООД се специализира в производството на механизми, модули и детайли за мебелната промишленост, като приоритет е производството на механизми за мека мебел. Основната дейност е свързана със серийно производство на механизми с европейско качество, от които се поддържат постоянни наличности. За производството фирмата е оборудвана със специфични за дейността машини и приспособления.",
  "МЕТМА ООД разполага с екип от професионалисти, който се стреми към удовлетвореността на клиентите и непрекъснато разширява производствената номенклатура, като изпълнява и индивидуални поръчки.",
];

export const nav = [
  { href: "/", label: "Начало" },
  { href: "/produkti", label: "Продукти" },
  { href: "/za-nas", label: "За нас" },
  { href: "/blog", label: "Блог" },
  { href: "/kontakti", label: "Контакти" },
];
