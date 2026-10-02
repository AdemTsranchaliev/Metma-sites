"use client";

import Image from "next/image";
import { useState } from "react";
import { optimizeVideoUrl } from "@/lib/media";

type Props = {
  name: string;
  image: string;
  videoUrl: string;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.14-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export function ProductMedia({ name, image, videoUrl }: Props) {
  const [active, setActive] = useState<"photo" | "video">("photo");

  return (
    <div className="grid gap-3">
      <div className="relative aspect-square overflow-hidden bg-[var(--metma-sand)]">
        {active === "video" ? (
          <video
            src={optimizeVideoUrl(videoUrl)}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={`Video: ${name}`}
            className="h-full w-full bg-[var(--metma-sand)] object-contain"
          />
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            priority
            quality={85}
            className="object-contain p-5 md:p-8"
            sizes="(max-width:1024px) 90vw, 520px"
            unoptimized={image.startsWith("http") || image.endsWith(".png")}
          />
        )}
        {active === "photo" ? (
          <button
            type="button"
            onClick={() => setActive("video")}
            className="absolute top-1/2 left-1/2 z-10 inline-flex h-14 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/95 pr-5 pl-2 text-sm font-semibold text-[var(--metma-ink)] shadow-[0_10px_30px_-12px_rgba(23,23,23,0.5)] ring-1 ring-black/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--metma-rose)] text-white">
              <PlayIcon />
            </span>
            Video
          </button>
        ) : null}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActive("photo")}
          aria-label={name}
          aria-current={active === "photo" ? "true" : undefined}
          className={`relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden bg-white ${active === "photo" ? "ring-2 ring-[var(--metma-ink)]" : "ring-1 ring-black/[0.06]"}`}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-contain p-1.5"
            sizes="72px"
            unoptimized={image.startsWith("http") || image.endsWith(".png")}
          />
        </button>
        <button
          type="button"
          onClick={() => setActive("video")}
          aria-label="Video"
          aria-current={active === "video" ? "true" : undefined}
          className={`relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden bg-[var(--metma-sand)] ${active === "video" ? "ring-2 ring-[var(--metma-ink)]" : "ring-1 ring-black/[0.06]"}`}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-contain p-1.5 opacity-80"
            sizes="72px"
            unoptimized={image.startsWith("http") || image.endsWith(".png")}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--metma-rose)]">
              <PlayIcon />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
