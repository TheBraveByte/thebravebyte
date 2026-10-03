<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset">
      <h1 class="text-[18px] font-semibold text-text">Yusuf Akinleye</h1>
      <div class="mt-5 space-y-4 text-text-secondary">
        <p>
          <span class="text-text">Backend and platform engineer</span> in Lagos, Nigeria. I build
          systems in Go for payments, ledgers and job queues, and design them for the moment things
          stop going to plan.
        </p>
        <p>
          I own backend features end to end, from the first schema to production. I run
          <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="quiet-link">FoldLabs</a>.
        </p>
      </div>
    </div>

    <section class="rail mt-14" aria-labelledby="public">
      <h2 id="public" class="rail-label">Public work</h2>
      <ul class="space-y-7">
        <li v-for="w in publicWork" :key="w.slug">
          <NuxtLink :to="`/work/${w.slug}`" class="group block">
            <span class="flex flex-wrap items-baseline gap-x-3">
              <span class="quiet-link font-semibold text-text">{{ w.name }}</span>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{{ w.status }}</span>
            </span>
            <span class="mt-1 block text-[17px] leading-snug text-text-secondary">{{ w.description }}</span>
            <span class="mt-1.5 block font-mono text-[12px] text-text-muted">{{ w.role }}<template v-if="w.duration"> · {{ w.duration }}</template> · {{ w.years }}</span>
          </NuxtLink>
        </li>
        <li class="text-[16px] text-text-secondary">
          Also public:
          <a href="https://github.com/TheBraveByte/snackbox" target="_blank" rel="noopener noreferrer" class="quiet-link">snackbox</a>,
          a reference payments integration with signed webhooks, idempotency keys and rate limiting.
        </li>
      </ul>
    </section>

    <section class="rail mt-12" aria-labelledby="experience">
      <h2 id="experience" class="rail-label">Experience</h2>
      <ul class="space-y-6">
        <li v-for="r in experience" :key="r.org">
          <component :is="r.slug ? NuxtLink : 'div'" v-bind="r.slug ? { to: `/work/${r.slug}` } : {}" class="group block">
            <span class="flex items-baseline justify-between gap-4">
              <span><span :class="r.slug ? 'quiet-link' : ''" class="font-semibold text-text">{{ r.org }}</span><span class="text-text-secondary">, {{ r.title }}</span></span>
              <span class="shrink-0 font-mono text-[12px] tabular-nums text-text-muted">{{ r.when }}</span>
            </span>
            <span class="mt-1 block text-[17px] leading-snug text-text-secondary">{{ r.text }}</span>
          </component>
        </li>
      </ul>
    </section>

    <section class="rail mt-12" aria-labelledby="client">
      <h2 id="client" class="rail-label">Client work</h2>
      <div>
        <p class="text-[16px] text-text-muted">Private systems built for clients. Not publicly launched, so no links.</p>
        <ul class="mt-3 space-y-1.5">
          <li v-for="c in clientWork" :key="c.what" class="flex items-baseline justify-between gap-4 text-[17px]">
            <span class="text-text-secondary">{{ c.what }}<span class="text-text-muted">, {{ c.role.toLowerCase() }}</span></span>
            <span class="shrink-0 font-mono text-[12px] tabular-nums text-text-muted">{{ c.years.split(' ')[0] }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="rail mt-12" aria-labelledby="writing">
      <h2 id="writing" class="rail-label">Writing</h2>
      <ul class="space-y-2.5">
        <li v-for="n in notes.slice(0, 3)" :key="n.slug">
          <NuxtLink :to="`/writing/${n.slug}`" class="quiet-link">{{ n.short }}</NuxtLink>
        </li>
      </ul>
    </section>

    <section class="rail mt-12" aria-labelledby="contact">
      <h2 id="contact" class="rail-label">Contact</h2>
      <p class="text-text-secondary">
        <a href="mailto:ayaaakinleye@gmail.com" class="quiet-link">ayaaakinleye@gmail.com</a><br>
        <a href="https://github.com/TheBraveByte" target="_blank" rel="noopener noreferrer" class="quiet-link">GitHub</a>
        <span class="text-text-muted"> · </span>
        <a href="https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/" target="_blank" rel="noopener noreferrer" class="quiet-link">LinkedIn</a>
        <span class="text-text-muted"> · Lagos, Nigeria</span>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { work, clientWork } from '~/data/work'
import { notes } from '~/utils/notes'

const publicWork = work.filter(w => w.kind === 'public')

// Employment, newest first. Facts checked against the repositories on 2026-10-03.
const experience = [
  { org: 'FoldLabs', title: 'founder', when: '2026', text: 'A studio that designs and builds products for clients. I lead the engineering.' },
  { org: 'Rixl', title: 'software engineer, backend', when: '2025 to 2026', slug: 'rixl', text: 'Owned billing and client authentication in a video and media platform\'s core API; the largest contributor to its backend.' },
  { org: 'Eazyfit', title: 'principal backend engineer', when: '2025 to 2026', slug: 'eazyfit', text: 'Wrote 90 percent of the main API, including escrow payouts I took from design to deployment.' },
  { org: 'Paymax', title: 'backend engineer', when: '2025 to 2026', slug: 'paymax', text: 'One of the two largest contributors to a multi-domain platform; owned four of its domains.' },
]

useSeoMeta({
  title: 'Yusuf Akinleye, backend and platform engineer',
  description: 'Backend and platform engineer in Lagos, Nigeria. Go systems for payments, ledgers and job queues, owned end to end.',
  ogTitle: 'Yusuf Akinleye, backend and platform engineer',
  ogDescription: 'Backend and platform engineer in Lagos, Nigeria. Go systems for payments, ledgers and job queues, owned end to end.',
})
</script>
