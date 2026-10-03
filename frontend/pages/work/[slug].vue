<template>
  <div v-if="item" class="pt-12 md:pt-16">
    <div class="mx-auto max-w-[736px] px-4 md:px-8">
      <NuxtLink to="/work" class="text-link">← Project index</NuxtLink>

      <div class="mt-10 flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <span class="label">Record <span class="ml-4">{{ item.tags.join(' · ') }}</span></span>
        <span class="label tabular-nums">{{ item.year }}</span>
      </div>
      <h1 class="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-5xl">{{ item.name }}</h1>
      <p class="mt-5 max-w-[60ch] text-text-secondary">{{ item.summary }}</p>
    </div>

    <!-- Lead media: a real screenshot, a drawn diagram, or the payout simulation -->
    <div v-if="item.media?.length || item.diagram || item.simulation" class="mx-auto mt-10 max-w-[880px] px-4 md:px-8">
      <div v-if="item.simulation" class="mx-auto max-w-[736px]">
        <PayoutSim />
      </div>
      <div v-else-if="item.diagram" class="media-frame flex aspect-[16/10] items-center justify-center p-6 md:p-12">
        <PipelineDiagram />
      </div>
      <div v-else-if="item.media" class="media-frame aspect-[16/10]">
        <Media v-bind="item.media[0]" sizes="(min-width: 900px) 880px, 100vw" eager />
      </div>
    </div>

    <div class="mx-auto max-w-[736px] px-4 md:px-8">
      <dl class="mt-12 border-t border-border">
        <div v-for="row in facts" :key="row.k" class="grid grid-cols-[8rem_1fr] gap-4 border-b border-border py-4 sm:grid-cols-[10rem_1fr]">
          <dt class="label pt-0.5">{{ row.k }}</dt>
          <dd class="font-mono text-[13px] text-text">{{ row.v }}</dd>
        </div>
      </dl>

      <section class="mt-14 grid gap-4 border-t border-border pt-6 sm:grid-cols-[10rem_1fr]">
        <h2 class="label">Overview</h2>
        <div>
          <p class="text-[17px] leading-relaxed text-text-secondary">{{ item.overview }}</p>
          <div class="mt-6 grid grid-cols-[6.5rem_1fr] gap-4 border-y border-border py-4">
            <span class="label pt-0.5">Outcome</span>
            <span class="font-mono text-[13px] leading-relaxed text-text">{{ item.outcome }}</span>
          </div>
        </div>
      </section>

      <section class="mt-14 grid gap-4 border-t border-border pt-6 sm:grid-cols-[10rem_1fr]">
        <h2 class="label">Engineering</h2>
        <div>
          <ol>
            <li v-for="(e, i) in item.engineering" :key="e" class="grid grid-cols-[2rem_1fr] gap-2 border-b border-border py-4 first:pt-0">
              <span class="font-mono text-[11px] tabular-nums text-text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="leading-relaxed text-text-secondary">{{ e }}</span>
            </li>
          </ol>
          <div class="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border py-5">
            <span class="label pt-0.5">Hardest problem</span>
            <span class="font-mono text-[13px] leading-relaxed text-text">
              {{ item.hardest }}
              <NuxtLink v-if="item.note" :to="`/writing/${item.note}`" class="mt-3 block w-fit text-link">Read the note ↗</NuxtLink>
            </span>
          </div>
          <div class="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border py-4">
            <span class="label pt-0.5">Stack</span>
            <span class="font-mono text-[13px] text-text">{{ item.stack.join(' · ') }}</span>
          </div>
          <div v-if="item.links.length" class="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border py-4">
            <span class="label pt-0.5">Links</span>
            <span class="flex flex-wrap gap-5">
              <a v-for="l in item.links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="text-link">{{ l.label }} ↗</a>
            </span>
          </div>
        </div>
      </section>

      <NuxtLink
        v-if="next"
        :to="`/work/${next.slug}`"
        class="group mt-16 grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 border-y border-border py-5 sm:grid-cols-[10rem_1fr_auto]"
      >
        <span class="label">Next</span>
        <span class="font-mono text-[14px] font-medium text-text">{{ next.name }}</span>
        <span class="font-mono text-[13px] text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-text" aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { work, findWork } from '~/data/work'

const route = useRoute()
const item = findWork(String(route.params.slug))
if (!item) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })

const idx = work.findIndex(w => w.slug === item.slug)
const next = work[(idx + 1) % work.length]

const facts = [
  { k: 'Context', v: item.context },
  { k: 'Role', v: item.role },
  ...(item.timeline ? [{ k: 'Timeline', v: item.timeline }] : []),
  { k: 'Date', v: item.date },
]

useSeoMeta({
  title: `${item.name} | Yusuf Akinleye`,
  description: item.summary,
  ogTitle: item.name,
  ogDescription: item.summary,
})
</script>
