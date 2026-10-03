# "Unsure" is not "failed": handling unknown payout responses

*Remittance platform, client project, September 2026. Go, PostgreSQL.*

### Problem

A payout to a mobile-money wallet is sent to a vendor, and the vendor answers
asynchronously. Sometimes the answer is a response the system does not recognise.
The first version of the code treated anything unrecognised as a permanent decline.

### Context

The platform moves money from senders in the US and UK to recipients in Africa and
Asia, over bank and mobile-money rails. A payout is the last irreversible step: once the
vendor has paid a wallet, the money is gone. I was the sole engineer on the
backend.

### Decision

Model an unrecognised response as its own state, `unsure`, instead of folding it
into `declined`. An unsure payout is never resent until its real state is known.

### Trade-offs

Mapping unknowns to "declined" is simple and keeps the state machine small, but it
invites a retry or a reroute to another rail. If the first send actually
succeeded, the recipient is paid twice. Mapping unknowns to "succeeded" is worse:
the sender is charged and nobody is paid. A third state costs more code and an
operations queue for payouts that stay unsure, but it is the only option that is
wrong in neither direction.

### Implementation

- Unrecognised vendor responses become `unsure`, not a permanent decline.
- Before any resend, the system polls the vendor for the payout's status. A payout
  that might still be live is never rerouted to another rail.
- The payout provider interface gained a way to confirm state before a retry, so
  every rail has to answer "did this already happen?" before sending again.
- Workers lease payout rows to claim them, and each payout settles in its own
  transaction, so one stuck payout cannot hold up the rest of the queue.

### Result

Ambiguity now shows up as a visible state that someone can resolve, instead of a
silent decline that could trigger a duplicate payment.

### What I learned

When a side effect is irreversible, "I don't know" has to be a real state. Confirm
before acting again, and never let an unknown resolve itself to whichever answer
is easiest to code.
