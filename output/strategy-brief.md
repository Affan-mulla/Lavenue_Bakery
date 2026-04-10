# Strategy Brief: L'Avenue Boulangerie
Date: 2026-04-10
Project Type: Premium bakery and cafe website (Next.js App Router)
Target Quality: 90+/100 QA score

## 1) Creative Direction
- Core mood: elegant royal bakery with editorial restraint.
- Art direction: deep warm neutrals, antique gold accenting, parchment surfaces, high-contrast serif headlines.
- Visual behavior: curated and intentional, not crowded; asymmetrical sections to avoid template repetition.
- Brand voice: artisanal precision, neighborhood warmth, and old-world craftsmanship.
- Explicit anti-generic constraints:
  - No purple hero gradients.
  - No one-style fade-up only reveals.
  - No generic startup typography pairing.

## 2) Audience and Conversion Goals
- Audience:
  - Yorkville locals and nearby professionals.
  - Weekend pastry seekers and artisan bread regulars.
  - Tourists searching for premium bakery experience in Toronto.
- Primary conversion:
  - View menu and decide to visit.
- Secondary conversion:
  - Call, contact, and map intent.
- UX priorities:
  - Fast menu scan on mobile.
  - Rich brand storytelling on desktop.
  - Persistent utility actions (Menu, Call, Visit).

## 3) Section Order and Rationale
1. Hero (royal identity + immediate actions)
- Establish premium positioning and immediate utility.
2. Trust Strip (fresh daily, handcrafted, Yorkville)
- Reinforce quality claims quickly.
3. Signature Menu Highlights
- High-intent section placed early for conversion.
4. Full Menu Grid
- Structured by bread/pastry/dessert with clear pricing.
5. Weekly Oven Schedule
- Practical utility that encourages repeat visits.
6. Craftsmanship Story (scroll choreography section)
- Distinguator section for premium experience.
7. Testimonials / Community Notes
- Social proof in concise editorial cards.
8. Visit and Contact
- Address, phone, email, neighborhood context.
9. Final CTA and Footer
- Close with one strong benefit-driven action.

## 4) Component Map
- Server components:
  - Content sections, menu data rendering, semantic landmarks.
- Client animation islands:
  - Sticky transformed header behavior.
  - Scroll progress indicator.
  - Magnetic primary CTA.
  - GSAP ScrollTrigger section choreography.
  - Framer interaction transitions on cards/buttons and staged entrances.
- Proposed implementation files:
  - app/components/bakery-experience.tsx (client orchestrator)
  - app/page.tsx (server composition + metadata-friendly structure)
  - app/globals.css (tokens, typography, surfaces, component styles)

## 5) Typography Strategy
- Pairing:
  - Display: Cormorant Garamond.
  - Body/UI: Manrope.
- Typographic hierarchy:
  - H1: dramatic editorial scale with tight leading.
  - Section headings: serif with disciplined spacing.
  - Body/menu text: sans for scanning and legibility.
- Policy:
  - Max line lengths controlled for readability.
  - Keep paragraph copy concise.
  - Price alignment visually clear at first glance.

## 6) Color Token Strategy
- Semantic structure:
  - Base tokens: canvas, text, border.
  - Surface tokens: elevated cards, panels, overlays.
  - Accent tokens: royal gold and warm copper support.
- Recommended direction:
  - Canvas dark-warm: near-black espresso.
  - Foreground: cream parchment.
  - Accent: antique gold for key interactions.
- Interaction states:
  - Hover and active states use luminance change and subtle glow, never neon.

## 7) Motion System Strategy
- Split of responsibilities:
  - Framer Motion:
    - Component enter/exit and hover/tap transitions.
    - Small sequencing and in-view staged reveals.
  - GSAP + ScrollTrigger:
    - Scroll-linked timelines.
    - Pinned narrative choreography in craftsmanship section.
    - Sticky header transformation threshold behavior.
    - Scroll progress line.
    - Magnetic primary CTA interaction.
- Mandatory interactions:
  - Sticky header transformation after scroll threshold.
  - Global scroll progress bar.
  - Magnetic effect on primary CTA.
- Quality rules:
  - No single-motion language repetition.
  - Use multiple reveal grammars: mask/clip, depth shift, stagger, parallax.
  - Respect prefers-reduced-motion with non-animated fallback states.

## 8) Accessibility and Performance Guardrails
- Accessibility:
  - WCAG AA contrast targets for all text and controls.
  - Keyboard parity for all interactive elements.
  - Visible focus states on dark surfaces.
  - Reduced-motion branch disables non-essential timelines.
- Performance:
  - Keep page server-first, isolate client code to animation islands.
  - Use image sizing and lazy loading to reduce CLS.
  - Keep animation transforms GPU-friendly.
  - Clean up GSAP contexts on unmount.

## 9) QA Criteria for 90+
- Design hierarchy and spacing: 18+/20
- Animation variety and quality: 18+/20
- Typography execution: 13+/15
- Color system consistency: 13+/15
- Mobile responsiveness: 9+/10
- Accessibility: 9+/10
- Anti-pattern cleanliness: 10/10

## 10) Build Intent Summary
Deliver a premium royal bakery web experience that is practical for conversion, rich in craft storytelling, and technically robust with GSAP plus Framer used intentionally and distinctly.