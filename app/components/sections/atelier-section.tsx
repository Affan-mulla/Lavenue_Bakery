"use client";

import { memo, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { reviewItems } from "../landing-data";

function AtelierSection() {
  const reviewRefs = useRef<Array<HTMLElement | null>>([]);
  const reviewContentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isPausedRef = useRef(false);
  const [reviewStageHeight, setReviewStageHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const REVIEW_SWAP_MS = 5600;

  useEffect(() => {
    const measureStageHeight = () => {
      const maxHeight = reviewContentRefs.current.reduce((height, content) => {
        if (!content) {
          return height;
        }

        return Math.max(height, content.scrollHeight);
      }, 0);

      if (!maxHeight) {
        return;
      }

      const nextHeight = Math.ceil(maxHeight + 20);
      setReviewStageHeight((current) => (current === nextHeight ? current : nextHeight));
    };

    let isActive = true;
    let measureRafId: number | null = null;

    const runMeasure = () => {
      if (!isActive) {
        return;
      }

      if (measureRafId !== null) {
        window.cancelAnimationFrame(measureRafId);
      }

      measureRafId = window.requestAnimationFrame(() => {
        measureRafId = null;

        if (!isActive) {
          return;
        }

        measureStageHeight();
      });
    };

    runMeasure();
    document.fonts.ready.then(() => {
      runMeasure();
    });

    const resizeObserver = new ResizeObserver(() => {
      runMeasure();
    });

    reviewContentRefs.current.forEach((content) => {
      if (content) {
        resizeObserver.observe(content);
      }
    });

    window.addEventListener("resize", runMeasure);

    return () => {
      isActive = false;
      if (measureRafId !== null) {
        window.cancelAnimationFrame(measureRafId);
      }
      window.removeEventListener("resize", runMeasure);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reviewItems.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      setActiveIndex((current) => (current + 1) % reviewItems.length);
    }, REVIEW_SWAP_MS);

    return () => window.clearInterval(intervalId);
  }, [REVIEW_SWAP_MS]);

  useEffect(() => {
    if (!reviewRefs.current.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    reviewRefs.current.forEach((card, index) => {
      if (!card || index === activeIndex) {
        return;
      }

      gsap.killTweensOf(card);
      gsap.set(card, { autoAlpha: 0, x: 24, filter: "blur(8px)", pointerEvents: "none" });

      const line = card.querySelector<HTMLElement>("[data-review-line]");
      const meta = card.querySelector<HTMLElement>("[data-review-meta]");

      if (line) {
        gsap.set(line, { xPercent: 108 });
      }

      if (meta) {
        gsap.set(meta, { autoAlpha: 0, x: 12 });
      }
    });

    const activeCard = reviewRefs.current[activeIndex];

    if (!activeCard) {
      return;
    }

    const activeLine = activeCard.querySelector<HTMLElement>("[data-review-line]");
    const activeMeta = activeCard.querySelector<HTMLElement>("[data-review-meta]");

    if (prefersReducedMotion) {
      gsap.set(activeCard, { autoAlpha: 1, x: 0, filter: "blur(0px)", pointerEvents: "auto" });
      if (activeLine) {
        gsap.set(activeLine, { xPercent: 0 });
      }
      if (activeMeta) {
        gsap.set(activeMeta, { autoAlpha: 1, x: 0 });
      }
      return;
    }

    gsap.set(activeCard, { pointerEvents: "auto" });

    const timeline = gsap.timeline();
    timeline.fromTo(
      activeCard,
      { autoAlpha: 0, x: 24, filter: "blur(8px)" },
      { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.95, ease: "power3.out" }
    );

    if (activeLine) {
      timeline.fromTo(
        activeLine,
        { xPercent: 108 },
        { xPercent: 0, duration: 1.15, ease: "power4.out" },
        "<0.08"
      );
    }

    if (activeMeta) {
      timeline.fromTo(
        activeMeta,
        { autoAlpha: 0, x: 12 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "<0.34"
      );
    }

    return () => {
      timeline.kill();
    };
  }, [activeIndex]);

  return (
    <section
      id="philosophy"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      onFocus={() => {
        isPausedRef.current = true;
      }}
      onBlur={() => {
        isPausedRef.current = false;
      }}
    >
      <div className="paper-surface relative h-full min-h-[90vh] px-4 py-18 sm:px-8">
        <div className="mx-auto flex flex-col items-center gap-8 text-center">
          <p aria-hidden="true" className="mx-auto text-6xl leading-none" data-spin>
            ✦
          </p>

          <div
            className="relative max-w-300 mt-6 min-h-58 w-full px-2 pb-6"
            style={reviewStageHeight ? { minHeight: `${reviewStageHeight}px` } : undefined}
          >
            {reviewItems.map((review, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={`${review.author}-${review.city}`}
                  ref={(node) => {
                    reviewRefs.current[index] = node;
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-2 md:px-8 opacity-0 invisible"
                  data-review-initial={index === 0 ? "true" : undefined}
                  aria-hidden={!isActive}
                >
                  <div
                    ref={(node) => {
                      reviewContentRefs.current[index] = node;
                    }}
                    className="flex flex-col items-center"
                  >
                    <p className=" text-[clamp(30px,4.8vw,52px)] leading-[1.06] text-[#1a2738] font-display-face">
                      <span className="block overflow-hidden">
                        <span data-review-line className="block">
                          &ldquo;{review.quote}&rdquo;
                        </span>
                      </span>
                    </p>
                    <p className="mt-6 text-sm uppercase tracking-[0.16em] text-[#4e6178]" data-review-meta>
                      {review.author}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-2 flex items-center gap-2" aria-label="Review slide controls">
            {reviewItems.map((review, index) => (
              <button
                type="button"
                key={`${review.author}-dot`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-8 bg-[#32465e]" : "w-2.5 bg-[#7f90a5]"
                }`}
                aria-label={`Show review ${index + 1}`}
                aria-pressed={activeIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AtelierSection);
