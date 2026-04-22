<template>
  <section id="work" class="py-10">
    <div class="container">
      <ul class="divide-y divide-border">
        <li
          v-for="p in projects"
          :key="p.id"
          class="py-5 first:pt-0 last:pb-0 group transition-colors"
        >
          <div class="flex items-baseline justify-between gap-4 mb-1.5">
            <h3 class="text-[15px] font-medium text-text">
              <a
                v-if="p.href"
                :href="p.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 hover:underline underline-offset-4 decoration-border hover:decoration-text"
              >
                {{ p.title }}
                <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <template v-else>{{ p.title }}</template>
            </h3>
            <span class="text-xs text-text-muted tabular-nums shrink-0">{{ p.year }}</span>
          </div>
          <p class="text-[14px] text-text-secondary leading-[1.6] mb-2.5 transition-colors group-hover:text-text">
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
interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "RIXL",
    year: "2024",
    description:
      "Usage-based billing pipeline on Stripe Meters for a media optimization platform. Idempotent writes, nightly reconciliation, zero revenue leakage.",
    tags: ["Go", "Stripe", "Cloudflare"],
    href: "https://docs.rixl.com",
  },
  {
    id: 2,
    title: "Eazyfit",
    year: "2024",
    description:
      "Co-founded a styling marketplace connecting customers with verified fashion designers in Nigeria. Escrow payments hold funds until delivery approval; domain-isolated services keep chat spikes away from checkout.",
    tags: ["Microservices", "WebSocket", "Escrow"],
    href: "https://www.eazyfitfashion.com",
  },
  {
    id: 3,
    title: "OmonAI",
    year: "2024",
    description:
      "Ten-feature ML model for behavioral fraud scoring. Sub-50ms inference, 60% drop in false positives.",
    tags: ["Python", "TensorFlow", "FastAPI"],
  },
  {
    id: 4,
    title: "BiTraq",
    year: "2023",
    description:
      "Real-time crypto arbitrage across 10+ exchanges. Fan-out and fan-in workers cap latency at 300ms worst case.",
    tags: ["Go", "Redis", "gRPC"],
  },
  {
    id: 5,
    title: "Unified Campus",
    year: "2023",
    description:
      "Multi-tenant attendance platform with hierarchical tenants and immutable audit logs. Cleared enterprise security review.",
    tags: ["PostgreSQL", "RLS", "Audit"],
  },
  {
    id: 6,
    title: "Forex Bot",
    year: "2023",
    description:
      "Subscription and payments embedded in Telegram. 250+ cryptos via NOWPayments, card rails via Stripe.",
    tags: ["Telegram", "Webhooks", "Security"],
  },
];
</script>
