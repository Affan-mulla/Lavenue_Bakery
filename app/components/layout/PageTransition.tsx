"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isInitialRenderRef = useRef(true);
  const hasPendingNavigationRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const revealPageContent = () => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-page-content]"));
    if (!targets.length) {
      return;
    }

    gsap.killTweensOf(targets);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(targets, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  };

  const startProgress = () => {
    if (!progressRef.current || hasPendingNavigationRef.current) {
      return;
    }

    hasPendingNavigationRef.current = true;

    gsap.killTweensOf(progressRef.current);
    gsap.set(progressRef.current, {
      autoAlpha: 1,
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.to(progressRef.current, {
      scaleX: 0.7,
      duration: 0.32,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const completeProgress = () => {
    if (!progressRef.current) {
      hasPendingNavigationRef.current = false;
      return;
    }

    gsap.killTweensOf(progressRef.current);
    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: 0.24,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.to(progressRef.current, {
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: 0 });
            }
            hasPendingNavigationRef.current = false;
          },
        });
      },
    });
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const progress = progressRef.current;

    if (!overlay) {
      return;
    }

    gsap.set(overlay, {
      scaleY: 0,
      transformOrigin: "top center",
      autoAlpha: 1,
    });

    if (progress) {
      gsap.set(progress, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (anchor.target && anchor.target !== "_self") {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) {
        return;
      }

      if (destination.pathname === window.location.pathname && destination.search === window.location.search) {
        return;
      }

      startProgress();
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function pushState(...args) {
      startProgress();
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function replaceState(...args) {
      startProgress();
      return originalReplaceState.apply(this, args);
    };

    const onPopState = () => {
      startProgress();
    };

    window.addEventListener("click", onDocumentClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("popstate", onPopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      timelineRef.current?.kill();
      gsap.killTweensOf([overlay, progress]);
    };
  }, []);

  useEffect(() => {
    if (!overlayRef.current) {
      return;
    }

    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      revealPageContent();
      return;
    }

    timelineRef.current?.kill();

    timelineRef.current = gsap
      .timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          completeProgress();
          revealPageContent();
        },
      })
      .set(overlayRef.current, { autoAlpha: 1 })
      .fromTo(
        overlayRef.current,
        { scaleY: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          duration: 0.35,
          ease: "power3.in",
        }
      )
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.4,
        delay: 0.1,
        ease: "power3.out",
      });
  }, [pathname]);

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-95 h-0.5 w-full origin-left bg-[#f63143]"
      />
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-90 bg-(--wine-950)"
      />
    </>
  );
}
