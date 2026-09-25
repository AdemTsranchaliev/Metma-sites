import type { Faq } from "@/data/faq";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <span aria-hidden className="text-xl leading-none text-brand transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-lg pb-4 text-sm leading-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
