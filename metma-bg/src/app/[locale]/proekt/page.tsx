import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { parseLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  const copy = getMessages(locale).meta;
  return pageMetadata({
    title: copy.projectTitle,
    description: copy.projectDescription,
    path: "/proekt",
    locale,
    image: "/images/proekt/energiyna-efektivnost.png",
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const copy = getStatic(locale).project;

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} />
      <section className="bg-white py-10 md:py-14">
        <div className="container-metma max-w-3xl">
          <Image
            src="/images/proekt/energiyna-efektivnost.png"
            alt={copy.lead}
            width={1696}
            height={2400}
            priority
            className="h-auto w-full border border-[var(--metma-line)] bg-white"
          />
        </div>
      </section>
    </>
  );
}
