<template>
  <section id="work" class="py-10">
    <div class="container">
      <h2 class="text-sm font-semibold text-text mb-2 font-sans-label uppercase tracking-wider">Projects</h2>
      <p class="text-xs text-text-muted mb-6">
        A few systems I've designed and shipped — the stack tells the rest.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          v-for="p in projects"
          :key="p.id"
          class="p-5 hover:bg-bg-secondary/40 hover:border-text-muted hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
        >
          <div>
            <div class="flex items-baseline justify-between gap-4 mb-2">
              <h3 class="text-sm font-semibold text-text">
                <a
                  v-if="p.href"
                  :href="p.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 hover:underline underline-offset-4 decoration-border hover:decoration-text"
                >
                  {{ p.title }}
                  <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <template v-else>{{ p.title }}</template>
              </h3>
              <span class="font-mono text-[10px] text-text-muted tabular-nums shrink-0">{{ p.year }}</span>
            </div>
            <p class="text-xs text-text-secondary leading-[1.6] mb-4 font-serif">
              {{ p.description }}
            </p>
          </div>
          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="font-mono text-[9px] text-text-muted px-1.5 py-0.5 border border-border/80 rounded bg-bg-secondary"
            >
              {{ tag }}
            </span>
          </div>
        </Card>
      </div>

      <div class="mt-8 text-center md:text-left">
        <NuxtLink
          to="/process"
          class="inline-flex items-center gap-1.5 text-xs font-medium text-text hover:text-accent-hover transition-colors group"
        >
          <span>Architecture notes</span>
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Card from "~/components/ui/Card.vue";

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
    year: "2025",
    description:
      "Usage-based billing pipeline on Stripe Meters for a media platform. Idempotent writes and nightly reconciliation against Stripe keep the ledger consistent.",
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
    year: "2025",
    description:
      "Behavioural fraud scoring with a ten-feature model, served behind a FastAPI/TensorFlow microservice that scales independently of the core API.",
    tags: ["Python", "TensorFlow", "FastAPI"],
  },
  {
    id: 5,
    title: "Unified Campus",
    year: "2025",
    description:
      "Multi-tenant attendance platform with hierarchical tenants, PostgreSQL row-level security, and immutable audit logs.",
    tags: ["PostgreSQL", "RLS", "Audit"],
  },
];
</script>
