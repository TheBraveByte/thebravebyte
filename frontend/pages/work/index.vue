<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset">
      <h1 class="text-[28px] font-semibold tracking-[-0.015em] md:text-[32px]">Work</h1>
      <p class="mt-4 text-text-secondary">
        Systems I've built, for myself, for clients and for employers. Most live in private
        repositories, so code and demos are linked only where they're public.
      </p>
    </div>
    <section v-for="g in groups" :key="g.label" class="rail mt-12" :aria-label="g.label">
      <h2 class="rail-label">{{ g.label }}</h2>
      <ul class="space-y-7">
        <li v-for="w in g.items" :key="w.slug">
          <NuxtLink :to="`/work/${w.slug}`" class="group block">
            <span class="flex items-baseline justify-between gap-4">
              <span class="quiet-link text-text">{{ w.name }}</span>
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

const own = (w: { context: string }) => w.context.startsWith('Personal')
const groups = [
  { label: 'For clients and employers', items: work.filter(w => !own(w)) },
  { label: 'My own', items: work.filter(own) },
]

useSeoMeta({
  title: 'Work | Yusuf Akinleye',
  description: 'Backend systems built for the moment things go wrong: payments, ledgers, media pipelines and compliance.',
})
</script>
