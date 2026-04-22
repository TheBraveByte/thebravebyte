<template>
  <section id="work" class="py-10">
    <div class="container">
      <div class="flex items-baseline justify-between mb-4">
        <h2 class="text-sm font-medium text-text-muted">Selected work</h2>
        <span class="text-xs text-text-muted">{{ projects.length }} projects</span>
      </div>

      <ul class="divide-y divide-border">
        <li
          v-for="p in projects"
          :key="p.id"
          class="py-5 first:pt-0 last:pb-0 group"
        >
          <div class="flex items-baseline justify-between gap-4 mb-1.5">
            <h3 class="text-[15px] font-medium text-text">
              {{ p.title }}
            </h3>
            <span class="text-xs text-text-muted tabular-nums shrink-0">{{ p.year }}</span>
          </div>
          <p class="text-[14px] text-text-secondary leading-[1.6] mb-2.5">
            {{ p.description }}
          </p>
          <div class="flex items-center gap-2 text-xs text-text-muted">
            <span v-for="(tag, i) in p.tags" :key="tag">
              <span v-if="i > 0" class="mr-2">·</span>{{ tag }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
const projects = [
  {
    id: 1,
    title: "RiXL — Cloud media",
    year: "2024",
    description:
      "Usage-based billing for a video platform. Idempotent Stripe Meter pipeline with nightly reconciliation. Zero revenue leakage.",
    tags: ["Go", "Stripe", "Cloudflare"],
  },
  {
    id: 2,
    title: "EazyFit — Styling marketplace",
    year: "2024",
    description:
      "Domain-isolated services for chat, payments, and core. A 10× chat spike doesn't touch checkout.",
    tags: ["Microservices", "WebSocket", "AI"],
  },
  {
    id: 3,
    title: "OmonAI — Fraud detection",
    year: "2024",
    description:
      "Ten-feature ML model for behavioral fraud scoring. <50 ms inference, 60% drop in false positives.",
    tags: ["Python", "TensorFlow", "FastAPI"],
  },
  {
    id: 4,
    title: "BiTraq — Arbitrage engine",
    year: "2023",
    description:
      "Real-time crypto arbitrage across 10+ exchanges. Fan-out/fan-in workers keep latency at max(T) = 300 ms.",
    tags: ["Go", "Redis", "gRPC"],
  },
  {
    id: 5,
    title: "Unified Campus — Multi-tenant",
    year: "2023",
    description:
      "Attendance platform with hierarchical tenants and immutable audit logs. Cleared enterprise security review.",
    tags: ["PostgreSQL", "RLS", "Audit"],
  },
  {
    id: 6,
    title: "Forex Bot — In-Telegram payments",
    year: "2023",
    description:
      "Subscription + payments embedded in Telegram. 250+ cryptos via NOWPayments, card rails via Stripe.",
    tags: ["Telegram", "Webhooks", "Security"],
  },
];
</script>
