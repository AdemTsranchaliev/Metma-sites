export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="grid items-end gap-6 border-b border-line pb-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className={`display text-[clamp(3rem,6vw,5.4rem)] ${eyebrow ? "mt-3" : ""}`}>{title}</h1>
      </div>
      {lede ? (
        <p className="max-w-md text-lg leading-8 text-muted lg:justify-self-end lg:pb-1">{lede}</p>
      ) : null}
    </header>
  );
}
