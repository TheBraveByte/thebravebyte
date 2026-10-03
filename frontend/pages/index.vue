<template>
  <div class="page pt-14 md:pt-20">
    <h1 class="text-[17px] font-medium text-text">Yusuf Akinleye</h1>
    <div class="mt-6 space-y-4 text-text-secondary">
      <p>
        <span class="text-text">Software engineer.</span> I build backend systems in Go for
        payments, ledgers and job queues, and I design them for the moment things stop going to plan.
      </p>
      <p>
        I run <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="quiet-link">FoldLabs</a>,
        and I've led backend development at Rixl and built most of Eazyfit's API.
      </p>
    </div>

    <section class="mt-14" aria-labelledby="selected">
      <h2 id="selected" class="text-[15px] text-text-muted">Selected work</h2>
      <ul class="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <li v-for="w in featured" :key="w.slug">
          <NuxtLink :to="`/work/${w.slug}`" class="group block">
            <span class="quiet-link">{{ w.name }}</span>
            <span class="mt-1 block text-[16px] leading-snug text-text-secondary">{{ w.line }}</span>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink to="/work" class="mt-6 inline-block text-[15px] text-text-muted hover:text-text">All {{ work.length }} systems →</NuxtLink>
    </section>

    <section class="mt-14 grid gap-12 sm:grid-cols-2" aria-label="Writing and contact">
      <div>
        <h2 class="text-[15px] text-text-muted">Writing</h2>
        <ul class="mt-4 space-y-3">
          <li v-for="n in notes.slice(0, 3)" :key="n.slug">
            <NuxtLink :to="`/writing/${n.slug}`" class="quiet-link text-[16px] leading-snug">{{ n.short }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-[15px] text-text-muted">Contact</h2>
        <p class="mt-4 text-[16px] leading-relaxed text-text-secondary">
          <a href="mailto:ayaaakinleye@gmail.com" class="quiet-link">ayaaakinleye@gmail.com</a><br>
          <a href="https://github.com/TheBraveByte" target="_blank" rel="noopener noreferrer" class="quiet-link">GitHub</a> ·
          <a href="https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/" target="_blank" rel="noopener noreferrer" class="quiet-link">LinkedIn</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { work } from '~/data/work'
import { notes } from '~/utils/notes'

const featured = work.filter(w => w.featured)

useSeoMeta({
  title: 'Yusuf Akinleye, software engineer',
  description: 'Backend systems in Go for payments, ledgers and job queues, designed for the moment things stop going to plan.',
  ogTitle: 'Yusuf Akinleye, software engineer',
  ogDescription: 'Backend systems in Go for payments, ledgers and job queues, designed for the moment things stop going to plan.',
})
</script>
