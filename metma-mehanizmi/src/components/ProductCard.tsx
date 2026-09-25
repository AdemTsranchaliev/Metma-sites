import Image from "next/image";
import Link from "next/link";
import { getCategory, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <article className="group">
      <Link href={`/produkti/${product.slug}`} className="block overflow-hidden rounded-[1.25rem] border border-line bg-foam">
        <div className="relative aspect-[5/4] bg-mist">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={`transition duration-700 group-hover:scale-[1.04] ${
              product.category === "displays" ? "object-cover" : "object-contain p-6"
            }`}
          />
        </div>
        <div className="px-4 py-3.5">
          <p className="eyebrow">{category?.name}</p>
          <h3 className="mt-1.5 text-base font-medium leading-snug group-hover:text-brand">
            {product.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
