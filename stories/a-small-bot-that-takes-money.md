# A small bot that takes money

*Telegram subscription bot, personal project, November 2025. Go, PostgreSQL.*
Longer write-up: [How a "simple" Telegram bot turned into a payment system](https://thebravebyte.pages.dev/article/simple-telegram-bot).

### Problem

A friend asked for a "simple" Telegram bot that sells subscriptions. I built it in
three days, and it ended up with three payment providers, whose webhooks could
arrive twice, late, or not at all, and one of which returned inconsistent JSON.

### Context

Users pick a plan, pay, and get activated. Any bug in that path either gives away
paid access or takes money without delivering anything. I built it alone.

### Decision

Treat it as a payment system from the start: one payment manager in front of every
provider, with each provider verifying its own webhooks.

### Trade-offs

A single hard-coded provider would have been quicker. A manager in front of all
three takes more code up front, but each rail checks payments its own way while the
subscription logic stays in one place.

### Implementation

- Stripe, Paystack and NOWPayments sit behind one payment manager.
- Webhooks are checked with a keyed hash compared in constant time, and the raw
  payload is kept, so a disputed payment can be reconstructed.
- Database calls retry with exponential backoff and jitter, behind a circuit
  breaker.
- A flexible string type parses the fields where one provider returned
  inconsistent types, because I could not fix their API.
- Exchange rates are cached for a short time, so a slow rate provider does not
  fail a checkout.

### Result

A forged webhook is rejected before it can activate anything, and every payment
event is kept for later checking.

### What I learned

Size the engineering by what happens when it fails, not by how small the project
looks. Anything that takes money gets idempotency, verification and an audit
trail from the first version.
