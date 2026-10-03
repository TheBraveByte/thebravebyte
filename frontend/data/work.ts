// Every statement here was checked against the project's main branch on 2026-10-03
// (commit counts author-filtered, features read in the code, not only in commit messages).
// Add nothing that can't be shown the same way. Scholnet is under NDA and never appears.
// See docs/voice.md.

export interface WorkLink { label: string, href: string }
export interface WorkMedia { name: string, alt: string, width: number, height: number, widths: number[] }
export interface Risk { when: string, then: string }

export interface WorkItem {
  slug: string
  name: string
  years: string
  context: string
  role: string
  duration?: string
  description: string // one sentence, leading with what I did
  about: string // what the system is, and my share of it
  contribution: string[] // what I personally built or led
  impact: string // a concrete result that can be defended
  risks: Risk[] // engineering decisions: when this goes wrong, what the system does
  stack: string
  links: WorkLink[]
  media?: WorkMedia
  diagram?: 'pipeline'
  simulation?: boolean
  note?: string
  featured?: boolean
}

export const work: WorkItem[] = [
  {
    slug: 'remittance',
    name: 'Remittance platform',
    years: '2026',
    context: 'Client project',
    role: 'Sole engineer',
    duration: '6 days',
    description: 'Designed and built a cross-border remittance platform end to end, from corridor pricing to vendor reconciliation, moving money from the US and UK to bank accounts and mobile-money wallets in Africa and Asia.',
    about: 'It prices a corridor, collects the sender\'s money, screens the sender, confirms the payee\'s name with the payout network, holds the funds in a double-entry ledger, pays out and reconciles the vendor\'s answer.',
    contribution: [
      'Wrote all 169 commits: 50 gRPC services with 196 methods, each also served as REST, and 48 database migrations.',
      'Put balances in a TigerBeetle double-entry ledger mirrored to Postgres, with a replay path and fault-tolerance tests.',
      'Built swappable adapters for collection, payout, identity checks, screening and bank linking, with failover between vendors.',
    ],
    impact: 'Every transfer is held in the ledger before the sender is charged, and a payout with an unknown answer is never sent again until the vendor confirms it was missed.',
    risks: [
      { when: 'the payout vendor never answers', then: 'the payout is parked as unknown, and the vendor is asked for its status before anything is sent again.' },
      { when: 'money could move before the books agree', then: 'every transfer takes a pending ledger hold before the sender\'s card or bank is charged.' },
      { when: 'the ledger and its copy drift apart', then: 'TigerBeetle is the source of truth; the Postgres mirror has a replay path and its own fault tests.' },
      { when: 'a compliance check errors', then: 'risk rules run before the hold and the charge, and an error stops the transfer.' },
    ],
    stack: 'Go, gRPC, PostgreSQL, sqlc, TigerBeetle',
    links: [],
    simulation: true,
    note: 'unsure-is-not-failed',
    featured: true,
  },
  {
    slug: 'rixl',
    name: 'Rixl',
    years: '2025 to 2026',
    context: 'Employer, contract',
    role: 'Software engineer, backend',
    duration: '16 months',
    description: 'The largest contributor to the backend of a video and media platform: moved its core services to gRPC behind a REST gateway, defined its API and shipped SDKs in eight languages from it.',
    about: 'Rixl handles the media side of other products: uploading and delivering images and video, feeds, engagement analytics, accounts and billing. I wrote about 60 percent of the commits in the core API, auth, gateway and analytics services, and started all eight SDKs: about 3,900 commits across 26 repositories.',
    contribution: [
      'Moved the core API, auth and analytics services to gRPC behind a REST gateway, and switched the media processors to gRPC reporting.',
      'Defined 237 gRPC methods across 42 services, which produce a public REST API of 210 operations.',
      'Started all eight SDK repositories and set them to regenerate automatically whenever the API spec changes.',
      'Added rendition retries with exponential backoff, a River queue for post-upload work, and a reconciler for stalled uploads.',
    ],
    impact: 'The service definitions now produce the public API spec, the docs and all eight SDKs.',
    risks: [
      { when: 'a transcoding job fails or stalls', then: 'renditions are claimed with row locks and retried with backoff, and a reconciler recovers uploads that stall.' },
      { when: 'the SDKs could drift from the API', then: 'the spec is generated from the service definitions, and every change regenerates all eight SDKs.' },
      { when: 'one dashboard query gets expensive', then: 'analytics runs as its own ClickHouse service, and each dashboard query has a work limit and a deadline.' },
    ],
    stack: 'Go, gRPC, PostgreSQL, River, ClickHouse, FFmpeg',
    links: [
      { label: 'Go SDK', href: 'https://github.com/rixlhq/rixl-go' },
      { label: 'Docs', href: 'https://docs.rixl.com' },
    ],
    media: { name: 'rixl', alt: 'The Rixl documentation home page', width: 2000, height: 1344, widths: [800, 1400, 2000] },
    note: 'explicit-work-not-polling',
    featured: true,
  },
  {
    slug: 'eazyfit',
    name: 'Eazyfit',
    years: '2025 to 2026',
    context: 'Startup',
    role: 'Principal backend engineer',
    duration: '14 months',
    description: 'Built most of the backend for a tailoring marketplace, including staged escrow payouts and a measurement engine that turns front, side and back photos into tailor-ready measurements.',
    about: 'Customers book tailors and stylists and get measured from photos instead of a tape.',
    contribution: [
      'Wrote 627 of the 694 commits on the main API, and 48 of the 52 commits to its payment package.',
      'Built two-stage escrow payouts: 70 percent to the stylist on acceptance, 30 percent on delivery.',
      'Built the measurement engine, 94 Python files that the Go API runs as a separate process.',
    ],
    impact: 'The backend behind a product that won $5,000 in pre-seed funding at the Ilorin Innovation Challenge.',
    risks: [
      { when: 'a payout event arrives twice', then: 'a prior-payout check and a unique index on order and stage guard against recording a second payout.' },
      { when: 'two parts of the code both try to move money', then: 'exactly one service is allowed to write payout state.' },
      { when: 'the measurement engine crashes', then: 'each run is its own subprocess with a timeout, so the API returns an error instead of going down.' },
    ],
    stack: 'Go, chi, Python, MongoDB, Paystack, WebSockets',
    links: [{ label: 'Website', href: 'https://www.eazyfitfashion.com' }],
    media: { name: 'eazyfit', alt: 'Three screens from the Eazyfit mobile app', width: 1400, height: 956, widths: [800, 1400] },
    featured: true,
  },
  {
    slug: 'babit',
    name: 'babit',
    years: '2026',
    context: 'Personal project, source-available',
    role: 'Sole author',
    duration: 'About a month',
    description: 'Built a system that records what an AI agent did, binds it to the signed permission that allowed it, and issues receipts anyone can verify without the server.',
    about: 'When an agent drives a browser, runs code or acts on a desktop, babit records each action against the grant that permitted it and seals it into a ledger. I wrote all 185 commits.',
    contribution: [
      'Designed signed capability grants where each delegated grant can only narrow its parent, checked for expiry and revocation on every action.',
      'Built a notary that seals actions into an append-only ledger, with a Postgres trigger that rejects any update or delete.',
      'Built 10 gRPC services with a REST gateway and a React console, plus an end-to-end test that tampers with a receipt to prove verification fails.',
    ],
    impact: 'Live demo and public source; receipts verify offline with the babit verify command against the notary\'s public key and the session\'s Merkle root.',
    risks: [
      { when: 'someone asks who allowed an agent to do that', then: 'every action carries the signed grant that permitted it, and its receipt verifies without my server.' },
      { when: 'a receipt is shared outside the company', then: 'identifiers are 64-bit random values, so one receipt can\'t be used to guess others.' },
    ],
    stack: 'Go, gRPC, PostgreSQL, React, TypeScript',
    links: [
      { label: 'Demo', href: 'https://babit-inky.vercel.app' },
      { label: 'Code', href: 'https://github.com/TheBraveByte/babit' },
    ],
    media: { name: 'babit', alt: 'The babit landing page', width: 2000, height: 1250, widths: [800, 1400, 2000] },
    featured: true,
  },
  {
    slug: 'paymax',
    name: 'Paymax',
    years: '2025 to 2026',
    context: 'Employer, contract',
    role: 'Backend engineer',
    duration: '14 months',
    description: 'One of the two largest contributors to a multi-domain platform built by about 20 engineers, and moved its delivery service into the main application.',
    about: 'Delivery, transport, voting, elections, project management and health insurance on one platform. I wrote 571 of its 1,937 commits.',
    contribution: [
      'Wrote every commit to the transport, medical, election and project-management packages, 140 in all, and 88 of the 95 in delivery.',
      'Moved the delivery service into the main application in one change, dropping its Kafka, OPA and Elasticsearch dependencies.',
    ],
    impact: 'Owned four of the platform\'s domains outright and led two more.',
    risks: [
      { when: 'a service costs more to run than its traffic needs', then: 'the team chose to consolidate; I moved delivery into the main process and dropped its Kafka, OPA and Elasticsearch dependencies.' },
    ],
    stack: 'Go, Gin, MongoDB, Redis',
    links: [],
    note: 'collapsing-early-microservices',
  },
  {
    slug: 'omonai',
    name: 'omonai',
    years: '2025 to 2026',
    context: 'Personal project',
    role: 'Sole author',
    duration: '5 months',
    description: 'Built an anti-money-laundering and fraud-detection platform on my own: transaction monitoring, sanctions screening and case management across four jurisdictions.',
    about: 'A compliance platform of the kind banks and payment companies run, covering the US, Nigeria, Angola and the Republic of the Congo.',
    contribution: [
      'Wrote all 375 commits: 29 Go service modules, a Python scoring service and a Nuxt front end.',
      'Synced sanctions screening against four official lists (OFAC, UN, UK and EU) with fuzzy name matching.',
      'Exported suspicious-activity reports in each regulator\'s format: FinCEN XML, goAML and ANIF.',
    ],
    impact: 'Every customer risk rating comes with the factors and points that produced it.',
    risks: [
      { when: 'an analyst has to defend a customer\'s rating', then: 'the rating comes with the factors and points that produced it.' },
      { when: 'a new country\'s rules arrive', then: 'thresholds, regulators and report formats live in one compliance package, so a country is added in one place.' },
      { when: 'thousands of transactions need checking for a pattern', then: 'four laundering patterns are detected with database aggregations, not in memory.' },
    ],
    stack: 'Go, Python, FastAPI, MongoDB, Redis, Nuxt',
    links: [],
  },
  {
    slug: 'bitraq',
    name: 'BiTraq',
    years: '2025 to 2026',
    context: 'Personal project',
    role: 'Sole author',
    duration: '9 months',
    description: 'Built an arbitrage and automated-trading platform on my own that prices each trade\'s true cost and puts a risk manager in front of every automated order.',
    about: 'Compares prices across exchanges and on-chain markets, decides whether a gap is worth acting on, then alerts or trades under a rules engine. I wrote 389 of the 390 commits on main; the other is a bot\'s.',
    contribution: [
      'Wrote a cost model over venue fees, slippage, gas and bridge fees, and a backtester that replays stored market data through it.',
      'Built a risk manager with daily loss limits, a drawdown breaker and exposure caps per asset and per exchange.',
    ],
    impact: 'The docs list what the engine does not do yet, including order-book depth and live exchange execution.',
    risks: [
      { when: 'a price gap looks like free money', then: 'fees, slippage, gas and bridge costs are subtracted before it counts.' },
      { when: 'an automated strategy starts losing', then: 'daily loss limits and a drawdown breaker stop it.' },
      { when: 'the same order is submitted twice', then: 'a repeat within 30 minutes returns the original order instead of placing a second trade.' },
    ],
    stack: 'Go, MongoDB, Redis, Stripe',
    links: [{ label: 'Website', href: 'https://bitraq.netlify.app' }],
    media: { name: 'bitraq', alt: 'The BiTraq landing page', width: 1400, height: 995, widths: [800, 1400] },
  },
  {
    slug: 'attendance',
    name: 'Attendance platform',
    years: '2025 to 2026',
    context: 'Client project',
    role: 'Lead engineer',
    duration: '9 months',
    description: 'Led the backend for a multi-tenant attendance and access-card platform, writing about 94 percent of it.',
    about: 'Access cards, location check-ins, attendance sessions and audit logs for many organisations on one backend.',
    contribution: [
      'Built every core subsystem: auth, access control, attendance, audit, uploads and notifications, across 141 API routes and 29 migrations.',
      'Scoped every request to the caller\'s organisation in the application layer.',
    ],
    impact: 'Took the platform from an empty repository to 141 API routes in nine months, writing 173 of its 183 commits.',
    risks: [
      { when: 'face matching is down', then: 'it is a separate staff check, so check-in never depends on it.' },
    ],
    stack: 'Go, PostgreSQL, sqlc, goose',
    links: [],
  },
  {
    slug: 'lura',
    name: 'Lura',
    years: '2026',
    context: 'Personal project',
    role: 'Lead engineer',
    duration: '2 months',
    description: 'Built WhatsApp commerce for small vendors, with a Go AI gateway that reads text, voice notes and photos against a vendor\'s catalogue.',
    about: 'A dashboard for selling over WhatsApp and a stateless gateway that drafts replies. I wrote 119 of the 121 commits across the two.',
    contribution: [
      'Built the merchant dashboard and a Go gateway that routes text, voice notes and photos through one endpoint.',
      'Mapped each WhatsApp business number to its vendor, so one service serves many shops.',
    ],
    impact: 'When a match is uncertain, buyers get alternatives and a question instead of the wrong product.',
    risks: [
      { when: 'the model isn\'t sure', then: 'below a match threshold it offers the closest alternatives and asks, instead of naming the wrong product.' },
      { when: 'a model is unavailable', then: 'each capability is checked on its own: a photo falls back to text matching, and a voice note fails cleanly.' },
    ],
    stack: 'Go, chi, Nuxt, Hugging Face',
    links: [],
  },
  {
    slug: 'bloom-parser',
    name: 'bloom-parser',
    years: '2026',
    context: 'Personal project, open source',
    role: 'Sole author',
    description: 'Built and open-sourced a document ingestion service: images, PDFs and spreadsheets in, one structured document out, over gRPC and REST.',
    about: 'One pipeline turns 11 input formats into a common document, with exports to CSV, XLSX and Power BI, and a table-extraction endpoint backed by a Python pipeline.',
    contribution: [
      'Routed 11 input formats through 4 adapters into one document model.',
      'Made OCR optional at build time: the default binary needs no native libraries, and a build tag adds Tesseract.',
    ],
    impact: 'Public MIT-licensed code; a new format is an adapter plus a detection rule, and the pipeline, OCR and exporters don\'t change.',
    risks: [
      { when: 'the OCR engine isn\'t installed', then: 'OCR requests get a clear per-page error and every other path keeps working.' },
    ],
    stack: 'Go, gRPC, Python, Tesseract, Vue',
    links: [{ label: 'Code', href: 'https://github.com/TheBraveByte/bloom-parser' }],
    diagram: 'pipeline',
  },
]

export const findWork = (slug: string) => work.find(w => w.slug === slug)
