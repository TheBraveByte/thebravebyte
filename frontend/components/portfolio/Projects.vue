<template>
  <section id="work" class="py-24 bg-bg border-b-[1.5px] border-ink">
    <div class="container mx-auto px-6">
      <!-- Section marker -->
      <div class="flex items-baseline justify-between mb-14 pb-4 border-b-[1.5px] border-ink flex-wrap gap-4">
        <div>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-2">
            § 04 / Case studies
          </p>
          <h2 class="font-serif text-4xl md:text-6xl text-text leading-none">
            Selected<br /><em class="italic text-text-secondary">engineering impact.</em>
          </h2>
        </div>
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] max-w-xs md:text-right">
          {{ filteredProjects.length }} / {{ projects.length }} projects<br />shipping in production
        </p>
      </div>

      <!-- Filter row -->
      <div class="flex flex-nowrap overflow-x-auto hide-scrollbar gap-0 mb-12 border-y-[1.5px] border-ink -mx-6 px-6 sm:mx-0 sm:px-0">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'whitespace-nowrap px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] border-r-[1.5px] border-ink transition-colors',
            selectedCategory === cat
              ? 'bg-ink text-bg'
              : 'bg-bg text-text-muted hover:text-text hover:bg-bg-secondary',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 border-[1.5px] border-ink">
        <article
          v-for="(project, i) in displayedProjects"
          :key="project.id"
          :class="[
            'project-card relative flex flex-col p-8 md:p-10 group transition-colors hover:bg-bg-secondary',
            i % 2 === 0 ? 'md:border-r-[1.5px] border-ink' : '',
            i < displayedProjects.length - (displayedProjects.length % 2 === 0 ? 2 : 1) ? 'border-b-[1.5px] border-ink' : '',
            displayedProjects.length % 2 !== 0 && i === displayedProjects.length - 1 ? '' : '',
          ]"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-6">
            <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
              {{ project.category }}
            </span>
            <span class="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
              <span class="inline-block w-1.5 h-1.5 bg-success"></span>
              Live
            </span>
          </div>

          <h3 class="font-serif text-3xl text-text leading-tight mb-4">
            {{ project.title }}
          </h3>

          <p class="font-sans text-[15px] text-text-secondary leading-relaxed mb-8 flex-grow">
            {{ project.description }}
          </p>

          <!-- Metrics -->
          <div class="grid grid-cols-2 gap-6 pt-6 border-t-[1.5px] border-ink mb-6">
            <div v-for="metric in project.metrics" :key="metric.label">
              <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-1">
                {{ metric.label }}
              </p>
              <p class="font-serif text-xl text-text">
                {{ metric.value }}
              </p>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="font-mono text-[10px] text-text uppercase tracking-[0.18em] px-2 py-1 border-[1.5px] border-ink"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>

      <div v-if="hasMoreProjects" class="flex justify-center mt-10">
        <button @click="loadMore" class="btn-secondary">
          Load more
          <Icon name="lucide:plus" class="w-4 h-4" />
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
    title: "RiXL — Cloud media platform",
    description:
      "Usage-based media hosting. Idempotent billing with Stripe Meters and nightly reconciliation ensures zero revenue leakage across uploads, storage, and bandwidth.",
    tags: ["Go", "Stripe", "Cloudflare"],
    category: "Media",
    metrics: [
      { label: "Throughput", value: "10 GB/s" },
      { label: "Billing", value: "100% accurate" },
    ],
  },
  {
    id: 2,
    title: "EazyFit — Styling marketplace",
    description:
      "Customers ↔ stylists. Domain-isolated services (Chat, Payments, Core) so a 10× chat spike can't take down checkout. AI moderation keeps transactions on-platform.",
    tags: ["Microservices", "WebSocket", "AI"],
    category: "E-Commerce",
    metrics: [
      { label: "Latency", value: "<100 ms" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
  {
    id: 3,
    title: "OmonAI — Fraud detection",
    description:
      "Ten-dimensional ML model (CiferAI) for behavioral pattern analysis. Catches sophisticated fraud rules miss, drops false positives by 60%, all in <50 ms.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    category: "Fintech",
    metrics: [
      { label: "Inference", value: "<50 ms" },
      { label: "False pos", value: "−60%" },
    ],
  },
  {
    id: 4,
    title: "BiTraq — Arbitrage engine",
    description:
      "Real-time crypto arbitrage across 10+ exchanges. Fan-out/fan-in cuts latency to max(T)=300ms. Persistent queues keep the trading API responsive under spike.",
    tags: ["Go", "Redis", "gRPC"],
    category: "Fintech",
    metrics: [
      { label: "Exec time", value: "<200 ms" },
      { label: "Capture", value: "98.5%" },
    ],
  },
  {
    id: 5,
    title: "Unified Campus — Multi-tenant",
    description:
      "Attendance platform for schools and enterprises. Hierarchical tenants (school → faculty → department), Postgres RLS, and immutable audit logs that cleared enterprise security review.",
    tags: ["PostgreSQL", "RLS", "Audit"],
    category: "SaaS",
    metrics: [
      { label: "Tenants", value: "Isolated" },
      { label: "Audit", value: "Immutable" },
    ],
  },
  {
    id: 6,
    title: "Forex Bot — In-Telegram payments",
    description:
      "Subscription and payments embedded in Telegram. 250+ cryptos via NOWPayments plus card rails; admin approval workflow for manual verification where needed.",
    tags: ["Telegram", "Webhooks", "Security"],
    category: "Automation",
    metrics: [
      { label: "Conversion", value: "+183%" },
      { label: "Cryptos", value: "250+" },
    ],
  },
];

const selectedCategory = ref("All");
const visibleCount = ref(6);

const categories = computed(() => ["All", ...new Set(projects.map((p) => p.category))]);

const filteredProjects = computed(() =>
  selectedCategory.value === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory.value)
);

const displayedProjects = computed(() => filteredProjects.value.slice(0, visibleCount.value));
const hasMoreProjects = computed(() => visibleCount.value < filteredProjects.value.length);

const loadMore = () => {
  visibleCount.value += 2;
};

const animateProjects = () => {
  nextTick(() => {
    ScrollTrigger.refresh();
    gsap.fromTo(
      ".project-card",
      { y: 20, opacity: 0 },
      {
        scrollTrigger: { trigger: "#work", start: "top 85%" },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  });
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  animateProjects();
});

watch([selectedCategory, visibleCount], () => {
  gsap.set(".project-card", { y: 20, opacity: 0 });
  animateProjects();
});
</script>
