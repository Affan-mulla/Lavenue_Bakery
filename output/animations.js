/* output/animations.js */
/*
  CDN imports for non-bundler usage:
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>
  <script type="module">
    import { initAllAnimations } from "/output/animations.js";
    initAllAnimations({ enableCursor: false });
  </script>
*/

const TIMING = Object.freeze({
  instant: 0,
  micro: 0.1,
  fast: 0.15,
  standard: 0.25,
  comfortable: 0.35,
  relaxed: 0.45,
  slow: 0.6,
  cinematic: 0.8,
});

const EASE = Object.freeze({
  out: "expo.out",
  in: "expo.in",
  inOut: "power2.inOut",
  spring: "elastic.out(1, 0.5)",
});

let gsapRef = null;
let scrollTriggerRef = null;

export const framerMotionVariants = {
  page: {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: TIMING.slow, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: TIMING.standard, ease: [0.4, 0, 1, 1] },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: TIMING.slow, ease: [0.16, 1, 0.3, 1] },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: TIMING.relaxed, ease: [0.16, 1, 0.3, 1] },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  },
  cardHover: {
    rest: { y: 0, boxShadow: "var(--shadow-card)" },
    hover: {
      y: -4,
      boxShadow: "var(--shadow-card-hover)",
      transition: { duration: TIMING.standard, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

function getScopeRoot(root) {
  if (root && root.nodeType === 1) {
    return root;
  }
  if (root && root.nodeType === 9) {
    return root.documentElement || document.body;
  }
  return document.body;
}

function toArray(root, selector) {
  if (!root || !selector) return [];
  return Array.from(root.querySelectorAll(selector));
}

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isDesktopHover() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function hasFramerOwner(el) {
  return Boolean(el && el.hasAttribute("data-framer"));
}

function revealTargets(root, type) {
  const list = toArray(root, `[data-reveal="${type}"]`);
  return list.filter((el) => !hasFramerOwner(el));
}

function makeVisibleForReducedMotion(root) {
  toArray(root, "[data-reveal]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  toArray(root, '[data-gsap="sticky-header"]').forEach((header) => {
    header.classList.add("header--scrolled");
  });
  const bar = root.querySelector("#scroll-progress-bar");
  if (bar) {
    bar.style.transformOrigin = "left center";
    bar.style.transform = "scaleX(1)";
  }
}

async function resolveGsap() {
  if (typeof window === "undefined") return { gsap: null, ScrollTrigger: null };
  if (gsapRef && scrollTriggerRef) return { gsap: gsapRef, ScrollTrigger: scrollTriggerRef };

  if (window.gsap && window.ScrollTrigger) {
    gsapRef = window.gsap;
    scrollTriggerRef = window.ScrollTrigger;
    return { gsap: gsapRef, ScrollTrigger: scrollTriggerRef };
  }

  try {
    const [gsapModule, stModule] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    const gsapLib = gsapModule.gsap || gsapModule.default || window.gsap;
    const stLib =
      stModule.ScrollTrigger ||
      (stModule.default && stModule.default.ScrollTrigger) ||
      stModule.default ||
      window.ScrollTrigger;

    gsapRef = gsapLib || null;
    scrollTriggerRef = stLib || null;
    return { gsap: gsapRef, ScrollTrigger: scrollTriggerRef };
  } catch (error) {
    console.warn("[motion] GSAP load failed:", error);
    return { gsap: null, ScrollTrigger: null };
  }
}

function initStickyHeader({ ScrollTrigger, root }) {
  const header = root.querySelector('[data-gsap="sticky-header"], #site-header');
  if (!header) return () => {};

  const threshold = 84;
  let state = false;

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const isScrolled = self.scroll() > threshold;
      if (isScrolled === state) return;
      state = isScrolled;
      header.classList.toggle("header--scrolled", isScrolled);
    },
  });

  return () => trigger.kill();
}

function initScrollProgress({ gsap, root }) {
  const bar = root.querySelector("#scroll-progress-bar");
  if (!bar) return () => {};

  gsap.set(bar, { scaleX: 0, transformOrigin: "left center", willChange: "transform" });
  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      start: "top top",
      end: "max",
      scrub: 0,
    },
  });

  return () => {};
}

function initFadeUp({ gsap, root }) {
  const targets = revealTargets(root, "fade-up");

  targets.forEach((target) => {
    if (target.closest('[data-gsap="story-timeline"]')) return;

    const motionNode = target.hasAttribute("data-parallax")
      ? target.querySelector("img, picture, video") || target
      : target;

    gsap.set(motionNode, { opacity: 0, y: 48, willChange: "transform, opacity" });

    gsap.to(motionNode, {
      opacity: 1,
      y: 0,
      duration: TIMING.slow,
      ease: EASE.out,
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        once: true,
      },
      onComplete: () => gsap.set(motionNode, { clearProps: "willChange" }),
    });
  });

  return () => {};
}

function initClipReveal({ gsap, root }) {
  revealTargets(root, "clip").forEach((el) => {
    if (el.dataset.clipReady === "true") return;

    const clipMask = document.createElement("span");
    clipMask.className = "clip-mask";
    clipMask.style.display = "inline-block";
    clipMask.style.overflow = "hidden";
    clipMask.style.verticalAlign = "top";

    const clipInner = document.createElement("span");
    clipInner.className = "clip-inner";
    clipInner.style.display = "inline-block";
    clipInner.style.willChange = "transform, opacity";

    while (el.firstChild) {
      clipInner.appendChild(el.firstChild);
    }
    clipMask.appendChild(clipInner);
    el.appendChild(clipMask);
    el.dataset.clipReady = "true";

    gsap.from(clipInner, {
      yPercent: 105,
      duration: TIMING.cinematic,
      ease: EASE.out,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
      onComplete: () => gsap.set(clipInner, { clearProps: "willChange" }),
    });
  });

  return () => {};
}

function initWordSplit({ gsap, root }) {
  revealTargets(root, "split-words").forEach((el) => {
    if (el.dataset.wordSplitReady === "true") return;

    const lineBlocks = Array.from(el.querySelectorAll(":scope > span"));
    const toMarkup = (word) =>
      `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.25em"><span class="word" style="display:inline-block;will-change:transform,opacity">${word}</span></span>`;

    if (lineBlocks.length > 0) {
      lineBlocks.forEach((line) => {
        const words = line.textContent.trim().split(/\s+/).filter(Boolean);
        line.innerHTML = words.map(toMarkup).join("");
        line.style.display = "block";
        line.style.overflow = "hidden";
      });
    } else {
      const words = el.textContent.trim().split(/\s+/).filter(Boolean);
      el.innerHTML = words.map(toMarkup).join("");
    }

    el.dataset.wordSplitReady = "true";
    const words = toArray(el, ".word");

    gsap.from(words, {
      yPercent: 110,
      opacity: 0,
      duration: TIMING.cinematic,
      ease: EASE.out,
      stagger: 0.06,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
      onComplete: () => gsap.set(words, { clearProps: "willChange" }),
    });
  });

  return () => {};
}

function initStaggerReveal({ gsap, ScrollTrigger, root }) {
  const parents = revealTargets(root, "stagger").filter(
    (el) => !el.matches('[data-gsap="story-timeline"]')
  );

  const staggerEach = window.matchMedia("(max-width: 768px)").matches ? 0.04 : 0.07;

  parents.forEach((parent) => {
    const children = Array.from(parent.children);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: 40, scale: 0.97, willChange: "transform, opacity" });

    ScrollTrigger.create({
      trigger: parent,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: EASE.out,
          stagger: (index) => Math.min(index, 5) * staggerEach,
          onComplete: () => gsap.set(children, { clearProps: "willChange" }),
        });
      },
    });
  });

  return () => {};
}

function initCounters({ gsap, ScrollTrigger, root }) {
  toArray(root, '[data-reveal="counter"]').forEach((el) => {
    if (hasFramerOwner(el)) return;

    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function onUpdate() {
            const current = this.targets()[0].value;
            el.textContent = `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
          },
        });
      },
    });
  });

  return () => {};
}

function initParallax({ gsap, root }) {
  if (window.matchMedia("(max-width: 768px)").matches) return () => {};

  toArray(root, "[data-parallax]").forEach((el) => {
    if (el.closest('[data-gsap="pinned-story"]')) return;
    if (hasFramerOwner(el)) return;

    const speed = Number(el.dataset.parallax || 0.2);

    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") || el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  });

  return () => {};
}

function ensureMagneticInner(el) {
  let inner = el.querySelector("[data-magnetic-inner]");
  if (inner) return inner;

  inner = document.createElement("span");
  inner.setAttribute("data-magnetic-inner", "");
  inner.style.display = "inline-flex";
  inner.style.alignItems = "center";
  inner.style.justifyContent = "center";
  inner.style.gap = "inherit";
  inner.style.willChange = "transform";

  while (el.firstChild) {
    inner.appendChild(el.firstChild);
  }
  el.appendChild(inner);

  return inner;
}

function initMagnetic({ gsap, root }) {
  if (!isDesktopHover()) return () => {};

  const elements = Array.from(
    new Set([
      ...toArray(root, '[data-gsap="magnetic-cta"]'),
      ...toArray(root, "[data-magnetic]"),
    ])
  );

  const cleanups = [];

  elements.forEach((el) => {
    const framerOwned = hasFramerOwner(el);
    const inner = framerOwned ? ensureMagneticInner(el) : el;

    const quickX = gsap.quickTo(inner, "x", { duration: TIMING.comfortable, ease: EASE.out });
    const quickY = gsap.quickTo(inner, "y", { duration: TIMING.comfortable, ease: EASE.out });

    const outerX = framerOwned
      ? null
      : gsap.quickTo(el, "x", { duration: TIMING.comfortable, ease: EASE.out });
    const outerY = framerOwned
      ? null
      : gsap.quickTo(el, "y", { duration: TIMING.comfortable, ease: EASE.out });

    const radius = 132;
    const multiplier = 0.24;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);

      if (distance > radius) return;

      const x = dx * multiplier;
      const y = dy * multiplier;

      quickX(x);
      quickY(y);
      if (outerX && outerY) {
        outerX(x * 0.35);
        outerY(y * 0.35);
      }
    };

    const onLeave = () => {
      gsap.to(inner, { x: 0, y: 0, duration: TIMING.cinematic, ease: EASE.spring });
      if (!framerOwned) {
        gsap.to(el, { x: 0, y: 0, duration: TIMING.cinematic, ease: EASE.spring });
      }
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);
    el.addEventListener("blur", onLeave);

    cleanups.push(() => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
      el.removeEventListener("blur", onLeave);
      gsap.killTweensOf(inner);
      if (!framerOwned) gsap.killTweensOf(el);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

function initCraftsmanshipTimeline({ gsap, root }) {
  const section = root.querySelector('[data-gsap="pinned-story"]');
  if (!section) return () => {};
  if (window.matchMedia("(max-width: 1024px)").matches) return () => {};

  const timelineList = section.querySelector('[data-gsap="story-timeline"]');
  const cards = timelineList ? Array.from(timelineList.querySelectorAll(":scope > li")) : [];
  if (!cards.length) return () => {};

  const media = section.querySelector('[data-parallax] img, [data-parallax]');
  const totalDistance = Math.max(cards.length * 420, 1320);

  gsap.set(cards, { opacity: 0.25, y: 56, scale: 0.985, willChange: "transform, opacity" });
  gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });
  if (media) gsap.set(media, { scale: 1.06, transformOrigin: "50% 50%" });

  const storyTl = gsap.timeline({
    defaults: { ease: EASE.out },
    scrollTrigger: {
      trigger: section,
      start: "top top+=88",
      end: `+=${totalDistance}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: (value) => {
          const stops = cards.length - 1;
          if (stops <= 0) return 0;
          return Math.round(value * stops) / stops;
        },
        duration: { min: 0.12, max: TIMING.comfortable },
        ease: EASE.inOut,
      },
    },
  });

  cards.forEach((card, index) => {
    storyTl.to(cards, {
      opacity: 0.25,
      y: 44,
      scale: 0.985,
      duration: TIMING.standard,
      ease: EASE.inOut,
    }, index === 0 ? 0 : ">");
    storyTl.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: TIMING.relaxed,
      ease: EASE.out,
    }, "<");

    if (media) {
      storyTl.to(media, {
        scale: 1.02 - index * 0.015,
        yPercent: -1.25 * index,
        duration: TIMING.relaxed,
        ease: EASE.inOut,
      }, "<");
    }
  });

  return () => {
    storyTl.kill();
    gsap.set(cards, { clearProps: "willChange" });
  };
}

function initCursor({ gsap, root }) {
  if (!isDesktopHover()) return () => {};

  const dot = root.querySelector("[data-cursor-dot]");
  const ring = root.querySelector("[data-cursor-ring]");
  if (!dot || !ring) return () => {};

  let mx = 0;
  let my = 0;

  const onMove = (event) => {
    mx = event.clientX;
    my = event.clientY;
    gsap.to(dot, { x: mx, y: my, duration: TIMING.micro });
    gsap.to(ring, { x: mx, y: my, duration: TIMING.relaxed, ease: EASE.out });
  };

  const expandTargets = [
    ...toArray(root, "[data-cursor-expand]"),
    ...toArray(root, "a"),
    ...toArray(root, "button"),
  ];

  const enters = [];
  const leaves = [];

  expandTargets.forEach((el) => {
    const onEnter = () => gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: TIMING.standard });
    const onLeave = () => gsap.to(ring, { scale: 1, opacity: 1, duration: TIMING.standard });

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    enters.push([el, onEnter]);
    leaves.push([el, onLeave]);
  });

  document.addEventListener("pointermove", onMove);

  return () => {
    document.removeEventListener("pointermove", onMove);
    enters.forEach(([el, fn]) => el.removeEventListener("mouseenter", fn));
    leaves.forEach(([el, fn]) => el.removeEventListener("mouseleave", fn));
  };
}

function bindLoadRefresh(ScrollTrigger) {
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });
  return () => window.removeEventListener("load", refresh);
}

export async function initAllAnimations(options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};

  const root = options.root || document;
  const reduced = prefersReducedMotion();

  if (reduced) {
    makeVisibleForReducedMotion(root);
    return () => {};
  }

  const { gsap, ScrollTrigger } = await resolveGsap();
  if (!gsap || !ScrollTrigger) return () => {};

  gsap.registerPlugin(ScrollTrigger);

  const cleanups = [];
  const scope = getScopeRoot(root);

  const ctx = gsap.context(() => {
    cleanups.push(initStickyHeader({ ScrollTrigger, root }));
    cleanups.push(initScrollProgress({ gsap, root }));
    cleanups.push(initFadeUp({ gsap, root }));
    cleanups.push(initClipReveal({ gsap, root }));
    cleanups.push(initWordSplit({ gsap, root }));
    cleanups.push(initStaggerReveal({ gsap, ScrollTrigger, root }));
    cleanups.push(initCounters({ gsap, ScrollTrigger, root }));
    cleanups.push(initParallax({ gsap, root }));
    cleanups.push(initMagnetic({ gsap, root }));
    cleanups.push(initCraftsmanshipTimeline({ gsap, root }));
    if (options.enableCursor) {
      cleanups.push(initCursor({ gsap, root }));
    }
  }, scope);

  cleanups.push(bindLoadRefresh(ScrollTrigger));

  return () => {
    cleanups.forEach((fn) => {
      if (typeof fn === "function") {
        try {
          fn();
        } catch (error) {
          console.warn("[motion] cleanup error:", error);
        }
      }
    });
    ctx.revert();
  };
}

export default initAllAnimations;
