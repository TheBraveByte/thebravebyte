<template>
  <section id="writing" class="py-10">
    <div class="container">
      <ul class="divide-y divide-border">
        <li v-for="a in teasers" :key="a.slug">
          <NuxtLink
            v-if="!a.isExternal"
            :to="`/article/${a.slug}`"
            class="block py-4 group"
          >
            <div class="flex items-baseline justify-between gap-4 mb-1">
              <h3 class="text-[15px] font-medium text-text group-hover:underline underline-offset-3 decoration-border group-hover:decoration-text">
                {{ a.title }}
              </h3>
              <span class="text-xs text-text-muted shrink-0 tabular-nums">{{ formatDate(a.createdAt || a.date) }}</span>
            </div>
            <p class="text-sm text-text-secondary leading-[1.6] line-clamp-2 transition-colors group-hover:text-text">
              {{ a.excerpt }}
            </p>
          </NuxtLink>

          <a
            v-else
            :href="a.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block py-4 group"
          >
            <div class="flex items-baseline justify-between gap-4 mb-1">
              <h3 class="text-[15px] font-medium text-text inline-flex items-center gap-1.5 group-hover:underline underline-offset-3 decoration-border group-hover:decoration-text">
                {{ a.title }}
                <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </h3>
              <span class="text-xs text-text-muted shrink-0 tabular-nums">{{ a.date || formatDate(a.createdAt) }}</span>
            </div>
            <p class="text-sm text-text-secondary leading-[1.6] line-clamp-2 transition-colors group-hover:text-text">
              {{ a.excerpt }}
            </p>
          </a>
        </li>
      </ul>

      <NuxtLink
        to="/blog"
        class="mt-6 inline-flex items-center gap-1.5 text-sm text-text prose-link group"
      >
        All writing
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { data: apiData } = await useFetch(`${config.public.apiBase}/articles`, { default: () => ({ articles: [] }) });

const externalArticles = [
  { title: "Understanding Fan-Out Concurrency Pattern in Go", excerpt: "A single producer distributes tasks to multiple workers for parallel processing. Practical examples included.", date: "Mar 7, 2025", slug: "fan-out-concurrency-pattern", externalUrl: "https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go", isExternal: true },
  { title: "Concurrency Patterns in Go: Wait for Results", excerpt: "The Wait for Results pattern using sync.WaitGroup, with a real-world exam invigilation example.", date: "Feb 13, 2025", slug: "wait-for-results-pattern", externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-wait-for-results", isExternal: true },
  { title: "Concurrency Patterns in Go: A Practical Guide", excerpt: "Goroutines, channels, and synchronization primitives. What they are and when to use them.", date: "Jan 30, 2025", slug: "concurrency-patterns-practical-guide", externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide", isExternal: true },
];

const teasers = computed(() => {
  const rawInternal = Array.isArray(apiData.value?.articles) ? apiData.value!.articles : [];
  const internal = rawInternal
    .filter((a: any) => a && a.published)
    .map((a: any) => ({ ...a, isExternal: false }));
  const combined = [...externalArticles, ...internal];
  return combined
    .sort((a: any, b: any) => {
      const dA = new Date(a.date || a.createdAt).getTime();
      const dB = new Date(b.date || b.createdAt).getTime();
      return dB - dA;
    })
    .slice(0, 3);
});

const formatDate = (date: string | Date) => {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.underline-offset-3 { text-underline-offset: 3px; }
</style>
