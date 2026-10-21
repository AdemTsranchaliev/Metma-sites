import Image from "next/image";
import Link from "next/link";
import { BrandShowcase, type ShowcaseBrand } from "@/components/BrandShowcase";
import { EasterCountdown } from "@/components/EasterCountdown";
import { EggIcon } from "@/components/Motifs";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategories, getProducts } from "@/lib/catalog";
import { optimizeMediaUrl } from "@/lib/media";
import { companies } from "@/lib/types";
import type { Product } from "@/lib/types";

const dyes = [
  ["#e23b3b", "Червена"],
  ["#f08a24", "Оранжева"],
  ["#f2c31a", "Жълта"],
  ["#3dae4a", "Зелена"],
  ["#2f6fe0", "Синя"],
  ["#7a4bb8", "Лилава"],
  ["#e45b9a", "Розова"],
] as const;

const story = [
  { year: "1992", dye: "#2e64b4", wash: "#dbe9fb", title: "Началото", text: "Основана е фирмата и започва търговската дейност." },
  { year: "1995", dye: "#c41212", wash: "#ffe0e0", title: "Боята", text: "Започва производството на боя за яйца и великденски украси." },
  { year: "днес", dye: "#1a7a34", wash: "#e4f6e6", title: "България и износ", text: "Продуктите се намират в цялата страна и част от тях пътуват навън." },
];

function cardName(name: string, id: string) {
  return name.replace(/\s*[–—-]?\s*\([A-Za-zА-Яа-я0-9-]+\)\s*$/u, "").trim();
}

function mixedPreview(products: Product[], limit = 8) {
  const buckets = companies.map((company) => {
    const own = products.filter((item) => item.brand === company.id);
    const featured = own.filter((item) => item.isFeatured);
    return featured.length > 0 ? featured : own;
  });
  const mixed: Product[] = [];
  const depth = Math.max(...buckets.map((bucket) => bucket.length), 0);
  for (let index = 0; index < depth && mixed.length < limit; index += 1) {
    for (const bucket of buckets) {
      const item = bucket[index];
      if (item && mixed.length < limit) mixed.push(item);
    }
  }
  return mixed;
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const brands: ShowcaseBrand[] = companies.map((company) => {
    const list = products.filter((item) => item.brand === company.id);
    return {
      ...company,
      count: list.length,
      products: list.slice(0, 4).map((item) => ({
        id: item.id,
        name: cardName(item.name, item.id),
        slug: item.slug,
        image: item.image,
      })),
    };
  });
  const collage = companies
    .map((company) => products.find((item) => item.brand === company.id))
    .filter((item): item is Product => Boolean(item));
  const tiles = categories.map((category, index) => ({
    ...category,
    wash: ["#fde8e8", "#fff3d6", "#e7f6ea", "#e7f0fb"][index % 4],
    product: products.find((item) => item.category === category.slug),
  }));
  const preview = mixedPreview(products);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#eef5fd]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -left-8 -top-6 h-36 w-36 rounded-full bg-[#e23b3b]/35 blur-3xl" />
          <span className="absolute right-0 top-8 h-32 w-32 rounded-full bg-[#f2c31a]/55 blur-3xl" />
          <span className="absolute bottom-6 left-1/4 h-28 w-28 rounded-full bg-[#3dae4a]/30 blur-3xl" />
          <span className="absolute -right-6 bottom-0 h-36 w-36 rounded-full bg-[#7a4bb8]/30 blur-3xl" />
          <EggIcon fill="#e23b3b" pattern="dots" className="absolute left-2 top-6 h-9 w-7 opacity-80 sm:left-4 sm:top-8 sm:h-12 sm:w-9" />
          <EggIcon fill="#7a4bb8" pattern="zigzag" className="absolute right-2 top-8 h-9 w-7 opacity-80 sm:right-6 sm:h-12 sm:w-9" />
          <EggIcon fill="#f2c31a" pattern="stripes" className="absolute bottom-4 left-3 hidden h-10 w-8 opacity-80 sm:block" />
        </div>
        <div className="container-metma relative grid items-center gap-8 py-8 sm:gap-12 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-16">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="eyebrow text-[0.62rem] text-[var(--metma-rose)] sm:text-[0.7rem]">Весаче · от 1992</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,6.4vw,4.1rem)] font-bold leading-[0.92] tracking-[-0.045em]">
              Боя за яйца
              <span className="mt-1 block text-[var(--metma-rose)]">и великденски украси</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--metma-ink)]/75 sm:text-base lg:mx-0">
              Четири марки в един магазин: Весаче, Пет, Ино и METMA. Бои, комплекти, украси и дисплеи за България и за износ.
            </p>
            <ul className="mt-5 flex items-center justify-center gap-2 lg:justify-start" aria-label="Цветове за яйца">
              {dyes.map(([color, name]) => (
                <li key={name}>
                  <span className="block h-6 w-6 rounded-full ring-2 ring-white sm:h-7 sm:w-7" style={{ background: color, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.08)" }} title={name} />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-7 grid w-full max-w-sm grid-cols-1 gap-3 sm:max-w-md sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:flex">
              <Link href="/produkti" className="btn-metma min-h-12 w-full px-6 lg:w-52">
                Към продуктите
              </Link>
              <Link href="/za-nas" className="btn-outline min-h-12 w-full px-6 lg:w-52">
                За нас
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[1.6rem] bg-white/80 p-3 shadow-[0_20px_50px_-32px_rgba(66,126,209,0.65)] ring-1 ring-white sm:gap-4 sm:p-4 lg:h-[30rem] lg:grid-cols-5 lg:grid-rows-6">
            {collage.map((product, index) => {
              const brand = companies.find((item) => item.id === product.brand);
              const lead = index === 0;
              return (
                <Link
                  key={product.slug}
                  href={`/produkti/${product.slug}`}
                  className={`hero-card relative overflow-hidden rounded-[1.25rem] bg-white shadow-[0_16px_36px_-24px_rgba(29,36,45,0.5)] ring-1 ring-black/[0.04] ${
                    lead ? "aspect-square lg:col-span-3 lg:row-span-6 lg:aspect-auto" : "aspect-square lg:col-span-2 lg:row-span-2 lg:aspect-auto"
                  }`}
                >
                  <Image
                    src={optimizeMediaUrl(product.image, lead ? { width: 960 } : { width: 480, quality: "eco" })}
                    alt={product.name}
                    fill
                    className={`object-contain ${lead ? "p-4 sm:p-8" : "p-3 sm:p-4"}`}
                    sizes={lead ? "480px" : "220px"}
                    unoptimized
                    priority={lead}
                  />
                  <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide shadow-sm sm:bottom-3 sm:left-3" style={{ color: brand?.ink }}>
                    {brand?.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex h-1.5" aria-hidden>
        {dyes.map(([color]) => (
          <span key={color} className="flex-1" style={{ background: color }} />
        ))}
      </div>
      <BrandShowcase brands={brands} />
      <EasterCountdown />

      <section className="border-y border-[var(--metma-line)] bg-white py-10 sm:py-16 md:py-20">
        <div className="container-metma">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-[var(--metma-rose)]">Весаче ЕАД</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.04em]">
                Оригиналната марка за боя за яйца
              </h2>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-[var(--metma-mute)]">
                Фирмата е основана през 1992 г. От 1995 г. произвежда боя за яйца и великденски украси. Продуктите се намират в цяла България, а част от тях са за износ.
              </p>
            </div>
            <Link href="/za-nas" className="btn-metma w-full shrink-0 sm:w-auto">
              Повече за нас
            </Link>
          </div>
          <ol className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {story.map((beat) => (
              <li key={beat.year} className="rounded-[1.4rem] px-5 py-5" style={{ background: beat.wash }}>
                <span className="flex items-center gap-3">
                  <EggIcon fill={beat.dye} pattern="dots" className="h-8 w-6 shrink-0" />
                  <span className="font-display text-2xl font-bold tracking-[-0.03em]" style={{ color: beat.dye }}>
                    {beat.year}
                  </span>
                </span>
                <span className="mt-4 block font-display text-lg font-bold text-[var(--metma-ink)]">{beat.title}</span>
                <span className="mt-1 block text-sm leading-6 text-[var(--metma-ink)]/70">{beat.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#f6f1ea] py-10 sm:py-20 md:py-24">
        <div className="container-metma">
          <div className="mb-7 sm:mb-10">
            <p className="eyebrow text-[var(--metma-rose)]">Магазин</p>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold tracking-[-0.03em] sm:mt-3">Нови продукти</h2>
          </div>
          <div className="mb-8 grid grid-cols-2 gap-3 md:mb-12 md:grid-cols-4 md:gap-4">
            {tiles.map((tile) => (
              <Link key={tile.slug} href={`/produkti?kategoriya=${tile.slug}`} className="group overflow-hidden rounded-[1.4rem] bg-white ring-1 ring-black/[0.05]">
                <span className="relative block aspect-[5/4]" style={{ background: tile.wash }}>
                  {tile.product ? (
                    <Image src={optimizeMediaUrl(tile.product.image, { width: 480, quality: "eco" })} alt="" fill className="object-contain p-4 transition duration-500 group-hover:scale-[1.04] sm:p-6" sizes="240px" unoptimized />
                  ) : null}
                </span>
                <span className="block px-4 py-3 text-sm font-bold text-[var(--metma-ink)]">{tile.label}</span>
              </Link>
            ))}
          </div>
          <ProductGrid products={preview} tile="white" />
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link href="/produkti" className="btn-metma w-full sm:w-auto">
              Още продукти
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--metma-rose)] py-12 text-white sm:py-16">
        <div className="container-metma grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
          <div>
            <p className="eyebrow text-white/80">Контакт</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(1.7rem,6.5vw,3rem)] font-bold leading-[1.06] tracking-[-0.03em]">Свържете се с нас сега.</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-white/80">Въпроси за асортимент, дисплеи или едра поръчка? Ще ви отговорим.</p>
            <div className="mt-6 flex items-center gap-3">
              {companies.map((company) => (
                <Link key={company.id} href={`/produkti?firma=${company.id}`} aria-label={company.name} className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-2 ring-white/40 sm:h-14 sm:w-14">
                  <Image src={company.logo} alt="" fill className="object-contain p-1.5" sizes="56px" />
                </Link>
              ))}
            </div>
            <Link href="/kontakti" className="btn-outline mt-8 w-full border-transparent text-[var(--metma-rose)] sm:w-auto">
              Изпратете съобщение
            </Link>
          </div>
          <div className="grid gap-6 rounded-[1.4rem] bg-white/10 px-5 py-5 sm:grid-cols-2 md:grid-cols-1 sm:px-6 sm:py-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Телефон</p>
              <a href="tel:+35934443888" className="mt-1.5 block text-xl font-semibold">
                034 44 38 88
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Имейл</p>
              <a href="mailto:vessache@gmail.com" className="mt-1.5 block text-base font-medium">
                vessache@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
