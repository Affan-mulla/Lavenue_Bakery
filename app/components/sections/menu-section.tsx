import { memo, type RefObject } from "react";
import Image from "next/image";
import {
  INITIAL_MENU_ITEMS,
  menuEntriesByGroup,
  type MenuEntry,
} from "../landing-data";

type MenuSectionProps = {
  menuSectionRef: RefObject<HTMLElement | null>;
  menuOverlayRef: RefObject<HTMLDivElement | null>;
  menuImageWrapRef: RefObject<HTMLDivElement | null>;
  menuImageOverlayRef: RefObject<HTMLDivElement | null>;
  menuRowsRef: RefObject<HTMLDivElement | null>;
  hoveredEntry: MenuEntry;
  expandedGroups: Record<string, boolean>;
  onMenuItemHover: (entry: MenuEntry) => void;
  onToggleGroupItems: (groupTitle: string) => void;
};

function MenuSection({
  menuSectionRef,
  menuOverlayRef,
  menuImageWrapRef,
  menuImageOverlayRef,
  menuRowsRef,
  hoveredEntry,
  expandedGroups,
  onMenuItemHover,
  onToggleGroupItems,
}: MenuSectionProps) {
  return (
    <section
      ref={menuSectionRef}
      id="menu"
      className="relative overflow-hidden bg-[#f4f8ff] py-24 text-[#142b5f]"
    >
      <div
        ref={menuOverlayRef}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(47,87,216,0.1)_0%,rgba(47,87,216,0)_44%,rgba(47,87,216,0.14)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#2f57d8]" data-reveal="lift">
          Curated Selection
        </p>
        <h2
          className="max-w-[17ch] font-display-face text-5xl leading-[0.95] text-[#10244f] md:text-7xl"
          data-split-lines
        >
          Full-width menu with cinematic hover preview.
        </h2>
        <span className="mt-6 block h-px w-full bg-[#2f57d8]/35" data-reveal="line" />

        <div
          ref={menuImageWrapRef}
          className="relative mt-12 overflow-hidden rounded-[30px] border border-[#2f57d8]/22"
          data-reveal="lift"
        >
          <div className="relative h-[34vh] min-h-[250px] w-full">
            <Image
              src={hoveredEntry.image}
              alt={hoveredEntry.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              ref={menuImageOverlayRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(7,24,78,0.74)_0%,rgba(15,44,130,0.45)_45%,rgba(47,87,216,0.08)_100%)]"
            />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/22 bg-white/12 p-4 backdrop-blur-sm md:p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#dce5ff]">Live Hover Selection</p>
              <h3 className="mt-2 font-display-face text-3xl leading-none text-white md:text-5xl">
                {hoveredEntry.name}
              </h3>
            </div>
          </div>
        </div>

        <div ref={menuRowsRef} className="mt-10 space-y-10" data-reveal="lift">
          {menuEntriesByGroup.map((group) => {
            const isExpanded = expandedGroups[group.title];
            const visibleEntries = isExpanded
              ? group.entries
              : group.entries.slice(0, INITIAL_MENU_ITEMS);
            const hiddenCount = group.entries.length - visibleEntries.length;

            return (
              <section key={group.title} className="border-y border-[#2f57d8]/20">
                <div className="flex items-end justify-between gap-4 px-1 py-4 md:py-5">
                  <h3 className="font-display-face text-4xl leading-none text-[#12306c] md:text-5xl">
                    {group.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#2f57d8]">
                    {group.entries.length} items
                  </p>
                </div>

                <ul>
                  {visibleEntries.map((entry) => {
                    const isActive = hoveredEntry.id === entry.id;

                    return (
                      <li
                        key={entry.id}
                        data-menu-row
                        className="group border-t border-[#2f57d8]/16 first:border-t-0"
                      >
                        <button
                          type="button"
                          onMouseEnter={() => onMenuItemHover(entry)}
                          onFocus={() => onMenuItemHover(entry)}
                          className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-5 px-1 py-6 text-left md:py-8"
                        >
                          <div className="flex min-w-0 items-start gap-4 md:gap-6">
                            <p className="pt-1 text-xs uppercase tracking-[0.2em] text-[#2f57d8]">
                              {String(entry.index).padStart(2, "0")}
                            </p>
                            <div className="min-w-0">
                              <p className="truncate font-display-face text-3xl leading-none text-[#0f2a62] transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                                {entry.name}
                              </p>
                              <p className="mt-2 text-xs uppercase tracking-[0.19em] text-[#2f57d8]">
                                {entry.group}
                              </p>
                              {entry.note ? (
                                <p className="mt-1 text-sm leading-6 text-[#1f3f78]/72">{entry.note}</p>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 md:gap-5">
                            <p className="text-base font-semibold text-[#1f3d7a] md:text-xl">
                              {entry.price}
                            </p>
                            <span
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#2f57d8]/28 text-xs text-[#2f57d8] transition-transform duration-300 ${
                                isActive ? "translate-x-1" : "group-hover:translate-x-1"
                              }`}
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {group.entries.length > INITIAL_MENU_ITEMS ? (
                  <div className="border-t border-[#2f57d8]/16 px-1 py-5">
                    <button
                      type="button"
                      onClick={() => onToggleGroupItems(group.title)}
                      className="inline-flex items-center gap-3 rounded-full border border-[#2f57d8]/28 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1f3d7a] transition-colors hover:border-[#2f57d8]/42 hover:bg-[#eff4ff]"
                    >
                      {isExpanded ? "Show Fewer Items" : `Show ${hiddenCount} More Items`}
                    </button>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(MenuSection);
