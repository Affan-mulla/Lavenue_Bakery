"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import menuData from "../menu-data";

const tagLabels = {
  seasonal: "Seasonal",
  popular: "Popular",
  new: "New",
} as const;

type MenuPageContentProps = {
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  heroSubtitle?: string;
};

export default function MenuPageContent({
  activeCategory,
  onCategorySelect,
  heroSubtitle = "Monday — Saturday, 7:00 AM to 6:00 PM",
}: MenuPageContentProps) {

  const groupedItems = useMemo(() => menuData, []);
  const [expandedVariantItemIds, setExpandedVariantItemIds] = useState<Set<string>>(new Set());

  const expandVariantList = (itemId: string) => {
    setExpandedVariantItemIds((current) => {
      if (current.has(itemId)) {
        return current;
      }

      const next = new Set(current);
      next.add(itemId);
      return next;
    });
  };

  return (
    <main id="menu-page" data-page-content className="wine-surface relative text-[#f3f0ea] opacity-0 ">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1
          data-text-line
          className="font-display-face text-[clamp(72px,12vw,140px)] leading-[0.9] text-[#f3f0ea]"
        >
          Our Menu
        </h1>
        <p
          data-text-line
          className="mt-6 font-mono text-sm uppercase tracking-widest text-[#d8d4cc]/70"
        >
          Handcrafted daily. Ingredients sourced with care.
        </p>
        <span data-menu-hero-line className="mt-6 h-px w-32 bg-[#8ea8ff]" />
        <p data-text-line className="mt-7 font-display-face text-2xl italic text-[#d8d4cc]/60">
          {heroSubtitle}
        </p>
      </section>

      <div
        className="sticky top-0 z-30 border-y border-[#d8d4cc]/12 bg-(--wine-850)/88 backdrop-blur-md transition-[top] duration-300 ease-out"
        style={{ top: "var(--category-sticky-top, 0px)" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-8" aria-label="Menu categories">
          {groupedItems.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                data-magnetic
                data-menu-pill
                data-menu-pill-id={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  document
                    .getElementById(`menu-${category.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="whitespace-nowrap rounded-full border border-[#d8d4cc]/30 px-4 py-2 font-mono text-sm uppercase tracking-widest text-[#d8d4cc]/70 transition-colors duration-300"
                aria-pressed={isActive}
              >
                {category.title}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col px-0 pb-24 sm:px-0">
        {groupedItems.map((category) => (
          <section id={`menu-${category.id}`} key={category.id} data-menu-category className="w-full px-4 py-18 sm:px-8">
            <header>
              <div className="flex items-end justify-between gap-4">
                <div className="overflow-hidden">
                  <h2 data-menu-title className="font-display-face text-[clamp(52px,8vw,96px)] leading-[0.9] text-[#f3f0ea]">
                    {category.title}
                  </h2>
                </div>
                <p className="mb-3 hidden font-mono text-xs uppercase tracking-[0.18em] text-[#d8d4cc]/40 sm:block">
                  {category.items.length} selections
                </p>
              </div>
              {category.subtitle ? (
                <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-[#d8d4cc]/50">
                  {category.subtitle}
                </p>
              ) : null}
              <div className="mt-7 border-t border-[#d8d4cc]/15" />
            </header>

            <div className="mt-3">
              {category.items.map((item) => {
                const variants = item.variants ?? [];
                const hasExpandableVariants = variants.length > 4;
                const isExpanded = expandedVariantItemIds.has(item.id);
                const baseVariants = hasExpandableVariants ? variants.slice(0, 4) : variants;
                const hiddenVariants = hasExpandableVariants ? variants.slice(4) : [];

                return (
                  <article
                    key={item.id}
                    data-fade-up
                    data-menu-item
                    data-item-image={item.image}
                    className="border-b border-[#d8d4cc]/10 px-4 py-7 transition-colors duration-300 sm:px-8"
                  >
                    <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)] md:gap-8">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display-face text-[clamp(22px,2.5vw,34px)] leading-none text-[#f3f0ea]">
                            {item.name}
                          </h3>
                          {item.tag ? (
                            <span className="rounded-full bg-[#8ea8ff]/15 px-2.5 py-1 text-xs uppercase tracking-[0.08em] text-[#8ea8ff]">
                              {tagLabels[item.tag]}
                            </span>
                          ) : null}
                        </div>
                        {item.description ? (
                          <p className="mt-1 max-w-[55ch] font-mono text-sm text-[#d8d4cc]/60">
                            {item.description}
                          </p>
                        ) : null}
                      </div>

                      <div data-menu-price className="w-full md:justify-self-end md:text-right">
                        {variants.length ? (
                          <div className="space-y-2 rounded-xs border border-[#d8d4cc]/12 bg-[#0f1d30]/30 p-3.5">
                            {baseVariants.map((variant) => (
                              <div key={`${item.id}-${variant.label}`} className="flex items-center gap-3">
                                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#d8d4cc]/68">
                                  {variant.label}
                                </span>
                                <span className="h-px flex-1 bg-[#d8d4cc]/15" />
                                <span className="font-display-face text-xl leading-none text-[#f3f0ea]">
                                  {variant.price}
                                </span>
                              </div>
                            ))}

                            {hasExpandableVariants ? (
                              <div
                                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                                  isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                              >
                                <div className="min-h-0 space-y-2 pt-2">
                                  {hiddenVariants.map((variant) => (
                                    <div key={`${item.id}-${variant.label}`} className="flex items-center gap-3">
                                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#d8d4cc]/68">
                                        {variant.label}
                                      </span>
                                      <span className="h-px flex-1 bg-[#d8d4cc]/15" />
                                      <span className="font-display-face text-xl leading-none text-[#f3f0ea]">
                                        {variant.price}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            {hasExpandableVariants && !isExpanded ? (
                              <button
                                type="button"
                                onClick={() => expandVariantList(item.id)}
                                className="mt-2 font-mono text-sm text-[#d8d4cc]/50"
                                aria-label={`Show all ${variants.length} options for ${item.name}`}
                              >
                                Show {hiddenVariants.length} more &rarr;
                              </button>
                            ) : null}
                          </div>
                        ) : (
                          <p className="font-display-face text-[clamp(28px,2.2vw,34px)] leading-none text-[#f3f0ea]">
                            {item.basePrice}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-[#d8d4cc]/10 px-4 pb-24 pt-20 text-center sm:px-8">
        <p className="font-script-face text-[clamp(46px,10vw,94px)] leading-[0.9] text-[#d8d4cc]">Menu changes daily</p>
        <p className="mt-5 font-mono text-sm uppercase tracking-widest text-[#d8d4cc]/65">
          Visit us at 1850 Avenue Road, Toronto
        </p>
        <Link href="/" className="mt-10 inline-flex items-center gap-2 font-display-face text-2xl text-[#f3f0ea]">
          &larr; Back to home
        </Link>
      </section>
    </main>
  );
}