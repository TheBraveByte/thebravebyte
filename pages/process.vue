<template>
  <div class="pt-24 pb-16 bg-tertiary dark:bg-tertiary-dark min-h-screen">
    <div class="container mx-auto px-6">
      <!-- Back to section link -->
      <div class="max-w-6xl mx-auto mb-6">
        <NuxtLink to="/#process" aria-label="Back to process section"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white transition-colors text-sm font-light">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          <span>Back to Process Section</span>
        </NuxtLink>
      </div>
      <!-- Header -->
      <div class="max-w-4xl mx-auto mb-12 text-center">
        <h3
          class="text-sm uppercase tracking-widest text-secondary dark:text-secondary-dark mb-3 font-light flex items-center justify-center gap-3">
          <span class="w-2 h-2 bg-secondary dark:bg-secondary-dark rounded-full shadow-[0_0_10px_currentColor]"></span>
          Engineering Process
        </h3>
        <h1 class="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
          System <span class="text-secondary dark:text-secondary-dark">Architecture</span>
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Systems that are secure by design, concurrent by default, and scalable by necessity.
        </p>
      </div>

      <!-- Tab Navigation -->
      <div class="max-w-7xl mx-auto mb-12">
        <!-- Desktop Tabs -->
        <div class="hidden md:flex flex-wrap justify-center gap-3 mb-8">
          <button
            v-for="(section, index) in sections"
            :key="index"
            @click="activeTab = index"
            :class="[
              'px-5 py-3 rounded-lg text-sm font-light transition-all duration-300 border',
              activeTab === index
                ? 'bg-secondary dark:bg-secondary-dark text-white border-secondary dark:border-secondary-dark shadow-[0_0_15px_rgba(129,140,248,0.4)]'
                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'
            ]"
          >
            {{ section.title }}
          </button>
        </div>

        <!-- Mobile Dropdown -->
        <div class="md:hidden mb-8">
          <select
            v-model="activeTab"
            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-light focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-secondary-dark"
          >
            <option v-for="(section, index) in sections" :key="index" :value="index">
              {{ section.title }}
            </option>
          </select>
        </div>

        <!-- Tab Content -->
        <transition name="fade" mode="out-in">
          <div :key="activeTab" class="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 shadow-lg">
            
            <div class="grid lg:grid-cols-2 gap-12">
              
              <!-- Left Column: Description & Features (Content First) -->
              <div class="order-1 flex flex-col justify-center">
                <div class="mb-8">
                  <div class="flex items-start justify-between mb-4">
                    <h2 class="text-3xl md:text-4xl font-light text-gray-900 dark:text-white">
                      {{ sections[activeTab]?.title }}
                    </h2>
                    <span class="text-xs px-3 py-1 bg-secondary/10 dark:bg-secondary-dark/10 text-secondary dark:text-secondary-dark rounded-full font-light whitespace-nowrap">
                      {{ activeTab + 1 }} / {{ sections.length }}
                    </span>
                  </div>

                  <!-- Achievement Badge (for Eazyfit) -->
                  <div
                    v-if="sections[activeTab].title === 'Production Systems'"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 dark:bg-secondary-dark/20 border border-secondary/30 dark:border-secondary-dark/40 rounded-lg mb-6 w-full md:w-auto">
                    <Icon name="lucide:trophy" class="w-5 h-5 text-secondary dark:text-secondary-dark flex-shrink-0" />
                    <span class="text-sm font-light text-gray-900 dark:text-white">$5,000 Pre-Seed Funding • Ilorin Innovation Challenge Winner</span>
                  </div>

                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                    {{ sections[activeTab]?.description }}
                  </p>

                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon name="lucide:sparkles" class="w-5 h-5 text-secondary dark:text-secondary-dark" />
                    Key Capabilities
                  </h3>

                  <!-- Features Grid -->
                  <div v-if="sections[activeTab]?.features" class="grid gap-6 mb-6">
                    <div v-for="(feature, idx) in sections[activeTab]?.features" :key="idx" class="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                      <h4 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Icon :name="feature.icon || 'lucide:check-circle'" class="w-5 h-5 text-secondary dark:text-secondary-dark" />
                        {{ feature.title }}
                      </h4>
                      <ul class="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                        <li v-for="(item, i) in feature.items" :key="i" class="flex items-start gap-2">
                          <span class="w-1.5 h-1.5 bg-secondary dark:bg-secondary-dark rounded-full mt-2 flex-shrink-0"></span>
                          <span v-html="item"></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                 <!-- Navigation Arrows -->
                <div class="flex justify-between pt-6 border-t border-gray-200 dark:border-white/10 mt-auto">
                  <button
                    @click="previousTab"
                    :disabled="activeTab === 0"
                    :class="[
                      'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-light transition-all',
                      activeTab === 0
                        ? 'opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-600'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                    ]"
                  >
                    <Icon name="lucide:chevron-left" class="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    @click="nextTab"
                    :disabled="activeTab === sections.length - 1"
                    :class="[
                      'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-light transition-all',
                      activeTab === sections.length - 1
                        ? 'opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-600'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                    ]"
                  >
                    Next
                    <Icon name="lucide:chevron-right" class="w-4 h-4" />
                  </button>
                </div>

              </div>
              
              <!-- Right Column: Diagram & Code -->
              <div class="order-2 flex flex-col">
                <!-- Toggle Controls -->
                <div class="mb-4 flex justify-between items-center" v-if="sections[activeTab]?.code">
                  <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Implementation Details</h3>
                  <div class="inline-flex rounded-lg border border-gray-200 dark:border-white/10 p-1 bg-gray-50 dark:bg-white/5">
                    <button
                      @click="showCode = false"
                      :class="[
                        'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                        !showCode
                          ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      ]"
                    >
                      Architecture
                    </button>
                    <button
                      @click="showCode = true"
                      :class="[
                        'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                        showCode
                          ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      ]"
                    >
                      Code
                    </button>
                  </div>
                </div>

                <!-- Interactive Diagram View -->
                <div v-show="!showCode" 
                     class="mermaid-container relative flex-grow bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden flex items-center justify-center min-h-[600px] cursor-move"
                     @mousedown="startPan"
                     @mousemove="doPan"
                     @mouseup="endPan"
                     @mouseleave="endPan"
                >
                  <!-- Transformable Content -->
                  <div class="mermaid-content w-full h-full flex items-center justify-center transition-transform duration-75 ease-linear"
                       :style="{ transform: `translate(${panX}px, ${panY}px) scale(${scale})` }">
                      <div class="mermaid w-full h-full flex items-center justify-center select-none pointer-events-none" v-html="currentSvg"></div>
                  </div>

                  <!-- Zoom Controls -->
                  <div class="absolute bottom-4 right-4 flex gap-2 z-10">
                    <button @click.stop="zoomIn" class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors" title="Zoom In">
                      <Icon name="lucide:plus" class="w-5 h-5" />
                    </button>
                    <button @click.stop="zoomOut" class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors" title="Zoom Out">
                      <Icon name="lucide:minus" class="w-5 h-5" />
                    </button>
                    <button @click.stop="resetZoom" class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors" title="Reset View">
                      <Icon name="lucide:rotate-ccw" class="w-5 h-5" />
                    </button>
                  </div>
                  
                  <!-- Hint -->
                  <div class="absolute top-4 left-4 pointer-events-none opacity-50">
                    <span class="px-2 py-1 bg-black/20 text-white text-xs rounded-md backdrop-blur-sm">Drag to pan • Scroll to zoom</span>
                  </div>
                </div>

                <!-- Code View -->
                <div v-if="showCode && sections[activeTab]?.code" class="relative group flex-grow h-full min-h-[600px]">
                  <div class="absolute -top-3 right-4 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md font-mono border border-gray-700 z-10">
                    {{ sections[activeTab]?.code?.filename }}
                  </div>
                  <pre class="h-full bg-[#0B1120] text-gray-300 p-6 rounded-xl border border-gray-700 overflow-x-auto text-sm font-mono leading-relaxed"><code>{{ sections[activeTab]?.code?.content }}</code></pre>
                </div>
              </div>

            </div>

          </div>
        </transition>
      </div>

      <!-- CTA -->
      <div class="mt-20 text-center pb-20">
        <h3 class="text-2xl font-light text-gray-900 dark:text-white mb-6">Ready to build something robust?</h3>
        <NuxtLink to="/#contact"
          class="inline-flex items-center gap-2 px-8 py-4 bg-primary dark:bg-white text-white dark:text-black rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 font-light">
          <span>Let's Discuss Your System</span>
          <Icon name="lucide:arrow-right" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Floating action back button: always visible -->
  <NuxtLink
    to="/#process"
    aria-label="Back to Process section"
    title="Back to Process section"
    class="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-secondary dark:text-secondary-dark shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-secondary-dark"
  >
    <Icon name="lucide:arrow-left" class="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
    <span class="sr-only">Back to Process section</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import mermaid from 'mermaid';

// --- State Definitions (Must be first) ---
const activeTab = ref(0);
const showCode = ref(false);
const currentSvg = ref('');
const scale = ref(1);
const panX = ref(0);
const panY = ref(0);
const isDragging = ref(false);
const startPanX = ref(0);
const startPanY = ref(0);

// --- Functions ---
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

// --- Watchers ---
// Reset zoom on tab change
watch(activeTab, async () => {
  showCode.value = false;
  resetZoom();
  await nextTick();
  await renderDiagram();
});

// --- Diagrams Data ---
const eazyfitDiagram = `graph TB
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
    
    style Client fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style LB fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
    style API fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style Auth fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
    style Core fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
    style Chat fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
    style Media fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
    style Notifs fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
    style Cache fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
    style DB fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#f8fafc
    style Paystack fill:#0f172a,stroke:#22c55e,stroke-width:2px,color:#f8fafc
    style Cloudinary fill:#0f172a,stroke:#22c55e,stroke-width:2px,color:#f8fafc
    style Gmail fill:#0f172a,stroke:#22c55e,stroke-width:2px,color:#f8fafc
    style Expo fill:#0f172a,stroke:#22c55e,stroke-width:2px,color:#f8fafc`;

const billingDiagram = `graph TB
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
style Handler fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style Service fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style StripeClient fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style Jobs fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
style Stripe fill:#0f172a,stroke:#6366f1,stroke-width:2px,color:#f8fafc
style Aggregator fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style DB fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#f8fafc`;

const jobProcessingDiagram = `graph TB
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
style Queue fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
style JobService fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style Manager fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style W1 fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style W2 fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style W3 fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc`;

const systemDiagram = `graph TB
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
style API fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style AutoTrade fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style ArbEngine fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
style Workers fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style Exchanges fill:#0f172a,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style DB fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#f8fafc`;

const concurrencyDiagram = `graph TB
Job[Job Queue] -->|Distribute| Dispatcher[Dispatcher]
Dispatcher -->|Spawn| W1[Worker 1]
Dispatcher -->|Spawn| W2[Worker 2]
Dispatcher -->|Spawn| W3[Worker 3]
W1 -->|Result| Aggregator[Aggregator]
W2 -->|Result| Aggregator
W3 -->|Result| Aggregator
Aggregator -->|Finalize| Response[Response]
style Job fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
style Dispatcher fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style W1 fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style W2 fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style W3 fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style Aggregator fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style Response fill:#0f172a,stroke:#22d3ee,stroke-width:2px,color:#f8fafc`;

const architectureDiagram = `graph TB
Client[Client App] -->|HTTP/JSON| API[API Gateway]
subgraph Backend["Backend Service"]
API -->|Validate| Handler[Handler Layer]
Handler -->|Business Logic| Service[Service Layer]
Service -->|Data Access| Repo[Repository Layer]
end
Repo -->|Query| DB[(PostgreSQL)]
Repo -->|Cache| Redis[(Redis)]
style Client fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style API fill:#0f172a,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style Handler fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style Service fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style Repo fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style DB fill:#0f172a,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style Redis fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
style Backend fill:#020617,stroke:#334155,stroke-width:2px,color:#f8fafc,stroke-dasharray: 5 5`;

const telegramBotDiagram = `graph TB
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

style Bot fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style Commands fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
style SubFlow fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
style CryptoHandler fill:#1e293b,stroke:#22c55e,stroke-width:2px,color:#f8fafc
style CardHandler fill:#1e293b,stroke:#22c55e,stroke-width:2px,color:#f8fafc
style Admin fill:#1e293b,stroke:#f43f5e,stroke-width:2px,color:#f8fafc
style WebhookServer fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
style UserDB fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#f8fafc
style SubDB fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#f8fafc
style PaymentDB fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#f8fafc
style NOWPayments fill:#0f172a,stroke:#22c55e,stroke-width:2px,color:#f8fafc
style Stripe fill:#0f172a,stroke:#6366f1,stroke-width:2px,color:#f8fafc
style CoinGecko fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
style Signals fill:#0f172a,stroke:#f97316,stroke-width:2px,color:#f8fafc`;

const sections = ref([
 {
    title: 'Distributed Job Processing',
    description: 'Reliable background processing is crucial for scalability. I design robust job queues that handle asynchronous tasks like alerts, wallet syncing, and notifications. This ensures the main API remains responsive while heavy lifting happens in the background.',
    features: [
      {
        title: 'Reliability Features',
        icon: 'lucide:check-circle',
        items: ['Guaranteed delivery semantics', 'Worker pool management', 'Dead letter queues', 'Graceful retries']
      }
    ],
    diagram: jobProcessingDiagram,
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
    description: 'For high-throughput systems, I implement the Fan-Out/Fan-In pattern. Jobs are distributed across a pool of workers, processed in parallel, and then aggregated. This maximizes CPU utilization and reduces response times.',
    features: [
      {
        title: 'Performance Features',
        icon: 'lucide:zap',
        items: ['Non-blocking I/O operations', 'Graceful shutdown & error handling', 'Worker pool auto-scaling', 'Context-based cancellation']
      }
    ],
    diagram: concurrencyDiagram
  },
  {
    title: 'AI Fraud Detection',
    description: 'A high-precision fraud detection microservice powered by the CiferAI model. This system processes transaction features in real-time, utilizing a TensorFlow/Keras model to score probability and trigger automated blocking or review workflows. It features a 10-dimensional feature vector analysis including behavioral patterns and balance anomalies.',
    features: [
      {
        title: 'ML Pipeline',
        icon: 'lucide:brain-circuit',
        items: ['<strong>Model:</strong> CiferAI/cifer-fraud-detection-k1-a (Hugging Face)', '<strong>Stack:</strong> Python, FastAPI, TensorFlow, Scikit-learn', '<strong>Performance:</strong> < 50ms inference latency']
      },
      {
        title: 'Key Capabilities',
        icon: 'lucide:shield-alert',
        items: ['Real-time transaction scoring', 'Prometheus metrics export', 'Automated decision engine (Block/Review/Allow)', 'Balance mismatch detection']
      }
    ],
    diagram: `graph TB
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
    
    style API fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style Preprocess fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
    style Scaler fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#f8fafc
    style Model fill:#1e293b,stroke:#22d3ee,stroke-width:2px,color:#f8fafc
    style Decision fill:#1e293b,stroke:#22c55e,stroke-width:2px,color:#f8fafc`,
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
    description: 'As Co-Founder & Lead Engineer of Eazyfit, I architected a microservices-inspired backend that secured funding within 2 months of launch. This production system handles real-time communication, secure payments, AI-powered chat, and multi-channel notifications - showcasing enterprise-grade architecture in a startup environment.',
    features: [
      {
        title: 'Technical Stack',
        icon: 'lucide:check-circle',
        items: ['<strong>Backend:</strong> Go (Chi Router), MongoDB', '<strong>Infrastructure:</strong> Docker Swarm, Traefik', '<strong>Caching:</strong> Custom in-memory with TTL']
      },
      {
        title: 'Key Features',
        icon: 'lucide:zap',
        items: ['WebSocket-based real-time chat', 'Paystack payment integration', 'Multi-channel notifications (Expo, Gmail)', 'OAuth (Google, Apple), RBAC']
      }
    ],
    diagram: eazyfitDiagram
  },
  {
    title: 'Billing & Subscriptions',
    description: 'Monetization requires precision. I implement secure, PCI-compliant billing flows using Stripe. This includes handling webhooks for asynchronous events (like renewals or failed payments), reconciling state via background jobs, and ensuring your database is always in sync with the payment processor.',
    features: [
      {
        title: 'Core Capabilities',
        icon: 'lucide:check-circle',
        items: ['Idempotent webhook handling', 'Automated reconciliation', 'Usage-based billing with Stripe meters', 'Subscription lifecycle management']
      }
    ],
    diagram: billingDiagram
  },
  {
    title: 'System Workflow',
    description: 'A holistic view of a typical AutoTrading system I architect, demonstrating the flow from user configuration to market execution and analytics.',
    diagram: systemDiagram
  },
  {
    title: 'Package Architecture',
    description: 'I structure applications using a Package-Oriented Design. This avoids circular dependencies and ensures that each component (Handler, Service, Repository) has a clear responsibility. This modularity allows for easy testing and future microservices extraction.',
    features: [
      {
        title: 'Design Principles',
        icon: 'lucide:check-circle',
        items: ['Clear separation of concerns', 'Dependency Injection for testability', 'Single Responsibility Principle', 'Interface-first design']
      }
    ],
    diagram: architectureDiagram
  },
  {
    title: 'Telegram Bot',
    description: 'A comprehensive Telegram bot system for subscription-based forex signals. This architecture demonstrates multi-gateway payment processing (crypto and card), webhook integration, admin verification workflows, and role-based access control - all orchestrated through a conversational bot interface.',
    features: [
      {
        title: 'Technical Stack',
        icon: 'lucide:check-circle',
        items: ['<strong>Backend:</strong> Go, Telegram Bot API, SQLC', '<strong>Database:</strong> PostgreSQL (Supabase)', '<strong>Payments:</strong> NOWPayments, Stripe/Paystack']
      },
      {
        title: 'Key Features',
        icon: 'lucide:zap',
        items: ['Multi-currency crypto payments (BTC, USDT)', 'Admin approval workflow', 'Secure webhook signature verification', 'Session-based conversation state']
      }
    ],
    diagram: telegramBotDiagram,
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

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#1e293b',
      primaryTextColor: '#f8fafc',
      primaryBorderColor: '#818cf8',
      lineColor: '#94a3b8',
      secondaryColor: '#0f172a',
      tertiaryColor: '#020617',
      fontSize: '16px',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
    },
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 20,
    }
  });
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
  font-size: 16px !important;
  font-weight: 300 !important;
  fill: #f8fafc !important;
  font-family: "Space Grotesk", sans-serif !important;
}

:deep(.edgeLabel) {
  background-color: #0f172a !important;
  color: #f8fafc !important;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #1e293b;
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
