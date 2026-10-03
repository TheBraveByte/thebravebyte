<template>
  <div>
    <section class="mx-auto max-w-[736px] px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-24">
      <p class="label">Software engineer / Go</p>
      <h1 class="mt-5 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl md:text-[60px]">
        I build backend systems that stay correct when things fail.
      </h1>
      <p class="mt-6 max-w-[58ch] text-text-secondary">
        Payments, ledgers, job queues and APIs, mostly in Go and Postgres. Founder of
        <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="text-text underline decoration-border underline-offset-4 hover:decoration-text">FoldLabs</a>.
      </p>
      <div class="mt-8 flex gap-5">
        <a href="#work" class="text-link">View work ↓</a>
        <a href="mailto:ayaaakinleye@gmail.com" class="text-link">Email ↗</a>
      </div>
    </section>

    <section id="work" class="scroll-mt-20 border-t border-border" aria-label="Project index">
      <div class="mx-auto max-w-[736px] px-4 pt-14 md:px-8">
        <WorkIndex :items="work" />
      </div>
    </section>

    <section class="mx-auto max-w-[736px] px-4 pt-20 md:px-8" aria-labelledby="notes">
      <div class="grid grid-cols-[3.5rem_1fr_auto] items-end gap-x-4 border-b border-border pb-3 sm:grid-cols-[4rem_1fr_auto]">
        <span class="label">Notes</span>
        <h2 id="notes" class="label">What I learned, and how</h2>
        <span class="label tabular-nums">{{ String(notes.length).padStart(2, '0') }}</span>
      </div>
      <ol>
        <li v-for="(note, i) in notes" :key="note.slug" class="border-b border-border">
          <NuxtLink :to="`/writing/${note.slug}`" class="group grid grid-cols-[3.5rem_1fr_auto] gap-x-4 py-6 sm:grid-cols-[4rem_1fr_auto]">
            <span class="pt-0.5 font-mono text-[13px] tabular-nums text-text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>
              <span class="block text-[17px] leading-snug text-text">{{ note.lesson }}</span>
              <span class="mt-2 block font-mono text-[12px] text-text-muted">{{ note.title }}</span>
            </span>
            <span class="pt-0.5 font-mono text-[13px] text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-text" aria-hidden="true">→</span>
          </NuxtLink>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup lang="ts">
import { work } from '~/data/work'
import { notes } from '~/utils/notes'

useSeoMeta({
  title: 'Yusuf Akinleye, software engineer',
  description: 'Backend systems in Go that stay correct when things fail: payments, ledgers, job queues and APIs.',
  ogTitle: 'Yusuf Akinleye, software engineer',
  ogDescription: 'Backend systems in Go that stay correct when things fail: payments, ledgers, job queues and APIs.',
})
</script>
