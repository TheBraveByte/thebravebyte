<template>
  <div class="min-h-screen bg-bg dark:bg-bg-dark py-8">
    <div class="container mx-auto px-6 max-w-5xl">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-light text-text dark:text-text-dark mb-2">
            {{ isEditing ? 'Edit Article' : 'New Article' }}
          </h1>
          <p class="text-sm text-text-secondary dark:text-text-secondary-dark font-mono">
            {{ autoSaveStatus }}
          </p>
        </div>
        <div class="flex gap-3">
          <button @click="saveDraft" :disabled="saving" 
            class="px-4 py-2 border border-border dark:border-border-dark text-text dark:text-text-dark font-mono text-sm hover:border-accent dark:hover:border-accent-dark transition-colors duration-200 disabled:opacity-50">
            {{ saving ? '...' : 'SAVE_DRAFT' }}
          </button>
          <button @click="publish" :disabled="saving || !canPublish"
            class="px-4 py-2 bg-accent dark:bg-accent-dark text-white font-mono text-sm hover:opacity-90 transition-opacity duration-200 disabled:opacity-50">
            {{ article.published ? 'UPDATE' : 'PUBLISH' }}
          </button>
        </div>
      </div>

      <!-- Form -->
      <div class="space-y-6">
        
        <!-- Title -->
        <div>
          <label class="block font-mono-label text-text-secondary dark:text-text-secondary-dark mb-2">
            TITLE
          </label>
          <input 
            v-model="article.title" 
            type="text" 
            placeholder="Enter article title..."
            class="w-full px-4 py-3 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark text-text dark:text-text-dark text-xl font-light focus:border-accent dark:focus:border-accent-dark outline-none transition-colors"
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="block font-mono-label text-text-secondary dark:text-text-secondary-dark mb-2">
            SLUG (URL)
          </label>
          <input 
            v-model="article.slug" 
            type="text" 
            placeholder="article-url-slug"
            class="w-full px-4 py-3 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark text-text dark:text-text-dark font-mono text-sm focus:border-accent dark:focus:border-accent-dark outline-none transition-colors"
          />
          <p class="mt-1 text-xs text-text-secondary dark:text-text-secondary-dark">
            {{ siteUrl }}/article/{{ article.slug || 'your-slug' }}
          </p>
        </div>

        <!-- Excerpt -->
        <div>
          <label class="block font-mono-label text-text-secondary dark:text-text-secondary-dark mb-2">
            EXCERPT
          </label>
          <textarea 
            v-model="article.excerpt" 
            rows="3"
            placeholder="Brief description for article cards and SEO..."
            class="w-full px-4 py-3 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark text-text dark:text-text-dark focus:border-accent dark:focus:border-accent-dark outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <!-- Cover Image -->
        <div>
          <label class="block font-mono-label text-text-secondary dark:text-text-secondary-dark mb-2">
            COVER_IMAGE
          </label>
          <div class="flex gap-3">
            <input 
              v-model="article.coverImage" 
              type="text" 
              placeholder="Image URL or upload..."
              class="flex-1 px-4 py-3 bg-bg-secondary dark:bg-bg-secondary-dark border border-border dark:border-border-dark text-text dark:text-text-dark font-mono text-sm focus:border-accent dark:focus:border-accent-dark outline-none transition-colors"
            />
            <label class="px-4 py-3 border border-border dark:border-border-dark text-text dark:text-text-dark font-mono text-sm hover:border-accent dark:hover:border-accent-dark transition-colors cursor-pointer flex items-center gap-2">
              <Icon name="lucide:upload" class="w-4 h-4" />
              UPLOAD
              <input type="file" @change="handleImageUpload" accept="image/*" class="hidden" />
            </label>
          </div>
          <div v-if="article.coverImage" class="mt-3">
            <img :src="article.coverImage" alt="Cover preview" class="max-w-xs border border-border dark:border-border-dark" />
          </div>
        </div>

        <!-- Content Editor -->
        <div>
          <label class="block font-mono-label text-text-secondary dark:text-text-secondary-dark mb-2">
            CONTENT
          </label>
          <ArticleEditor v-model="article.content" />
        </div>

      </div>

      <!-- Actions Footer -->
      <div class="mt-8 pt-6 border-t border-border dark:border-border-dark flex justify-between items-center">
        <NuxtLink to="/admin/dashboard" class="text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-dark font-mono text-sm">
          ← BACK_TO_DASHBOARD
        </NuxtLink>
        <div class="flex gap-3">
          <button v-if="isEditing && article.published" @click="unpublish"
            class="px-4 py-2 border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark font-mono text-sm hover:border-red-500 hover:text-red-500 transition-colors duration-200">
            UNPUBLISH
          </button>
          <button v-if="isEditing" @click="deleteArticle"
            class="px-4 py-2 border border-red-500 text-red-500 font-mono text-sm hover:bg-red-500 hover:text-white transition-colors duration-200">
            DELETE
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const siteUrl = config.public.siteUrl || 'http://localhost:3000';
const isEditing = computed(() => !!route.query.id);
const saving = ref(false);
const autoSaveStatus = ref('All changes saved');
const autoSaveTimer = ref(null);

const article = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: {},
  coverImage: '',
  published: false,
});

const canPublish = computed(() => {
  return article.value.title && article.value.slug && article.value.excerpt && article.value.content;
});

// Load article if editing
onMounted(async () => {
  if (isEditing.value) {
    try {
      const { data } = await useFetch(`/api/articles/${route.query.id}`);
      if (data.value) {
        article.value = { ...data.value };
      }
    } catch (error) {
      console.error('Failed to load article:', error);
    }
  }
});

// Auto-generate slug from title
watch(() => article.value.title, (newTitle) => {
  if (!isEditing.value && newTitle) {
    article.value.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

// Auto-save functionality
watch(article, () => {
  autoSaveStatus.value = 'Unsaved changes...';
  
  // Clear existing timer
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value);
  }
  
  // Set new timer for auto-save after 2 seconds of inactivity
  autoSaveTimer.value = setTimeout(async () => {
    await saveDraft(true);
  }, 2000);
}, { deep: true });

const saveDraft = async (isAutoSave = false) => {
  saving.value = true;
  
  try {
    const endpoint = isEditing.value 
      ? `/api/articles/${route.query.id}`
      : '/api/articles';
    
    const method = isEditing.value ? 'PUT' : 'POST';
    
    const { data, error } = await useFetch(endpoint, {
      method,
      body: { ...article.value, published: false }
    });
    
    if (error.value) {
      throw new Error(error.value.message);
    }
    
    if (data.value && !isEditing.value) {
      // Update URL to editing mode
      router.replace({ query: { id: data.value._id } });
      article.value = data.value;
    }
    
    autoSaveStatus.value = isAutoSave ? 'Auto-saved' : 'Draft saved';
    
    setTimeout(() => {
      autoSaveStatus.value = 'All changes saved';
    }, 2000);
    
  } catch (error) {
    console.error('Save failed:', error);
    autoSaveStatus.value = 'Save failed';
  } finally {
    saving.value = false;
  }
};

const publish = async () => {
  saving.value = true;
  
  try {
    const endpoint = isEditing.value 
      ? `/api/articles/${route.query.id}`
      : '/api/articles';
    
    const method = isEditing.value ? 'PUT' : 'POST';
    
    const { data, error } = await useFetch(endpoint, {
      method,
      body: { 
        ...article.value, 
        published: true,
        publishedAt: article.value.published ? article.value.publishedAt : new Date()
      }
    });
    
    if (error.value) {
      throw new Error(error.value.message);
    }
    
    article.value = data.value;
    autoSaveStatus.value = 'Published successfully!';
    
    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 1000);
    
  } catch (error) {
    console.error('Publish failed:', error);
    autoSaveStatus.value = 'Publish failed';
  } finally {
    saving.value = false;
  }
};

const unpublish = async () => {
  if (!confirm('Unpublish this article?')) return;
  
  saving.value = true;
  
  try {
    const { error } = await useFetch(`/api/articles/${route.query.id}`, {
      method: 'PUT',
      body: { ...article.value, published: false }
    });
    
    if (error.value) {
      throw new Error(error.value.message);
    }
    
    article.value.published = false;
    autoSaveStatus.value = 'Article unpublished';
    
  } catch (error) {
    console.error('Unpublish failed:', error);
  } finally {
    saving.value = false;
  }
};

const deleteArticle = async () => {
  if (!confirm('Delete this article permanently? This cannot be undone.')) return;
  
  saving.value = true;
  
  try {
    const { error } = await useFetch(`/api/articles/${route.query.id}`, {
      method: 'DELETE'
    });
    
    if (error.value) {
      throw new Error(error.value.message);
    }
    
    router.push('/admin/dashboard');
    
  } catch (error) {
    console.error('Delete failed:', error);
  } finally {
    saving.value = false;
  }
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // For now, just use a data URL. In production, upload to cloud storage
  const reader = new FileReader();
  reader.onload = (e) => {
    article.value.coverImage = e.target.result;
  };
  reader.readAsDataURL(file);
  
  // TODO: Upload to cloud storage (Cloudinary, S3, etc.)
  // const formData = new FormData();
  // formData.append('image', file);
  // const { data } = await useFetch('/api/upload', { method: 'POST', body: formData });
  // article.value.coverImage = data.value.url;
};

// Cleanup on unmount
onUnmounted(() => {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value);
  }
});
</script>
