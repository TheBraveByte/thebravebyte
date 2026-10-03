<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset">
    <h1 class="text-[28px] font-semibold tracking-[-0.015em] md:text-[32px]">Writing</h1>
    <p class="mt-4 text-text-secondary">
      Notes are short write-ups of one engineering decision. Articles are longer pieces on Go
      and backend systems.
    </p>
    </div>

    <section class="rail mt-12" aria-labelledby="w-notes">
      <h2 id="w-notes" class="rail-label">Notes</h2>
      <ul class="space-y-4">
        <li v-for="note in notes" :key="note.slug">
          <NuxtLink :to="`/writing/${note.slug}`" class="group block">
            <span class="quiet-link text-text">{{ note.title }}</span>
            <span class="mt-0.5 block text-[17px] leading-snug text-text-secondary">{{ note.lesson }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="rail mt-12" aria-labelledby="w-articles">
      <h2 id="w-articles" class="rail-label">Articles</h2>
      <div>
      <div v-if="pending" class="space-y-3" aria-hidden="true">
        <div v-for="n in 3" :key="n" class="h-6 w-4/5 animate-pulse rounded bg-bg-secondary motion-reduce:animate-none" />
      </div>
      <ul v-else>
        <li v-for="a in articles" :key="a.href">
          <component
            :is="a.external ? 'a' : NuxtLink"
            v-bind="a.external ? { href: a.href, target: '_blank', rel: 'noopener noreferrer' } : { to: a.href }"
            class="group grid grid-cols-[1fr_auto] gap-4 py-2.5"
          >
            <span class="text-text group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{{ a.title }}<span v-if="a.external" class="text-text-muted"> ↗</span></span>
            <time class="pt-1 font-mono text-[12px] tabular-nums text-text-muted" :datetime="a.iso">{{ a.label }}</time>
          </component>
        </li>
      </ul>
      <p v-if="!pending && fetchFailed" class="mt-2 text-[15px] text-text-muted">
        Articles hosted on this site couldn't be loaded just now.
      </p>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { NuxtLink } from '#components'
import { notes } from '~/utils/notes'

const config = useRuntimeConfig()
const { data, pending, error } = await useFetch<{ articles?: any[] }>(`${config.public.apiBase}/articles`, {
  lazy: true,
  default: () => ({ articles: [] }),
})
const fetchFailed = computed(() => !!error.value)

// Older posts published on Hashnode.
const hashnode = [
  { title: 'Understanding the fan-out concurrency pattern in Go', date: '2025-03-07', href: 'https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go' },
  { title: 'Concurrency patterns in Go: wait for results', date: '2025-02-13', href: 'https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-wait-for-results' },
  { title: 'Concurrency patterns in Go: a practical guide', date: '2025-01-30', href: 'https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide' },
  { title: 'Creating a scalable API with Go, Gin and MongoDB, part 2', date: '2023-03-28', href: 'https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-ii' },
  { title: 'Merging maps in Go', date: '2023-02-08', href: 'https://ayaacodes.hashnode.dev/merging-maps-in-go-a-step-by-step-guide' },
  { title: 'Creating a scalable API with Go, Gin and MongoDB Atlas', date: '2023-02-08', href: 'https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-atlas' },
]

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

const articles = computed(() => {
  const internal = (data.value?.articles ?? [])
    .filter((a: any) => a?.published && a?.slug)
    .map((a: any) => {
      const iso = a.publishedAt || a.createdAt
      return { title: a.title, href: `/writing/${a.slug}`, external: false, iso, label: fmt(iso) }
    })
  const external = hashnode.map(h => ({ title: h.title, href: h.href, external: true, iso: h.date, label: fmt(h.date) }))
  return [...internal, ...external].sort((a, b) => (a.iso < b.iso ? 1 : -1))
})

useSeoMeta({
  title: 'Writing | Yusuf Akinleye',
  description: 'Engineering notes and articles on Go, payments and backend reliability.',
})
</script>
