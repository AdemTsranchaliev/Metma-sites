import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { categories } from "@/data/products";
import { nav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <p className="display max-w-3xl text-[clamp(2.8rem,7vw,5.5rem)]">
          Механизми
          <br />
          за мека мебел
        </p>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-[16rem] text-sm leading-6 text-muted">
              Серийно производство в Пазарджик. На склад и по заявка.
            </p>
          </div>
          <div>
            <p className="eyebrow">Каталог</p>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/produkti?kategoria=${category.id}`}
                    className="text-sm hover:text-brand"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Фирма</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Контакт</p>
            <div className="mt-4 space-y-2 text-sm">
              <p>{siteConfig.addressLines[0]}</p>
              <p>{siteConfig.addressLines[1]}</p>
              <a className="mt-3 block hover:text-brand" href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </a>
              <a className="block hover:text-brand" href={siteConfig.mobileHref}>
                {siteConfig.mobile}
              </a>
              <a className="block hover:text-brand" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-xs tracking-wide text-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p>Пазарджик</p>
        </div>
      </div>
    </footer>
  );
}
