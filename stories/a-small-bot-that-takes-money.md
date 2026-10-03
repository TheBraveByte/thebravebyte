# A small bot that takes money

*Telegram subscription bot, personal project, November 2025. Go, PostgreSQL.*
Longer write-up: [How a "simple" Telegram bot turned into a payment system](https://thebravebyte.pages.dev/article/simple-telegram-bot).

### Problem

A friend asked for a "simple" Telegram bot that sells subscriptions. Within days
it was taking real payments. It ended up with three payment providers, whose
webhooks could arrive twice, late, or not at all, and one of which returned
inconsistent JSON.

### Context

Users pick a plan, pay, and get activated. Any bug in that path either gives away
paid access or takes money without delivering anything. I built it alone.

### Decision

Treat it as a payment system from the start: one internal state machine for
subscriptions, with each payment provider behind a common interface.

### Trade-offs

A single hard-coded provider would have been quicker. A common interface takes
more code up front, but each rail checks payments its own way while the
subscription logic stays in one place.

### Implementation

- Stripe, Paystack and NOWPayments sit behind one interface, chosen at checkout
  by a factory, and all lead to the same local state machine.
- Webhooks are checked with a keyed hash compared in constant time. The raw body
  is stored before anything acts on it, so a disputed payment can be
  reconstructed.
- Marking an invoice paid and activating the subscription happen in one database
  transaction.
- Database calls retry with exponential backoff and jitter, behind a circuit
  breaker.
- A flexible string type parses the fields where one provider returned
  inconsistent types, because I could not fix their API.
- Exchange rates are cached for a short time, so a slow rate provider does not
  fail a checkout.

### Result

A forged or replayed webhook cannot activate a subscription, and a duplicate
cannot activate one twice.

### What I learned

Size the engineering by what happens when it fails, not by how small the project
looks. Anything that takes money gets idempotency, verification and an audit
trail from the first version.
