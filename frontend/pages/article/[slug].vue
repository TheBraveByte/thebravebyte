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
        <!-- Markdown Content -->
        <div v-if="isMarkdown" class="prose-content" v-html="htmlContent"></div>
        
        <!-- Rich Text Content (TipTap) -->
        <editor-content v-else :editor="editor" />
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
import { marked } from 'marked'

const route = useRoute();
const config = useRuntimeConfig();
const { data: article, pending, error } = await useFetch(`${config.public.apiBase}/articles/${route.params.slug}`);

// Detect if content is markdown (string) or rich text (object)
const isMarkdown = computed(() => typeof article.value?.content === 'string');

// For markdown content
const htmlContent = computed(() => {
  if (!isMarkdown.value || !article.value?.content) return '';
  return marked.parse(article.value.content);
});

// For rich text content (TipTap)
const editor = useEditor({
  content: isMarkdown.value ? '' : article.value?.content,
  editable: false,
  extensions: [
    StarterKit,
    Image
  ],
});

// Update editor content when data loads (if initially null)
watch(() => article.value, (newArticle) => {
  if (newArticle && editor.value && !isMarkdown.value) {
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
  color: var(--color-text);
}

.cover-image {
  margin: 2rem -2rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.cover-image img {
  width: 100%;
  height: auto;
  display: block;
}

.content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

/* Markdown prose styling */
.prose-content {
  color: var(--color-text-secondary);
}

.prose-content :deep(p) {
  margin-bottom: 1.5em;
}

.prose-content :deep(h1) {
  font-size: 2.5rem;
  margin-top: 2em;
  margin-bottom: 0.75em;
  color: var(--color-text);
  font-weight: 600;
}

.prose-content :deep(h2) {
  font-size: 2rem;
  margin-top: 2em;
  margin-bottom: 0.75em;
  color: var(--color-text);
  font-weight: 600;
}

.prose-content :deep(h3) {
  font-size: 1.5rem;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  color: var(--color-text);
  font-weight: 600;
}

.prose-content :deep(ul), .prose-content :deep(ol) {
  margin-bottom: 1.5em;
  padding-left: 1.5em;
}

.prose-content :deep(li) {
  margin-bottom: 0.5em;
}

.prose-content :deep(blockquote) {
  border-left: 4px solid var(--color-accent);
  padding-left: 1rem;
  margin-left: 0;
  font-style: italic;
  color: var(--color-text-secondary);
  margin-bottom: 1.5em;
}

.prose-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 2rem 0;
}

.prose-content :deep(pre) {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.9em;
  margin-bottom: 1.5em;
  border: 1px solid var(--color-border);
}

.prose-content :deep(code) {
  background: var(--color-bg-secondary);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.prose-content :deep(pre code) {
  background: none;
  padding: 0;
}

.prose-content :deep(a) {
  color: var(--accent-primary);
  text-decoration: underline;
}

.prose-content :deep(a:hover) {
  color: var(--accent-secondary);
}

.prose-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 2em 0;
}

.prose-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
}

.prose-content :deep(th), .prose-content :deep(td) {
  border: 1px solid var(--border-color);
  padding: 0.75em;
  text-align: left;
}

.prose-content :deep(th) {
  background: rgba(255, 255, 255, 0.05);
  font-weight: 600;
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
