<template>
  <div class="container article-container">
    <div v-if="pending" class="loading">Loading article...</div>
    <div v-else-if="error" class="error">Article not found</div>
    
    <article v-else class="article animate-fade-in">
      <header class="article-header">
        <div class="meta">
          <span class="date">{{ formatDate(article.createdAt) }}</span>
          <span class="separator">•</span>
          <span class="author">{{ article.author }}</span>
        </div>
        <h1 class="title">{{ article.title }}</h1>
        <div v-if="article.coverImage" class="cover-image">
          <img :src="article.coverImage" :alt="article.title" />
        </div>
      </header>

      <div class="content">
        <editor-content :editor="editor" />
      </div>

      <div class="article-footer">
        <NuxtLink to="/" class="back-link">
          <Icon name="ph:arrow-left" /> Back to Articles
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const route = useRoute();
const { data: article, pending, error } = await useFetch(`/api/articles/${route.params.slug}`);

const editor = useEditor({
  content: article.value?.content,
  editable: false,
  extensions: [
    StarterKit,
    Image
  ],
});

// Update editor content when data loads (if initially null)
watch(() => article.value, (newArticle) => {
  if (newArticle && editor.value) {
    editor.value.commands.setContent(newArticle.content);
  }
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.article-container {
  max-width: 800px;
  padding-top: 4rem;
}

.article-header {
  margin-bottom: 4rem;
  text-align: center;
}

.meta {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.title {
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cover-image {
  margin: 2rem -2rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.cover-image img {
  width: 100%;
  height: auto;
  display: block;
}

.content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #d4d4d8;
}

/* Deep selector for Tiptap content styling */
:deep(.ProseMirror) {
  outline: none;
}

:deep(.ProseMirror p) {
  margin-bottom: 1.5em;
}

:deep(.ProseMirror h2) {
  font-size: 2rem;
  margin-top: 2em;
  margin-bottom: 0.75em;
  color: var(--text-primary);
}

:deep(.ProseMirror h3) {
  font-size: 1.5rem;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  color: var(--text-primary);
}

:deep(.ProseMirror ul), :deep(.ProseMirror ol) {
  margin-bottom: 1.5em;
  padding-left: 1.5em;
}

:deep(.ProseMirror li) {
  margin-bottom: 0.5em;
}

:deep(.ProseMirror blockquote) {
  border-left: 4px solid var(--accent-primary);
  padding-left: 1rem;
  margin-left: 0;
  font-style: italic;
  color: var(--text-secondary);
}

:deep(.ProseMirror img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 2rem 0;
}

:deep(.ProseMirror pre) {
  background: #1e1e24;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.9em;
  margin-bottom: 1.5em;
}

.article-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.back-link:hover {
  color: var(--accent-primary);
}
</style>
