# Folding a service back in: moving delivery into the main process

*Multi-domain platform, team project, February 2025. Go, Gin, MongoDB, Redis.*

### Problem

The delivery service ran on its own with a Kafka event bus, Open Policy Agent for
authorization and Elasticsearch. For a young product, that meant more systems to
run and coordinate than the traffic needed.

### Context

One platform covering delivery, transport, voting, elections, project management
and health insurance, worked on by about 20 engineers. The team chose to
consolidate, and I carried out the move early in my time on the codebase.

### Decision

Bring delivery into the main application as a module, keeping its boundaries in
the code so it could be split out again.

### Trade-offs

A separate service can scale and deploy on its own. Giving that up bought one
deploy unit, in-process calls, and one fewer set of infrastructure to keep alive.

### Implementation

- Moved the delivery service into the main application in one change of 83 files.
- Dropped its dependencies on Kafka, OPA and Elasticsearch; the Kafka producer
  stayed in the code, switched off, in case it was needed again.
- Tested every endpoint as part of the same change.

### Result

Delivery, and the domains I went on to own, ran in one process instead of
alongside a cluster of supporting systems.

### What I learned

For a young product, the expensive part is usually coordination and operations,
not scale. Keep the boundaries in the code, and split into services when the
workload asks for it.
