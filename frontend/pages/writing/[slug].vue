<template>
  <div class="page pt-14 md:pt-20">
    <div class="read-progress" aria-hidden="true" />
    <div class="offset">
      <!-- Engineering note, from the repo's stories/ folder -->
      <article>
        <header class="enter">
          <h1 class="text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] md:text-[34px]">{{ note.title }}</h1>
          <p class="mt-3 font-mono text-[13px] text-text-muted">{{ note.context }}</p>
        </header>
        <div class="prose-content enter mt-10" style="--i: 2">
          <MarkdownRenderer :content="note.body" />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { findNote } from '~/utils/notes'

const route = useRoute()
const found = findNote(String(route.params.slug))
// Articles moved to Hashnode; the two that lived here redirect there (nuxt.config routeRules).
if (!found) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
const note = found

useSeoMeta({
  title: `${note.title} | Yusuf Akinleye`,
  ogTitle: note.title,
  description: note.context,
  ogDescription: note.context,
  ogType: 'article',
})
</script>

<style>
.prose-content { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }
.prose-content p { margin-bottom: 1.2em; }
.prose-content h2, .prose-content h4 {
  color: var(--color-text); font-weight: 600; letter-spacing: -0.01em; line-height: 1.3;
}
/* Notes use h3 for Problem, Context, Decision...: render them as record labels. */
.prose-content h3 {
  font-family: var(--font-mono) !important; font-size: 13px !important; font-weight: 400 !important;
  letter-spacing: 0 !important; text-transform: none !important; color: var(--color-text-muted) !important;
  margin: 2.2em 0 0.5em !important;
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
.prose-content img { max-width: 100%; border-radius: 6px; margin: 1.5em 0; border: 1px solid var(--color-border); }
.prose-content pre {
  background: var(--color-code-bg); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-border);
  overflow-x: auto; font-family: var(--font-mono); font-size: 14px; line-height: 1.6; margin-bottom: 1.4em;
}
.prose-content code { background: var(--color-bg-secondary); padding: 0.12em 0.35em; border-radius: 4px; font-family: var(--font-mono); font-size: 0.88em; color: var(--color-text); }
.prose-content pre code { background: none; padding: 0; }
.prose-content hr { border: none; border-top: 1px solid var(--color-border); margin: 2.5em 0; }
.prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.4em; font-size: 15px; }
.prose-content th, .prose-content td { text-align: left; padding: 0.5em 0.75em; border-bottom: 1px solid var(--color-border); }
</style>
