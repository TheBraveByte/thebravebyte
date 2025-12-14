<template>
  <div class="min-h-screen bg-bg dark:bg-bg-dark pt-24 pb-12 px-6">
    <div class="container mx-auto max-w-6xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12">
        <div>
          <h1 class="font-mono text-2xl font-bold text-text dark:text-text mb-2 flex items-center gap-3">
            <span class="w-3 h-3 bg-accent dark:bg-accent-dark animate-pulse"></span>
            // BLOG_MANAGEMENT_SYSTEM
          </h1>
          <p class="font-mono text-xs text-text-secondary dark:text-text-secondary-dark">
            ADMIN_ACCESS_LEVEL_1 // CONTENT_CONTROLLER
          </p>
        </div>
        
        <div class="flex gap-4">
          <button @click="logout" class="px-6 py-2 border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:text-red-500 hover:border-red-500 transition-all duration-300 font-mono text-xs uppercase tracking-wider">
            [ TERMINATE_SESSION ]
          </button>
          <NuxtLink to="/admin/editor" class="px-6 py-2 bg-text dark:bg-white text-bg dark:text-black hover:bg-accent dark:hover:bg-accent-dark hover:text-white transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Icon name="lucide:plus" class="w-4 h-4" />
            NEW_ENTRY
          </NuxtLink>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Sidebar / Stats -->
        <div class="space-y-6">
          <!-- Stats Card -->
          <div class="bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-16 h-16 bg-accent/5 dark:bg-accent-dark/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            <h3 class="font-mono text-xs text-text-secondary dark:text-text-secondary-dark mb-2 uppercase">Total Articles</h3>
            <div class="text-4xl font-bold text-text dark:text-text font-sans">{{ posts.length }}</div>
            <div class="mt-4 font-mono text-[10px] text-accent dark:text-accent-dark flex items-center gap-1">
              <Icon name="lucide:database" class="w-3 h-3" />
              DATABASE_SYNCED
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-2">
          <!-- Post List -->
          <div class="bg-bg dark:bg-bg-dark border border-border dark:border-border-dark">
            <!-- Table Header -->
            <div class="grid grid-cols-12 gap-4 p-4 border-b border-border dark:border-border-dark bg-gray-50 dark:bg-white/5 font-mono text-[10px] text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
              <div class="col-span-6">Title</div>
              <div class="col-span-2">Status</div>
              <div class="col-span-2">Date</div>
              <div class="col-span-2 text-right">Action</div>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="p-8 text-center font-mono text-xs text-text-secondary dark:text-text-secondary-dark">
              LOADING_DATA_STREAMS...
            </div>

            <!-- Table Rows -->
            <div v-else class="divide-y divide-border dark:divide-border-dark">
              <div v-for="post in posts" :key="post._id" class="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <div class="col-span-6">
                  <h4 class="font-sans font-medium text-text dark:text-text text-sm mb-1 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors truncate">
                    {{ post.title }}
                  </h4>
                  <span class="font-mono text-[10px] text-text-secondary dark:text-text-secondary-dark truncate block">
                    /{{ post.slug }}
                  </span>
                </div>
                <div class="col-span-2">
                  <span :class="[
                    'font-mono text-[10px] px-2 py-1 border',
                    post.status === 'published' 
                      ? 'border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/5' 
                      : 'border-yellow-500/30 text-yellow-600 dark:text-yellow-400 bg-yellow-500/5'
                  ]">
                    {{ post.status.toUpperCase() }}
                  </span>
                </div>
                <div class="col-span-2 font-mono text-[10px] text-text-secondary dark:text-text-secondary-dark">
                  {{ new Date(post.createdAt).toLocaleDateString() }}
                </div>
                <div class="col-span-2 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <NuxtLink :to="`/admin/editor?id=${post._id}`" class="p-1.5 hover:bg-accent dark:hover:bg-accent-dark hover:text-white text-text-secondary dark:text-text-secondary-dark transition-colors">
                    <Icon name="lucide:edit-2" class="w-3 h-3" />
                  </NuxtLink>
                  <button @click="deletePost(post._id)" class="p-1.5 hover:bg-red-500 hover:text-white text-text-secondary dark:text-text-secondary-dark transition-colors">
                    <Icon name="lucide:trash-2" class="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Post {
  _id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
}

definePageMeta({
  middleware: async (to, from) => {
    try {
      await $fetch('/api/auth/me');
    } catch (e) {
      return navigateTo('/login');
    }
  }
});

const { data: posts, pending, refresh } = await useFetch<Post[]>('/api/articles', {
  default: () => []
});
const router = useRouter();

const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' });
  router.push('/login');
};

const deletePost = async (id: string) => {
  if (!confirm('CONFIRM_DELETION: This action cannot be undone.')) return;
  
  try {
    await $fetch(`/api/articles/${id}`, { method: 'DELETE' });
    refresh();
  } catch (e) {
    alert('Failed to delete article');
  }
};
</script>
