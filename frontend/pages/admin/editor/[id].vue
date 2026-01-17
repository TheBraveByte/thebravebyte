<template>
  <div class="container editor-page">
    <div class="editor-header">
      <h1 class="title">{{ isNew ? 'New Article' : 'Edit Article' }}</h1>
      <div class="actions">
        <button @click="save(false)" class="btn btn-ghost" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save Draft' }}
        </button>
        <button @click="save(true)" class="btn btn-primary" :disabled="saving">
          {{ isNew ? 'Publish' : (form.published ? 'Update' : 'Publish') }}
        </button>
      </div>
    </div>

    <div class="form-grid">
      <div class="main-column">
        <div class="form-group">
          <input 
            v-model="form.title" 
            placeholder="Article Title" 
            class="title-input"
          />
        </div>
        
        <div class="form-group">
          <ArticleEditor v-model="form.content" />
        </div>
      </div>

      <div class="sidebar">
        <div class="card">
          <h3>Settings</h3>
          
          <div class="form-group">
            <label>Excerpt</label>
            <textarea 
              v-model="form.excerpt" 
              rows="4" 
              class="input"
              placeholder="Short summary..."
            ></textarea>
          </div>

          <div class="form-group">
            <label>Cover Image URL</label>
            <input 
              v-model="form.coverImage" 
              class="input"
              placeholder="https://..."
            />
          </div>

          <div class="form-group">
            <label>Slug</label>
            <input 
              v-model="form.slug" 
              class="input"
              placeholder="auto-generated"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const isNew = route.params.id === 'create';
const saving = ref(false);

const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: {},
  coverImage: '',
  published: false
});

if (!isNew) {
  const { data } = await useFetch(`${config.public.apiBase}/articles/${route.params.id}`); // We need a get-by-id endpoint or use slug if ID is slug?
  // Actually my API uses ID for PUT but I don't have a GET by ID endpoint exposed yet, only by slug.
  // Wait, I implemented `[slug].get.ts`. I should probably implement `[id].get.ts` for admin or just use the list data?
  // Better to have `[id].get.ts`. I'll add it.
  // For now, let's assume I'll add it.
  if (data.value) {
    form.value = { ...data.value };
  }
}

const save = async (publish) => {
  saving.value = true;
  try {
    const payload = { ...form.value, published: publish || form.value.published };
    
    if (isNew) {
      await $fetch(`${config.public.apiBase}/articles`, {
        method: 'POST',
        body: payload
      });
      router.push('/admin/editor');
    } else {
      await $fetch(`${config.public.apiBase}/articles/${route.params.id}`, {
        method: 'PUT',
        body: payload
      });
    }
  } catch (e) {
    alert('Error saving article: ' + e.message);
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.editor-page {
  padding-top: 2rem;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.title-input {
  width: 100%;
  font-size: 2.5rem;
  font-weight: 700;
  background: transparent;
  border: none;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.title-input:focus {
  outline: none;
}

.card {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.card h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.input {
  width: 100%;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  font-family: inherit;
}

.input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

textarea.input {
  resize: vertical;
}
</style>
