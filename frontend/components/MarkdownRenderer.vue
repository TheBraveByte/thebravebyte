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
    fontFamily: 'Monaco, monospace',
    fontSize: 11.5,
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
  font-family: 'Monaco', monospace !important;
}

.markdown-renderer :deep(pre) {
  background: #0f172a;
  padding: 1rem;
  border-radius: 12px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.markdown-renderer :deep(code.hljs) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-family: 'Monaco', monospace;
  font-size: 11.5px;
  line-height: 1.6;
}

/* Antigravity Theme Colors */
.markdown-renderer :deep(.hljs-comment),
.markdown-renderer :deep(.hljs-quote) {
  color: #64748b;
  font-style: italic;
}

.markdown-renderer :deep(.hljs-keyword),
.markdown-renderer :deep(.hljs-selector-tag),
.markdown-renderer :deep(.hljs-addition) {
  color: #f472b6; /* Pink */
}

.markdown-renderer :deep(.hljs-number),
.markdown-renderer :deep(.hljs-string),
.markdown-renderer :deep(.hljs-meta),
.markdown-renderer :deep(.hljs-symbol),
.markdown-renderer :deep(.hljs-bullet) {
  color: #4ade80; /* Green */
}

.markdown-renderer :deep(.hljs-title),
.markdown-renderer :deep(.hljs-section),
.markdown-renderer :deep(.hljs-name),
.markdown-renderer :deep(.hljs-selector-id),
.markdown-renderer :deep(.hljs-selector-class) {
  color: #38bdf8; /* Sky Blue */
}

.markdown-renderer :deep(.hljs-attribute),
.markdown-renderer :deep(.hljs-attr),
.markdown-renderer :deep(.hljs-variable),
.markdown-renderer :deep(.hljs-template-variable),
.markdown-renderer :deep(.hljs-class .hljs-title),
.markdown-renderer :deep(.hljs-type) {
  color: #fbbf24; /* Amber */
}

.markdown-renderer :deep(.hljs-built_in),
.markdown-renderer :deep(.hljs-params),
.markdown-renderer :deep(.hljs-formula),
.markdown-renderer :deep(.hljs-link) {
  color: #818cf8; /* Indigo */
}

.markdown-renderer :deep(.hljs-emphasis) {
  font-style: italic;
}

.markdown-renderer :deep(.hljs-strong) {
  font-weight: bold;
}
</style>
