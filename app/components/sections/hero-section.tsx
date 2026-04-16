import { memo } from "react";
import Image from "next/image";
import { heroImages } from "../landing-data";

function HeroSection() {
  return (
    <section className="wine-surface relative overflow-hidden pb-16 pt-20  md:pt-36" id="home">
      <div className="w-full">
        <h1
          aria-label="Where every morning begins, where flour, fire and craft make something alive."
          className="mx-auto my-8 text-center font-display-face text-[clamp(48px,8vw,68px)] leading-20 text-[#f3f0ea] sm:my-16"
        >
          <span className="block overflow-hidden">
            <span data-text-line className="block">
              Where every morning <span className="font-semibold italic  text-[#e4e0d8]">begins</span>,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-text-line className="block">where flour, fire and craft</span>
          </span>
          <span className="block overflow-hidden">
            <span data-text-line className="block">
              make something <span className="font-semibold italic  ">alive</span>.
            </span>
          </span>
        </h1>

        <div className="relative  ">
          <p
            aria-hidden="true"
            className="pointer-events-none my-4 overflow-hidden font-display-face text-[clamp(42px,9.5vw,142px)] leading-[0.78] md:absolute md:left-0 md:right-0 md:top-1/2 md:my-0 md:-translate-y-1/2"
          >
            <span data-marquee-loop className="marquee-track block">
              Where craft and comfort meet • Where craft and comfort meet • Where craft and comfort meet •
            </span>
          </p>

          <div className="relative z-10 mx-auto mt-6 flex w-full max-w-6xl flex-col items-center gap-4 px-4 md:mt-40 md:w-[88%] md:grid md:grid-cols-[minmax(0,1fr)_minmax(280px,0.52fr)] md:items-center md:gap-10 md:px-0">
            <div className="flex flex-col gap-4">
              <figure
                className="mask-card relative mx-auto aspect-video w-full overflow-hidden rounded-sm will-change-transform md:mx-0 md:aspect-16/10 md:w-[80%] md:rounded-none"
                data-mask-card
                data-hero-mask="left"
              >
                <Image
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  fill
                  sizes="(min-width: 768px) 46vw, 90vw"
                  className="object-cover"
                  priority={true}
                />
              </figure>

              <p className="mx-auto max-w-sm font-script text-md  font-light tracking-wider md:max-w-xl  md:mx-0" data-fade-up>
               The care behind every loaf and every pastry makes L&apos;Avenue a one-of-a-kind place. We want to give you always different emotions with each visit. It&apos;s not just a bakery, it&apos;s not just a caf&eacute; - it&apos;s all this and much more. A refuge from the city, a place where everyone finds their own comfort.
              </p>
            </div>

            <div className="mt-4 flex w-full justify-center md:mt-0 md:justify-center md:pb-4">
              <figure
                className="mask-card relative mx-auto aspect-3/4 w-[60%] max-w-80 overflow-hidden rounded-t-full will-change-transform md:mt-0 md:aspect-9/16 md:w-full md:max-w-80"
                data-mask-card
                data-hero-mask="right"
              >
                <Image
                  src={heroImages[1].src}
                  alt={heroImages[1].alt}
                  fill
                  sizes="(min-width: 768px) 24vw, 62vw"
                  className="object-cover"
                  loading="eager"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  );
}

  export default memo(HeroSection);
