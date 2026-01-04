<template>
  <div class="min-h-screen bg-bg py-8">
    <div class="container mx-auto px-6 max-w-5xl">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-light  mb-2">
            {{ isEditing ? 'Edit Article' : 'New Article' }}
          </h1>
          <p class="text-sm text-text-secondary font-mono">
            {{ autoSaveStatus }}
          </p>
        </div>
        <div class="flex gap-3 items-center">
          <!-- View Article button (visible when we have a slug) -->
          <NuxtLink
            v-if="article.slug"
            :to="`/article/${article.slug}`"
            target="_blank"
            class="px-4 py-2 border border-border font-mono text-sm hover:border-text hover:bg-bg-secondary transition-colors duration-200"
          >
            VIEW_ARTICLE
          </NuxtLink>
          <button @click="saveDraft" :disabled="saving" 
            class="px-4 py-2 border border-border  font-mono text-sm hover:border-text hover:bg-bg-secondary transition-colors duration-200 disabled:opacity-50">
            {{ saving ? '...' : 'SAVE_DRAFT' }}
          </button>
          <button @click="publish" :disabled="saving || !canPublish"
            class="px-4 py-2 bg-text text-bg font-mono text-sm hover:bg-text-secondary transition-colors duration-200 disabled:opacity-50">
            {{ article.published ? 'UPDATE' : 'PUBLISH' }}
          </button>
        </div>
      </div>

      <!-- Form -->
      <div class="space-y-6">
        
        <!-- Title -->
        <div>
          <label class="block font-mono-label text-text-secondary mb-2">
            TITLE
          </label>
          <input 
            v-model="article.title" 
            type="text" 
            placeholder="Enter article title..."
            class="w-full px-4 py-3  border border-border  text-xl font-light focus:border-text outline-none transition-colors"
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="block font-mono-label text-text-secondary mb-2">
            SLUG (URL)
          </label>
          <input 
            v-model="article.slug" 
            type="text" 
            placeholder="article-url-slug"
            class="w-full px-4 py-3  border border-border  font-mono text-sm focus:border-text outline-none transition-colors"
          />
          <p class="mt-1 text-xs text-text-secondary">
            {{ siteUrl }}/article/{{ article.slug || 'your-slug' }}
          </p>
        </div>

        <!-- Excerpt -->
        <div>
          <label class="block font-mono-label text-text-secondary mb-2">
            EXCERPT
          </label>
          <textarea 
            v-model="article.excerpt" 
            rows="3"
            placeholder="Brief description for article cards and SEO..."
            class="w-full px-4 py-3  border border-border  focus:border-text outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <!-- Cover Image -->
        <div>
          <label class="block font-mono-label text-text-secondary mb-2">
            COVER_IMAGE
          </label>
          <div class="flex gap-3">
            <input 
              v-model="article.coverImage" 
              type="text" 
              placeholder="Image URL or upload..."
              class="flex-1 px-4 py-3  border border-border  font-mono text-sm focus:border-text outline-none transition-colors"
            />
            <label class="px-4 py-3 border border-border  font-mono text-sm hover:border-text hover:bg-bg-secondary transition-colors cursor-pointer flex items-center gap-2">
              <Icon name="lucide:upload" class="w-4 h-4" />
              UPLOAD
              <input type="file" @change="handleImageUpload" accept="image/*" class="hidden" />
            </label>
          </div>
          <div v-if="article.coverImage" class="mt-3">
            <img :src="article.coverImage" alt="Cover preview" class="max-w-xs border border-border" />
          </div>
        </div>

        <!-- Content Type Toggle -->
        <div>
          <label class="block font-mono-label text-text-secondary mb-2">
            CONTENT_TYPE
          </label>
          <div class="flex gap-3 mb-4">
            <button 
              @click="contentType = 'richtext'" 
              :class="contentType === 'richtext' ? 'bg-text text-bg' : 'border border-border'"
              class="px-4 py-2 font-mono text-sm transition-colors duration-200">
              RICH_TEXT
            </button>
            <button 
              @click="contentType = 'markdown'" 
              :class="contentType === 'markdown' ? 'bg-text text-bg' : 'border border-border'"
              class="px-4 py-2 font-mono text-sm transition-colors duration-200">
              MARKDOWN
            </button>
          </div>
        </div>

        <!-- Content Editor -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block font-mono-label text-text-secondary">
              CONTENT
            </label>
            <button 
              v-if="contentType === 'markdown'" 
              @click="showPreview = !showPreview"
              class="px-3 py-1 border border-border font-mono text-xs hover:border-text transition-colors">
              {{ showPreview ? 'EDIT' : 'PREVIEW' }}
            </button>
          </div>
          
          <!-- Rich Text Editor -->
          <ArticleEditor v-if="contentType === 'richtext'" v-model="article.content" />
          
          <!-- Markdown Editor/Preview -->
          <div v-else>
            <textarea 
              v-if="!showPreview"
              v-model="markdownContent" 
              rows="20"
              placeholder="Write your article in markdown..."
              class="w-full px-4 py-3 border border-border font-mono text-sm focus:border-text outline-none transition-colors resize-y"
            ></textarea>
            <div 
              v-else
              class="border border-border p-6 min-h-[500px] markdown-preview"
              v-html="markdownPreview"
            ></div>
          </div>
        </div>

      </div>

      <!-- Actions Footer -->
      <div class="mt-8 pt-6 border-t border-border flex justify-between items-center">
        <NuxtLink to="/admin/dashboard" class="text-text-secondary hover:text-text font-mono text-sm">
          ← BACK_TO_DASHBOARD
        </NuxtLink>
        <div class="flex gap-3">
          <button v-if="isEditing && article.published" @click="unpublish"
            class="px-4 py-2 border border-border text-text-secondary font-mono text-sm hover:border-red-500 hover:text-red-500 transition-colors duration-200">
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
import { marked } from 'marked';

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

const contentType = ref('richtext'); // 'richtext' or 'markdown'
const showPreview = ref(false);
const markdownContent = ref('');

const article = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: {},
  coverImage: '',
  published: false,
});

const canPublish = computed(() => {
  return article.value.title && article.value.slug && article.value.excerpt && 
    (contentType.value === 'markdown' ? markdownContent.value : article.value.content);
});

// Markdown preview using marked
const markdownPreview = computed(() => {
  if (!markdownContent.value) return '<p class="text-text-secondary">Nothing to preview yet...</p>';
  
  // Simple markdown to HTML conversion (you can use 'marked' library for full support)
  return marked.parse(markdownContent.value);
});

// Load article if editing
onMounted(async () => {
  if (isEditing.value) {
    try {
      const { data } = await useFetch(`/api/articles/${route.query.id}`);
      if (data.value) {
        article.value = { ...data.value };
        
        // Detect content type
        if (typeof data.value.content === 'string') {
          contentType.value = 'markdown';
          markdownContent.value = data.value.content;
        } else {
          contentType.value = 'richtext';
        }
      }
    } catch (error) {
      console.error('Failed to load article:', error);
    }
  }
});

// Auto-generate slug from title
// Auto-generate slug from title
watch(() => article.value.title, (newTitle) => {
  // Generate slug if it's a new article OR if the slug is empty
  if (newTitle && (!isEditing.value || !article.value.slug)) {
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
  const token = useCookie('auth_token');
  
  try {
    const endpoint = isEditing.value 
      ? `/api/articles/${route.query.id}`
      : '/api/articles';
    
    const method = isEditing.value ? 'PUT' : 'POST';
    
    // Prepare content based on type
    const contentToSave = contentType.value === 'markdown' 
      ? markdownContent.value 
      : article.value.content;
    
    const { data, error } = await useFetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: { ...article.value, content: contentToSave, published: false }
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
  const token = useCookie('auth_token');
  
  try {
    // Ensure slug is generated if missing
    if (!article.value.slug && article.value.title) {
      article.value.slug = article.value.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const endpoint = isEditing.value
      ? `/api/articles/${route.query.id}`
      : '/api/articles';
    
    const method = isEditing.value ? 'PUT' : 'POST';
    
    // Prepare content based on type
    const contentToSave = contentType.value === 'markdown' 
      ? markdownContent.value 
      : article.value.content;
    
    const { data, error } = await useFetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: { 
        ...article.value, 
        content: contentToSave,
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
      // After publishing, take the user to the public article page
      router.push(`/article/${article.value.slug}`);
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
  const token = useCookie('auth_token');
  
  try {
    const { error } = await useFetch(`/api/articles/${route.query.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
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
  const token = useCookie('auth_token');
  
  try {
    const { error } = await useFetch(`/api/articles/${route.query.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
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

<style scoped>
/* Basic, readable styling for Markdown preview without relying on Tailwind Typography */
.markdown-preview {
  color: var(--color-text);
}

.markdown-preview :where(p, ul, ol, blockquote, pre, table) {
  margin-bottom: 1em;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  font-weight: 600;
  line-height: 1.25;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: var(--color-text);
}

.markdown-preview h1 { font-size: 2rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.3em; }
.markdown-preview h2 { font-size: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.25em; }
.markdown-preview h3 { font-size: 1.25rem; }
.markdown-preview h4 { font-size: 1.125rem; }
.markdown-preview h5 { font-size: 1rem; }
.markdown-preview h6 { font-size: 0.875rem; color: var(--color-text-secondary); }

.markdown-preview ul,
.markdown-preview ol {
  padding-left: 1.5rem;
}
.markdown-preview ul { list-style: disc; }
.markdown-preview ol { list-style: decimal; }
.markdown-preview li { margin: 0.25em 0; }

.markdown-preview blockquote {
  border-left: 4px solid var(--color-accent);
  padding-left: 1rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.markdown-preview code {
  background: var(--color-bg-secondary);
  padding: 0.15em 0.35em;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.markdown-preview pre code {
  background: none;
  padding: 0;
  border-radius: 0;
}

.markdown-preview pre {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.markdown-preview a {
  color: var(--color-accent);
  text-decoration: underline;
}

.markdown-preview img {
  max-width: 100%;
  border-radius: 6px;
}

.markdown-preview table {
  width: 100%;
  border-collapse: collapse;
}
.markdown-preview th,
.markdown-preview td {
  border: 1px solid var(--color-border);
  padding: 0.5rem 0.75rem;
}
.markdown-preview thead th {
  background: var(--color-bg-secondary);
}
</style>
