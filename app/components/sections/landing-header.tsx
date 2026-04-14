"use client";

import { memo, type RefObject, useState } from "react";

type LandingHeaderProps = {
  // Optional shell ref lets BakeryExperience toggle compact header state on scroll.
  headerRef?: RefObject<HTMLElement | null>;
};

function LandingHeader({ headerRef }: LandingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-8">
      <nav
        className="mx-auto my-8 flex w-full items-start justify-between  transition-all duration-300"
      >
        <div data-adaptive-ink className="hidden items-center gap-6 md:flex md:gap-10">
          <a className="font-display-face text-2xl leading-none" href="#menu">
            Menu
          </a>
          <a className="font-display-face text-2xl leading-none" href="#philosophy">
            Philosophy
          </a>
        </div>

        <a
          data-adaptive-ink
          className="hidden items-center justify-center rounded-full px-2 font-display-face text-2xl leading-none md:inline-flex"
          href="#visit"
        >
          Book
        </a>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-overlay"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="relative ml-auto inline-flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span
            className={`absolute h-0.5 w-7 bg-[#f2dfd2] transition-transform duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-2"}`}
          />
          <span
            className={`absolute h-0.5 w-7 bg-[#f2dfd2] transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-0.5 w-7 bg-[#f2dfd2] transition-transform duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </nav>

      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-60 flex items-center justify-center bg-wine-950 bg-(--wine-950) transition-all duration-300 md:hidden ${isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          <a
            className="font-display-face text-[clamp(2.4rem,10vw,4.4rem)] leading-none"
            href="#menu"
            onClick={closeMenu}
          >
            Menu
          </a>
          <a
            className="font-display-face text-[clamp(2.4rem,10vw,4.4rem)] leading-none"
            href="#philosophy"
            onClick={closeMenu}
          >
            Philosophy
          </a>
          <a
            className="font-display-face text-[clamp(2.4rem,10vw,4.4rem)] leading-none"
            href="#visit"
            onClick={closeMenu}
          >
            Book
          </a>
        </div>
      </div>
    </header>
  );
}

export default memo(LandingHeader);
