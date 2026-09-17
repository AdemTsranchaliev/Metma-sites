import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          {siteConfig.domain}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600">
          Frontend skeleton for the Bulgarian Metma site. Content and products
          will come from the shared ASP.NET Core API (`siteCode={siteConfig.code}`).
        </p>
      </div>
    </main>
  );
}
