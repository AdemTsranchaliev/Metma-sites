import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { IconArrow } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { faqs } from "@/data/faq";
import { getProduct } from "@/data/products";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "За нас",
  description: "МЕТМА ООД, Пазарджик — механизми за мека мебел, серийно и по заявка.",
};

const points = [
  { n: "01", title: "Серийно", text: "На склад." },
  { n: "02", title: "Качество", text: "Специализирани машини." },
  { n: "03", title: "Мека мебел", text: "Основният фокус." },
  { n: "04", title: "По заявка", text: "Индивидуални поръчки." },
];

const photos = [
  getProduct("darven-displey-kendi"),
  getProduct("mehanizam-za-povdigane-na-matrak-45-za-amortisor"),
  getProduct("mehanizam-fotoyl-poli"),
].filter((item) => item !== undefined);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <PageHead
        eyebrow={`${siteConfig.legalName} · Пазарджик`}
        title="За нас"
        lede="Механизми, модули и детайли за мека мебел. Серийно производство, склад и поръчки по заявка."
      />

      <div className="mt-12 grid gap-3 lg:grid-cols-12">
        {photos[0] ? (
          <Link
            href={`/produkti/${photos[0].slug}`}
            aria-label={photos[0].title}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mist lg:col-span-7"
          >
            <Image
              src={photos[0].images[0]}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </Link>
        ) : null}
        <div className="grid gap-3 lg:col-span-5">
          {photos.slice(1).map((product) => (
            <Link
              key={product.slug}
              href={`/produkti/${product.slug}`}
              aria-label={product.title}
              className="group relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-mist"
            >
              <Image
                src={product.images[0]}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain p-6 transition duration-700 group-hover:scale-[1.03]"
              />
            </Link>
          ))}
        </div>
      </div>

      <ol className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => (
          <li
            key={point.n}
            className="border-b border-line py-6 pr-4 lg:border-r lg:border-b-0 lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
          >
            <p className="display text-sm text-brand">{point.n}</p>
            <h2 className="mt-2 font-medium">{point.title}</h2>
            <p className="mt-1 text-sm text-muted">{point.text}</p>
          </li>
        ))}
      </ol>

      <section id="vaprosi" className="mt-16 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-4xl">Въпроси</h2>
          <Link href="/kontakti" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            Запитване
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </section>
    </div>
  );
}
