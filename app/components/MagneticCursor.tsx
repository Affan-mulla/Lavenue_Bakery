"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const isDesktop = window.innerWidth >= 768;
    setIsEnabled(canHover && isDesktop);
  }, []);

  useEffect(() => {
    if (!isEnabled || !dotRef.current || !ringRef.current) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    const onPointerMove = (event: MouseEvent) => {
      gsap.to(dot, {
        left: event.clientX - 4,
        top: event.clientY - 4,
        duration: 0.05,
        ease: "none",
        overwrite: "auto",
      });

      gsap.to(ring, {
        left: event.clientX - 18,
        top: event.clientY - 18,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onPointerMove);

    const interactiveElements = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, [data-magnetic]")
    );
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));

    const interactiveCleanup: Array<() => void> = [];
    interactiveElements.forEach((element) => {
      const onEnter = () => {
        gsap.to(ring, { scale: 2.5, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        gsap.to(dot, { autoAlpha: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      };

      const onLeave = () => {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        gsap.to(dot, { autoAlpha: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      };

      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);

      interactiveCleanup.push(() => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    const magneticCleanup: Array<() => void> = [];
    magneticElements.forEach((element) => {
      const onMove = (event: MouseEvent) => {
        const bounds = element.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const offsetX = event.clientX - centerX;
        const offsetY = event.clientY - centerY;
        const maxX = Math.max(bounds.width / 2, 1);
        const maxY = Math.max(bounds.height / 2, 1);
        const normalizedX = Math.max(-1, Math.min(1, offsetX / maxX));
        const normalizedY = Math.max(-1, Math.min(1, offsetY / maxY));

        gsap.to(element, {
          x: normalizedX * 12,
          y: normalizedY * 12,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      };

      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);

      magneticCleanup.push(() => {
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      interactiveCleanup.forEach((cleanup) => cleanup());
      magneticCleanup.forEach((cleanup) => cleanup());
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-200 h-2 w-2 rounded-full bg-[#f63143]"
        style={{ top: -20, left: -20 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-199 h-9 w-9 rounded-full border border-[rgba(243,232,222,0.5)] mix-blend-difference"
        style={{ top: -20, left: -20 }}
      />
    </>
  );
}