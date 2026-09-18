import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB
const MAX_VIDEO_BYTES = 80 * 1024 * 1024; // 80 MB

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
]);

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const site = String(form.get("site") ?? "De");
    const altText = String(form.get("altText") ?? "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Липсва файл" }, { status: 400 });
    }

    const isImage = IMAGE_TYPES.has(file.type);
    const isVideo = VIDEO_TYPES.has(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error:
            "Разрешени са изображения (jpeg, png, webp, gif, svg) и видео (mp4, webm, mov).",
        },
        { status: 400 },
      );
    }

    const max = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (file.size > max) {
      return NextResponse.json(
        {
          error: isVideo
            ? "Видеото е твърде голямо (макс. 80 MB)."
            : "Файлът е твърде голям (макс. 8 MB).",
        },
        { status: 400 },
      );
    }

    const safeSite = site.replace(/[^a-zA-Z0-9_-]/g, "") || "De";
    const ext = path.extname(file.name) || mimeExt(file.type);
    const base = path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60);
    const kind = isVideo ? "video" : "image";
    const fileName = `${base || kind}-${randomUUID().slice(0, 8)}${ext}`;
    const relDir = path.join("uploads", safeSite);
    const absDir = path.join(process.cwd(), "public", relDir);
    await mkdir(absDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(absDir, fileName), buffer);

    const publicUrl = `/${relDir}/${fileName}`.replace(/\\/g, "/");

    return NextResponse.json({
      fileName,
      contentType: file.type,
      sizeBytes: file.size,
      publicUrl,
      altText: altText || null,
      r2Key: `${safeSite}/${fileName}`,
      kind: isVideo ? "video" : "image",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Неуспешно качване";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function mimeExt(type: string) {
  switch (type) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    case "image/svg+xml":
      return ".svg";
    case "video/mp4":
      return ".mp4";
    case "video/webm":
      return ".webm";
    case "video/quicktime":
      return ".mov";
    default:
      return ".bin";
  }
}
