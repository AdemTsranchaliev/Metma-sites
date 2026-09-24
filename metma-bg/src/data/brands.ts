import type { Product, ProductCategorySlug } from "@/data/home";

export type BrandId = "vesache" | "ino" | "pet" | "metma";

export type Brand = {
  id: BrandId;
  name: string;
  since: string;
  tag: string;
  text: string;
  logo: string;
  wash: string;
  ink: string;
};

export const brands: Brand[] = [
  {
    id: "vesache",
    name: "Весаче",
    since: "1992",
    tag: "Оригиналната марка",
    text: "Фирмата е основана през 1992 г. От 1995 г. произвежда боя за яйца и голям брой великденски украси. Продуктите на Весаче се намират в цяла България, а част от тях са за износ.",
    logo: "/images/brands/vesache.png",
    wash: "#ffd0bf",
    ink: "#e4572e",
  },
  {
    id: "ino",
    name: "Ино",
    since: "Kids",
    tag: "За деца",
    text: "Ино е детската линия: комплекти с герои, роботи, галактика и неон. Боя и декорация в една кутия.",
    logo: "/images/brands/ino.png",
    wash: "#cfeab8",
    ink: "#3d7a32",
  },
  {
    id: "pet",
    name: "Пет",
    since: "PET",
    tag: "Бои и аксесоари",
    text: "Пет е марката за бои, капсули, бандероли и украси — същите цветове, с които Весаче е позната като производител.",
    logo: "/images/brands/pet.png",
    wash: "#ffe08a",
    ink: "#c4890a",
  },
  {
    id: "metma",
    name: "METMA",
    since: "1999",
    tag: "Основната марка",
    text: "METMA е основната марка. Единствената фирма за боя за яйца в България с изцяло затворено производство. Весаче, Ино и Пет са другите ни марки.",
    logo: "/images/logo-brand-v3.png",
    wash: "#c5ddf6",
    ink: "#3d7ab5",
  },
];

export function getBrand(id?: string) {
  return brands.find((brand) => brand.id === id) ?? null;
}

export function isBrandId(value?: string): value is BrandId {
  return brands.some((brand) => brand.id === value);
}

type Extra = {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: ProductCategorySlug;
  brand: BrandId;
  shortDescription: string;
};

const extras: Extra[] = [
  { id: "P132", name: "Боя 8 капсули Весаче (P132)", slug: "vesache-p132", image: "/images/brands/vesache-p132.png", category: "boi", brand: "vesache", shortDescription: "Осем цветни капсули от марката Весаче." },
  { id: "P112", name: "Седефена писалка Весаче (P112)", slug: "vesache-p112", image: "/images/brands/vesache-p112.png", category: "ukrasi", brand: "vesache", shortDescription: "Седефена писалка за декорация на яйца." },
  { id: "VES-EGG", name: "Дървено яйце Весаче", slug: "vesache-darveno-yaytse", image: "/images/brands/vesache-egg.jpg", category: "ukrasi", brand: "vesache", shortDescription: "Дървено декоративно яйце Весаче." },
  { id: "VES-ST", name: "Декоративни стикери Весаче", slug: "vesache-stikeri", image: "/images/brands/vesache-stickers.png", category: "ukrasi", brand: "vesache", shortDescription: "Микс от декоративни стикери Весаче." },
  { id: "P135", name: "Комплект Неон Ино (P135)", slug: "ino-p135", image: "/images/brands/ino-p135.png", category: "komplekti", brand: "ino", shortDescription: "Детски комплект Неон от линията Ино." },
  { id: "P134", name: "Комплект Робо Ино (P134)", slug: "ino-p134", image: "/images/brands/ino-p134.png", category: "komplekti", brand: "ino", shortDescription: "Детски комплект с роботи от линията Ино." },
  { id: "P133", name: "Великденска галактика Ино (P133)", slug: "ino-p133", image: "/images/brands/ino-p133.png", category: "komplekti", brand: "ino", shortDescription: "Комплект Великденска галактика Ино." },
  { id: "P130", name: "Великденски герои Ино (P130)", slug: "ino-p130", image: "/images/brands/ino-p130.png", category: "komplekti", brand: "ino", shortDescription: "Комплект Великденски герои Ино." },
  { id: "PET-BIS", name: "Бисерни капсули Пет", slug: "pet-biserni-kapsuli", image: "/images/brands/pet-biserna.png", category: "boi", brand: "pet", shortDescription: "Шест цвята бисерни капсули Пет." },
  { id: "P131", name: "Неон капсули Пет (P131)", slug: "pet-p131", image: "/images/brands/pet-p131.png", category: "boi", brand: "pet", shortDescription: "Неон капсули от марката Пет." },
  { id: "P127", name: "Бандероли Фаберже Пет (P127)", slug: "pet-p127", image: "/images/brands/pet-p127.png", category: "ukrasi", brand: "pet", shortDescription: "Декоративни бандероли Фаберже." },
  { id: "P126", name: "Комплект Пет (P126)", slug: "pet-p126", image: "/images/brands/pet-p126.png", category: "komplekti", brand: "pet", shortDescription: "Комплект за боядисване и декорация Пет." },
];

export function extraBrandProducts(): Product[] {
  return extras.map((item) => ({
    ...item,
    images: [item.image],
    description: item.shortDescription,
    isFeatured: true,
  }));
}
