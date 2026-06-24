# Design Playbook — Making an AI-Built Site Not Look AI-Built

A portable, project-agnostic guide. Drop this file into any new project and follow it to
take a generic, "obviously AI-generated" UI to something that reads as deliberately
designed. It captures both the *research* (why AI sites look the same) and the *method*
(how we fixed it).

> How to use this file in a new project: paste it in, then tell the assistant
> "Follow DESIGN_PLAYBOOK.md: research the subject, propose 3 grounded directions, let me
> pick one, write a DESIGN.md, then restyle in place." The steps below are the recipe.

---

## 1. The problem: why AI-built sites look the same

LLMs default to the statistical average of their training data, so unprompted they
converge on the same look. Community-sourced "dead giveaways" of an AI-generated site:

- **Purple→blue (or orange) gradients** — the #1 tell. Gradient backgrounds *and* gradient text.
- **Rounded corners on everything** + **bento-grid** layouts.
- **Gradient headline** like "Transform your X" / "Supercharge your workflow".
- **Emoji used as icons** or as a logo (e.g. an emoji inside a gradient circle).
- **Inter font** everywhere; generic glassmorphism cards; floaty big drop-shadows.
- **Too much undifferentiated whitespace**; a dashboard screenshot floating at an angle.
- Cookie-cutter copy: "No X. No Y. Just Z."

Three "designer-y" looks that are *also* now AI defaults (avoid using them as a fallback):
1. Warm cream background + high-contrast serif + terracotta accent.
2. Near-black background + a single acid-green/vermilion accent.
3. Broadsheet/newspaper layout with hairline rules and zero border-radius.

These are fine *if the brief calls for them*, but picking one by default is still a default.

## 2. What actually works (the fixes)

1. **Stop letting the model freestyle. Feed it references.** "Modern landing page" → average
   slop. Instead give it specific sites/screenshots you admire and a named aesthetic.
2. **Write a design-system file** (`DESIGN.md`) with *exact tokens*: hex colors, font
   families + sizes + weights, a spacing scale, radius rules, motion rules, and an explicit
   **"never do"** list. Once it exists, the model follows instead of guessing.
3. **Pick a real aesthetic direction** grounded in the subject's own world (its materials,
   vocabulary, artifacts) — not "clean/modern".
4. **One signature element** the page is remembered by, and it should encode something true
   about the content (a real schedule, a real timeline) — not decoration like 01/02/03.
5. **Iterate on details** — real photography over stock, hairlines + whitespace over heavy
   shadows, one disciplined accent color used sparingly.

## 3. The method (step by step)

1. **Ground it in the subject.** Name the subject, audience, and the page's single job.
   Mine the subject's world for distinctive material.
2. **Research / take inspiration.** Look at 2–3 real sites in the space (and, if useful,
   what the community says about the space). Note what to borrow and what to avoid.
3. **Propose ~3 distinct directions**, each with a compact token sketch (palette as 4–6
   named hex, a display+body type pairing, a layout concept, and the signature element).
   Show the human ASCII/preview mockups and **let them choose** — direction is the one
   decision that changes everything downstream.
4. **Critique the chosen direction against the defaults** in §1. If any part reads like the
   generic answer, revise it and say why.
5. **Write `DESIGN.md`** (template in §5) as the single source of truth.
6. **Wire the foundations**: load the chosen fonts; put tokens into the framework theme
   (e.g. Tailwind `theme.extend` colors/fonts/radius); add a few reusable helper classes
   (eyebrow, caption, primary button, underline link); set base body/heading styles;
   respect `prefers-reduced-motion`.
7. **Apply incrementally**: do the foundation + the top 1–2 surfaces (header + hero) first,
   get approval, then roll across the rest.

## 4. Restyle-in-place vs. redesign (important working rule)

When the ask is "make it look less AI / more professional", that almost always means
**restyle the existing markup** — keep the content, copy, and layout/positions, change only
the CSS (fonts, colors, borders/shadows, spacing). Do **not** move elements, invent copy, or
add new sections unless explicitly asked. If a layout/content change seems beneficial,
propose it separately and ask first. (Learned the hard way: re-laying-out a hero and adding
copy when the user only wanted a visual restyle was unwelcome.)

## 5. `DESIGN.md` template (copy this into the new project)

```md
# Design System — <Project>

Direction: "<name>" — <one-line description of the feel, grounded in the subject>.
This file is the source of truth. Follow it for any UI change. When unsure, choose the
quietest option that fits the direction.

## Principles
1. Restraint over decoration. Spend boldness in one place (the signature).
2. <Real photography / domain imagery> carries the page.
3. Hairlines + whitespace for structure; shadows are rare and subtle.
4. One accent color, used sparingly (small labels, one CTA, thin rules). Never as gradient.
5. Structure encodes truth (use sequence/numbering only when content is genuinely ordered).

## Color tokens
| token | hex | use |
| base | #______ | page background |
| base-2 | #______ | alternating sections / panels |
| ink | #______ | primary text/headings |
| muted | #______ | secondary text, captions |
| line | #______ | hairline borders/dividers |
| accent | #______ | THE accent — eyebrows, primary CTA, active states |
| accent-ink | #______ | accent hover/pressed |
| (optional) second | #______ | rare secondary, tiny doses only |
Rules: no gradients anywhere; accent never covers large areas; text is ink or muted.

## Typography
- Display: <characterful face, used with restraint> — weights ___
- Body: <complementary humanist face> — weights ___
- Utility: body face, UPPERCASE, tracked — eyebrows/captions/labels
- Do NOT use Inter / system-sans body / Playfair (read as defaults).
Scale: Display clamp(...), H1 __, H2 __, H3 __, Body __ (line-height 1.6–1.7),
Eyebrow __ (uppercase, letter-spacing ~0.16em, accent), Caption __ (uppercase ~0.1em, muted).

## Spacing / radius / borders / motion
- Spacing scale (px): 4,8,12,16,24,32,48,64,96,128. Section padding 96–128 desktop.
- Radius: small + disciplined (e.g. 4px controls, 10px media). No pill-everything, no rounded-all.
- Borders: 1px line. Prefer hairline + whitespace over card shadow.
- Elevation: at most a 1px subtle shadow. No shadow-xl/2xl floaty cards.
- Motion: subtle fade/rise on scroll-in; hover micro-interactions; respect reduced-motion.

## Components
Buttons (primary = accent fill, verb labels; secondary = outline/underline, no 2nd loud color),
section heading block (accent eyebrow + display title), cards (base on base-2, 1px line,
generous padding, subtle hover), images (md radius or square + optional 1px frame + caption),
nav (clean bar, 1px bottom line, accent active/hover underline).

## Signature element
<The one memorable, content-true device this page is remembered by.>

## Logo / brand mark
<Real wordmark or a simple line-art SVG mark in the accent. Never an emoji, never in a
gradient circle.>

## Never do (AI-slop checklist)
- ❌ Gradients (backgrounds, text, buttons)
- ❌ Emoji as icons/logo
- ❌ Rounded-everything / pill buttons
- ❌ shadow-xl/2xl floaty cards; glassmorphism; bento grids
- ❌ Inter/system-sans body or Playfair display
- ❌ Hype copy ("Transform your…", "No X. No Y. Just Z", "Supercharge…")
- ❌ More than one accent color doing loud work
- ❌ Centered gradient hero headline

## Voice & copy
Plain, warm, specific. Name things people recognize. Active voice on every control.
Sentence case. No filler, no hype.
```

## 6. Deploy a shareable preview (for feedback)

1. Create a branch, commit, push to GitHub.
2. If the repo is linked to Vercel, the push auto-builds a **preview deployment**; opening a
   PR surfaces the preview URL via Vercel's bot comment. The preview auto-updates on each push.
3. If the link asks viewers to log in, the Vercel project has **Deployment Protection /
   "Vercel Authentication"** on. Disable it (Project → Settings → Deployment Protection) to
   make preview URLs public, or use the dashboard "Share" link for a temporary bypass.
   (Previews are served `noindex`, so they won't be indexed by search engines.)

## 7. One-paragraph summary

AI sites look the same because the model defaults to the average of its training data. Beat
it by (a) grounding the design in the real subject, (b) choosing one deliberate aesthetic
direction with the human, (c) encoding that into a `DESIGN.md` of exact tokens plus a
"never-do" list, and (d) executing with restraint — one accent, hairlines over shadows,
real type and imagery, a single signature element — restyling existing markup in place
rather than re-inventing layout and copy.
