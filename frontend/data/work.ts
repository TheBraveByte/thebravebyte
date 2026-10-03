// Every statement here is backed by a claim in TheBraveByte/engineering-contributions.
// Add nothing that isn't. Scholnet is under NDA and never appears. See docs/voice.md.

export interface WorkLink { label: string, href: string }

export interface WorkMedia { name: string, alt: string, width: number, height: number, widths: number[] }

export interface WorkItem {
  slug: string
  name: string
  year: string
  date: string // shown on the record page
  context: string
  role: string
  timeline?: string
  summary: string // one line, used in the index
  tags: string[]
  overview: string
  outcome: string
  engineering: string[]
  hardest: string
  stack: string[]
  links: WorkLink[]
  media?: WorkMedia[]
  diagram?: 'pipeline'
  simulation?: boolean
  note?: string // slug of an engineering note
  selected?: boolean
}

export const work: WorkItem[] = [
  {
    slug: 'bloom-parser',
    name: 'bloom-parser',
    year: '2026',
    date: 'October 2026',
    context: 'Personal project, open source',
    role: 'Sole author',
    summary: 'A document ingestion service: images, PDFs and spreadsheets in, one structured document out, over gRPC and REST.',
    tags: ['Go', 'gRPC', 'OCR'],
    overview: 'One pipeline accepts images, PDFs, spreadsheets and tabular text and returns a common Document. Tables can be exported to CSV or XLSX, or published to Power BI. The API contract is written in protobuf and served as both gRPC and REST.',
    outcome: 'Adding a file format means one adapter and one registration; nothing else changes.',
    engineering: [
      'Each format lives behind an adapter, so the core pipeline never knows a format\'s internals.',
      'The OCR engine sits behind an interface. Without it, OCR requests return a clear per-page error and every other path still works.',
      'Request size and page limits are enforced before parsing, from configuration.',
    ],
    hardest: 'Keeping OCR optional without making the service fragile. The default build has no OCR dependency at all, so the service runs anywhere, and the Tesseract engine is added with a build tag when it is wanted.',
    stack: ['Go', 'gRPC', 'grpc-gateway', 'buf', 'Python', 'Tesseract'],
    links: [{ label: 'Code', href: 'https://github.com/TheBraveByte/bloom-parser' }],
    diagram: 'pipeline',
  },
  {
    slug: 'babit',
    name: 'babit',
    year: '2026',
    date: 'September 2026',
    context: 'Personal project',
    role: 'Sole author',
    timeline: '4 days',
    summary: 'Records what an AI agent did, ties it to the permission that allowed it, and issues a receipt anyone can verify without the server.',
    tags: ['Go', 'Cryptography', 'AI agents'],
    overview: 'When an AI agent drives a browser, runs code in a sandbox or acts on a desktop, there is usually no way to prove afterwards what it did, or that anyone allowed it to. babit records each action, binds it to the signed delegation that authorised it, and produces a portable receipt.',
    outcome: 'A receipt can be checked offline against the notary\'s public key and an external anchor.',
    engineering: [
      'Agent authority is an explicit, signed list of capabilities, so what an agent was allowed to do is a checkable record.',
      'A notary signs each action into an append-only, hash-linked ledger and commits each session\'s Merkle root to an external anchor.',
      'Project access is enforced in every service and through the gRPC and replay interceptors, not only at the edge.',
    ],
    hardest: 'Making the receipt worth something. An audit log you have to request from the party being audited is not evidence, so verification had to work without trusting or even contacting the babit server.',
    stack: ['Go', 'gRPC', 'PostgreSQL', 'sqlc', 'React'],
    links: [
      { label: 'Demo', href: 'https://babit-inky.vercel.app' },
      { label: 'Code', href: 'https://github.com/TheBraveByte/babit' },
    ],
    media: [{ name: 'babit', alt: 'The babit landing page', width: 2000, height: 1250, widths: [800, 1400, 2000] }],
    selected: true,
  },
  {
    slug: 'remittance',
    name: 'Remittance platform',
    year: '2026',
    date: 'September 2026',
    context: 'Client project',
    role: 'Sole engineer, principal architect',
    timeline: '6 days',
    summary: 'Moves money from the US, UK and EU to Africa over mobile-money rails: pricing, collection, screening, ledger, payout and reconciliation.',
    tags: ['Go', 'Payments', 'Ledger'],
    overview: 'A cross-border remittance platform. It prices a corridor, collects funds from the sender, screens both parties, holds the money in a double-entry ledger, dispatches the payout to a mobile-money wallet or bank, and reconciles the vendor\'s asynchronous answer.',
    outcome: 'Every payout is held before it is sent, and an unknown vendor answer can never trigger a second payment.',
    engineering: [
      'Balances live in a TigerBeetle double-entry ledger, mirrored to Postgres for queries, with a replay path for when the two drift.',
      'Every transfer takes a ledger hold before any irreversible call to a payout vendor.',
      'Workers lease rows to claim them and settle each payout in its own transaction, so one stuck payout cannot stall the queue.',
      'Risk rules run before money moves and do not fail open.',
    ],
    hardest: 'A vendor response the system did not recognise. Treating it as a decline invites a resend that can pay the recipient twice; treating it as success charges the sender for nothing. It became its own state, unsure, checked with the vendor before anything is sent again.',
    stack: ['Go', 'gRPC', 'PostgreSQL', 'TigerBeetle'],
    links: [],
    simulation: true,
    note: 'unsure-is-not-failed',
    selected: true,
  },
  {
    slug: 'lura',
    name: 'Lura',
    year: '2026',
    date: 'January 2026',
    context: 'Personal project',
    role: 'Sole engineer',
    timeline: '2 months',
    summary: 'WhatsApp commerce for small vendors, with a Go gateway that reads text, voice and photos and matches them to a vendor\'s catalogue.',
    tags: ['Go', 'AI', 'Commerce'],
    overview: 'A merchant dashboard for selling over WhatsApp, and a stateless Go service that analyses each incoming message, whether text, a voice note or a photo, against the vendor\'s catalogue and drafts a reply.',
    outcome: 'Buyers get a question back instead of a wrong product.',
    engineering: [
      'The service core depends only on interfaces; every model provider is an adapter wired once at startup.',
      'Each kind of input is gated by a capability check, so a provider outage degrades one modality, not the service.',
    ],
    hardest: 'Deciding what to do when a match is uncertain. The threshold leans toward precision: below it, the service offers alternatives and lets the conversation ask, rather than asserting a match it cannot stand behind.',
    stack: ['Go', 'chi', 'Nuxt', 'Hugging Face'],
    links: [],
  },
  {
    slug: 'omonai',
    name: 'omonai',
    year: '2025',
    date: 'November 2025',
    context: 'Personal project',
    role: 'Sole author',
    timeline: '5 months',
    summary: 'An anti-money-laundering and fraud-detection platform: transaction monitoring, sanctions screening and case management across four jurisdictions.',
    tags: ['Go', 'Compliance', 'Python'],
    overview: 'A compliance platform of the kind banks and payment companies run: transaction monitoring and risk scoring, sanctions screening, customer due diligence, case management and regulatory reporting. A Go backend of about 30 modules, a Python machine-learning service and a Vue front end.',
    outcome: 'Every risk rating comes with the factors that produced it.',
    engineering: [
      'Structuring, smurfing and round-trip patterns are detected as database aggregations, so thousands of transactions never enter the process.',
      'Rules for each jurisdiction are configuration data, so adding a country adds no code paths.',
      'An append-only audit log records actor, action and before-and-after values for every change.',
    ],
    hardest: 'Making a risk score explainable. A bare rating is an assertion; the composite policy returns the rating with its contributing factors and stores them with the customer, so an analyst can see why.',
    stack: ['Go', 'Python', 'FastAPI', 'MongoDB', 'Redis', 'Vue'],
    links: [],
  },
  {
    slug: 'bitraq',
    name: 'BiTraq',
    year: '2025',
    date: 'July 2025',
    context: 'Personal project',
    role: 'Sole author',
    timeline: '10 months',
    summary: 'A crypto and stock arbitrage platform that compares prices across exchanges and decides whether a gap is worth trading.',
    tags: ['Go', 'Trading', 'Risk'],
    overview: 'Pulls quotes for configured pairs from centralised exchanges and on-chain markets, runs each spread through a cost model, and either alerts the user or trades automatically under a rules engine. Accounts, two-factor sign-in, subscription billing and a real-time feed sit around it.',
    outcome: 'The technical docs state what the engine does not model, including that live exchange execution is still stubbed.',
    engineering: [
      'A gap counts only once venue fees, slippage, gas and bridge fees are subtracted.',
      'Every automated trade passes a risk manager: daily loss limits, a drawdown circuit breaker, exposure caps.',
      'A duplicate order inside a time window returns the original order instead of placing a second trade.',
    ],
    hardest: 'Not fooling myself. An apparent price gap is usually eaten by costs, so the decision layer is an explicit cost model, and the docs say plainly which costs are approximated.',
    stack: ['Go', 'MongoDB', 'Redis', 'Stripe'],
    links: [{ label: 'Website', href: 'https://bitraq.netlify.app' }],
    media: [{ name: 'bitraq', alt: 'The BiTraq landing page', width: 1400, height: 995, widths: [800, 1400] }],
  },
  {
    slug: 'attendance',
    name: 'Attendance and access platform',
    year: '2025',
    date: 'July 2025',
    context: 'Client project',
    role: 'Lead engineer',
    timeline: '9 months',
    summary: 'Multi-tenant attendance, access cards and check-ins for organisations and schools.',
    tags: ['Go', 'PostgreSQL', 'Multi-tenant'],
    overview: 'A backend for organisations, staff and students: access cards, location-based check-ins, attendance sessions, audit trails and notifications. I wrote about 94 percent of the code and every core subsystem.',
    outcome: 'A handler that forgets a tenant check still cannot read another tenant\'s rows.',
    engineering: [
      'Tenant isolation is enforced twice: role middleware in the application, and Postgres row-level security underneath.',
      'Audit rows are written by database triggers, so even a direct admin query is recorded.',
      'Face comparison is treated as a signal with confidence thresholds, not an authority; check-in still works when the service is down.',
    ],
    hardest: 'Trusting the database more than the code. Application checks are one forgotten line away from a leak, so the database itself refuses cross-tenant rows.',
    stack: ['Go', 'PostgreSQL', 'Docker'],
    links: [],
  },
  {
    slug: 'eazyfit',
    name: 'Eazyfit',
    year: '2025',
    date: 'June 2025',
    context: 'Startup',
    role: 'Principal backend engineer',
    timeline: '14 months',
    summary: 'A fashion-tailoring marketplace that turns two or three phone photos into tailor-ready measurements.',
    tags: ['Go', 'Payments', 'Computer vision'],
    overview: 'A marketplace connecting customers with tailors and stylists. I wrote most of the core API, 1,121 of its 1,275 commits, across about 25 domain packages. The product won $5,000 in pre-seed funding at the Ilorin Innovation Challenge.',
    outcome: 'Payouts to stylists are safe to retry.',
    engineering: [
      'A two-stage escrow pays stylists on order milestones; a unique index on order and stage means a replayed transition cannot pay twice.',
      'Exactly one service may write payout state.',
      'The Python measurement engine runs in its own process behind a Go interface, so a crash there cannot take the API down.',
    ],
    hardest: 'Money moving on order events that can repeat. The fix was structural rather than careful code: one writer for payouts, and a database constraint that makes the second payment impossible.',
    stack: ['Go', 'Python', 'MongoDB', 'WebSockets'],
    links: [{ label: 'Website', href: 'https://www.eazyfitfashion.com' }],
    media: [{ name: 'eazyfit', alt: 'Three screens from the Eazyfit mobile app', width: 1400, height: 956, widths: [800, 1400] }],
    selected: true,
  },
  {
    slug: 'rixl',
    name: 'Rixl',
    year: '2025',
    date: 'May 2025',
    context: 'Employer, contract',
    role: 'Development Lead',
    timeline: '16 months',
    summary: 'A video and media platform. I led backend development across its services, shared library and SDKs in eight languages.',
    tags: ['Go', 'Media', 'gRPC'],
    overview: 'Rixl handles the media side of other products: uploading and delivering images and video, feeds and posts, engagement analytics, accounts and billing. I owned the platform core, the gateway, analytics, the shared library and the SDKs.',
    outcome: 'One API contract feeds the public REST API, the internal gRPC services and eight SDKs.',
    engineering: [
      'Moved four services from REST to gRPC behind a REST gateway, keeping REST as the public contract.',
      'Rebuilt video transcoding on a Postgres-backed job queue, with jobs and their data written in one transaction.',
      'Generated one OpenAPI spec from the service definitions and the SDKs from that spec, with CI that fails when it goes stale.',
      'Moved analytics into its own ClickHouse service with per-query limits.',
    ],
    hardest: 'Transcoding work that went missing between stages. Rendition rows could exist with no job behind them. Moving to a queue that lives in the same database meant the rows and their jobs are created together or not at all.',
    stack: ['Go', 'gRPC', 'PostgreSQL', 'River', 'ClickHouse', 'FFmpeg'],
    links: [
      { label: 'Go SDK', href: 'https://github.com/rixlhq/rixl-go' },
      { label: 'Docs', href: 'https://docs.rixl.com' },
    ],
    media: [{ name: 'rixl', alt: 'The Rixl documentation home page', width: 2000, height: 1344, widths: [800, 1400, 2000] }],
    note: 'explicit-work-not-polling',
    selected: true,
  },
  {
    slug: 'paymax',
    name: 'Paymax',
    year: '2025',
    date: 'January 2025',
    context: 'Employer, contract',
    role: 'Backend engineer',
    timeline: '14 months',
    summary: 'One platform covering delivery, transport, school management, voting and health insurance, built by a team of 30+ engineers.',
    tags: ['Go', 'Architecture', 'Team'],
    overview: 'A twelve-domain platform. I was one of its two largest contributors and owned delivery and restaurants, transport, voting and elections, and health insurance end to end.',
    outcome: 'The domains I owned were built on one deployable process instead of a cluster.',
    engineering: [
      'Carried out the move from microservices to one modular process: Kafka, OPA and Elasticsearch replaced in one change.',
      'Replaced Kafka with a Redis-backed task queue and OPA with authorization middleware in the process.',
    ],
    hardest: 'A young product paying for a distributed system it did not need yet. The team chose to consolidate; the migration kept each domain\'s boundaries in the code so it can be split again later.',
    stack: ['Go', 'Gin', 'MongoDB', 'Redis'],
    links: [],
    note: 'collapsing-early-microservices',
  },
]

export const findWork = (slug: string) => work.find(w => w.slug === slug)
