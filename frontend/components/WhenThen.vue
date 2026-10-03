<template>
  <li class="py-4 first:pt-0">
    <p class="text-[17px] font-semibold leading-snug text-text">
      When {{ risk.when }},
    </p>
    <p class="mt-1 grid grid-cols-[1.25rem_1fr] text-[16px] leading-relaxed text-text-secondary">
      <span class="text-accent" aria-hidden="true">→</span>
      <span>
        {{ risk.then }}
        <NuxtLink
          v-if="work"
          :to="`/work/${work.slug}`"
          class="mt-1.5 block w-fit font-mono text-[12px] text-text-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-text hover:decoration-current"
        >{{ work.name }}</NuxtLink>
      </span>
    </p>
  </li>
</template>

<script setup lang="ts">
import type { Risk, WorkItem } from '~/data/work'
defineProps<{ risk: Risk, work?: WorkItem }>()
</script>
