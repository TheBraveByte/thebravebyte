<template>
  <div class="min-h-screen bg-bg py-8">
    <div class="container mx-auto px-6 max-w-6xl">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-light  mb-2">
            Admin Dashboard
          </h1>
          <p class="text-text-secondary font-mono text-sm">
            Manage your articles and content
          </p>
        </div>
        <div class="flex gap-3">
          <NuxtLink to="/admin/editor" 
            class="px-4 py-2 bg-text text-bg font-mono text-sm hover:bg-text-secondary transition-colors duration-200 flex items-center gap-2">
            <Icon name="lucide:plus" class="w-4 h-4" />
            NEW_ARTICLE
          </NuxtLink>
          <button @click="logout"
            class="px-4 py-2 border border-border text-text-secondary font-mono text-sm hover:border-red-500 hover:text-red-500 transition-colors duration-200">
            LOGOUT
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class=" border border-border p-6">
          <div class="font-mono-label text-text-secondary mb-2">
            TOTAL_ARTICLES
          </div>
          <div class="text-3xl font-light ">
            {{ stats.total }}
          </div>
        </div>
        <div class=" border border-border p-6">
          <div class="font-mono-label text-text-secondary mb-2">
            PUBLISHED
          </div>
          <div class="text-3xl font-light text-text">
            {{ stats.published }}
          </div>
        </div>
        <div class=" border border-border p-6">
          <div class="font-mono-label text-text-secondary mb-2">
            DRAFTS
          </div>
          <div class="text-3xl font-light text-text-secondary">
            {{ stats.drafts }}
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-6 flex gap-4">
        <button 
          @click="filter = 'all'" 
          :class="filter === 'all' ? 'bg-text text-bg' : 'border border-border '"
          class="px-4 py-2 font-mono text-sm transition-colors duration-200">
          ALL ({{ stats.total }})
        </button>
        <button 
          @click="filter = 'published'" 
          :class="filter === 'published' ? 'bg-text text-bg' : 'border border-border '"
          class="px-4 py-2 font-mono text-sm transition-colors duration-200">
          PUBLISHED ({{ stats.published }})
        </button>
        <button 
          @click="filter = 'draft'" 
          :class="filter === 'draft' ? 'bg-text text-bg' : 'border border-border '"
          class="px-4 py-2 font-mono text-sm transition-colors duration-200">
          DRAFTS ({{ stats.drafts }})
        </button>
      </div>

      <!-- Articles List -->
      <div class="space-y-4">
        <div v-if="pending" class="text-center py-12 text-text-secondary font-mono">
          LOADING...
        </div>
        
        <div v-else-if="filteredArticles.length === 0" class="text-center py-12 text-text-secondary font-mono">
          NO_ARTICLES_FOUND
        </div>

        <div v-else v-for="article in filteredArticles" :key="article._id"
          class=" border border-border p-6 hover:border-text transition-colors duration-200">
          
          <div class="flex items-start justify-between gap-6">
            
            <!-- Content -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span :class="article.published ? 'bg-green-500' : 'bg-yellow-500'"
                  class="w-2 h-2 rounded-full"></span>
                <span class="font-mono text-xs text-text-secondary uppercase">
                  {{ article.published ? 'PUBLISHED' : 'DRAFT' }}
                </span>
                <span class="text-text-secondary text-sm">
                  {{ formatDate(article.createdAt) }}
                </span>
              </div>
              
              <h3 class="text-xl font-light  mb-2">
                {{ article.title }}
              </h3>
              
              <p class="text-text-secondary text-sm mb-3 line-clamp-2">
                {{ article.excerpt }}
              </p>
              
              <div class="font-mono text-xs text-text-secondary">
                /article/{{ article.slug }}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-2">
              <NuxtLink :to="`/admin/editor?id=${article._id}`"
                class="px-4 py-2 border border-border  font-mono text-sm hover:border-text hover:bg-bg-secondary transition-colors duration-200 text-center">
                EDIT
              </NuxtLink>
              
              <NuxtLink v-if="article.published" :to="`/article/${article.slug}`" target="_blank"
                class="px-4 py-2 border border-border text-text-secondary font-mono text-sm hover:border-text transition-colors duration-200 text-center">
                VIEW
              </NuxtLink>
              
              <button @click="deleteArticle(article._id)"
                class="px-4 py-2 border border-red-500 text-red-500 font-mono text-sm hover:bg-red-500 hover:text-white transition-colors duration-200">
                DELETE
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
});

const router = useRouter();
const filter = ref('all');
const config = useRuntimeConfig();

const { data: articlesData, pending, refresh } = await useFetch(`${config.public.apiBase}/articles`, {
  query: { limit: 100 }
});

const articles = computed(() => articlesData.value?.articles || []);

const stats = computed(() => ({
  total: articles.value.length,
  published: articles.value.filter(a => a.published).length,
  drafts: articles.value.filter(a => !a.published).length,
}));

const filteredArticles = computed(() => {
  if (filter.value === 'published') {
    return articles.value.filter(a => a.published);
  }
  if (filter.value === 'draft') {
    return articles.value.filter(a => !a.published);
  }
  return articles.value;
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const deleteArticle = async (id) => {
  if (!confirm('Delete this article permanently?')) return;
  
  const token = useCookie('auth_token');
  try {
    await useFetch(`${config.public.apiBase}/articles/${id}`, { 
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
    refresh();
  } catch (error) {
    console.error('Delete failed:', error);
  }
};

const logout = async () => {
  const token = useCookie('auth_token');
  token.value = null;
  await useFetch(`${config.public.apiBase}/auth/logout`, { method: 'POST' });
  router.push('/admin/login');
};
</script>
