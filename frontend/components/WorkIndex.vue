<template>
  <div>
    <div class="grid grid-cols-[3.5rem_1fr_auto] items-end gap-x-4 border-b border-border pb-3 sm:grid-cols-[4rem_1fr_auto]">
      <span class="label">Date</span>
      <span class="label">Project</span>
      <span class="label tabular-nums">{{ String(items.length).padStart(2, '0') }}</span>
    </div>
    <ol>
      <li v-for="(item, i) in items" :key="item.slug" class="border-b border-border">
        <NuxtLink
          :to="`/work/${item.slug}`"
          class="group grid grid-cols-[3.5rem_1fr_auto] gap-x-4 py-6 sm:grid-cols-[4rem_1fr_auto]"
        >
          <span class="pt-px font-mono text-[13px] tabular-nums text-text-muted">
            {{ i === 0 || items[i - 1].year !== item.year ? item.year : '·' }}
          </span>
          <span class="min-w-0">
            <span class="font-mono text-[14px] font-medium text-text">{{ item.name }}</span>
            <span v-if="item.selected" class="ml-2 align-[1px] font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Selected</span>
            <span class="mt-2 block max-w-[62ch] font-mono text-[13px] leading-relaxed text-text-secondary">{{ item.summary }}</span>
            <span class="mt-2 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
              {{ [...item.tags, item.timeline].filter(Boolean).join(' · ') }}
            </span>
          </span>
          <span class="pt-px font-mono text-[13px] text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-text" aria-hidden="true">→</span>
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { WorkItem } from '~/data/work'
defineProps<{ items: WorkItem[] }>()
</script>
