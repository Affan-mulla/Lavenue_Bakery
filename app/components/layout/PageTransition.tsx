"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

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

    return () => {
      gsap.killTweensOf([overlay, progress]);
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const progress = progressRef.current;

    if (!overlay || !progress) {
      return;
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      revealPageContent();
      return;
    }

    gsap.killTweensOf(progress);

    gsap.set(progress, {
      autoAlpha: 1,
      scaleX: 0,
      transformOrigin: "left center",
    });

    gsap.to(progress, {
      scaleX: 1,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.to(progress, {
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(progress, { scaleX: 0 });
          },
        });
      },
    });

    const timeline = gsap
      .timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          revealPageContent();
        },
      })
      .set(overlay, { autoAlpha: 1 })
      .fromTo(
        overlay,
        { scaleY: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          duration: 0.35,
          ease: "power3.in",
        }
      )
      .to(overlay, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.4,
        delay: 0.1,
        ease: "power3.out",
      });

    return () => {
      timeline.kill();
      gsap.killTweensOf(progress);
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-95 h-0.5 w-full origin-left bg-[#8ea8ff]"
      />
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-90 bg-(--wine-950)"
      />
    </>
  );
}
