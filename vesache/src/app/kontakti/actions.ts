"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";

export type InquiryState = {
  sent: boolean;
  error: string;
  openedMail?: boolean;
};

const TO = "vessache@gmail.com";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SENDS = 5;
const hits = new Map<string, number[]>();

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_SENDS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function sendInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  if (clean(formData.get("website"), 200)) return { sent: true, error: "" };

  const name = clean(formData.get("name"), 80);
  const email = clean(formData.get("email"), 120);
  const phone = clean(formData.get("phone"), 30);
  const message = clean(formData.get("message"), 4000);
  const product = clean(formData.get("product"), 160);

  if (name.length < 2) return { sent: false, error: "Напишете име." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { sent: false, error: "Напишете валиден имейл, за да можем да отговорим." };
  if (phone && !/^[0-9+().\-\s]{5,30}$/.test(phone)) return { sent: false, error: "Телефонът изглежда непълен." };
  if (message.length < 3) return { sent: false, error: "Напишете съобщение." };

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return { sent: false, error: "Изпратени са няколко съобщения за кратко. Опитайте след малко." };

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("SMTP is not configured");
    return {
      sent: false,
      error:
        process.env.NODE_ENV === "development"
          ? "Пощата не е вързана. Сложете SMTP_USER и SMTP_PASS в .env.local."
          : "Съобщението не тръгна. Пишете на vessache@gmail.com.",
    };
  }

  const subject = (product ? `Запитване: ${product}` : "Запитване от сайта").replace(/[\r\n]/g, " ");
  const text = [
    `Име: ${name}`,
    `Имейл: ${email}`,
    phone ? `Телефон: ${phone}` : null,
    product ? `Продукт: ${product}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `Весаче сайт <${user}>`,
      to: TO,
      replyTo: email,
      subject,
      text,
    });
  } catch (error) {
    console.error("Contact mail failed", error);
    return { sent: false, error: "Съобщението не тръгна. Опитайте отново или пишете на vessache@gmail.com." };
  }

  return { sent: true, error: "" };
}
