# Design: thebravebyte.pages.dev

Structure: [information-architecture.md](information-architecture.md). Copy:
[voice.md](voice.md).

## Stance

Simplicity, held to a high standard. The site is a record of work, read like an index.
Typography and structure carry it; there is nothing decorative to look past. References
the owner chose: hammedarowosegbe.com and developer-story.vercel.app.

## System

- **Column:** one reading column, 736px. Header and footer sit wider at 1040px.
- **Colour:** monochrome zinc. Light `#fcfcfc` on `#09090b`, dark inverted. Colour
  appears only as a real state in the payout simulation (settled, unsure, paid twice).
- **Type:** Geist for prose and headings, Geist Mono for records: index rows, metadata,
  labels, links. Headings are tight (`-0.045em`). Labels are 11px mono uppercase and are
  used only for genuine metadata (Date, Role, Stack, Outcome).
- **Lines:** 1px borders between rows. No cards, no shadows, no radius on media.
- **Links:** mono text with an underline rule and an arrow (↓ ↗ →).

## Pages

- **Home:** label, headline, one line, two text links. Then the project index (year,
  name, selected flag, one line, tags and duration, arrow) and the notes index, each note
  shown by its lesson.
- **Record (`/work/[slug]`):** tags and year, title, summary, lead media, then rows for
  context, role, timeline and date; overview with outcome; numbered engineering points;
  hardest problem; stack; links; next.
- **About:** profile record with a small greyscale portrait, fact rows, practice, the
  experience index.
- **Writing:** notes and articles as indexes; a note renders its seven sections as
  labelled records.

## Imagery

Only on record pages, and only real: screenshots of babit, Rixl's docs, Eazyfit and
BiTraq (AVIF + WebP in `public/img/work/`), the bloom-parser pipeline drawn from its
README, and the payout simulation on the remittance record. The home page has no images.

## Motion

Almost none: the arrow on a hovered row moves 4px; the simulation steps in at 240ms;
the diagram's dash flows. All of it stops under reduced motion.
