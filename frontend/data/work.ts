// Every statement here is backed by a claim in TheBraveByte/engineering-contributions.
// Add nothing that isn't. Scholnet is under NDA and never appears. See docs/voice.md.
//
// The site is organised around what goes wrong. Each system lists the situations it was
// built for as when/then pairs; the home page draws its list from the same pairs.

export interface WorkLink { label: string, href: string }
export interface WorkMedia { name: string, alt: string, width: number, height: number, widths: number[] }
export interface Risk { when: string, then: string, home?: boolean }

export interface WorkItem {
  slug: string
  name: string
  years: string
  context: string // personal project, client project, employer
  role: string
  summary: string // one line
  about: string // a short paragraph: what the system is
  risks: Risk[]
  stack: string
  links: WorkLink[]
  media?: WorkMedia
  diagram?: 'pipeline'
  simulation?: boolean
  note?: string
}

export const work: WorkItem[] = [
  {
    slug: 'remittance',
    name: 'Remittance platform',
    years: '2026',
    context: 'Client project',
    role: 'Sole engineer',
    summary: 'Moves money from the US, UK and EU to mobile-money wallets in Africa.',
    about: 'It prices a corridor, collects the sender\'s money, screens both parties, holds the funds in a double-entry ledger, pays out to a wallet or bank, and reconciles the vendor\'s answer when it eventually comes. I designed and built all of it, in six days.',
    risks: [
      { when: 'the payout vendor never answers', then: 'the payout is marked unsure, never failed, and the vendor is asked before any money is sent again.', home: true },
      { when: 'money leaves before the books agree', then: 'every transfer takes a ledger hold before the irreversible call to the vendor.' },
      { when: 'the ledger and its copy drift apart', then: 'balances live in TigerBeetle; the Postgres mirror has a replay path and its own fault tests.' },
      { when: 'a compliance check errors', then: 'risk rules run before money moves, and they fail closed.' },
    ],
    stack: 'Go, gRPC, PostgreSQL, TigerBeetle',
    links: [],
    simulation: true,
    note: 'unsure-is-not-failed',
  },
  {
    slug: 'rixl',
    name: 'Rixl',
    years: '2025 to 2026',
    context: 'Employer, contract',
    role: 'Development Lead',
    summary: 'A video and media platform. I led backend development.',
    about: 'Rixl handles the media side of other products: uploading and delivering images and video, feeds, engagement analytics, accounts and billing. I owned the platform core, the gateway, analytics, the shared library and the SDKs in eight languages.',
    risks: [
      { when: 'a worker dies halfway through a job', then: 'transcoding runs on a Postgres-backed queue; rows and their jobs are written together, and a reconciler puts stale work back.', home: true },
      { when: 'the SDKs drift from the API', then: 'one OpenAPI spec is generated from the service definitions, the SDKs from the spec, and CI fails when it goes stale.' },
      { when: 'one dashboard query gets expensive', then: 'analytics runs as its own ClickHouse service with a work limit on every query.' },
    ],
    stack: 'Go, gRPC, PostgreSQL, River, ClickHouse, FFmpeg',
    links: [
      { label: 'Go SDK', href: 'https://github.com/rixlhq/rixl-go' },
      { label: 'Docs', href: 'https://docs.rixl.com' },
    ],
    media: { name: 'rixl', alt: 'The Rixl documentation home page', width: 2000, height: 1344, widths: [800, 1400, 2000] },
    note: 'explicit-work-not-polling',
  },
  {
    slug: 'eazyfit',
    name: 'Eazyfit',
    years: '2025 to 2026',
    context: 'Startup',
    role: 'Principal backend engineer',
    summary: 'A tailoring marketplace that turns phone photos into measurements.',
    about: 'Customers book tailors and stylists; two or three phone photos become tailor-ready measurements. I wrote most of the core API, 1,121 of its 1,275 commits. The product won $5,000 in pre-seed funding at the Ilorin Innovation Challenge.',
    risks: [
      { when: 'the same payout event arrives twice', then: 'a unique index on order and stage makes the second payment impossible.', home: true },
      { when: 'two parts of the code both try to move money', then: 'exactly one service may write payout state.' },
      { when: 'the vision engine crashes', then: 'it runs in its own process behind a Go interface, so the API stays up.' },
    ],
    stack: 'Go, Python, MongoDB, WebSockets',
    links: [{ label: 'Website', href: 'https://www.eazyfitfashion.com' }],
    media: { name: 'eazyfit', alt: 'Three screens from the Eazyfit mobile app', width: 1400, height: 956, widths: [800, 1400] },
  },
  {
    slug: 'babit',
    name: 'babit',
    years: '2026',
    context: 'Personal project',
    role: 'Sole author',
    summary: 'Proof of what an AI agent did, and who allowed it.',
    about: 'When an agent drives a browser, runs code or acts on a desktop, babit records each action, binds it to the signed permission that allowed it, and issues a receipt.',
    risks: [
      { when: 'someone asks who allowed an agent to do that', then: 'authority is a signed list of capabilities, and every action carries a receipt anyone can verify without my server.', home: true },
      { when: 'a receipt is shared outside the company', then: 'identifiers are unguessable, so one receipt reveals nothing about the others.' },
    ],
    stack: 'Go, gRPC, PostgreSQL, React',
    links: [
      { label: 'Demo', href: 'https://babit-inky.vercel.app' },
      { label: 'Code', href: 'https://github.com/TheBraveByte/babit' },
    ],
    media: { name: 'babit', alt: 'The babit landing page', width: 2000, height: 1250, widths: [800, 1400, 2000] },
  },
  {
    slug: 'lura',
    name: 'Lura',
    years: '2026',
    context: 'Personal project',
    role: 'Sole engineer',
    summary: 'WhatsApp commerce for small vendors, with an AI gateway in Go.',
    about: 'A dashboard for selling over WhatsApp, and a Go service that reads each message, whether text, a voice note or a photo, against the vendor\'s catalogue and drafts a reply.',
    risks: [
      { when: 'the model isn\'t sure', then: 'it offers alternatives and asks, instead of telling a buyer the wrong product.', home: true },
      { when: 'a model provider goes down', then: 'only that kind of message degrades; text still works when voice doesn\'t.' },
    ],
    stack: 'Go, Nuxt, Hugging Face',
    links: [],
  },
  {
    slug: 'attendance',
    name: 'Attendance platform',
    years: '2025 to 2026',
    context: 'Client project',
    role: 'Lead engineer',
    summary: 'Multi-tenant attendance and access cards for organisations and schools.',
    about: 'Access cards, location check-ins, attendance sessions and audit trails for many organisations on one backend. I wrote about 94 percent of it.',
    risks: [
      { when: 'a handler forgets the tenant check', then: 'Postgres row-level security refuses the other tenant\'s rows anyway.', home: true },
      { when: 'someone edits data directly in the database', then: 'audit rows are written by triggers, so it is still recorded.' },
      { when: 'face matching is down or unsure', then: 'it is treated as a signal, not an authority, and check-in still works.' },
    ],
    stack: 'Go, PostgreSQL',
    links: [],
  },
  {
    slug: 'bitraq',
    name: 'BiTraq',
    years: '2025 to 2026',
    context: 'Personal project',
    role: 'Sole author',
    summary: 'Crypto and stock arbitrage, with a risk manager in front of every trade.',
    about: 'Compares prices across exchanges and on-chain markets and decides whether a gap is worth acting on, then alerts or trades under a rules engine. The docs state what it does not model; live exchange execution is still stubbed.',
    risks: [
      { when: 'a price gap looks like free money', then: 'fees, slippage, gas and bridge costs are subtracted before it counts.', home: true },
      { when: 'an automated strategy starts losing', then: 'daily loss limits and a drawdown circuit breaker stop it.' },
      { when: 'the same order is submitted twice', then: 'the duplicate returns the original order instead of a second trade.' },
    ],
    stack: 'Go, MongoDB, Redis, Stripe',
    links: [{ label: 'Website', href: 'https://bitraq.netlify.app' }],
    media: { name: 'bitraq', alt: 'The BiTraq landing page', width: 1400, height: 995, widths: [800, 1400] },
  },
  {
    slug: 'omonai',
    name: 'omonai',
    years: '2025 to 2026',
    context: 'Personal project',
    role: 'Sole author',
    summary: 'Anti-money-laundering and fraud detection across four jurisdictions.',
    about: 'Transaction monitoring, sanctions screening, due diligence and case management: a Go backend of about 30 modules, a Python machine-learning service and a Vue front end.',
    risks: [
      { when: 'an analyst has to defend a risk rating', then: 'the score comes with the factors that produced it.', home: true },
      { when: 'a new country\'s rules arrive', then: 'jurisdictions are configuration data, not new code paths.' },
      { when: 'thousands of transactions need checking for a pattern', then: 'structuring and round-trips are found by database aggregations, not in memory.' },
    ],
    stack: 'Go, Python, MongoDB, Redis, Vue',
    links: [],
  },
  {
    slug: 'paymax',
    name: 'Paymax',
    years: '2025 to 2026',
    context: 'Employer, contract',
    role: 'Backend engineer',
    summary: 'A twelve-domain platform built by a team of 30+ engineers.',
    about: 'Delivery, transport, school management, voting and health insurance on one platform. I was one of its two largest contributors and owned several of its domains end to end.',
    risks: [
      { when: 'the infrastructure costs more than the traffic', then: 'the team consolidated to one process; I carried out the move off Kafka, OPA and Elasticsearch.', home: true },
    ],
    stack: 'Go, Gin, MongoDB, Redis',
    links: [],
    note: 'collapsing-early-microservices',
  },
  {
    slug: 'bloom-parser',
    name: 'bloom-parser',
    years: '2026',
    context: 'Personal project, open source',
    role: 'Sole author',
    summary: 'Document ingestion over gRPC and REST: images, PDFs and spreadsheets in, one document out.',
    about: 'One pipeline turns images, PDFs, spreadsheets and tabular text into a common document, with exports to CSV, XLSX and Power BI.',
    risks: [
      { when: 'the OCR engine isn\'t installed', then: 'OCR requests get a clear per-page error and every other path keeps working.', home: true },
      { when: 'a new file format is needed', then: 'it is one adapter and one registration; nothing else changes.' },
    ],
    stack: 'Go, gRPC, Python, Tesseract',
    links: [{ label: 'Code', href: 'https://github.com/TheBraveByte/bloom-parser' }],
    diagram: 'pipeline',
  },
]

export const findWork = (slug: string) => work.find(w => w.slug === slug)

// The home page list: one situation per system, in this order.
export const situations = work.flatMap(w => w.risks.filter(r => r.home).map(r => ({ ...r, work: w })))
