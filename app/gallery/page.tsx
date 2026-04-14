    "use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import MagneticCursor from "../components/MagneticCursor";
import { galleryCategories, galleryImages, type GalleryImage } from "../components/gallery-data";
import SiteHeader from "../components/layout/SiteHeader";

export default function GalleryPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<(typeof galleryCategories)[number]["id"]>("all");
  const [visibleCategory, setVisibleCategory] = useState<(typeof galleryCategories)[number]["id"]>("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const lightboxOverlayRef = useRef<HTMLDivElement>(null);
  const lightboxMediaRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotionRef = useRef(false);
  const filterTransitioningRef = useRef(false);
  const hasCompletedInitialFilterRenderRef = useRef(false);
  const lightboxDirectionRef = useRef<"next" | "prev" | null>(null);
  const previousLightboxIdRef = useRef<string | null>(null);

  const setCategoryWithAnimation = (nextCategory: (typeof galleryCategories)[number]["id"]) => {
    if (nextCategory === activeCategory || filterTransitioningRef.current) {
      return;
    }

    setActiveCategory(nextCategory);

    if (prefersReducedMotionRef.current) {
      setVisibleCategory(nextCategory);
      return;
    }

    const currentItems = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-item]"));

    if (!currentItems.length) {
      setVisibleCategory(nextCategory);
      return;
    }

    filterTransitioningRef.current = true;
    gsap.to(currentItems, {
      autoAlpha: 0,
      scale: 0.96,
      duration: 0.25,
      stagger: 0.02,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        setVisibleCategory(nextCategory);
      },
    });
  };

  const filteredImages = useMemo(() => {
    if (visibleCategory === "all") {
      return galleryImages;
    }

    return galleryImages.filter((image) => image.category === visibleCategory);
  }, [visibleCategory]);

  const lightboxIndex = lightboxImage
    ? filteredImages.findIndex((image) => image.id === lightboxImage.id)
    : -1;

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const isStillVisible = filteredImages.some((image) => image.id === lightboxImage.id);
    if (!isStillVisible) {
      setLightboxImage(null);
    }
  }, [visibleCategory, filteredImages, lightboxImage]);

  useEffect(() => {
    if (!hasCompletedInitialFilterRenderRef.current) {
      hasCompletedInitialFilterRenderRef.current = true;
      return;
    }

    if (prefersReducedMotionRef.current || !filteredImages.length) {
      filterTransitioningRef.current = false;
      return;
    }

    const incomingItems = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-item]"));
    gsap.fromTo(
      incomingItems,
      { autoAlpha: 0, scale: 0.96 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        delay: 0.2,
        stagger: 0.05,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          filterTransitioningRef.current = false;
        },
      }
    );
  }, [filteredImages]);

  useEffect(() => {
    if (!pageRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    prefersReducedMotionRef.current = prefersReducedMotion;

    const context = gsap.context(() => {
      const textLines = gsap.utils.toArray<HTMLElement>("[data-text-line]");
      const count = pageRef.current?.querySelector<HTMLElement>("[data-gallery-count]");
      const heroTitle = pageRef.current?.querySelector<HTMLElement>("[data-gallery-hero]");
      const grid = pageRef.current?.querySelector<HTMLElement>("[data-gallery-grid]");
      const items = gsap.utils.toArray<HTMLElement>("[data-gallery-item]");

      if (prefersReducedMotion) {
        gsap.set(textLines, { yPercent: 0, autoAlpha: 1 });
        if (count) {
          gsap.set(count, { autoAlpha: 1 });
        }
        gsap.set(items, { autoAlpha: 1, scale: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        textLines,
        { yPercent: 120, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.14,
          duration: 1.1,
          ease: "power4.out",
          overwrite: "auto",
        }
      );

      if (count) {
        gsap.fromTo(
          count,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            delay: 0.8,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      }

      if (grid) {
        gsap.fromTo(
          items,
          { autoAlpha: 0, scale: 0.94, y: 20 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (heroTitle) {
        gsap.to(heroTitle, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: heroTitle,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, pageRef);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const figures = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-item]"));
    const hoverCleanups: Array<() => void> = [];

    figures.forEach((figure) => {
      const image = figure.querySelector("img");
      const caption = figure.querySelector("figcaption");

      if (caption) {
        gsap.set(caption, { yPercent: 100 });
      }

      if (!image || prefersReducedMotionRef.current) {
        return;
      }

      const onEnter = () => {
        gsap.to(image, {
          scale: 1.06,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (caption) {
          gsap.to(caption, {
            yPercent: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const onLeave = () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (caption) {
          gsap.to(caption, {
            yPercent: 100,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      figure.addEventListener("mouseenter", onEnter);
      figure.addEventListener("mouseleave", onLeave);

      hoverCleanups.push(() => {
        figure.removeEventListener("mouseenter", onEnter);
        figure.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
    };
  }, [filteredImages]);

  const closeLightbox = () => {
    if (!lightboxImage) {
      return;
    }

    if (prefersReducedMotionRef.current || !lightboxOverlayRef.current) {
      setLightboxImage(null);
      return;
    }

    gsap.to(lightboxOverlayRef.current, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        setLightboxImage(null);
      },
    });
  };

  const changeLightboxImage = (direction: "next" | "prev") => {
    if (!filteredImages.length || lightboxIndex < 0) {
      return;
    }

    const nextIndex =
      direction === "next"
        ? (lightboxIndex + 1) % filteredImages.length
        : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    const nextImage = filteredImages[nextIndex];

    if (prefersReducedMotionRef.current || !lightboxMediaRef.current) {
      lightboxDirectionRef.current = direction;
      setLightboxImage(nextImage);
      return;
    }

    gsap.to(lightboxMediaRef.current, {
      x: direction === "next" ? -60 : 60,
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        lightboxDirectionRef.current = direction;
        setLightboxImage(nextImage);
      },
    });
  };

  useEffect(() => {
    if (!lightboxImage) {
      previousLightboxIdRef.current = null;
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowRight") {
        changeLightboxImage("next");
      }

      if (event.key === "ArrowLeft") {
        changeLightboxImage("prev");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxImage, lightboxIndex, filteredImages]);

  useEffect(() => {
    if (!lightboxImage || !lightboxOverlayRef.current || !lightboxMediaRef.current) {
      return;
    }

    const overlay = lightboxOverlayRef.current;
    const media = lightboxMediaRef.current;
    const closeButton = lightboxCloseRef.current;

    if (prefersReducedMotionRef.current) {
      gsap.set([overlay, media, closeButton], { autoAlpha: 1, x: 0, scale: 1 });
      previousLightboxIdRef.current = lightboxImage.id;
      lightboxDirectionRef.current = null;
      return;
    }

    const incomingDirection = lightboxDirectionRef.current;

    if (!previousLightboxIdRef.current) {
      gsap.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" }
      );

      gsap.fromTo(
        media,
        { scale: 0.92, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        }
      );

      if (closeButton) {
        gsap.fromTo(
          closeButton,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.25,
            delay: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      }
    } else if (incomingDirection) {
      const fromX = incomingDirection === "next" ? 60 : -60;
      gsap.fromTo(
        media,
        { x: fromX, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    }

    previousLightboxIdRef.current = lightboxImage.id;
    lightboxDirectionRef.current = null;
  }, [lightboxImage]);

  const displayCount = `${galleryImages.length} images`;

  return (
    <div ref={pageRef} className="wine-surface min-h-screen text-[#f3e8de]">
      <MagneticCursor />
      <SiteHeader variant="inner" />

      <main
        id="gallery-page"
        data-page-content
        className="wine-surface relative pb-20 pt-28 opacity-0 translate-y-5 sm:pt-32 md:pt-36"
      >
        <section className="mx-auto flex min-h-[40vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 data-gallery-hero className="font-display-face leading-[0.88] text-[#f3e8de] text-[clamp(80px,14vw,160px)]">
                <span data-text-line className="block">
                  Gallery
                </span>
              </h1>
              <p data-text-line className="font-display-face text-2xl italic text-[#f2dfd2]/50">A visual journal</p>
            </div>

            <p data-gallery-count className="text-right font-mono text-sm uppercase tracking-widest text-[#f2dfd2]/40">
              {displayCount}
            </p>
          </div>
        </section>

        <section
          className="sticky top-0 z-30 border-y border-[#f2dfd2]/12 bg-(--wine-850)/88 backdrop-blur-md transition-[top] duration-300 ease-out"
          style={{ top: "var(--category-sticky-top, 0px)" }}
        >
          <div className="mx-auto w-full max-w-7xl overflow-x-auto px-4 py-3 sm:px-8">
            <div className="flex min-w-max items-center gap-6">
              {galleryCategories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    data-magnetic
                    onClick={() => setCategoryWithAnimation(category.id)}
                    className={`relative pb-2 font-mono text-sm uppercase tracking-widest transition-colors duration-300 after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:origin-left after:transition-transform after:duration-300 ${
                      isActive
                        ? "text-[#f3e8de] after:scale-x-100 after:bg-[#f63143]"
                        : "text-[#f2dfd2]/40 after:scale-x-0 after:bg-[#f63143]"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-8">
          {filteredImages.length ? (
            <div data-gallery-grid className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3">
              {filteredImages.map((image) => {
                const isLandscape = image.width === 2;

                return (
                  <figure
                    key={image.id}
                    data-gallery-item
                    data-cursor-expand
                    onClick={() => setLightboxImage(image)}
                    className={`group relative cursor-pointer overflow-hidden ${
                      isLandscape ? "col-span-1 aspect-video sm:col-span-2" : "col-span-1 aspect-3/4"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover will-change-transform"
                    />

                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/80">
                        {image.caption ?? image.alt}
                      </p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[30vh] items-center justify-center text-center">
              <p className="font-mono text-[#f2dfd2]/40">No images in this category yet</p>
            </div>
          )}
        </section>
      </main>

      {lightboxImage ? (
        <div
          ref={lightboxOverlayRef}
          className="fixed inset-0 z-150 flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-md"
          onClick={closeLightbox}
          onTouchStart={(event) => {
            touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = touchStartXRef.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartXRef.current = null;

            if (startX === null || endX === undefined) {
              return;
            }

            const deltaX = endX - startX;
            if (Math.abs(deltaX) < 45) {
              return;
            }

            if (deltaX < 0) {
              changeLightboxImage("next");
            } else {
              changeLightboxImage("prev");
            }
          }}
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className="absolute right-5 top-5 z-10 font-display-face text-2xl text-white"
            aria-label="Close lightbox"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
          >
            X
          </button>

          <button
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 font-display-face text-4xl text-white/80 hover:text-white"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              changeLightboxImage("prev");
            }}
          >
            &larr;
          </button>

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 font-display-face text-4xl text-white/80 hover:text-white"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              changeLightboxImage("next");
            }}
          >
            &rarr;
          </button>

          <div ref={lightboxMediaRef} className="flex w-full max-w-6xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1600}
              height={1200}
              className="h-auto max-h-[90vh] w-full max-w-[90vw] object-contain"
              sizes="90vw"
              priority
            />
            <p className="mt-4 text-center font-mono text-sm text-white/60">
              {lightboxImage.caption ?? lightboxImage.alt}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}