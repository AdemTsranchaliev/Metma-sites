import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { IconArrow } from "@/components/icons";
import { MechanismLift } from "@/components/MechanismLift";
import { ProductCard } from "@/components/ProductCard";
import { posts } from "@/data/blog";
import { faqs } from "@/data/faq";
import {
  categories,
  featuredProducts,
  getProduct,
  products,
  productCountLabel,
  productsByCategory,
} from "@/data/products";

const steps = [
  { n: "1", title: "Запитване", text: "Телефон, имейл или формата." },
  { n: "2", title: "Наличност", text: "Потвърждава се за серийните модели." },
  { n: "3", title: "Поръчка", text: "От склада или по заявка." },
];

function SectionTitle({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <span className="mt-3 block h-1 w-14 rounded-full bg-brand" />
      </div>
      {href && linkLabel ? (
        <Link href={href} className="inline-flex items-center gap-1.5 text-sm hover:text-brand">
          {linkLabel}
          <IconArrow className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

export default function Home() {
  const featured = featuredProducts().slice(0, 4);
  const hero = getProduct("mehanizam-za-povdigane-na-matrak-45-za-amortisor");

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-16">
        <div>
          <h1 className="display text-[clamp(3rem,6vw,5.2rem)]">
            Механизми
            <br />
            за мека мебел
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-muted">
            Серийно производство в Пазарджик. На склад и по заявка.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kontakti" className="btn gap-2">
              Запитване
              <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/produkti" className="btn-quiet">
              Каталог
            </Link>
          </div>
          <div className="mt-8 w-full max-w-44">
            <MechanismLift />
          </div>
        </div>
        {hero ? (
          <Link
            href={`/produkti/${hero.slug}`}
            aria-label={hero.title}
            className="group relative block aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-mist"
          >
            <Image
              src={hero.images[0]}
              alt={hero.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8 transition duration-700 group-hover:scale-[1.03]"
            />
          </Link>
        ) : null}
      </section>

      <div className="border-y border-line bg-foam">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4 sm:px-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/produkti?kategoria=${category.id}`}
              className="shrink-0 rounded-full border border-line bg-paper px-4 py-2 text-sm transition hover:border-brand hover:text-brand"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/produkti"
            className="shrink-0 rounded-full bg-brand px-4 py-2 text-sm text-white transition hover:bg-brand-deep"
          >
            Всички
          </Link>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Серийно производство
          <span className="mt-4 block h-1 w-14 rounded-full bg-brand" />
        </h2>
        <p className="text-lg leading-8 text-muted">
          Механизми, модули и детайли за мека мебел. Постоянни наличности за серийните модели и
          индивидуални поръчки.
        </p>
      </section>

      <section className="bg-mist/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionTitle title="Каталог" href="/produkti" linkLabel={`${products.length} продукта`} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const sample = productsByCategory(category.id)[0];
              return (
                <Link
                  key={category.id}
                  href={`/produkti?kategoria=${category.id}`}
                  className="group overflow-hidden rounded-2xl border border-line bg-foam"
                >
                  <span className="relative block aspect-[4/3] bg-mist">
                    {sample ? (
                      <Image
                        src={sample.images[0]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className={`transition duration-700 group-hover:scale-[1.04] ${
                          category.id === "displays" ? "object-cover" : "object-contain p-8"
                        }`}
                      />
                    ) : null}
                  </span>
                  <span className="flex items-center justify-between gap-3 px-4 py-4">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted">
                      {productCountLabel(productsByCategory(category.id).length)}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionTitle title="Как се поръчва" href="/kontakti" linkLabel="Запитване" />
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="rounded-2xl border border-line bg-foam px-6 py-6">
              <p className="display text-3xl text-brand">{step.n}</p>
              <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {featured.length > 0 ? (
        <section className="border-y border-line bg-foam">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <SectionTitle title="Последно в каталога" href="/produkti" linkLabel="Всички" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <div className="mx-auto grid max-w-6xl gap-16 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionTitle title="Въпроси" href="/za-nas#vaprosi" linkLabel="Всички" />
            <div className="mt-6">
              <FaqList items={faqs.slice(0, 4)} />
            </div>
          </div>
          <div>
            <SectionTitle title="Блог" href="/blog" linkLabel="Всички" />
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 py-4">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="64px"
                        className={post.cover ? "object-cover" : "object-contain p-1.5"}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium group-hover:text-brand">{post.title}</span>
                      <span className="mt-0.5 block truncate text-sm text-muted">{post.excerpt}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
