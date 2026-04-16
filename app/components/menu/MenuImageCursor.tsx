"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MenuImageCursor() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const currentSrcRef = useRef<string | null>(null);
  const requestedSrcRef = useRef<string | null>(null);
  const lastLoadedSrcRef = useRef<string | null>(null);
  const lastClientYRef = useRef<number | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const hasHover =
      window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(any-hover: hover)").matches;

    const rafId = window.requestAnimationFrame(() => {
      setCanHover(hasHover);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!canHover) {
      return;
    }

    // Warm menu images in cache to reduce perceived lag and failed hover swaps.
    const uniqueSources = Array.from(
      new Set(
        Array.from(document.querySelectorAll<HTMLElement>("[data-item-image]"))
          .map((row) => row.dataset.itemImage)
          .filter((src): src is string => Boolean(src))
      )
    );

    const preloaders = uniqueSources.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });

    return () => {
      preloaders.forEach((img) => {
        img.src = "";
      });
    };
  }, [canHover]);

  useEffect(() => {
    if (!canHover) {
      return;
    }

    const imageContainer = imageContainerRef.current;
    const imageLayer = imageLayerRef.current;

    if (!imageContainer) {
      return;
    }

    gsap.set(imageContainer, {
      autoAlpha: 0,
      scale: 0.85,
      x: -9999,
      y: -9999,
    });

    let activeRow: HTMLElement | null = null;
    let rafPending = false;
    let moveRafId: number | null = null;
    const xTo = gsap.quickTo(imageContainer, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(imageContainer, "y", { duration: 0.28, ease: "power3.out" });

    const setImageSource = (nextSrc: string, direction: "up" | "down") => {
      if (!imageLayer) {
        requestedSrcRef.current = nextSrc;
        currentSrcRef.current = nextSrc;
        setIsImageLoading(true);
        setHasImageError(false);
        setImageSrc(nextSrc);
        return;
      }

      if (currentSrcRef.current === null) {
        requestedSrcRef.current = nextSrc;
        currentSrcRef.current = nextSrc;
        setIsImageLoading(true);
        setHasImageError(false);
        setImageSrc(nextSrc);
        gsap.set(imageLayer, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      if (currentSrcRef.current === nextSrc) {
        return;
      }

      const outY = direction === "down" ? 24 : -24;
      const inY = direction === "down" ? -24 : 24;

      gsap.to(imageLayer, {
        autoAlpha: 0,
        y: outY,
        filter: "blur(10px)",
        duration: 0.16,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          requestedSrcRef.current = nextSrc;
          currentSrcRef.current = nextSrc;
          setIsImageLoading(true);
          setHasImageError(false);
          setImageSrc(nextSrc);

          gsap.set(imageLayer, {
            y: inY,
            filter: "blur(10px)",
            autoAlpha: 0,
          });

          gsap.to(imageLayer, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.24,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    };

    const reveal = () => {
      gsap.to(imageContainer, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const hide = () => {
      gsap.to(imageContainer, {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
      });
    };

    const moveToCursor = (clientX: number, clientY: number) => {
      xTo(clientX + 24);
      yTo(clientY - 80);
    };

    const getRowFromTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return null;
      }

      return target.closest<HTMLElement>("[data-item-image]");
    };

    const onMouseOver = (event: MouseEvent) => {
      const row = getRowFromTarget(event.target);
      const nextSrc = row?.dataset.itemImage;

      if (!row || !nextSrc) {
        return;
      }

      const previousY = lastClientYRef.current;
      const direction: "up" | "down" = previousY !== null && event.clientY < previousY ? "up" : "down";
      lastClientYRef.current = event.clientY;

      if (activeRow !== row) {
        activeRow = row;
        setImageSource(nextSrc, direction);
      }

      reveal();
      moveToCursor(event.clientX, event.clientY);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!activeRow) {
        return;
      }

      lastClientYRef.current = event.clientY;

      if (rafPending) {
        return;
      }

      rafPending = true;
      const { clientX, clientY } = event;
      moveRafId = window.requestAnimationFrame(() => {
        moveToCursor(clientX, clientY);
        rafPending = false;
        moveRafId = null;
      });
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!activeRow) {
        return;
      }

      const fromRow = getRowFromTarget(event.target);
      if (fromRow !== activeRow) {
        return;
      }

      const toRow = getRowFromTarget(event.relatedTarget);

      if (toRow && toRow.dataset.itemImage) {
        const previousY = lastClientYRef.current;
        const direction: "up" | "down" = previousY !== null && event.clientY < previousY ? "up" : "down";
        lastClientYRef.current = event.clientY;
        activeRow = toRow;
        setImageSource(toRow.dataset.itemImage, direction);
        return;
      }

      activeRow = null;
      lastClientYRef.current = null;
      hide();
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", onMouseOut);

      if (moveRafId !== null) {
        window.cancelAnimationFrame(moveRafId);
      }

      gsap.killTweensOf(imageContainer);
      if (imageLayer) {
        gsap.killTweensOf(imageLayer);
      }
    };
  }, [canHover]);

  if (!canHover) {
    return null;
  }

  return (
    <div
      ref={imageContainerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-80 h-50 w-70 overflow-hidden rounded-xs border border-[#d8d4cc]/20"
    >
      <div ref={imageLayerRef} className="absolute inset-0">
        <div
          className={`pointer-events-none absolute inset-0 z-10 bg-[#10213a] transition-opacity duration-200 ${
            isImageLoading || hasImageError || !imageSrc ? "opacity-100" : "opacity-0"
          }`}
        />
        {imageSrc ? (
          <Image
            key={imageSrc}
            src={imageSrc}
            alt=""
            fill
            sizes="280px"
            className={`object-cover transition-opacity duration-200 ${hasImageError ? "opacity-0" : "opacity-100"}`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
            onLoadingComplete={() => {
              if (!imageSrc || requestedSrcRef.current !== imageSrc) {
                return;
              }

              lastLoadedSrcRef.current = imageSrc;
              setIsImageLoading(false);
              setHasImageError(false);
            }}
            onError={() => {
              if (!imageSrc || requestedSrcRef.current !== imageSrc) {
                return;
              }

              const fallbackSrc = lastLoadedSrcRef.current;

              if (fallbackSrc && fallbackSrc !== imageSrc) {
                requestedSrcRef.current = fallbackSrc;
                currentSrcRef.current = fallbackSrc;
                setHasImageError(false);
                setIsImageLoading(false);
                setImageSrc(fallbackSrc);
                return;
              }

              setIsImageLoading(false);
              setHasImageError(true);
            }}
          />
        ) : null}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  );
}
