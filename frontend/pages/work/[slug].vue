<template>
  <article v-if="item" class="pt-16 md:pt-24">
    <div class="page">
      <h1 class="text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[52px]">{{ item.name }}</h1>
      <p class="mt-4 text-[15px] text-text-muted">{{ item.context }} · {{ item.role }} · {{ item.years }}</p>
      <p class="mt-6 text-[21px] leading-snug text-text md:text-[22px]">{{ item.summary }}</p>
      <p class="mt-4 text-text-secondary">{{ item.about }}</p>
      <p v-if="item.links.length" class="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <a v-for="l in item.links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="quiet-link">{{ l.label }}</a>
      </p>
    </div>

    <div v-if="item.media || item.diagram || item.simulation" class="mx-auto mt-12 max-w-[880px] px-5 md:px-8">
      <div v-if="item.simulation" class="mx-auto max-w-[680px]"><PayoutSim /></div>
      <div v-else-if="item.diagram" class="media flex aspect-[16/10] items-center justify-center p-6 md:p-12"><PipelineDiagram /></div>
      <div v-else-if="item.media" class="media aspect-[16/10]">
        <Media v-bind="item.media" sizes="(min-width: 900px) 880px, 100vw" eager />
      </div>
    </div>

    <div class="page">
      <h2 class="mt-16 text-[15px] font-medium text-text-muted">What could go wrong, and what I built for it</h2>
      <ol class="mt-6">
        <WhenThen v-for="r in item.risks" :key="r.when" :risk="r" />
      </ol>

      <p class="mt-8 text-[15px] text-text-muted">Built with {{ item.stack }}.</p>
      <p v-if="item.note" class="mt-3 text-text-secondary">
        The decision behind it is written up in
        <NuxtLink :to="`/writing/${item.note}`" class="quiet-link">{{ noteTitle }}</NuxtLink>.
      </p>

      <nav class="mt-16 flex justify-between gap-6 text-[15px]" aria-label="More work">
        <NuxtLink to="/work" class="text-text-muted hover:text-text">All systems</NuxtLink>
        <NuxtLink :to="`/work/${next.slug}`" class="text-right text-text-muted hover:text-text">Next: <span class="text-text">{{ next.name }}</span></NuxtLink>
      </nav>
    </div>
  </article>
</template>

<script setup lang="ts">
import { work, findWork } from '~/data/work'
import { findNote } from '~/utils/notes'

const route = useRoute()
const item = findWork(String(route.params.slug))
if (!item) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })

const next = work[(work.findIndex(w => w.slug === item.slug) + 1) % work.length]
const noteTitle = item.note ? findNote(item.note)?.title : ''

useSeoMeta({
  title: `${item.name} | Yusuf Akinleye`,
  description: item.summary,
  ogTitle: item.name,
  ogDescription: item.summary,
})
</script>
