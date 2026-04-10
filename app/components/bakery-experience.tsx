"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import {
  INITIAL_MENU_ITEMS,
  menuEntriesByGroup,
  type MenuEntry,
} from "./landing-data";
import LandingHeader from "./sections/landing-header";
import HeroSection from "./sections/hero-section";
import AtelierSection from "./sections/atelier-section";
import MenuSection from "./sections/menu-section";
import CraftSection from "./sections/craft-section";
import VisitSection from "./sections/visit-section";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function BakeryExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const headerShellRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const craftRef = useRef<HTMLElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const menuSectionRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuImageWrapRef = useRef<HTMLDivElement>(null);
  const menuImageOverlayRef = useRef<HTMLDivElement>(null);
  const menuRowsRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const cursorFollowerInnerRef = useRef<HTMLDivElement>(null);
  const footerBounceRef = useRef<HTMLDivElement>(null);

  const [hoveredEntry, setHoveredEntry] = useState<MenuEntry>(menuEntriesByGroup[0].entries[0]);
  const hoveredEntryRef = useRef<MenuEntry>(menuEntriesByGroup[0].entries[0]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(menuEntriesByGroup.map((group) => [group.title, false]))
  );

  const prefersReducedMotion = useReducedMotion();
  const reducedMotionEnabled = Boolean(prefersReducedMotion);

  const handleMenuItemHover = useCallback((entry: MenuEntry) => {
    setHoveredEntry(entry);
  }, []);

  useEffect(() => {
    hoveredEntryRef.current = hoveredEntry;
  }, [hoveredEntry]);

  const toggleGroupItems = useCallback((groupTitle: string) => {
    setExpandedGroups((prev) => {
      const nextExpanded = !prev[groupTitle];

      if (!nextExpanded) {
        const targetGroup = menuEntriesByGroup.find((group) => group.title === groupTitle);
        if (targetGroup) {
          const visibleWhenCollapsed = targetGroup.entries.slice(0, INITIAL_MENU_ITEMS).map((entry) => entry.id);
          if (
            hoveredEntryRef.current.group === groupTitle &&
            !visibleWhenCollapsed.includes(hoveredEntryRef.current.id)
          ) {
            setHoveredEntry(targetGroup.entries[0]);
          }
        }
      }

      return {
        ...prev,
        [groupTitle]: nextExpanded,
      };
    });
  }, []);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    ScrollSmoother.get()?.kill();

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const allowSmoothScroll =
        !prefersReducedMotion &&
        window.matchMedia("(min-width: 1024px) and (hover: hover)").matches;

      if (smoothWrapperRef.current && smoothContentRef.current && allowSmoothScroll) {
        const smoother = ScrollSmoother.create({
          wrapper: smoothWrapperRef.current,
          content: smoothContentRef.current,
          smooth: 0.9,
          smoothTouch: 0,
          effects: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });

        cleanups.push(() => smoother.kill());
      }

      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "max",
            scrub: 0.2,
          },
        });
      }

      if (headerShellRef.current) {
        const stickyTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            headerShellRef.current?.classList.toggle("is-compact", self.scroll() > 48);
          },
        });
        cleanups.push(() => stickyTrigger.kill());
      }

      if (!prefersReducedMotion) {
        const splitInstances: SplitText[] = [];
        const splitHeadings = gsap.utils.toArray<HTMLElement>("[data-split-lines]");

        splitHeadings.forEach((heading) => {
          const split = SplitText.create(heading, {
            type: "lines",
            linesClass: "split-line",
          });

          splitInstances.push(split);
          gsap.set(split.lines, { overflow: "hidden" });

          gsap.fromTo(
            split.lines,
            { yPercent: 115, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.95,
              stagger: 0.08,
              ease: "power4.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 86%",
                once: true,
              },
            }
          );
        });

        cleanups.push(() => {
          splitInstances.forEach((instance) => instance.revert());
        });
      }

      ScrollTrigger.batch("[data-reveal='lift']", {
        start: "top 86%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
            }
          );
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='line']").forEach((item) => {
        gsap.fromTo(
          item,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      const heroVisual = rootRef.current?.querySelector<HTMLElement>("[data-parallax='hero']");
      if (heroVisual && !prefersReducedMotion) {
        gsap.to(heroVisual, {
          yPercent: 12,
          rotate: -2,
          ease: "none",
          scrollTrigger: {
            trigger: heroVisual,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }

      if (menuSectionRef.current && menuOverlayRef.current) {
        gsap.fromTo(
          menuOverlayRef.current,
          { autoAlpha: 0.15, scaleY: 0.65, transformOrigin: "top center" },
          {
            autoAlpha: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: menuSectionRef.current,
              start: "top 78%",
              end: "bottom 30%",
              scrub: 0.65,
            },
          }
        );

        const menuRows = gsap.utils.toArray<HTMLElement>("[data-menu-row]");
        if (menuRows.length > 0) {
          gsap.fromTo(
            menuRows,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: menuSectionRef.current,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      }

      if (menuImageWrapRef.current && menuImageOverlayRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          menuImageWrapRef.current,
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: menuImageWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          menuImageOverlayRef.current,
          { yPercent: 0, autoAlpha: 0.72 },
          {
            yPercent: -22,
            autoAlpha: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: menuImageWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      const craftCards = gsap.utils.toArray<HTMLElement>("[data-craft-step]");
      if (
        craftRef.current &&
        craftCards.length > 0 &&
        !prefersReducedMotion &&
        window.matchMedia("(min-width: 1024px)").matches
      ) {
        gsap.set(craftCards, { opacity: 0.22, y: 28, scale: 0.985 });
        gsap.set(craftCards[0], { opacity: 1, y: 0, scale: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: craftRef.current,
            start: "top top+=100",
            end: "+=980",
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / (craftCards.length - 1),
              duration: { min: 0.15, max: 0.35 },
            },
          },
        });

        craftCards.forEach((card, index) => {
          timeline.to(
            craftCards,
            {
              opacity: 0.22,
              y: 24,
              scale: 0.985,
              duration: 0.35,
              ease: "power2.out",
            },
            index === 0 ? 0 : ">"
          );
          timeline.to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
            },
            "<"
          );
        });
      }

      if (magneticRef.current && !prefersReducedMotion) {
        const magnetic = magneticRef.current;
        const onPointerMove = (event: PointerEvent) => {
          const rect = magnetic.getBoundingClientRect();
          const deltaX = event.clientX - (rect.left + rect.width / 2);
          const deltaY = event.clientY - (rect.top + rect.height / 2);
          const radius = 130;
          if (Math.hypot(deltaX, deltaY) > radius) {
            return;
          }
          gsap.to(magnetic, {
            x: deltaX * 0.22,
            y: deltaY * 0.22,
            duration: 0.24,
            ease: "power3.out",
          });
        };

        const onPointerLeave = () => {
          gsap.to(magnetic, {
            x: 0,
            y: 0,
            duration: 0.55,
            ease: "elastic.out(1, 0.5)",
          });
        };

        magnetic.addEventListener("pointermove", onPointerMove);
        magnetic.addEventListener("pointerleave", onPointerLeave);
        cleanups.push(() => {
          magnetic.removeEventListener("pointermove", onPointerMove);
          magnetic.removeEventListener("pointerleave", onPointerLeave);
        });
      }

      if (
        cursorFollowerRef.current &&
        menuSectionRef.current &&
        menuRowsRef.current &&
        !prefersReducedMotion &&
        window.matchMedia("(hover: hover) and (min-width: 1024px)").matches
      ) {
        const follower = cursorFollowerRef.current;
        const menuSection = menuSectionRef.current;
        const menuRows = menuRowsRef.current;

        gsap.set(follower, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.86 });

        const moveX = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3.out" });
        const moveY = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3.out" });
        const hideFollower = () => {
          gsap.to(follower, {
            autoAlpha: 0,
            scale: 0.86,
            duration: 0.24,
            ease: "power2.out",
          });
        };

        const placeFollowerAtPointer = (event: PointerEvent) => {
          moveX(event.clientX + 28);
          moveY(event.clientY + 18);
        };

        const onMenuPointerMove = (event: PointerEvent) => {
          placeFollowerAtPointer(event);
        };

        const onMenuPointerEnter = (event: PointerEvent) => {
          placeFollowerAtPointer(event);
          gsap.to(follower, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.24,
            ease: "power2.out",
          });
        };

        const onMenuPointerLeave = () => hideFollower();

        const visibilityTrigger = ScrollTrigger.create({
          trigger: menuSection,
          start: "top bottom",
          end: "bottom top",
          onLeave: () => hideFollower(),
          onLeaveBack: () => hideFollower(),
        });

        menuRows.addEventListener("pointermove", onMenuPointerMove);
        menuRows.addEventListener("pointerenter", onMenuPointerEnter);
        menuRows.addEventListener("pointerleave", onMenuPointerLeave);

        cleanups.push(() => {
          menuRows.removeEventListener("pointermove", onMenuPointerMove);
          menuRows.removeEventListener("pointerenter", onMenuPointerEnter);
          menuRows.removeEventListener("pointerleave", onMenuPointerLeave);
          visibilityTrigger.kill();
          gsap.killTweensOf(follower);
          gsap.set(follower, { autoAlpha: 0, scale: 0.86 });
        });
      }

      if (footerBounceRef.current && !prefersReducedMotion) {
        gsap.to("[data-footer-bounce]", {
          y: -10,
          duration: 0.92,
          ease: "sine.inOut",
          stagger: 0.14,
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: footerBounceRef.current,
            start: "top 88%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
      }

      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
      cleanups.push(() => cancelAnimationFrame(refreshId));
    }, rootRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !cursorFollowerInnerRef.current) {
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      cursorFollowerInnerRef.current,
      { autoAlpha: 0.45, scale: 1.08 },
      { autoAlpha: 1, scale: 1, duration: 0.36, ease: "power2.out" }
    );

    return () => {
      tl.kill();
    };
  }, [hoveredEntry, prefersReducedMotion]);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen overflow-x-clip bg-[radial-gradient(120%_90%_at_12%_0%,#ffffff_0%,#eef4ff_48%,#e4edff_100%)] text-[#10254f]"
    >
      <div className="pointer-events-none fixed left-0 top-0 z-50 h-1 w-full" aria-hidden="true">
        <span
          ref={progressRef}
          className="block h-full w-full origin-left bg-[linear-gradient(90deg,#2849cb,#4c70ff,#86a0ff)]"
        />
      </div>

      <LandingHeader headerShellRef={headerShellRef} magneticRef={magneticRef} />

      <div ref={smoothWrapperRef} id="smooth-wrapper">
        <div ref={smoothContentRef} id="smooth-content">
          <main id="home" className="pb-20 pt-28 md:pt-32">
            <HeroSection prefersReducedMotion={reducedMotionEnabled} />
            <AtelierSection prefersReducedMotion={reducedMotionEnabled} />
            <MenuSection
              menuSectionRef={menuSectionRef}
              menuOverlayRef={menuOverlayRef}
              menuImageWrapRef={menuImageWrapRef}
              menuImageOverlayRef={menuImageOverlayRef}
              menuRowsRef={menuRowsRef}
              hoveredEntry={hoveredEntry}
              expandedGroups={expandedGroups}
              onMenuItemHover={handleMenuItemHover}
              onToggleGroupItems={toggleGroupItems}
            />
            <CraftSection craftRef={craftRef} />
            <VisitSection
              footerBounceRef={footerBounceRef}
              prefersReducedMotion={reducedMotionEnabled}
            />
          </main>
        </div>
      </div>

      <div
        ref={cursorFollowerRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden w-[230px] overflow-hidden rounded-2xl border border-[#2f57d8]/28 bg-[#ebf2ff] lg:block"
        aria-hidden="true"
      >
        <div ref={cursorFollowerInnerRef} className="relative aspect-[4/5] w-full">
          <Image
            src={hoveredEntry.image}
            alt={hoveredEntry.name}
            fill
            sizes="230px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,41,107,0.06)_0%,rgba(14,41,107,0.78)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#dce5ff]">{hoveredEntry.group}</p>
            <p className="mt-1 line-clamp-2 font-display-face text-2xl leading-none text-white">
              {hoveredEntry.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
