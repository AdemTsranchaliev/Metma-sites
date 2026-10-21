import type { CatalogProduct } from "@/data/content";
import { ArrowIcon } from "./Icons";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const back = product.back ?? product.front;

  return (
    <article className="text-center">
      <div className="group mx-auto h-[410px] max-w-[346px] [perspective:1000px]">
        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div
            className="absolute inset-0 rounded-sm bg-white bg-contain bg-center bg-no-repeat shadow-sm [backface-visibility:hidden]"
            style={{ backgroundImage: `url(${product.front})` }}
          />
          <div
            className="absolute inset-0 rounded-sm bg-white bg-contain bg-center bg-no-repeat shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{ backgroundImage: `url(${back})` }}
          />
        </div>
      </div>
      <h3 className="mt-6 font-serif text-[28px] font-medium text-[#1e1e1e]">{product.name}</h3>
      <p className="mx-auto mt-3 max-w-md font-serif text-base leading-7 text-[#74766b]">
        {product.description}
      </p>
      {product.contents ? (
        <div className="mt-5">
          <p className="font-serif text-sm font-bold text-[#1e1e1e]">Contents :</p>
          <p className="mt-1 font-serif text-base text-[#74766b]">{product.contents}</p>
        </div>
      ) : null}
      {product.instructions ? (
        <a
          href={product.instructions}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-3 font-serif text-sm tracking-[1px] text-black uppercase"
        >
          Instructions
          <span className="inline-flex rounded-full border border-[#c5d0c5] p-3">
            <ArrowIcon />
          </span>
        </a>
      ) : null}
    </article>
  );
}
