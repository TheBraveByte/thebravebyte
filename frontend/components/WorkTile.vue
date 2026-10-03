<template>
  <article class="group flex flex-col">
    <div class="media-frame relative aspect-[16/10]">
      <Media
        v-if="item.media"
        :name="item.media.name"
        :alt="item.media.alt"
        :width="item.media.width"
        :height="item.media.height"
        :widths="item.media.widths"
        :sizes="wide ? '(min-width: 1024px) 640px, 100vw' : '(min-width: 1024px) 460px, 100vw'"
      />
      <div v-else-if="item.diagram" class="ambient flex h-full items-center justify-center p-4 sm:p-6">
        <PipelineDiagram />
      </div>
    </div>

    <div class="mt-5 flex items-baseline justify-between gap-4">
      <h3 class="text-xl font-semibold tracking-tight">{{ item.name }}</h3>
      <span class="shrink-0 font-mono text-xs text-text-muted">{{ item.years }}</span>
    </div>
    <p class="mt-1 text-sm text-text-muted">{{ item.role }}</p>
    <p class="mt-3 max-w-[54ch] text-text-secondary">{{ item.summary }}</p>
    <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      <span class="font-mono text-xs text-text-muted">{{ item.stack }}</span>
      <a
        v-for="l in item.links"
        :key="l.href"
        :href="l.href"
        :target="l.href.startsWith('http') ? '_blank' : undefined"
        :rel="l.href.startsWith('http') ? 'noopener noreferrer' : undefined"
        class="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
      >
        {{ l.label }}
        <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { WorkItem } from '~/data/work'
defineProps<{ item: WorkItem, wide?: boolean }>()
</script>
