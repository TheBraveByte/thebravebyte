<template>
  <section id="projects" class="py-32 bg-bg relative">
    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      
      <!-- Section Header -->
      <div class="mb-20">
        <h3 class="font-mono text-xs text-accent tracking-widest mb-4 flex items-center gap-2">
            <span class="w-8 h-px bg-accent"></span>
            CASE STUDIES
        </h3>
        <h2 class="text-4xl md:text-5xl font-bold text-text mb-6">
            Engineering Impact
        </h2>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2 mb-12">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
          'px-4 py-2 text-sm rounded-full transition-all duration-300 border',
          selectedCategory === cat
            ? 'bg-text text-bg border-text font-medium'
            : 'bg-transparent border-transparent text-text-secondary hover:border-border hover:text-text'
        ]">
          {{ cat }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in displayedProjects" :key="project.id"
          class="project-card opacity-0 translate-y-8 group relative bg-bg-secondary/50 border border-border/50 rounded-2xl overflow-hidden hover:border-accent/30 hover:bg-bg-secondary transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5">
          
          <div class="p-8 h-full flex flex-col">
            <!-- Header -->
            <div class="flex justify-between items-start mb-6">
               <div class="p-2 rounded-lg bg-bg border border-border/50 group-hover:border-accent/20 transition-colors">
                  <Icon name="lucide:folder-git-2" class="w-6 h-6 text-text-secondary group-hover:text-accent transition-colors" />
               </div>
               <div class="px-3 py-1 rounded-full bg-success/10 border border-success/20">
                 <span class="text-[10px] font-bold text-success uppercase tracking-wider">Operational</span>
               </div>
            </div>

            <h3 class="text-xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300">
              {{ project.title }}
            </h3>

            <p class="text-sm text-text-secondary leading-relaxed mb-6 font-light flex-grow">
              {{ project.description }}
            </p>

            <!-- Metrics -->
            <div class="grid grid-cols-2 gap-4 py-4 border-t border-border/30 mb-6">
              <div v-for="metric in project.metrics" :key="metric.label">
                <div class="text-[10px] text-text-muted uppercase tracking-wider mb-1">{{ metric.label }}</div>
                <div class="text-sm font-medium text-text">{{ metric.value }}</div>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-for="tag in project.tags" :key="tag"
                class="text-[10px] px-2 py-1 rounded bg-bg border border-border text-text-secondary">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="flex justify-center mt-16" v-if="hasMoreProjects">
        <button @click="loadMore"
          class="px-8 py-3 rounded-full border border-border text-text hover:bg-bg-secondary transition-colors text-sm font-medium">
          Load More Cases
        </button>
      </div>

    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  {
    id: 1,
    title: "RiXL — Cloud Media",
    description: "Usage-based media hosting platform. Traditional seat-based pricing fails here—users pay for storage, bandwidth, and transcoding they actually use. Idempotent billing with Stripe Meters ensuring zero revenue leakage.",
    impact: "100% billing accuracy with Cloudflare analytics integration",
    tags: ["Go", "Stripe", "Cloudflare"],
    category: "Media & Streaming",
    metrics: [
      { label: "Throughput", value: "10GB/s" },
      { label: "Billing", value: "100% Accurate" },
    ],
  },
  {
    id: 2,
    title: "EazyFit — Marketplace",
    description: "Connecting customers with stylists. Isolated domains (Chat, Payments, Core) ensure a 10x chat spike doesn't affect payment success. AI monitoring prevents off-platform transactions.",
    impact: "99.99% uptime during peak traffic",
    tags: ["microservices", "WebSocket", "AI"],
    category: "E-Commerce",
    metrics: [
      { label: "Latency", value: "<100ms" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
    {
    id: 3,
    title: "OmonAI — Fraud Detection",
    description: "Deployed 10-dimensional ML model (CiferAI) for behavioral pattern analysis. Catches sophisticated fraud that rules miss while reducing false positives by 60%.",
    impact: "Estimated $30K/month fraud prevented",
    tags: ["Python", "TensorFlow", "FastAPI"],
    category: "Fintech",
    metrics: [
      { label: "Inference", value: "<50ms" },
      { label: "False Pos", value: "-60%" },
    ],
  },
  {
    id: 4,
    title: "BiTraq — Arbitrage Engine",
    description: "Real-time crypto arbitrage. Fan-Out/Fan-In pattern reduces latency to max(T)=300ms. Background job queues ensure trading API stays responsive during alert processing spikes.",
    impact: "Captures 98.5% of arbitrage opportunities",
    tags: ["Go", "Redis", "gRPC"],
    category: "Fintech & Blockchain",
    metrics: [
      { label: "Exec Time", value: "<200ms" },
      { label: "Capture", value: "98.5%" },
    ],
  },
  {
    id: 5,
    title: "Unified Campus",
    description: "Multi-tenant attendance architecture with strict data isolation (School → Faculty → Department). Immutable audit logs for every state change passed enterprise security audits.",
    impact: "Complete data isolation for 50+ tenants",
    tags: ["PostgreSQL", "RLS", "Audit Logs"],
    category: "Enterprise & SaaS",
    metrics: [
      { label: "Tenants", value: "Isolated" },
      { label: "Audit", value: "Immutable" },
    ],
  },
  {
    id: 6,
    title: "Forex Bot Automation",
    description: "Embedded subscription flow inside Telegram. Supporting 250+ cryptocurrencies plus cards maximized addressable market. Admin approval workflow ensures payment verification.",
    impact: "Checkout completion increased from 30% to 85%",
    tags: ["Telegram API", "Webhooks", "Security"],
    category: "Fintech & Automation",
    metrics: [
      { label: "Conversion", value: "+183%" },
      { label: "Cryptos", value: "250+" },
    ],
  }
];

const selectedCategory = ref('All Projects');
const visibleCount = ref(6); // Show more by default

const categories = computed(() => {
  return ['All Projects', ...new Set(projects.map(p => p.category))];
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

// Animation Logic
const animateProjects = () => {
    nextTick(() => {
        ScrollTrigger.refresh(); // Ensure positions are recalculated
        gsap.to('.project-card', {
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 80%'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            overwrite: 'auto' // Prevent conflict with category filtering
        });
    });
};

onMounted(() => {
    animateProjects();
});

watch([selectedCategory, visibleCount], () => {
    // Re-animate when filter changes
    gsap.set('.project-card', { y: 20, opacity: 0 });
    animateProjects();
});
</script>