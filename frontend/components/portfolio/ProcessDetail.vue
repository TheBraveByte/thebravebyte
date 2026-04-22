<template>
  <div class="pt-16 md:pt-20 pb-16">
    <div class="container-wide">
      <slot name="header">
        <NuxtLink
          to="/#process"
          class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-8"
        >
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
          Back to home
        </NuxtLink>
      </slot>

      <header class="mb-10 max-w-2xl">
        <h1 class="text-xl font-semibold text-text mb-2">Architecture notes</h1>
        <p class="text-[15px] text-text-secondary leading-[1.65]">
          Short write-ups of real systems I've shipped: the business problem,
          the trade-off, the outcome.
        </p>
      </header>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="hidden md:flex flex-nowrap gap-x-1 gap-y-1 flex-wrap pb-2 border-b border-border">
          <button
            v-for="(section, index) in sections"
            :key="index"
            @click="activeTab = index"
            :class="[
              'px-3 py-1.5 text-sm rounded-md transition-colors',
              activeTab === index
                ? 'bg-bg-secondary text-text font-medium'
                : 'text-text-muted hover:text-text hover:bg-bg-secondary/60',
            ]"
          >
            {{ section.title }}
          </button>
        </div>
        <div class="md:hidden">
          <select
            v-model="activeTab"
            class="w-full px-3 py-2 border border-border bg-bg text-text text-sm rounded-md focus:outline-none focus:border-ink"
          >
            <option v-for="(section, index) in sections" :key="index" :value="index">
              {{ (index + 1).toString().padStart(2, '0') }} · {{ section.title }}
            </option>
          </select>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div :key="activeTab" class="grid lg:grid-cols-2 gap-8 lg:gap-10">
          <!-- Narrative -->
          <div>
            <h2 class="text-lg font-semibold text-text mb-4">
              {{ sections[activeTab]?.title }}
            </h2>

            <div
              v-if="sections[activeTab]?.title === 'Production Systems'"
              class="flex items-center gap-2 text-xs text-text-muted mb-5"
            >
              <Icon name="lucide:award" class="w-3.5 h-3.5" />
              <span>$5,000 Pre-Seed · Ilorin Innovation Challenge</span>
            </div>

            <p class="text-[15px] text-text-secondary leading-[1.7] mb-7">
              {{ sections[activeTab]?.description }}
            </p>

            <div v-if="sections[activeTab]?.features" class="space-y-5 mb-8">
              <div v-for="(feature, idx) in sections[activeTab]?.features" :key="idx">
                <h3 class="text-sm font-semibold text-text mb-2">{{ feature.title }}</h3>
                <ul class="space-y-1.5 text-[14px] text-text-secondary leading-[1.6]">
                  <li
                    v-for="(item, i) in feature.items"
                    :key="i"
                    class="flex items-start gap-2"
                  >
                    <span class="text-text-muted mt-0.5">·</span>
                    <span class="flex-1" v-html="item"></span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-border gap-4">
              <button
                @click="previousTab"
                :disabled="activeTab === 0"
                :class="[
                  'inline-flex items-center gap-1.5 text-sm transition-colors',
                  activeTab === 0 ? 'opacity-30 cursor-not-allowed' : 'text-text-muted hover:text-text',
                ]"
              >
                <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
                Previous
              </button>
              <button
                @click="nextTab"
                :disabled="activeTab === sections.length - 1"
                :class="[
                  'inline-flex items-center gap-1.5 text-sm transition-colors',
                  activeTab === sections.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-text-muted hover:text-text',
                ]"
              >
                Next
                <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <!-- Diagram / code -->
          <div>
            <div class="mb-3 flex justify-between items-center">
              <span class="text-xs text-text-muted">
                {{ showCode && sections[activeTab]?.code ? 'Source' : 'Diagram' }}
              </span>
              <div v-if="sections[activeTab]?.code" class="inline-flex bg-bg-secondary rounded-md p-0.5 border border-border">
                <button
                  @click="showCode = false"
                  :class="[
                    'px-2.5 py-1 text-xs rounded transition-colors',
                    !showCode ? 'bg-bg text-text shadow-sm' : 'text-text-muted hover:text-text',
                  ]"
                >
                  Diagram
                </button>
                <button
                  @click="showCode = true"
                  :class="[
                    'px-2.5 py-1 text-xs rounded transition-colors',
                    showCode ? 'bg-bg text-text shadow-sm' : 'text-text-muted hover:text-text',
                  ]"
                >
                  Code
                </button>
              </div>
            </div>

            <div
              v-show="!showCode"
              class="mermaid-container relative border border-border rounded-md overflow-hidden flex items-center justify-center min-h-[480px] bg-bg-secondary/40 cursor-grab"
              @mousedown="startPan"
              @mousemove="doPan"
              @mouseup="endPan"
              @mouseleave="endPan"
            >
              <div
                class="mermaid-content w-full h-full flex items-center justify-center transition-transform duration-75 ease-linear"
                :style="{ transform: `translate(${panX}px, ${panY}px) scale(${scale})` }"
              >
                <div
                  class="mermaid w-full h-full flex items-center justify-center select-none pointer-events-none p-6"
                  v-html="currentSvg"
                ></div>
              </div>

              <div class="absolute bottom-3 right-3 flex rounded-md overflow-hidden border border-border bg-bg shadow-sm">
                <button @click.stop="zoomIn" class="p-1.5 border-r border-border hover:bg-bg-secondary transition-colors" title="Zoom in">
                  <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                </button>
                <button @click.stop="zoomOut" class="p-1.5 border-r border-border hover:bg-bg-secondary transition-colors" title="Zoom out">
                  <Icon name="lucide:minus" class="w-3.5 h-3.5" />
                </button>
                <button @click.stop="resetZoom" class="p-1.5 hover:bg-bg-secondary transition-colors" title="Reset">
                  <Icon name="lucide:rotate-ccw" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div v-if="showCode && sections[activeTab]?.code" class="relative min-h-[480px] border border-border rounded-md overflow-hidden">
              <div class="flex items-center justify-between px-3 py-2 border-b border-border bg-bg-secondary text-xs text-text-muted font-mono">
                <span>{{ sections[activeTab]?.code?.filename }}</span>
                <span>{{ sections[activeTab]?.code?.language }}</span>
              </div>
              <pre class="bg-bg text-text p-4 overflow-x-auto text-[12.5px] font-mono leading-[1.6]"><code>{{ sections[activeTab]?.code?.content }}</code></pre>
            </div>
          </div>
        </div>
      </transition>

      <!-- CTA -->
      <div class="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p class="text-sm text-text-secondary">
          Want to talk about a system like these?
        </p>
        <NuxtLink to="/#contact" class="btn-primary">
          Get in touch
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import mermaid from 'mermaid';

const colorMode = useColorMode();
const isDarkMode = computed(() => colorMode.value === 'dark');

const getThemeColors = () => {
  const dark = isDarkMode.value;
  return {
    nodePrimary: dark ? '#1e293b' : '#f1f5f9',
    nodeSecondary: dark ? '#0f172a' : '#e2e8f0',
    nodeTertiary: dark ? '#020617' : '#ffffff',
    textColor: dark ? '#f8fafc' : '#0f172a',
    strokeAccent: '#818cf8',
    strokeInfo: '#22d3ee',
    strokeWarning: '#f59e0b',
    strokeSuccess: '#22c55e',
    strokeError: '#f43f5e',
    strokeMuted: dark ? '#94a3b8' : '#64748b',
    strokePurple: '#6366f1',
  };
};

const nodeStyle = (type: 'primary' | 'secondary' | 'tertiary', stroke: string) => {
  const colors = getThemeColors();
  const fills = { primary: colors.nodePrimary, secondary: colors.nodeSecondary, tertiary: colors.nodeTertiary };
  return `fill:${fills[type]},stroke:${stroke},stroke-width:2px,color:${colors.textColor}`;
};

const activeTab = ref(0);
const showCode = ref(false);
const currentSvg = ref('');
const scale = ref(1);
const panX = ref(0);
const panY = ref(0);
const isDragging = ref(false);
const startPanX = ref(0);
const startPanY = ref(0);

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.2, 3);
};

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.2, 0.5);
};

const resetZoom = () => {
  scale.value = 1;
  panX.value = 0;
  panY.value = 0;
};

const startPan = (e: MouseEvent) => {
  isDragging.value = true;
  startPanX.value = e.clientX - panX.value;
  startPanY.value = e.clientY - panY.value;
};

const doPan = (e: MouseEvent) => {
  if (!isDragging.value) return;
  panX.value = e.clientX - startPanX.value;
  panY.value = e.clientY - startPanY.value;
};

const endPan = () => {
  isDragging.value = false;
};

const renderDiagram = async () => {
  try {
    const element = document.querySelector('.mermaid');
    if (element) {
      const id = `mermaid-${Date.now()}`;
      const { svg } = await mermaid.render(id, sections.value[activeTab.value]?.diagram || '');
      currentSvg.value = svg;
    }
  } catch (error) {
    console.error('Mermaid rendering failed:', error);
  }
};

const nextTab = () => {
  if (activeTab.value < sections.value.length - 1) {
    activeTab.value++;
  }
};

const previousTab = () => {
  if (activeTab.value > 0) {
    activeTab.value--;
  }
};

watch(activeTab, async () => {
  showCode.value = false;
  resetZoom();
  await nextTick();
  await renderDiagram();
});

const diagramStyles = computed(() => {
  const dark = isDarkMode.value;
  const primary = dark ? '#1e293b' : '#e2e8f0';
  const secondary = dark ? '#0f172a' : '#f1f5f9';
  const tertiary = dark ? '#020617' : '#ffffff';
  const text = dark ? '#f8fafc' : '#0f172a';
  
  return {
    primaryAccent: `fill:${primary},stroke:#818cf8,stroke-width:2px,color:${text}`,
    primaryInfo: `fill:${primary},stroke:#22d3ee,stroke-width:2px,color:${text}`,
    primarySuccess: `fill:${primary},stroke:#22c55e,stroke-width:2px,color:${text}`,
    primaryError: `fill:${primary},stroke:#f43f5e,stroke-width:2px,color:${text}`,
    secondaryAccent: `fill:${secondary},stroke:#818cf8,stroke-width:2px,color:${text}`,
    secondaryInfo: `fill:${secondary},stroke:#22d3ee,stroke-width:2px,color:${text}`,
    secondaryWarning: `fill:${secondary},stroke:#f59e0b,stroke-width:2px,color:${text}`,
    secondarySuccess: `fill:${secondary},stroke:#22c55e,stroke-width:2px,color:${text}`,
    secondaryMuted: `fill:${secondary},stroke:${dark ? '#94a3b8' : '#64748b'},stroke-width:2px,color:${text}`,
    secondaryPurple: `fill:${secondary},stroke:#6366f1,stroke-width:2px,color:${text}`,
    secondaryOrange: `fill:${secondary},stroke:#f97316,stroke-width:2px,color:${text}`,
    tertiaryDashed: `fill:${tertiary},stroke:#334155,stroke-width:2px,color:${text},stroke-dasharray: 5 5`,
  };
});

const eazyfitDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
    Client([Client Apps<br/>Mobile/Web])
    LB[Traefik<br/>Load Balancer]
    API[API Gateway<br/>Go Chi Router]
    
    Auth[Auth Service<br/>Google/Apple OAuth]
    Core[Core Services<br/>Users, Orders, Payments]
    Chat[AI Chat Service<br/>WebSocket]
    Media[Media Services<br/>Stylist, Browse]
    Notifs[Notification Service<br/>Email + Push]
    
    Cache[(In-Memory Cache)]
    DB[(MongoDB)]
    
    Paystack[Paystack<br/>Payments]
    Cloudinary[Cloudinary<br/>Media Storage]
    Gmail[Gmail SMTP]
    Expo[Expo Push]
    
    Client -->|HTTPS/WSS| LB
    LB --> API
    
    API --> Auth
    API --> Core
    API --> Chat
    API --> Media
    API --> Notifs
    
    Auth --> Core
    Core --> Paystack
    Core --> Notifs
    Core --> DB
    
    Chat --> Core
    Chat --> DB
    
    Media --> Cache
    Media --> Cloudinary
    Media --> DB
    
    Notifs --> Gmail
    Notifs --> Expo
    
    style Client ${s.primaryAccent}
    style LB ${s.secondaryWarning}
    style API ${s.primaryAccent}
    style Auth ${s.primaryInfo}
    style Core ${s.primaryInfo}
    style Chat ${s.primaryInfo}
    style Media ${s.primaryInfo}
    style Notifs ${s.primaryInfo}
    style Cache ${s.secondaryWarning}
    style DB ${s.secondaryMuted}
    style Paystack ${s.secondarySuccess}
    style Cloudinary ${s.secondarySuccess}
    style Gmail ${s.secondarySuccess}
    style Expo ${s.secondarySuccess}`;
});

const billingDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
API[API] -->|Trigger| Handler[Billing Handler]
Handler --> Service[Billing Service]
API -->|Schedule| Jobs[Background Jobs]
Jobs --> Service
Jobs --> Aggregator[Usage Aggregator]
Handler -->|Record| UsageDB[(Usage DB)]
Aggregator -->|Read| UsageDB
Aggregator -->|Report| StripeMeter[Stripe Metering]
Jobs --> Bandwidth[Bandwidth Tracker]
Jobs --> Storage[Storage Tracker]
Bandwidth -->|Snapshot| UsageDB
Storage -->|Snapshot| UsageDB
Stripe[Stripe] -->|Webhook| WebhookHandler[Webhook Handler]
WebhookHandler --> WebhookService[Webhook Service]
Service --> StripeClient[Stripe Client]
Service --> DB[(Database)]
WebhookService --> DB
StripeClient -->|API Call| Stripe
StripeMeter -->|API Call| Stripe
style Handler ${s.primaryAccent}
style Service ${s.primaryInfo}
style StripeClient ${s.primaryInfo}
style Jobs ${s.secondaryWarning}
style Stripe ${s.secondaryPurple}
style Aggregator ${s.primaryAccent}
style DB ${s.secondaryMuted}`;
});

const jobProcessingDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
Source["API / Scheduler"] -->|Enqueue| JobService["Job Service"]
JobService -->|Persist| Queue["Job Queue"]
Queue -->|Poll| Manager["Worker Manager"]
Manager -->|Dispatch| W1["Alert Worker"]
Manager -->|Dispatch| W2["Wallet Worker"]
Manager -->|Dispatch| W3["Notification Worker"]
W1 -->|Process| P1["Alert Processor"]
W2 -->|Process| P2["Wallet Sync"]
W3 -->|Process| P3["Email/Push"]
P1 -->|Result| JobService
P2 -->|Result| JobService
P3 -->|Result| JobService
style Queue ${s.secondaryWarning}
style JobService ${s.primaryAccent}
style Manager ${s.primaryInfo}
style W1 ${s.primaryAccent}
style W2 ${s.primaryAccent}
style W3 ${s.primaryAccent}`;
});

const bitraqDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
User((User)) -->|Configure| API[API Gateway]
API --> AutoTrade[AutoTrading Service]
API --> Analytics[Analytics Service]
AutoTrade --> Risk[Risk Manager]
AutoTrade --> ArbEngine[Arbitrage Engine]
ArbEngine --> Jobs[Job Queue]
Jobs --> Workers[Worker Pool]
Workers --> MarketData[Market Data Service]
Workers --> ExchangeAdapter[Exchange Adapter]
ExchangeAdapter <-->|Orders| Exchanges[Exchanges]
MarketData <-->|Prices| Exchanges
Workers --> DB[(Database)]
Analytics --> DB
style API ${s.primaryAccent}
style AutoTrade ${s.primaryInfo}
style ArbEngine ${s.secondaryWarning}
style Workers ${s.primaryAccent}
style Exchanges ${s.secondaryInfo}
style DB ${s.secondaryMuted}`;
});

const multiTenantDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
    Org[Organization Admin] -->|Manages| Faculty[Faculty/Unit]
    Faculty -->|Contains| Dept[Department]
    Dept -->|Hosts| Class[Class/Room]
    
    User((Student/Staff)) -->|Request| API[API Gateway]
    API -->|Inject TenantID| Auth[Auth Layer]
    Auth -->|RLS Policy| DB[(Multi-Tenant DB)]
    
    subgraph "Data Isolation"
    DB
    end
    
    style Org ${s.primaryAccent}
    style Faculty ${s.primaryInfo}
    style Dept ${s.primaryInfo}
    style API ${s.secondaryWarning}
    style Auth ${s.primaryAccent}
    style DB ${s.secondaryMuted}`;
});

const concurrencyDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
Job[Job Queue] -->|Distribute| Dispatcher[Dispatcher]
Dispatcher -->|Spawn| W1[Worker 1]
Dispatcher -->|Spawn| W2[Worker 2]
Dispatcher -->|Spawn| W3[Worker 3]
W1 -->|Result| Aggregator[Aggregator]
W2 -->|Result| Aggregator
W3 -->|Result| Aggregator
Aggregator -->|Finalize| Response[Response]
style Job ${s.secondaryWarning}
style Dispatcher ${s.primaryAccent}
style W1 ${s.primaryInfo}
style W2 ${s.primaryInfo}
style W3 ${s.primaryInfo}
style Aggregator ${s.primaryAccent}
style Response ${s.secondaryInfo}`;
});

const architectureDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
Client[Client App] -->|HTTP/JSON| API[API Gateway]
subgraph Backend["Backend Service"]
API -->|Validate| Handler[Handler Layer]
Handler -->|Business Logic| Service[Service Layer]
Service -->|Data Access| Repo[Repository Layer]
end
Repo -->|Query| DB[(PostgreSQL)]
Repo -->|Cache| Redis[(Redis)]
style Client ${s.primaryAccent}
style API ${s.secondaryInfo}
style Handler ${s.primaryAccent}
style Service ${s.primaryAccent}
style Repo ${s.primaryAccent}
style DB ${s.secondaryInfo}
style Redis ${s.secondaryWarning}
style Backend ${s.tertiaryDashed}`;
});

const telegramBotDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
User((User)) -->|/start| Bot[Telegram Bot]
Bot --> Commands[Command Router]
Commands -->|/subscribe| SubFlow[Subscription Flow]
Commands -->|/status| Status[Check Status]
Commands -->|/admin| Admin[Admin Panel]

SubFlow --> TierSelect[Select Tier]
TierSelect -->|Tier 1 $50| PaymentSelect[Payment Method]
TierSelect -->|Tier 2 $1500| PaymentSelect

PaymentSelect -->|Crypto| CryptoHandler[Crypto Handler]
PaymentSelect -->|Card| CardHandler[Card Handler]

CryptoHandler --> NOWPayments[NOWPayments API]
CardHandler --> Stripe[Stripe/Paystack]

NOWPayments -->|Webhook| WebhookServer[Webhook Server]
Stripe -->|Webhook| WebhookServer

WebhookServer --> Verify[Signature Verification]
Verify --> PaymentDB[(Payments DB)]

Admin --> Pending[Pending Payments]
Pending --> Approve[Approve/Reject]
Approve --> SubDB[(Subscriptions DB)]
Approve --> Notify[Notify User]

Status --> SubDB
SubDB --> AccessControl[Access Control]
AccessControl -->|Active| Signals[Forex Signals Channel]

Bot --> UserDB[(Users DB)]
CryptoHandler --> CoinGecko[CoinGecko API]

style Bot ${s.primaryAccent}
style Commands ${s.primaryInfo}
style SubFlow ${s.secondaryWarning}
style CryptoHandler ${s.primarySuccess}
style CardHandler ${s.primarySuccess}
style Admin ${s.primaryError}
style WebhookServer ${s.primaryAccent}
style UserDB ${s.secondaryMuted}
style SubDB ${s.secondaryMuted}
style PaymentDB ${s.secondaryMuted}
style NOWPayments ${s.secondarySuccess}
style Stripe ${s.secondaryPurple}
style CoinGecko ${s.secondaryWarning}
style Signals ${s.secondaryOrange}`;
});

const fraudDetectionDiagram = computed(() => {
  const s = diagramStyles.value;
  return `graph TB
    API[API Endpoint] -->|Transaction| Preprocess[Preprocessor]
    Preprocess -->|Features| Scaler[Standard Scaler]
    Scaler -->|Vector| Model[TensorFlow Model]
    Model -->|Score| Decision[Decision Engine]
    Decision -->|Action| Response[Response]
    
    subgraph "ML Inference"
    Preprocess
    Scaler
    Model
    end
    
    style API ${s.primaryAccent}
    style Preprocess ${s.secondaryWarning}
    style Scaler ${s.secondaryWarning}
    style Model ${s.primaryInfo}
    style Decision ${s.primarySuccess}`;
});

const sections = computed(() => [
  {
    title: 'Distributed Job Processing',
    description: 'In BiTraq (crypto arbitrage platform), synchronous processing of price alerts, wallet syncing, and notification delivery would block the trading API, causing users to miss time-sensitive arbitrage windows. I decoupled these into persistent background queues, ensuring the main API responds in <50ms even under 10x traffic spikes.',
    features: [
      {
        title: 'Problem Solved',
        icon: 'lucide:target',
        items: ['<strong>Business Need:</strong> Traders need instant alert delivery for fleeting arbitrage opportunities', '<strong>Technical Challenge:</strong> Synchronous processing caused 3-5s API timeouts during peak hours', '<strong>Trade-off:</strong> Eventual consistency for non-critical paths vs. immediate consistency for trades']
      },
      {
        title: 'Architecture Decision',
        icon: 'lucide:lightbulb',
        items: ['Durable job queues with at-least-once delivery guarantees', 'Worker pool auto-scaling based on queue depth', 'Dead letter queues for failed jobs with exponential backoff', '<strong>Impact:</strong> 99.9% alert delivery rate, API latency reduced from 3s to <50ms']
      }
    ],
    diagram: jobProcessingDiagram.value,
    code: {
      language: 'go',
      filename: 'worker/pool.go',
      content: `type WorkerPool struct {
    maxWorkers int
    jobQueue   chan Job
    quit       chan bool
}

func NewWorkerPool(maxWorkers int) *WorkerPool {
    return &WorkerPool{
        maxWorkers: maxWorkers,
        jobQueue:   make(chan Job),
        quit:       make(chan bool),
    }
}

func (wp *WorkerPool) Run() {
    for i := 0; i < wp.maxWorkers; i++ {
        go func(workerID int) {
            for {
                select {
                case job := <-wp.jobQueue:
                    // Process job with panic recovery
                    func() {
                        defer func() {
                            if r := recover(); r != nil {
                                log.Printf("Worker %d panic: %v", workerID, r)
                            }
                        }()
                        job.Process()
                    }()
                case <-wp.quit:
                    return
                }
            }
        }(i)
    }
}`
    }
  },
  {
    title: 'Concurrency Patterns',
    description: 'In BiTraq\'s arbitrage engine, we fetch prices from 10+ exchanges simultaneously. Sequential fetching would take 5-10 seconds. By then, arbitrage windows close. Using Fan-Out/Fan-In, total latency equals only the slowest exchange (~300ms), capturing opportunities that competitors miss.',
    features: [
      {
        title: 'Why This Pattern?',
        icon: 'lucide:target',
        items: ['<strong>Business Context:</strong> Arbitrage windows last 200-500ms; speed is revenue', '<strong>The Problem:</strong> Sequential API calls = 10 exchanges × 500ms = 5s total latency', '<strong>Trade-off:</strong> Higher memory usage for concurrent goroutines vs. capturing 98.5% of opportunities']
      },
      {
        title: 'Engineering Decision',
        icon: 'lucide:zap',
        items: ['Fan-out to N workers, fan-in via buffered channels', 'Context-based cancellation for graceful timeout handling', 'Per-exchange circuit breakers to isolate failures', '<strong>Result:</strong> Latency reduced from 5s → max(T) = 300ms, 98.5% opportunity capture rate']
      }
    ],
    diagram: concurrencyDiagram.value
  },
  {
    title: 'AI Fraud Detection',
    description: 'For OmonAI (AML compliance platform), financial institutions needed real-time fraud detection without blocking legitimate transactions. Rule-based systems had 40% false positives, frustrating genuine customers. Our 10-dimensional ML model (CiferAI) analyzes behavioral patterns in <50ms, blocking sophisticated fraud while reducing false positives by 60%.',
    features: [
      {
        title: 'Business Problem',
        icon: 'lucide:target',
        items: ['<strong>Who:</strong> Financial institutions losing $50K+/month to fraud and chargebacks', '<strong>Challenge:</strong> Rule-based detection blocked 40% legitimate high-value transactions', '<strong>Trade-off:</strong> Model complexity vs. inference latency; chose lightweight TensorFlow for <50ms response']
      },
      {
        title: 'Technical Approach',
        icon: 'lucide:brain-circuit',
        items: ['<strong>Model:</strong> CiferAI 10-feature vector analysis (amount, balance deltas, account age, velocity)', '<strong>Stack:</strong> Python FastAPI + TensorFlow, Go orchestration layer', '<strong>Architecture:</strong> Separate ML microservice for independent scaling', '<strong>Impact:</strong> 60% reduction in false positives, <50ms latency, $30K/month fraud prevented']
      }
    ],
    diagram: fraudDetectionDiagram.value,
    code: {
      language: 'python',
      filename: 'fraud_detector/app.py',
      content: `def preprocess(payload: TransactionFeatures) -> np.ndarray:
    # Derive step from timestamp
    step = payload.timestamp if payload.timestamp else 1
    
    # Encode transaction type
    trans_type = TYPE_MAPPING.get(payload.transaction_type.upper(), 0)
    
    # Create feature vector (10 features)
    features = np.array([
        step, trans_type, float(payload.amount),
        abs(hash(payload.sender_id)) % 10000,
        payload.sender_balance_before,
        payload.sender_balance_after,
        abs(hash(payload.receiver_id)) % 10000,
        payload.receiver_balance_before,
        payload.receiver_balance_after,
        1.0 if payload.is_flagged else 0.0
    ], dtype=float)

    # Scale features
    scaler = get_scaler()
    return scaler.transform(features.reshape(1, -1))

@app.post("/predict")
async def predict(tx: TransactionFeatures):
    model = get_model()
    features = preprocess(tx)
    fraud_score = score(model, features)
    
    decision = "allow"
    if fraud_score >= 0.8: decision = "block"
    elif fraud_score >= 0.5: decision = "review"
    
    return {
        "transaction_id": tx.transaction_id,
        "fraud_score": fraud_score,
        "decision": decision
    }`
    }
  },
  {
    title: 'Production Systems',
    description: 'Eazyfit connects fashion customers with verified designers in Nigeria. A monolithic architecture meant chat traffic surges during peak hours degraded checkout reliability. I isolated Chat, Payments, and Core into separate domains, so a 10x chat spike no longer affects payment success rates. This modular design helped secure $5K pre-seed funding.',
    features: [
      {
        title: 'Business Context',
        icon: 'lucide:target',
        items: ['<strong>Users:</strong> Fashion-conscious customers seeking personalized styling services', '<strong>Problem:</strong> Peak chat load (order discussions) was crashing checkout flow', '<strong>Trade-off:</strong> Operational complexity of multiple services vs. independent scaling and fault isolation']
      },
      {
        title: 'Architecture Decisions',
        icon: 'lucide:check-circle',
        items: ['<strong>Domain Isolation:</strong> Chat (WebSocket), Payments (Paystack), Core (Orders/Users)', '<strong>AI Monitoring:</strong> Real-time content moderation to prevent off-platform transactions', '<strong>Impact:</strong> 99.99% uptime, payment success unaffected by chat load, won Ilorin Innovation Challenge']
      }
    ],
    diagram: eazyfitDiagram.value
  },
  {
    title: 'Usage-Based Billing',
    description: 'For RIXL (a media optimization platform with global edge delivery), traditional seat-based pricing did not fit. Customers pay for what they use: storage, bandwidth, transcoding. I designed an idempotent webhook system with nightly reconciliation against Stripe Meters. This ensures zero revenue leakage even during payment network failures.',
    features: [
      {
        title: 'Business Model',
        icon: 'lucide:target',
        items: ['<strong>Who:</strong> Content creators needing scalable media hosting (like YouTube)', '<strong>Why Usage-Based:</strong> Customers have variable usage; flat pricing is unfair and loses enterprise deals', '<strong>Trade-off:</strong> Complex metering infrastructure vs. fair pricing that scales from indie creators to enterprises']
      },
      {
        title: 'Engineering Approach',
        icon: 'lucide:check-circle',
        items: ['<strong>Metrics Tracked:</strong> Uploads, transcoding minutes, storage GB/month, bandwidth GB', '<strong>Aggregation:</strong> Background jobs snapshot usage every hour, report to Stripe Meters', '<strong>Reconciliation:</strong> Nightly jobs compare internal ledger with Stripe to catch discrepancies', '<strong>Result:</strong> 100% billing accuracy, zero disputes, seamless Stripe integration']
      }
    ],
    diagram: billingDiagram.value
  },
  {
    title: 'Multi-Tenant Architecture',
    description: 'Unified Campus (attendance platform) serves schools, universities, and companies, each with strict data isolation requirements. A single-tenant approach would be cost-prohibitive. I implemented multi-tenant architecture with organization hierarchies (school → faculty → department) and immutable audit logs for compliance.',
    features: [
      {
        title: 'Business Requirements',
        icon: 'lucide:target',
        items: ['<strong>Users:</strong> Schools, universities, and enterprises tracking attendance', '<strong>Problem:</strong> Each organization needs isolated data + hierarchical structure (company → departments)', '<strong>Trade-off:</strong> Shared infrastructure (cost) vs. strict logical isolation (security)']
      },
      {
        title: 'Design Decisions',
        icon: 'lucide:building-2',
        items: ['<strong>Tenant Model:</strong> Organization ID in every query, PostgreSQL RLS for enforcement', '<strong>Hierarchy:</strong> Parent-child relationships (School → Faculty → Department → Class)', '<strong>Audit Trail:</strong> Immutable event log for every state change (passed enterprise security audits)', '<strong>RBAC:</strong> Super Admin → Org Admin → Department Admin → User cascade']
      }
    ],
    diagram: multiTenantDiagram.value
  },
  {
    title: 'Clean Architecture',
    description: 'Across all my projects, I apply package-oriented design: Handlers (HTTP), Services (business logic), Repositories (data access). This is not academic. It enables testing business logic without databases, swapping Stripe for PayStack without touching services, and onboarding new developers in days, not weeks.',
    features: [
      {
        title: 'Why This Structure?',
        icon: 'lucide:target',
        items: ['<strong>Problem:</strong> "Spaghetti code" makes changes risky; one fix breaks three features', '<strong>Solution:</strong> Strict dependency direction (Handler → Service → Repository)', '<strong>Trade-off:</strong> More files/boilerplate vs. fearless refactoring and testability']
      },
      {
        title: 'Practical Benefits',
        icon: 'lucide:check-circle',
        items: ['<strong>Testability:</strong> Mock repository interface to test service logic without DB', '<strong>Flexibility:</strong> Swap MongoDB for PostgreSQL by implementing same Repository interface', '<strong>Maintainability:</strong> New team members understand boundaries immediately', '<strong>Result:</strong> 80%+ code coverage achievable, confident deployments']
      }
    ],
    diagram: architectureDiagram.value
  },
  {
    title: 'Forex Signals Bot',
    description: 'For a forex signals service, I embedded the entire subscription and payment flow inside Telegram, so users never leave the app. Supporting 250+ cryptocurrencies via NOWPayments plus traditional cards maximized conversion. Admin approval workflow ensures payment verification before granting channel access.',
    features: [
      {
        title: 'Business Problem',
        icon: 'lucide:target',
        items: ['<strong>Users:</strong> Forex traders wanting premium signals via Telegram', '<strong>Challenge:</strong> External payment pages caused 70% checkout abandonment', '<strong>Trade-off:</strong> Telegram UI limitations vs. zero-friction in-app payments']
      },
      {
        title: 'Technical Decisions',
        icon: 'lucide:check-circle',
        items: ['<strong>Multi-Gateway:</strong> NOWPayments (250+ cryptos) + Stripe/Paystack (cards)', '<strong>Session State:</strong> Redis-backed conversation state for multi-step payment flows', '<strong>Webhook Security:</strong> Signature verification + idempotent processing', '<strong>Impact:</strong> Checkout completion increased from 30% to 85%']
      }
    ],
    diagram: telegramBotDiagram.value,
    code: {
      language: 'go',
      filename: 'bot/handler.go',
      content: `func (h *Handler) HandlePaymentWebhook(w http.ResponseWriter, r *http.Request) {
    // Verify signature
    if !h.verifySignature(r) {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }

    var payload PaymentPayload
    if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }

    // Process payment in transaction
    err := h.repo.ExecTx(r.Context(), func(q *db.Queries) error {
        // Update payment status
        if err := q.UpdatePaymentStatus(ctx, payload.ID, "completed"); err != nil {
            return err
        }
        
        // Activate subscription
        return q.CreateSubscription(ctx, db.CreateSubscriptionParams{
            UserID: payload.UserID,
            PlanID: payload.PlanID,
            ExpiresAt: time.Now().Add(30 * 24 * time.Hour),
        })
    })

    if err != nil {
        h.logger.Error("Payment processing failed", "error", err)
        http.Error(w, "Internal error", http.StatusInternalServerError)
        return
    }
}`
    }
  }
]);

const initMermaid = () => {
  const dark = isDarkMode.value;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: dark ? '#1e293b' : '#e2e8f0',
      primaryTextColor: dark ? '#f8fafc' : '#0f172a',
      primaryBorderColor: '#818cf8',
      lineColor: dark ? '#94a3b8' : '#64748b',
      secondaryColor: dark ? '#0f172a' : '#f1f5f9',
      tertiaryColor: dark ? '#020617' : '#ffffff',
      fontSize: '13px',
      fontFamily: '"Inter", system-ui, sans-serif',
    },
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 20,
    }
  });
};

onMounted(async () => {
  initMermaid();
  await renderDiagram();
});

watch(() => colorMode.value, async () => {
  initMermaid();
  await renderDiagram();
});
</script>

<style scoped>
.mermaid-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.mermaid) {
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(svg) {
  max-width: 100%;
  height: auto !important;
  min-height: 500px;
}

:deep(.nodes text),
:deep(.edgeLabel text),
:deep(.label text) {
  font-size: 12px !important;
  font-weight: 500 !important;
  fill: var(--color-text) !important;
  font-family: "Inter", system-ui, sans-serif !important;
}

:deep(.edgeLabel) {
  background-color: var(--color-bg-secondary) !important;
  color: var(--color-text) !important;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
