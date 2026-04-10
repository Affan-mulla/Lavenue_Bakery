import { memo } from "react";
import { motion } from "framer-motion";

type HeroSectionProps = {
  prefersReducedMotion: boolean;
};

function HeroSection({ prefersReducedMotion }: HeroSectionProps) {
  return (
    <section className="px-4 pb-24 pt-8 sm:px-6 lg:px-10">
      <motion.div
        data-parallax="hero"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 26 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex min-h-[72vh] w-full max-w-7xl items-center justify-center overflow-hidden rounded-[30px] border border-white/20 shadow-[0_32px_72px_rgba(10,18,37,0.26)]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=1800')",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,30,0.42)_0%,rgba(8,14,30,0.68)_58%,rgba(8,14,30,0.78)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-16 text-center sm:px-10 md:py-24">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/90"
          >
            Yorkville, Toronto
          </motion.p>

          <h1
            className="max-w-[14ch] font-display-face text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl"
            aria-label="Royal mornings crafted by hand"
            data-split-lines
          >
            Royal mornings, crafted by hand.
          </h1>

          <p className="mt-6 max-w-[56ch] text-base leading-7 text-white/84 md:text-lg md:leading-8" data-reveal="lift">
            An elegant bakery and cafe where artisan bread, laminated pastry, and coffee rituals meet
            timeless hospitality.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4" data-reveal="lift">
            <motion.a
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="inline-flex h-12 items-center rounded-full bg-white px-8 text-sm font-semibold uppercase tracking-[0.12em] text-[#10244e] transition-colors hover:bg-[#eff4ff]"
              href="#menu"
            >
              Explore Pastries
            </motion.a>

            <a
              className="inline-flex h-12 items-center rounded-full border border-white/60 px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white/12"
              href="#visit"
            >
              Plan Your Visit
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(HeroSection);
