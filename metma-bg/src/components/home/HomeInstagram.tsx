import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const profile = siteConfig.social.instagramEaster;

const posts = [
  { src: "/images/instagram/01.jpg", href: "https://www.instagram.com/chudesata.na.velikden/reel/DWhCPI7iJv-/", reel: true },
  { src: "/images/instagram/02.jpg", href: "https://www.instagram.com/chudesata.na.velikden/reel/DXKcrMGCDYv/", reel: true },
  { src: "/images/instagram/03.jpg", href: "https://www.instagram.com/chudesata.na.velikden/p/DXBiggyCPen/", reel: false },
  { src: "/images/instagram/04.jpg", href: "https://www.instagram.com/chudesata.na.velikden/reel/DW_1tc5iAhV/", reel: true },
  { src: "/images/instagram/05.jpg", href: "https://www.instagram.com/chudesata.na.velikden/reel/DW-90-yiHjf/", reel: true },
  { src: "/images/instagram/06.jpg", href: "https://www.instagram.com/chudesata.na.velikden/reel/DW8iXfkCJw2/", reel: true },
  { src: "/images/instagram/07.jpg", href: "https://www.instagram.com/chudesata.na.velikden/reel/DW7AksqiG-S/", reel: true },
  { src: "/images/instagram/08.jpg", href: "https://www.instagram.com/chudesata.na.velikden/p/DW6aeBRCLzb/", reel: false },
];

export function HomeInstagram({ locale }: { locale: Locale }) {
  const copy = getMessages(locale);
  const instagram = getStatic(locale).instagram;
  return (
    <section className="bg-[#fff8f4] py-12 sm:py-16">
      <div className="container-metma">
        <Reveal className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Instagram</p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-bold tracking-[-0.03em] text-[#2f3b4c]">
              {copy.footer.easter}
            </h2>
            <p className="mt-2 text-sm text-[#5c6b7a]">@chudesata.na.velikden</p>
          </div>
          <a
            href={profile}
            target="_blank"
            rel="noreferrer"
            className="btn-outline shrink-0"
          >
            {copy.home.follow}
          </a>
        </Reveal>

        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.map((post, index) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-[3/4] w-36 shrink-0 snap-start overflow-hidden rounded-[1.25rem] bg-white sm:w-44"
              aria-label={`${instagram} ${index + 1} · Instagram`}
            >
              <Image
                src={post.src}
                alt=""
                fill
                sizes="180px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {post.reel ? (
                <span
                  aria-hidden
                  className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[var(--metma-rose)]"
                >
                  <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3 fill-current">
                    <path d="M2.2 1.4v9.2L10.4 6 2.2 1.4Z" />
                  </svg>
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
