"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { companies, type BrandId, type CatalogCategory, type Product } from "@/lib/types";

function isBrand(value: string | null): value is BrandId {
  return companies.some((item) => item.id === value);
}

export function ProductBrowser({ products, categories }: { products: Product[]; categories: CatalogCategory[] }) {
  const query = useSearchParams();
  const brand = isBrand(query.get("firma")) ? query.get("firma") : undefined;
  const category = categories.some((item) => item.slug === query.get("kategoriya")) ? query.get("kategoriya") ?? undefined : undefined;
  const visible = products.filter((item) => (brand ? item.brand === brand : true) && (category ? item.category === category : true));
  const active = companies.find((item) => item.id === brand);
  const categoryLabel = categories.find((item) => item.slug === category)?.label;

  return (
    <div className="bg-[var(--metma-wash)] transition-colors duration-700">
      <div className="container-metma flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between md:py-14">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2.6rem,12vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">{active?.name ?? "Продукти"}</h1>
          <p className="mt-3 max-w-sm text-sm text-[var(--metma-ink)]/65">
            {active ? `${active.since} · ${active.tag}` : categoryLabel ?? "Изберете марка или разгледайте целия асортимент."}
          </p>
        </div>
        <div className="-mx-1 flex items-end gap-3 overflow-x-auto px-1 pb-1">
          <Link
            href="/produkti"
            aria-label="Всички"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white px-1 text-center text-[0.62rem] font-bold uppercase leading-tight ring-1 ring-black/10 sm:h-14 sm:w-14"
            style={!brand ? { outline: "3px solid var(--metma-rose)", outlineOffset: 3 } : undefined}
          >
            Всички
          </Link>
          {companies.map((item) => (
            <Link key={item.id} href={`/produkti?firma=${item.id}`} aria-label={item.name} className="flex shrink-0 flex-col items-center gap-1">
              <span
                className="relative block h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-black/10 sm:h-14 sm:w-14"
                style={brand === item.id ? { outline: `3px solid ${item.ink}`, outlineOffset: 3 } : undefined}
              >
                <Image src={item.logo} alt="" fill className="object-contain p-1.5" sizes="56px" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-t-[1.75rem] bg-white pb-16 pt-6 shadow-[0_-20px_50px_-36px_rgba(29,36,45,0.35)] md:pt-8">
        <div className="container-metma">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <Filter
                key={item.slug}
                href={brand ? `/produkti?firma=${brand}&kategoriya=${item.slug}` : `/produkti?kategoriya=${item.slug}`}
                active={category === item.slug}
                label={item.label}
              />
            ))}
          </div>
          <ProductGrid products={visible} />
        </div>
      </div>
    </div>
  );
}

function Filter({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-xs font-semibold uppercase tracking-wide ${active ? "bg-[var(--metma-rose)] text-white" : "bg-[var(--metma-sand)] text-[var(--metma-ink)]"}`}
    >
      {label}
    </Link>
  );
}
