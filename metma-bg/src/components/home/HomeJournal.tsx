import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getMessages } from "@/i18n/messages";
import { formatBlogDate, getBlogPosts } from "@/lib/catalog";
import { localePath, type Locale } from "@/lib/i18n";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export async function HomeJournal({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const copy = t.home;
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;
  const more = rest.slice(0, 3);
  if (!featured) return null;

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="container-metma">
        <Reveal className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">{t.nav.blog}</p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-bold tracking-[-0.03em] text-[#2f3b4c]">
              {copy.journal}
            </h2>
          </div>
          <Link href={localePath(locale, "/blog")} className="btn-outline shrink-0 self-start sm:self-auto">
            {copy.allPosts}
          </Link>
        </Reveal>

        <div className="grid items-stretch gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[#fff8f4] sm:flex-row">
              <Link
                href={localePath(locale, `/blog/${featured.slug}`)}
                className="group relative block aspect-[4/3] shrink-0 sm:aspect-auto sm:w-[48%]"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  quality={72}
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: featured.imagePosition ?? "center" }}
                  sizes="(max-width:640px) 100vw, 520px"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-6 sm:py-7">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#5c6b7a]">
                  <span className="text-[var(--metma-rose)]">{featured.category}</span>
                  <span aria-hidden> · </span>
                  <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.25rem,2vw,1.65rem)] font-bold leading-snug tracking-[-0.03em] text-[#2f3b4c]">
                  <Link href={localePath(locale, `/blog/${featured.slug}`)} className="transition hover:text-[var(--metma-rose)]">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5c6b7a]">{featured.excerpt}</p>
                <Link
                  href={localePath(locale, `/blog/${featured.slug}`)}
                  className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-[var(--metma-rose)]! transition hover:gap-3"
                >
                  {copy.read}
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          </Reveal>

          <ul className="grid gap-3">
            {more.map((post, index) => (
              <li key={post.slug}>
                <Reveal delayMs={index * 60} className="h-full">
                  <Link
                    href={localePath(locale, `/blog/${post.slug}`)}
                    className="group flex h-full items-center gap-3 overflow-hidden rounded-[1.25rem] bg-[#fff8f4] p-2.5 transition hover:bg-[#fff1ea] sm:gap-4 sm:p-3"
                  >
                    <span className="relative block aspect-[4/3] w-[5.5rem] shrink-0 overflow-hidden rounded-xl sm:w-28">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        quality={70}
                        className="object-cover transition duration-500 group-hover:scale-105"
                        style={{ objectPosition: post.imagePosition ?? "center" }}
                        sizes="112px"
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1">
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-rose)]">
                        {post.category}
                      </span>
                      <span className="mt-1 line-clamp-2 font-display text-[0.95rem] font-bold leading-snug text-[#2f3b4c] transition group-hover:text-[var(--metma-rose)] sm:text-base">
                        {post.title}
                      </span>
                      <time
                        dateTime={post.date}
                        className="mt-1 text-xs font-semibold text-[#5c6b7a]"
                      >
                        {formatBlogDate(post.date)}
                      </time>
                    </span>
                    <span className="mr-1 hidden text-[var(--metma-rose)] opacity-0 transition group-hover:opacity-100 sm:grid">
                      <ArrowIcon />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
