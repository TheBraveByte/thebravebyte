<template>
  <section id="projects" class="py-24 bg-bg relative">
    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      
      <!-- Section Header -->
      <div class="mb-16 flex items-end justify-between border-b border-border pb-6">
        <div>
          <h3 class="font-mono-label text-text-accent mb-2 flex items-center gap-2">
            <span class="w-2 h-2 bg-accent"></span>
            SYSTEM_MODULES
          </h3>
          <h2 class="text-3xl md:text-4xl font-light text-text">
            Active Services
          </h2>
        </div>
        <div class="hidden md:block font-mono text-xs text-text-accent text-right">
          <div>TOTAL_MODULES: {{ projects.length }}</div>
          <div>STATUS: ALL_SYSTEMS_OPERATIONAL</div>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2 mb-12">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
          'px-4 py-2 font-mono text-xs transition-colors duration-200 border',
          selectedCategory === cat
            ? 'bg-text bg-text text-bg text-bg border-text border-text'
            : 'bg-transparent border-border text-text-accent hover:border-accent'
        ]">
          [{{ cat.toUpperCase() }}]
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(project, index) in displayedProjects" :key="project.id"
          class="bg-bg border border-border hover:border-accent transition-colors duration-200 flex flex-col group relative">
          
          <!-- Technical Corner Markers -->
          <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-accent transition-colors duration-200"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-accent transition-colors duration-200"></div>

          <!-- Project Header -->
          <div class="p-6 flex-grow">
            <div class="flex justify-between items-start mb-4">
              <span class="font-mono-label text-accent text-accent">
                [ SERVICE_{{ String(index + 1).padStart(2, '0') }} ]
              </span>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span class="font-mono text-[10px] text-green-500">RUNNING</span>
              </div>
            </div>

            <h3 class="text-lg font-normal text-text mb-3 group-hover:text-accent transition-colors">
              {{ project.title }}
            </h3>

            <p class="text-sm text-text-accent leading-relaxed mb-6 font-light border-l border-border pl-3">
              {{ project.description }}
            </p>

            <!-- Metrics Grid -->
            <div class="bg-bg-secondary border border-border p-3 mb-4">
              <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                <div v-for="metric in project.metrics" :key="metric.label">
                  <div class="font-mono text-[10px] text-text-accent uppercase">{{ metric.label }}</div>
                  <div class="font-mono text-xs text-text">{{ metric.value }}</div>
                </div>
              </div>
            </div>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag"
                class="font-mono text-[10px] px-2 py-1 border border-border text-text-secondary">
                {{ tag }}
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- Load More / Show Less Buttons -->
      <div class="flex justify-center gap-4 mt-12">
        <button v-if="hasMoreProjects" @click="loadMore"
          class="px-6 py-3 border border-border text-text hover:border-accent transition-colors duration-200 font-mono text-xs">
          [ LOAD_MORE_DATA ]
        </button>
        <button v-if="visibleCount > 3" @click="showLess"
          class="px-6 py-3 text-text-accent hover:text-text dark:hover:text-text transition-colors font-mono text-xs">
          [ COLLAPSE_VIEW ]
        </button>
      </div>

      <!-- CTA -->
      <div class="text-center mt-20 border-t border-border pt-12">
        <p class="font-mono text-xs text-text-accent mb-4">:: SYSTEM_READY_FOR_DEPLOYMENT</p>
        <NuxtLink to="#contact"
          class="inline-flex items-center gap-3 px-8 py-4 bg-text bg-text text-bg text-bg hover:bg-accent hover:bg-accent hover:text-white transition-colors duration-200 font-mono text-sm group">
          <span>[ INITIATE_COLLABORATION ]</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';

const projects = [
  {
    id: 1,
    title: "RiXL — Usage-Based Cloud Media Platform",
    description: "Built for content creators who need scalable media hosting. Traditional seat-based pricing fails here—users pay for storage, bandwidth, and transcoding they actually use. Designed idempotent billing with Stripe Meters and nightly reconciliation to ensure zero revenue leakage.",
    impact: "100% billing accuracy with Cloudflare analytics integration for real-time bandwidth tracking",
    tags: ["Usage-Based Billing", "Stripe Meters", "Event-Driven", "Cloudflare CDN"],
    category: "Media & Streaming",
    metrics: [
      { label: "THROUGHPUT", value: "10GB/s" },
      { label: "BILLING", value: "100% ACCURATE" },
    ],
  },
  {
    id: 2,
    title: "EazyFit — Fashion Marketplace Platform",
    description: "Connects customers with professional fashion stylists. The challenge: chat surge during order negotiations was crashing checkout. Isolated domains (Chat, Payments, Core) ensure a 10x chat spike doesn't affect payment success. AI monitoring prevents off-platform transactions.",
    impact: "Won Ilorin Innovation Challenge, secured $5K pre-seed. 99.99% uptime during peak traffic.",
    tags: ["Domain Isolation", "WebSocket", "AI Content Moderation", "Paystack"],
    category: "E-Commerce",
    metrics: [
      { label: "MSG_LATENCY", value: "<100ms" },
      { label: "UPTIME", value: "99.99%" },
    ],
  },
  {
    id: 3,
    title: "OmonAI — Fraud Detection & AML Platform",
    description: "Financial institutions were losing $50K+/month to fraud while rule-based detection blocked 40% of legitimate transactions. Deployed 10-dimensional ML model (CiferAI) for behavioral pattern analysis—catches sophisticated fraud rules miss while reducing false positives by 60%.",
    impact: "60% reduction in false positives, <50ms inference latency, estimated $30K/month fraud prevented",
    tags: ["TensorFlow ML", "Real-Time Scoring", "AML Compliance", "FastAPI"],
    category: "Fintech",
    metrics: [
      { label: "INFERENCE", value: "<50ms" },
      { label: "FALSE_POS", value: "-60%" },
    ],
  },
  {
    id: 4,
    title: "BiTraq — Real-time Crypto Arbitrage Engine",
    description: "Arbitrage windows last 200-500ms—sequential price fetching from 10 exchanges takes 5s, missing every opportunity. Fan-Out/Fan-In pattern reduces latency to max(T)=300ms. Background job queues ensure trading API stays responsive during alert processing spikes.",
    impact: "Captures 98.5% of arbitrage opportunities that slower systems miss entirely",
    tags: ["Fan-Out/Fan-In", "Low-Latency", "Job Queues", "Multi-Exchange"],
    category: "Fintech & Blockchain",
    metrics: [
      { label: "EXEC_TIME", value: "<200ms" },
      { label: "CAPTURE", value: "98.5%" },
    ],
  },
  {
    id: 5,
    title: "Unified Campus — Multi-Tenant Attendance Platform",
    description: "Schools, universities, and companies need attendance tracking with strict data isolation. Built multi-tenant architecture with organization hierarchies (School → Faculty → Department). Immutable audit logs for every state change passed enterprise security audits.",
    impact: "Serves companies, schools, and universities with complete data isolation and full audit trails",
    tags: ["Multi-Tenancy", "Hierarchical RBAC", "Audit Logging", "PostgreSQL RLS"],
    category: "Enterprise & SaaS",
    metrics: [
      { label: "TENANTS", value: "ISOLATED" },
      { label: "AUDIT", value: "IMMUTABLE" },
    ],
  },
  {
    id: 6,
    title: "Forex Signals Telegram Bot",
    description: "Forex traders abandoned 70% of checkouts on external payment pages. Embedded entire subscription flow inside Telegram—users never leave the app. Supporting 250+ cryptocurrencies plus cards maximized addressable market. Admin approval workflow ensures payment verification.",
    impact: "Checkout completion increased from 30% to 85% with in-app payment flow",
    tags: ["Telegram Bot API", "NOWPayments", "Session State", "Webhook Security"],
    category: "Fintech & Automation",
    metrics: [
      { label: "CONVERSION", value: "+183%" },
      { label: "CRYPTOS", value: "250+" },
    ],
  },
  {
    id: 7,
    title: "Enterprise Ride-Hailing Platform",
    description: "Employed a Microservices-based approach to isolate failure domains. If the ride tracking service experiences issues, the core booking and payment modules remain unaffected and operational.",
    impact: "System resilience ensures 99.9% booking availability even during partial outages",
    tags: ["Microservices", "Fault Tolerance", "Orchestration", "System Resilience"],
    category: "Mobility & Logistics",
    metrics: [
      { label: "DAU", value: "2300+" },
      { label: "AVAILABILITY", value: "99.9%" },
    ],
  },
  {
    id: 8,
    title: "Healthcare Complaint Management",
    description: "Designed for regulatory compliance (HIPAA) with end-to-end encryption for patient data. Separation of PII (Personally Identifiable Information) from analytics data ensures privacy by design.",
    impact: "Full HIPAA compliance achieved through architectural decisions, not just policy",
    tags: ["Compliance Engineering", "Data Privacy", "Encryption", "Healthcare"],
    category: "Healthcare & Compliance",
    metrics: [
      { label: "DATA_VOL", value: "500/DAY" },
      { label: "COMPLIANCE", value: "HIPAA" },
    ],
  },
  {
    id: 9,
    title: "AI-Powered IoT Fire Detection",
    description: "Moved inference to the Edge (IoT device) to remove network latency dependencies. This architectural choice ensures fire detection happens in milliseconds, even if the internet connection is down.",
    impact: "Life-saving detection works 100% of the time, even without internet connectivity",
    tags: ["Edge Computing", "IoT", "Computer Vision", "Embedded Systems"],
    category: "AI & IoT",
    metrics: [
      { label: "ACCURACY", value: "86%" },
      { label: "LATENCY", value: "REAL-TIME" },
    ],
  },
];

const selectedCategory = ref('All Projects');
const visibleCount = ref(3);

const categories = computed(() => {
  const cats = ['All Projects', ...new Set(projects.map(p => p.category))];
  return cats;
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All Projects') {
    return projects;
  }
  return projects.filter(p => p.category === selectedCategory.value);
});

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, visibleCount.value);
});

const hasMoreProjects = computed(() => {
  return visibleCount.value < filteredProjects.value.length;
});

const loadMore = () => {
  visibleCount.value += 3;
};

const showLess = () => {
  visibleCount.value = 3;
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

watch(selectedCategory, () => {
  visibleCount.value = 3;
});
</script>