import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionScatter } from "@/components/easter/EasterScatter";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getBlogPosts,
} from "@/lib/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog – METMA Ltd. – Eierfarbe" };
  return {
    title: `${post.title} – METMA Ltd. – Eierfarbe`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const index = blogPosts.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? blogPosts[index - 1] : null;
  const next =
    index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : null;
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <section className="relative overflow-hidden border-b border-[var(--metma-line)] bg-[var(--metma-blue-soft)]">
        <SectionScatter variant="story" />
        <div className="container-metma relative z-[1] max-w-3xl py-10 md:py-12">
          <nav
            aria-label="Brotkrumen"
            className="flex flex-wrap items-center gap-2 text-sm text-[var(--metma-mute)]"
          >
            <Link
              href="/blog"
              className="transition hover:text-[var(--metma-rose)]"
            >
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--metma-ink)]">{post.category}</span>
          </nav>

          <header className="mt-6 md:mt-7">
            <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
              <span className="text-[var(--metma-rose)]">{post.category}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            </div>
            <h1 className="mt-4 font-display text-[clamp(1.85rem,4vw,2.85rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--metma-ink)]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-[var(--metma-mute)] md:text-base md:leading-8">
              {post.excerpt}
            </p>
          </header>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-metma -mt-0 max-w-4xl py-0 pt-8 md:pt-10">
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--metma-sand)] md:aspect-[2/1]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              quality={85}
              className="object-cover"
              sizes="(max-width:768px) 100vw, 920px"
              unoptimized={post.image.startsWith("http")}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="container-metma max-w-2xl">
          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p
                key={`${post.slug}-${i}`}
                className={
                  i === 0
                    ? "border-l-[3px] border-[var(--metma-rose)] pl-5 text-lg leading-9 text-[var(--metma-ink)] md:pl-6 md:text-[1.2rem] md:leading-[1.75]"
                    : "text-[1.02rem] leading-8 text-[var(--metma-ink)]/78"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {(prev || next) && (
            <nav
              aria-label="Weitere Artikel"
              className="mt-12 grid gap-4 border-t border-[var(--metma-line)] pt-8 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col gap-1 py-1 transition"
                >
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
                    ← Vorheriger
                  </span>
                  <span className="font-display text-base font-bold leading-snug text-[var(--metma-ink)] transition group-hover:text-[var(--metma-rose)]">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col gap-1 py-1 text-left sm:items-end sm:text-right"
                >
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
                    Nächster →
                  </span>
                  <span className="font-display text-base font-bold leading-snug text-[var(--metma-ink)] transition group-hover:text-[var(--metma-rose)]">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--metma-ink)] underline-offset-4 hover:text-[var(--metma-rose)] hover:underline"
            >
              Alle Artikel
            </Link>
            <Link href="/produkte" className="btn-outline">
              Zum Shop
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="relative overflow-hidden border-t border-[var(--metma-line)] bg-[var(--metma-sand)] py-12 md:py-14">
          <SectionScatter variant="story" />
          <div className="container-metma relative z-[1] max-w-4xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-[var(--metma-rose)]">Journal</p>
                <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-[var(--metma-ink)] md:text-2xl">
                  Mehr lesen
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-semibold text-[var(--metma-ink)] underline-offset-4 hover:text-[var(--metma-rose)] hover:underline sm:inline"
              >
                Zum Blog →
              </Link>
            </div>

            <div
              className={`mt-8 grid gap-6 md:gap-8 ${
                related.length === 1 ? "max-w-md" : "sm:grid-cols-2"
              }`}
            >
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group grid grid-cols-[110px_1fr] gap-4 sm:grid-cols-1 sm:gap-0"
                >
                  <div className="relative aspect-square overflow-hidden bg-white sm:aspect-[5/3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={70}
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 110px, 400px"
                      unoptimized={item.image.startsWith("http")}
                    />
                  </div>
                  <div className="flex flex-col justify-center sm:pt-4">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-rose)]">
                      {item.category}
                    </p>
                    <h3 className="mt-1.5 font-display text-base font-bold leading-snug tracking-tight text-[var(--metma-ink)] transition group-hover:text-[var(--metma-rose)] sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 hidden text-sm leading-6 text-[var(--metma-mute)] sm:line-clamp-2 sm:block">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative overflow-hidden bg-[var(--metma-peach)] py-10 md:py-11">
        {related.length === 0 ? <SectionScatter variant="contact" /> : null}
        <div className="container-metma relative z-[1] flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Sortiment</p>
            <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-[var(--metma-ink)] md:text-2xl">
              Farbe für dein Ostern entdecken
            </h2>
          </div>
          <Link href="/produkte" className="btn-metma">
            Produkte ansehen
          </Link>
        </div>
      </section>
    </article>
  );
}
