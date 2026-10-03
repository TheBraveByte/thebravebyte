# Explicit work, not polling: making Rixl's upload pipeline start and recover on its own

*Rixl, video platform, December 2025 to July 2026. Go, PostgreSQL, River.*

### Problem

Uploaded videos waited for a timer-driven job to find them, and failed renditions
had no structured way back into the pipeline. Work that went wrong tended to stay
wrong until someone noticed.

### Context

Each upload is preprocessed, encoded into several renditions and packaged for
streaming. The platform ran on one Postgres database with a small team.

### Decision

Treat each step as explicit work with a home in the database: queue it when the
event happens, record failures on the row, and give stalled work a way back.

### Trade-offs

A dedicated message broker scales workers further, but it is another system to run.
River keeps its queue in the same Postgres the application already uses, so jobs
survive restarts and there is nothing new to operate. The cost is that Postgres
carries both application data and job orchestration.

### Implementation

- Failed renditions retry with exponential backoff, and the retry count and next
  attempt time are stored on the row, where they can be queried.
- Finishing an upload enqueues a preprocessing job on River straight away, instead
  of waiting for a timer to find it. The queue later moved into the shared library
  so other services could use it.
- Upload completion became event-driven, with a reconciler that finds stalled
  uploads and moves them on.
- Renditions are claimed with `FOR UPDATE SKIP LOCKED`, so two workers never take
  the same one.

### Result

Work starts when an upload finishes, failures carry their own retry schedule, and
stalled uploads recover without anyone stepping in.

### What I learned

Model a pipeline as explicit work, not periodic discovery: a job that exists as a
row can be retried, inspected and recovered; a job that only exists when a timer
fires cannot.
