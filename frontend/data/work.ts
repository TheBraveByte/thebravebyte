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
  note?: string
  featured?: boolean
  kind: 'public' | 'experience'
  what: string // one plain sentence: what it is
  myRole: string // one or two sentences: what I did
  owned?: string[] // selected ownership, one feature per line, no technology names
  status?: string // shown as a badge: Live, Open source, Live demo
  ownership?: { feature: string, chain: string[], evidence: string }
  // Home page brief for selected work: the problem, what I built, what a visitor can check.
  problem?: string
  built?: string
  evidence?: string
  shot?: WorkMedia // a real screen of the product, for the featured slot on the home page
  shotDark?: WorkMedia // the same screen in the product's dark theme, shown when the site is dark
  shotCaption?: string
}

// Client work: real, private, never publicly launched. Named by what it is, never by
// client or product name, and never given a project page.
export interface ClientWork { what: string, role: string, years: string }
export const clientWork: ClientWork[] = [
  { what: 'Cross-border remittance platform', role: 'Sole backend engineer', years: '2026' },
  { what: 'Anti-money-laundering and compliance platform', role: 'Sole engineer', years: '2025 to 2026' },
  { what: 'Crypto arbitrage and trading platform', role: 'Sole engineer', years: '2025 to 2026' },
  { what: 'WhatsApp commerce assistant with AI product matching', role: 'Lead engineer', years: '2026' },
  { what: 'Multi-tenant attendance and access-card platform', role: 'Lead backend engineer', years: '2025 to 2026' },
]

export const work: WorkItem[] = [
  {
    slug: 'rixl',
    what: 'A video and media platform other products build on.',
    myRole: 'I was a backend software engineer across its core API, auth, gateway and analytics services.',
    owned: [
      'Billing: checkout and subscriptions, usage meters, invoices, webhooks and plan quotas.',
      'Passkey sign-in, across the auth service, API and gateway.',
      'Authorization policies.',
      'Canary releases, with metrics labelled by cohort so a canary can be judged before rollout.',
      'Request tracing across the services.',
      'Subtitle and audio tracks: upload, authoring and processing.',
      'The authentication layer every service uses to call another.',
      'The move of the core services to gRPC, and all eight SDKs.',
    ],
    kind: 'experience',
    ownership: {
      feature: 'Billing in the core API',
      chain: ['Stripe checkout and subscriptions', 'Usage meters', 'Invoices', 'Webhooks', 'Plan quotas', 'Tests'],
      evidence: 'I wrote most of the billing code and its tests.',
    },
    name: 'Rixl',
    years: '2025 to 2026',
    context: 'Employer, contract',
    role: 'Software engineer, backend',
    duration: '16 months',
    description: 'The largest contributor to the backend of a video and media platform, and owner of its billing and client authentication.',
    about: 'Rixl handles the media side of other products: uploading and delivering images and video, feeds, engagement analytics, accounts and billing. I was the largest contributor to the core API, auth, gateway and analytics services, and started all eight SDKs.',
    contribution: [
      'Owned billing in the core API: Stripe checkout and subscriptions, usage meters, invoices, webhooks and plan quotas.',
      'Wrote most of client-credentials auth and platform auth.',
      'Moved the core API, auth and analytics services to gRPC behind a REST gateway, and started all eight SDK repositories.',
    ],
    impact: 'The billing and auth code I owned ships in Rixl\'s public API, 210 operations documented at docs.rixl.com.',
    risks: [
      { when: 'a transcoding job fails or stalls', then: 'renditions are claimed with row locks and retried with backoff, and a reconciler recovers uploads that stall.' },
      { when: 'the SDKs could drift from the API', then: 'the spec is generated from the service definitions, and every change regenerates all eight SDKs.' },
      { when: 'one dashboard query gets expensive', then: 'analytics runs as its own ClickHouse service, and each dashboard query has a work limit and a deadline.' },
    ],
    stack: 'Go, gRPC, PostgreSQL, River, ClickHouse, FFmpeg',
    links: [
      { label: 'Go SDK', href: 'https://github.com/rixlhq/rixl-go' },
      { label: 'API docs', href: 'https://docs.rixl.com' },
    ],
    media: { name: 'rixl', alt: 'The Rixl documentation home page', width: 2000, height: 1344, widths: [800, 1400, 2000] },
    note: 'explicit-work-not-polling',
    featured: true,
  },
  {
    slug: 'eazyfit',
    what: 'A marketplace where people in Nigeria order custom outfits from verified stylists, measured from phone photos.',
    myRole: 'I was principal backend engineer, across its API, payments and measurement.',
    owned: [
      'Two-stage escrow payouts: 70 percent to the stylist on acceptance, 30 percent on delivery.',
      'The payout release service, from the design runbook to its tests and deploy workflow.',
      'The measurement engine that turns front, side and back photos into measurements.',
    ],
    kind: 'public',
    status: 'Live',
    ownership: {
      feature: 'Two-stage escrow payouts',
      chain: ['Design runbook', 'Data model and indexes', 'Release service', 'Paystack transfers', 'Tests', 'CI deploy', 'Structured logging'],
      evidence: 'I wrote the runbook, the release service and its tests, the deploy workflow and the Compose config, and almost all of the payment code.',
    },
    name: 'Eazyfit',
    years: '2025 to 2026',
    context: 'Startup',
    role: 'Principal backend engineer',
    duration: '14 months',
    description: 'Built most of the backend for a tailoring marketplace, including staged escrow payouts and a measurement engine that turns front, side and back photos into tailor-ready measurements.',
    about: 'Customers book tailors and stylists and get measured from photos instead of a tape.',
    contribution: [
      'Wrote most of the main API and almost all of its payment code.',
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
    links: [
      { label: 'Visit the website', href: 'https://www.eazyfitfashion.com' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.anonymous.eazyfit' },
    ],
    media: { name: 'eazyfit-site', alt: 'The Eazyfit website: custom outfits from verified stylists, with the app on three phones', width: 1400, height: 875, widths: [800, 1400] },
    featured: true,
  },
  {
    slug: 'babit',
    what: 'Proof of what an AI agent did, and who allowed it.',
    myRole: 'I designed and built it on my own, from the architecture to the live demo.',
    problem: 'When an agent drives a browser, runs code or acts on a desktop, someone will ask who allowed it.',
    built: 'All of it, alone. Each action is recorded against the signed grant that permitted it and sealed into an append-only ledger. A delegated grant can only narrow its parent.',
    evidence: 'A live demo and public source. Receipts verify offline with the babit verify command, and an end-to-end test tampers with a receipt to prove verification fails.',
    shot: { name: 'babit-console', alt: 'A sealed receipt in the babit console: the action an agent took, its session and grant, and the chain of grants that authorized it', width: 2000, height: 1100, widths: [800, 1440, 2000] },
    shotDark: { name: 'babit-console-dark', alt: 'A sealed receipt in the babit console: the action an agent took, its session and grant, and the chain of grants that authorized it', width: 2000, height: 1100, widths: [800, 1440, 2000] },
    shotCaption: 'A sealed receipt in the babit console: the action, and the grants that authorized it.',
    kind: 'public',
    status: 'Live demo',
    ownership: {
      feature: 'The whole system',
      chain: ['Architecture doc', 'Schema and migrations', 'gRPC services', 'REST gateway', 'React console', 'End-to-end tests', 'Deployed demo'],
      evidence: 'Sole author, from the architecture document to the live demo.',
    },
    name: 'babit',
    years: '2026',
    context: 'Personal project, source-available',
    role: 'Sole author',
    duration: 'About a month',
    description: 'Built a system that records what an AI agent did, binds it to the signed permission that allowed it, and issues receipts anyone can verify without the server.',
    about: 'When an agent drives a browser, runs code or acts on a desktop, babit records each action against the grant that permitted it and seals it into a ledger. I built all of it.',
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
      { label: 'Try the demo', href: 'https://babit-inky.vercel.app' },
      { label: 'View source', href: 'https://github.com/TheBraveByte/babit' },
    ],
    media: { name: 'babit', alt: 'The babit landing page', width: 2000, height: 1250, widths: [800, 1400, 2000] },
    featured: true,
  },
  {
    slug: 'paymax',
    what: 'One platform for delivery, transport, voting and health insurance.',
    myRole: 'Backend engineer and one of its two largest contributors. I owned four of its domains.',
    kind: 'experience',
    name: 'Paymax',
    years: '2025 to 2026',
    context: 'Employer, contract',
    role: 'Backend engineer',
    duration: '14 months',
    description: 'One of the two largest contributors to a multi-domain platform built by about 20 engineers, and moved its delivery service into the main application.',
    about: 'Delivery, transport, voting, elections, project management and health insurance on one platform. I was one of its two largest contributors.',
    contribution: [
      'Wrote the transport, medical, election and project-management domains, and most of delivery.',
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
    slug: 'bloom-parser',
    what: 'A service that turns images, PDFs and spreadsheets into one structured document.',
    myRole: 'I built it and published it as open source.',
    kind: 'public',
    status: 'Open source',
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
    links: [
      { label: 'Try the demo', href: 'https://bloom-parser.onrender.com' },
      { label: 'View source', href: 'https://github.com/TheBraveByte/bloom-parser' },
    ],
    diagram: 'pipeline',
  },
]

export const findWork = (slug: string) => work.find(w => w.slug === slug)
