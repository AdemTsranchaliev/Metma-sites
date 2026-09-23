import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { formatBlogDate, getBlogPosts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Blog – METMA Ltd. – Eierfarbe",
  description:
    "Geschichten, Traditionen und Inspiration rund um Ostern und Eierfarben von METMA.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageIntro
        eyebrow="Journal"
        title="Blog"
        subtitle="Ostern, Farbe und Tradition — kurze Geschichten von METMA."
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
                  quality={80}
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 100vw, 580px"
                  unoptimized={featured.image.startsWith("http")}
                />
              </Link>

              <div className="relative flex flex-col justify-center border-t border-[var(--metma-line)] bg-[var(--metma-sand)] px-7 py-10 sm:px-10 lg:border-t-0 lg:border-l lg:px-12 lg:py-14">
                <span
                  aria-hidden
                  className="absolute left-0 top-8 hidden h-16 w-1 bg-[var(--metma-rose)] lg:block"
                />
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                  <span className="text-[var(--metma-rose)]">
                    {featured.category}
                  </span>
                  <span aria-hidden>·</span>
                  <time dateTime={featured.date}>
                    {formatBlogDate(featured.date)}
                  </time>
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.65rem,2.8vw,2.35rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[var(--metma-ink)]">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="transition hover:text-[var(--metma-rose)]"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--metma-mute)] md:text-base md:leading-8">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="btn-metma mt-8 self-start"
                >
                  Artikel lesen
                </Link>
              </div>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-14 md:mt-16">
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--metma-line)] pb-4">
                <h2 className="font-display text-lg font-bold tracking-tight text-[var(--metma-ink)] md:text-xl">
                  Weitere Artikel
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
                  {rest.length} {rest.length === 1 ? "Beitrag" : "Beiträge"}
                </p>
              </div>

              <div
                className={`grid gap-x-8 gap-y-10 ${
                  rest.length === 1 ? "mx-auto max-w-lg" : "sm:grid-cols-2"
                }`}
              >
                {rest.map((post, index) => (
                  <article key={post.slug} className="group flex flex-col">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[5/3] overflow-hidden bg-[var(--metma-sand)]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          quality={75}
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width:768px) 100vw, 400px"
                          unoptimized={post.image.startsWith("http")}
                        />
                        <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--metma-ink)]">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col pt-4">
                      <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
                        <span className="text-[var(--metma-rose)]">
                          {post.category}
                        </span>
                        <span aria-hidden>·</span>
                        <time dateTime={post.date}>
                          {formatBlogDate(post.date)}
                        </time>
                      </div>
                      <h3 className="mt-2.5 font-display text-[1.2rem] font-bold leading-snug tracking-tight text-[var(--metma-ink)] md:text-[1.3rem]">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition hover:text-[var(--metma-rose)]"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2.5 flex-1 text-sm leading-7 text-[var(--metma-mute)]">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-4 inline-flex text-sm font-semibold text-[var(--metma-ink)] underline-offset-4 transition hover:text-[var(--metma-rose)] hover:underline"
                      >
                        Weiterlesen →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
