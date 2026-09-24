import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrow } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { getPost, posts } from "@/data/blog";
import { getProduct } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Блог" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.products
    .map((item) => getProduct(item))
    .filter((item) => item !== undefined);
  const more = posts.filter((item) => item.slug !== post.slug);

  return (
    <article className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <Link href="/blog" className="text-sm text-muted hover:text-ink">
        Блог
      </Link>
      <p className="mt-8 text-sm text-muted">{post.dateLabel}</p>
      <h1 className="display mt-3 max-w-3xl border-b border-line pb-8 text-4xl sm:text-6xl">{post.title}</h1>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
          <Image
            src={post.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={post.cover ? "object-cover" : "object-contain p-8"}
          />
        </div>
        <div className="space-y-4 text-lg leading-8">
          <p className="text-muted">{post.excerpt}</p>
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <p className="mt-8">
        <Link href={post.categoryHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
          {post.categoryLabel}
          <IconArrow className="h-4 w-4" />
        </Link>
      </p>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-line pt-12">
          <h2 className="display text-4xl">От каталога</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      {more.length > 0 ? (
        <section className="mt-14 border-t border-line pt-10">
          <h2 className="text-sm font-medium text-muted">Още от блога</h2>
          <ul className="mt-4 space-y-3">
            {more.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="font-semibold hover:text-brand">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
