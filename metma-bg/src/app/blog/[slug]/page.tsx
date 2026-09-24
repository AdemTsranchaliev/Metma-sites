import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { formatBlogDate, getBlogPostBySlug, getBlogPosts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return pageMetadata({ title: "Блог", description: "Блог на METMA.", path: "/blog" });
  }
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageIntro eyebrow={post.category} title={post.title} subtitle={formatBlogDate(post.date)} />
      <article className="bg-white py-12 md:py-16">
        <div className="container-metma max-w-3xl">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-[var(--metma-sand)]">
            <Image src={post.image} alt="" fill className="object-cover" sizes="768px" priority />
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
    </>
  );
}
