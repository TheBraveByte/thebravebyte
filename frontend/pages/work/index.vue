<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset">
      <h1 class="text-[28px] font-semibold tracking-[-0.015em] md:text-[32px]">Work</h1>
      <p class="mt-4 text-text-secondary">
        Public and live work first, then the companies I've built for. Private client systems are
        listed on the home page by what they are, without links.
      </p>
    </div>
    <section v-for="g in groups" :key="g.label" class="rail mt-12" :aria-label="g.label">
      <h2 class="rail-label">{{ g.label }}</h2>
      <ul class="space-y-7">
        <li v-for="w in g.items" :key="w.slug">
          <NuxtLink :to="`/work/${w.slug}`" class="group block">
            <span class="flex items-baseline justify-between gap-4">
              <span><span class="quiet-link text-text">{{ w.name }}</span><span v-if="w.status" class="ml-3 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{{ w.status }}</span></span>
              <span class="shrink-0 font-mono text-[12px] tabular-nums text-text-muted">{{ w.years }}</span>
            </span>
            <span class="mt-1 block text-[17px] leading-snug text-text-secondary">{{ w.description }}</span>
            <span class="mt-1.5 block font-mono text-[12px] text-text-muted">{{ w.role }}<template v-if="w.duration"> · {{ w.duration }}</template></span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { work } from '~/data/work'

const groups = [
  { label: 'Public work', items: work.filter(w => w.kind === 'public') },
  { label: 'Experience', items: work.filter(w => w.kind === 'experience') },
]

useSeoMeta({
  title: 'Work | Yusuf Akinleye',
  description: 'Backend systems built for the moment things go wrong: payments, ledgers, media pipelines and compliance.',
})
</script>
