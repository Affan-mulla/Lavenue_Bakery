import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "../landing-data";

function CraftSection() {
  return (
    <section id="gallery" className="paper-surface px-4 py-12 sm:px-8 sm:py-22">
      <div className="mx-auto w-full max-w-7xl">
        <p aria-hidden="true" className="mx-auto mb-12 h-6 w-6 text-center text-4xl leading-none text-[#8ea8ff]" data-spin>
          ✦
        </p>

        <div className="text-4xl leading-tight sm:text-5xl md:text-6xl" data-fade-up>
          <h1 className="font-display">Follow us on Instagram</h1>
          <a
            href="https://www.instagram.com/lavenuebakery"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow L'Avenue Boulangerie on Instagram"
            data-magnetic
            className="italic"
          >
            @lavenuebakery
          </a>
        </div>

        <div className="relative mt-8 grid auto-rows-[10rem] grid-cols-2 gap-2 sm:auto-rows-[9.5rem] sm:grid-cols-3 sm:gap-4 md:block md:h-168 lg:h-176">
          <figure className="mask-card relative col-span-1 row-span-1 overflow-hidden sm:col-start-1 sm:row-start-1 md:absolute md:left-[12%] md:top-[10%] md:h-48 md:w-42 lg:left-[12.5%] lg:top-[11%] lg:h-51 lg:w-46" data-mask-card data-cursor-expand="true">
            <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill sizes="(max-width: 768px) 50vw, 13vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative col-span-1 row-span-2 overflow-hidden sm:col-span-2 sm:row-span-2 sm:col-start-2 sm:row-start-1 md:absolute md:left-[27%] md:top-[16%] md:h-102 md:w-90 lg:left-[30%] lg:top-[18%] lg:h-110 lg:w-101" data-mask-card data-cursor-expand="true">
            <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill sizes="(max-width: 768px) 100vw, 44vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative col-span-1 row-span-2 overflow-hidden sm:col-start-3 sm:row-start-3 md:absolute md:left-[60%] md:top-[15%] md:h-76 md:w-68 lg:left-[62.5%] lg:top-[15.5%] lg:h-84 lg:w-76" data-mask-card data-cursor-expand="true">
            <Image src={galleryImages[2].src} alt={galleryImages[2].alt} fill sizes="(max-width: 768px) 50vw, 32vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative col-span-1 row-span-1 overflow-hidden sm:col-start-3 sm:row-start-1 md:absolute md:right-[7%] md:top-[6%] md:h-38 md:w-32 lg:right-[2%] lg:top-[4.5%] lg:h-41 lg:w-34" data-mask-card data-cursor-expand="true">
            <Image src={galleryImages[3].src} alt={galleryImages[3].alt} fill sizes="(max-width: 768px) 50vw, 18vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative col-span-1 row-span-2 overflow-hidden sm:col-start-1 sm:row-start-2 md:absolute md:left-[1%] md:top-[33%] md:h-72 md:w-66 lg:left-[0.5%] lg:top-[32.5%] lg:h-73 lg:w-74" data-mask-card data-cursor-expand="true">
            <Image src={galleryImages[4].src} alt={galleryImages[4].alt} fill sizes="(max-width: 768px) 100vw, 24vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative col-span-1 row-span-1 overflow-hidden sm:col-start-3 sm:row-start-4 md:absolute md:right-[0%] md:top-[56%] md:h-36 md:w-42 lg:right-[0.5%] lg:top-[55%] lg:h-38 lg:w-46" data-mask-card data-cursor-expand="true">
            <Image src={galleryImages[5].src} alt={galleryImages[5].alt} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
          </figure>
        </div>

        <div className="mt-6" data-fade-up>
          <Link href="/gallery" data-magnetic className="inline-flex items-center gap-2 font-display-face text-xl text-[#1a2738]">
            <span>View full gallery</span>
            <span aria-hidden="true" className="text-[#8ea8ff]">
              &rarr;
            </span>
          </Link>
        </div>

        <div className="mt-8 flex justify-center text-sm text-[#24364a] lg:justify-end" data-fade-up>
          <p className="inline-flex items-center gap-3 font-display text-[1.2rem] tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#637386] text-sm leading-none">→</span>
            <span>
              Join the L&apos;Avenue community <span aria-hidden="true" className="text-[#8ea8ff]">✦</span> Follow @lavenuebakery for daily bakes
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(CraftSection);
