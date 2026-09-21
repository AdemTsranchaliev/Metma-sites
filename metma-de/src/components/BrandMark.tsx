const bounce = [-3, 2, -1, 3, -2] as const;

type Variant = "soft" | "comic" | "flat";

type Props = {
  className?: string;
  variant?: Variant;
  as?: "h1" | "h2" | "span";
};

const variantClass: Record<Variant, string> = {
  soft: "brand-mark brand-mark--soft",
  comic: "brand-mark brand-mark--comic",
  flat: "brand-mark brand-mark--flat",
};

export function BrandMark({
  className = "",
  variant = "comic",
  as: Tag = "span",
}: Props) {
  const letters = "METMA".split("");

  if (variant === "comic") {
    return (
      <Tag
        className={`${variantClass.comic} ${className}`}
        aria-label="METMA"
      >
        {letters.map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            className="brand-mark__letter"
            style={{
              transform: `rotate(${bounce[i] ?? 0}deg) translateY(${i % 2 === 0 ? "-0.02em" : "0.03em"})`,
            }}
          >
            {letter}
          </span>
        ))}
      </Tag>
    );
  }

  return <Tag className={`${variantClass[variant]} ${className}`}>METMA</Tag>;
}
