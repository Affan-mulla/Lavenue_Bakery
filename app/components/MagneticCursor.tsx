"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const syncTimeoutRef = useRef<number | undefined>(undefined);
  const [isEnabled, setIsEnabled] = useState(false);

  const INTERACTIVE_SELECTOR =
    "a, button, [data-magnetic], [role='button'], input, select, textarea, label[for], summary";

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover)");

    const updateEnabledState = () => {
      const canHover = hoverQuery.matches;
      const isDesktop = window.innerWidth >= 768;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsEnabled(canHover && isDesktop && !prefersReducedMotion);
    };

    updateEnabledState();
    hoverQuery.addEventListener("change", updateEnabledState);
    window.addEventListener("resize", updateEnabledState);

    return () => {
      hoverQuery.removeEventListener("change", updateEnabledState);
      window.removeEventListener("resize", updateEnabledState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || !dotRef.current || !ringRef.current) {
      return;
    }

    document.body.style.cursor = "none";

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

    const onMouseDown = () => {
      gsap.to(dot, {
        scale: 0.6,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseUp = () => {
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(1,0.4)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const getHoverState = (element: HTMLElement) => {
      if (element.closest("[data-cursor-expand]")) {
        return { scale: 3.5, ringBorderColor: "rgba(243,232,222,0.3)" };
      }

      if (element.matches("[data-magnetic]") || element.closest("[data-magnetic]")) {
        return { scale: 2.8, ringBorderColor: "#8ea8ff" };
      }

      if (element.tagName === "BUTTON") {
        return { scale: 2.5, ringBorderColor: "#8ea8ff" };
      }

      if (element.tagName === "A") {
        return { scale: 2.2, ringBorderColor: "#8ea8ff" };
      }

      return { scale: 2.3, ringBorderColor: "#8ea8ff" };
    };

    const interactiveHandlers = new Map<
      HTMLElement,
      { onEnter: () => void; onLeave: () => void }
    >();
    const magneticHandlers = new Map<
      HTMLElement,
      { onMove: (event: MouseEvent) => void; onLeave: () => void }
    >();

    const bindInteractiveElement = (element: HTMLElement) => {
      if (interactiveHandlers.has(element)) {
        return;
      }

      const onEnter = () => {
        const hoverState = getHoverState(element);
        gsap.to(ring, {
          scale: hoverState.scale,
          borderColor: hoverState.ringBorderColor,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dot, {
          backgroundColor: "rgba(142,168,255,0)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(243, 232, 222, 0.5)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dot, {
          backgroundColor: "#8ea8ff",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);

      interactiveHandlers.set(element, { onEnter, onLeave });
    };

    const unbindInteractiveElement = (element: HTMLElement) => {
      const handlers = interactiveHandlers.get(element);
      if (!handlers) {
        return;
      }

      try {
        element.removeEventListener("mouseenter", handlers.onEnter);
        element.removeEventListener("mouseleave", handlers.onLeave);
      } catch {
        // Element may already be gone.
      }

      interactiveHandlers.delete(element);
    };

    const bindMagneticElement = (element: HTMLElement) => {
      if (magneticHandlers.has(element)) {
        return;
      }

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

      magneticHandlers.set(element, { onMove, onLeave });
    };

    const unbindMagneticElement = (element: HTMLElement) => {
      const handlers = magneticHandlers.get(element);
      if (!handlers) {
        return;
      }

      try {
        element.removeEventListener("mousemove", handlers.onMove);
        element.removeEventListener("mouseleave", handlers.onLeave);
      } catch {
        // Element may already be gone.
      }

      magneticHandlers.delete(element);
    };

    const syncInteractiveElements = () => {
      const nextInteractive = new Set(document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR));

      nextInteractive.forEach((element) => bindInteractiveElement(element));
      Array.from(interactiveHandlers.keys()).forEach((element) => {
        if (!nextInteractive.has(element) || !element.isConnected) {
          unbindInteractiveElement(element);
        }
      });
    };

    const syncMagneticElements = () => {
      const nextMagnetic = new Set(document.querySelectorAll<HTMLElement>("[data-magnetic]"));

      nextMagnetic.forEach((element) => bindMagneticElement(element));
      Array.from(magneticHandlers.keys()).forEach((element) => {
        if (!nextMagnetic.has(element) || !element.isConnected) {
          unbindMagneticElement(element);
        }
      });
    };

    syncInteractiveElements();
    syncMagneticElements();

    const observer = new MutationObserver(() => {
      window.clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = window.setTimeout(() => {
        syncInteractiveElements();
        syncMagneticElements();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-magnetic", "data-cursor-expand", "role", "for"],
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = undefined;
      observer.disconnect();
      Array.from(interactiveHandlers.keys()).forEach((element) => unbindInteractiveElement(element));
      Array.from(magneticHandlers.keys()).forEach((element) => unbindMagneticElement(element));
    };
  }, [isEnabled, INTERACTIVE_SELECTOR]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        data-cursor
        className="pointer-events-none fixed z-200 h-2 w-2 rounded-full bg-[#8ea8ff]"
        style={{ top: -20, left: -20 }}
      />
      <div
        ref={ringRef}
        data-cursor
        className="pointer-events-none fixed z-199 h-9 w-9 rounded-full border border-[rgba(243,232,222,0.5)] mix-blend-difference"
        style={{ top: -20, left: -20 }}
      />
    </>
  );
}