<template>
  <div class="min-h-screen bg-bg dark:bg-bg-dark pt-32 pb-24">
    <div class="container mx-auto px-6 max-w-4xl">
      <!-- Back Link -->
      <div class="mb-12">
        <NuxtLink to="/#blogs" class="inline-flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-dark transition-colors font-mono text-xs uppercase tracking-wider">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          RETURN_TO_BASE
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-24">
        <div class="inline-flex items-center gap-3 px-4 py-2 border border-accent/20 bg-accent/5 text-accent dark:text-accent-dark font-mono text-xs rounded-full">
          <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          DECRYPTING_CONTENT...
        </div>
      </div>

      <div v-else-if="article">
        <!-- Header -->
        <header class="mb-16 text-center border-b border-border dark:border-border-dark pb-16">
          <div class="flex items-center justify-center gap-4 mb-6 font-mono text-xs text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
            <span>{{ new Date(article.createdAt).toLocaleDateString() }}</span>
            <span class="w-1 h-1 bg-accent dark:bg-accent-dark rounded-full"></span>
            <span>{{ article.tags?.[0] || 'ENGINEERING' }}</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-text dark:text-text mb-8 leading-tight">
            {{ article.title }}
          </h1>

          <div class="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-white/5 border border-border dark:border-border-dark rounded text-[10px] font-mono text-text-secondary dark:text-text-secondary-dark">
            ID: {{ article.slug }} // V.{{ article.views }}
          </div>
        </header>

        <!-- Content -->
        <article class="prose dark:prose-invert prose-lg max-w-none font-light prose-headings:font-normal prose-headings:text-text dark:prose-headings:text-text prose-p:text-text-secondary dark:prose-p:text-text-secondary-dark prose-a:text-accent dark:prose-a:text-accent-dark prose-code:text-accent dark:prose-code:text-accent-dark prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
          <div v-html="renderedContent"></div>
        </article>
      </div>

      <div v-else class="text-center py-24">
        <h1 class="text-2xl font-mono text-text dark:text-text mb-4">404 // DATA_NOT_FOUND</h1>
        <p class="text-text-secondary dark:text-text-secondary-dark">The requested protocol does not exist in the archives.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from 'marked';

const route = useRoute();
const { data: article, pending } = await useFetch(`/api/articles/${route.params.slug}`);

const renderedContent = computed(() => {
  return article.value ? marked(article.value.content) : '';
});

useHead({
  title: article.value ? `${article.value.title} | TheBraveByte` : 'Article Not Found',
  meta: [
    { name: 'description', content: article.value?.excerpt || 'Technical engineering article.' }
  ]
});
</script>
