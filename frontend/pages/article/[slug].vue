<template>
  <div class="min-h-screen bg-bg pt-28 md:pt-32 pb-20">
    <div class="container mx-auto px-6 max-w-3xl">
      <div v-if="pending" class="font-mono text-xs text-text-muted uppercase tracking-[0.22em] py-12">
        Loading article…
      </div>
      <div v-else-if="error" class="font-mono text-xs text-text-muted uppercase tracking-[0.22em] py-12">
        — Article not found.
      </div>

      <article v-else class="animate-fade-in">
        <header class="mb-16 pb-10 border-b-[1.5px] border-ink">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-10 hover:text-text transition-colors"
          >
            <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
            Back to archive
          </NuxtLink>

          <div class="flex flex-wrap items-center gap-4 font-mono text-[10px] text-text-muted uppercase tracking-[0.22em] mb-6">
            <span>{{ formatDate(article.createdAt) }}</span>
            <span class="inline-block w-1 h-1 bg-text-muted"></span>
            <span>{{ article.author }}</span>
          </div>

          <h1 class="font-serif text-5xl md:text-6xl text-text leading-[1.02] tracking-tight">
            {{ article.title }}
          </h1>

          <div v-if="article.coverImage" class="mt-10 border-[1.5px] border-ink overflow-hidden">
            <img :src="article.coverImage" :alt="article.title" class="w-full block" />
          </div>
        </header>

        <div class="content">
          <div v-if="isMarkdown" class="prose-content">
            <MarkdownRenderer :content="parsedContent.markdown" />
          </div>
          <editor-content v-else :editor="editor" />
        </div>

        <footer class="mt-20 pt-8 border-t-[1.5px] border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <NuxtLink to="/blog" class="btn-secondary">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            More writing
          </NuxtLink>
          <p class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
            Thoughts? Reach out via /contact
          </p>
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
  title: () => article.value?.title ? `${article.value.title} | The Brave Byte` : 'Article | The Brave Byte',
  ogTitle: () => article.value?.title || 'The Brave Byte',
  description: () => article.value?.excerpt || 'Read the full article on The Brave Byte.',
  ogDescription: () => article.value?.excerpt || 'Read the full article on The Brave Byte.',
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
  return new Date(date)
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .toUpperCase();
};
</script>

<style scoped>
.content {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  font-family: var(--font-sans);
}

.prose-content {
  color: var(--color-text-secondary);
}

.prose-content :deep(p) { margin-bottom: 1.4em; }
.prose-content :deep(h1) {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 2.5rem;
  margin-top: 2em;
  margin-bottom: 0.6em;
  color: var(--color-text);
  letter-spacing: -0.01em;
}
.prose-content :deep(h2) {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 2rem;
  margin-top: 2em;
  margin-bottom: 0.6em;
  color: var(--color-text);
}
.prose-content :deep(h3) {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 1.5em;
  margin-bottom: 0.6em;
  color: var(--color-text);
}
.prose-content :deep(ul),
.prose-content :deep(ol) { margin-bottom: 1.4em; padding-left: 1.4em; }
.prose-content :deep(li) { margin-bottom: 0.4em; }
.prose-content :deep(blockquote) {
  border-left: 3px solid var(--color-ink);
  padding: 0.25em 0 0.25em 1.25em;
  margin: 1.5em 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--color-text);
}
.prose-content :deep(img) {
  max-width: 100%;
  border: 1.5px solid var(--color-ink);
  margin: 2em 0;
}
.prose-content :deep(pre) {
  background: var(--color-bg-secondary);
  padding: 1.25rem;
  border: 1.5px solid var(--color-ink);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.88em;
  margin-bottom: 1.5em;
}
.prose-content :deep(code) {
  background: var(--color-bg-secondary);
  padding: 0.15em 0.35em;
  font-family: var(--font-mono);
  font-size: 0.88em;
  border: 1px solid var(--color-border);
}
.prose-content :deep(pre code) { background: none; padding: 0; border: 0; }
.prose-content :deep(a) {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.prose-content :deep(hr) {
  border: none;
  border-top: 1.5px solid var(--color-ink);
  margin: 3em 0;
}
.prose-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  border: 1.5px solid var(--color-ink);
}
.prose-content :deep(th),
.prose-content :deep(td) {
  border: 1px solid var(--color-border);
  padding: 0.6em 0.8em;
  text-align: left;
  font-family: var(--font-sans);
}
.prose-content :deep(th) {
  background: var(--color-bg-secondary);
  font-weight: 600;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

:deep(.ProseMirror) { outline: none; }
:deep(.ProseMirror p) { margin-bottom: 1.4em; }
:deep(.ProseMirror h2) {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 2rem;
  margin-top: 2em;
  margin-bottom: 0.6em;
  color: var(--color-text);
}
:deep(.ProseMirror h3) {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 1.5em;
  margin-bottom: 0.6em;
  color: var(--color-text);
}
:deep(.ProseMirror ul), :deep(.ProseMirror ol) { margin-bottom: 1.4em; padding-left: 1.4em; }
:deep(.ProseMirror li) { margin-bottom: 0.4em; }
:deep(.ProseMirror blockquote) {
  border-left: 3px solid var(--color-ink);
  padding: 0.25em 0 0.25em 1.25em;
  margin: 1.5em 0;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--color-text);
}
:deep(.ProseMirror img) {
  max-width: 100%;
  border: 1.5px solid var(--color-ink);
  margin: 2em 0;
}
:deep(.ProseMirror pre) {
  background: var(--color-bg-secondary);
  padding: 1.25rem;
  border: 1.5px solid var(--color-ink);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.88em;
  margin-bottom: 1.5em;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
