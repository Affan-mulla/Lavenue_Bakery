import { memo, type RefObject } from "react";
import { motion } from "framer-motion";

type VisitSectionProps = {
  footerBounceRef: RefObject<HTMLElement | null>;
  prefersReducedMotion: boolean;
};

function VisitSection({ footerBounceRef, prefersReducedMotion }: VisitSectionProps) {
  return (
    <section
      id="visit"
      ref={footerBounceRef}
      className="bg-[#edf3ff] px-4 py-24 sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-[28px] border border-[#2f57d8]/15 bg-[linear-gradient(145deg,#254abc,#1b3f9f)] p-8 md:grid-cols-2 md:p-12">
        <div data-reveal="lift">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#d5e0ff]">Visit L&apos;Avenue</p>
          <h2
            className="font-display-face text-5xl leading-[0.95] text-white md:text-6xl"
            data-split-lines
          >
            1850 Avenue Road, Toronto
          </h2>

          <div className="mt-6 flex items-center gap-2" aria-hidden="true">
            <span data-footer-bounce className="h-2.5 w-2.5 rounded-full bg-[#dbe4ff]" />
            <span data-footer-bounce className="h-2.5 w-2.5 rounded-full bg-[#b9cbff]" />
            <span data-footer-bounce className="h-2.5 w-2.5 rounded-full bg-[#8da9ff]" />
          </div>

          <p className="mt-6 text-base leading-8 text-white/84">
            Phone:{" "}
            <a
              className="text-[#dbe4ff] underline decoration-[#dbe4ff]/45 underline-offset-4"
              href="tel:+14163334455"
            >
              (416) 333-4455
            </a>
            <br />
            Email:{" "}
            <a
              className="text-[#dbe4ff] underline decoration-[#dbe4ff]/45 underline-offset-4"
              href="mailto:info@lavenuebakery.com"
            >
              info@lavenuebakery.com
            </a>
          </p>
        </div>

        <motion.div
          data-reveal="lift"
          whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
          className="rounded-2xl border border-white/28 bg-white/12 p-6"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#dbe4ff]">House Recommendation</p>
          <p className="text-lg leading-8 text-white">
            Pair the Pistachio Croissant with an espresso and finish with our Opera for a full L&apos;Avenue
            signature tasting.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#dbe4ff]">
            <span className="h-px flex-1 bg-[#dbe4ff]/40" />
            Royal pairing
            <span className="h-px flex-1 bg-[#dbe4ff]/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(VisitSection);
