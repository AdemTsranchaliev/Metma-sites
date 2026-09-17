import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ScribbleUnderline, WaveBottom } from "@/components/home/DesignDetails";
import { products } from "@/data/home";

const featured = products.slice(0, 8);

export function HomeProducts() {
  return (
    <section className="relative bg-[var(--metma-paper)] pt-16 md:pt-20">
      <div className="container-metma">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--metma-orange)] md:text-4xl">
            Empfohlene Produkte
          </h2>
          <ScribbleUnderline />
        </Reveal>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {featured.map((product, index) => (
            <Reveal key={product.id} delayMs={index < 4 ? index * 55 : 0}>
              <Link href={`/produkte/${product.slug}`} className="group block">
                <div className="relative mb-3 aspect-square overflow-hidden bg-white transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    quality={70}
                    className="object-contain p-3 transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 45vw, 240px"
                  />
                </div>
                <h3 className="text-center text-sm font-medium leading-snug text-[var(--metma-ink)] group-hover:text-[var(--metma-orange)]">
                  {product.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="relative z-10 mt-12 pb-6 text-center md:mt-14 md:pb-8">
          <Link href="/produkte" className="btn-metma">
            Alle Produkte
          </Link>
        </div>
      </div>

      <WaveBottom fill="#ffffff" />
    </section>
  );
}
