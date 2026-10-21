import Image from "next/image";
import Link from "next/link";
import { companies, type CatalogCategory } from "@/lib/types";

const dyes = ["#e23b3b", "#f08a24", "#f2c31a", "#3dae4a", "#2f6fe0", "#7a4bb8", "#e45b9a"];

const nav = [
  { label: "Начало", href: "/" },
  { label: "Продукти", href: "/produkti" },
  { label: "За нас", href: "/za-nas" },
  { label: "Контакти", href: "/kontakti" },
];

export function Footer({ categories }: { categories: CatalogCategory[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1b2430] text-white">
      <div className="flex h-1.5" aria-hidden>
        {dyes.map((color) => (
          <span key={color} className="flex-1" style={{ background: color }} />
        ))}
      </div>

      <div className="container-metma py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="relative block h-9 w-9">
                <Image src="/images/logo.png" alt="" fill className="object-contain" sizes="36px" />
              </span>
              <span className="font-display text-xl font-bold tracking-wide">ВЕСАЧЕ</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">Боя за яйца и великденски украси от 1992 г.</p>
            <div className="mt-6 space-y-1 text-sm">
              <a href="tel:+35934443888" className="block text-lg font-semibold tracking-[-0.02em] hover:text-white/80">
                034 44 38 88
              </a>
              <a href="mailto:vessache@gmail.com" className="block text-white/75 hover:text-white">
                vessache@gmail.com
              </a>
              <p className="pt-2 leading-6 text-white/55">
                ВЕСАЧЕ ЕАД
                <br />
                бул. Ген. Гурко №6, ет. 3
                <br />
                4400 Пазарджик
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-8 lg:grid-cols-8 lg:gap-x-10">
          <nav aria-label="Навигация" className="lg:col-span-2">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45">Навигация</p>
            <ul className="mt-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex py-1.5 text-sm text-white/80 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Асортимент" className="lg:col-span-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45">Асортимент</p>
            <ul className="mt-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/produkti?kategoriya=${category.slug}`} className="inline-flex py-1.5 text-sm text-white/80 hover:text-white">
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Марки" className="col-span-2 lg:col-span-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45">Марки</p>
            <ul className="mt-3 grid grid-cols-2 lg:grid-cols-1">
              {companies.map((company) => (
                <li key={company.id}>
                  <Link href={`/produkti?firma=${company.id}`} className="inline-flex items-center gap-2.5 py-1.5 text-sm text-white/80 hover:text-white">
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: company.ink }} />
                    {company.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Весаче ЕАД</p>
          <p>Пазарджик · от 1992</p>
        </div>
      </div>
    </footer>
  );
}
