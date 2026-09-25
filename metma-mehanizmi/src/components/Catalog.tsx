"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  categories,
  isCategoryId,
  products,
  productsByCategory,
  type CategoryId,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function Catalog() {
  const router = useRouter();
  const kategoria = useSearchParams().get("kategoria");
  const initial = kategoria && isCategoryId(kategoria) ? kategoria : "all";
  const [active, setActive] = useState<CategoryId | "all">(initial);

  const visible = useMemo(
    () => (active === "all" ? products : productsByCategory(active)),
    [active],
  );

  function select(id: CategoryId | "all") {
    setActive(id);
    router.replace(id === "all" ? "/produkti" : `/produkti?kategoria=${id}`, {
      scroll: false,
    });
  }

  return (
    <div>
      <div className="flex gap-6 overflow-x-auto border-b border-line" role="tablist" aria-label="Категории">
        <FilterButton active={active === "all"} onClick={() => select("all")}>
          Всички · {products.length}
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            active={active === category.id}
            onClick={() => select(category.id)}
          >
            {category.name} · {productsByCategory(category.id).length}
          </FilterButton>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "продукт" : "продукта"}
      </p>
      <div className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 border-b-2 px-0.5 py-3 text-sm transition ${
        active ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
