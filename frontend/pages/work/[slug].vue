<template>
  <article v-if="item" class="page pt-14 md:pt-20">
    <div class="offset">
      <h1 class="text-[28px] font-semibold tracking-[-0.015em] md:text-[32px]">{{ item.name }}</h1>
      <p class="mt-4 text-[19px] leading-snug text-text">{{ item.description }}</p>
      <p v-if="item.links.length" class="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        <a v-for="l in item.links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="quiet-link">{{ l.label }} ↗</a>
      </p>
    </div>

    <dl class="mt-10">
      <div v-for="row in facts" :key="row.k" class="rail py-1">
        <dt class="rail-label">{{ row.k }}</dt>
        <dd class="text-text">{{ row.v }}</dd>
      </div>
    </dl>

    <section v-if="item.contribution?.length" class="rail mt-10" aria-labelledby="did">
      <h2 id="did" class="rail-label">What I did</h2>
      <ul class="space-y-2 text-text-secondary">
        <li v-for="c in item.contribution" :key="c" class="grid grid-cols-[1rem_1fr]"><span class="text-text-muted" aria-hidden="true">–</span><span>{{ c }}</span></li>
      </ul>
    </section>

    <section v-if="item.impact" class="rail mt-8" aria-labelledby="impact">
      <h2 id="impact" class="rail-label">Impact</h2>
      <p class="text-text">{{ item.impact }}</p>
    </section>

    <div v-if="item.media || item.diagram || item.simulation" class="offset mt-12">
      <PayoutSim v-if="item.simulation" />
      <div v-else-if="item.diagram" class="media flex aspect-[16/10] items-center justify-center p-6 md:p-10"><PipelineDiagram /></div>
      <div v-else-if="item.media" class="media aspect-[16/10]">
        <Media v-bind="item.media" sizes="(min-width: 840px) 600px, 100vw" />
      </div>
    </div>

    <section class="rail mt-12" aria-labelledby="wrong">
      <h2 id="wrong" class="rail-label">When things go wrong</h2>
      <ol><WhenThen v-for="r in item.risks" :key="r.when" :risk="r" /></ol>
    </section>

    <section class="rail mt-8" aria-labelledby="stack">
      <h2 id="stack" class="rail-label">Built with</h2>
      <p class="text-text-secondary">{{ item.stack }}</p>
    </section>

    <section v-if="item.note" class="rail mt-8" aria-labelledby="note">
      <h2 id="note" class="rail-label">The decision</h2>
      <NuxtLink :to="`/writing/${item.note}`" class="quiet-link">{{ noteTitle }}</NuxtLink>
    </section>

    <nav class="offset mt-14 flex justify-between gap-6 font-mono text-[13px] text-text-muted" aria-label="More work">
      <NuxtLink to="/work" class="hover:text-text">← All systems</NuxtLink>
      <NuxtLink :to="`/work/${next.slug}`" class="text-right hover:text-text">{{ next.name }} →</NuxtLink>
    </nav>
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

const facts = [
  { k: 'Role', v: item.role },
  { k: 'Context', v: item.context },
  ...(item.duration ? [{ k: 'Duration', v: item.duration }] : []),
  { k: 'When', v: item.years },
]

useSeoMeta({
  title: `${item.name} | Yusuf Akinleye`,
  description: item.description,
  ogTitle: item.name,
  ogDescription: item.description,
})
</script>
