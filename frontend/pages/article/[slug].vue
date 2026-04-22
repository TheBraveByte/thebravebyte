<template>
  <div class="pt-16 md:pt-20 pb-16">
    <div class="container">
      <div v-if="pending" class="text-sm text-text-muted py-8">Loading…</div>
      <div v-else-if="error" class="text-sm text-text-muted py-8">Article not found.</div>

      <article v-else>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-8"
        >
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
          Writing
        </NuxtLink>

        <header class="mb-8">
          <div class="flex items-center gap-2 text-xs text-text-muted mb-3">
            <span>{{ formatDate(article.createdAt) }}</span>
            <span>·</span>
            <span>{{ article.author }}</span>
          </div>
          <h1 class="text-2xl md:text-[28px] font-semibold text-text leading-[1.2] tracking-tight">
            {{ article.title }}
          </h1>
          <div v-if="article.coverImage" class="mt-6 rounded-md overflow-hidden border border-border">
            <img :src="article.coverImage" :alt="article.title" class="w-full block" />
          </div>
        </header>

        <div class="content">
          <div v-if="isMarkdown" class="prose-content">
            <MarkdownRenderer :content="parsedContent.markdown" />
          </div>
          <editor-content v-else :editor="editor" />
        </div>

        <footer class="mt-12 pt-6 border-t border-border">
          <NuxtLink to="/blog" class="text-sm text-text-muted hover:text-text transition-colors inline-flex items-center gap-1.5">
            <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
            Back to writing
          </NuxtLink>
        </footer>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { createEmptyRichTextDoc, parseArticleContent } from '~/utils/articleContent'

const route = useRoute();
const config = useRuntimeConfig();
const { data: article, pending, error } = await useFetch(`${config.public.apiBase}/articles/${route.params.slug}`);

const parsedContent = computed(() => parseArticleContent(article.value?.content));
const isMarkdown = computed(() => parsedContent.value.mode === 'markdown');

useSeoMeta({
  title: () => article.value?.title ? `${article.value.title} | Yusuf Akinleye` : 'Article | Yusuf Akinleye',
  ogTitle: () => article.value?.title || 'Yusuf Akinleye',
  description: () => article.value?.excerpt || 'Read the full article.',
  ogDescription: () => article.value?.excerpt || 'Read the full article.',
  ogImage: () => article.value?.coverImage || `${config.public.siteUrl}/og-image.jpg`,
  twitterCard: 'summary_large_image',
  twitterImage: () => article.value?.coverImage || `${config.public.siteUrl}/og-image.jpg`,
});

const editor = useEditor({
  content: isMarkdown.value ? createEmptyRichTextDoc() : parsedContent.value.richText,
  editable: false,
  extensions: [StarterKit, Image],
});

watch(() => article.value, (newArticle) => {
  if (newArticle && editor.value && !isMarkdown.value) {
    editor.value.commands.setContent(parsedContent.value.richText);
  }
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.content {
  font-size: 15px;
  line-height: 1.75;
  color: var(--color-text-secondary);
}

.prose-content :deep(p) { margin-bottom: 1.2em; }
.prose-content :deep(h1),
.prose-content :deep(h2),
.prose-content :deep(h3) {
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.01em;
}
.prose-content :deep(h1) { font-size: 1.5rem; margin: 2em 0 0.5em; }
.prose-content :deep(h2) { font-size: 1.25rem; margin: 1.75em 0 0.5em; }
.prose-content :deep(h3) { font-size: 1.1rem; margin: 1.5em 0 0.5em; }

.prose-content :deep(ul),
.prose-content :deep(ol) { margin-bottom: 1.2em; padding-left: 1.4em; }
.prose-content :deep(li) { margin-bottom: 0.3em; }

.prose-content :deep(blockquote) {
  border-left: 2px solid var(--color-border);
  padding-left: 1em;
  margin: 1.25em 0;
  color: var(--color-text-secondary);
  font-style: italic;
}
.prose-content :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 1.5em 0;
}
.prose-content :deep(pre) {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  overflow-x: auto;
  font-size: 13px;
  margin-bottom: 1.25em;
}
.prose-content :deep(code) {
  background: var(--color-bg-secondary);
  padding: 0.15em 0.35em;
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 0.88em;
}
.prose-content :deep(pre code) { background: none; padding: 0; }
.prose-content :deep(a) {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--color-border);
}
.prose-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2em 0;
}

:deep(.ProseMirror) { outline: none; }
:deep(.ProseMirror p) { margin-bottom: 1.2em; }
:deep(.ProseMirror h2),
:deep(.ProseMirror h3) {
  font-weight: 600;
  color: var(--color-text);
}
:deep(.ProseMirror h2) { font-size: 1.25rem; margin: 1.75em 0 0.5em; }
:deep(.ProseMirror h3) { font-size: 1.1rem; margin: 1.5em 0 0.5em; }
:deep(.ProseMirror blockquote) {
  border-left: 2px solid var(--color-border);
  padding-left: 1em;
  font-style: italic;
}
:deep(.ProseMirror img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 1.5em 0;
}
:deep(.ProseMirror pre) {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  overflow-x: auto;
  font-size: 13px;
}
</style>
