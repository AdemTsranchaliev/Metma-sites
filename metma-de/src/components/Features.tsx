import { Reveal } from "@/components/Reveal";

const features = [
  {
    title: "Eierfarben International",
    text: "Unsere Eierfarben sind in allen Ländern erhältlich. Senden Sie uns eine Anfrage für weitere Informationen!",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white" aria-hidden>
        <path d="M12 2a5 5 0 015 5v1h1a4 4 0 010 8h-1v1a5 5 0 01-10 0v-1H6a4 4 0 010-8h1V7a5 5 0 015-5zm-3 8H6a2 2 0 000 4h3v-4zm6 0v4h3a2 2 0 000-4h-3zM9 7v1h6V7a3 3 0 00-6 0zm0 10v1a3 3 0 006 0v-1H9z" />
      </svg>
    ),
  },
  {
    title: "Haben Sie eine Frage?",
    text: "Senden Sie uns eine E-Mail und unsere freundlichen Mitarbeiter werden Ihnen bald antworten!",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white" aria-hidden>
        <path d="M4 4h12a3 3 0 013 3v8a3 3 0 01-3 3H9l-5 4v-4H4a3 3 0 01-3-3V7a3 3 0 013-3zm14 4h2a3 3 0 013 3v8a3 3 0 01-3 3h-1v3l-4-3h-5a2.9 2.9 0 01-1-.2 5 5 0 004.2-.8H16l2 1.5V19h2a1 1 0 001-1v-8a1 1 0 00-1-1h-2V8z" />
      </svg>
    ),
  },
  {
    title: "Das perfekte Osterei",
    text: "Unser Ziel ist es, die höchstmögliche Qualität für Ihren Ostereier zu gewährleisten!",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white" aria-hidden>
        <path d="M12 2c4.4 0 8 5.4 8 10.5S16.4 22 12 22 4 17.6 4 12.5 7.6 2 12 2zm0 2.2c-3.2 0-5.8 4.1-5.8 8.3S8.8 19.8 12 19.8s5.8-2.9 5.8-7.3S15.2 4.2 12 4.2zm-2.2 4.3l.9.9 1.3-1.3 1.3 1.3.9-.9-1.3-1.3.9-.9-.9-.9-1.3.9-1.3-.9-.9.9.9.9-1.3 1.3z" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-metma grid gap-12 md:grid-cols-3 md:gap-8">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delayMs={i * 120} as="article">
            <div className="feature-card group text-center">
              <div className="feature-icon mx-auto mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[var(--metma-blue)] shadow-[0_8px_18px_rgba(74,132,196,0.35)]">
                {feature.icon}
              </div>
              <h3 className="text-[20px] font-semibold text-[var(--metma-orange)] transition duration-300 group-hover:tracking-wide">
                {feature.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-relaxed text-[#555]">
                {feature.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
