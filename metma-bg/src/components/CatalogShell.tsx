"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { brands, isBrandId } from "@/data/brands";
import type { Product } from "@/data/home";
import { BrandSwitch } from "@/components/BrandSwitch";
import { ProductCatalog } from "@/components/ProductCatalog";

function BrandFromQuery({ onBrand }: { onBrand: (id: string) => void }) {
  const marka = useSearchParams().get("marka");

  useEffect(() => {
    onBrand(isBrandId(marka ?? undefined) ? marka! : "all");
  }, [marka, onBrand]);

  return null;
}

type Props = {
  products: Product[];
  activeCategory?: string;
  initialBrand?: string;
  title: string;
  subtitle: string;
};

export function CatalogShell({
  products,
  activeCategory = "alle",
  initialBrand = "all",
  title,
  subtitle,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [brand, setBrand] = useState(initialBrand);
  const active = brands.find((item) => item.id === brand);
  const wash = active?.wash ?? "#f4f1ec";

  useEffect(() => {
    const previous = document.body.style.background;
    document.body.style.background = wash;
    return () => {
      document.body.style.background = previous;
    };
  }, [wash]);

  function selectBrand(id: string) {
    setBrand(id);
    const next = id === "all" ? pathname : `${pathname}?marka=${id}`;
    router.replace(next, { scroll: false });
  }

  const shown = brand === "all" ? products : products.filter((product) => product.brand === brand);

  return (
    <div style={{ background: wash }} className="transition-colors duration-700">
      <Suspense fallback={null}>
        <BrandFromQuery onBrand={setBrand} />
      </Suspense>
      <div className="container-metma flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between md:py-14">
        <div key={brand} className="brand-reveal min-w-0">
          <h1 className="font-display text-[clamp(3.2rem,8vw,6rem)] font-bold leading-[0.86] tracking-[-0.05em] text-[var(--metma-ink)]">
            {active ? active.name : title}
          </h1>
          <p className="mt-3 max-w-sm text-sm text-[var(--metma-ink)]/65">
            {active ? `${active.since} · ${active.tag}` : subtitle}
          </p>
        </div>
        <BrandSwitch active={brand} onSelect={selectBrand} />
      </div>
      <div className="rounded-t-[1.75rem] bg-white pb-16 pt-6 md:pt-8">
        <div className="container-metma">
          <ProductCatalog
            products={shown}
            activeCategory={activeCategory}
            brand={brand}
            ink={active?.ink}
          />
        </div>
      </div>
    </div>
  );
}
