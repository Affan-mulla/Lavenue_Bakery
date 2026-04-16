"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, type MouseEvent, type RefObject, useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  variant: "home" | "inner";
  headerRef?: RefObject<HTMLElement | null>;
};

function SiteHeader({ variant, headerRef }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerVisibleRef = useRef(true);
  const navRef = useRef<HTMLElement>(null);
  const isOnHome = pathname === "/";
  const isMenuActive = pathname === "/menu";
  const isGalleryActive = pathname === "/gallery";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setIsMenuOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    headerVisibleRef.current = true;

    const resetHeaderVisibilityRafId = window.requestAnimationFrame(() => {
      setIsHeaderVisible(true);
    });

    const onScroll = () => {
      if (isMenuOpen) {
        if (!headerVisibleRef.current) {
          setIsHeaderVisible(true);
          headerVisibleRef.current = true;
        }
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (Math.abs(scrollDelta) < 2) {
        return;
      }

      const shouldShow = currentScrollY <= 16 || scrollDelta < 0;
      const shouldHide = scrollDelta > 0 && currentScrollY > 56;

      if (shouldShow && !headerVisibleRef.current) {
        setIsHeaderVisible(true);
        headerVisibleRef.current = true;
      }

      if (shouldHide && headerVisibleRef.current) {
        setIsHeaderVisible(false);
        headerVisibleRef.current = false;
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(resetHeaderVisibilityRafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const setStickyOffset = () => {
      const root = document.documentElement;

      if (!(isHeaderVisible || isMenuOpen)) {
        root.style.setProperty("--category-sticky-top", "0px");
        return;
      }

      const navHeight = navRef.current?.offsetHeight ?? 0;
      const stickyOffset = Math.max(0, Math.round(navHeight + 40));
      root.style.setProperty("--category-sticky-top", `${stickyOffset}px`);
    };

    setStickyOffset();
    window.addEventListener("resize", setStickyOffset);

    return () => {
      window.removeEventListener("resize", setStickyOffset);
    };
  }, [isHeaderVisible, isMenuOpen, pathname]);

  const handleWordmarkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (variant === "home") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHomeSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: "menu" | "philosophy" | "visit") => {
    if (!isOnHome) {
      return;
    }

    event.preventDefault();
    closeMenu();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItemBaseClass =
    "font-display-face text-2xl leading-none relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-current after:origin-center after:scale-x-0 after:transition-transform after:duration-300";

  const getNavItemClass = (isActive: boolean) =>
    `${navItemBaseClass} ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`;

  const shellClass = isHeaderVisible || isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0";

  return (
    <header
      ref={variant === "home" ? headerRef : undefined}
      className={`fixed inset-x-0 top-0 z-40 px-4 pt-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 ${shellClass}`}
    >
      <nav
        ref={navRef}
        className="relative mx-auto mt-4 flex w-full max-w-7xl items-center justify-between rounded-full border border-[#d8d4cc]/20 bg-(--wine-950)/62 px-5 py-4 backdrop-blur-md transition-all duration-300 sm:px-8"
      >
        <div data-adaptive-ink className="hidden items-center gap-6 md:flex md:gap-10">
          
           
            <>
              <Link className={getNavItemClass(isMenuActive)} href="/menu">
                Menu
              </Link>
              <Link className={getNavItemClass(isGalleryActive)} href="/gallery">
                Gallery
              </Link>
            </>
          
        </div>

        <Link
          data-adaptive-ink
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-display-face text-2xl leading-none md:block"
          href="/"
          onClick={handleWordmarkClick}
        >
          L&apos;Avenue
        </Link>

        <Link
          data-adaptive-ink
          data-magnetic
          className="hidden items-center justify-center rounded-full px-2 font-display-face text-2xl leading-none md:inline-flex"
          href="/#visit"
          onClick={(event) => {
            if (isOnHome) {
              handleHomeSectionClick(event, "visit");
            }
          }}
        >
          Book
        </Link>
      </nav>

      <button
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-overlay"
        onClick={() => setIsMenuOpen((open) => !open)}
        className="fixed right-5 top-5 z-50 inline-flex h-11 w-11 items-center justify-center text-[#d8d4cc] md:hidden"
      >
        <span
          className={`absolute h-0.5 w-7 bg-[#d8d4cc] transition-transform duration-300 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-2"}`}
        />
        <span
          className={`absolute h-0.5 w-7 bg-[#d8d4cc] transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`absolute h-0.5 w-7 bg-[#d8d4cc] transition-transform duration-300 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-2"}`}
        />
      </button>

      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-40 flex items-center justify-center bg-(--wine-950) transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-10 text-center">
          <Link
            data-adaptive-ink
            className={`font-display-face text-[clamp(2.5rem,10vw,4rem)] leading-none text-[#f3f0ea] transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100 animate-[mobileNavLinkIn_340ms_ease-out_forwards]" : "translate-y-2 opacity-0"}`}
            href="/menu"
            onClick={closeMenu}
            style={{ animationDelay: isMenuOpen ? "60ms" : "0ms" }}
          >
            Menu
          </Link>
          <Link
            data-adaptive-ink
            className={`font-display-face text-[clamp(2.5rem,10vw,4rem)] leading-none text-[#f3f0ea] transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100 animate-[mobileNavLinkIn_340ms_ease-out_forwards]" : "translate-y-2 opacity-0"}`}
            href="/gallery"
            onClick={closeMenu}
            style={{ animationDelay: isMenuOpen ? "140ms" : "0ms" }}
          >
            Gallery
          </Link>
          <Link
            data-adaptive-ink
            data-magnetic
            className={`font-display-face text-[clamp(2.5rem,10vw,4rem)] leading-none text-[#f3f0ea] transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100 animate-[mobileNavLinkIn_340ms_ease-out_forwards]" : "translate-y-2 opacity-0"}`}
            href="/#visit"
            onClick={closeMenu}
            style={{ animationDelay: isMenuOpen ? "220ms" : "0ms" }}
          >
            Book
          </Link>
        </div>
      </div>

    </header>
  );
}

export default memo(SiteHeader);