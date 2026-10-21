"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StoreCategory, UsaProduct } from "@/lib/catalog";
import { toneFor } from "@/lib/tones";
import { ProductGrid } from "./ProductGrid";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16.4 16.4 20.5 20.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ProductCatalog({
  products,
  categories,
  activeCategory = "",
  counts = {},
}: {
  products: UsaProduct[];
  categories: StoreCategory[];
  activeCategory?: string;
  counts?: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((product) =>
      [product.name, product.sku, product.shortDescription, product.category].join(" ").toLowerCase().includes(needle),
    );
  }, [products, query]);

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const hasQuery = query.trim().length > 0;

  return (
    <div>
      <div className="mb-6 rounded-2xl bg-white p-2.5 shadow-[0_14px_32px_-22px_rgba(12,35,64,0.45)] ring-1 ring-black/5 sm:p-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-2" aria-label="Categories">
            <Link
              href="/products"
              aria-current={activeCategory ? undefined : "page"}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
              style={
                activeCategory
                  ? { background: "white", color: "var(--usa-navy)", boxShadow: "inset 0 0 0 1px var(--usa-line)" }
                  : { background: "var(--usa-navy)", color: "white" }
              }
            >
              All
              {total > 0 ? <span className="text-xs font-bold opacity-70">{total}</span> : null}
            </Link>
            {categories.map((category) => {
              const tone = toneFor(category.slug);
              const on = activeCategory === category.slug;
              const count = counts[category.slug];
              return (
                <Link
                  key={category.slug}
                  href={category.href}
                  aria-current={on ? "page" : undefined}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
                  style={
                    on
                      ? { background: tone.chip, color: "white" }
                      : { background: tone.bg, color: tone.ink }
                  }
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: on ? "white" : tone.chip }} />
                  {category.label}
                  {typeof count === "number" ? <span className="text-xs font-bold opacity-70">{count}</span> : null}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <p className="shrink-0 text-sm text-[var(--usa-mute)]">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
            <div className="relative min-w-0 flex-1 lg:w-60">
              <label htmlFor="catalog-search" className="sr-only">
                Search products
              </label>
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[var(--usa-mute)]">
                <SearchIcon />
              </span>
              <input
                id="catalog-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search kits"
                className="w-full rounded-full bg-white py-2.5 pr-9 pl-9 text-sm text-[var(--usa-ink)] shadow-[inset_0_0_0_1px_var(--usa-line)] outline-none placeholder:text-[var(--usa-mute)] focus:shadow-[inset_0_0_0_1px_var(--usa-navy)]"
              />
              {hasQuery ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--usa-mute)] hover:bg-[var(--usa-sand)] hover:text-[var(--usa-navy)]"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="py-16 text-center">
          <p className="font-display text-2xl text-[var(--usa-navy)]">No products match that search.</p>
          {hasQuery ? (
            <button type="button" onClick={() => setQuery("")} className="mt-4 text-sm font-semibold text-[var(--usa-red)]">
              Clear search
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
