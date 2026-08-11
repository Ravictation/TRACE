# Design — TRACE

A locked design system for this game. Every screen reads this file before
emitting code. Do not regenerate per screen — extend or amend this file when
the system needs to grow.

## Genre
neo-brutalist game UI — the verification desk as a sticker wall. Cream paper,
thick black borders, hard offset shadows, saturated accent blocks. The
aesthetic of a fact-checking game that looks like it was printed in a zine.

## Macrostructure family
Single-screen application (Desktop Terminal). The split layout is the
macrostructure: social evidence pane (left) + investigation workbench (right).
Variation lives in per-tool component voice, not page shape.

- App screen: Split Workbench (feed / tools / verdict rail)

## Theme
Neobrutalism — light paper, warm-black ink, hard shadows. Accent = signal
yellow (the "marker" register). Semantic states stay saturated: orange
warning, red danger, green success. No gradients, no blur, no soft shadows,
no rounded corners (radius 0 everywhere).

- `--color-paper`   oklch(95% 0.02 90)   — app background (cream)
- `--color-panel`   oklch(98% 0.015 90)  — surface (near-white cream)
- `--color-panel-2` oklch(88% 0.03 85)   — recessed surface (warm tan)
- `--color-rule`    oklch(22% 0.03 60)   — warm black (2px borders)
- `--color-muted`   oklch(48% 0.03 70)   — secondary text
- `--color-text`    oklch(18% 0.03 60)   — ink (warm black)
- `--color-accent`  oklch(86% 0.19 95)   — signal yellow (active, focus, highlights)
- `--color-warning` oklch(70% 0.19 55)   — orange (urgency ≥ 70 %)
- `--color-danger`  oklch(58% 0.22 30)   — red (critical ≥ 90 %)
- `--color-success` oklch(58% 0.17 150)  — green (confirmation)

Hard shadow token: `4px 4px 0 0 var(--color-rule)` — never blurred.
Accent discipline: yellow is a marker — active tab, focus ring, CTA fill,
small sticker blocks. Text on accent = warm black. Semantic states always
paired with an icon or pattern, never colour alone.

## Typography
3 faces — display-led brutalism, mono for the machine:
- Display / wordmark: Space Grotesk Variable, weight 700, roman
- Body / prose: Geist Variable, weight 400/500
- UI / data / labels: JetBrains Mono Variable, weight 400/700
- Wordmark: Space Grotesk 700, tracking 0.06em, hard text-shadow (3px 3px 0 accent)
- Type scale anchor: 1.25 (major third), base 16px
- Data (counters, timers): tabular-nums always
- No italic headers. No font below 10px. Body ≥ 14px.

## Spacing
Tailwind default 4px scale. Cards: p-4, panel gap-3, tool panels p-4.
Border weight carries hierarchy: 2px black borders everywhere, no hairlines.

## Motion
- Press states: translate(2px, 2px) + shadow removed on :active — the sticker
  gets pushed into the wall. 50ms, no easing ceremony.
- Reveal pattern: fade-in + 8px rise (300ms) on panel switches only
- Semantic pulse: share-counter chip pulses opacity (warning/danger)
- Reduced-motion fallback: all animation collapsed to 0.01ms
- No slide, no bounce, no parallax.

## Microinteractions stance
- Silent success (✓ + colour shift), no celebratory toasts
- Typing indicator: 3 dots, staggered blink
- Focus: 3px warm-black outline, 2px offset, instant (never animated)

## CTA voice
- Primary: yellow fill, black 2px border, hard shadow, mono uppercase.
  :active pushes in (translate + shadow none). Full-width in the verdict rail.
- Secondary: paper fill, black border, hard shadow, mono uppercase.

## Per-screen allowances
- App screens MUST NOT use enrichment — function carries the screen.
- Platform mocks (X / IG / FB / WA / TikTok) keep their native dark platform
  colours INSIDE the frame: they are evidence content (app screenshots on the
  desk). The outer frame gets the brutalist treatment — 2px black border,
  hard shadow, square corners — so they read as pinned evidence.

## What screens MUST share
- The wordmark register (JetBrains Mono 700, wide tracking).
- The accent and its placement (≤ 3 % per viewport).
- Mono for every header, label, button, counter.
- Geist for every paragraph of prose.
- The urgency ladder: normal → warning ≥ 70 % → danger ≥ 90 %.

## What screens MAY differ on
- Per-tool layouts inside the investigation pane (grid, list, chat, slider).
- Nothing else. Consistency is the goal.

## Exports

Drop-in formats for re-using this design system in other projects.

### tokens.css
```css
:root {
  --color-paper:      oklch(95% 0.02 90);
  --color-panel:      oklch(98% 0.015 90);
  --color-panel-2:    oklch(88% 0.03 85);
  --color-rule:       oklch(22% 0.03 60);
  --color-muted:      oklch(48% 0.03 70);
  --color-text:       oklch(18% 0.03 60);
  --color-accent:     oklch(86% 0.19 95);
  --color-warning:    oklch(70% 0.19 55);
  --color-danger:     oklch(58% 0.22 30);
  --color-success:    oklch(58% 0.17 150);
  --color-focus:      oklch(22% 0.03 60);

  --font-display: "Space Grotesk Variable", sans-serif;
  --font-body:    "Geist Variable", sans-serif;
  --font-mono:    "JetBrains Mono Variable", monospace;

  --shadow-hard: 4px 4px 0 0 var(--color-rule);

  --space-3xs: 0.25rem;  --space-2xs: 0.5rem;  --space-xs: 0.75rem;
  --space-sm:  1rem;     --space-md:  1.5rem;  --space-lg: 2rem;
  --space-xl:  3rem;     --space-2xl: 4.5rem;  --space-3xl: 7rem;

  --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-md: 1.125rem;
  --text-lg: 1.375rem; --text-xl: 1.75rem;  --text-2xl: 2.25rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 50ms;
  --radius-card: 0; --radius-pill: 0; --radius-input: 0;
}
```

### Tailwind v4 `@theme` (live in src/styles/global.css)
```css
@theme {
  --color-bg:     oklch(95% 0.02 90);    /* paper */
  --color-panel:  oklch(98% 0.015 90);
  --color-panel2: oklch(88% 0.03 85);
  --color-border: oklch(22% 0.03 60);    /* rule — warm black */
  --color-muted:  oklch(48% 0.03 70);
  --color-text:   oklch(18% 0.03 60);    /* ink */
  --color-accent: oklch(86% 0.19 95);    /* signal yellow */
  --color-warning: oklch(70% 0.19 55);   /* orange */
  --color-danger: oklch(58% 0.22 30);    /* red */
  --color-success: oklch(58% 0.17 150);  /* green */
  --color-focus:  oklch(22% 0.03 60);    /* black focus ring */

  --shadow-hard: 4px 4px 0 0 oklch(22% 0.03 60);

  --font-sans: "Geist Variable", system-ui, sans-serif;
  --font-display: "Space Grotesk Variable", sans-serif;
  --font-mono: "JetBrains Mono Variable", monospace;
}
```

### DTCG `tokens.json`
```json
{
  "color": {
    "paper":  { "$value": "oklch(95% 0.02 90)", "$type": "color" },
    "panel":  { "$value": "oklch(98% 0.015 90)", "$type": "color" },
    "panel2": { "$value": "oklch(88% 0.03 85)", "$type": "color" },
    "rule":   { "$value": "oklch(22% 0.03 60)", "$type": "color" },
    "muted":  { "$value": "oklch(48% 0.03 70)", "$type": "color" },
    "text":   { "$value": "oklch(18% 0.03 60)", "$type": "color" },
    "accent": { "$value": "oklch(86% 0.19 95)",  "$type": "color" },
    "warning":{ "$value": "oklch(70% 0.19 55)",  "$type": "color" },
    "danger": { "$value": "oklch(58% 0.22 30)",  "$type": "color" },
    "success":{ "$value": "oklch(58% 0.17 150)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Space Grotesk Variable", "$type": "fontFamily" },
    "body":    { "$value": "Geist Variable", "$type": "fontFamily" },
    "mono":    { "$value": "JetBrains Mono Variable", "$type": "fontFamily" }
  },
  "space": {
    "sm": { "$value": "1rem", "$type": "dimension" },
    "md": { "$value": "1.5rem", "$type": "dimension" }
  },
  "shadow": {
    "hard": { "$value": "4px 4px 0 0 oklch(22% 0.03 60)", "$type": "shadow" }
  }
}
```

### shadcn/ui CSS variables
```css
:root {
  --background:        0.95 0.02 90;     /* paper */
  --foreground:        0.18 0.03 60;     /* ink */
  --primary:           0.86 0.19 95;     /* accent */
  --primary-foreground: 0.22 0.03 60;    /* rule */
  --muted:             0.88 0.03 85;     /* panel-2 */
  --muted-foreground:  0.48 0.03 70;     /* muted */
  --border:            0.22 0.03 60;     /* rule */
  --input:             0.22 0.03 60;     /* rule */
  --ring:              0.22 0.03 60;     /* focus */
  --destructive:       0.58 0.22 30;     /* danger */
  --radius:            0rem;
}
```
