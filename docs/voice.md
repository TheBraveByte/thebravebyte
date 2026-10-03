# Voice: Yusuf Akinleye

How the GitHub profile, repository READMEs, engineering notes and
thebravebyte.pages.dev should sound. Read the paired examples first; they teach
more than the rules.

## Voice attributes

- **Direct, not blunt.** Say what the thing is in the first sentence. No warm-up,
  but no curtness either.
- **Understated, not modest.** State what was built and let the reader judge it.
  Don't hide ownership ("helped with") when the work was mine.
- **Concrete, not technical for its own sake.** Name the mechanism (a transaction,
  a lease, a retry with backoff) when it explains the decision. Drop jargon that
  only signals expertise.
- **Honest, not hedged.** Say what is private, unfinished or a team decision. No
  "basically", "arguably" or "might potentially".
- **Plain, not flat.** Short sentences in everyday words, with one line of real
  opinion where it earns its place ("An audit log you have to request from the
  party being audited is not evidence.").

## Tone shifts by context

| Context | Tone |
|---|---|
| GitHub bio | A credential line. Role, domain, current work. No adjectives. |
| Profile README intro | First person, two short paragraphs. What I build and why it is hard. |
| Selected-work entries | Noun phrase first ("document ingestion service"), then what goes in and out, then the stack. |
| Repo description | One sentence, under about 120 characters, starting with a noun. |
| Repo README opening | What it is, then why it exists, then how it works. Setup comes after. |
| Engineering notes | Calm and specific. Name the trade-off I rejected and why. End on one principle. |
| Site home page | Same as the README intro, slightly warmer. Points to work and writing. |
| Archived repos | One line saying it is archived and why it is kept. No apology. |
| Contact | Plain. An email address and what to write about. |

## Vocabulary

**Use:** build, design, run, own, lead, ship, replace, move, verify, recover,
"stay correct", "when it fails", "the parts I can show", specific nouns (ledger,
queue, webhook, payout, rendition).

**Avoid:** passionate, world-class, cutting-edge, seamless, robust, scalable (as
praise), leverage, empower, journey, magic, "rock-solid", "blazing fast",
"10x", "building the future", "Hey 👋", unverified figures.

**Jargon:** keep the term when it names the mechanism (idempotency key, circuit
breaker, Merkle root). Explain it in plain words the first time on the site,
where readers may not be engineers.

## Grammar and style

- First person ("I") on the profile, site and notes. Past tense for finished work.
- Contractions are fine ("I'd", "don't").
- Sentences under about 25 words. One idea per sentence.
- No em-dashes. Use a colon, a comma or a new sentence.
- No emoji in headings or descriptions.
- Sentence case for headings.
- "Postgres" in prose; "PostgreSQL" in stack lines and technical specs.
- Digits for every number. Every number must be traceable to the
  engineering-contributions claim store; if it isn't, leave it out.
- Name employers that are already listed publicly (Rixl, Paymax, Eazyfit). Describe
  client projects by domain ("a remittance platform, client project"). Scholnet is
  under NDA and never appears. Busha stays off every surface for now.

## Paired examples

Taken from the copy this replaced.

**Repo description**
- Off: "a well-crafted API boilerplate primed to accelerate application development."
- On: "Companion code for an article on building a Gin and MongoDB API (2023)."
- *Removed praise the code can't back up; said what it actually is and when.*

**Repo description**
- Off: "Check the API Documentation Below"
- On: "Invoice management API in Go (2024)"
- *An instruction is not a description.*

**README opening**
- Off: "Bookwise presents a dynamic RESTful bookstore API, seamlessly integrating with the Flutterwave payment gateway."
- On: "A bookstore REST API in Go (2023). Users search books from the Open Library API, add them to a personal library, and pay for them through Flutterwave."
- *"Dynamic" and "seamlessly" replaced by what the user can do.*

**README opening**
- Off: a Mermaid chart with labels like `"[Laptop Dashboard]\n(Monitor)"` and nothing else.
- On: "When an AI agent drives a browser… there is usually no way to prove afterwards what it did, or that anyone allowed it to."
- *Problem first. The diagram supports the sentence, not the other way round.*

**Feature list**
- Off: "Rock-solid authentication and authorization"
- On: "JWT authentication; passwords hashed with bcrypt"
- *Name the mechanism instead of grading it.*

**Profile intro**
- Off: "Backend & distributed-systems engineer. Go. … Currently learning Zig."
- On: "Software engineer. I build backend systems in Go: payments, APIs, and the background work that has to stay correct when a vendor times out or a worker dies."
- *A label became a description of the actual hard part.*

**Profile intro**
- Off: "durable job queues, idempotent money movement, JWT-derived multi-tenancy, and typed errors at every boundary."
- On: "Much of my production work lives in client and employer repositories, so the projects below are the parts I can show."
- *Stopped asserting claims the visible repos can't support, and said why.*

**Stack section**
- Off: ten skill icons plus a backtick list of libraries.
- On: the stack named inside each project entry ("Go, Python, Tesseract").
- *Technology appears where it was used.*

**Selected-work entry**
- Off: "Proof for autonomous action; binds agent actions to their permitting authority as verifiable evidence"
- On: "Records what an AI agent did, ties it to the permission that allowed it, and issues a receipt anyone can verify without the server."
- *Same idea, everyday words.*

**Role statement**
- Off: "Development Lead at Rixl" (a title the contribution can't establish)
- On: "Software engineer, backend. The largest contributor to the backend: about 60 percent of the commits in the core services."
- *Use the real title; let the checked scope show the level.*

**Engineering-note result**
- Off: "Zero duplicate payments, zero lost data, zero panics."
- On: "A forged or replayed webhook cannot activate a subscription, and a duplicate cannot activate one twice."
- *Describe the guarantee the code gives, not a tally nobody can check.*

**Engineering-note figure**
- Off: "In less than a week, it processed more than $1,000+ in real subscription payments."
- On: (omitted)
- *Not in the claim store, so it isn't stated.*

**Engineering-note lesson**
- Off: "Resilience isn't an afterthought—it's built for failure from day one."
- On: "Size the engineering by what happens when it fails, not by how small the project looks."
- *A slogan became a rule someone could apply.*

**Team work**
- Off: "Made the foundational architectural pivot…"
- On: "The team decided to consolidate. I carried out the migration."
- *Separate the team's decision from my part in it.*

**Archived repo**
- Off: (no README)
- On: "Archived. Kept for readers of the article; not maintained."
- *One honest line beats silence.*

**Site article intro**
- Off: "That 'magic' is actually one of the most complex balancing acts in modern software engineering."
- On: "An uploaded video has to be inspected, encoded into several versions and packaged before anyone can watch it."
- *Explain the work instead of praising its difficulty.*

## Anti-patterns

- Opening with a greeting or a question.
- Grading the work ("robust", "elegant", "well-crafted").
- Lists of technologies with no project attached.
- Numbers without a source in the claim store.
- Hedging a claim that is true; inflating one that is shared.
- Every heading wearing an emoji.

## References

The engineering profiles studied for this: brandur (opinionated, credential-line
bio), simonw (plain functional descriptions), jvns (tells the reader what matters
and what doesn't), and the river and tigerbeetle READMEs (what, then why as a
design principle, then how).
