<template>
  <div class="page pt-16 md:pt-24">
    <h1 class="text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[52px]">Yusuf Akinleye</h1>
    <p class="mt-5 text-[21px] leading-snug text-text md:text-[24px]">
      Software engineer. I design backend systems for the moment things stop going to plan.
    </p>
    <p class="mt-4 text-text-secondary">
      Payments, ledgers and job queues, mostly in Go and Postgres. Founder of
      <a href="https://foldlabs.pro" target="_blank" rel="noopener noreferrer" class="quiet-link">FoldLabs</a>.
    </p>

    <ol class="mt-16 md:mt-20" aria-label="Situations I design for">
      <WhenThen v-for="s in situations" :key="s.when" :risk="s" :work="s.work" />
    </ol>

    <p class="mt-10 text-text-secondary">
      I work this way because of a fire alarm.
      <NuxtLink to="/about" class="quiet-link">The short version</NuxtLink>.
    </p>

    <section class="mt-20" aria-labelledby="systems">
      <h2 id="systems" class="text-[15px] font-medium text-text-muted">Systems</h2>
      <ul class="mt-4">
        <li v-for="w in work" :key="w.slug">
          <NuxtLink :to="`/work/${w.slug}`" class="group grid grid-cols-[1fr_auto] gap-4 py-2.5">
            <span>
              <span class="text-text group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{{ w.name }}</span><span class="text-text-muted">{{ '\u00a0 ' + w.summary }}</span>
            </span>
            <span class="pt-1 text-[14px] tabular-nums text-text-muted">{{ w.years.split(' ')[0] }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="mt-16" aria-labelledby="notes">
      <h2 id="notes" class="text-[15px] font-medium text-text-muted">Notes</h2>
      <ul class="mt-4">
        <li v-for="n in notes" :key="n.slug">
          <NuxtLink :to="`/writing/${n.slug}`" class="block py-2.5 text-text hover:underline hover:decoration-1 hover:underline-offset-4">{{ n.title }}</NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { work, situations } from '~/data/work'
import { notes } from '~/utils/notes'

useSeoMeta({
  title: 'Yusuf Akinleye, software engineer',
  description: 'I design backend systems for the moment things stop going to plan: payments, ledgers and job queues in Go.',
  ogTitle: 'Yusuf Akinleye, software engineer',
  ogDescription: 'I design backend systems for the moment things stop going to plan: payments, ledgers and job queues in Go.',
})
</script>
