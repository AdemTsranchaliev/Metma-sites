"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MagneticCta } from "@/components/MagneticCta";
import { EggKnock } from "@/components/easter/EggKnock";

const CW = 420;
const CH = 560;

type Kind = "dye" | "pearl" | "gold" | "silver" | "crystal";
type StickerId = "heart" | "star" | "flower" | "bunny" | "chick";

type Dye = { id: string; name: string; color: string; kind: Kind };

const colors = [
  { id: "red", name: "Червена", color: "#e10600" },
  { id: "orange", name: "Оранжева", color: "#ff7a00" },
  { id: "yellow", name: "Жълта", color: "#ffe100" },
  { id: "green", name: "Зелена", color: "#22a84a" },
  { id: "blue", name: "Синя", color: "#0072ef" },
  { id: "lilac", name: "Лилава", color: "#7a2fbe" },
  { id: "pink", name: "Розова", color: "#ff4d88" },
] as const;

const kinds: { id: Kind; name: string }[] = [
  { id: "dye", name: "Боя" },
  { id: "pearl", name: "Перла" },
  { id: "gold", name: "Злато" },
  { id: "silver", name: "Сребро" },
  { id: "crystal", name: "Кристали" },
];

const brushes = [
  { id: "fine", name: "Тънка", size: 8 },
  { id: "mid", name: "Средна", size: 20 },
  { id: "wide", name: "Широка", size: 44 },
] as const;

const stickers: { id: StickerId; name: string }[] = [
  { id: "heart", name: "Сърце" },
  { id: "star", name: "Звезда" },
  { id: "flower", name: "Цвете" },
  { id: "bunny", name: "Зайче" },
  { id: "chick", name: "Пиле" },
];

let eggPath: Path2D | null = null;

function eggShape() {
  if (!eggPath) {
    eggPath = new Path2D();
    eggPath.addPath(new Path2D("M100 16C146 16 176 74 176 136C176 198 146 244 100 244C54 244 24 198 24 136C24 74 54 16 100 16Z"), {
      a: CW / 200,
      b: 0,
      c: 0,
      d: CH / 260,
      e: 0,
      f: 0,
    });
  }
  return eggPath;
}

function paintShell(ctx: CanvasRenderingContext2D) {
  const shell = ctx.createLinearGradient(60, 20, CW - 40, CH - 20);
  shell.addColorStop(0, "#fffaf3");
  shell.addColorStop(0.45, "#f6e7d2");
  shell.addColorStop(1, "#e7d0b4");
  ctx.save();
  ctx.fillStyle = shell;
  ctx.fill(eggShape());
  ctx.clip(eggShape());
  for (let i = 0; i < 220; i += 1) {
    const x = ((i * 97) % CW) + ((i * 13) % 7);
    const y = ((i * 53) % CH) + ((i * 19) % 5);
    const pore = ctx.createRadialGradient(x, y, 0, x, y, 1.6 + (i % 3));
    pore.addColorStop(0, "rgba(150,110,70,0.16)");
    pore.addColorStop(1, "rgba(150,110,70,0)");
    ctx.fillStyle = pore;
    ctx.fillRect(x - 4, y - 4, 8, 8);
  }
  ctx.restore();
}

function dyeHex(dye: Dye) {
  if (dye.kind === "gold") return "#e8c45a";
  if (dye.kind === "silver") return "#c5ced6";
  return dye.color;
}

function hexRgb(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function stampDye(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  dye: Dye,
  angle = 0,
) {
  const { r, g, b } = hexRgb(dyeHex(dye));
  const radius = (size / 2) * (0.92 + 0.08 * Math.sin(x * 0.21 + y * 0.17));
  const soak = dye.kind === "pearl" ? 0.46 : dye.kind === "gold" || dye.kind === "silver" ? 0.52 : 0.64;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(1.22, 0.78);
  if (dye.kind === "dye") ctx.globalCompositeOperation = "multiply";
  const gradient = ctx.createRadialGradient(-radius * 0.12, -radius * 0.16, radius * 0.04, 0, 0, radius);
  gradient.addColorStop(0, `rgba(${r},${g},${b},${soak})`);
  gradient.addColorStop(0.55, `rgba(${r},${g},${b},${soak * 0.62})`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  if (dye.kind === "gold" || dye.kind === "silver" || dye.kind === "pearl") {
    ctx.globalCompositeOperation = "source-over";
    const glint = ctx.createRadialGradient(-radius * 0.28, -radius * 0.32, 0, -radius * 0.2, -radius * 0.22, radius * 0.42);
    glint.addColorStop(0, dye.kind === "gold" ? "rgba(255,236,170,0.7)" : "rgba(255,255,255,0.62)");
    glint.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glint;
    ctx.beginPath();
    ctx.arc(-radius * 0.18, -radius * 0.2, radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function layDye(
  ctx: CanvasRenderingContext2D,
  tip: { x: number; y: number },
  control: { x: number; y: number },
  next: { x: number; y: number },
  size: number,
  dye: Dye,
) {
  const mx = (control.x + next.x) / 2;
  const my = (control.y + next.y) / 2;
  const dist = Math.hypot(mx - tip.x, my - tip.y);
  const step = Math.max(1.6, size * 0.2);
  const count = Math.max(1, Math.ceil(dist / step));
  const angle = Math.atan2(my - tip.y, mx - tip.x);
  for (let i = 1; i <= count; i += 1) {
    const t = i / count;
    const u = 1 - t;
    stampDye(
      ctx,
      u * u * tip.x + 2 * u * t * control.x + t * t * mx,
      u * u * tip.y + 2 * u * t * control.y + t * t * my,
      size,
      dye,
      angle,
    );
  }
  return { x: mx, y: my };
}

function paintGloss(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, CW, CH);
  ctx.save();
  ctx.clip(eggShape());
  const light = ctx.createRadialGradient(CW * 0.36, CH * 0.24, 8, CW * 0.4, CH * 0.3, CW * 0.34);
  light.addColorStop(0, "rgba(255,255,255,0.55)");
  light.addColorStop(0.45, "rgba(255,255,255,0.08)");
  light.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, CW, CH);
  const shade = ctx.createLinearGradient(0, CH * 0.55, 0, CH);
  shade.addColorStop(0, "rgba(90,50,20,0)");
  shade.addColorStop(1, "rgba(90,50,20,0.16)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, CW, CH);
  ctx.restore();
}

function stampStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = fill;
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.42;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function stampSticker(ctx: CanvasRenderingContext2D, id: StickerId, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1.15, 1.15);
  if (id === "heart") {
    ctx.fillStyle = "#e23b4a";
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(-22, -8, -12, -22, 0, -10);
    ctx.bezierCurveTo(12, -22, 22, -8, 0, 8);
    ctx.fill();
  } else if (id === "star") {
    stampStar(ctx, 0, 0, 16, "#f2c94c");
  } else if (id === "flower") {
    ctx.fillStyle = "#ff7ab0";
    for (let i = 0; i < 5; i += 1) {
      const angle = (Math.PI * 2 * i) / 5;
      ctx.beginPath();
      ctx.ellipse(Math.cos(angle) * 9, Math.sin(angle) * 9, 7, 5, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#ffe100";
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === "bunny") {
    ctx.fillStyle = "#f4f0ea";
    ctx.beginPath();
    ctx.ellipse(-6, -14, 3.2, 9, -0.2, 0, Math.PI * 2);
    ctx.ellipse(6, -14, 3.2, 9, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 2, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e4572e";
    ctx.beginPath();
    ctx.arc(-4, 1, 1.4, 0, Math.PI * 2);
    ctx.arc(4, 1, 1.4, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "#ffe100";
    ctx.beginPath();
    ctx.arc(0, 2, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f08a1e";
    ctx.beginPath();
    ctx.moveTo(10, 2);
    ctx.lineTo(18, -1);
    ctx.lineTo(18, 5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#171717";
    ctx.beginPath();
    ctx.arc(-3, 0, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function KindIcon({ id }: { id: Kind }) {
  if (id === "pearl") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <circle cx="12" cy="12" r="7" fill="currentColor" opacity="0.35" />
        <circle cx="9" cy="9" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (id === "gold") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M12 3l1.6 4.2L18 9l-3.2 2.6L15.8 16 12 14 8.2 16l1-4.4L6 9l4.4-1.8L12 3z" fill="#e2b43a" />
      </svg>
    );
  }
  if (id === "silver") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <circle cx="12" cy="12" r="6.5" fill="#d5dde4" stroke="#8d99a6" strokeWidth="1.4" />
        <path d="M9 9.2c.8-1.2 2-1.8 3.2-1.6" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "crystal") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M12 3l6 6-6 12L6 9l6-6z" fill="#7ec8ff" />
        <path d="M12 3l6 6h-6L12 3z" fill="#fff" opacity="0.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M12 3c2 4 4 6 4 9a4 4 0 1 1-8 0c0-3 2-5 4-9z" fill="currentColor" />
    </svg>
  );
}

function ActionIcon({ id }: { id: "share" | "undo" | "fresh" }) {
  if (id === "share") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M12 14V4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8 8l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 14v5h14v-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "undo") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M9 7L4 12l5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12h9a6 6 0 1 1 0 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M12 4c3.2 1.6 5.4 5.2 5.4 9.1a5.4 5.4 0 0 1-10.8 0C6.6 9.2 8.8 5.6 12 4z" fill="#fff6ea" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BrushIcon({ bristles }: { bristles: number }) {
  const left = 12 - bristles;
  const right = 12 + bristles;
  return (
    <svg viewBox="0 0 24 28" className="h-7 w-6" aria-hidden>
      <rect x="10" y="1" width="4" height="10" rx="1" fill="currentColor" />
      <rect x={left} y="11" width={bristles * 2} height="3" fill="currentColor" />
      <path d={`M${left} 14 L${right} 14 L${right - bristles * 0.35} 26 L${left + bristles * 0.35} 26 Z`} fill="currentColor" />
    </svg>
  );
}

function StickerIcon({ id }: { id: StickerId }) {
  if (id === "heart") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M12 19s-7-4.2-7-9a3.8 3.8 0 0 1 7-2 3.8 3.8 0 0 1 7 2c0 4.8-7 9-7 9z" fill="#e23b4a" />
      </svg>
    );
  }
  if (id === "star") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M12 3l2.2 5.2L20 9l-4 3.6L17.2 18 12 15.2 6.8 18 8 12.6 4 9l5.8-.8L12 3z" fill="#f2c94c" />
      </svg>
    );
  }
  if (id === "flower") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <circle cx="12" cy="6" r="3" fill="#ff7ab0" />
        <circle cx="17" cy="10" r="3" fill="#ff7ab0" />
        <circle cx="15" cy="16" r="3" fill="#ff7ab0" />
        <circle cx="9" cy="16" r="3" fill="#ff7ab0" />
        <circle cx="7" cy="10" r="3" fill="#ff7ab0" />
        <circle cx="12" cy="12" r="2.2" fill="#ffe100" />
      </svg>
    );
  }
  if (id === "bunny") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <ellipse cx="9" cy="7" rx="2" ry="5" fill="#f4f0ea" />
        <ellipse cx="15" cy="7" rx="2" ry="5" fill="#f4f0ea" />
        <circle cx="12" cy="15" r="6" fill="#f4f0ea" />
        <circle cx="10" cy="14" r="1" fill="#e4572e" />
        <circle cx="14" cy="14" r="1" fill="#e4572e" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <circle cx="11" cy="13" r="6" fill="#ffe100" />
      <path d="M16 12l5-2v4l-5-2z" fill="#f08a1e" />
      <circle cx="9" cy="12" r="1" fill="#171717" />
    </svg>
  );
}

export function EggPainter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glossRef = useRef<HTMLCanvasElement>(null);
  const history = useRef<ImageData[]>([]);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const tip = useRef<{ x: number; y: number } | null>(null);
  const crystalCarry = useRef(0);
  const rectRef = useRef<DOMRect | null>(null);
  const tool = useRef<{ dye: Dye; size: number; sticker: boolean; stickerId: StickerId }>({
    dye: { ...colors[0], kind: "dye" },
    size: brushes[1].size,
    sticker: false,
    stickerId: "heart",
  });
  const [kind, setKind] = useState<Kind>("dye");
  const [colorId, setColorId] = useState<(typeof colors)[number]["id"]>("red");
  const [brushId, setBrushId] = useState<(typeof brushes)[number]["id"]>("mid");
  const [mode, setMode] = useState<"brush" | "sticker">("brush");
  const [stickerId, setStickerId] = useState<StickerId>("heart");
  const [canUndo, setCanUndo] = useState(false);
  const [knockSrc, setKnockSrc] = useState<string | null>(null);
  const [knockNonce, setKnockNonce] = useState(0);

  const color = colors.find((item) => item.id === colorId) ?? colors[0];
  const brush = brushes.find((item) => item.id === brushId) ?? brushes[1];
  const dye: Dye = { id: color.id, name: color.name, color: color.color, kind };
  const needsColor = kind === "dye" || kind === "pearl";
  tool.current = { dye, size: brush.size, sticker: mode === "sticker", stickerId };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    canvas.width = CW;
    canvas.height = CH;
    paintShell(ctx);
    history.current = [];
    setCanUndo(false);
    const gloss = glossRef.current?.getContext("2d");
    if (gloss && glossRef.current) {
      glossRef.current.width = CW;
      glossRef.current.height = CH;
      paintGloss(gloss);
    }
  }, []);

  function pointFrom(event: { clientX: number; clientY: number }) {
    const rect = rectRef.current;
    if (!rect) return { x: 0, y: 0 };
    return {
      x: ((event.clientX - rect.left) / rect.width) * CW,
      y: ((event.clientY - rect.top) / rect.height) * CH,
    };
  }

  function layCrystals(
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
    size: number,
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;
    const step = Math.max(14, size * 0.9);
    let walked = step - crystalCarry.current;
    while (walked <= dist) {
      const t = walked / dist;
      stampStar(ctx, from.x + dx * t, from.y + dy * t, size * 0.42, "#ffffff");
      walked += step;
    }
    crystalCarry.current = walked - dist;
  }

  function remember(ctx: CanvasRenderingContext2D) {
    if (history.current.length >= 8) history.current.shift();
    history.current.push(ctx.getImageData(0, 0, CW, CH));
    setCanUndo(true);
  }

  function onDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || drawing.current) return;
    canvas.setPointerCapture(event.pointerId);
    rectRef.current = canvas.getBoundingClientRect();
    const start = pointFrom(event);
    remember(ctx);
    ctx.save();
    ctx.clip(eggShape());
    if (tool.current.sticker) {
      stampSticker(ctx, tool.current.stickerId, start.x, start.y);
      ctx.restore();
      rectRef.current = null;
      return;
    }
    drawing.current = true;
    crystalCarry.current = 0;
    last.current = start;
    tip.current = start;
    const { dye, size } = tool.current;
    if (dye.kind === "crystal") {
      stampStar(ctx, start.x, start.y, size * 0.42, "#ffffff");
      return;
    }
    stampDye(ctx, start.x, start.y, size, dye);
  }

  function onMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !last.current || !tip.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const native = event.nativeEvent;
    const coalesced = native.getCoalescedEvents?.() ?? [];
    const samples = coalesced.length > 0 ? coalesced : [native];
    const { dye, size } = tool.current;
    for (const sample of samples) {
      const next = pointFrom(sample);
      const dx = next.x - last.current.x;
      const dy = next.y - last.current.y;
      if (dx * dx + dy * dy < 1) continue;
      if (dye.kind === "crystal") {
        layCrystals(ctx, last.current, next, size);
      } else {
        tip.current = layDye(ctx, tip.current, last.current, next, size, dye);
      }
      last.current = next;
    }
  }

  function onUp() {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && last.current && tip.current && tool.current.dye.kind !== "crystal") {
      stampDye(ctx, last.current.x, last.current.y, tool.current.size, tool.current.dye);
    }
    ctx?.restore();
    drawing.current = false;
    last.current = null;
    tip.current = null;
    rectRef.current = null;
  }

  function undo() {
    const ctx = canvasRef.current?.getContext("2d");
    const snap = history.current.pop();
    if (!ctx || !snap) return;
    ctx.putImageData(snap, 0, 0);
    setCanUndo(history.current.length > 0);
  }

  function clearEgg() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CW, CH);
    paintShell(ctx);
    history.current = [];
    setCanUndo(false);
  }

  async function shareEgg() {
    const source = canvasRef.current;
    const gloss = glossRef.current;
    if (!source) return;
    const card = document.createElement("canvas");
    card.width = 640;
    card.height = 800;
    const ctx = card.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff6ea";
    ctx.fillRect(0, 0, card.width, card.height);
    ctx.drawImage(source, 70, 24, 500, 666);
    if (gloss) ctx.drawImage(gloss, 70, 24, 500, 666);
    ctx.fillStyle = "#e4572e";
    ctx.font = "700 28px Fredoka, sans-serif";
    ctx.fillText("Боя METMA", 48, 750);
    const blob = await new Promise<Blob | null>((resolve) => card.toBlob(resolve, "image/png"));
    if (!blob) return;
    const file = new File([blob], "metma-yaitse.png", { type: "image/png" });
    const shareData = { files: [file], title: "Моето яйце METMA", text: "Боядисах яйце с боя METMA." };
    if (navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        return;
      }
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "metma-yaitse.png";
    link.click();
    URL.revokeObjectURL(url);
  }

  function sendToKnock() {
    const source = canvasRef.current;
    const gloss = glossRef.current;
    if (!source) return;
    const card = document.createElement("canvas");
    card.width = CW;
    card.height = CH;
    const ctx = card.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(source, 0, 0);
    if (gloss) ctx.drawImage(gloss, 0, 0);
    setKnockSrc(card.toDataURL("image/png"));
    setKnockNonce((n) => n + 1);
  }

  useEffect(() => {
    if (!knockSrc) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById("egg-knock");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [knockSrc, knockNonce]);

  const status =
    mode === "sticker"
      ? `Стикер · ${stickers.find((item) => item.id === stickerId)?.name}`
      : `Боя METMA · ${kinds.find((item) => item.id === kind)?.name}${needsColor ? ` · ${color.name}` : ""} · ${brush.name}`;

  return (
    <section
      aria-labelledby="egg-paint-title"
      className="relative overflow-hidden border-y border-[var(--metma-peach)]/50 bg-[linear-gradient(165deg,#fff8ee_0%,#fff_46%,var(--metma-mint)_100%)] py-10 md:py-20"
    >
      <div className="container-metma relative z-[1] grid items-center gap-4 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-12">
        <div className="flex flex-col items-center">
          <div className="relative w-[min(52%,168px)] sm:w-[280px]">
            <div aria-hidden className="absolute inset-x-8 bottom-1 h-3 rounded-[100%] bg-[var(--metma-ink)]/10 blur-[1px]" />
            <canvas
              ref={canvasRef}
              width={CW}
              height={CH}
              className={`relative z-[1] w-full touch-none ${mode === "sticker" ? "cursor-pointer" : "cursor-crosshair"}`}
              aria-label="Яйце за боядисване. Рисувай с боя METMA или сложи стикер."
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            />
            <canvas
              ref={glossRef}
              width={CW}
              height={CH}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] w-full"
            />
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-[var(--metma-ink)] sm:mt-4 sm:text-sm">{status}</p>
        </div>

        <div>
          <p className="eyebrow text-[var(--metma-rose)]">Боя METMA</p>
          <h2
            id="egg-paint-title"
            className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold tracking-tight text-[var(--metma-ink)]"
          >
            Боядисай яйцето
          </h2>
          <p className="mt-3 hidden max-w-md text-sm leading-6 text-[var(--metma-mute)] sm:block sm:text-base">
            Избери вид боя и четка, или сложи стикер с едно докосване.
          </p>

          <div className="mt-3 bg-white/80 p-2.5 ring-1 ring-black/10 sm:mt-6 sm:p-4">
            <div className="grid grid-cols-2 gap-1 bg-[var(--metma-sand)] p-1" role="tablist" aria-label="Инструмент">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "brush"}
                onClick={() => setMode("brush")}
                className={`inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold ${
                  mode === "brush" ? "bg-[var(--metma-ink)] text-white" : "text-[var(--metma-ink)]"
                }`}
              >
                <BrushIcon bristles={3.2} />
                Четка
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "sticker"}
                onClick={() => setMode("sticker")}
                className={`inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold ${
                  mode === "sticker" ? "bg-[var(--metma-ink)] text-white" : "text-[var(--metma-ink)]"
                }`}
              >
                <StickerIcon id="star" />
                Стикери
              </button>
            </div>

            {mode === "brush" ? (
              <>
                <fieldset className="mt-4 border-0 p-0">
                  <legend className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--metma-mute)]">
                    Вид
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Вид боя">
                    {kinds.map((item) => {
                      const selected = kind === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setKind(item.id)}
                          className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 px-2.5 text-sm font-semibold ${
                            selected ? "bg-[var(--metma-ink)] text-white" : "bg-[var(--metma-sand)] text-[var(--metma-ink)]"
                          }`}
                        >
                          <KindIcon id={item.id} />
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {needsColor ? (
                  <fieldset className="mt-4 border-0 p-0">
                    <legend className="flex items-baseline gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--metma-mute)]">
                      Цвят
                      <span className="text-[0.75rem] font-semibold normal-case tracking-normal text-[var(--metma-ink)]">
                        {color.name}
                      </span>
                    </legend>
                    <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Боя METMA">
                      {colors.map((item) => {
                        const selected = colorId === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            aria-label={item.name}
                            onClick={() => setColorId(item.id)}
                            className={`h-9 w-9 rounded-full ${selected ? "ring-2 ring-[var(--metma-ink)] ring-offset-2" : "ring-1 ring-black/10"}`}
                            style={{ background: item.color }}
                          />
                        );
                      })}
                    </div>
                  </fieldset>
                ) : null}

                <fieldset className="mt-4 border-0 p-0">
                  <legend className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--metma-mute)]">
                    Четка
                  </legend>
                  <div className="mt-2 grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Четка">
                    {brushes.map((item) => {
                      const selected = brush.id === item.id;
                      const bristles = item.id === "fine" ? 2 : item.id === "mid" ? 3.4 : 5.2;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setBrushId(item.id)}
                          className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold ${
                            selected ? "bg-[var(--metma-ink)] text-white" : "bg-[var(--metma-sand)] text-[var(--metma-ink)]"
                          }`}
                        >
                          <BrushIcon bristles={bristles} />
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            ) : (
              <fieldset className="mt-4 border-0 p-0">
                <legend className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--metma-mute)]">
                  Стикер
                </legend>
                <div className="mt-2 grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Стикер">
                  {stickers.map((item) => {
                    const selected = stickerId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={item.name}
                        onClick={() => setStickerId(item.id)}
                        className={`flex min-h-16 flex-col items-center justify-center gap-1 bg-white text-[0.65rem] font-semibold text-[var(--metma-ink)] ${
                          selected ? "ring-2 ring-[var(--metma-ink)]" : "ring-1 ring-black/10"
                        }`}
                      >
                        <StickerIcon id={item.id} />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <div className="mt-4 grid grid-cols-3 gap-1.5 border-t border-black/10 pt-3">
              <button
                type="button"
                onClick={() => void shareEgg()}
                className="inline-flex min-h-11 items-center justify-center gap-1 bg-[var(--metma-sand)] px-1 text-[0.68rem] font-semibold text-[var(--metma-ink)] sm:gap-1.5 sm:text-sm"
              >
                <ActionIcon id="share" />
                Сподели
              </button>
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="inline-flex min-h-11 items-center justify-center gap-1 bg-[var(--metma-sand)] px-1 text-[0.68rem] font-semibold text-[var(--metma-ink)] disabled:opacity-40 sm:gap-1.5 sm:text-sm"
              >
                <ActionIcon id="undo" />
                Назад
              </button>
              <button
                type="button"
                onClick={clearEgg}
                className="inline-flex min-h-11 items-center justify-center gap-1 bg-[var(--metma-sand)] px-1 text-[0.68rem] font-semibold text-[var(--metma-ink)] sm:gap-1.5 sm:text-sm"
              >
                <ActionIcon id="fresh" />
                Ново яйце
              </button>
            </div>
            <button
              type="button"
              onClick={sendToKnock}
              className="egg-duel-cta mt-3 w-full"
            >
              Чукна се с него
            </button>
          </div>

          <div className="mt-4">
            <MagneticCta>
              <Link href={mode === "sticker" ? "/produkti/ukrasi" : "/produkti/boi"} className="btn-metma">
                {mode === "sticker" ? "Виж стикерите" : "Виж боята METMA"}
              </Link>
            </MagneticCta>
          </div>
        </div>
      </div>
      {knockSrc ? (
        <EggKnock
          painted={knockSrc}
          onNewEgg={() => {
            setKnockSrc(null);
            clearEgg();
            document.getElementById("egg-paint-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      ) : null}
    </section>
  );
}
