<template>
  <div class="min-h-screen bg-bg pt-24 pb-16">
    <div class="container mx-auto px-6 max-w-6xl">
      
      <!-- Hero Section -->
      <section class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="w-2 h-2 bg-accent animate-pulse"></span>
          <span class="font-mono text-xs text-text-secondary uppercase tracking-widest">// KNOWLEDGE_BASE</span>
          <span class="w-2 h-2 bg-accent animate-pulse"></span>
        </div>
        <h1 class="text-4xl md:text-5xl font-light text-text mb-6">
          Engineering the <br />
          <span class="text-accent">Future with Code</span>
        </h1>
        <p class="text-lg text-text-secondary font-light max-w-2xl mx-auto">
          Deep dives into Backend Engineering, Distributed Systems, AI Integration, and Go Concurrency Patterns.
        </p>
      </section>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-2 mb-12">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
          'px-4 py-2 text-xs font-mono border transition-all duration-200 uppercase tracking-wide',
          selectedCategory === cat
            ? 'bg-accent text-white border-accent'
            : 'bg-bg text-text-secondary border-border hover:border-accent hover:text-accent'
        ]">
          [{{ cat }}]
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center gap-3 text-text-secondary font-mono text-sm">
          <span class="w-2 h-2 bg-accent animate-pulse rounded-full"></span>
          LOADING_ARTICLES...
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-else class="space-y-12">
        
        <!-- Featured Article (First one) -->
        <div v-if="filteredArticles.length > 0" 
          class="group relative bg-bg border border-border hover:border-accent transition-colors duration-300">
          
          <!-- Technical Corners -->
          <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent"></div>
          <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent"></div>
          <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent"></div>
          <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent"></div>

          <div class="grid md:grid-cols-2 gap-8 p-8">
            <!-- Preview Image -->
            <div v-if="filteredArticles[0]?.urlPreview" class="aspect-video bg-bg-secondary overflow-hidden border border-border">
              <img :src="filteredArticles[0].urlPreview" :alt="filteredArticles[0].title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div v-else class="aspect-video bg-bg-secondary border border-border flex items-center justify-center">
              <Icon name="lucide:file-text" class="w-16 h-16 text-border" />
            </div>
            
            <div class="flex flex-col justify-center space-y-6">
              <div class="flex items-center gap-3 font-mono text-xs">
                <span class="text-accent font-bold">[FEATURED]</span>
                <span class="text-text-secondary">// {{ filteredArticles[0]?.category?.toUpperCase().replace(/ /g, '_') || 'ENGINEERING' }}</span>
                <span v-if="filteredArticles[0]?.isExternal" class="px-2 py-0.5 bg-accent/10 text-accent text-[10px] rounded">EXTERNAL</span>
              </div>

              <h2 class="text-2xl md:text-3xl font-light text-text group-hover:text-accent transition-colors duration-200">
                {{ filteredArticles[0]?.title }}
              </h2>

              <p class="text-text-secondary leading-relaxed font-light">
                {{ filteredArticles[0]?.excerpt }}
              </p>

              <div class="flex items-center gap-4 font-mono text-xs text-text-muted">
                <span>{{ filteredArticles[0]?.date || formatDate(filteredArticles[0]?.createdAt) }}</span>
                <span>•</span>
                <span>{{ filteredArticles[0]?.readTime || '5 min read' }}</span>
              </div>

              <!-- Action Button -->
              <div class="pt-4">
                <a v-if="filteredArticles[0]?.isExternal" 
                   :href="filteredArticles[0].externalUrl" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 px-6 py-3 bg-text text-bg font-mono text-sm hover:bg-accent transition-colors duration-200">
                  READ_ON_HASHNODE
                  <Icon name="lucide:external-link" class="w-4 h-4" />
                </a>
                <NuxtLink v-else 
                  :to="`/article/${filteredArticles[0]?.slug}`"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-text text-bg font-mono text-sm hover:bg-accent transition-colors duration-200">
                  READ_ARTICLE
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Articles Grid -->
        <div v-if="remainingArticles.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <component 
            :is="article.isExternal ? 'a' : 'NuxtLink'"
            v-for="article in remainingArticles" 
            :key="article.slug || article._id"
            :href="article.isExternal ? article.externalUrl : undefined"
            :to="article.isExternal ? undefined : `/article/${article.slug}`"
            :target="article.isExternal ? '_blank' : undefined"
            :rel="article.isExternal ? 'noopener noreferrer' : undefined"
            class="group bg-bg border border-border hover:border-accent transition-colors duration-200 p-6 flex flex-col relative">
            
            <!-- External Badge -->
            <div v-if="article.isExternal" class="absolute top-4 right-4">
              <Icon name="lucide:external-link" class="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
            </div>

            <div class="flex items-center gap-3 font-mono text-xs mb-4">
              <span class="text-accent">[{{ (article.category || 'ENGINEERING').toUpperCase().replace(/ /g, '_') }}]</span>
            </div>

            <h3 class="text-lg font-light text-text group-hover:text-accent transition-colors mb-3 pr-6">
              {{ article.title }}
            </h3>

            <p class="text-sm text-text-secondary leading-relaxed font-light mb-4 flex-grow line-clamp-3">
              {{ article.excerpt }}
            </p>

            <div class="flex items-center justify-between pt-4 border-t border-border mt-auto">
              <div class="flex items-center gap-3 font-mono text-xs text-text-muted">
                <span>{{ article.date || formatDate(article.createdAt) }}</span>
                <span>•</span>
                <span>{{ article.readTime || '5 min read' }}</span>
              </div>
              <Icon :name="article.isExternal ? 'lucide:external-link' : 'lucide:arrow-right'" 
                class="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
            </div>
          </component>
        </div>

        <!-- Empty State -->
        <div v-if="filteredArticles.length === 0" class="text-center py-16 border border-dashed border-border">
          <Icon name="lucide:file-x" class="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p class="text-text-secondary font-mono text-sm">NO_ARTICLES_FOUND</p>
          <p class="text-text-muted text-sm mt-2">Check back later for new content.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import firstBlogPreview from '/img/blogs/ayaacodes.hashnode.dev_understanding-fan-out-concurrency-pattern-in-go.png';

// Fetch internal articles from API
const { data: apiData, pending: loading } = await useFetch('/api/articles');

// External articles (from Hashnode)
const externalArticles = [
  {
    title: "Understanding Fan-Out Concurrency Pattern in Go",
    excerpt: "The Fan-Out Pattern involves a single producer distributing tasks to multiple workers, enabling parallel processing for efficiency and scalability. Learn how to apply this powerful concurrency pattern in Go with practical examples including batch image processing.",
    date: "Mar 7, 2025",
    slug: "fan-out-concurrency-pattern",
    readTime: "7 min read",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go",
    urlPreview: firstBlogPreview,
    isExternal: true
  },
  {
    title: "Concurrency Patterns in Go: Wait for Results",
    excerpt: "In the previous article, 'Concurrency Patterns in Go: A Practical Guide,' I took a fun and practical dive into the world of concurrency in Go. Learn about the Wait for Results pattern using sync.WaitGroup with real-world exam invigilation examples.",
    date: "Feb 13, 2025",
    slug: "wait-for-results-pattern",
    readTime: "4 min read",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-wait-for-results",
    isExternal: true
  },
  {
    title: "Concurrency Patterns in Go: A Practical Guide",
    excerpt: "Explore how Go makes concurrency possible, elegant and efficient. Learn about goroutines, channels, synchronization primitives and common concurrency patterns with real-world examples. Discover why concurrency matters and the difference between concurrency and parallelism.",
    date: "Jan 30, 2025",
    slug: "concurrency-patterns-practical-guide",
    readTime: "5 min read",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide",
    isExternal: true
  },
  {
    title: "Creating a Scalable API with Go, Gin, and MongoDB II",
    excerpt: "This part covers setting handlers for user requests, creating routes for API endpoints, implementing sign-up and sign-in requests, and establishing a secure dashboard endpoint.",
    date: "Mar 28, 2023",
    slug: "scalable-api-go-gin-mongodb-2",
    readTime: "18 min read",
    category: "Backend Development",
    externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-ii",
    isExternal: true
  },
  {
    title: "Merging Maps in Go: A Step-by-Step Guide",
    excerpt: "Go uses a statically typed system and adopts the use of generics for improved performance. Learn the basics of data type declaration, appropriate usage of maps using generics features for added flexibility.",
    date: "Feb 8, 2023",
    slug: "merging-maps-go",
    readTime: "6 min read",
    category: "Go Fundamentals",
    externalUrl: "https://ayaacodes.hashnode.dev/merging-maps-in-go-a-step-by-step-guide",
    isExternal: true
  },
  {
    title: "Creating a Scalable API with Go, Gin, and MongoDB Atlas",
    excerpt: "This tutorial will establish a standard boilerplate code structure for a web application. Learn how to set up a project with the Gin framework, create a structured model, and integrate MongoDB Atlas.",
    date: "Feb 8, 2023",
    slug: "scalable-api-go-gin-mongodb",
    readTime: "15 min read",
    category: "Backend Development",
    externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-atlas",
    isExternal: true
  },
];

const selectedCategory = ref('All');

// Combine internal and external articles
const allArticles = computed(() => {
  const internal = (apiData.value?.articles || []).map((a: any) => ({
    ...a,
    isExternal: false,
    category: 'Engineering'
  }));
  return [...externalArticles, ...internal];
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

// Get remaining articles (excluding featured)
const remainingArticles = computed(() => {
  return filteredArticles.value.slice(1);
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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
