# Explicit work, not polling: rebuilding a video pipeline on River and Postgres

*Rixl, video platform, March 2026. Go, PostgreSQL, River, FFmpeg.*
Longer write-up: [How I rebuilt Rixl's video pipeline](https://thebravebyte.pages.dev/article/river-postgres-video-pipeline).

### Problem

Uploaded videos sat in `pending` until a timer-driven job found them. Worse, the
handoff between stages could break silently: rendition rows could exist in
Postgres with no encode job behind them, and nothing would ever pick them up.

### Context

Each upload is preprocessed, encoded into several renditions and packaged as an
HLS stream. The platform ran on one database with a small team. This was the
third version of the pipeline I worked on, after a chunked splitter and a fixed
rendition ladder.

### Decision

Replace the scheduler with River, a job queue that stores its jobs in the same
PostgreSQL database as the application data. An upload enqueues work immediately,
and each stage enqueues the next one.

### Trade-offs

A dedicated broker scales workers further, but it is another system to run, and
it cannot share a transaction with the rows it is about. River on Postgres gives
transactional job insertion and queue state that survives restarts, at the cost
of making Postgres carry both application state and job orchestration. If upload
volume ever needs many worker machines, that choice gets revisited.

### Implementation

- Rendition rows and their encode jobs are inserted in one transaction
  (`InsertManyTx`), so it is impossible to have one without the other.
- Pending renditions are fetched and marked in one atomic step, so two workers
  cannot process the same rendition.
- A reconciler runs on startup and every minute, putting renditions stuck in
  `processing` back into the queue with a set-based SQL update.
- Failed renditions retry with exponential backoff, and the failure is stored on
  the row, where it can be queried.

### Result

Work starts when an upload finishes, not when a timer fires. A finished
preprocessing step always has its encode jobs. A crashed worker's renditions
recover on their own.

### What I learned

Model a pipeline as explicit work, not periodic discovery. Most of the
reliability came from putting the job and the data it describes in one
transaction.
