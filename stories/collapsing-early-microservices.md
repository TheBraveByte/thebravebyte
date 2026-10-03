# One process instead of a cluster: collapsing early microservices

*Multi-domain platform, team project, February 2025. Go, Gin, MongoDB, Redis.*

### Problem

An early-stage product had started life as microservices: a Kafka event bus,
Open Policy Agent for authorization and an Elasticsearch cluster. The product
was young, and the team judged that running and coordinating that
infrastructure cost more than the traffic needed.

### Context

The platform covered a dozen business domains (delivery, transport, school
management, voting, health insurance and more), worked on by a team of 30+
engineers. The team decided to consolidate. I carried out the migration, in one
of my first changes on the codebase.

### Decision

Move to a modular monolith: one Gin process, one MongoDB database, with each
domain kept as a separate module inside it.

### Trade-offs

Microservices let each domain scale and deploy on its own and use its own
technology. The team gave that up in exchange for one deploy unit, in-process
calls, and the ability to change related data on a single database. Splitting a
service back out later is possible because the domain boundaries stay in the code.

### Implementation

- One change of 83 files moved the services into a single process.
- Kafka was replaced with a Redis-backed task queue (asynq).
- OPA was replaced with JWT and role-based access middleware in the process.
- Elasticsearch was removed.
- Every endpoint was tested as part of the same change.

### Result

The domains I went on to own (delivery, transport, voting, health insurance) were
built on this foundation without the operational overhead of the original
topology.

### What I learned

For a young product, the expensive part is usually coordination and operations,
not scale. Keep the boundaries in the code, and split into services when the
workload asks for it.
