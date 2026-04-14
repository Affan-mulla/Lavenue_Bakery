"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type PageLoaderProps = {
  onComplete: () => void;
};

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete,
    });

    timeline
      .fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
      .fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration: 1.0, ease: "power2.inOut" }
      )
      .to(overlayRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.out",
      });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-100 flex items-center justify-center bg-(--wine-950)">
      <div className="flex w-[min(82vw,28rem)] flex-col items-center gap-6">
        <p ref={titleRef} className="font-display-face text-6xl leading-none text-[#f3e8de] sm:text-8xl">
          L&apos;Avenue
        </p>
        <div className="h-px w-full bg-[#f63143]/35">
          <span ref={progressRef} className="block h-px w-0 bg-[#f63143]" />
        </div>
      </div>
    </div>
  );
}