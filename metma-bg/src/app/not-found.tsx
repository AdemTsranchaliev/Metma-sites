import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <p className="text-sm font-semibold text-brand-deep">404</p>
      <h1 className="display mt-3 text-5xl">Страницата липсва</h1>
      <p className="mt-4 text-muted">Адресът не отговаря на страница от сайта.</p>
      <Link href="/" className="btn mt-8">
        Към началото
      </Link>
    </div>
  );
}
