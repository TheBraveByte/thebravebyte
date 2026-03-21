<template>
  <div ref="container" class="markdown-renderer prose prose-invert max-w-none" v-html="renderedHtml"></div>
</template>

<script setup lang="ts">
import { marked } from 'marked';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import mermaid from 'mermaid';

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: ''
  }
});

const container = ref<HTMLElement | null>(null);

// Configure marked
marked.use(mangle());
marked.use(gfmHeadingId());

const renderer = new marked.Renderer();

// Custom code block renderer for mermaid and highlighting
renderer.code = function ({ text, lang, escaped }) {
  if (lang === 'mermaid') {
    return `<pre class="mermaid">${text}</pre>`;
  }
  
  const validLanguage = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language: validLanguage }).value;
  
  return `<pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`;
};

const renderedHtml = computed(() => {
  return marked.parse(props.content, { renderer });
});

// Initialize mermaid
onMounted(() => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
  });
  renderMermaid();
});

// Re-render mermaid when content changes
watch(() => props.content, () => {
  nextTick(() => {
    renderMermaid();
  });
});

async function renderMermaid() {
  if (container.value) {
    try {
      await mermaid.run({
        nodes: container.value.querySelectorAll('.mermaid'),
      });
    } catch (e) {
      console.error('Mermaid render failed:', e);
    }
  }
}
</script>

<style scoped>
.markdown-renderer :deep(.mermaid) {
  background: transparent !important;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.markdown-renderer :deep(pre) {
  background: #1e1e24;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-border);
}

.markdown-renderer :deep(code.hljs) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.markdown-renderer :deep(.hljs-comment),
.markdown-renderer :deep(.hljs-quote) {
  color: #7285b7;
}

.markdown-renderer :deep(.hljs-variable),
.markdown-renderer :deep(.hljs-template-variable),
.markdown-renderer :deep(.hljs-tag),
.markdown-renderer :deep(.hljs-name),
.markdown-renderer :deep(.hljs-selector-id),
.markdown-renderer :deep(.hljs-selector-class),
.markdown-renderer :deep(.hljs-regexp),
.markdown-renderer :deep(.hljs-deletion) {
  color: #ff9da4;
}

.markdown-renderer :deep(.hljs-number),
.markdown-renderer :deep(.hljs-built_in),
.markdown-renderer :deep(.hljs-builtin-name),
.markdown-renderer :deep(.hljs-literal),
.markdown-renderer :deep(.hljs-type),
.markdown-renderer :deep(.hljs-params),
.markdown-renderer :deep(.hljs-meta),
.markdown-renderer :deep(.hljs-link) {
  color: #ffc58f;
}

.markdown-renderer :deep(.hljs-attribute) {
  color: #ffeead;
}

.markdown-renderer :deep(.hljs-string),
.markdown-renderer :deep(.hljs-symbol),
.markdown-renderer :deep(.hljs-bullet),
.markdown-renderer :deep(.hljs-addition) {
  color: #d1f1a9;
}

.markdown-renderer :deep(.hljs-title),
.markdown-renderer :deep(.hljs-section) {
  color: #bbdaff;
}

.markdown-renderer :deep(.hljs-keyword),
.markdown-renderer :deep(.hljs-selector-tag) {
  color: #ebbbff;
}
</style>
