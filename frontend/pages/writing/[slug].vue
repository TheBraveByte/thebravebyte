<template>
  <div class="mx-auto max-w-[736px] px-4 pt-12 md:px-8 md:pt-16">
    <div>
      <NuxtLink to="/writing" class="text-link">← Writing</NuxtLink>

      <!-- Engineering note, from the repo's stories/ folder -->
      <article v-if="note" class="mt-10">
        <header>
          <div class="border-b border-border pb-3"><span class="label">Note</span></div>
          <h1 class="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-[44px]">{{ note.title }}</h1>
          <p class="mt-4 font-mono text-[13px] text-text-muted">{{ note.context }}</p>
        </header>
        <div class="prose-content mt-10">
          <MarkdownRenderer :content="note.body" />
        </div>
      </article>

      <!-- Article from the CMS -->
      <template v-else>
        <div v-if="pending" class="mt-8 space-y-4" aria-hidden="true">
          <div class="h-10 w-3/4 animate-pulse rounded-lg bg-bg-secondary motion-reduce:animate-none" />
          <div class="h-4 w-1/3 animate-pulse rounded bg-bg-secondary motion-reduce:animate-none" />
          <div class="mt-8 h-64 animate-pulse rounded-xl bg-bg-secondary motion-reduce:animate-none" />
        </div>
        <div v-else-if="error || !article" class="mt-8">
          <h1 class="text-2xl font-semibold tracking-tight">This piece isn't here.</h1>
          <p class="mt-3 text-text-secondary">
            It may have moved. Everything that's published is listed on the
            <NuxtLink to="/writing" class="prose-link text-text">writing page</NuxtLink>.
          </p>
        </div>
        <article v-else class="mt-8">
          <header>
            <h1 class="text-4xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-[44px]">{{ article.title }}</h1>
            <p class="mt-4 font-mono text-[13px] text-text-muted">
              <time :datetime="article.publishedAt || article.createdAt">{{ formatDate(article.publishedAt || article.createdAt) }}</time>
            </p>
            <img v-if="article.coverImage" :src="article.coverImage" :alt="''" class="mt-8 w-full border border-border" />
          </header>
          <div class="prose-content mt-10">
            <MarkdownRenderer v-if="isMarkdown" :content="parsedContent.markdown" />
            <EditorContent v-else :editor="editor" />
          </div>
        </article>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { createEmptyRichTextDoc, parseArticleContent } from '~/utils/articleContent'
import { findNote } from '~/utils/notes'

const route = useRoute()
const config = useRuntimeConfig()
const slug = String(route.params.slug)
const note = findNote(slug)

const { data: article, pending, error } = note
  ? { data: ref<any>(null), pending: ref(false), error: ref(null) }
  : await useFetch<any>(`${config.public.apiBase}/articles/${slug}`)

const parsedContent = computed(() => parseArticleContent(article.value?.content))
const isMarkdown = computed(() => parsedContent.value.mode === 'markdown')

const editor = note
  ? ref(undefined)
  : useEditor({
      content: isMarkdown.value ? createEmptyRichTextDoc() : parsedContent.value.richText,
      editable: false,
      extensions: [StarterKit, Image],
    })

watch(article, () => {
  if (editor.value && !isMarkdown.value) editor.value.commands.setContent(parsedContent.value.richText)
})

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const title = computed(() => note?.title ?? article.value?.title ?? 'Writing')
const description = computed(() => note?.context ?? article.value?.excerpt ?? '')
useSeoMeta({
  title: () => `${title.value} | Yusuf Akinleye`,
  ogTitle: () => title.value,
  description: () => description.value,
  ogDescription: () => description.value,
  ogType: 'article',
})
</script>

<style>
.prose-content { font-size: 17px; line-height: 1.75; color: var(--color-text-secondary); }
.prose-content p { margin-bottom: 1.2em; }
.prose-content h2, .prose-content h4 {
  color: var(--color-text); font-weight: 600; letter-spacing: -0.01em; line-height: 1.3;
}
/* Notes use h3 for Problem, Context, Decision...: render them as record labels. */
.prose-content h3 {
  font-family: var(--font-mono) !important; font-size: 11px !important; font-weight: 400 !important;
  letter-spacing: 0.14em !important; text-transform: uppercase !important; color: var(--color-text-muted) !important;
  border-top: 1px solid var(--color-border); padding-top: 1rem; margin: 2.4em 0 0.9em !important;
}
.prose-content h2 { font-size: 1.4rem; margin: 2em 0 0.6em; }
.prose-content > div > h3:first-child, .prose-content h3:first-child { margin-top: 0; }
.prose-content ul, .prose-content ol { margin-bottom: 1.2em; padding-left: 1.3em; }
.prose-content ul { list-style: disc; }
.prose-content ol { list-style: decimal; }
.prose-content li { margin-bottom: 0.4em; }
.prose-content li::marker { color: var(--color-text-muted); }
.prose-content strong { color: var(--color-text); font-weight: 600; }
.prose-content a { color: var(--color-text); text-decoration: underline; text-decoration-color: var(--color-border); text-underline-offset: 4px; }
.prose-content a:hover { text-decoration-color: var(--color-text); }
.prose-content blockquote { border-left: 2px solid var(--color-border); padding-left: 1em; margin: 1.5em 0; }
.prose-content img { max-width: 100%; border-radius: 0; margin: 1.5em 0; border: 1px solid var(--color-border); }
.prose-content pre {
  background: var(--color-code-bg); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-border);
  overflow-x: auto; font-family: var(--font-mono); font-size: 14px; line-height: 1.6; margin-bottom: 1.4em;
}
.prose-content code { background: var(--color-bg-secondary); padding: 0.12em 0.35em; border-radius: 4px; font-family: var(--font-mono); font-size: 0.88em; color: var(--color-text); }
.prose-content pre code { background: none; padding: 0; }
.prose-content hr { border: none; border-top: 1px solid var(--color-border); margin: 2.5em 0; }
.prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.4em; font-size: 15px; }
.prose-content th, .prose-content td { text-align: left; padding: 0.5em 0.75em; border-bottom: 1px solid var(--color-border); }
.prose-content .ProseMirror { outline: none; }
</style>
