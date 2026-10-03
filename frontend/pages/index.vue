<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset">
      <h1 class="text-[18px] font-semibold text-text">Yusuf Akinleye</h1>
      <div class="mt-5 space-y-4 text-text-secondary">
        <p>
          <span class="text-text">Software engineer.</span> I build backend systems in Go for
          payments, ledgers and job queues, and I design them for the moment things stop going to plan.
        </p>
        <p>
          I run <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="quiet-link">FoldLabs</a>,
          and I've been the largest backend contributor at Rixl and built most of Eazyfit's API.
        </p>
      </div>
    </div>

    <section class="rail mt-14" aria-labelledby="selected">
      <h2 id="selected" class="rail-label">Selected work</h2>
      <div>
        <ul class="space-y-7">
          <li v-for="w in featured" :key="w.slug">
            <NuxtLink :to="`/work/${w.slug}`" class="group block">
              <span class="flex items-baseline justify-between gap-4">
                <span class="quiet-link font-semibold text-text">{{ w.name }}</span>
                <span class="shrink-0 font-mono text-[12px] tabular-nums text-text-muted">{{ w.years.split(' ')[0] }}</span>
              </span>
              <span class="mt-1 block text-[17px] leading-snug text-text-secondary">{{ w.description }}</span>
              <span class="mt-1.5 block font-mono text-[12px] text-text-muted">{{ w.role }} · {{ w.context }}<template v-if="w.duration"> · {{ w.duration }}</template></span>
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink to="/work" class="mt-5 inline-block font-mono text-[13px] text-text-muted hover:text-text">All {{ work.length }} systems →</NuxtLink>
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
      </p>
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
