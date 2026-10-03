<template>
  <article v-if="item" class="page pt-14 md:pt-20">
    <div class="offset">
      <p v-if="item.status" class="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{{ item.status }}</p>
      <h1 class="mt-1 text-[28px] font-semibold tracking-[-0.035em] md:text-[32px]">{{ item.name }}</h1>
      <p class="mt-4 text-[17px] leading-snug text-text">{{ item.what }}</p>
      <p class="mt-3 text-text-secondary">{{ item.myRole }}</p>
      <p v-if="item.links.length" class="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] text-text-secondary">
        <OutLink v-for="l in item.links" :key="l.href" v-bind="l" class="hover:text-text" />
      </p>
    </div>

    <dl class="mt-10">
      <div v-for="row in facts" :key="row.k" class="rail py-1">
        <dt class="rail-label">{{ row.k }}</dt>
        <dd class="text-text">{{ row.v }}</dd>
      </div>
    </dl>

    <section v-if="(item.owned ?? item.contribution)?.length" class="rail mt-10" aria-labelledby="did">
      <h2 id="did" class="rail-label">{{ item.owned ? 'What I owned' : 'What I did' }}</h2>
      <ul class="space-y-2 text-text-secondary">
        <li v-for="c in (item.owned ?? item.contribution)" :key="c" class="grid grid-cols-[1rem_1fr]"><span class="text-text-muted" aria-hidden="true">–</span><span>{{ c }}</span></li>
      </ul>
    </section>

    <section v-if="item.ownership" class="rail mt-10" aria-labelledby="owned">
      <h2 id="owned" class="rail-label">Owned end to end</h2>
      <div>
        <p class="font-semibold text-text">{{ item.ownership.feature }}</p>
        <ol class="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[12px] text-text-secondary">
          <li v-for="(step, i) in item.ownership.chain" :key="step" class="flex items-center gap-2">
            <span class="rounded border border-border px-2 py-0.5">{{ step }}</span>
            <span v-if="i < item.ownership.chain.length - 1" class="text-accent" aria-hidden="true">→</span>
          </li>
        </ol>
        <p class="mt-3 text-[16px] text-text-secondary">{{ item.ownership.evidence }}</p>
      </div>
    </section>

    <section v-if="item.impact" class="rail mt-8" aria-labelledby="impact">
      <h2 id="impact" class="rail-label">Impact</h2>
      <p class="text-text">{{ item.impact }}</p>
    </section>

    <div v-if="item.media || item.diagram" class="offset mt-12">
      <div v-if="item.diagram" class="media flex aspect-[16/10] items-center justify-center p-6 md:p-10"><PipelineDiagram /></div>
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
      <NuxtLink to="/work" class="inline-flex items-center gap-1.5 hover:text-text"><Icon name="lucide:arrow-left" class="h-3.5 w-3.5" aria-hidden="true" />All work</NuxtLink>
      <NuxtLink :to="`/work/${next.slug}`" class="inline-flex items-center gap-1.5 text-right hover:text-text">{{ next.name }}<Icon name="lucide:arrow-right" class="h-3.5 w-3.5" aria-hidden="true" /></NuxtLink>
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
  description: item.what,
  ogTitle: item.name,
  ogDescription: item.what,
})
</script>
