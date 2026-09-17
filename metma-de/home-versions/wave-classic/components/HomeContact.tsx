import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ScribbleUnderline } from "@/components/home/DesignDetails";
import { SocialIcons } from "@/components/SocialIcons";

export function HomeContact() {
  return (
    <section className="bg-[var(--metma-blue)] py-16 text-white md:py-20">
      <div className="container-metma text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Melden Sie sich bei uns
          </h2>
          <ScribbleUnderline color="var(--metma-yellow)" />
          <p className="mx-auto mt-5 max-w-md text-white/90">
            Anfragen zu Eierfarben, Sets und Partnerschaften — wir helfen gerne.
          </p>
          <div className="mt-7 flex flex-col items-center gap-2 text-lg md:flex-row md:justify-center md:gap-10">
            <a
              href="tel:+359885828771"
              className="font-semibold transition hover:text-[var(--metma-yellow)]"
            >
              +359 885 828 771
            </a>
            <a
              href="mailto:sales@metma-de.com"
              className="font-semibold transition hover:text-[var(--metma-yellow)]"
            >
              sales@metma-de.com
            </a>
          </div>
          <div className="mt-8 flex justify-center">
            <SocialIcons variant="onBlue" />
          </div>
          <Link href="/kontakt" className="btn-metma mt-8">
            Nachricht senden
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
