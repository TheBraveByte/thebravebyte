<template>
  <div class="page pt-14 md:pt-24">
    <div class="offset">
      <p class="font-mono text-[13px] text-text-muted">Yusuf Akinleye</p>
      <h1 class="mt-4 max-w-[16ch] text-[38px] font-semibold leading-[1.05] tracking-[-0.045em] md:text-[56px]">
        Backend Software &amp; Platform Engineer
      </h1>
      <p class="mt-5 text-[18px] text-text-secondary md:text-[20px]">I build reliable systems.</p>
      <p class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px]">
        <NuxtLink to="/work" class="inline-flex items-center gap-1.5 text-text hover:text-accent">
          Work <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" aria-hidden="true" />
        </NuxtLink>
        <a href="https://foldlabs.pro" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-text-muted hover:text-text">
          Building with FoldLabs <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </a>
      </p>
    </div>

    <section class="rail mt-20" aria-labelledby="selected">
      <h2 id="selected" class="rail-label">Selected work</h2>
      <ul class="space-y-9">
        <li v-for="w in publicWork" :key="w.slug">
          <p class="flex flex-wrap items-baseline gap-x-3">
            <NuxtLink :to="`/work/${w.slug}`" class="quiet-link text-[17px] font-semibold text-text">{{ w.name }}</NuxtLink>
            <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{{ w.status }}</span>
          </p>
          <p class="mt-1 text-[15px] text-text">{{ w.what }}</p>
          <p class="mt-1 text-[15px] text-text-secondary">{{ w.myRole }}</p>
          <p class="mt-2 flex flex-wrap gap-x-5 font-mono text-[13px]">
            <NuxtLink :to="`/work/${w.slug}`" class="inline-flex items-center gap-1.5 text-text-muted hover:text-text">View project <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" aria-hidden="true" /></NuxtLink>
            <OutLink v-for="l in w.links.slice(0, 1)" :key="l.href" :href="l.href" :label="l.label === 'Code' ? 'GitHub' : l.label" class="text-text-muted hover:text-text" />
          </p>
        </li>
      </ul>
    </section>

    <section class="rail mt-16" aria-labelledby="experience">
      <h2 id="experience" class="rail-label">Experience</h2>
      <ul class="space-y-9">
        <li v-for="w in experience" :key="w.slug">
          <p class="flex items-baseline justify-between gap-4">
            <span class="flex flex-wrap items-baseline gap-x-3">
              <NuxtLink :to="`/work/${w.slug}`" class="quiet-link text-[17px] font-semibold text-text">{{ w.name }}</NuxtLink>
              <span v-if="w.status" class="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{{ w.status }}</span>
            </span>
            <span class="shrink-0 font-mono text-[12px] tabular-nums text-text-muted">{{ w.years }}</span>
          </p>
          <p class="mt-1 text-[15px] text-text-secondary">{{ w.myRole }}</p>
          <ul v-if="w.owned" class="mt-3 space-y-1 text-[16px] text-text-secondary">
            <li v-for="o in w.owned.slice(0, 4)" :key="o" class="grid grid-cols-[1rem_1fr]"><span class="text-text-muted" aria-hidden="true">–</span><span>{{ o }}</span></li>
          </ul>
          <p v-if="w.status" class="mt-3 flex flex-wrap gap-x-5 font-mono text-[13px]">
            <OutLink v-for="l in w.links" :key="l.href" v-bind="l" class="text-text-muted hover:text-text" />
          </p>
        </li>
      </ul>
      <p class="mt-8 text-[16px] text-text-muted md:col-start-2">
        I've also built private systems for clients: payments, compliance, trading and commerce.
      </p>
    </section>

    <section class="rail mt-16" aria-labelledby="stories">
      <h2 id="stories" class="rail-label">Developer stories</h2>
      <ul class="space-y-4">
        <li v-for="n in notes.slice(0, 3)" :key="n.slug">
          <NuxtLink :to="`/writing/${n.slug}`" class="group block">
            <span class="quiet-link text-text">{{ n.short }}</span>
            <span class="mt-0.5 block text-[16px] text-text-secondary">{{ n.lesson }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="rail mt-16" aria-labelledby="contact">
      <h2 id="contact" class="rail-label">Contact</h2>
      <SocialLinks class="font-mono text-[13px] text-text-secondary" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { work } from '~/data/work'
import { notes } from '~/utils/notes'

const publicWork = work.filter(w => w.kind === 'public' && w.slug !== 'eazyfit')
const experience = ['rixl', 'eazyfit'].map(slug => work.find(w => w.slug === slug)!)

useSeoMeta({
  title: 'Yusuf Akinleye, backend software and platform engineer',
  description: 'Backend software and platform engineer. I build reliable systems.',
  ogTitle: 'Yusuf Akinleye, backend software and platform engineer',
  ogDescription: 'Backend software and platform engineer. I build reliable systems.',
})
</script>
