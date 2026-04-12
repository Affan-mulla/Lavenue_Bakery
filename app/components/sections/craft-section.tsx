import { memo } from "react";
import Image from "next/image";
import { galleryImages } from "../landing-data";

function CraftSection() {
  return (
    <section className="paper-surface px-4 py-22 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mx-auto mb-12 h-6 w-6 text-center text-xl leading-none text-[#f53345]" data-spin>
          ✦
        </p>

        <div className="grid gap-5 md:grid-cols-[0.3fr_1fr_0.8fr_0.42fr] md:grid-rows-[220px_290px]">
          <figure className="mask-card relative overflow-hidden border border-[#ccbdb3]" data-mask-card>
            <Image src={galleryImages[0]} alt="Bottled pantry selection." fill sizes="26vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative row-span-2 overflow-hidden border border-[#ccbdb3]" data-mask-card>
            <Image src={galleryImages[1]} alt="Chef plated octopus dish." fill sizes="44vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative row-span-2 overflow-hidden border border-[#ccbdb3]" data-mask-card>
            <Image src={galleryImages[2]} alt="Citrus still life composition." fill sizes="32vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative overflow-hidden border border-[#ccbdb3]" data-mask-card>
            <Image src={galleryImages[3]} alt="Close portrait crop." fill sizes="18vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative overflow-hidden border border-[#ccbdb3]" data-mask-card>
            <Image src={galleryImages[4]} alt="Hand carrying plated dessert." fill sizes="24vw" className="object-cover" />
          </figure>

          <figure className="mask-card relative overflow-hidden border border-[#ccbdb3]" data-mask-card>
            <Image src={galleryImages[5]} alt="Group team portrait." fill sizes="20vw" className="object-cover" />
          </figure>
        </div>

        <div className="mt-8 flex justify-end text-sm text-[#49373a]" data-fade-up>
          <p>Join Nidabao → Diventa una Nidabafellas</p>
        </div>
      </div>
    </section>
  );
}

export default memo(CraftSection);
