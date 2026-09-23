"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/home";
import { CategoryFilters } from "@/components/CategoryFilters";
import { ProductGrid } from "@/components/ProductGrid";

type Props = {
  products: Product[];
  activeCategory?: string;
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
}: Props) {
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
      <div className="mb-8 border-b border-[var(--metma-line)] pb-8 md:mb-10 md:pb-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <label className="group relative w-full">
            <span className="sr-only">Produkte suchen</span>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-[1.15rem] w-[1.15rem] -translate-y-1/2 text-[var(--metma-mute)] transition group-focus-within:text-[var(--metma-rose)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name oder Art.-Nr. suchen"
              autoComplete="off"
              className="product-search w-full rounded-full border border-[var(--metma-line)] bg-[var(--metma-sand)] py-3.5 pl-11 pr-12 text-sm text-[var(--metma-ink)] outline-none transition placeholder:text-[var(--metma-mute)] focus:border-[var(--metma-rose)] focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--metma-rose)_18%,transparent)]"
            />
            {hasQuery ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Suche leeren"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--metma-mute)] transition hover:bg-[var(--metma-line)] hover:text-[var(--metma-ink)]"
              >
                ×
              </button>
            ) : null}
          </label>

          <CategoryFilters active={activeCategory} />

          <p className="text-xs font-medium tracking-wide text-[var(--metma-mute)]">
            {filtered.length}{" "}
            {filtered.length === 1 ? "Produkt" : "Produkte"}
            {hasQuery ? (
              <>
                {" "}
                · „{query.trim()}“
              </>
            ) : null}
          </p>
        </div>
      </div>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} animated={false} />
      ) : (
        <div className="px-6 py-16 text-center">
          <p className="font-display text-xl font-bold text-[var(--metma-ink)]">
            {products.length === 0
              ? "Noch keine Produkte"
              : "Keine Produkte gefunden"}
          </p>
          <p className="mt-2 text-sm text-[var(--metma-mute)]">
            {products.length === 0
              ? "Produkte aus dem Admin (Site: DE) erscheinen hier automatisch."
              : "Versuche einen anderen Suchbegriff."}
          </p>
          {hasQuery ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 text-sm font-semibold text-[var(--metma-rose)] underline-offset-4 hover:underline"
            >
              Suche leeren
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
