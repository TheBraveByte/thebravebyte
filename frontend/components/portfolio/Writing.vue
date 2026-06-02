<template>
  <section id="writing" class="py-10">
    <div class="container">
      <p class="text-sm text-text-muted mb-6">
        Notes on Go, concurrency, and systems I've built.
      </p>

      <div v-if="featured">
        <!-- Featured (most recent) -->
        <a
          v-if="featured.isExternal"
          :href="featured.externalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="block pb-6 mb-6 border-b border-border group"
        >
          <div class="flex items-baseline justify-between gap-4 mb-2">
            <h3 class="text-[17px] font-semibold text-text leading-snug inline-flex items-center gap-1.5 group-hover:underline underline-offset-4 decoration-border group-hover:decoration-text">
              {{ featured.title }}
              <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </h3>
            <span class="font-mono text-xs text-text-muted shrink-0 tabular-nums mt-1">
              {{ featured.date || formatDate(featured.createdAt) }}
            </span>
          </div>
          <p class="text-[14px] text-text-secondary leading-[1.65] transition-colors group-hover:text-text">
            {{ featured.excerpt }}
          </p>
        </a>

        <NuxtLink
          v-else
          :to="`/article/${featured.slug}`"
          class="block pb-6 mb-6 border-b border-border group"
        >
          <div class="flex items-baseline justify-between gap-4 mb-2">
            <h3 class="text-[17px] font-semibold text-text leading-snug group-hover:underline underline-offset-4 decoration-border group-hover:decoration-text">
              {{ featured.title }}
            </h3>
            <span class="font-mono text-xs text-text-muted shrink-0 tabular-nums mt-1">
              {{ formatDate(featured.createdAt) }}
            </span>
          </div>
          <p class="text-[14px] text-text-secondary leading-[1.65] transition-colors group-hover:text-text">
            {{ featured.excerpt }}
          </p>
        </NuxtLink>

        <!-- Compact list of the rest -->
        <ul class="divide-y divide-border">
          <li v-for="a in rest" :key="a.slug">
            <a
              v-if="a.isExternal"
              :href="a.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-baseline justify-between gap-4 py-3 group"
            >
              <span class="text-[14px] text-text min-w-0 truncate group-hover:underline underline-offset-3 decoration-border group-hover:decoration-text inline-flex items-center gap-1.5">
                <span class="truncate">{{ a.title }}</span>
                <Icon name="lucide:arrow-up-right" class="w-3 h-3 text-text-muted shrink-0" />
              </span>
              <span class="font-mono text-xs text-text-muted shrink-0 tabular-nums">
                {{ a.date || formatDate(a.createdAt) }}
              </span>
            </a>
            <NuxtLink
              v-else
              :to="`/article/${a.slug}`"
              class="flex items-baseline justify-between gap-4 py-3 group"
            >
              <span class="text-[14px] text-text min-w-0 truncate group-hover:underline underline-offset-3 decoration-border group-hover:decoration-text">
                {{ a.title }}
              </span>
              <span class="font-mono text-xs text-text-muted shrink-0 tabular-nums">
                {{ formatDate(a.createdAt) }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>

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
  { title: "Creating a Scalable API with Go, Gin, and MongoDB II", excerpt: "Handlers, routes, sign-up and sign-in, and a secure dashboard endpoint.", date: "Mar 28, 2023", slug: "scalable-api-go-gin-mongodb-2", externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-ii", isExternal: true },
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
    .slice(0, 4);
});

const featured = computed(() => teasers.value[0]);
const rest = computed(() => teasers.value.slice(1));

const formatDate = (date: string | Date) => {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.underline-offset-3 { text-underline-offset: 3px; }
.underline-offset-4 { text-underline-offset: 4px; }
</style>
