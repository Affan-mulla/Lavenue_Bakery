import { memo } from "react";
import { motion } from "framer-motion";

type AtelierSectionProps = {
  prefersReducedMotion: boolean;
};

const atelierItems = [
  {
    title: "Fresh Daily",
    text: "Small-batch baking begins at dawn, seven days a week.",
  },
  {
    title: "Craft Lamination",
    text: "Layered by hand for controlled crispness and softness.",
  },
  {
    title: "Cafe Warmth",
    text: "A neighborhood room for coffee, conversation, and calm.",
  },
];

function AtelierSection({ prefersReducedMotion }: AtelierSectionProps) {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-10" id="atelier">
      <div className="mx-auto w-full max-w-7xl rounded-[28px] border border-[#2f57d8]/16 bg-white/72 p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {atelierItems.map((item) => (
            <motion.article
              key={item.title}
              whileHover={prefersReducedMotion ? undefined : { y: -6, rotateX: 3 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-[#2f57d8]/16 bg-white p-6"
              data-reveal="lift"
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="mb-3 font-display-face text-3xl text-[#1c3671]">{item.title}</p>
              <p className="text-sm leading-7 text-[#244078]/76">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(AtelierSection);
