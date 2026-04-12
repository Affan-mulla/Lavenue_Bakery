import { memo } from "react";
import Image from "next/image";
import { heroImages } from "../landing-data";

function HeroSection() {
  return (
    <section className="wine-surface relative overflow-hidden pb-16 pt-28  md:pt-36" id="home">
      <div className="w-full">
        <h1 className="mx-auto my-16 text-center font-display-face text-[clamp(44px,8.2vw,88px)] leading-[0.86] text-[#f3e8de]">
          <span className="block overflow-hidden">
            <span data-text-line className="block">
              Where the ideas <span className="font-semibold italic  text-[#f3ddd2]">thrive</span>,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-text-line className="block">where kitchen and beer yes</span>
          </span>
          <span className="block overflow-hidden">
            <span data-text-line className="block">
              they merge for become <span className="font-semibold italic  ">alive</span>.
            </span>
          </span>
        </h1>

        <div className="relative  ">
          <p className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 overflow-hidden font-display-face text-[clamp(58px,9.5vw,142px)] leading-[0.78] ">
            <span data-marquee-loop className="marquee-track block">
              Where kitchen and looking • Where kitchen and looking • Where kitchen and looking •
            </span>
          </p>

          <div className="relative z-10 mx-auto mt-6 grid w-[92%] max-w-6xl gap-2 md:mt-40 md:w-[88%] md:grid-cols-[minmax(0,1fr)_minmax(280px,0.52fr)] md:items-center md:gap-10">
            <div className="flex flex-col gap-2">
              <figure
                className="mask-card relative mx-auto aspect-16/10 w-[80%] overflow-hidden will-change-transform md:mx-0  "
                data-mask-card
                data-hero-mask="left"
              >
                <Image
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  fill
                  sizes="(min-width: 768px) 46vw, 90vw"
                  className="object-cover"
                  priority
                />
              </figure>

              <p className="mx-auto max-w-xl font-script text-md  font-light tracking-wider  md:mx-0" data-fade-up>
               The quality of the ingredients, along with the wide selection of beers, makes the Nidaba a one-of-a-kind place. We want to give you always different emotions with each visit. It's not just a place, it's not just a beer house, it's not just a pub. It's all this and much more. A refuge away from the disturbances of the city, a place where everyone can find their own well-being.
              </p>
            </div>

            <div className="flex justify-end md:justify-center md:pb-4">
              <figure
                className="mask-card relative aspect-9/16 w-[62%] max-w-80 overflow-hidden rounded-t-full will-change-transform md:mt-0 md:w-full md:max-w-80"
                data-mask-card
                data-hero-mask="right"
              >
                <Image
                  src={heroImages[1].src}
                  alt={heroImages[1].alt}
                  fill
                  sizes="(min-width: 768px) 24vw, 62vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 text-sm tracking-[0.04em] text-[#e9d7c8]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#f5e4d6]/40">
            ⦿
          </span>
          <p data-fade-up>Discover the menu</p>
          <p className="text-[#f5d2c7]/90" data-fade-up>
            24 luglio, Venezia 8
          </p>
        </div>
      </div>
     
    </section>
  );
}

export default memo(HeroSection);
