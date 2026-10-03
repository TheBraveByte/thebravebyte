<template>
  <div class="markdown-body" v-html="html" />
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'

// Renders the engineering notes in stories/, which are plain prose: no code, no diagrams.
marked.use(gfmHeadingId())

const props = defineProps<{ content: string }>()
const html = computed(() => marked.parse(props.content) as string)
</script>

<style scoped>
.markdown-body { word-break: break-word; overflow-wrap: break-word; }
.markdown-body :deep(em) { font-style: italic; }
.markdown-body :deep(code) {
  background: var(--color-bg-secondary); border-radius: 4px; padding: 0.12em 0.35em;
  font-family: var(--font-mono); font-size: 0.88em; color: var(--color-text);
}
</style>
