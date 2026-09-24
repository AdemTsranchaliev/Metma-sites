import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { getDeclarations } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Декларации",
  description:
    "Политики и декларации на Метма: социална отговорност, качество, околна среда и проекти.",
  path: "/deklaratsii",
});

export default async function DeclarationsPage() {
  const declarations = await getDeclarations();

  return (
    <>
      <PageIntro
        eyebrow="Документи"
        title="Декларации"
        subtitle="Политики на Метма ЕООД — социална отговорност, качество и околна среда."
      />
      <section className="bg-white py-12 md:py-16">
        <div className="container-metma space-y-16">
          {declarations.map((item) => (
            <article key={item.slug} id={item.slug} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--metma-rose)]">
                  {item.category}
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold leading-snug tracking-[-0.03em] text-[var(--metma-ink)]">
                  {item.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--metma-mute)] md:text-base">
                  {item.content.map((block) =>
                    block.type === "p" ? <p key={block.text}>{block.text}</p> : null,
                  )}
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--metma-sand)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 560px"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
