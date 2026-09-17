import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ScribbleUnderline, WaveBottom } from "@/components/home/DesignDetails";

export function HomeJournal() {
  return (
    <section className="relative bg-white pt-8 md:pt-12">
      <div className="container-metma pb-14 md:pb-16">
        <Reveal className="mb-10 text-center md:mb-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--metma-orange)] md:text-4xl">
            Aus unserem Blog
          </h2>
          <ScribbleUnderline />
        </Reveal>

        <Reveal delayMs={80}>
          <article className="mx-auto max-w-3xl overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
            <Link
              href="/blog/history-of-the-easter-holiday"
              className="group block"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--metma-paper)]">
                <Image
                  src="/images/blog/easter.jpg"
                  alt="History of the Easter holiday"
                  fill
                  quality={70}
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width:768px) 100vw, 760px"
                />
              </div>
              <div className="border border-t-0 border-[var(--metma-line)] bg-white px-5 py-6 text-center">
                <h3 className="text-xl font-semibold text-[var(--metma-ink)] transition group-hover:text-[var(--metma-orange)] md:text-2xl">
                  History of the Easter holiday
                </h3>
                <p className="mt-2 text-sm text-[var(--metma-mute)]">
                  Tradition, Farbe und Freude rund um Ostern
                </p>
              </div>
            </Link>
          </article>
        </Reveal>
      </div>

      <WaveBottom fill="var(--metma-blue)" />
    </section>
  );
}
