import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { blogPosts } from "@/data/blog";

const post = blogPosts[0];

export function HomeJournal() {
  if (!post) return null;

  return (
    <section className="bg-white py-14 sm:py-20 md:py-24">
      <div className="container-metma overflow-hidden lg:grid lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[16/11] bg-[var(--metma-sand)] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[400px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              quality={72}
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 560px"
            />
          </div>
        </Reveal>
        <Reveal
          delayMs={80}
          className="flex flex-col justify-center bg-[var(--metma-sand)] px-5 py-8 sm:px-10 sm:py-10 md:py-14 lg:px-12"
        >
          <p className="eyebrow text-[var(--metma-rose)]">Journal</p>
          <h2 className="mt-3 font-display text-[clamp(1.55rem,5.5vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--metma-ink)] sm:mt-4">
            {post.title}
          </h2>
          <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-[var(--metma-mute)] sm:mt-5 sm:text-base sm:leading-8">
            {post.excerpt}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="btn-metma mt-6 w-full self-start sm:mt-8 sm:w-auto"
          >
            Artikel lesen
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
