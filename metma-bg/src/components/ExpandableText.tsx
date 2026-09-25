"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getStatic } from "@/i18n/static";

export function ExpandableText({ paragraphs }: { paragraphs: string[] }) {
  const catalog = getStatic(useLocale()).catalog;
  const [open, setOpen] = useState(false);
  const text = paragraphs.join("\n");
  const long = text.length > 320 || paragraphs.length > 3;
  const visible = !long || open ? paragraphs : paragraphs.slice(0, 2);

  return (
    <div>
      <div className="space-y-4">
        {visible.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      {long ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-5 text-sm font-medium text-[var(--metma-ink)] underline decoration-[var(--metma-line)] underline-offset-4 hover:decoration-[var(--metma-ink)]"
        >
          {open ? catalog.less : catalog.more}
        </button>
      ) : null}
    </div>
  );
}
