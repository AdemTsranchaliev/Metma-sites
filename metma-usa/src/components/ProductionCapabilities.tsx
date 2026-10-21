import { productionImages } from "@/data/content";

export function ProductionCapabilities() {
  const [lead, ...rest] = productionImages;

  return (
    <section id="production" className="bg-[#e8f1ff] py-12 sm:py-16">
      <div className="container-usa grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="eyebrow text-[var(--usa-sky)]">Production</p>
          <h2 className="font-display mt-3 text-4xl text-[var(--usa-navy)]">Our production capabilities</h2>
          <p className="mt-4 max-w-md leading-7 text-[var(--usa-mute)]">
            Our production facilities have a wide range of capabilities for various egg dye products. Among all we have extensive experience in production of Easter egg dyes and packaging.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {lead ? <img src={lead.src} alt={lead.alt} className="col-span-2 h-52 w-full rounded-[1.4rem] object-cover sm:h-64" /> : null}
          {rest.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} className="h-36 w-full rounded-[1.4rem] object-cover sm:h-44" />
          ))}
        </div>
      </div>
    </section>
  );
}
