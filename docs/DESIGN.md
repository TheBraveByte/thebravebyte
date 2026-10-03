# Design: yusuf.foldlabs.pro

Structure: [information-architecture.md](information-architecture.md). Copy:
[voice.md](voice.md).

## The idea

Yusuf's work has one through-line, and it started with a fire detector: deciding when to
sound the alarm when a missed fire costs more than a false one. Every system since answers
the same question with more at stake: what should a system do when it isn't sure?

The idea is carried, not lectured: one sentence on the home page ("I design them for the
moment things stop going to plan"), one-line pitches that encode it ("Cross-border payouts
that can't go out twice"), and a compact "When things go wrong" list on each system page.
About tells the fire-alarm story in three short paragraphs.

## Length budget

People scan: they read 20 to 28 percent of a page's words (NN/g), and recruiters give a
first pass about 7 seconds (Ladders eye-tracking, 2018). Measured on 2026-10-03, the home
pages of leerob, paco.me, brandur and rauchg run 1.1 to 2.2 screens and 74 to 208 words.
Budget here: home about one screen and under 150 words; any other page under two screens
on a phone. Measure with the scratch `measure.mjs` before adding anything.

## System

- **Column:** one 680px column, left aligned, generous space. Header and footer share it.
- **Type:** Inter for reading, Roboto Mono for labels and metadata (the owner chose the type of hammedarowosegbe.com). Body 16px, lists 15px, page titles 28 to 32px, home headline 56px at -0.045em.
  Mono appears only inside code and the simulation's timestamps.
- **Colour:** ink on paper-white, inverted in dark mode. One signal orange, an alarm
  colour, used only for the "then" arrows and the diagram's flow.
- **Separators:** space, not rules. Links are underlined text, not buttons.
- **Media:** only on system pages, only real: screenshots of babit, Rixl's docs, Eazyfit
  and BiTraq; the bloom-parser pipeline drawn from its README; the payout simulation on the
  remittance page, which is its "when the vendor never answers" made interactive.

## Motion

Almost none: the simulation steps in at 240ms and the diagram's dash flows. Both stop
under reduced motion.

## Mark and motion (2026-10-03)

**Mark:** a Y drawn as a fork: two paths meet at one decision point and continue as one.
The node is the signal orange, the same colour the site uses for "what the system does".
Source: `frontend/components/LogoMark.vue`; favicons in `frontend/public/` (`favicon.svg`
adapts to dark mode; PNGs and `favicon.ico` are rendered from the same paths).

**Motion:** one curve (`--ease-out`), transform and opacity only, everything off under
`prefers-reduced-motion`.
- The mark draws itself once per visit (the header persists across routes).
- The home headline's words rise out of a mask; the rest of the hero follows with a short stagger.
- Below the fold, `data-reveal` elements fade up as they enter view. The variants are `wipe` for
  images and `chain` for the ownership trail. The "→" in each "When things go wrong" line lands
  just after its line. Hiding is opt-in via `html.js-reveal`, so content never depends on JS.
- Arrows lean toward their destination on hover (fine pointers only).
- Notes show a reading-progress hairline (CSS scroll-driven animation, where supported).
