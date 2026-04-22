<template>
  <div class="min-h-screen bg-bg pt-28 md:pt-32 pb-20">
    <div class="container mx-auto px-6 max-w-4xl">
      <!-- Header -->
      <header class="mb-16 pb-6 border-b-[1.5px] border-ink">
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-3">
          § Archive / Writing
        </p>
        <h1 class="font-serif text-5xl md:text-7xl text-text leading-[0.95] mb-6">
          Notes on <em class="italic text-text-secondary">backend</em><br />engineering.
        </h1>
        <p class="font-sans text-[15px] text-text-secondary leading-relaxed max-w-xl">
          Field notes on distributed systems, Go concurrency, database
          internals, and the trade-offs behind production software. Long
          pieces live on Hashnode; this page mirrors them.
        </p>
      </header>

      <!-- Filters -->
      <nav class="mb-12 border-y-[1.5px] border-ink">
        <div class="flex gap-0 overflow-x-auto hide-scrollbar">
          <button
            v-for="(cat, i) in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'whitespace-nowrap px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors',
              i < categories.length - 1 ? 'border-r-[1.5px] border-ink' : '',
              selectedCategory === cat
                ? 'bg-ink text-bg'
                : 'bg-bg text-text-muted hover:text-text hover:bg-bg-secondary',
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </nav>

      <div v-if="loading" class="py-12 font-mono text-xs text-text-muted uppercase tracking-[0.22em]">
        Loading archive…
      </div>

      <ul v-else class="border-t-[1.5px] border-ink divide-y-[1.5px] divide-ink">
        <template
          v-for="(article, index) in filteredArticles"
          :key="article?._id || article?.slug || `idx-${index}`"
        >
          <li>
            <NuxtLink
              v-if="!article?.isExternal"
              :to="`/article/${article.slug}`"
              class="article-row group flex flex-col md:flex-row md:items-baseline md:gap-6 py-6 hover:bg-bg-secondary transition-colors px-3 -mx-3"
            >
              <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] md:w-36 shrink-0 mb-2 md:mb-0">
                {{ formatDate(article.createdAt) }}
              </span>
              <div class="flex-1">
                <h2 class="font-serif text-2xl text-text leading-snug mb-2 group-hover:italic transition-all">
                  {{ article.title }}
                </h2>
                <p class="font-sans text-sm text-text-secondary leading-relaxed line-clamp-2 max-w-2xl">
                  {{ article.excerpt }}
                </p>
              </div>
              <span class="hidden md:inline font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] ml-4 shrink-0">
                {{ article.readTime || '5 min' }} →
              </span>
            </NuxtLink>

            <a
              v-else-if="article?.isExternal"
              :href="article.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="article-row group flex flex-col md:flex-row md:items-baseline md:gap-6 py-6 hover:bg-bg-secondary transition-colors px-3 -mx-3"
            >
              <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] md:w-36 shrink-0 mb-2 md:mb-0">
                {{ article.date || formatDate(article.createdAt) }}
              </span>
              <div class="flex-1">
                <h2 class="font-serif text-2xl text-text leading-snug mb-2 group-hover:italic transition-all flex items-baseline gap-2 flex-wrap">
                  <span>{{ article.title }}</span>
                  <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-text-muted" />
                </h2>
                <p class="font-sans text-sm text-text-secondary leading-relaxed line-clamp-2 max-w-2xl">
                  {{ article.excerpt }}
                </p>
              </div>
              <span class="hidden md:inline font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] ml-4 shrink-0">
                {{ article.readTime || '5 min' }}
              </span>
            </a>
          </li>
        </template>

        <li v-if="filteredArticles.length === 0" class="py-16">
          <p class="font-mono text-xs text-text-muted uppercase tracking-[0.22em]">
            — No entries in this category.
          </p>
        </li>
      </ul>

      <div class="mt-16 pt-8 border-t-[1.5px] border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
          More on
          <a
            href="https://ayaacodes.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="text-text underline underline-offset-4 decoration-[1.5px]"
          >
            Hashnode ↗
          </a>
        </p>
        <NuxtLink to="/#contact" class="btn-secondary py-2! px-4! text-xs!">
          Say hello
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const config = useRuntimeConfig();
const { data: apiData, pending: loading } = await useFetch(`${config.public.apiBase}/articles`);

const externalArticles = [
  { title: "Understanding Fan-Out Concurrency Pattern in Go", excerpt: "The Fan-Out Pattern involves a single producer distributing tasks to multiple workers, enabling parallel processing for efficiency and scalability.", date: "Mar 7, 2025", slug: "fan-out-concurrency-pattern", readTime: "7 min", category: "Concurrency", externalUrl: "https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go", isExternal: true },
  { title: "Concurrency Patterns in Go: Wait for Results", excerpt: "Learn about the Wait for Results pattern using sync.WaitGroup with real-world exam invigilation examples.", date: "Feb 13, 2025", slug: "wait-for-results-pattern", readTime: "4 min", category: "Concurrency", externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-wait-for-results", isExternal: true },
  { title: "Concurrency Patterns in Go: A Practical Guide", excerpt: "Explore how Go makes concurrency possible, elegant and efficient. Learn about goroutines, channels, and synchronization primitives.", date: "Jan 30, 2025", slug: "concurrency-patterns-practical-guide", readTime: "5 min", category: "Concurrency", externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide", isExternal: true },
  { title: "Creating a Scalable API with Go, Gin, and MongoDB II", excerpt: "Setting handlers for user requests, creating routes for API endpoints, and establishing a secure dashboard endpoint.", date: "Mar 28, 2023", slug: "scalable-api-go-gin-mongodb-2", readTime: "18 min", category: "Backend", externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-ii", isExternal: true },
  { title: "Merging Maps in Go: A Step-by-Step Guide", excerpt: "Learn the basics of data type declaration and appropriate usage of maps using generics features for added flexibility.", date: "Feb 8, 2023", slug: "merging-maps-go", readTime: "6 min", category: "Go Fundamentals", externalUrl: "https://ayaacodes.hashnode.dev/merging-maps-in-go-a-step-by-step-guide", isExternal: true },
  { title: "Creating a Scalable API with Go, Gin, and MongoDB Atlas", excerpt: "Set up a project with the Gin framework, create a structured model, and integrate MongoDB Atlas.", date: "Feb 8, 2023", slug: "scalable-api-go-gin-mongodb", readTime: "15 min", category: "Backend", externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-atlas", isExternal: true },
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
  return new Date(date)
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .toUpperCase();
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
