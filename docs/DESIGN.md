# Design: thebravebyte.pages.dev

Structure: [information-architecture.md](information-architecture.md). Copy:
[voice.md](voice.md).

## The idea

Yusuf's work has one through-line, and it started with a fire detector: deciding when to
sound the alarm when a missed fire costs more than a false one. Every system since answers
the same question with more at stake: what should a system do when it isn't sure?

So the site is organised around what goes wrong, not around a project list. The home page
is a list of situations ("When the payout vendor never answers,") each followed by what the
system does about it and the system where it was built. Projects sit one click down and
are described the same way. About tells the fire-alarm story.

## System

- **Column:** one 680px column, left aligned, generous space. Header and footer share it.
- **Type:** Geist only. Situations at 22 to 26px, body at 18px, metadata at 15px muted.
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
