import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function HomeJournal() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-metma overflow-hidden lg:grid lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[5/4] bg-[var(--metma-sand)] lg:aspect-auto lg:min-h-[420px]">
            <Image
              src="/images/blog/easter.jpg"
              alt="History of the Easter holiday"
              fill
              quality={72}
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 560px"
            />
          </div>
        </Reveal>
        <Reveal
          delayMs={80}
          className="flex flex-col justify-center bg-[var(--metma-lilac)] px-7 py-10 sm:px-10 md:py-14 lg:px-12"
        >
          <p className="eyebrow text-[var(--metma-navy)]">Journal</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--metma-ink)]">
            History of the Easter holiday
          </h2>
          <p className="mt-5 max-w-md text-base leading-8 text-[var(--metma-mute)]">
            Kurze Geschichte, große Farbe — warum das Färben von Eiern bis heute
            Menschen verbindet.
          </p>
          <Link
            href="/blog/history-of-the-easter-holiday"
            className="btn-dark mt-8 self-start"
          >
            Artikel lesen
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
