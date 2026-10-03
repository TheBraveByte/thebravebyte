<template>
  <div class="mx-auto max-w-[736px] px-4 pt-16 md:px-8 md:pt-24">
    <p class="label">Writing</p>
    <h1 class="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Notes and articles</h1>
    <p class="mt-5 max-w-[58ch] text-text-secondary">
      Notes are short records of one engineering decision. Articles are longer pieces on Go
      and backend systems.
    </p>

    <section class="mt-14" aria-labelledby="w-notes">
      <div class="grid grid-cols-[1fr_auto] border-b border-border pb-3">
        <h2 id="w-notes" class="label">Notes</h2>
        <span class="label tabular-nums">{{ String(notes.length).padStart(2, '0') }}</span>
      </div>
      <ol>
        <li v-for="note in notes" :key="note.slug" class="border-b border-border">
          <NuxtLink :to="`/writing/${note.slug}`" class="group grid grid-cols-[1fr_auto] gap-4 py-5">
            <span>
              <span class="font-mono text-[14px] font-medium text-text">{{ note.title }}</span>
              <span class="mt-1.5 block font-mono text-[12px] text-text-muted">{{ note.context }}</span>
            </span>
            <span class="font-mono text-[13px] text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-text" aria-hidden="true">→</span>
          </NuxtLink>
        </li>
      </ol>
    </section>

    <section class="mt-14" aria-labelledby="w-articles">
      <div class="grid grid-cols-[4.5rem_1fr_auto] gap-x-4 border-b border-border pb-3">
        <span class="label">Date</span>
        <h2 id="w-articles" class="label">Articles</h2>
        <span class="label tabular-nums">{{ String(articles.length).padStart(2, '0') }}</span>
      </div>
      <div v-if="pending" class="space-y-px py-2" aria-hidden="true">
        <div v-for="n in 3" :key="n" class="h-12 animate-pulse bg-bg-secondary motion-reduce:animate-none" />
      </div>
      <ol v-else>
        <li v-for="a in articles" :key="a.href" class="border-b border-border">
          <component
            :is="a.external ? 'a' : NuxtLink"
            v-bind="a.external ? { href: a.href, target: '_blank', rel: 'noopener noreferrer' } : { to: a.href }"
            class="group grid grid-cols-[4.5rem_1fr_auto] gap-x-4 py-5"
          >
            <time class="font-mono text-[12px] tabular-nums text-text-muted" :datetime="a.iso">{{ a.label }}</time>
            <span class="font-mono text-[14px] text-text">{{ a.title }}</span>
            <span class="font-mono text-[13px] text-text-muted group-hover:text-text" aria-hidden="true">{{ a.external ? '↗' : '→' }}</span>
          </component>
        </li>
      </ol>
      <p v-if="!pending && fetchFailed" class="border-b border-border py-5 font-mono text-[12px] text-text-muted">
        Articles hosted on this site couldn't be loaded just now.
      </p>
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
