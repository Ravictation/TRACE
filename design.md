# Design — TRACE

A locked design system for this game. Every screen reads this file before
emitting code. Do not regenerate per screen — extend or amend this file when
the system needs to grow.

## Genre
atmospheric — dark canvas, AI-tool register, drama via atmosphere. The terminal
is the identity: TRACE is a verification desk, not a casual quiz game.

## Macrostructure family
Single-screen application (Desktop Terminal). The split layout is the
macrostructure: social evidence pane (left) + investigation workbench (right).
Variation lives in per-tool component voice, not page shape.

- App screen: Split Workbench (feed / tools / verdict rail)

## Theme
Anchor hue: midnight-cool (262). Accent: phosphor green (150) — "the system
knows" register. Warning amber (80) for urgency, danger red (25) for critical.
No pure #000, no pure #fff. Neutrals carry 0.012–0.016 chroma toward 262.

- `--color-paper`   oklch(13% 0.012 262)  — app background
- `--color-panel`   oklch(17% 0.014 262)  — surface (lighter = elevated)
- `--color-panel-2` oklch(21% 0.016 262)  — highest surface
- `--color-rule`    oklch(28% 0.014 262)  — borders
- `--color-muted`   oklch(66% 0.012 262)  — secondary text
- `--color-text`    oklch(93% 0.008 262)  — ink
- `--color-accent`  oklch(78% 0.13 150)   — phosphor green (active, focus, CTA, links)
- `--color-warning` oklch(78% 0.14 80)    — amber (urgency ≥ 70 %)
- `--color-danger`  oklch(62% 0.19 25)    — red (critical ≥ 90 %)
- `--color-success` oklch(75% 0.13 155)   — green (confirmation)

Accent discipline: highlighter only. Active tab, focus ring, CTA border/text,
small tags. Never a full-surface fill. Semantic states (warning/danger) always
paired with an icon or pattern, never colour alone.

## Typography
2 faces — mono-dominant by design (terminal game):
- UI / display: JetBrains Mono Variable, weight 400/700, style normal
- Body / prose: Geist Variable, weight 400/500
- Wordmark: JetBrains Mono 700, tracking 0.2em (TRACE)
- Type scale anchor: 1.25 (major third), base 16px
- Headings: mono, uppercase micro-labels tracking 0.08–0.14em
- Data (counters, timers): tabular-nums always
- No italic headers. No font below 10px. Body ≥ 14px.

## Spacing
Tailwind default 4px scale. Cards: p-4, panel gap-3, tool panels p-4.
Verdict rail separated by border-t. Consistent, not decorative.

## Motion
- Easings: default cubic-bezier(0.16, 1, 0.3, 1) via Tailwind defaults
- Reveal pattern: fade-in + 8px rise (300ms) on panel switches only
- Semantic pulse: share-counter urgency (warning/danger) — functional, not decorative
- Reduced-motion fallback: all animation collapsed to 0.01ms
- No slide, no bounce, no parallax. Atmosphere does the work.

## Microinteractions stance
- Silent success (✓ + colour shift), no celebratory toasts
- Typing indicator: 3 dots, staggered blink
- Focus: 2px phosphor ring, 2px offset, instant (never animated)

## CTA voice
- Primary: mono uppercase, tracking wider, text-accent on accent/10 border accent,
  hover accent/20. Full-width in the verdict rail.
- Secondary: mono uppercase, text-muted border-rule, hover text-text.

## Per-screen allowances
- App screens MUST NOT use enrichment — function carries the screen.
- Platform mocks (X / IG / FB / WA) keep their native platform colours inside
  the mock post: they are evidence content, not app chrome. Borders harmonise
  to --color-rule.

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
  --color-paper:      oklch(13% 0.012 262);
  --color-panel:      oklch(17% 0.014 262);
  --color-panel-2:    oklch(21% 0.016 262);
  --color-rule:       oklch(28% 0.014 262);
  --color-muted:      oklch(66% 0.012 262);
  --color-text:       oklch(93% 0.008 262);
  --color-accent:     oklch(78% 0.13 150);
  --color-warning:    oklch(78% 0.14 80);
  --color-danger:     oklch(62% 0.19 25);
  --color-success:    oklch(75% 0.13 155);
  --color-focus:      oklch(78% 0.13 150);

  --font-display: "JetBrains Mono Variable", monospace;
  --font-body:    "Geist Variable", sans-serif;

  --space-3xs: 0.25rem;  --space-2xs: 0.5rem;  --space-xs: 0.75rem;
  --space-sm:  1rem;     --space-md:  1.5rem;  --space-lg: 2rem;
  --space-xl:  3rem;     --space-2xl: 4.5rem;  --space-3xl: 7rem;

  --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-md: 1.125rem;
  --text-lg: 1.375rem; --text-xl: 1.75rem;  --text-2xl: 2.25rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 220ms;
  --radius-card: 8px; --radius-pill: 999px; --radius-input: 6px;
}
```

### Tailwind v4 `@theme` (live in src/styles/global.css)
```css
@theme {
  --color-bg:    oklch(13% 0.012 262);   /* paper */
  --color-panel: oklch(17% 0.014 262);
  --color-panel2: oklch(21% 0.016 262);
  --color-border: oklch(28% 0.014 262);  /* rule */
  --color-muted: oklch(66% 0.012 262);
  --color-text:  oklch(93% 0.008 262);   /* ink */
  --color-accent: oklch(78% 0.13 150);
  --color-warning: oklch(78% 0.14 80);
  --color-danger: oklch(62% 0.19 25);
  --color-success: oklch(75% 0.13 155);
  --color-focus: oklch(78% 0.13 150);

  --font-sans: "Geist Variable", system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", monospace;
}
```

### DTCG `tokens.json`
```json
{
  "color": {
    "paper":  { "$value": "oklch(13% 0.012 262)", "$type": "color" },
    "panel":  { "$value": "oklch(17% 0.014 262)", "$type": "color" },
    "panel2": { "$value": "oklch(21% 0.016 262)", "$type": "color" },
    "rule":   { "$value": "oklch(28% 0.014 262)", "$type": "color" },
    "muted":  { "$value": "oklch(66% 0.012 262)", "$type": "color" },
    "text":   { "$value": "oklch(93% 0.008 262)", "$type": "color" },
    "accent": { "$value": "oklch(78% 0.13 150)",  "$type": "color" },
    "warning":{ "$value": "oklch(78% 0.14 80)",  "$type": "color" },
    "danger": { "$value": "oklch(62% 0.19 25)",  "$type": "color" },
    "success":{ "$value": "oklch(75% 0.13 155)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "JetBrains Mono Variable", "$type": "fontFamily" },
    "body":    { "$value": "Geist Variable", "$type": "fontFamily" }
  },
  "space": {
    "sm": { "$value": "1rem", "$type": "dimension" },
    "md": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables
```css
:root {
  --background:        0.13 0.012 262;   /* paper */
  --foreground:        0.93 0.008 262;   /* ink */
  --primary:           0.78 0.13 150;    /* accent */
  --primary-foreground: 0.13 0.012 262;  /* paper */
  --muted:             0.21 0.016 262;   /* panel-2 */
  --muted-foreground:  0.66 0.012 262;   /* muted */
  --border:            0.28 0.014 262;   /* rule */
  --input:             0.28 0.014 262;   /* rule */
  --ring:              0.78 0.13 150;    /* focus */
  --destructive:       0.62 0.19 25;     /* danger */
  --radius:            0.5rem;
}
```
