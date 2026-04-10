# Design Reference Pack
Generated: 2026-04-10
Client context: Elegant royal bakery/cafe, premium editorial, handcrafted luxury, warm heritage

## Layout References

### Hero Patterns Found

1. Tartine-style one-glance hero clarity
Source: https://tartinebakery.com/ (captured via HubSpot bakery examples)
Pattern: Hero immediately communicates product category, multi-location credibility, and order pathway without visual clutter.
Layout specialist action: Build a 3-part hero stack with one dominant image, one short positioning line, and two high-intent actions (Reserve Table, View Menu).

2. Claudine-style rotating hero gallery
Source: https://www.claudinela.com/ (captured via HubSpot bakery examples)
Pattern: Slow, high-resolution slider for signature products reinforces premium quality and freshness.
Layout specialist action: Use a controlled 3-5 slide carousel with fixed caption area so text does not jump during transitions.

3. Cafe Delight cutout-on-solid-background hero
Source: https://ecosystem.hubspot.com/marketplace/website/cafe-delight-theme-by-makewebbetter
Pattern: Product cutout layered over solid field feels modern and brandable versus predictable full-bleed photo hero.
Layout specialist action: Use one large cutout pastry image on a restrained royal backdrop with subtle shadow depth.

4. JANJOU gallery-first hero
Source: https://www.janjou.com/ (via Site Builder Report)
Pattern: Full-screen pastry imagery + minimal nav creates museum-like product reverence.
Layout specialist action: Use near-full-height hero with minimal chrome and strong image art direction.

### Section Patterns Found

1. TOAD Bakery minimal commerce grid
Source: https://www.toadbakery.com/ (via Site Builder Report)
Pattern: Tight product grid, clear pricing, concise descriptions, generous whitespace, no decorative noise.
Layout specialist action: Menu section should default to card grid with visible price and short tasting note.

2. Balthazar menu-paper aesthetic
Source: https://balthazarny.com/bakery/ and https://www.balthazarbakery.com/soho/
Pattern: Traditional menu framing, restrained palette, old-world typographic hierarchy.
Layout specialist action: Add one heritage section variant using framed borders, serif headings, and parchment-toned panel backgrounds.

3. Levain location storytelling blocks
Source: https://levainbakery.com/ (via HubSpot bakery examples)
Pattern: Location pages combine local landmarks, neighborhood context, and location-specific menu cues.
Layout specialist action: Add location cards with mini-illustration and local specialty tags.

4. Back Door Donuts persistent order actions
Source: https://www.backdoordonuts.com/ (via HubSpot bakery examples)
Pattern: Sticky order CTA remains visible while browsing long-form content.
Layout specialist action: Keep one sticky utility action (Order/Reserve) visible on desktop and mobile.

5. Clear Flour schedule utility section
Source: https://www.clearflourbread.com/ (via HubSpot bakery examples)
Pattern: Bread schedule matrix acts as trust utility and repeat-visit driver.
Layout specialist action: Add a Weekly Oven Schedule block near menu for time-sensitive products.

6. King Arthur broken-grid editorial composition
Source: https://www.kingarthurbaking.com/ (via HubSpot bakery examples)
Pattern: Broken grid + strong photography adds editorial sophistication without hurting usability.
Layout specialist action: Use one asymmetric showcase section after hero to break template monotony.

### Navigation Patterns Found

1. Quick-access utility strip (Da Francesco pattern)
Source: https://www.dafrancesco-restaurant.de/ (via Webflow roundup)
Pattern: Menu, location, phone, reservation surfaced in a compact action row.
Layout specialist action: Keep top-level nav lean; expose operational actions immediately.

2. Center-band navigation (Isses pattern)
Source: https://mexicanrestaurant.webflow.io/ (via Webflow roundup)
Pattern: Distinct nav band with content reveal creates strong brand signature.
Layout specialist action: Consider branded nav band treatment for desktop, simplified sticky bar on mobile.

3. Sticky navigation reference library
Source: https://onepagelove.com/tag/sticky-navigation
Pattern: Broad catalog of sticky patterns confirms persistent nav as baseline expectation for modern landing pages.
Layout specialist action: Implement sticky nav from first screen onward with smooth state transition.

4. Sticky header transformation specification for this project
Source inspiration: GSAP ScrollTrigger guidance + sticky nav references
Pattern: Header transitions from airy transparent state to compact blurred utility state after scroll threshold.
Layout specialist action: Transform around 72-96px scroll; reduce header height by about 20-28%, add subtle blur and thin bottom border, keep CTA always accessible.

## Animation References

### Scroll Animation Patterns

1. ScrollTrigger start/end choreography
Source: https://marmelab.com/blog/2024/04/11/trigger-animations-on-scroll-with-gsap-scrolltrigger.html
Technique: Precise start/end alignment (for example top 80% to top 20%) to control reveal timing.
Motion specialist action: Define explicit start/end per section, avoid default-only triggers.

2. Scrub-linked playhead
Source: Marmelab + GSAPify
Technique: Scrub ties animation progress directly to scroll, optional smoothing (scrub 1).
Motion specialist action: Use scrub for hero media parallax and storytelling sections, not for every component.

3. Pin plus scrub narrative panels
Source: Marmelab, GSAPify, Tuts+ horizontal examples
Technique: Pin section while timeline progresses, then release.
Motion specialist action: Use one pinned narrative section max on homepage to keep premium feel without fatigue.

4. Snap-to-panel progression
Source: Marmelab snap docs and GSAPify snap patterns
Technique: Scroll snaps to stable key states for panel transitions.
Motion specialist action: Apply snap in horizontal tasting-story panel so users never stop in awkward in-between states.

5. Horizontal scroll storytelling with pinning
Source: https://webdesign.tutsplus.com/create-horizontal-scroll-animations-with-gsap-scrolltrigger--cms-108881t
Technique: Vertical wheel drives horizontal panel journey while container is pinned.
Motion specialist action: Use for bakery craftsmanship timeline only; keep menu and reservation flows conventional.

6. CSS native scroll timeline progress
Source: https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/
Technique: Progress bar scales with scroll using animation-timeline scroll().
Motion specialist action: Implement thin top progress line tied to root scroll for subtle premium feedback.

7. View timeline reveal ranges
Source: Codrops practical scroll/view guide
Technique: view() with animation-range controls how elements reveal within viewport intersection.
Motion specialist action: Use contain or entry ranges for image reveals; avoid abrupt edge-triggered pops.

8. Named timelines plus timeline-scope
Source: Codrops + CSS-Tricks
Technique: Share one section timeline across sibling controls (buttons, dots, indicators).
Motion specialist action: Use for carousel pagination/dot sync in featured products.

9. Batch stagger reveals for performance
Source: GSAPify advanced patterns
Technique: Batch entrance animations for many repeated items.
Motion specialist action: Use batch for menu cards and testimonials to prevent trigger overload.

10. Marker-driven debugging and refresh discipline
Source: Marmelab + GSAPify
Technique: markers during development, refresh after dynamic content changes.
Motion specialist action: Keep debug markers in build phase and remove at final pass only.

### Component Interaction Patterns

1. Magnetic CTA behavior
Source: https://en.inithtml.com/resources/magnetic-hover-effect-creating-cursor-attracted-buttons-with-vanilla-javascript/ and GSAP magnetic examples
Technique: Cursor-proximity translation based on element center delta; reset to origin outside radius.
Motion specialist action:
- Activation radius around 100-140px
- Movement multiplier around 0.18-0.30
- Return easing around 0.25-0.45s ease-out (or soft elastic if GSAP)
- Apply only to primary CTA and maybe one secondary signature element

2. Sticky header transform state change
Source: GSAP ScrollTrigger docs and sticky-navigation galleries
Technique: onUpdate or class toggle after threshold to shrink header and add backdrop treatment.
Motion specialist action: Use one threshold and one inverse threshold to avoid jitter near boundary.

3. Scroll progress indicator
Source: CSS-Tricks and Codrops field notes
Technique: Fixed 2-3px top bar scaling from 0 to 100 with scroll progress.
Motion specialist action: Use brand accent color, no glow, no bounce, linear easing only.

4. Premium text reveal via mask or clip
Source: CSS-Tricks clip-path + CodePen reveal references
Technique: Text reveals with mask sweep or clip-path change instead of simple opacity fade.
Motion specialist action: Use on H1 and section titles only; keep body text static for readability.

### Page Transition Patterns

1. Inner Perspective transition
Source: https://blog.olivierlarose.com/articles/nextjs-page-transition-guide
Technique: Slide overlay + slight page perspective shift + opacity enter.
Motion specialist action: Use for route-level transitions in narrative pages, not checkout/order flow.

2. Stairs transition
Source: Olivier Larose guide (inspired by K72)
Technique: Multiple staggered columns animate as wipe mask.
Motion specialist action: Use only for campaign/brand pages; avoid overusing on every nav click.

3. SVG Curve transition
Source: Olivier Larose guide (inspired by Denis Snellenberg)
Technique: Animated SVG path morph + translating curtain + route label.
Motion specialist action: Reserve as signature transition if performance budget allows.

4. AnimatePresence wait mode sequencing
Source: Framer Motion references in Next.js transition articles
Technique: Enter starts after exit completes for cleaner choreography.
Motion specialist action: Ensure key-based route transitions and no overlap flashes.

## Typography References

1. Heritage serif + modern sans system
Reference cues: Balthazar, Osteria 60, JANJOU, premium restaurant examples
Direction: Display serif for authority and craft, clean sans for utility and readability.
Recommended pairs:
- Cormorant Garamond + Manrope
- DM Serif Display + Plus Jakarta Sans
- Fraunces + Work Sans

2. Menu-first readability hierarchy
Reference cues: TOAD and Bevri menu clarity
Direction: Menu categories should be typographic anchors, prices secondary but always visible.
Layout specialist action:
- Category titles with strong serif style
- Item titles medium weight sans
- Descriptions restrained and short

3. Royal editorial rhythm
Reference cues: Osteria 60 luxury composition and Tartine clarity
Direction: Large controlled display headlines, tight line-height for display, generous paragraph line-height for body.
Layout specialist action: Keep display text dramatic but limit to 1-2 lines per section.

4. Explicit anti-generic typography rule
Direction: Avoid template-feel combinations and neutralized voice.
Do not use: Inter + Inter, default system display, generic startup typography voice.

## Color References

1. Royal Noir + Cream + Antique Gold
Inspired by: Osteria 60 fine-dining mood and heritage bakery aesthetics
Suggested palette:
- Background: #12100E
- Surface: #1E1A16
- Text light: #F4EEE4
- Accent gold: #B78A3B
- Soft border: #3B3127

2. Bordeaux + Warm Blush + Brass
Inspired by: classic patisserie and old-world menu design directions
Suggested palette:
- Background: #2A1113
- Surface: #3A1A1D
- Cream text: #F3E6D8
- Accent brass: #C6954B
- Secondary blush: #C88F84

3. Stone + Espresso + Copper
Inspired by: artisanal bakery interiors and matte packaging
Suggested palette:
- Base stone: #EDE6DA
- Espresso text: #2A221D
- Surface taupe: #D8CDBE
- Accent copper: #A6623A
- Muted olive support: #6D6A4C

4. Material direction
Pattern: Matte paper surfaces, brushed-metal accents, subtle glass only in sticky header state.
Layout specialist action: Keep texture understated; avoid glossy gradients and neon accents.

## Key Insights

1. Treat the homepage like a boutique editorial storefront, not a generic food template. One dominant hero story, then structured utility.
2. Make menu access instant and elegant: visible in first viewport, with clean category segmentation and fast price scanning.
3. Use one signature motion system (pin + scrub story + progress bar + premium reveals) instead of many disconnected effects.
4. Sticky header must transform, not just stick. Compression and blur communicate polish and preserve focus on content.
5. Keep magnetic behavior exclusive. Premium feel comes from restraint and intentionality, not widespread novelty.

## Anti-patterns Found

1. Purple-blue gradient hero on white backgrounds.
2. Inter-only typography with no display contrast.
3. Fade-up as the only animation language.
4. Generic hover scale cards without inner-image choreography.
5. Equal-weight three-card sections repeated across page.
6. Stock business or unrelated imagery in a bakery brand context.
7. Hidden menu pathways that require multiple clicks to reach prices/products.
8. Over-animated page transitions on utility flows (ordering, contact, checkout).
