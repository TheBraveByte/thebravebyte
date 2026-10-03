<template>
  <li class="py-7 first:pt-0">
    <p class="text-[22px] font-medium leading-snug tracking-[-0.015em] text-text md:text-[26px]">
      When {{ risk.when }},
    </p>
    <p class="mt-2 grid grid-cols-[1.25rem_1fr] text-text-secondary">
      <span class="text-accent" aria-hidden="true">→</span>
      <span>
        {{ risk.then }}
        <NuxtLink
          v-if="work"
          :to="`/work/${work.slug}`"
          class="mt-1.5 block w-fit text-[15px] text-text-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-text hover:decoration-current"
        >{{ work.name }}</NuxtLink>
      </span>
    </p>
  </li>
</template>

<script setup lang="ts">
import type { Risk, WorkItem } from '~/data/work'
defineProps<{ risk: Risk, work?: WorkItem }>()
</script>
