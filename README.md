# Yusuf Akinleye

Software engineer. I build backend systems in Go: payments, APIs, and the
background work that has to stay correct when a vendor times out or a worker
dies. Founder of [FoldLabs](https://foldlabs.pro).

Most of what I build is a modular monolith on Postgres, split into services
only when the workload calls for it. Much of my production work lives in client
and employer repositories, so the projects below are the parts I can show.

### Selected work

- **[bloom-parser](https://github.com/TheBraveByte/bloom-parser)**: document
  ingestion service. Images, PDFs and spreadsheets go in; one structured document
  comes out over gRPC and REST. Go, Python, Tesseract.
- **[babit](https://github.com/TheBraveByte/babit)**: records what an AI agent
  did, ties it to the permission that allowed it, and issues a receipt anyone can
  verify without the server. Go, gRPC, PostgreSQL.
  [Demo](https://babit-inky.vercel.app)
- **[rixl-go](https://github.com/rixlhq/rixl-go)**: the Go SDK for Rixl's media
  API. I led backend development at Rixl, including its SDKs in eight languages.
- **[snackbox](https://github.com/TheBraveByte/snackbox)**: reference integration
  for a hosted-checkout payments API, with signed webhooks, idempotency keys and
  rate limiting.

### Engineering notes

Short write-ups of problems I've worked through: the decision, the trade-offs
and what I'd keep.

- ["Unsure" is not "failed": handling unknown payout responses](stories/unsure-is-not-failed.md)
- [Explicit work, not polling: rebuilding a video pipeline on River and Postgres](stories/explicit-work-not-polling.md)
- [One process instead of a cluster: collapsing early microservices](stories/collapsing-early-microservices.md)
- [A small bot that takes money](stories/a-small-bot-that-takes-money.md)

---

[foldlabs.pro](https://foldlabs.pro) · [Writing](https://thebravebyte.pages.dev/blog) ·
[LinkedIn](https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/) ·
[ayaaakinleye@gmail.com](mailto:ayaaakinleye@gmail.com)
