```html
<template>
  <section id="blogs" class="py-24 bg-bg relative overflow-hidden border-b border-border">
    <!-- Background Grid -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="mb-16">
        <h3 class="font-mono-label text-text-accent mb-3 flex items-center gap-2">
          <span class="w-2 h-2 bg-accent"></span>
          // KNOWLEDGE_BASE
        </h3>
        <p class="font-mono text-xs text-text-accent max-w-xl">
          SYSTEM_LOGS_AND_TECHNICAL_DOCUMENTATION.
          <br>
          DEEP_DIVES_INTO_BACKEND_ENGINEERING.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2 mb-12">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
          'px-4 py-2 text-xs font-mono border transition-all duration-200 uppercase tracking-wide',
          selectedCategory === cat
            ? 'bg-accent text-white border-accent border-accent'
            : 'bg-bg text-text-accent border-border hover:border-accent hover:text-accent hover:text-accent'
        ]">
          [{{ cat }}]
        </button>
      </div>

      <!-- Featured Post (First post) -->
      <div v-if="filteredPosts.length > 0"
        class="mb-12 group relative bg-bg border border-border hover:border-accent transition-colors duration-200">
        
        <!-- Technical Corners -->
        <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-accent transition-colors duration-200"></div>
        <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-accent transition-colors duration-200"></div>

        <div class="grid md:grid-cols-2 gap-8 p-8">
          <div class="space-y-6">
            <div class="flex items-center gap-3 font-mono text-xs">
              <span class="text-accent text-accent">
                [FEATURED_LOG]
              </span>
              <span class="text-text-secondary">
                // {{ filteredPosts[0]?.category.toUpperCase() }}
              </span>
            </div>

            <h2 class="text-2xl font-light text-text group-hover:text-accent transition-colors duration-200">
              {{ filteredPosts[0]?.title }}
            </h2>

            <p class="text-sm text-text-accent leading-relaxed font-light">
              {{ filteredPosts[0]?.excerpt }}
            </p>

            <!-- Footer -->
            <div class="pt-6 border-t border-border flex items-center justify-between mt-auto">
              <NuxtLink :to="`/blog/${filteredPosts[0]?.slug}`" class="inline-flex items-center gap-2 text-xs font-mono font-bold text-text group-hover:text-accent uppercase tracking-wider transition-colors">
                READ_PROTOCOL
                <Icon name="lucide:arrow-right" class="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
              <span class="font-mono text-[10px] text-text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                ID: {{ filteredPosts[0]?.slug?.substring(0, 6) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Link -->
      <div class="mt-16 text-center">
        <NuxtLink to="/blog" class="inline-flex items-center gap-2 px-8 py-4 border border-text border-text text-text hover:bg-text hover:bg-text hover:text-bg hover:text-bg transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider group">
          <span>ACCESS_FULL_ARCHIVE</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import firstBlogPreview from '/img/blogs/ayaacodes.hashnode.dev_understanding-fan-out-concurrency-pattern-in-go.png';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  poster: string;
  readTime: string;
  category: string;
  externalUrl: string;
  urlPreview?: string;
}

const posts: BlogPost[] = [
  {
    title: "Understanding Fan-Out Concurrency Pattern in Go",
    excerpt: "The Fan-Out Pattern involves a single producer distributing tasks to multiple workers, enabling parallel processing for efficiency and scalability. Learn how to apply this powerful concurrency pattern in Go with practical examples including batch image processing.",
    date: "Mar 7, 2025",
    slug: "fan-out-concurrency-pattern",
    poster: "/placeholder.svg",
    readTime: "7 min read",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go",
    urlPreview: firstBlogPreview
  },
  {
    title: "Concurrency Patterns in Go: Wait for Results",
    excerpt: "In the previous article, 'Concurrency Patterns in Go: A Practical Guide,' I took a fun and practical dive into the world of concurrency in Go. Learn about the Wait for Results pattern using sync.WaitGroup with real-world exam invigilation examples.",
    date: "Feb 13, 2025",
    slug: "wait-for-results-pattern",
    poster: "/placeholder.svg",
    readTime: "4 min read",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-wait-for-results",
  },
  {
    title: "Concurrency Patterns in Go: A Practical Guide",
    excerpt: "Explore how Go makes concurrency possible, elegant and efficient. Learn about goroutines, channels, synchronization primitives and common concurrency patterns with real-world examples. Discover why concurrency matters and the difference between concurrency and parallelism.",
    date: "Jan 30, 2025",
    slug: "concurrency-patterns-practical-guide",
    poster: "/placeholder.svg",
    readTime: "5 min read",
    category: "Concurrency",
    externalUrl: "https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide",
  },
  {
    title: "Creating a Scalable API with Go, Gin, and MongoDB II",
    excerpt: "In the previous tutorial, you learned about setting up your project using a package-oriented design for integrations and setting up the database for user interactions. This part covers setting handlers for user requests, creating routes for API endpoints, implementing sign-up and sign-in requests, and establishing a secure dashboard endpoint.",
    date: "Mar 28, 2023",
    slug: "scalable-api-go-gin-mongodb-2",
    poster: "/placeholder.svg",
    readTime: "18 min read",
    category: "Backend Development",
    externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-ii",
  },
  {
    title: "Merging Maps in Go: A Step-by-Step Guide",
    excerpt: "Go uses a statically typed system and adopts the use of generics for improved performance. Learn the basics of data type declaration, appropriate usage of maps using generics features for added flexibility, and creating a new map result of merged maps.",
    date: "Feb 8, 2023",
    slug: "merging-maps-go",
    poster: "/placeholder.svg",
    readTime: "6 min read",
    category: "Go Fundamentals",
    externalUrl: "https://ayaacodes.hashnode.dev/merging-maps-in-go-a-step-by-step-guide",
  },
  {
    title: "Creating a Scalable API with Go, Gin, and MongoDB Atlas",
    excerpt: "This tutorial will establish a standard boilerplate code structure for a web application. Learn how to set up a project with the Gin framework, create a structured model, integrate MongoDB Atlas as a cloud-based database, and implement password encryption and verification.",
    date: "Feb 8, 2023",
    slug: "scalable-api-go-gin-mongodb",
    poster: "/placeholder.svg",
    readTime: "15 min read",
    category: "Backend Development",
    externalUrl: "https://ayaacodes.hashnode.dev/creating-a-scalable-api-with-go-gin-and-mongodb-atlas",
  },
];

const selectedCategory = ref('All Articles');
const visibleCount = ref(3);

const categories = computed(() => {
  const cats = ['All Articles', ...new Set(posts.map(p => p.category))];
  return cats;
});

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All Articles') {
    return posts;
  }
  return posts.filter(p => p.category === selectedCategory.value);
});

const displayedPosts = computed(() => {
  // Skip the first post (featured) and show remaining posts based on visibleCount
  return filteredPosts.value.slice(1, visibleCount.value + 1);
});

const hasMorePosts = computed(() => {
  return visibleCount.value < filteredPosts.value.length - 1;
});

const loadMore = () => {
  visibleCount.value += 3;
};

const showLess = () => {
  visibleCount.value = 3;
  // Scroll to blogs section
  document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Reset visible count when category changes
watch(selectedCategory, () => {
  visibleCount.value = 3;
});
</script>