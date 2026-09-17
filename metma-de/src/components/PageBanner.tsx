type Props = {
  title: string;
  subtitle?: string;
};

export function PageBanner({ title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-[var(--metma-blue)] py-14 text-white md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #6aa0d8 0, transparent 42%), radial-gradient(circle at 85% 80%, #2f6db0 0, transparent 46%)",
        }}
      />
      <div className="container-metma relative z-10 text-center">
        {subtitle ? (
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-white/85">
            {subtitle}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold uppercase tracking-[0.06em] md:text-4xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
