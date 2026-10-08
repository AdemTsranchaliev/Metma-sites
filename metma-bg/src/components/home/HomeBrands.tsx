"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { EggIcon } from "@/components/easter/EasterMotifs";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { localePath } from "@/lib/i18n";

type BrandProduct = {
  name: string;
  code: string;
  image: string;
  href: string;
};

type Brand = {
  id: string;
  name: string;
  since: string;
  tag: string;
  text: string;
  logo: string;
  wash: string;
  ink: string;
};

export type HomeBrandProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
  brand: string;
};

const brands: Brand[] = [
  {
    id: "vesache",
    name: "Весаче",
    since: "1992",
    tag: "Оригиналната марка",
    text: "Фирмата е основана през 1992 г. От 1995 г. произвежда боя за яйца и голям брой великденски украси. Продуктите на Весаче се намират в цяла България, а част от тях са за износ — качество на достъпна цена.",
    logo: "/images/brands/vesache.png",
    wash: "#ffd0bf",
    ink: "#e4572e",
  },
  {
    id: "ino",
    name: "Ино",
    since: "Kids",
    tag: "За деца",
    text: "Ино е детската линия: комплекти с герои, роботи, галактика и неон. Боя и декорация в една кутия — за игра у дома и силен рафт в магазина.",
    logo: "/images/brands/ino.png",
    wash: "#cfeab8",
    ink: "#3d7a32",
  },
  {
    id: "pet",
    name: "Пет",
    since: "PET",
    tag: "Бои и аксесоари",
    text: "Пет е марката за бои, капсули, бандероли и украси. Същите цветове и комплекти, с които Весаче е позната като производител на боя за яйца и аксесоари.",
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

const fans = [
  "sm:absolute sm:left-[2%] sm:top-0 sm:z-[2] sm:w-[46%] sm:-rotate-3",
  "sm:absolute sm:right-[6%] sm:top-[2%] sm:z-[2] sm:w-[44%] sm:rotate-[4deg]",
  "sm:absolute sm:bottom-0 sm:left-[10%] sm:z-[1] sm:w-[44%] sm:rotate-2",
  "sm:absolute sm:bottom-[1%] sm:right-[3%] sm:z-[1] sm:w-[42%] sm:-rotate-3",
];

const orderedBrands = [
  brands.find((brand) => brand.id === "metma")!,
  ...brands.filter((brand) => brand.id !== "metma"),
];

function cardName(name: string, id: string) {
  const code = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    name
      .replace(new RegExp(`\\s*[–—-]?\\s*\\(?${code}\\)?\\s*$`, "i"), "")
      .replace(/\s*[–—-]?\s*\([A-Za-zА-Яа-я0-9-]+\)\s*$/u, "")
      .replace(/\s*[–—-]\s*$/, "")
      .trim() || name
  );
}

export function HomeBrands({ products }: { products: HomeBrandProduct[] }) {
  const locale = useLocale();
  const copy = getMessages(locale);
  const brandsCopy = getStatic(locale).brands;
  const [activeId, setActiveId] = useState("metma");
  const active = orderedBrands.find((brand) => brand.id === activeId) ?? orderedBrands[0];
  const activeProducts: BrandProduct[] = products
    .filter((product) => product.brand === active.id)
    .slice(0, 4)
    .map((product) => ({
      name: cardName(product.name, product.id),
      code: product.slug,
      image: product.image,
      href: localePath(locale, `/produkti/${product.slug}`),
    }));

  return (
    <section
      className="relative py-12 transition-colors duration-700 sm:py-16 md:py-20"
      style={{ background: active.wash }}
    >
      <EggIcon
        fill="var(--metma-rose)"
        pattern="dots"
        className="egg-wobble pointer-events-none absolute left-6 top-10 hidden h-14 w-10 opacity-30 md:block"
      />
      <EggIcon
        fill="var(--metma-butter)"
        pattern="zigzag"
        className="egg-wobble pointer-events-none absolute right-10 top-24 hidden h-16 w-12 opacity-40 md:block"
      />

      <div className="container-metma relative z-[1]">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="eyebrow" style={{ color: active.ink }}>
              {copy.home.brandsEyebrow}
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
              {copy.home.brandsTitle}
            </h2>
          </div>
          <div className="flex w-full items-end justify-between gap-2 sm:w-auto sm:justify-end sm:gap-5">
            {orderedBrands.map((brand) => {
              const selected = brand.id === active.id;
              const main = brand.id === "metma";
              return (
                <div key={brand.id} className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={main ? brandsCopy.mainAria : brand.name}
                    onClick={() => setActiveId(brand.id)}
                    className={`relative overflow-hidden rounded-full bg-white shadow-sm transition duration-300 ${
                      main
                        ? "h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24"
                        : "h-16 w-16 sm:h-20 sm:w-20"
                    }`}
                    style={{
                      outline: selected ? `3px solid ${brand.ink}` : "3px solid transparent",
                      outlineOffset: 4,
                      transform: selected ? "scale(1.06)" : undefined,
                    }}
                  >
                    <Image
                      src={brand.logo}
                      alt=""
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </button>
                  <span
                    className="max-w-[5.5rem] text-center text-[0.68rem] font-bold uppercase leading-tight tracking-[0.06em] sm:max-w-none sm:text-xs sm:tracking-[0.12em]"
                    style={{ color: main || selected ? brand.ink : "rgba(23,23,23,0.45)" }}
                  >
                    {main ? brandsCopy.main : brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          key={active.id}
          className="brand-reveal mt-8 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6"
        >
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative mx-auto h-28 w-64 sm:h-36 sm:w-80 lg:mx-0">
              <Image
                src={active.logo}
                alt={active.name}
                fill
                className="object-contain object-center lg:object-left"
                sizes="320px"
              />
            </div>
            <p
              className="mt-4 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: active.ink }}
            >
              {active.since} · {brandsCopy[active.id as "vesache" | "ino" | "pet" | "metma"].tag}
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--metma-ink)]/80 sm:text-base sm:leading-8 lg:mx-0">
              {brandsCopy[active.id as "vesache" | "ino" | "pet" | "metma"].text}
            </p>
            <Link href={localePath(locale, `/marki/${active.id}`)} className="btn-metma mt-6 inline-flex" style={{ background: active.ink }}>
              {copy.home.brandsCta}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:relative sm:block sm:aspect-square sm:w-full">
            {activeProducts.map((product, index) => {
              const card = (
                <>
                  <span className="relative block aspect-square bg-[var(--metma-paper)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-3"
                      sizes="(min-width: 640px) 240px, 45vw"
                      unoptimized={product.image.endsWith(".png")}
                    />
                  </span>
                  <span className="block bg-white px-3 py-2.5 text-center text-[0.7rem] font-bold uppercase leading-snug tracking-wide text-[var(--metma-ink)] sm:text-left sm:text-xs">
                    {product.name}
                  </span>
                </>
              );
              const frame = `brand-pop flex h-full flex-col bg-white shadow-[0_18px_40px_-24px_rgba(23,23,23,0.45)]`;
              const style = { animationDelay: `${index * 70}ms` };
              return (
                <div key={product.code} className={fans[index] ?? fans[0]}>
                  <Link href={product.href} className={frame} style={style}>
                    {card}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
