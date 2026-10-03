// Every statement here is backed by a claim in TheBraveByte/engineering-contributions.
// Add nothing that isn't. See docs/voice.md and docs/information-architecture.md.

export interface WorkLink {
  label: string
  href: string
}

export interface WorkItem {
  slug: string
  name: string
  years: string
  role: string
  summary: string
  points: string[]
  stack: string
  links: WorkLink[]
  // Base name of an image set in public/img/work (see components/Media.vue).
  media?: { name: string, alt: string, width: number, height: number, widths: number[] }
  // Drawn instead of a screenshot when the project's shape says more than its UI.
  diagram?: 'pipeline'
  group: 'own' | 'client'
  featured?: boolean
}

export const work: WorkItem[] = [
  {
    slug: 'babit',
    name: 'babit',
    years: '2026',
    role: 'Sole author',
    summary:
      'Records what an AI agent did, ties it to the signed permission that allowed it, and issues a receipt anyone can verify without the server.',
    points: [
      'Agent authority is an explicit, signed list of capabilities, so what an agent was allowed to do can be checked afterwards.',
      'Receipts verify offline against the notary\'s public key and an external anchor. An audit log you have to request from the audited party is not evidence.',
    ],
    stack: 'Go, gRPC, PostgreSQL, React',
    links: [
      { label: 'Demo', href: 'https://babit-inky.vercel.app' },
      { label: 'Code', href: 'https://github.com/TheBraveByte/babit' },
    ],
    media: { name: 'babit', alt: 'The babit landing page', width: 2000, height: 1250, widths: [800, 1400, 2000] },
    group: 'own',
    featured: true,
  },
  {
    slug: 'rixl',
    name: 'Rixl',
    years: '2025 to 2026',
    role: 'Development Lead (contract)',
    summary:
      'A video and media platform. I led backend development across its services, shared library and SDKs.',
    points: [
      'Moved the services from REST to gRPC behind a REST gateway, keeping REST as the public contract.',
      'Rebuilt video transcoding on a Postgres-backed job queue, with jobs and data written in one transaction.',
      'Generated one OpenAPI spec from the service definitions and SDKs in eight languages from that spec.',
    ],
    stack: 'Go, PostgreSQL, River, ClickHouse, FFmpeg',
    links: [
      { label: 'Go SDK', href: 'https://github.com/rixlhq/rixl-go' },
      { label: 'Docs', href: 'https://docs.rixl.com' },
    ],
    media: { name: 'rixl', alt: 'The Rixl documentation home page', width: 2000, height: 1344, widths: [800, 1400, 2000] },
    group: 'client',
    featured: true,
  },
  {
    slug: 'bloom-parser',
    name: 'bloom-parser',
    years: '2026',
    role: 'Sole author',
    summary:
      'A document ingestion service. Images, PDFs and spreadsheets go in; one structured document comes out over gRPC and REST.',
    points: [
      'Each format sits behind an adapter and OCR behind an interface, so adding a format touches nothing else.',
      'Without an OCR engine built in, OCR requests return a clear per-page error and every other path still works.',
    ],
    stack: 'Go, Python, Tesseract, gRPC',
    links: [{ label: 'Code', href: 'https://github.com/TheBraveByte/bloom-parser' }],
    diagram: 'pipeline',
    group: 'own',
    featured: true,
  },
  {
    slug: 'eazyfit',
    name: 'Eazyfit',
    years: '2025 to 2026',
    role: 'Principal backend engineer',
    summary:
      'A fashion-tailoring marketplace that turns two or three phone photos into tailor-ready measurements. Won $5,000 in pre-seed funding at the Ilorin Innovation Challenge.',
    points: [
      'Wrote most of the core API: 1,121 of its 1,275 commits.',
      'Built a two-stage escrow that pays stylists on order milestones. A unique index on order and stage means a replayed transition cannot pay twice.',
      'Ran the Python vision engine in its own process behind a Go interface, so a crash there cannot take the API down.',
    ],
    stack: 'Go, Python, MongoDB, WebSockets',
    links: [{ label: 'Website', href: 'https://www.eazyfitfashion.com' }],
    media: { name: 'eazyfit', alt: 'Three screens from the Eazyfit mobile app', width: 1400, height: 956, widths: [800, 1400] },
    group: 'client',
    featured: true,
  },
  {
    slug: 'omonai',
    name: 'omonai',
    years: '2025 to 2026',
    role: 'Sole author',
    summary:
      'An anti-money-laundering and fraud-detection platform: transaction monitoring, sanctions screening and case management across four jurisdictions.',
    points: [
      'Detects structuring, smurfing and round-trip patterns as database aggregations, so thousands of transactions never enter the process.',
      'Jurisdiction rules are configuration data, so adding a country adds no new code paths.',
      'Risk ratings come with the factors that produced them, so an analyst sees why, not just what.',
    ],
    stack: 'Go, Python, MongoDB, Redis, Vue',
    links: [],
    group: 'own',
  },
  {
    slug: 'bitraq',
    name: 'BiTraq',
    years: '2025 to 2026',
    role: 'Sole author',
    summary:
      'A crypto and stock arbitrage platform that compares prices across exchanges and decides whether a gap is worth trading.',
    points: [
      'A gap only counts once venue fees, slippage, gas and bridge fees are subtracted.',
      'Every automated trade passes a risk manager: daily loss limits, a drawdown circuit breaker and exposure caps.',
      'The technical docs state what the engine does not model, including that live exchange execution is still stubbed.',
    ],
    stack: 'Go, MongoDB, Redis, Stripe',
    links: [{ label: 'Website', href: 'https://bitraq.netlify.app' }],
    media: { name: 'bitraq', alt: 'The BiTraq landing page', width: 1400, height: 995, widths: [800, 1400] },
    group: 'own',
  },
  {
    slug: 'lura',
    name: 'Lura',
    years: '2026',
    role: 'Sole engineer',
    summary:
      'WhatsApp commerce for small vendors, with a Go gateway that reads text, voice and photos and matches them to a vendor\'s catalogue.',
    points: [
      'Below a confidence threshold, the gateway offers alternatives and asks, rather than asserting a wrong match to a buyer.',
      'When a model provider is down, only that kind of message degrades; the rest of the service keeps working.',
    ],
    stack: 'Go, Nuxt',
    links: [],
    group: 'own',
  },
  {
    slug: 'remittance',
    name: 'Remittance platform',
    years: '2026',
    role: 'Sole engineer, client project',
    summary:
      'Moves money from the US, UK and EU to Africa over mobile-money rails: pricing, collection, screening, ledger, payout and reconciliation.',
    points: [
      'Balances live in a TigerBeetle double-entry ledger, mirrored to Postgres for queries, with a replay path for when the two drift.',
      'Every transfer takes a ledger hold before any irreversible call to a payout vendor.',
      'An unrecognised vendor response is "unsure", never a decline, so it is checked before any resend.',
    ],
    stack: 'Go, gRPC, PostgreSQL, TigerBeetle',
    links: [{ label: 'Note', href: '/writing/unsure-is-not-failed' }],
    group: 'client',
  },
  {
    slug: 'attendance',
    name: 'Attendance and access platform',
    years: '2025 to 2026',
    role: 'Lead engineer, client project',
    summary:
      'Multi-tenant attendance, access cards and check-ins for organisations and schools.',
    points: [
      'Tenant isolation is enforced twice: in the application, and by Postgres row-level security underneath.',
      'Audit rows are written by database triggers, so even a direct admin query is recorded.',
    ],
    stack: 'Go, PostgreSQL',
    links: [],
    group: 'client',
  },
  {
    slug: 'paymax',
    name: 'Paymax',
    years: '2025 to 2026',
    role: 'Backend engineer (contract)',
    summary:
      'One platform covering delivery, transport, school management, voting and health insurance, built by a team of 30+ engineers.',
    points: [
      'Carried out the move from microservices to one modular process, replacing Kafka, OPA and Elasticsearch.',
      'Owned the delivery, transport, voting and health-insurance domains end to end.',
    ],
    stack: 'Go, MongoDB, Redis',
    links: [{ label: 'Note', href: '/writing/collapsing-early-microservices' }],
    group: 'client',
  },
]

export const featuredWork = work.filter(w => w.featured)
