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
        scatter={false}
      />
      <section className="bg-[#fff8f4] py-10 md:py-14">
        <div className="container-metma">
          {featured ? (
            <article className="overflow-hidden rounded-[1.6rem] bg-white md:grid md:grid-cols-2">
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative block aspect-[4/3] bg-[var(--metma-sand)] md:aspect-auto md:min-h-[22rem]"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 100vw, 560px"
                />
              </Link>
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 md:py-12">
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#5c6b7a]">
                  <span className="text-[var(--metma-rose)]">{featured.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
                </div>
                <h2 className="mt-3 font-display text-[clamp(1.55rem,2.6vw,2.15rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#2f3b4c]">
                  <Link href={`/blog/${featured.slug}`} className="transition hover:text-[var(--metma-rose)]">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-[#5c6b7a]">
                  {featured.excerpt}
                </p>
                <Link href={`/blog/${featured.slug}`} className="btn-metma mt-7 self-start">
                  Прочети
                </Link>
              </div>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-[1.4rem] bg-white"
                  >
                    <span className="relative block aspect-square">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: post.imagePosition ?? "center" }}
                        sizes="(max-width:640px) 100vw, 50vw"
                      />
                    </span>
                    <span className="block px-5 py-5">
                      <span className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#5c6b7a]">
                        <span className="text-[var(--metma-rose)]">{post.category}</span>
                        <span aria-hidden>·</span>
                        <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                      </span>
                      <span className="mt-2 block font-display text-xl font-bold leading-snug text-[#2f3b4c] transition group-hover:text-[var(--metma-rose)]">
                        {post.title}
                      </span>
                      <span className="mt-2 line-clamp-2 block text-sm leading-6 text-[#5c6b7a]">
                        {post.excerpt}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </>
  );
}
