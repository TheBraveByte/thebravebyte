<template>
  <section id="process" class="py-24 bg-bg border-b-[1.5px] border-ink relative">
    <div class="container mx-auto px-6">
      <!-- Section marker -->
      <div class="flex items-baseline justify-between mb-14 pb-4 border-b-[1.5px] border-ink flex-wrap gap-4">
        <div>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-2">
            § 03 / Method
          </p>
          <h2 class="font-serif text-4xl md:text-6xl text-text leading-none">
            From chaos<br /><em class="italic text-text-secondary">to clarity,</em> three moves.
          </h2>
        </div>
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] max-w-xs md:text-right">
          Every decision begins<br />with &quot;who is this for?&quot;
        </p>
      </div>

      <div class="grid md:grid-cols-3 border-[1.5px] border-ink divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-ink">
        <article
          v-for="(step, i) in steps"
          :key="step.title"
          class="relative p-8 md:p-10 flex flex-col gap-6 bg-bg hover:bg-bg-secondary transition-colors"
        >
          <div class="flex items-start justify-between">
            <span class="font-serif text-6xl leading-none text-text-muted">
              {{ (i + 1).toString().padStart(2, '0') }}
            </span>
            <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
              Step {{ i + 1 }}
            </span>
          </div>

          <h3 class="font-serif text-2xl text-text leading-snug">
            {{ step.title }}
          </h3>

          <p class="font-sans text-sm text-text-secondary leading-relaxed flex-1">
            {{ step.description }}
          </p>

          <div class="pt-4 border-t-[1.5px] border-ink">
            <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
              {{ step.tag }}
            </p>
          </div>
        </article>
      </div>

      <div class="mt-12 flex justify-center">
        <NuxtLink to="/process" class="btn-secondary">
          Read the full blueprints
          <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const steps = [
  {
    title: 'Business first, always.',
    description:
      'Every architectural decision starts with the users and the unit economics. From EazyFit (stylists + customers) to OmonAI (compliance officers) — systems that solve real business problems, not technical puzzles.',
    tag: 'Research · interviews · metrics',
  },
  {
    title: 'Trade-offs, named out loud.',
    description:
      'Eventual consistency vs. immediate. Multi-tenant vs. isolated. Synchronous vs. queued. I document what was chosen and why — so the next engineer (or future me) understands the reasoning.',
    tag: 'ADRs · RFCs · diagrams',
  },
  {
    title: 'Impact, in numbers.',
    description:
      '60% fewer false positives in fraud detection. 98.5% arbitrage capture. 183% checkout conversion. Every system ships with metrics that prove its value or expose its weakness.',
    tag: 'Observability · evidence',
  },
];
</script>
