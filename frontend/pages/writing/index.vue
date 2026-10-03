<template>
  <div class="page pt-14 md:pt-20">
    <div class="offset enter">
    <h1 class="text-[28px] font-semibold tracking-[-0.035em] md:text-[32px]">Writing</h1>
    <p class="mt-4 text-text-secondary">
      Notes are short write-ups of one engineering decision. Articles are longer pieces on Go
      and backend systems, published on Hashnode.
    </p>
    </div>

    <section class="rail mt-12" aria-labelledby="w-notes">
      <h2 id="w-notes" class="rail-label" data-reveal>Notes</h2>
      <ul class="space-y-4">
        <li v-for="(note, i) in notes" :key="note.slug" data-reveal :style="{ '--i': i + 1 }">
          <NuxtLink :to="`/writing/${note.slug}`" class="group block">
            <span class="quiet-link text-text">{{ note.title }}</span>
            <span class="mt-0.5 block text-[15px] leading-snug text-text-secondary">{{ note.lesson }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="rail mt-12" aria-labelledby="w-articles">
      <h2 id="w-articles" class="rail-label" data-reveal>Articles</h2>
      <div>
        <ul v-if="articles.length" class="space-y-7">
          <li v-for="(a, i) in articles" :key="a.href" data-reveal :style="{ '--i': Math.min(i, 3) + 1 }">
            <a :href="a.href" target="_blank" rel="noopener" class="group block">
              <time class="font-mono text-[12px] tabular-nums text-text-muted" :datetime="a.date">{{ fmt(a.date) }}</time>
              <span class="mt-1 block text-text group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{{ a.title }}</span>
              <span class="mt-1 block text-[15px] leading-snug text-text-secondary">{{ a.excerpt }}</span>
              <span class="mt-2 inline-flex items-center gap-1.5 font-mono text-[12px] text-text-muted group-hover:text-text">
                <Icon name="simple-icons:hashnode" class="h-3 w-3" aria-hidden="true" />
                Read on Hashnode
                <Icon name="lucide:arrow-up-right" class="arrow-ur h-3 w-3" aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
        <p v-else class="text-[15px] text-text-secondary">
          The article list couldn't be loaded just now. Everything is on
          <a :href="HASHNODE_BLOG" target="_blank" rel="noopener" class="quiet-link text-text">Hashnode</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { notes } from '~/utils/notes'
import { HASHNODE_BLOG, parseFeed, type Article } from '~/utils/hashnode'

// Read on the server; on Vercel the page is regenerated hourly (see routeRules), so a new
// Hashnode post shows up here without a redeploy.
const { data } = await useAsyncData<Article[]>('hashnode', async () => {
  try {
    return parseFeed(await $fetch<string>(`${HASHNODE_BLOG}/rss.xml`, { responseType: 'text' }))
  } catch {
    return []
  }
}, { default: () => [] })
const articles = computed(() => data.value ?? [])

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

useSeoMeta({
  title: 'Writing | Yusuf Akinleye',
  description: 'Engineering notes and articles on Go and backend systems.',
})
</script>
