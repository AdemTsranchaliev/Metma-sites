"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export function ShowMore({ children, lines = 4, className = "" }: { children: ReactNode; lines?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, children, lines]);

  return (
    <div>
      <div
        id={panelId}
        ref={ref}
        className={className}
        style={open ? undefined : { maxHeight: `calc(${lines} * 1.65em)`, overflow: "hidden" }}
      >
        {children}
      </div>
      {overflows || open ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="mt-2 text-sm font-semibold text-[var(--metma-rose)] hover:text-[var(--metma-rose-deep)]"
        >
          {open ? "Покажи по-малко" : "Покажи повече"}
        </button>
      ) : null}
    </div>
  );
}
