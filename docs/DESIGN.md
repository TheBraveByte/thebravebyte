# Design: thebravebyte.pages.dev

Structure lives in [information-architecture.md](information-architecture.md), copy rules
in [voice.md](voice.md). This file is the visual and motion direction, written to the
byte.ai `PREMIUM.md` standard: would this pass as an agency-built site?

## Stance

A backend engineer's work is invisible: nobody screenshots a retry policy. So the site
shows the thinking working. The hero is not a claim about reliability; it is a small
system you can break. Everything else follows the studio rule: media leads, type follows.

## System

- **Ground:** dark ink by default (`#0a0c10`), a cool light theme as the alternative.
  Ambient light comes from layered radial gradients and a faint dot matrix that fades
  out, plus SVG grain at 4 percent on a fixed layer.
- **Accent:** one signal green (`#3fe0a0` dark, `#0b8a5a` light). It means "settled"
  in the simulation and is used for links, focus and the primary button. Amber and red
  appear only as real states in the simulation (unsure, paid twice).
- **Type:** Geist for everything, Geist Mono for data, states and metadata. Display
  sizes tight (`-0.035em`), body at 17px.
- **Shape:** 14px radius on panels and media, 999px on pills and buttons. Nothing else.
- **Glass:** only the header and the simulation bezel, each over something real (the
  glow). Blur + saturate + hairline + inner highlight, solid fallback under
  `prefers-reduced-transparency`.

## Imagery

Real media only, from the projects themselves. No stock: a photo of a server rack
would be the exact generic signal this site is arguing against.

| Placement | Media | Why |
|---|---|---|
| Hero | The payout simulation | The work is behaviour, so the hero is behaviour |
| Selected work | babit landing, Rixl docs, Eazyfit app, BiTraq landing | Real products, real screenshots |
| bloom-parser | Its pipeline as a drawn diagram | Backend work is better shown as its shape |
| About | Portrait | People hire people |
| Closing | The hero's glow returns behind the contact line | The page ends instead of stopping |

All images are AVIF + WebP at 800/1400/2000 in `public/img/work/`, originals in
`assets/originals/`. `<picture>` with width and height everywhere.

## Motion

- **Signature move (one):** the simulation. Each step of the payout path appears on a
  timeline as it happens (enter 280ms, `cubic-bezier(0.22, 1, 0.36, 1)`), the ledger
  numbers count, the state pill changes colour. It runs once on load in "confirm
  first" mode, then waits for the visitor.
- **Handovers (two):** a vertical ledger rule on the left edge that runs from the hero
  through the work section; the hero glow reappearing under the closing section.
- **Reveals:** below the fold only, 400ms, fall back to visible. The hero headline and
  simulation paint immediately.
- **Hover:** project media scales 1.03 inside its frame; the caption arrow moves 2px.
- **Reduced motion:** the simulation renders its final state instantly, ambient
  gradients stop, reveals are instant.

## Not doing

Smooth-scroll libraries, 3D, cursor effects, marquees, stat counters, logo walls,
typing animations, a skills grid.
