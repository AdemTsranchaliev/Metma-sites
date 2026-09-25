"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/home";
import { useLocale } from "@/components/LocaleProvider";
import { CategoryFilters } from "@/components/CategoryFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { getStatic } from "@/i18n/static";

type Props = {
  products: Product[];
  activeCategory?: string;
  brand?: string;
  ink?: string;
};

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden
    >
      <circle cx="11" cy="11" r="6.25" />
      <path d="M16.4 16.4L20.5 20.5" strokeLinecap="round" />
    </svg>
  );
}

export function ProductCatalog({
  products,
  activeCategory = "alle",
  brand = "all",
  ink,
}: Props) {
  const catalog = getStatic(useLocale()).catalog;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q),
    );
  }, [products, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div>
      <div className="sticky top-[4.25rem] z-20 -mx-1 mb-8 flex flex-col gap-4 bg-white/95 px-1 py-3 backdrop-blur-md md:mb-10 md:flex-row md:items-center md:justify-between">
        <CategoryFilters active={activeCategory} brand={brand} ink={ink} />
        <div className="flex items-center gap-4">
          <p className="shrink-0 text-xs text-[var(--metma-mute)]">
            {filtered.length}
          </p>
          <label className="group relative w-full md:w-52">
            <span className="sr-only">{catalog.search}</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--metma-mute)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={catalog.placeholder}
              autoComplete="off"
              className="product-search w-full rounded-full bg-[var(--metma-sand)] py-2.5 pl-9 pr-8 text-sm text-[var(--metma-ink)] outline-none transition placeholder:text-[var(--metma-mute)] focus:bg-white focus:shadow-[0_0_0_1px_var(--metma-line)]"
            />
            {hasQuery ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={catalog.clear}
                className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--metma-mute)]"
              >
                ×
              </button>
            ) : null}
          </label>
        </div>
      </div>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} animated={false} />
      ) : (
        <div className="px-6 py-16 text-center">
          <p className="font-display text-xl font-bold text-[var(--metma-ink)]">
            {products.length === 0 ? catalog.loading : catalog.empty}
          </p>
          <p className="mt-2 text-sm text-[var(--metma-mute)]">
            {products.length === 0 ? catalog.loadingHint : catalog.emptyHint}
          </p>
          {hasQuery ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 text-sm font-semibold text-[var(--metma-rose)] underline-offset-4 hover:underline"
            >
              {catalog.clear}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
