"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "../components/layout/SiteHeader";
import MenuPageContent from "../components/menu/MenuPageContent";
import MenuImageCursor from "../components/menu/MenuImageCursor";
import menuData from "../components/menu-data";

export default function MenuPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(menuData[0]?.id ?? "breads");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!pageRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    const context = gsap.context(() => {
      const textLines = gsap.utils.toArray<HTMLElement>("[data-text-line]");
      const heroLine = pageRef.current?.querySelector<HTMLElement>("[data-menu-hero-line]");
      const categorySections = gsap.utils.toArray<HTMLElement>("[data-menu-category]");

      if (prefersReducedMotion) {
        gsap.set(pageRef.current, { autoAlpha: 1 });
        gsap.set(textLines, { yPercent: 0, autoAlpha: 1 });
        if (heroLine) {
          gsap.set(heroLine, { scaleX: 1, transformOrigin: "left center" });
        }
        gsap.set("[data-menu-title]", { yPercent: 0, autoAlpha: 1 });
        gsap.set("[data-menu-item]", { autoAlpha: 1, y: 0, backgroundColor: "rgba(255,255,255,0)" });
        gsap.set("[data-menu-price]", { clipPath: "inset(0% 0% 0% 0%)", x: 0 });
      } else {
        gsap.fromTo(
          pageRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }
        );

        gsap.fromTo(
          textLines,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.14,
            ease: "power4.out",
            overwrite: "auto",
          }
        );

        if (heroLine) {
          gsap.fromTo(
            heroLine,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 0.6,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        }

        gsap.utils.toArray<HTMLElement>("[data-menu-title]").forEach((title) => {
          gsap.fromTo(
            title,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              overwrite: "auto",
              scrollTrigger: {
                trigger: title.closest("section") ?? title,
                start: "top 80%",
                once: true,
              },
            }
          );
        });

        categorySections.forEach((section) => {
          const rows = Array.from(section.querySelectorAll<HTMLElement>("[data-menu-item]"));

          rows.forEach((row, index) => {
            const price = row.querySelector<HTMLElement>("[data-menu-price]");

            gsap.fromTo(
              row,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                delay: index * 0.06,
                overwrite: "auto",
                scrollTrigger: {
                  trigger: section,
                  start: "top 75%",
                  once: true,
                },
              }
            );

            if (price) {
              gsap.fromTo(
                price,
                { clipPath: "inset(0% 100% 0% 0%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.5,
                  ease: "power3.out",
                  delay: index * 0.06 + 0.04,
                  overwrite: "auto",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                  },
                }
              );
            }
          });
        });
      }

      const rowCleanup: Array<() => void> = [];
      const rows = gsap.utils.toArray<HTMLElement>("[data-menu-item]");
      rows.forEach((row) => {
        const price = row.querySelector<HTMLElement>("[data-menu-price]");

        const onEnter = () => {
          gsap.to(row, {
            backgroundColor: "rgba(255,255,255,0.025)",
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (price) {
            gsap.to(price, {
              x: 6,
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const onLeave = () => {
          gsap.to(row, {
            backgroundColor: "rgba(255,255,255,0)",
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (price) {
            gsap.to(price, {
              x: 0,
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);

        rowCleanup.push(() => {
          row.removeEventListener("mouseenter", onEnter);
          row.removeEventListener("mouseleave", onLeave);
        });
      });

      cleanups.push(() => {
        rowCleanup.forEach((cleanup) => cleanup());
      });
    }, pageRef);

    const targets = menuData
      .map((category) => document.getElementById(`menu-${category.id}`))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.4)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) {
          return;
        }

        const nextId = visible[0].target.id.replace("menu-", "");
        setActiveCategory(nextId);
      },
      {
        threshold: [0.4, 0.6, 0.8],
      }
    );

    targets.forEach((target) => observer.observe(target));

    cleanups.push(() => observer.disconnect());

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!pageRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pills = Array.from(pageRef.current.querySelectorAll<HTMLElement>("[data-menu-pill]"));

    pills.forEach((pill) => {
      const pillId = pill.dataset.menuPillId;
      const isActive = pillId === activeCategory;

      gsap.to(pill, {
        backgroundColor: isActive ? "#f63143" : "rgba(246,49,67,0)",
        borderColor: isActive ? "#f63143" : "rgba(242,223,210,0.3)",
        color: isActive ? "#ffffff" : "rgba(242,223,210,0.7)",
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [activeCategory]);

  return (
    <div ref={pageRef} className="wine-surface min-h-screen text-[#f3e8de]">
      <SiteHeader variant="inner" />
      <MenuImageCursor />
      <MenuPageContent
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        heroSubtitle="Monday — Saturday, 7:00 AM to 6:00 PM"
      />
    </div>
  );
}