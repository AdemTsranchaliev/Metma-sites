import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { formatBlogDate, getBlogPosts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Блог",
  description: "Истории за Великден и боите за яйца на METMA.",
  path: "/blog",
});

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageIntro
        eyebrow="Журнал"
        title="Блог"
        subtitle="Великден, цвят и традиции — от METMA."
      />
      <section className="bg-white py-12 md:py-16">
        <div className="container-metma">
          {featured ? (
            <article className="overflow-hidden lg:grid lg:grid-cols-[1.05fr_0.95fr]">
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative block aspect-[16/10] bg-[var(--metma-sand)] lg:aspect-auto lg:min-h-[440px]"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 100vw, 580px"
                />
              </Link>
              <div className="relative flex flex-col justify-center bg-[var(--metma-sand)] px-7 py-10 sm:px-10 lg:px-12 lg:py-14">
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  <span className="text-[var(--metma-rose)]">{featured.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.65rem,2.8vw,2.35rem)] font-bold leading-[1.12] tracking-[-0.03em]">
                  <Link href={`/blog/${featured.slug}`} className="transition hover:text-[var(--metma-rose)]">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--metma-mute)]">
                  {featured.excerpt}
                </p>
                <Link href={`/blog/${featured.slug}`} className="btn-metma mt-8 self-start">
                  Прочети
                </Link>
              </div>
            </article>
          ) : null}

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block overflow-hidden bg-[var(--metma-sand)]">
                  <span className="relative block aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="50vw"
                    />
                  </span>
                  <span className="block px-5 py-5">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-rose)]">
                      {post.category}
                    </span>
                    <span className="mt-2 block font-display text-xl font-bold leading-snug text-[var(--metma-ink)]">
                      {post.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
