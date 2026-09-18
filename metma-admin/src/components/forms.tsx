"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Pencil, Trash2, X } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-[var(--admin-rose)] text-white shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:bg-[var(--admin-rose-deep)]"
      : variant === "secondary"
        ? "border border-[var(--admin-line)] bg-white text-[var(--admin-ink)] hover:border-[var(--admin-rose)] hover:text-[var(--admin-rose-deep)]"
        : variant === "danger"
          ? "bg-red-600 text-white hover:bg-red-700"
          : "text-[var(--admin-mute)] hover:bg-[var(--admin-sand)] hover:text-[var(--admin-ink)]";

  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function RowActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <Button
        variant="ghost"
        className="!min-h-10 !px-2.5 !py-2"
        onClick={onEdit}
        aria-label="Редакция"
      >
        <Pencil className="h-4 w-4" strokeWidth={2} />
        <span className="hidden md:inline">Редакция</span>
      </Button>
      <Button
        variant="ghost"
        className="!min-h-10 !px-2.5 !py-2"
        onClick={onDelete}
        aria-label="Изтрий"
      >
        <Trash2 className="h-4 w-4" strokeWidth={2} />
        <span className="hidden md:inline">Изтрий</span>
      </Button>
    </div>
  );
}

export function Modal({
  title,
  children,
  footer,
  onClose,
  wide,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#1c1917]/50 backdrop-blur-[2px]"
        aria-label="Затвори"
        onClick={onClose}
      />
      <div
        className={`relative z-10 flex max-h-[min(92dvh,900px)] w-full flex-col overflow-hidden rounded-t-2xl border border-[var(--admin-line)] bg-[var(--admin-paper)] shadow-[0_24px_80px_-20px_rgba(28,25,23,0.5)] sm:rounded-2xl ${
          wide ? "max-w-3xl" : "max-w-xl"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--admin-line)] px-4 py-3.5 sm:px-5 sm:py-4">
          <h3 className="min-w-0 truncate text-base font-semibold tracking-tight sm:text-lg">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[var(--admin-mute)] transition hover:bg-[var(--admin-sand)] hover:text-[var(--admin-ink)]"
            aria-label="Затвори"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
          {children}
        </div>
        {footer ? (
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-[var(--admin-line)] bg-[var(--admin-paper)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end sm:px-5 sm:pb-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--admin-mute)]">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1.5 block text-xs leading-relaxed text-[var(--admin-mute)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-[var(--admin-line)] bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-[var(--admin-mute)]/70 focus:border-[var(--admin-rose)] focus:shadow-[0_0_0_3px_var(--admin-rose-soft)]";

export const textareaClass = `${inputClass} min-h-[110px] resize-y`;
