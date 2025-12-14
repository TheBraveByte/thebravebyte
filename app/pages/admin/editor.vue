<template>
  <div class="min-h-screen bg-bg dark:bg-bg-dark flex flex-col">
    <!-- Toolbar -->
    <div class="h-16 border-b border-border dark:border-border-dark flex items-center justify-between px-6 bg-bg dark:bg-bg-dark z-20">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/blogs" class="text-text-secondary dark:text-text-secondary-dark hover:text-text dark:hover:text-text transition-colors">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <h1 class="font-mono text-sm font-bold text-text dark:text-text uppercase tracking-wider">
          {{ isEditing ? 'EDIT_PROTOCOL' : 'INIT_NEW_ENTRY' }}
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <select v-model="form.status" class="bg-gray-50 dark:bg-white/5 border border-border dark:border-border-dark text-xs font-mono p-2 rounded focus:outline-none">
          <option value="draft">DRAFT</option>
          <option value="published">PUBLISHED</option>
        </select>
        <button @click="save" :disabled="saving" class="px-6 py-2 bg-text dark:bg-white text-bg dark:text-black hover:bg-accent dark:hover:bg-accent-dark hover:text-white transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Icon v-if="saving" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <span v-else>SAVE_DATA</span>
        </button>
      </div>
    </div>

    <!-- Main Editor Area -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left: Editor Inputs -->
      <div class="w-1/2 flex flex-col border-r border-border dark:border-border-dark bg-gray-50/50 dark:bg-black/20">
        <div class="p-6 space-y-4 border-b border-border dark:border-border-dark">
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="Article Title" 
            class="w-full bg-transparent text-2xl font-bold text-text dark:text-text placeholder-text-secondary/50 focus:outline-none"
          />
          <div class="grid grid-cols-2 gap-4">
            <input 
              v-model="form.slug" 
              type="text" 
              placeholder="url-slug" 
              class="w-full bg-transparent font-mono text-xs text-text-secondary dark:text-text-secondary-dark focus:outline-none border-b border-transparent focus:border-accent"
            />
            <input 
              v-model="form.image" 
              type="text" 
              placeholder="Cover Image URL" 
              class="w-full bg-transparent font-mono text-xs text-text-secondary dark:text-text-secondary-dark focus:outline-none border-b border-transparent focus:border-accent"
            />
          </div>
        </div>
        <textarea 
          v-model="form.content" 
          class="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed text-text dark:text-text"
          placeholder="Start writing markdown..."
        ></textarea>
      </div>

      <!-- Right: Preview -->
      <div class="w-1/2 overflow-y-auto p-8 prose dark:prose-invert max-w-none">
        <div v-if="!form.content && !form.title" class="h-full flex items-center justify-center text-text-secondary dark:text-text-secondary-dark font-mono text-xs">
          PREVIEW_OFFLINE
        </div>
        <div v-else>
          <h1>{{ form.title }}</h1>
          <div v-html="renderedContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from 'marked';

definePageMeta({
  layout: 'none',
  middleware: async (to, from) => {
    try {
      await $fetch('/api/auth/me');
    } catch (e) {
      return navigateTo('/login');
    }
  }
});

const route = useRoute();
const router = useRouter();
const isEditing = computed(() => !!route.query.id);
const saving = ref(false);

const form = reactive({
  title: '',
  slug: '',
  content: '',
  image: '',
  status: 'draft'
});

// Load data if editing
if (isEditing.value) {
  const { data } = await useFetch(`/api/articles/${route.query.id}`);
  if (data.value) {
    Object.assign(form, data.value);
  }
}

const renderedContent = computed(() => {
  return marked(form.content || '');
});

// Auto-generate slug from title if empty
watch(() => form.title, (newTitle) => {
  if (!isEditing.value && !form.slug && newTitle) {
    form.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

const save = async () => {
  saving.value = true;
  try {
    const endpoint = isEditing.value ? `/api/articles/${route.query.id}` : '/api/articles';
    const method = isEditing.value ? 'PUT' : 'POST';
    
    await $fetch(endpoint, {
      method,
      body: form
    });
    
    router.push('/admin/blogs');
  } catch (e) {
    alert('Failed to save article');
  } finally {
    saving.value = false;
  }
};
</script>
