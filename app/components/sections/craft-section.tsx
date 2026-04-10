import { memo, type RefObject } from "react";
import { processSteps } from "../landing-data";

type CraftSectionProps = {
  craftRef: RefObject<HTMLElement | null>;
};

function CraftSection({ craftRef }: CraftSectionProps) {
  return (
    <section
      ref={craftRef}
      id="craft"
      className="bg-[linear-gradient(150deg,#2448b8,#173890)] px-4 py-24 sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#d5e0ff]" data-reveal="lift">
            Craft Process
          </p>

          <h2
            className="font-display-face text-5xl leading-[0.95] text-white md:text-6xl"
            data-split-lines
          >
            Precision from flour to final glaze.
          </h2>

          <p className="mt-6 max-w-[52ch] text-base leading-8 text-white/85" data-reveal="lift">
            Our process is deliberate and calm. Each movement is designed for texture, aroma, and a finish
            that feels worthy of the table.
          </p>
        </div>

        <div className="grid gap-4">
          {processSteps.map((step, index) => (
            <article
              className="rounded-2xl border border-white/28 bg-white/10 p-6 backdrop-blur-sm"
              data-craft-step
              key={step.title}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[#dbe4ff]">0{index + 1}</p>
              <h3 className="mt-3 font-display-face text-3xl text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/82">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(CraftSection);
