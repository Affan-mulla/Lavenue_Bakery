"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SiteHeader from "./layout/SiteHeader";
import HeroSection from "./sections/hero-section";
import AtelierSection from "./sections/atelier-section";
import MenuSection from "./sections/menu-section";
import CraftSection from "./sections/craft-section";
import VisitSection from "./sections/visit-section";
import Bg_Svg from "./Bg_Svg";
import PageLoader from "./PageLoader";

gsap.registerPlugin(ScrollTrigger);

export default function BakeryExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  // Wired into LandingHeader so ScrollTrigger can toggle compact state.
  const headerShellRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    window.sessionStorage.setItem("lavenue-visited", "1");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const hasVisited = window.sessionStorage.getItem("lavenue-visited") === "1";

    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!mainRef.current) {
      return;
    }

    if (isLoading) {
      gsap.set(mainRef.current, { autoAlpha: 0, y: 30 });
      return;
    }

    const revealTween = gsap.fromTo(
      mainRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      revealTween.kill();
    };
  }, [isLoading]);

  useEffect(() => {
    // Remove no-js fallback class as soon as client code is running.
    document.body.classList.remove("no-js");

    if (!rootRef.current) {
      return;
    }

    const cleanups: Array<() => void> = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      });

      const onLenisScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onLenisScroll);

      const onRaf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(onRaf);
      };

      rafId = window.requestAnimationFrame(onRaf);

      cleanups.push(() => {
        window.cancelAnimationFrame(rafId);
        lenis?.destroy();
      });
    }

    const context = gsap.context(() => {
      const backgroundParallaxLayer = rootRef.current?.querySelector<HTMLElement>("[data-bg-parallax]");
      if (backgroundParallaxLayer && !prefersReducedMotion) {
        gsap.fromTo(
          backgroundParallaxLayer,
          { y: 0 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: "#home",
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      if (headerShellRef.current) {
        const headerTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            headerShellRef.current?.classList.toggle("is-compact", self.scroll() > 42);
          },
        });
        cleanups.push(() => headerTrigger.kill());
      }

      const sectionIds = new Set(["home", "philosophy", "menu", "visit"]);
      gsap.utils.toArray<HTMLElement>("section[id]").forEach((section) => {
        if (!sectionIds.has(section.id)) {
          return;
        }

        const entranceChildren = Array.from(section.children).filter((child) => {
          const hasOwnAnimation = child.matches("[data-fade-up], [data-text-line]");
          const hasNestedAnimation = Boolean(child.querySelector("[data-fade-up], [data-text-line]"));
          return !hasOwnAnimation && !hasNestedAnimation;
        });

        if (!entranceChildren.length) {
          return;
        }

        if (prefersReducedMotion) {
          gsap.set(entranceChildren, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          entranceChildren,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      const philosophySurface = rootRef.current?.querySelector<HTMLElement>("#philosophy .paper-surface");
      if (philosophySurface) {
        if (prefersReducedMotion) {
          gsap.set(philosophySurface, { clipPath: "inset(0% 0% 0% 0%)" });
        } else {
          gsap.fromTo(
            philosophySurface,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: "#philosophy",
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      }

      const firstLine = rootRef.current?.querySelector("[data-text-line]");
      if (firstLine) {
        gsap.fromTo(
          "[data-text-line]",
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.2,
            stagger: 0.16,
            ease: "power4.out",
            scrollTrigger: {
              trigger: firstLine,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-fade-up]").forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.84,
            delay: index * 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-slide-up]").forEach((item) => {
        gsap.fromTo(
          item,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.82,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-mask-card]").forEach((card, index) => {
        if (card.dataset.heroMask) {
          return;
        }

        const craftMaskCards = Array.from(
          rootRef.current?.querySelectorAll<HTMLElement>("section.paper-surface figure[data-mask-card]") ?? []
        );
        const craftCardIndex = craftMaskCards.indexOf(card);
        const craftStaggerDelay = craftCardIndex >= 0 ? craftCardIndex * 0.08 : 0;

        const image = card.querySelector("img");

        gsap.to(card, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 1.12,
          delay: craftStaggerDelay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            once: true,
          },
        });

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.17, yPercent: 9 },
            {
              scale: 1,
              yPercent: 0,
              duration: 1.28,
              delay: craftStaggerDelay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                once: true,
              },
            }
          );

          if (!prefersReducedMotion) {

      const menuSection = rootRef.current?.querySelector<HTMLElement>("#menu");
      if (menuSection) {
        const menuCards = Array.from(menuSection.querySelectorAll<HTMLElement>("[data-menu-card]"));

        menuCards.forEach((card, index) => {
          const numberNode = Array.from(card.querySelectorAll<HTMLElement>("p, span")).find((node) =>
            /\(\d{2}\)/.test(node.textContent ?? "")
          );

          if (!numberNode) {
            return;
          }

          const targetValue = Number((numberNode.textContent ?? "").replace(/\D/g, "")) || index + 1;

          if (prefersReducedMotion) {
            numberNode.textContent = `(${String(targetValue).padStart(2, "0")})`;
            return;
          }

          numberNode.textContent = "(00)";
          const counter = { value: 0 };

          gsap.to(counter, {
            value: targetValue,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.2,
            snap: { value: 1 },
            onUpdate: () => {
              numberNode.textContent = `(${String(Math.round(counter.value)).padStart(2, "0")})`;
            },
            scrollTrigger: {
              trigger: menuSection,
              start: "top 80%",
              once: true,
            },
          });
        });
      }
            gsap.to(image, {
              yPercent: index % 2 === 0 ? -8 : -4,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          }
        }
      });

      const leftHeroMask = rootRef.current?.querySelector<HTMLElement>("[data-hero-mask='left']");
      const rightHeroMask = rootRef.current?.querySelector<HTMLElement>("[data-hero-mask='right']");

      if (leftHeroMask) {
        const leftHeroImage = leftHeroMask.querySelector("img");

        gsap.fromTo(
          leftHeroMask,
          { clipPath: "inset(0% 100% 0% 0% round 4px)", autoAlpha: 0.55 },
          {
            clipPath: "inset(0% 0% 0% 0% round 4px)",
            autoAlpha: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: leftHeroMask,
              start: "top 86%",
              once: true,
            },
          }
        );

        if (leftHeroImage && !prefersReducedMotion) {
          gsap.fromTo(
            leftHeroImage,
            { scale: 1.15, yPercent: 0 },
            {
              scale: 1,
              yPercent: 0,
              ease: "power3.out",
              duration: 1.25,
              scrollTrigger: {
                trigger: leftHeroMask,
                start: "top 86%",
                once: true,
              },
            }
          );

          gsap.to(leftHeroMask, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: "#home",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          gsap.to(leftHeroImage, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: "#home",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      }

      if (rightHeroMask) {
        const rightHeroImage = rightHeroMask.querySelector("img");
        const rightFinalClip =
          rightHeroMask.dataset.heroClip ?? "inset(0% 0% 0% 0% round 4px)";
        const rightStartClip = rightFinalClip.includes("round")
          ? rightFinalClip.replace("0% 0% 0% 0%", "0% 0% 100% 0%")
          : "inset(0% 0% 0% 100% round 4px)";

        gsap.fromTo(
          rightHeroMask,
          { clipPath: rightStartClip, autoAlpha: 0.55 },
          {
            clipPath: rightFinalClip,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: rightHeroMask,
              start: "top 80%",
              once: true,
            },
          }
        );

        if (rightHeroImage && !prefersReducedMotion) {
          gsap.fromTo(
            rightHeroImage,
            { scale: 1.14, yPercent: 0 },
            {
              scale: 1,
              yPercent: 0,
              ease: "power3.out",
              duration: 1.2,
              scrollTrigger: {
                trigger: rightHeroMask,
                start: "top 80%",
                once: true,
              },
            }
          );

          gsap.to(rightHeroMask, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: "#home",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          });

          gsap.to(rightHeroImage, {
            yPercent: -34,
            ease: "none",
            scrollTrigger: {
              trigger: "#home",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          });

          gsap.to(rightHeroImage, {
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: "#home",
              start: "top 70%",
              end: "bottom top",
              scrub: 0.95,
              },
            }
          );
        }
      }

      gsap.utils.toArray<SVGElement>("[data-svg-path]").forEach((path) => {
        const drawable = path as unknown as SVGGeometryElement;
        const length = drawable.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.3,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: path,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((item) => {
        gsap.fromTo(
          item,
          { rotate: -25, scale: 0.8, autoAlpha: 0 },
          {
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-marquee-loop]").forEach((track, index) => {
        if (!track.dataset.loopReady) {
          track.textContent = `${track.textContent ?? ""} ${track.textContent ?? ""}`;
          track.dataset.loopReady = "true";
        }

        const distance = Math.max(track.scrollWidth / 2, 480);
        const isLeftward = index % 2 === 0;
        const startX = isLeftward ? 0 : -distance;
        const endX = isLeftward ? -distance : 0;

        gsap.set(track, { x: startX });
        gsap.to(track, {
          x: endX,
          duration: 36 + index * 4,
          ease: "none",
          repeat: -1,
        });
      });

      if (!prefersReducedMotion) {
        gsap.utils.toArray<HTMLElement>("[data-menu-card]").forEach((card) => {
          const textNodes = card.querySelectorAll<HTMLElement>("[data-menu-hover-text]");
          const baseColors = Array.from(textNodes, (node) => getComputedStyle(node).color);
          const hoverColor = "#f63143";

          const onPointerEnter = () => {
            
            gsap.killTweensOf(textNodes);
            gsap.to(textNodes, {
              keyframes: [
                { yPercent: -180, duration: 0.2, ease: "power2.in" },
                { yPercent: 180, duration: 0 },
                { yPercent: 0, duration: 0.26, ease: "power2.out" },
              ],
              stagger: 0.04,
              overwrite: "auto",
            });

            gsap.to(textNodes, {
              color: hoverColor,
              duration: 0.22,
              delay: 0.2,
              ease: "power2.out",
              stagger: 0.04,
              overwrite: "auto",
            });
          };

          const onPointerLeave = () => {
            gsap.killTweensOf(textNodes);
            gsap.to(textNodes, {
              keyframes: [
                { yPercent: 180, duration: 0.2, ease: "power2.in" },
                { yPercent: -180, duration: 0 },
                { yPercent: 0, duration: 0.26, ease: "power2.out" },
              ],
              stagger: 0.04,
              overwrite: "auto",
            });

            gsap.to(textNodes, {
              color: (index: number) => baseColors[index],
              duration: 0.24,
              delay: 0.2,
              ease: "power2.out",
              stagger: 0.04,
              overwrite: "auto",
            });
          };

          card.addEventListener("pointerenter", onPointerEnter);
          card.addEventListener("pointerleave", onPointerLeave);

          cleanups.push(() => {
            card.removeEventListener("pointerenter", onPointerEnter);
            card.removeEventListener("pointerleave", onPointerLeave);
          });
        });
      }

      const reservationTitle = rootRef.current?.querySelector("#visit [data-marquee-loop]");
      if (reservationTitle) {
        const reservationTitleShell = reservationTitle.closest("p");

        if (reservationTitleShell) {
          if (prefersReducedMotion) {
            gsap.set(reservationTitleShell, { x: 0, autoAlpha: 1 });
          } else {
            gsap.fromTo(
              reservationTitleShell,
              { x: 200, autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: "#visit",
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        }

        gsap.to(reservationTitle, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#visit",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, rootRef);

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    cleanups.push(() => window.cancelAnimationFrame(refreshId));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="wine-surface relative min-h-screen overflow-x-clip text-[#f3e8de]">
      {isLoading ? <PageLoader onComplete={handleLoaderComplete} /> : null}

      {/* Pass shell ref so compact-header class toggling actually applies to DOM. */}
      <SiteHeader variant="home" headerRef={headerShellRef} />

      <main ref={mainRef}>
          <div
        data-bg-parallax
        className="pointer-events-none fixed -z-10 inset-0 flex  overflow-hidden -translate-3 scale-[1.2] "
        aria-hidden="true"
      >
        <Bg_Svg className=" w-[max(120%,1200px)] h-auto opacity-40" aria-hidden="true" />
      </div>
        <HeroSection />
        <AtelierSection />
        <MenuSection />
        <CraftSection />
        <VisitSection />
      </main>
    </div>
  );
}
