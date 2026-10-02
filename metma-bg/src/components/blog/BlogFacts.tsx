import { blogDateParts, readingMinutes } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import type { Locale } from "@/lib/i18n";

type Copy = {
  published: string;
  readFor: string;
  minuteOne: string;
  minuteMany: string;
};

export function readingLabel(minutes: number, copy: Pick<Copy, "minuteOne" | "minuteMany">) {
  return `${minutes} ${minutes === 1 ? copy.minuteOne : copy.minuteMany}`;
}

export function BlogFacts({
  post,
  locale,
  copy,
}: {
  post: BlogPost;
  locale: Locale;
  copy: Copy;
}) {
  const date = blogDateParts(post.date, locale);
  const minutes = readingMinutes(post);
  const minuteLabel = minutes === 1 ? copy.minuteOne : copy.minuteMany;

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <div className="flex items-center gap-3 rounded-2xl bg-white py-2 pl-2 pr-4 shadow-[0_8px_24px_rgba(47,59,76,0.06)]">
        <span className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-[var(--metma-rose)] text-white">
          <span className="font-display text-[1.65rem] font-bold leading-none">{date.day}</span>
        </span>
        <span>
          <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--metma-rose)]">
            {copy.published}
          </span>
          <span className="mt-0.5 block font-display text-lg font-bold leading-none text-[var(--metma-ink)]">
            {date.month}
          </span>
          <time dateTime={post.date} className="mt-1 block text-sm leading-none text-[var(--metma-mute)]">
            {date.year}
          </time>
        </span>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-white py-2 pl-2 pr-4 shadow-[0_8px_24px_rgba(47,59,76,0.06)]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--metma-butter)] font-display text-[1.65rem] font-bold leading-none text-[var(--metma-ink)]">
          {minutes}
        </span>
        <span>
          <span className="block font-display text-lg font-bold leading-none text-[var(--metma-ink)]">{minuteLabel}</span>
          <span className="mt-1 block text-sm leading-none text-[var(--metma-mute)]">{copy.readFor}</span>
        </span>
      </div>
    </div>
  );
}
