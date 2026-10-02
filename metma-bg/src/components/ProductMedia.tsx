"use client";

import Image from "next/image";
import { useState } from "react";
import { optimizeVideoUrl } from "@/lib/media";

type Props = {
  name: string;
  images: string[];
  videoUrl: string;
  videoLabel: string;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.14-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export function ProductMedia({ name, images, videoUrl, videoLabel }: Props) {
  const photos = images.filter(Boolean);
  const [active, setActive] = useState<number | "video">(0);
  const photo = photos[typeof active === "number" ? active : 0] ?? photos[0];
  const showThumbs = photos.length > 1 || Boolean(videoUrl);

  return (
    <div className="grid gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--metma-sand)] ring-1 ring-black/[0.06]">
        {active === "video" ? (
          <video
            src={optimizeVideoUrl(videoUrl)}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={`${videoLabel}: ${name}`}
            className="h-full w-full bg-[var(--metma-sand)] object-contain"
          />
        ) : photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            className="object-contain p-6 md:p-8"
            sizes="(max-width:1024px) 100vw, 50vw"
            unoptimized={photo.endsWith(".png") || photo.startsWith("http")}
          />
        ) : null}
        {active !== "video" && videoUrl ? (
          <button
            type="button"
            onClick={() => setActive("video")}
            className="absolute top-1/2 left-1/2 z-10 inline-flex h-14 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/95 pr-5 pl-2 text-sm font-semibold text-[var(--metma-ink)] shadow-[0_10px_30px_-12px_rgba(23,23,23,0.5)] ring-1 ring-black/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--metma-rose)] text-white">
              <PlayIcon />
            </span>
            {videoLabel}
          </button>
        ) : null}
      </div>

      {showThumbs ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((src, index) => {
            const selected = active === index;
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={name}
                aria-current={selected ? "true" : undefined}
                className={`relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-white ${selected ? "ring-2 ring-[var(--metma-ink)]" : "ring-1 ring-black/[0.06]"}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-contain p-1.5"
                  sizes="72px"
                  unoptimized={src.endsWith(".png") || src.startsWith("http")}
                />
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setActive("video")}
            aria-label={videoLabel}
            aria-current={active === "video" ? "true" : undefined}
            className={`relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-[var(--metma-sand)] ${active === "video" ? "ring-2 ring-[var(--metma-ink)]" : "ring-1 ring-black/[0.06]"}`}
          >
            {photos[0] ? (
              <Image
                src={photos[0]}
                alt=""
                fill
                className="object-contain p-1.5 opacity-80"
                sizes="72px"
                unoptimized={photos[0].endsWith(".png") || photos[0].startsWith("http")}
              />
            ) : null}
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--metma-rose)]">
                <PlayIcon />
              </span>
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
