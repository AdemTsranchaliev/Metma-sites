import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogFacts, readingLabel } from "@/components/blog/BlogFacts";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { formatBlogDate, getBlogPostBySlug, getBlogPosts, readingMinutes } from "@/lib/catalog";
import { localeMeta, localePath, parseLocale } from "@/lib/i18n";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const copy = getMessages(locale).meta;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return pageMetadata({ title: copy.blogTitle, description: copy.blogDescription, path: "/blog", locale });
  }
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    locale,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const ui = getStatic(locale);
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const others = posts.filter((item) => item.slug !== slug);
  const copy = getMessages(locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: copy.nav.home, path: localePath(locale, "/") },
            { name: copy.nav.blog, path: localePath(locale, "/blog") },
            { name: post.title, path: localePath(locale, `/blog/${post.slug}`) },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path: localePath(locale, `/blog/${post.slug}`),
            image: post.image,
            datePublished: post.date,
            inLanguage: localeMeta[locale].htmlLang,
            body: post.content
              .map((block) => (block.type === "ul" ? block.items.join(" ") : block.text))
              .join("\n\n"),
          }),
        ]}
      />
      <PageIntro eyebrow={post.category} title={post.title}>
        <BlogFacts post={post} locale={locale} copy={ui.blog} />
      </PageIntro>
      <article className="bg-white py-12 md:py-16">
        <div className="container-metma max-w-3xl">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-[var(--metma-sand)]">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="768px" priority />
          </div>
          <div className="space-y-4 text-base leading-8 text-[var(--metma-mute)]">
            {post.content.map((block) => {
              if (block.type === "h2") {
                return (
                  <h2 key={block.text} className="font-display text-2xl font-bold text-[var(--metma-ink)]">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={block.items[0]} className="list-disc space-y-1 pl-5">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={block.text}>{block.text}</p>;
            })}
          </div>
        </div>
      </article>
      {others.length > 0 ? (
        <section className="border-t border-[var(--metma-line)] bg-[#fff8f4] py-12 md:py-16">
          <div className="container-metma">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#2f3b4c]">{ui.blog.more}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((item) => {
                const minutes = readingMinutes(item);
                return (
                <li key={item.slug}>
                  <Link
                    href={localePath(locale, `/blog/${item.slug}`)}
                    className="group block h-full overflow-hidden rounded-[1.4rem] bg-white"
                  >
                    <span className="relative block aspect-[4/3] bg-[var(--metma-sand)]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: item.imagePosition ?? "center" }}
                        sizes="(max-width:640px) 100vw, 25vw"
                      />
                    </span>
                    <span className="block px-4 py-4">
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-rose)]">
                        {item.category}
                      </span>
                      <span className="mt-2 block font-display text-lg font-bold leading-snug text-[#2f3b4c] transition group-hover:text-[var(--metma-rose)]">
                        {item.title}
                      </span>
                      <span className="mt-2 block text-xs font-semibold text-[#5c6b7a]">
                        <time dateTime={item.date}>{formatBlogDate(item.date, locale)}</time>
                        <span aria-hidden> · </span>
                        {readingLabel(minutes, ui.blog)}
                      </span>
                    </span>
                  </Link>
                </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
