"use client";

import { useRef, useState } from "react";
import type { SiteCode } from "@/lib/types";
import { uploadAndRegister } from "@/lib/api";
import { Button } from "./forms";
import { ImagePlus, Video } from "lucide-react";

type Props = {
  site: SiteCode;
  imageUrls: string[];
  videoUrl?: string | null;
  onImagesChange: (urls: string[]) => void;
  onVideoChange: (url: string | null) => void;
};

export function ProductMediaAttach({
  site,
  imageUrls,
  videoUrl,
  onImagesChange,
  onVideoChange,
}: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"image" | "video" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function addImages(files: FileList | null) {
    if (!files?.length) return;
    setBusy("image");
    setError(null);
    try {
      const next = [...imageUrls];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const asset = await uploadAndRegister(site, file);
        next.push(asset.publicUrl);
      }
      onImagesChange(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Неуспешно качване");
    } finally {
      setBusy(null);
      if (imageRef.current) imageRef.current.value = "";
    }
  }

  async function addVideo(file: File | null) {
    if (!file) return;
    setBusy("video");
    setError(null);
    try {
      const asset = await uploadAndRegister(site, file);
      onVideoChange(asset.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Неуспешно качване");
    } finally {
      setBusy(null);
      if (videoRef.current) videoRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    onImagesChange(imageUrls.filter((_, i) => i !== index));
  }

  function moveImage(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= imageUrls.length) return;
    const next = [...imageUrls];
    [next[index], next[j]] = [next[j], next[index]];
    onImagesChange(next);
  }

  return (
    <div className="grid gap-5">
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--admin-mute)]">
          Снимки
        </p>
        <p className="mb-3 text-xs text-[var(--admin-mute)]">
          Може да прикачите няколко. Първата е главната снимка.
        </p>

        {imageUrls.length > 0 ? (
          <ul className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imageUrls.map((url, index) => (
              <li
                key={`${url}-${index}`}
                className="overflow-hidden rounded-lg border border-[var(--admin-line)] bg-[var(--admin-sand)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
                <div className="flex items-center justify-between gap-1 border-t border-[var(--admin-line)] bg-white px-1.5 py-1">
                  <span className="px-1 text-[0.65rem] font-semibold text-[var(--admin-mute)]">
                    {index === 0 ? "Главна" : `#${index + 1}`}
                  </span>
                  <div className="flex gap-0.5">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center text-sm text-[var(--admin-mute)] hover:text-[var(--admin-ink)] disabled:opacity-30"
                      disabled={index === 0}
                      onClick={() => moveImage(index, -1)}
                      title="Наляво"
                      aria-label="Наляво"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center text-sm text-[var(--admin-mute)] hover:text-[var(--admin-ink)] disabled:opacity-30"
                      disabled={index === imageUrls.length - 1}
                      onClick={() => moveImage(index, 1)}
                      title="Надясно"
                      aria-label="Надясно"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center text-sm font-semibold text-red-600"
                      onClick={() => removeImage(index)}
                      aria-label="Премахни"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mb-3 flex h-24 items-center justify-center rounded-lg border border-dashed border-[var(--admin-line)] bg-[var(--admin-sand)] text-xs text-[var(--admin-mute)]">
            Няма снимки
          </div>
        )}

        <input
          ref={imageRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple
          className="hidden"
          onChange={(e) => addImages(e.target.files)}
        />
        <Button
          variant="secondary"
          className="w-full sm:w-auto"
          disabled={busy !== null}
          onClick={() => imageRef.current?.click()}
        >
          {busy === "image" ? "Качване…" : (<><ImagePlus className="h-4 w-4" strokeWidth={2} />Добави снимки</>)}
        </Button>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--admin-mute)]">
          Видео
        </p>
        <p className="mb-3 text-xs text-[var(--admin-mute)]">
          MP4, WebM или MOV (до 80 MB).
        </p>

        {videoUrl ? (
          <div className="mb-3 overflow-hidden rounded-lg border border-[var(--admin-line)] bg-black">
            <video
              src={videoUrl}
              controls
              className="max-h-56 w-full"
              preload="metadata"
            />
            <div className="flex justify-end bg-white px-2 py-1.5">
              <Button variant="ghost" onClick={() => onVideoChange(null)}>
                Премахни видео
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-3 flex h-20 items-center justify-center rounded-lg border border-dashed border-[var(--admin-line)] bg-[var(--admin-sand)] text-xs text-[var(--admin-mute)]">
            Няма видео
          </div>
        )}

        <input
          ref={videoRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={(e) => addVideo(e.target.files?.[0] ?? null)}
        />
        <Button
          variant="secondary"
          className="w-full sm:w-auto"
          disabled={busy !== null}
          onClick={() => videoRef.current?.click()}
        >
          {busy === "video"
            ? "Качване…"
            : videoUrl
              ? (<><Video className="h-4 w-4" strokeWidth={2} />Смени видеото</>)
              : (<><Video className="h-4 w-4" strokeWidth={2} />Добави видео</>)}
        </Button>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
