"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MenuImageCursor() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const currentSrcRef = useRef<string | null>(null);
  const lastClientYRef = useRef<number | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
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

    const setImageSource = (nextSrc: string, direction: "up" | "down") => {
      if (!imageLayer) {
        currentSrcRef.current = nextSrc;
        setIsImageLoading(true);
        setImageSrc(nextSrc);
        return;
      }

      if (currentSrcRef.current === null) {
        currentSrcRef.current = nextSrc;
        setIsImageLoading(true);
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
          currentSrcRef.current = nextSrc;
          setIsImageLoading(true);
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
      gsap.to(imageContainer, {
        x: clientX + 24,
        y: clientY - 80,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
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
      className="pointer-events-none fixed left-0 top-0 z-80 h-50 w-70 overflow-hidden rounded-xs border border-[#f2dfd2]/20"
    >
      <div ref={imageLayerRef} className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-[#2a0010] transition-opacity duration-200 ${
            isImageLoading ? "opacity-100" : "opacity-0"
          }`}
        />
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="280px"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
            onLoadingComplete={() => {
              setIsImageLoading(false);
            }}
          />
        ) : null}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  );
}
