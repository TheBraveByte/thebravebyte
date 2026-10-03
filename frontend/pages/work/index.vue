<template>
  <div class="page pt-16 md:pt-24">
    <h1 class="text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[52px]">Work</h1>
    <p class="mt-5 text-text-secondary">
      Systems I've built, for myself, for clients and for employers. Most live in private
      repositories, so code and demos are linked only where they're public.
    </p>
    <ul class="mt-12">
      <li v-for="w in work" :key="w.slug" class="border-t border-border first:border-t-0">
        <NuxtLink :to="`/work/${w.slug}`" class="group block py-6">
          <span class="flex items-baseline justify-between gap-4">
            <span class="text-[22px] font-medium tracking-[-0.015em] text-text group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{{ w.name }}</span>
            <span class="shrink-0 text-[14px] tabular-nums text-text-muted">{{ w.years }}</span>
          </span>
          <span class="mt-1 block text-text-secondary">{{ w.summary }}</span>
          <span class="mt-1 block text-[15px] text-text-muted">{{ w.context }} · {{ w.role }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { work } from '~/data/work'

useSeoMeta({
  title: 'Work | Yusuf Akinleye',
  description: 'Backend systems built for the moment things go wrong: payments, ledgers, media pipelines and compliance.',
})
</script>
