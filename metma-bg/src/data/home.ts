import shop from "@/data/shop.json";
import { extraBrandProducts, type BrandId } from "@/data/brands";

export type ProductCategorySlug = "boi" | "komplekti" | "ukrasi" | "displei";
export type { BrandId };

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  category: ProductCategorySlug;
  brand: BrandId;
  shortDescription: string;
  description: string;
  isFeatured?: boolean;
};

const metmaProducts = (shop as Omit<Product, "brand">[]).map((product) => ({
  ...product,
  brand: "metma" as const,
}));

export const products: Product[] = [...metmaProducts, ...extraBrandProducts()];

export const navItems = [
  { label: "Начало", href: "/" },
  { label: "Продукти", href: "/produkti", highlight: true },
  { label: "Блог", href: "/blog" },
  { label: "За нас", href: "/za-nas" },
  { label: "Декларации", href: "/deklaratsii" },
  { label: "Контакти", href: "/kontakti" },
] as const;

export const productCategories = [
  { label: "Бои", href: "/produkti/boi", slug: "boi" },
  { label: "Комплекти", href: "/produkti/komplekti", slug: "komplekti" },
  { label: "Украси", href: "/produkti/ukrasi", slug: "ukrasi" },
  { label: "Рекламни дисплеи", href: "/produkti/displei", slug: "displei" },
] as const;

export const team = [
  { name: "Любомир Илиев", role: "Собственик", image: "/images/about/Lubo-Pic.png" },
  { name: "Зафер Мюмюнов", role: "Изпълнителен директор", image: "/images/about/Zafer-Pic.png" },
  { name: "Василка Нонова", role: "Ръководител продажби", image: "/images/about/Vaseto-Pic.png" },
] as const;

export const brands = [
  { name: "Боя Весаче", image: "/images/brands/vesache.png" },
  { name: "Боя Ино", image: "/images/brands/ino.png" },
  { name: "Боя Пет", image: "/images/brands/pet.png" },
  { name: "Боя METMA", image: "/images/logo-brand-v3.png" },
] as const;
