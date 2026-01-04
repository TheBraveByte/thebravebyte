<template>
  <div class="min-h-screen bg-bg pt-24 pb-16">
    <div class="container mx-auto px-6 max-w-4xl">
      
      <!-- Minimal Header -->
      <header class="mb-16">
        <h1 class="text-3xl md:text-4xl font-light text-text mb-4">
          Writing
        </h1>
        <p class="text-text-secondary font-light leading-relaxed max-w-xl">
          Thoughts on backend engineering, distributed systems, Go concurrency patterns, and building production-grade software.
        </p>
      </header>

      <!-- Simple Category Filter -->
      <nav class="mb-12 border-b border-border">
        <div class="flex gap-6 -mb-px overflow-x-auto">
          <button 
            v-for="cat in categories" 
            :key="cat" 
            @click="selectedCategory = cat" 
            :class="[
              'pb-3 text-sm font-light transition-colors whitespace-nowrap',
              selectedCategory === cat
                ? 'text-text border-b-2 border-text'
                : 'text-text-secondary hover:text-text'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="py-12">
        <p class="text-text-secondary font-light">Loading articles...</p>
      </div>

      <!-- Articles List -->
      <div v-else class="space-y-0">
        <!-- Render each article once; branch internally to avoid v-for + v-if on the same node -->
        <template 
          v-for="(article, index) in filteredArticles" 
          :key="article?._id || article?.slug || `idx-${index}`"
        >
          <!-- Internal articles (NuxtLink) -->
          <NuxtLink
            v-if="!article?.isExternal"
            :to="`/article/${article.slug}`"
            class="group block py-6 border-b border-border hover:bg-bg-secondary/50 -mx-4 px-4 transition-colors"
          >
            <article class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h2 class="text-lg md:text-xl font-light text-text transition-colors mb-2 flex items-center gap-2">
                  {{ article.title }}
                </h2>
                <p class="text-text-secondary font-light text-sm leading-relaxed line-clamp-2">
                  {{ article.excerpt }}
                </p>
              </div>

              <!-- Meta -->
              <div class="flex items-center gap-3 text-sm text-text-muted font-light md:text-right md:flex-shrink-0">
                <span>{{ article.date || formatDate(article.createdAt) }}</span>
                <span class="hidden md:inline">·</span>
                <span class="hidden md:inline">{{ article.readTime || '5 min' }}</span>
              </div>
            </article>
          </NuxtLink>

          <!-- External articles (anchor) -->
          <a
            v-else-if="article?.isExternal"
            :href="article.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group block py-6 border-b border-border hover:bg-bg-secondary/50 -mx-4 px-4 transition-colors"
          >
            <article class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h2 class="text-lg md:text-xl font-light text-text transition-colors mb-2 flex items-center gap-2">
                  {{ article.title }}
                  <Icon 
                    name="lucide:external-link" 
                    class="w-4 h-4 text-text-muted flex-shrink-0" 
                  />
                </h2>
                <p class="text-text-secondary font-light text-sm leading-relaxed line-clamp-2">
                  {{ article.excerpt }}
                </p>
              </div>

              <!-- Meta -->
              <div class="flex items-center gap-3 text-sm text-text-muted font-light md:text-right md:flex-shrink-0">
                <span>{{ article.date || formatDate(article.createdAt) }}</span>
                <span class="hidden md:inline">·</span>
                <span class="hidden md:inline">{{ article.readTime || '5 min' }}</span>
              </div>
            </article>
          </a>
        </template>

        <!-- Empty State -->
        <div v-if="filteredArticles.length === 0" class="py-16 text-center">
          <p class="text-text-secondary font-light">No articles found in this category.</p>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="mt-16 pt-8 border-t border-border">
        <p class="text-sm text-text-muted font-light">
          More articles on 
          <a 
            href="https://ayaacodes.hashnode.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-text hover:underline"
          >
            Hashnode ↗
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Fetch internal articles from API
const { data: apiData, pending: loading } = await useFetch('/api/articles');

// External articles (from Hashnode)
const externalArticles = [
  {
    title: "Understanding Fan-Out Concurrency Pattern in Go",
    excerpt: "The Fan-Out Pattern involves a single producer distributing tasks to multiple workers, enabling parallel processing for efficiency and scalability.",
    date: "Mar 7, 2025",
    slug: "fan-out-concurrency-pattern",
    readTime: "7 min",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go",
    isExternal: true
  },
  {
    title: "Concurrency Patterns in Go: Wait for Results",
    excerpt: "Learn about the Wait for Results pattern using sync.WaitGroup with real-world exam invigilation examples.",
    date: "Feb 13, 2025",
    slug: "wait-for-results-pattern",
    readTime: "4 min",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-wait-for-results",
    isExternal: true
  },
  {
    title: "Concurrency Patterns in Go: A Practical Guide",
    excerpt: "Explore how Go makes concurrency possible, elegant and efficient. Learn about goroutines, channels, and synchronization primitives.",
    date: "Jan 30, 2025",
    slug: "concurrency-patterns-practical-guide",
    readTime: "5 min",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide",
    isExternal: true
  },
  {
    title: "Creating a Scalable API with Go, Gin, and MongoDB II",
    excerpt: "Setting handlers for user requests, creating routes for API endpoints, and establishing a secure dashboard endpoint.",
    date: "Mar 28, 2023",
    slug: "scalable-api-go-gin-mongodb-2",
    readTime: "18 min",
    category: "Backend",
    externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-ii",
    isExternal: true
  },
  {
    title: "Merging Maps in Go: A Step-by-Step Guide",
    excerpt: "Learn the basics of data type declaration and appropriate usage of maps using generics features for added flexibility.",
    date: "Feb 8, 2023",
    slug: "merging-maps-go",
    readTime: "6 min",
    category: "Go Fundamentals",
    externalUrl: "https://ayaacodes.hashnode.dev/merging-maps-in-go-a-step-by-step-guide",
    isExternal: true
  },
  {
    title: "Creating a Scalable API with Go, Gin, and MongoDB Atlas",
    excerpt: "Set up a project with the Gin framework, create a structured model, and integrate MongoDB Atlas.",
    date: "Feb 8, 2023",
    slug: "scalable-api-go-gin-mongodb",
    readTime: "15 min",
    category: "Backend",
    externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-atlas",
    isExternal: true
  },
];

const selectedCategory = ref('All');

// Combine internal and external articles (harden against undefined/null entries)
const allArticles = computed(() => {
  const rawInternal = Array.isArray(apiData.value?.articles)
    ? apiData.value!.articles
    : [];
  const internal = rawInternal
    .filter(Boolean)
    .map((a: any) => ({
      ...a,
      isExternal: false,
      category: 'Engineering'
    }));
  return [...externalArticles, ...internal].filter(Boolean);
});

// Get unique categories
const categories = computed(() => {
  const cats = new Set(['All']);
  allArticles.value.forEach((a: any) => {
    if (a.category) cats.add(a.category);
  });
  return Array.from(cats);
});

// Filter articles by category
const filteredArticles = computed(() => {
  if (selectedCategory.value === 'All') {
    return allArticles.value;
  }
  return allArticles.value.filter((a: any) => a.category === selectedCategory.value);
});

const formatDate = (date: string | Date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
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
