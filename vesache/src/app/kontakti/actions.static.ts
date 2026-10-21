export type InquiryState = {
  sent: boolean;
  error: string;
  openedMail?: boolean;
};

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

/** Static hosting has no mail server, so the visitor's mail app sends the message. */
export async function sendInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  if (clean(formData.get("website"), 200)) return { sent: true, error: "" };

  const name = clean(formData.get("name"), 80);
  const email = clean(formData.get("email"), 120);
  const phone = clean(formData.get("phone"), 30);
  const message = clean(formData.get("message"), 1500);
  const product = clean(formData.get("product"), 160);

  if (name.length < 2) return { sent: false, error: "Напишете име." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { sent: false, error: "Напишете валиден имейл, за да можем да отговорим." };
  if (phone && !/^[0-9+().\-\s]{5,30}$/.test(phone)) return { sent: false, error: "Телефонът изглежда непълен." };
  if (message.length < 3) return { sent: false, error: "Напишете съобщение." };

  const subject = (product ? `Запитване: ${product}` : "Запитване от сайта").replace(/[\r\n]/g, " ");
  const body = [`Име: ${name}`, `Имейл: ${email}`, phone ? `Телефон: ${phone}` : null, product ? `Продукт: ${product}` : null, "", message]
    .filter((line) => line !== null)
    .join("\n");

  window.location.href = `mailto:vessache@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { sent: true, error: "", openedMail: true };
}
