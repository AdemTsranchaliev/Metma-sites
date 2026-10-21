export type BrandId = "vesache" | "ino" | "pet" | "metma";
export type CategorySlug = string;

export type CatalogCategory = {
  slug: string;
  label: string;
  hint: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  category: CategorySlug;
  brand: BrandId;
  shortDescription: string;
  description: string;
  isFeatured: boolean;
};

export const categories: CatalogCategory[] = [
  { slug: "boi", label: "Бои", hint: "Таблетки, капсули и течни" },
  { slug: "komplekti", label: "Комплекти", hint: "Всичко за боядисване" },
  { slug: "ukrasi", label: "Украси", hint: "Стикери, трева и яйца" },
  { slug: "displei", label: "Рекламни дисплеи", hint: "Рекламни стойки" },
];

export const companies: {
  id: BrandId;
  name: string;
  since: string;
  tag: string;
  text: string;
  logo: string;
  wash: string;
  ink: string;
}[] = [
  {
    id: "vesache",
    name: "Весаче",
    since: "1992",
    tag: "Оригиналната марка",
    text: "Весаче е марка за бои за яйца и украси, която предоставя качество на достъпна цена за Вашия Великденски празник.",
    logo: "/images/brands/vesache.webp",
    wash: "#dbe9fb",
    ink: "#2e64b4",
  },
  {
    id: "pet",
    name: "Пет",
    since: "PET",
    tag: "Бои и аксесоари",
    text: "Пет е марката за бои, капсули, бандероли и украси. Същите цветове и комплекти, с които Весаче е позната като производител.",
    logo: "/images/brands/pet.webp",
    wash: "#fff1c4",
    ink: "#8f5a00",
  },
  {
    id: "ino",
    name: "Ино",
    since: "Kids",
    tag: "За деца",
    text: "Ино е детската линия: комплекти с герои, роботи, галактика и неон. Боя и декорация в една кутия.",
    logo: "/images/brands/ino.webp",
    wash: "#e4f6e6",
    ink: "#1a7a34",
  },
  {
    id: "metma",
    name: "METMA",
    since: "1999",
    tag: "Основната марка",
    text: "METMA е основната марка за боя за яйца. Единствената фирма в България с изцяло затворено производство.",
    logo: "/images/brands/metma.webp",
    wash: "#ffe0e0",
    ink: "#c41212",
  },
];

export function companyName(id: string) {
  return companies.find((item) => item.id === id)?.name ?? id;
}

export function categoryName(slug: string, list: CatalogCategory[] = categories) {
  return list.find((item) => item.slug === slug)?.label ?? slug;
}

export function productTitle(name: string, id: string) {
  const code = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const title = name
    .replace(new RegExp(`\\s*[–—-]?\\s*\\(?${code}\\)?\\s*$`, "i"), "")
    .replace(/\s*[–—-]?\s*\([A-Za-zА-Яа-я0-9-]+\)\s*$/u, "")
    .replace(/\s*[–—-]\s*$/, "")
    .trim();
  return title || name;
}
