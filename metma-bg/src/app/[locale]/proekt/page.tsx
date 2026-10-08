import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getMessages } from "@/i18n/messages";
import { getStatic } from "@/i18n/static";
import { parseLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

function starPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 10 }, (_, index) => {
    const radius = index % 2 === 0 ? r : r * 0.4;
    const angle = (index * 36 - 90) * (Math.PI / 180);
    return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
  }).join(" ");
}

function EuFlag() {
  const stars = Array.from({ length: 12 }, (_, index) => {
    const angle = (index * 30 - 90) * (Math.PI / 180);
    const cx = 16 + Math.cos(angle) * 6.1;
    const cy = 11 + Math.sin(angle) * 6.1;
    return <polygon key={index} points={starPoints(cx, cy, 1.05)} fill="#fc0" />;
  });

  return (
    <svg viewBox="0 0 32 22" className="h-10 w-14 shrink-0" role="img" aria-label="European Union">
      <rect width="32" height="22" fill="#003399" />
      {stars}
    </svg>
  );
}

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
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const copy = getStatic(locale).project;
  const facts = [
    { label: copy.nameLabel, value: copy.name },
    { label: copy.procedureLabel, value: copy.procedure },
    { label: copy.beneficiaryLabel, value: copy.beneficiary },
    { label: copy.authorityLabel, value: copy.authority },
    { label: copy.valueLabel, value: copy.value },
    { label: copy.grantLabel, value: copy.grant },
    { label: copy.startLabel, value: copy.start },
    { label: copy.endLabel, value: copy.end },
  ];

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} />
      <section className="bg-white py-12 md:py-16">
        <div className="container-metma max-w-3xl">
          <div className="flex items-center gap-4 border border-[var(--metma-line)] bg-[var(--metma-blue-soft)] px-4 py-4">
            <EuFlag />
            <p className="text-sm font-bold leading-6 text-[var(--metma-ink)] md:text-base">{copy.cofunded}</p>
          </div>

          <p className="mt-8 text-sm leading-7 text-[var(--metma-ink)] md:text-base">{copy.lead}</p>

          <dl className="mt-8 grid gap-px border border-[var(--metma-line)] bg-[var(--metma-line)] sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white px-4 py-4">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--metma-rose)]">{fact.label}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-[var(--metma-ink)]">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 font-display text-2xl font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
            {copy.descriptionTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--metma-mute)] md:text-base">{copy.description}</p>

          <h2 className="mt-8 font-display text-2xl font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
            {copy.goalsTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--metma-mute)] md:text-base">{copy.goals}</p>
        </div>
      </section>
    </>
  );
}
