<template>
  <div class="container-wide pt-12 pb-24 md:pt-20 md:pb-32">
    <header class="max-w-[60ch]">
      <h1 class="text-4xl font-semibold tracking-tight md:text-5xl">Writing</h1>
      <p class="mt-5 text-lg leading-relaxed text-text-secondary">
        Engineering notes on specific decisions, and longer articles on Go and backend systems.
      </p>
    </header>

    <section class="mt-16 grid gap-6 md:grid-cols-12" aria-labelledby="w-notes">
      <h2 id="w-notes" class="text-xl font-semibold tracking-tight md:col-span-4">Engineering notes</h2>
      <ol class="md:col-span-8">
        <li v-for="note in notes" :key="note.slug" class="border-t border-border">
          <NuxtLink :to="`/writing/${note.slug}`" class="group block py-5">
            <span class="block text-lg font-medium leading-snug group-hover:text-accent transition-colors">{{ note.title }}</span>
            <span class="mt-1 block text-sm text-text-muted">{{ note.context }}</span>
          </NuxtLink>
        </li>
      </ol>
    </section>

    <section class="mt-16 grid gap-6 md:grid-cols-12" aria-labelledby="w-articles">
      <h2 id="w-articles" class="text-xl font-semibold tracking-tight md:col-span-4">Articles</h2>
      <div class="md:col-span-8">
        <div v-if="pending" class="space-y-3 py-5" aria-hidden="true">
          <div v-for="n in 3" :key="n" class="h-14 animate-pulse rounded-lg bg-bg-secondary motion-reduce:animate-none" />
        </div>
        <ol v-else>
          <li v-for="a in articles" :key="a.href" class="border-t border-border">
            <component
              :is="a.external ? 'a' : NuxtLink"
              v-bind="a.external ? { href: a.href, target: '_blank', rel: 'noopener noreferrer' } : { to: a.href }"
              class="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6"
            >
              <span>
                <span class="block text-lg font-medium leading-snug group-hover:text-accent transition-colors">
                  {{ a.title }}
                  <Icon v-if="a.external" name="lucide:arrow-up-right" class="ml-0.5 inline h-4 w-4 text-text-muted" />
                </span>
              </span>
              <time class="font-mono text-xs text-text-muted sm:pt-1.5" :datetime="a.iso">{{ a.label }}</time>
            </component>
          </li>
        </ol>
        <p v-if="!pending && fetchFailed" class="border-t border-border py-5 text-sm text-text-muted">
          Articles hosted on this site couldn't be loaded just now. The ones above are on Hashnode.
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
