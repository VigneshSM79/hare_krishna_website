# Design System — Hare Krishna Temple Avadi

**Direction: "Living Temple"** — a calm, contemporary cultural-institution feel (think a
well-funded heritage site or museum), grounded in the temple's own world rather than
startup/landing-page defaults. Whitespace, real photography, and disciplined typography do
the work. Warmth comes from a single saffron accent used sparingly — never gradients.

This file is the source of truth. The AI must follow it for any UI change or addition.
When a choice isn't covered here, prefer the quietest option that fits the direction.

---

## 1. Principles

1. **Restraint over decoration.** Spend boldness in one place (the signature). Everything
   else stays quiet.
2. **Photography carries the page.** Real temple/festival/deity photos, not stock or icons.
3. **Hairlines, not shadows.** Structure with 1px rules and whitespace. Shadows are rare and
   subtle.
4. **Saffron is a seasoning, not a sauce.** One accent color, used for small eyebrows, a
   single primary CTA, thin underlines, active states. Never as a background gradient.
5. **Structure encodes truth.** Use structural devices (the daily schedule, a festival
   calendar) because the content genuinely is sequential/time-based — not as decoration.

---

## 2. Color tokens

| Token         | Hex       | Use |
|---------------|-----------|-----|
| `paper`       | `#FBFAF7` | Page background (warm off-white) |
| `paper-2`     | `#F4F1EA` | Alternating section background, subtle panels |
| `ink`         | `#232020` | Primary text, headings |
| `stone`       | `#6B6660` | Secondary text, captions, metadata |
| `line`        | `#E4DFD6` | Hairline borders, dividers |
| `saffron`     | `#CD6A2B` | THE accent — eyebrows, primary CTA, active nav, rules |
| `saffron-ink` | `#A8521D` | Saffron hover / pressed (darker, for contrast on hover) |
| `peacock`     | `#16564C` | Rare secondary — only for links in body copy or a single tag. Optional. |

**Rules**
- No gradients anywhere (no `bg-gradient-*`, no gradient text). If a hero photo needs
  legibility, use a flat semi-transparent `ink` overlay, not a gradient.
- Saffron must never cover large areas. Buttons yes; section backgrounds no.
- Text on `paper`/`paper-2` is always `ink` (primary) or `stone` (secondary).

---

## 3. Typography

**Faces** (Google Fonts)
- **Display — `Spectral`** (literary serif). Headings, hero, verses, schedule times.
  Weights 400/500/600. Used with restraint and generous size.
- **Body — `Hanken Grotesk`** (humanist grotesk). Body copy, UI, buttons, nav.
  Weights 400/500/600/700.
- **Utility** — Hanken Grotesk, uppercase, tracked. Eyebrows, labels, captions, nav.

Do **not** use Inter, default system sans, or Playfair — those read as defaults.

**Scale** (`clamp` for fluid display sizes)
| Role        | Size | Family / weight | Notes |
|-------------|------|-----------------|-------|
| Display     | `clamp(2.75rem, 6vw, 4.5rem)` | Spectral 500 | line-height 1.05, hero only |
| H1          | `2.5rem`   | Spectral 500 | page titles |
| H2          | `1.875rem` | Spectral 500 | section titles |
| H3          | `1.25rem`  | Spectral 600 | card / sub headings |
| Body-lg     | `1.25rem`  | Hanken 400   | lead paragraphs, line-height 1.6 |
| Body        | `1.0625rem`| Hanken 400   | default, line-height 1.7 |
| Eyebrow     | `0.78rem`  | Hanken 600   | UPPERCASE, letter-spacing `0.16em`, color `saffron` |
| Caption     | `0.8125rem`| Hanken 500   | UPPERCASE, letter-spacing `0.1em`, color `stone` |

Headings use Spectral. Never bold-weight a serif heading past 600.

---

## 4. Spacing, radius, borders, motion

- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section vertical padding:
  `96–128` desktop, `56–72` mobile. Be generous; whitespace is the brief.
- **Radius (disciplined — rounding everything is an AI tell):**
  `--r-sm: 4px` (buttons, inputs), `--r-md: 10px` (images, cards). Never fully-rounded
  "pill" buttons except none — buttons are 4px. No `rounded-full` on containers.
- **Borders:** 1px `line`. Prefer a hairline + whitespace over a card shadow.
- **Elevation:** at most `0 1px 2px rgba(35,32,32,.06)`. No `shadow-xl`/`shadow-2xl`,
  no floating offset cards.
- **Motion:** subtle only. Fade + 8–12px rise on scroll-in (≤500ms, ease-out). Nav
  underline grow on hover. Always respect `prefers-reduced-motion`. No parallax, no
  auto-playing carousels of effects.

---

## 5. Components

**Buttons**
- Primary: `saffron` bg, `paper` text, 4px radius, `hover:saffron-ink`. Label is a verb
  ("Plan your visit", "Donate", "Offer a service").
- Secondary: text link in `ink` with a saffron underline that grows on hover, or a 1px
  `line` outline button. No second filled color.

**Section heading block**
```
EYEBROW (saffron, tracked caps)
Section Title          ← Spectral H2
optional one-line stone subtitle
```
No centered gradient text. No decorative underline bar under every title (the eyebrow is
the device).

**Cards**
- `paper` on `paper-2` sections (or vice-versa), 1px `line`, `--r-md`, generous internal
  padding (24–32). Image top, then H3 + stone body. Subtle hover: border darkens to
  `stone`/translate 2px — not a big shadow lift.

**Images**
- `--r-md` radius (or square for editorial blocks), optional 1px `line` frame.
- Caption below in Caption style (tracked caps, stone).
- For text-over-image, flat `ink/55` overlay only.

**Nav**
- Single clean bar on `paper` with a 1px `line` bottom. Logo left, links center/right,
  one saffron "Donate" CTA. Links: Hanken 500, `ink`, hover `saffron` with a thin
  saffron underline grow. Active route gets a persistent saffron underline.

---

## 6. Signature element — "The Temple Day"

A horizontal editorial **timetable** of the daily schedule, used on the home page (and
echoable on inner pages). It encodes the real rhythm of temple life, so it earns its place.

```
THE TEMPLE DAY
04:30  Mangala Arati        12:30  Raj Bhog Arati
07:15  Darshan & Guru Puja  16:30  Dhup Arati
08:00  Srimad Bhagavatam    19:00  Sandhya Arati
```
- Times in **Spectral** (tabular feel), labels in body Hanken.
- Separated by `line` hairlines, not boxes.
- Eyebrow "THE TEMPLE DAY" in saffron caps.

Secondary motif: a quiet full-width band with the **Maha Mantra** set in Spectral on
`paper-2`, low-contrast — a breathing space between sections, not a hero gimmick.

---

## 7. Logo / brand mark

Replace the 🕉-emoji-in-gradient-circle. Use a **wordmark**:
- "Hare Krishna Temple" in Spectral 500, `ink`.
- "AVADI · CHENNAI" beneath in Caption style (tracked caps, stone).
- Optional small line-art mark (lotus or tilak) in `saffron`, 1.5px stroke SVG — never an
  emoji, never inside a gradient circle.

---

## 8. Never do (AI-slop checklist)

- ❌ Gradients of any kind (backgrounds, text, buttons).
- ❌ Emoji used as icons or logo.
- ❌ Rounded corners on everything / pill-shaped buttons.
- ❌ `shadow-xl`/`shadow-2xl` floaty cards; glassmorphism; bento grids.
- ❌ Default Inter / system-sans body, or Playfair display.
- ❌ Cookie-cutter copy ("Transform your…", "No X. No Y. Just Z", "Supercharge…").
- ❌ More than one accent color doing loud work.
- ❌ Centered gradient hero headline.

---

## 9. Voice & copy

Plain, warm, specific. Name things people recognize ("Daily darshan", "Plan your visit",
"Offer a service"). Active voice on every control. Sentence case. No filler, no hype.
Sanskrit terms are welcome where authentic (Mangala Arati, prasadam, kirtan) — gloss them
lightly when needed.
