import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Блог",
  description: "Кратки бележки за механизмите, рамките и дървените дисплеи на МЕТМА.",
};

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <PageHead eyebrow="Бележки" title="Блог" lede="Три кратки текста от каталога." />

      {lead ? (
        <Link href={`/blog/${lead.slug}`} className="group mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mist">
            <Image
              src={lead.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`transition duration-700 group-hover:scale-[1.03] ${
                lead.cover ? "object-cover" : "object-contain p-8"
              }`}
            />
          </div>
          <div>
            <p className="text-sm text-muted">{lead.dateLabel}</p>
            <h2 className="display mt-3 text-4xl group-hover:text-brand sm:text-5xl">{lead.title}</h2>
            <p className="mt-4 max-w-md text-lg text-muted">{lead.excerpt}</p>
          </div>
        </Link>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-14 grid gap-8 border-t border-line pt-12 sm:grid-cols-2">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mist">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 50vw"
                  className={`transition duration-700 group-hover:scale-[1.03] ${
                    post.cover ? "object-cover" : "object-contain p-8"
                  }`}
                />
              </div>
              <p className="mt-4 text-sm text-muted">{post.dateLabel}</p>
              <h2 className="mt-1 text-2xl font-medium group-hover:text-brand">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
