<template>
  <div class="pt-16 md:pt-20 pb-16">
    <div class="container">
      <header class="mb-10 text-center">
        <h1 class="text-xl font-semibold text-text mb-2">Writing</h1>
        <p class="text-[15px] text-text-secondary leading-[1.65] max-w-[52ch] mx-auto">
          Notes on backend engineering, Go concurrency, and systems design.
        </p>
      </header>

      <nav class="flex gap-4 mb-8 pb-3 border-b border-border overflow-x-auto hide-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'shrink-0 text-sm transition-colors',
            selectedCategory === cat
              ? 'text-text font-medium'
              : 'text-text-muted hover:text-text',
          ]"
        >
          {{ cat }}
        </button>
      </nav>

      <div v-if="loading" class="py-8 text-sm text-text-muted">Loading…</div>

      <ul v-else class="divide-y divide-border">
        <template
          v-for="(article, index) in filteredArticles"
          :key="article?._id || article?.slug || `idx-${index}`"
        >
          <li>
            <NuxtLink
              v-if="!article?.isExternal"
              :to="`/article/${article.slug}`"
              class="block py-4 group"
            >
              <div class="flex items-baseline justify-between gap-4 mb-1">
                <h2 class="text-[15px] font-medium text-text group-hover:underline underline-offset-3">
                  {{ article.title }}
                </h2>
                <span class="text-xs text-text-muted shrink-0 tabular-nums">
                  {{ formatDate(article.createdAt) }}
                </span>
              </div>
              <p class="text-sm text-text-secondary leading-[1.6] line-clamp-2">
                {{ article.excerpt }}
              </p>
            </NuxtLink>

            <a
              v-else
              :href="article.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block py-4 group"
            >
              <div class="flex items-baseline justify-between gap-4 mb-1">
                <h2 class="text-[15px] font-medium text-text group-hover:underline underline-offset-3 inline-flex items-center gap-1.5">
                  {{ article.title }}
                  <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5 text-text-muted" />
                </h2>
                <span class="text-xs text-text-muted shrink-0 tabular-nums">
                  {{ article.date || formatDate(article.createdAt) }}
                </span>
              </div>
              <p class="text-sm text-text-secondary leading-[1.6] line-clamp-2">
                {{ article.excerpt }}
              </p>
            </a>
          </li>
        </template>

        <li v-if="!loading && filteredArticles.length === 0" class="py-8">
          <p class="text-sm text-text-muted">No articles in this category yet.</p>
        </li>
      </ul>

      <p class="mt-10 pt-6 border-t border-border text-sm text-text-muted">
        More writing on
        <a
          href="https://ayaacodes.hashnode.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text prose-link"
        >
          Hashnode
        </a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const config = useRuntimeConfig();
const { data: apiData, pending: loading } = await useFetch(`${config.public.apiBase}/articles`);

const externalArticles = [
  { title: "Understanding Fan-Out Concurrency Pattern in Go", excerpt: "A single producer distributes tasks to multiple workers for parallel processing. Practical examples included.", date: "Mar 7, 2025", slug: "fan-out-concurrency-pattern", category: "Concurrency", externalUrl: "https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go", isExternal: true },
  { title: "Concurrency Patterns in Go: Wait for Results", excerpt: "The Wait for Results pattern using sync.WaitGroup, with a real-world exam invigilation example.", date: "Feb 13, 2025", slug: "wait-for-results-pattern", category: "Concurrency", externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-wait-for-results", isExternal: true },
  { title: "Concurrency Patterns in Go: A Practical Guide", excerpt: "Goroutines, channels, and synchronization primitives — what they are and when to use them.", date: "Jan 30, 2025", slug: "concurrency-patterns-practical-guide", category: "Concurrency", externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide", isExternal: true },
  { title: "Creating a Scalable API with Go, Gin, and MongoDB II", excerpt: "Handlers, routes, sign-up and sign-in, and a secure dashboard endpoint.", date: "Mar 28, 2023", slug: "scalable-api-go-gin-mongodb-2", category: "Backend", externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-ii", isExternal: true },
  { title: "Merging Maps in Go: A Step-by-Step Guide", excerpt: "Using generics to merge maps cleanly in Go.", date: "Feb 8, 2023", slug: "merging-maps-go", category: "Go Fundamentals", externalUrl: "https://ayaacodes.hashnode.dev/merging-maps-in-go-a-step-by-step-guide", isExternal: true },
  { title: "Creating a Scalable API with Go, Gin, and MongoDB Atlas", excerpt: "Project setup with Gin, structured models, and MongoDB Atlas integration.", date: "Feb 8, 2023", slug: "scalable-api-go-gin-mongodb", category: "Backend", externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-atlas", isExternal: true },
];

const selectedCategory = ref('All');

const allArticles = computed(() => {
  const rawInternal = Array.isArray(apiData.value?.articles) ? apiData.value!.articles : [];
  const internal = rawInternal
    .filter((a: any) => a && a.published)
    .map((a: any) => ({ ...a, isExternal: false, category: 'Engineering' }));
  const combined = [...externalArticles, ...internal].filter(Boolean);
  return combined.sort((a: any, b: any) => {
    const dateA = new Date(a.date || a.createdAt).getTime();
    const dateB = new Date(b.date || b.createdAt).getTime();
    return dateB - dateA;
  });
});

const categories = computed(() => {
  const cats = new Set(['All']);
  allArticles.value.forEach((a: any) => {
    if (a.category) cats.add(a.category);
  });
  return Array.from(cats);
});

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'All') return allArticles.value;
  return allArticles.value.filter((a: any) => a.category === selectedCategory.value);
});

const formatDate = (date: string | Date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
