# MCP Context Pack
Generated: 2026-04-10
MCP Status: SUCCESS (docs fetched via MCP + local Next 16 docs)

## Stack Detected
- Project type: Next.js App Router
- Package manager: npm (lockfile present)
- Repo evidence:
- package.json
- next.config.ts
- app/layout.tsx
- app/page.tsx
- app/globals.css
- postcss.config.mjs

## Version Notes
- Next.js: 16.2.3
- React: 19.2.4
- Tailwind CSS: 4.x with @tailwindcss/postcss
- Framer Motion: 12.38.0
- GSAP: 3.14.2
- Next App Router defaults to Server Components; client interactivity requires use client boundaries.
- Tailwind v4 is CSS-first: @import tailwindcss + @theme tokens; JS config is optional, not mandatory.
- next/font remains the correct font path in App Router and is already used in root layout.

## Required Constraints
- Keep pages/layouts server-first; isolate only interactive animation islands as Client Components.
- Any Framer Motion or GSAP usage must run in Client Components only.
- Use next/image for all content imagery; provide meaningful alt text and sizes to avoid layout shift.
- Keep font loading through next/font (already in app/layout.tsx); do not switch to CSS @import web fonts.
- Keep Tailwind v4 config in CSS tokens via @theme and CSS variables (current file already uses @theme inline in app/globals.css).
- Register GSAP plugins before use, including ScrollTrigger.
- Clean up GSAP contexts/triggers on unmount (ctx.revert or equivalent cleanup pattern).
- Do not pass non-serializable props from Server to Client Components except supported Server Actions patterns.

## Architecture Recommendations
- Keep app/page.tsx as server orchestrator that composes sections.
- Add client-only animation wrappers under app/components for interactive/scroll behavior; keep content sections server-rendered.
- Suggested split:
- Server sections: structure, copy, media, SEO, static data.
- Client wrappers: animation timeline wiring, viewport observers, gesture/state transitions.
- Keep next/font variables as design tokens and remove hard override to Arial in app/globals.css so typography follows font tokens.
- Keep next.config.ts minimal until external image domains or advanced image config is required.

## Animation Integration Notes
- Responsibility split (explicit):
- Framer Motion owns component/state animation:
- Enter/exit transitions
- Hover/tap/focus feedback
- Layout transitions between UI states
- Simple in-view reveals tied to component lifecycle
- GSAP + ScrollTrigger owns scroll-timeline animation:
- Scrubbed timelines
- Pinning/parallax
- Long-form section choreography
- Progress-driven scene sequencing
- Coordination rules:
- Never animate the same CSS property on the same element from both libraries at the same time.
- Use nested wrappers when both are needed: outer wrapper controlled by GSAP scroll timeline, inner element controlled by Framer state transitions.
- Refresh ScrollTrigger after major layout changes or dynamically inserted content.

## Accessibility/Performance Notes
- Respect reduced motion:
- Disable non-essential timelines when prefers-reduced-motion is enabled.
- Provide immediate, non-animated final states as fallback.
- Keep client bundles small:
- Do not mark full pages as client; only animation islands.
- Prefer lazy loading for heavy GSAP scenes.
- Preserve Core Web Vitals:
- Stable dimensions for media with next/image.
- Keep font loading through next/font to reduce CLS and third-party requests.
- Ensure keyboard and focus parity:
- Motion must not hide focus indicators or make controls unreachable.
- Avoid scroll-jacking patterns that trap keyboard or screen-reader users.

## Risks
- Framer import-path drift risk:
- Ecosystem now references both framer-motion and motion/react docs; keep project consistent on framer-motion unless intentionally migrating.
- Double-control animation risk:
- Mixing GSAP and Framer on one element/property causes jitter and nondeterministic end states.
- Bundle bloat risk:
- Overusing use client at route/section level inflates hydration and JS payload.
- Typography drift risk:
- Current body Arial override in app/globals.css can bypass next/font token intent.
- ScrollTrigger SSR timing risk:
- Trigger initialization before stable layout can mis-measure start/end points; initialize after mount and refresh when needed.
