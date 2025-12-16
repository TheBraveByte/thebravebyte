INSERT INTO articles (title, slug, excerpt, content, published, published_at, author) VALUES (
  'How a ''Simple'' Telegram Bot Turned Into a Full Payment System',
  'telegram-bot-payment-system',
  'What started as a weekend favor turned into a production-grade payment orchestration system processing $1,000+ in cryptocurrency subscriptions. Here''s how I architected it to handle concurrent users, webhook chaos, and database failures—all in under a week.',
  '# Article: How a ''Simple'' Telegram Bot Turned Into a Full Payment System

**Slug:** `telegram-bot-payment-system`
**Excerpt:** What started as a weekend favor turned into a production-grade payment orchestration system processing $1,000+ in cryptocurrency subscriptions. Here''s how I architected it to handle concurrent users, webhook chaos, and database failures—all in under a week.

---

## Content:

I was busy working on a usage-based billing platform—the kind where you calculate cost based on video duration, file size, bandwidth, and other metrics that make your brain sweat. Still on it.

Then my friend called.

"Bro, can you help me build a simple Telegram bot? Just something small."

In tech, "simple" is a myth. Like "just one more episode." But it was the weekend. I needed a break. I said:

**"Sure, what could go wrong?"**

By mid-week, the so-called "simple bot" was processing live cryptocurrency payments, activating user subscriptions, verifying webhooks, and maintaining real-time state across concurrent users.

And the wild part?

In less than a week, it processed more than **$1,000+** in real subscription payments. Zero duplicate payments, zero lost data, zero panics.

## What Made It Interesting

Users were messaging the bot like:

```
/subscribe → pick plan → pay → wait → get activated
```

But behind that flow was a complex web of engineering problems that I had to solve in real-time.

### Problem 1: Multiple Users Doing Subscription Flow at the Same Time

Users can select plans, generate invoices, and submit payments—all at once.

Without proper concurrency control, that meant:

- Duplicate invoices
- Sessions overwrite each other
- Subscriptions activating twice

**Engineering move:** Built a thread-safe session manager using a read/write lock with `sync.RWMutex`.

- Reads are concurrent
- Writes are exclusive
- No collisions
- Must not have duplicated state

**Result:** Every user gets their own isolated "bubble" of logic throughout the subscription flow.

### Problem 2: Crypto Payment Webhooks Are Chaotic

Payment gateways send webhooks like:

- Once, twice, or multiple times
- Or never (depending on mood)

If we process a webhook twice → same user gets double subscription time. If we trust it blindly → any random JSON can activate a paid plan.

**The Solution:** Webhook handler with signature verification, idempotency, and ACID database transaction.

1. Verify cryptographic signature (reject spoofed payments)
2. Validate that the amount matches the invoice
3. Run DB updates inside a transaction
4. Mark invoice paid, activate subscription, commit only if everything succeeds

**Result:** No double activation. No lost payments. Money comes in → subscription gets activated exactly once.

### Problem 3: Database Failures Happen

Network hiccups, connection exhaustion—PostgreSQL can timeout without warning. If the system panics here, people lose money.

**Engineering move:**

- Automatic retry with exponential backoff + jitter
- Circuit breaker if DB keeps failing

**Result:** The bot remains online even if the database goes offline.

### Problem 4: Sessions Need to Clean Up After Themselves

Users start paying, get distracted, and disappear. If we don''t manage the session lifecycle:

- Memory leaks
- Zombie sessions
- Abandoned states

**Solution:** Background goroutine that periodically removes stale sessions.

**Result:** No leaks. No accumulation. System stays lightweight.

### Problem 5: User Experience Must Be Fast

Telegram expects responses in under 30 seconds. Realistically, users expect less than a second.

**Optimizations:**

- Connection pooling
- Caching exchange rates
- Preparing SQL statements
- Async cleanup jobs

## Results (In One Week)

Real payments processed: **$1,000+** already, with much more to come.

Not bad for "just a Telegram bot".

## What I Learned

- A weekend project can turn into a mini payment orchestration system
- Resilience isn''t an afterthought—it''s built for failure from day one
- The difference between a hack and engineering is **predictable behavior**

Want to see the architecture behind this system? Check out my [Process page](/process) for detailed diagrams and implementation patterns.',
  1,
  CURRENT_TIMESTAMP,
  'Yusuf Akinleye'
);
