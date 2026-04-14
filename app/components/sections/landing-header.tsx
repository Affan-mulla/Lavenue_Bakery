"use client";

import { memo, type RefObject, useEffect, useState } from "react";

type LandingHeaderProps = {
  // Optional shell ref lets BakeryExperience toggle compact header state on scroll.
  headerRef?: RefObject<HTMLElement | null>;
};

function LandingHeader({ headerRef }: LandingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

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
          data-magnetic
          className="hidden items-center justify-center rounded-full px-2 font-display-face text-2xl leading-none md:inline-flex"
          href="#visit"
        >
          Book
        </a>

      </nav>

      <button
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-overlay"
        onClick={() => setIsMenuOpen((open) => !open)}
        className="fixed right-5 top-5 z-50 inline-flex h-11 w-11 items-center justify-center text-[#f2dfd2] md:hidden"
      >
        <span
          className={`absolute h-0.5 w-7 bg-[#f2dfd2] transition-transform duration-300 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-2"}`}
        />
        <span
          className={`absolute h-0.5 w-7 bg-[#f2dfd2] transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`absolute h-0.5 w-7 bg-[#f2dfd2] transition-transform duration-300 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-2"}`}
        />
      </button>

      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-40 flex items-center justify-center bg-(--wine-950) transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-10 text-center">
          <a
            className={`font-display-face text-[clamp(2.5rem,10vw,4rem)] leading-none text-[#f3e8de] transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100 animate-[mobileNavLinkIn_340ms_ease-out_forwards]" : "translate-y-2 opacity-0"}`}
            href="#menu"
            onClick={closeMenu}
            style={{ animationDelay: isMenuOpen ? "60ms" : "0ms" }}
          >
            Menu
          </a>
          <a
            className={`font-display-face text-[clamp(2.5rem,10vw,4rem)] leading-none text-[#f3e8de] transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100 animate-[mobileNavLinkIn_340ms_ease-out_forwards]" : "translate-y-2 opacity-0"}`}
            href="#philosophy"
            onClick={closeMenu}
            style={{ animationDelay: isMenuOpen ? "140ms" : "0ms" }}
          >
            Philosophy
          </a>
          <a
            data-magnetic
            className={`font-display-face text-[clamp(2.5rem,10vw,4rem)] leading-none text-[#f3e8de] transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100 animate-[mobileNavLinkIn_340ms_ease-out_forwards]" : "translate-y-2 opacity-0"}`}
            href="#visit"
            onClick={closeMenu}
            style={{ animationDelay: isMenuOpen ? "220ms" : "0ms" }}
          >
            Book
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes mobileNavLinkIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}

export default memo(LandingHeader);
