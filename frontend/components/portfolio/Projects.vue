<template>
  <section id="projects" class="py-24 bg-bg border-b border-border">
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div
        class="section-header mb-16 border-b-2 border-accent/30 pb-6 origin-left"
      >
        <h3 class="font-sans-label text-accent mb-2">CASE STUDIES</h3>
        <h2 class="text-4xl md:text-5xl font-semibold text-text tracking-tight">
          Engineering <span class="text-accent">Impact</span>
        </h2>
      </div>

      <!-- Category Filter -->
      <div
        class="flex flex-nowrap overflow-x-auto hide-scrollbar gap-4 md:gap-8 mb-12 border-b border-border pb-4 -mx-6 px-6 sm:mx-0 sm:px-0"
      >
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'whitespace-nowrap pb-4 text-xs md:text-sm font-sans transition-all duration-300 relative -mb-[17px]',
            selectedCategory === cat
              ? 'text-text font-semibold border-b-2 border-accent'
              : 'text-text-secondary hover:text-text border-b-2 border-transparent',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <div
          v-for="project in displayedProjects"
          :key="project.id"
          class="project-card bg-bg border border-border p-8 rounded-2xl flex flex-col group hover:border-accent hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(56,189,248,0.05)] transition-all duration-500"
        >
          <!-- Header -->
          <div
            class="flex justify-between items-start mb-6 border-b border-border pb-4"
          >
            <div
              class="flex items-center gap-2 p-2 bg-bg-secondary rounded-lg text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors"
            >
              <Icon name="lucide:folder-git-2" class="w-5 h-5" />
            </div>
            <div
              class="px-3 py-1 bg-bg-secondary border border-border rounded-full flex items-center gap-2"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
              ></span>
              <span
                class="font-sans text-[10px] font-semibold text-text uppercase tracking-wider"
                >Operational</span
              >
            </div>
          </div>

          <h3
            class="text-xl font-semibold text-text mb-4 group-hover:text-accent transition-colors"
          >
            {{ project.title }}
          </h3>

          <p
            class="text-base text-text-secondary leading-relaxed mb-6 flex-grow"
          >
            {{ project.description }}
          </p>

          <!-- Metrics -->
          <div
            class="grid grid-cols-2 gap-4 py-4 border-t border-border mb-6 group-hover:border-accent/30 transition-colors"
          >
            <div v-for="metric in project.metrics" :key="metric.label">
              <div
                class="font-sans text-[10px] text-text-muted uppercase tracking-wider mb-1"
              >
                {{ metric.label }}
              </div>
              <div class="font-sans text-sm font-medium text-text">
                {{ metric.value }}
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-auto">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="font-sans text-[10px] px-3 py-1 border border-border text-text-secondary uppercase rounded-full group-hover:border-accent/30 transition-colors"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="flex justify-center mt-16" v-if="hasMoreProjects">
        <button
          @click="loadMore"
          class="px-8 py-3 border border-border rounded-full text-text font-sans text-sm font-medium hover:bg-bg-secondary hover:border-text transition-all duration-300"
        >
          Load More Cases
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: 1,
    title: "RiXL — Cloud Media",
    description:
      "Usage-based media hosting platform. Traditional seat-based pricing fails here—users pay for storage, bandwidth, and transcoding they actually use. Idempotent billing with Stripe Meters ensuring zero revenue leakage.",
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
    description:
      "Connecting customers with stylists. Isolated domains (Chat, Payments, Core) ensure a 10x chat spike doesn't affect payment success. AI monitoring prevents off-platform transactions.",
    impact: "99.99% uptime during peak traffic",
    tags: ["Microservices", "WebSocket", "AI"],
    category: "E-Commerce",
    metrics: [
      { label: "Latency", value: "<100ms" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
  {
    id: 3,
    title: "OmonAI — Fraud Detection",
    description:
      "Deployed 10-dimensional ML model (CiferAI) for behavioral pattern analysis. Catches sophisticated fraud that rules miss while reducing false positives by 60%.",
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
    description:
      "Real-time crypto arbitrage. Fan-Out/Fan-In pattern reduces latency to max(T)=300ms. Background job queues ensure trading API stays responsive during alert processing spikes.",
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
    description:
      "Multi-tenant attendance architecture with strict data isolation. Immutable audit logs for every state change passed enterprise security audits.",
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
    description:
      "Embedded subscription flow inside Telegram. Supporting 250+ cryptocurrencies plus cards maximized addressable market. Admin approval workflow ensures payment verification.",
    impact: "Checkout completion increased from 30% to 85%",
    tags: ["Telegram API", "Webhooks", "Security"],
    category: "Fintech & Automation",
    metrics: [
      { label: "Conversion", value: "+183%" },
      { label: "Cryptos", value: "250+" },
    ],
  },
];

const selectedCategory = ref("All Projects");
const visibleCount = ref(6);

const categories = computed(() => {
  return ["All Projects", ...new Set(projects.map((p) => p.category))];
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === "All Projects") {
    return projects;
  }
  return projects.filter((p) => p.category === selectedCategory.value);
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

const animateProjects = () => {
  nextTick(() => {
    ScrollTrigger.refresh();
    gsap.fromTo(
      ".project-card",
      { y: 40, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        overwrite: "auto",
      },
    );
  });
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    "#projects .section-header",
    { y: 50, opacity: 0, scale: 0.95 },
    {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 85%",
        end: "top 30%",
        scrub: 1,
      },
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "none",
    },
  );

  animateProjects();
});

watch([selectedCategory, visibleCount], () => {
  gsap.set(".project-card", { y: 30, opacity: 0, scale: 0.95 });
  animateProjects();
});
</script>
