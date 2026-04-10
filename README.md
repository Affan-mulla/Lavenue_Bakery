# WEB AGENCY SYSTEM v2
## Copilot-native iterative website builder

---

## Folder structure — copy exactly this into your repo

```
your-project/
├── .github/
│   ├── agents/
│   │   ├── web-agency-orchestrator.agent.md       ← Main brain (start here)
│   │   ├── web-context-mcp-specialist.agent.md    ← Stack docs fetcher
│   │   ├── web-reference-hunter.agent.md          ← ★ NEW: Online inspiration
│   │   ├── web-strategy-specialist.agent.md       ← Brief → strategy
│   │   ├── web-layout-specialist.agent.md         ← HTML structure
│   │   ├── web-typography-specialist.agent.md     ← Type system
│   │   ├── web-color-specialist.agent.md          ← Color tokens
│   │   ├── web-motion-specialist.agent.md         ← Animations
│   │   ├── web-assembly-specialist.agent.md       ← Integration + validation
│   │   ├── web-qa-specialist.agent.md             ← Scoring (0-100)
│   │   └── web-revision-specialist.agent.md       ← ★ NEW: Targeted fixes
│   └── prompts/
│       ├── build-website.prompt.md                ← Generic build
│       ├── build-own-agency-site.prompt.md        ← Your own site
│       ├── revise-and-improve.prompt.md           ← ★ NEW: Push score up
│       ├── refresh-references.prompt.md           ← ★ NEW: Fresh inspiration
│       └── refresh-mcp-context.prompt.md          ← Refresh stack docs
├── knowledge/
│   ├── DESIGN_LAWS.md                             ← 8pt grid, type scale, color laws
│   ├── ANIMATION_SYSTEM.md                        ← 10 animation types, timing
│   ├── LAYOUT_PATTERNS.md                         ← Section types, page flows
│   ├── INDUSTRY_PROFILES.md                       ← Per-industry rules
│   └── components/
│       └── COMPONENT_TEMPLATES.md                 ← ★ NEW: Real Next.js code
└── output/                                        ← All generated files go here
    └── build-log.md                               ← Score history tracker
```

---

## How to use

### Build a new site
1. Open VS Code in your project
2. Open Copilot Chat
3. Click the prompt icon → select `build-website.prompt.md`
4. Fill in the client brief when prompted
5. Watch it run: Context → References → Strategy → Layout+Type+Color → Motion → Assembly → QA

### Build your own agency site
Same as above but use `build-own-agency-site.prompt.md` — already filled in.
Edit the brief with your real agency name and city first.

### Improve an existing build (the loop)
After a build, check `output/qa-report.md` for the score.
If below 90:
1. Select `revise-and-improve.prompt.md`
2. Leave target area blank (auto-detects weakest) or specify
3. It fixes, reassembles, rescores

### Get fresh design references
1. Select `refresh-references.prompt.md`  
2. Optionally specify: `"more editorial"`, `"bolder"`, `"minimal Japanese"`
3. Then run `revise-and-improve.prompt.md` to apply them

---

## What the score means

| Score | Meaning |
|-------|---------|
| 90–100 | ✅ Approved for delivery |
| 75–89 | Revision loop runs automatically |
| 60–74 | Two revision passes needed |
| < 60 | Brief is too vague — needs more info |

Score is broken down by:
- Design Hierarchy & Spacing (20pts)
- Animation Variety & Quality (20pts)  
- Typography Execution (15pts)
- Color System Consistency (15pts)
- Mobile Responsiveness (10pts)
- Accessibility (10pts)
- Anti-Pattern Cleanliness (10pts)

---

## What makes this different from generic AI builders

**Generic AI builder:**
- Runs once
- Produces purple gradient + Inter font + hover:scale cards
- No references — defaults to average of training data
- No feedback loop

**This system:**
- Hunts real-world references before generating ANYTHING
- 10 named animation types (not just fade-up)
- Scores output against professional rubric
- Loops until 90/100 or 3 revision passes
- Every specialist reads design laws before generating
- QA has a specific "AI slop detector" pass

---

## Stack defaults (non-negotiable)

- Framework: Next.js App Router (or React SPA)
- Styling: Tailwind CSS + CSS custom properties
- Animations: GSAP (scroll/timeline) + Framer Motion (component/state)
- Fonts: Google Fonts via next/font
- Images: next/image with lazy loading

---

## Adding new industry profiles

Edit `knowledge/INDUSTRY_PROFILES.md` and add a new section.
All specialist agents automatically get it on next run.

## Adding your own design references

Edit `knowledge/ANIMATION_SYSTEM.md` or `DESIGN_LAWS.md` to add patterns you've
discovered from real projects. The system gets smarter as you use it.
