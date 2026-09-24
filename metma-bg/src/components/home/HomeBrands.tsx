"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EggIcon } from "@/components/easter/EasterMotifs";

type BrandProduct = {
  name: string;
  code: string;
  image: string;
  href?: string;
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
  products: BrandProduct[];
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
    products: [
      {
        name: "Боя 8 капсули",
        code: "P132",
        image: "/images/brands/vesache-p132.png",
        href: "/produkti/vesache-p132",
      },
      {
        name: "Седефена писалка",
        code: "P112",
        image: "/images/brands/vesache-p112.png",
        href: "/produkti/vesache-p112",
      },
      {
        name: "Дървено яйце",
        code: "Весаче",
        image: "/images/brands/vesache-egg.jpg",
        href: "/produkti/vesache-darveno-yaytse",
      },
      {
        name: "Декоративни стикери",
        code: "Микс",
        image: "/images/brands/vesache-stickers.png",
        href: "/produkti/vesache-stikeri",
      },
    ],
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
    products: [
      {
        name: "Комплект Неон",
        code: "P135",
        image: "/images/brands/ino-p135.png",
        href: "/produkti/ino-p135",
      },
      {
        name: "Комплект Робо",
        code: "P134",
        image: "/images/brands/ino-p134.png",
        href: "/produkti/ino-p134",
      },
      {
        name: "Великденска галактика",
        code: "P133",
        image: "/images/brands/ino-p133.png",
        href: "/produkti/ino-p133",
      },
      {
        name: "Великденски герои",
        code: "P130",
        image: "/images/brands/ino-p130.png",
        href: "/produkti/ino-p130",
      },
    ],
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
    products: [
      {
        name: "Бисерни капсули",
        code: "6 цвята",
        image: "/images/brands/pet-biserna.png",
        href: "/produkti/pet-biserni-kapsuli",
      },
      {
        name: "Неон капсули",
        code: "P131",
        image: "/images/brands/pet-p131.png",
        href: "/produkti/pet-p131",
      },
      {
        name: "Бандероли Фаберже",
        code: "P127",
        image: "/images/brands/pet-p127.png",
        href: "/produkti/pet-p127",
      },
      {
        name: "Комплект Пет",
        code: "P126",
        image: "/images/brands/pet-p126.png",
        href: "/produkti/pet-p126",
      },
    ],
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
    products: [
      {
        name: "Блестящи яйца",
        code: "B638",
        image: "/images/products/B-638-A-Box-METMA-Shiny-eggs-5col.png",
        href: "/produkti/b638",
      },
      {
        name: "Комплект Савана",
        code: "B637",
        image: "/images/products/B-637-A-Metma-Savannah-r-r-125x180-sht-07435-BG-EN.png",
        href: "/produkti/b637",
      },
      {
        name: "Великденски шейкър",
        code: "B636",
        image: "/images/products/B-636-A-METMA-The-Eggshaker-BG-EN.png",
        href: "/produkti/b636",
      },
      {
        name: "8 цвята капсули",
        code: "B612",
        image: "/images/products/METMA-Kutia-maika-za-8br-kapsuli-B612.png",
        href: "/produkti/b612",
      },
    ],
  },
];

const fans = [
  "left-0 top-[4%] z-[1] w-[42%] -rotate-6",
  "right-0 top-0 z-[2] w-[42%] rotate-6",
  "left-[24%] top-[24%] z-[3] w-[44%]",
  "left-[16%] bottom-[2%] z-[4] w-[40%] rotate-2",
];

const orderedBrands = [
  brands.find((brand) => brand.id === "metma")!,
  ...brands.filter((brand) => brand.id !== "metma"),
];

export function HomeBrands() {
  const [activeId, setActiveId] = useState("metma");
  const active = orderedBrands.find((brand) => brand.id === activeId) ?? orderedBrands[0];

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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow" style={{ color: active.ink }}>
              METMA е основната
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
              Нашите марки
            </h2>
          </div>
          <div className="flex items-end gap-3">
            {orderedBrands.map((brand) => {
              const selected = brand.id === active.id;
              const main = brand.id === "metma";
              return (
                <div key={brand.id} className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={main ? "METMA, основната марка" : brand.name}
                    onClick={() => setActiveId(brand.id)}
                    className={`relative overflow-hidden rounded-full bg-white shadow-sm transition duration-300 ${
                      main ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" : "h-14 w-14 sm:h-16 sm:w-16"
                    }`}
                    style={{
                      outline: selected ? `3px solid ${brand.ink}` : "3px solid transparent",
                      outlineOffset: 3,
                      transform: selected ? "scale(1.06)" : undefined,
                    }}
                  >
                    <Image
                      src={brand.logo}
                      alt=""
                      fill
                      className="object-contain p-1.5"
                      sizes="72px"
                    />
                  </button>
                  <span
                    className="text-[0.62rem] font-bold uppercase tracking-[0.12em]"
                    style={{ color: main || selected ? brand.ink : "rgba(23,23,23,0.45)" }}
                  >
                    {main ? "Основна" : brand.name}
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
          <div>
            <div className="relative h-28 w-64 sm:h-36 sm:w-80">
              <Image
                src={active.logo}
                alt={active.name}
                fill
                className="object-contain object-left"
                sizes="320px"
              />
            </div>
            <p
              className="mt-4 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: active.ink }}
            >
              {active.since} · {active.tag}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--metma-ink)]/80 sm:text-base sm:leading-8">
              {active.text}
            </p>
            <Link href={`/marki/${active.id}`} className="btn-metma mt-6 inline-flex" style={{ background: active.ink }}>
              Страница на марката
            </Link>
          </div>

          <div className="relative mx-auto h-[28rem] w-full max-w-2xl sm:h-[32rem]">
            {active.products.map((product, index) => {
              const frame = (
                <span className="relative block h-full w-full bg-white shadow-[0_18px_40px_-24px_rgba(23,23,23,0.45)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3"
                    sizes="280px"
                    unoptimized={product.image.endsWith(".png")}
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-[var(--metma-ink)]">
                    {product.name}
                  </span>
                </span>
              );
              const className = `brand-pop absolute aspect-square ${fans[index] ?? fans[0]}`;
              const style = { animationDelay: `${index * 80}ms` };
              return product.href ? (
                <Link key={product.code} href={product.href} className={className} style={style}>
                  {frame}
                </Link>
              ) : (
                <div key={product.code} className={className} style={style}>
                  {frame}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
