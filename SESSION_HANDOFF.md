# Session Handoff — Hare Krishna Temple Avadi site

**Date:** 2026-06-27
**Branch:** `design-refresh` (PR #1 → `main`, not merged)
**Preview (public):** https://hare-krishna-website-git-desi-657d6c-vigneshs-projects-7df83e8a.vercel.app
**Stack:** Vite + React + TypeScript + Tailwind; Supabase + ImageKit; deployed on Vercel from GitHub (`VigneshSM79/hare_krishna_website`).

> Read this first when resuming. It says what this session did, the current state, the
> decisions that constrain future work, and what's left.

---

## What this session was about

Goal: the site "felt AI-made, not built by an expert." We (a) researched *why* AI sites look
generic, (b) chose a deliberate design direction, (c) restyled the site to it, and (d) shipped
a public Vercel preview to share for feedback. Also replaced the favicon and saved reusable docs.

## What we did

1. **Research.** Used an authenticated Reddit client to pull "AI-slop website" threads.
   Findings + method are saved in `DESIGN_PLAYBOOK.md` (portable, reusable in other projects).
2. **Chose a direction: "Living Temple"** — calm, contemporary cultural-institution feel,
   grounded in temple tradition (not startup defaults). Full spec in `DESIGN.md`.
3. **Foundations:** added Google Fonts **Spectral** (display) + **Hanken Grotesk** (body) in
   `index.html`; added theme tokens to `tailwind.config.js` (paper/ink/stone/line/saffron/
   peacock, fonts, radius); added helper classes in `src/index.css` (`.eyebrow`, `.caption`,
   `.btn-primary`, `.link-underline`) and base styles; respects `prefers-reduced-motion`.
4. **Restyled in place** (content & layout kept, CSS only) — Header, Hero, About, Programs,
   Events, Gallery, Contact, Footer, Donation page, and the CookieConsent banner.
   Replaced the 🕉 emoji logo with a line-art **LotusMark** SVG (`src/components/LotusMark.tsx`,
   used by Header + Footer).
5. **Targeted fixes during review:**
   - Hero: headline on one line + tighter spacing so more of the image shows on load.
   - Header nav bug: `isActive` was highlighting *all* `/#` links on the homepage; now hash
     links only highlight on hover (route pages still highlight when active).
   - Contact: Address + "How to Reach Us" now side-by-side, split by a divider line.
   - Favicon: replaced Vite default with the gold temple emblem (`public/favicon.jpg`) +
     apple-touch-icon.
6. **Deploy/share:** created branch + PR; Vercel auto-builds the preview. Disabled the
   project's **Vercel Authentication** (Deployment Protection) via API so the preview URL is
   public (production unaffected; previews are `noindex`).
7. **Docs saved:** `DESIGN_PLAYBOOK.md` (portable design method + DESIGN.md template),
   `DONATE_PAGE_ROADMAP.md` (parked donate-page backlog), this handoff.

## Key decisions / constraints (don't violate without asking)

- **Restyle in place** — when improving look, keep content/copy/layout; change CSS only.
  Don't move elements, add copy, or add sections unless explicitly asked.
- **No ISKCON blue-header clone** — that direction was tried and rejected; the old
  `DESIGN_RECOMMENDATIONS.md` (repo root, parent folder) drove it. Ignore it.
- **AI-slop never-do list** (see `DESIGN.md` §8): no gradients, no emoji-as-icon, no
  rounded-everything/pill buttons, no floaty shadows, no Inter/Playfair, no hype copy,
  one accent color only.

## Current state / what's left

**Done & on the preview:** whole homepage + donate page + cookie banner restyled; favicon live.

**Not yet restyled (still old orange style):**
- `/festivals` (`FestivalCalendar.tsx`) and `EventCarousel.tsx`
- `/offer-service` (`OfferService.tsx`)
- `PrivacyPolicy.tsx`, `TermsOfService.tsx` (linked from the cookie banner)

**Known issues / TODO:**
- Donate page references `/upi-qr.png` which **doesn't exist** → broken image. Need the real UPI QR.
- Donate page minor cleanups: outer wrapper still `bg-white` (→ `paper`); error box still `rounded-xl` (→ `rounded-md`).
- Donate page feature backlog: see `DONATE_PAGE_ROADMAP.md` (preset amounts, outcome framing,
  email field, occasion option, cause copy/imagery, consent; bigger: 80G, payment gateway).
- Hero schedule note: an earlier "Temple Day" timetable was removed (real timings already
  exist elsewhere on the site).
- Favicon corners are black (image has black bg); optional: make transparent. Google search
  favicon refresh is on Google's crawl schedule (slow).

**To ship to production:** merge PR #1 into `main`.

## Useful references in the repo

- `DESIGN.md` — the design system (source of truth for any UI change).
- `DESIGN_PLAYBOOK.md` — portable "make it not look AI" guide + DESIGN.md template.
- `DONATE_PAGE_ROADMAP.md` — donate-page backlog (ISKCON Annadana comparison).
- Auto-memory also records: "restyle in place, don't redesign" and the HK design system.
