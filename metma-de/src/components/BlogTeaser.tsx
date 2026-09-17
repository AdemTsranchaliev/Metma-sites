import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function BlogTeaser() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-metma">
        <Reveal>
          <h2 className="text-center text-2xl font-medium uppercase tracking-[0.08em] text-[#444] md:text-[30px]">
            Aus unserem Blog
          </h2>
        </Reveal>

        <Reveal delayMs={120}>
          <article className="mx-auto mt-10 max-w-3xl overflow-hidden border border-[#eee] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            <Link
              href="/blog/history-of-the-easter-holiday"
              className="group block"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/blog/easter.jpg"
                  alt="History of the Easter holiday"
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width:768px) 100vw, 760px"
                />
                <span className="absolute bottom-4 left-4 bg-black/55 px-3 py-1 text-xs uppercase tracking-wide text-white backdrop-blur-sm">
                  Gallery
                </span>
              </div>
              <div className="px-6 py-7 text-center">
                <h3 className="text-xl font-semibold text-[#333] transition duration-300 group-hover:text-[var(--metma-orange)] md:text-2xl">
                  History of the Easter holiday
                </h3>
              </div>
            </Link>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
