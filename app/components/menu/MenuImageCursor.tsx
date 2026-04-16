"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function MenuImageCursor() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const requestedSrcRef = useRef<string | null>(null);
  const lastClientYRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const imageSrcRef = useRef<string | null>(null);
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
    imageSrcRef.current = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (!canHover) {
      return;
    }

    // Warm menu images in cache to reduce perceived lag and failed hover swaps.
    const uniqueSources = Array.from(
      new Set(
        Array.from(document.querySelectorAll<HTMLElement>("[data-item-image]"))
          .map((row) => row.dataset.itemImage)
          .filter(Boolean)
      )
    );

    const preloaders: Array<HTMLImageElement | null> = [];
    uniqueSources.forEach((src) => {
      const img = new window.Image();
      img.src = src as string;
      preloaders.push(img);
    });

    return () => {
      preloaders.forEach((img, index) => {
        if (!img) {
          return;
        }

        img.src = "";
        preloaders[index] = null;
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
      // Single source of truth for what should be displayed right now.
      requestedSrcRef.current = nextSrc;

      if (!imageLayer) {
        imageSrcRef.current = nextSrc;
        setImageSrc(nextSrc);
        setIsImageLoading(true);
        setHasImageError(false);
        return;
      }

      // Cancel stale callbacks from previous transitions.
      gsap.killTweensOf(imageLayer);

      if (!imageSrcRef.current) {
        imageSrcRef.current = nextSrc;
        setImageSrc(nextSrc);
        setIsImageLoading(true);
        setHasImageError(false);
        gsap.set(imageLayer, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      if (imageSrcRef.current === nextSrc) {
        // A fast hover change can interrupt a blur tween mid-flight.
        // Normalize the layer immediately when source does not actually change.
        gsap.to(imageLayer, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.16,
          ease: "power2.out",
          overwrite: "auto",
        });
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
          const srcToShow = requestedSrcRef.current;
          if (!srcToShow) {
            return;
          }

          imageSrcRef.current = srcToShow;
          setImageSrc(srcToShow);
          setIsImageLoading(true);
          setHasImageError(false);

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
      // Keep x/y quickTo tweens alive so cursor following never stalls.
      gsap.killTweensOf(imageContainer, "autoAlpha,scale");

      gsap.to(imageContainer, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const hide = () => {
      gsap.killTweensOf(imageContainer, "autoAlpha,scale");
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

    const onPointerOver = (event: PointerEvent) => {
      const row = getRowFromTarget(event.target);
      const nextSrc = row?.dataset.itemImage;

      if (!row || !nextSrc) {
        return;
      }

      lastPointerRef.current = { x: event.clientX, y: event.clientY };

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

    const onPointerMove = (event: PointerEvent) => {
      if (!activeRow) {
        return;
      }

      lastPointerRef.current = { x: event.clientX, y: event.clientY };
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

    const onPointerOut = (event: PointerEvent) => {
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

        const lastPointer = lastPointerRef.current;
        if (lastPointer) {
          moveToCursor(lastPointer.x, lastPointer.y);
        }

        reveal();
        return;
      }

      activeRow = null;
      lastClientYRef.current = null;
      hide();
    };

    const onWindowPointerLeave = () => {
      if (!activeRow) {
        return;
      }

      activeRow = null;
      lastClientYRef.current = null;
      hide();
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("pointerleave", onWindowPointerLeave);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerleave", onWindowPointerLeave);

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
        <img
          src={imageSrc || "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
          style={{ opacity: isImageLoading || hasImageError ? 0 : 1 }}
          onLoad={() => {
            if (!imageSrc || imageSrc !== requestedSrcRef.current) {
              return;
            }

            setIsImageLoading(false);
            setHasImageError(false);
          }}
          onError={() => {
            if (!imageSrc || imageSrc !== requestedSrcRef.current) {
              return;
            }

            setIsImageLoading(false);
            setHasImageError(true);
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  );
}
