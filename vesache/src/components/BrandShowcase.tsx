"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EggIcon } from "@/components/Motifs";
import { optimizeMediaUrl } from "@/lib/media";
import type { BrandId } from "@/lib/types";

export type ShowcaseBrand = {
  id: BrandId;
  name: string;
  since: string;
  tag: string;
  text: string;
  logo: string;
  wash: string;
  ink: string;
  count: number;
  products: { id: string; name: string; slug: string; image: string }[];
};

const fans = [
  "sm:absolute sm:left-[2%] sm:top-0 sm:z-[2] sm:w-[46%] sm:-rotate-3",
  "sm:absolute sm:right-[4%] sm:top-[4%] sm:z-[2] sm:w-[44%] sm:rotate-[5deg]",
  "sm:absolute sm:bottom-[2%] sm:left-[8%] sm:z-[1] sm:w-[44%] sm:rotate-2",
  "sm:absolute sm:bottom-0 sm:right-[2%] sm:z-[3] sm:w-[42%] sm:-rotate-2",
];

function shortName(name: string) {
  return name.replace(/\s*[–—-]?\s*\([A-Za-zА-Яа-я0-9-]+\)\s*$/u, "").trim();
}

export function BrandShowcase({ brands }: { brands: ShowcaseBrand[] }) {
  const [activeId, setActiveId] = useState<BrandId>("vesache");
  const active = brands.find((brand) => brand.id === activeId) ?? brands[0];
  if (!active) return null;

  return (
    <section className="relative overflow-hidden py-8 transition-colors duration-700 sm:py-16 md:py-20" style={{ background: active.wash }}>
      <EggIcon fill="var(--metma-rose)" pattern="dots" className="egg-wobble pointer-events-none absolute left-6 top-10 hidden h-14 w-10 opacity-30 md:block" />
      <EggIcon fill="var(--metma-blue)" pattern="zigzag" className="egg-wobble pointer-events-none absolute right-10 top-24 hidden h-16 w-12 opacity-40 md:block" />
      <div className="container-metma relative z-[1]">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="eyebrow" style={{ color: active.ink }}>
              {active.tag}
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold tracking-[-0.03em]">Нашите марки</h2>
          </div>
          <div className="flex w-full items-end justify-between gap-2 sm:w-auto sm:justify-end sm:gap-5">
            {brands.map((brand) => {
              const selected = brand.id === active.id;
              const main = brand.id === "vesache";
              return (
                <button key={brand.id} type="button" aria-pressed={selected} onClick={() => setActiveId(brand.id)} className="flex flex-col items-center gap-2">
                  <span
                    className={`relative block overflow-hidden rounded-full bg-white shadow-sm transition duration-300 ${
                      main ? "h-16 w-16 sm:h-24 sm:w-24" : "h-14 w-14 sm:h-20 sm:w-20"
                    }`}
                    style={{
                      outline: selected ? `3px solid ${brand.ink}` : "3px solid transparent",
                      outlineOffset: 4,
                      transform: selected ? "scale(1.06)" : undefined,
                    }}
                  >
                    <Image src={brand.logo} alt="" fill className="object-contain p-2" sizes="96px" />
                  </span>
                  <span
                    className="max-w-[5.5rem] text-center text-[0.68rem] font-bold uppercase leading-tight tracking-[0.06em] sm:max-w-none sm:text-xs sm:tracking-[0.12em]"
                    style={{ color: selected ? brand.ink : "rgba(29,36,45,0.45)" }}
                  >
                    {brand.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div key={active.id} className="brand-reveal mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="text-center lg:text-left">
            <div className="relative mx-auto h-24 w-52 sm:h-32 sm:w-64 lg:mx-0">
              <Image src={active.logo} alt={active.name} fill className="object-contain object-center lg:object-left" sizes="256px" />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: active.ink }}>
              {active.since} · {active.tag}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--metma-ink)]/80 sm:text-base lg:mx-0">{active.text}</p>
            <p className="mt-3 text-sm font-semibold" style={{ color: active.ink }}>
              {active.count} продукта
            </p>
            <Link href={`/produkti?firma=${active.id}`} className="btn-metma mt-6 w-full sm:w-auto" style={{ background: active.ink }}>
              Виж {active.name}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:relative sm:block sm:aspect-square">
            {active.products.slice(0, 4).map((product, index) => (
              <div key={product.slug} className={fans[index] ?? fans[0]}>
                <Link
                  href={`/produkti/${product.slug}`}
                  className="brand-pop flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-24px_rgba(23,23,23,0.45)]"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="relative block aspect-square">
                    <Image src={optimizeMediaUrl(product.image, { width: 480, quality: "eco" })} alt={product.name} fill className="object-contain p-3" sizes="240px" unoptimized />
                  </span>
                  <span className="line-clamp-2 block px-3 py-2.5 text-center text-[0.68rem] font-bold uppercase leading-snug sm:text-left sm:text-[0.7rem]">
                    {shortName(product.name)}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
