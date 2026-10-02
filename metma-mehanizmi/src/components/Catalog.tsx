import type { ReactNode } from "react";
import Link from "next/link";
import {
  categories,
  products,
  productsByCategory,
  type CategoryId,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function Catalog({ active = "all" }: { active?: CategoryId | "all" }) {
  const visible = active === "all" ? products : productsByCategory(active);

  return (
    <div>
      <nav className="flex gap-6 overflow-x-auto border-b border-line" aria-label="Категории">
        <FilterLink href="/produkti" active={active === "all"}>
          Всички · {products.length}
        </FilterLink>
        {categories.map((category) => (
          <FilterLink
            key={category.id}
            href={`/produkti/kategoria/${category.id}`}
            active={active === category.id}
          >
            {category.name} · {productsByCategory(category.id).length}
          </FilterLink>
        ))}
      </nav>
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

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 border-b-2 px-0.5 py-3 text-sm transition ${
        active ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
