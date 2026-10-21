import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { InquiryForm } from "@/components/InquiryForm";
import { ProductionCapabilities } from "@/components/ProductionCapabilities";
import { contact } from "@/data/content";
import { getCategories, getProducts } from "@/lib/catalog";

export const dynamic = "force-static";

const tiles = [
  { slug: "classic", title: "Classic Kits", image: "/images/classic-kits.webp" },
  { slug: "children", title: "Children Kits", image: "/images/children-kits.webp" },
  { slug: "display", title: "Display", image: "/images/display-home.webp" },
  { slug: "decoration", title: "Egg Decoration", image: "/images/egg-decoration.webp" },
];

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts({ featuredOnly: true }), getCategories()]);

  return (
    <main>
      <section className="hero-wash">
        <div className="container-usa grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-flex rounded-full bg-[var(--usa-red)] px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase">
              Park Ridge, Illinois
            </p>
            <h1 className="font-display mt-5 text-5xl leading-[1.02] font-semibold text-[var(--usa-navy)] md:text-6xl">
              Easter egg dyes, made for the American table.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-[var(--usa-mute)]">
              Coloring kits, children sets, retail displays and decorations from METMA USA LTD.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-usa">
                Shop the kits
              </Link>
              <Link href="/about" className="btn-navy">
                Our story
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--usa-red)] via-[var(--usa-gold)] to-[var(--usa-sky)]" />
            <img
              src="/images/banner-1.webp"
              alt="Metma egg coloring kits"
              className="w-full rounded-[1.6rem] bg-white object-contain"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fff7f0]">
        <div className="container-usa relative pt-12 sm:pt-16">
          <p className="eyebrow text-center text-[var(--usa-red)]">What we do</p>
          <h2 className="font-display mt-2 text-center text-4xl text-[var(--usa-navy)]">Our products</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:mt-10 lg:grid-cols-4 lg:gap-x-6">
            {tiles.map((tile) => {
              const match = categories.find((item) => item.slug === tile.slug);
              return (
                <Link key={tile.slug} href={match?.href ?? `/products/${tile.slug}`} className="group flex flex-col items-center text-center">
                  <div className="flex h-32 w-full items-end justify-center sm:h-40 lg:h-44">
                    <img
                      src={tile.image}
                      alt=""
                      className="max-h-32 w-full object-contain drop-shadow-[0_12px_16px_rgba(28,25,23,0.14)] transition duration-300 group-hover:-translate-y-1.5 sm:max-h-40 lg:max-h-44"
                    />
                  </div>
                  <h3 className="font-display mt-3 text-xl leading-tight text-[var(--usa-ink)] sm:text-2xl">{tile.title}</h3>
                  <span className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-[var(--usa-navy)] shadow-sm transition group-hover:border-[var(--usa-red)] group-hover:bg-[var(--usa-red)] group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="pointer-events-none relative -mt-6 h-40 overflow-hidden sm:-mt-4 sm:h-52 lg:h-64" aria-hidden>
          <img src="/images/meadow-band.webp" alt="" className="absolute inset-x-0 bottom-0 h-full w-full object-cover object-bottom" />
        </div>
      </section>

      <section className="bg-[var(--usa-cream)] py-12 sm:py-16">
        <div className="container-usa">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[var(--usa-red)]">Catalog</p>
              <h2 className="font-display mt-3 text-4xl text-[var(--usa-navy)]">Featured kits</h2>
            </div>
            <Link href="/products" className="text-sm font-bold text-[var(--usa-navy)] hover:text-[var(--usa-red)]">
              All products
            </Link>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-usa grid items-center gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_40px_-24px_rgba(12,35,64,0.45)] ring-1 ring-black/5">
            <div className="color-bar" />
            <img src="/images/map.webp" alt="Metma history from 1989 to 2021" className="w-full" />
          </div>
          <div>
            <p className="eyebrow text-[var(--usa-red)]">Since 1989</p>
            <h2 className="font-display mt-3 text-4xl text-[var(--usa-navy)]">A family production, now in Illinois.</h2>
            <p className="mt-4 leading-7 text-[var(--usa-mute)]">
              Easter egg dyes and packaging, from a production that started in 1989.
            </p>
            <Link href="/about" className="btn-navy mt-6">
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <ProductionCapabilities />

      <section className="relative overflow-hidden bg-[var(--usa-navy)] py-16 text-white">
        <div className="color-bar absolute inset-x-0 top-0" />
        <div className="container-usa grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-[#f3c1c8]">Contact</p>
            <h2 className="font-display mt-3 text-4xl">Write to the Park Ridge office.</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">{contact.location}</p>
            <p className="mt-3">
              <a href={`mailto:${contact.email}`} className="font-semibold">
                {contact.email}
              </a>
            </p>
            <p className="mt-1">
              <a href={contact.phoneHref} className="font-semibold">
                {contact.phone}
              </a>
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white p-6 text-[var(--usa-ink)] shadow-[0_16px_40px_-24px_rgba(0,0,0,0.45)]">
            <div className="color-bar -mx-6 -mt-6 mb-5 rounded-t-3xl" />
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
