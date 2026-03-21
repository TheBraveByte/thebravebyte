<template>
  <div ref="container" class="markdown-body" v-html="renderedHtml"></div>
</template>

<script setup lang="ts">
import { marked } from 'marked';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import hljs from 'highlight.js';
import mermaid from 'mermaid';
import { useColorMode } from '#imports';

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

const colorMode = useColorMode();

const initializeMermaid = () => {
  const isDark = colorMode.value === 'dark';
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'loose',
    fontFamily: 'Monaco, monospace',
    fontSize: 14,
    themeVariables: {
      lineColor: isDark ? '#e2e8f0' : '#1a1a1a',
      background: 'transparent',
      primaryTextColor: isDark ? '#f1f5f9' : '#1a1a1a',
      nodeTextColor: isDark ? '#f1f5f9' : '#1a1a1a',
      edgeLabelBackground: isDark ? '#0f172a' : '#f8f9fa',
      tertiaryColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      fontFamily: 'Monaco, monospace',
    }
  });
};

// Initialize mermaid
onMounted(() => {
  initializeMermaid();
  renderMermaid();
});

// Re-render mermaid when content or theme changes
watch([() => props.content, () => colorMode.value], () => {
  initializeMermaid();
  nextTick(() => {
    // We need to clear the old SVGs before re-rendering so mermaid parses again
    if (container.value) {
      container.value.querySelectorAll('.mermaid').forEach(el => {
        el.removeAttribute('data-processed');
        // If it already contains an svg, restore original text to parse again
        const code = el.getAttribute('data-original-code');
        if (code) {
          el.innerHTML = code;
        } else {
          el.setAttribute('data-original-code', el.innerHTML);
        }
      });
    }
    renderMermaid();
  });
}, { deep: true });

async function renderMermaid() {
  if (container.value) {
    try {
      const nodes = Array.from(container.value.querySelectorAll('.mermaid'));
      
      // Store original code for re-renders on theme change
      nodes.forEach(el => {
        if (!el.getAttribute('data-original-code')) {
          el.setAttribute('data-original-code', el.innerHTML);
        }
      });

      await mermaid.run({
        nodes: container.value.querySelectorAll('.mermaid'),
      });

      // Inject Zoom/Pan capability
      nextTick(() => {
        addZoomPanToMermaid();
      });
    } catch (e) {
      console.error('Mermaid render failed:', e);
    }
  }
}

function addZoomPanToMermaid() {
  if (!container.value) return;
  const svgs = container.value.querySelectorAll('.mermaid svg');
  
  svgs.forEach((svg) => {
    // Avoid double-wrapping
    if (svg.parentElement?.classList.contains('mermaid-wrapper')) return;

    // Make lines bolder using inline styles
    const paths = svg.querySelectorAll('.edgePath .path, .flowchart-link');
    paths.forEach(p => {
      p.setAttribute('stroke-width', '2.5');
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'mermaid-wrapper';
    
    const controls = document.createElement('div');
    controls.className = 'mermaid-controls';
    
    let scale = 1;
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;

  const svgEl = svg as SVGElement;

    const updateTransform = () => {
      svgEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };

    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '+';
    zoomInBtn.onclick = () => { scale += 0.2; updateTransform(); };
    
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '-';
    zoomOutBtn.onclick = () => { scale = Math.max(0.2, scale - 0.2); updateTransform(); };
    
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '⟲';
    resetBtn.onclick = () => { scale = 1; translateX = 0; translateY = 0; updateTransform(); };

    controls.appendChild(zoomInBtn);
    controls.appendChild(zoomOutBtn);
    controls.appendChild(resetBtn);

    svg.parentNode?.insertBefore(wrapper, svg);
    wrapper.appendChild(controls);
    
    // Create an inner container for the SVG to safely pan/zoom
    const inner = document.createElement('div');
    inner.className = 'mermaid-inner';
    wrapper.appendChild(inner);
    inner.appendChild(svg);
    
    // Initial styles
    svgEl.style.transformOrigin = 'center center';
    svgEl.style.transition = 'transform 0.15s ease-out';
    svgEl.style.cursor = 'grab';
    svgEl.style.maxWidth = 'none';

    // Mouse wheel zoom
    wrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      scale = Math.max(0.2, Math.min(scale + delta, 5));
      updateTransform();
    }, { passive: false });

    // Panning
    inner.addEventListener('mousedown', (e) => {
      isPanning = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      svgEl.style.cursor = 'grabbing';
      svgEl.style.transition = 'none'; // Disable transition during drag for smoothness
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPanning) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      svgEl.style.cursor = 'grab';
      svgEl.style.transition = 'transform 0.15s ease-out';
    });
  });
}
</script>

<style scoped>
/* ─── Base ─────────────────────────────────────────────────── */
.markdown-body {
  color: var(--color-text, #e2e8f0);
  font-size: 1rem;
  line-height: 1.75;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: none;
}

/* ─── Headings ──────────────────────────────────────────────── */
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  color: var(--color-text, #f1f5f9);
  font-weight: 700;
  line-height: 1.25;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.markdown-body :deep(h1) { font-size: 2rem; margin-top: 0; }
.markdown-body :deep(h2) { font-size: 1.5rem; }
.markdown-body :deep(h3) { font-size: 1.25rem; }
.markdown-body :deep(h4) { font-size: 1.1rem; }
.markdown-body :deep(h5) { font-size: 1rem; }
.markdown-body :deep(h6) { font-size: 0.9rem; color: var(--color-text-secondary, #94a3b8); }

/* ─── Paragraphs & Text ─────────────────────────────────────── */
.markdown-body :deep(p) {
  margin-bottom: 1.25rem;
}

.markdown-body :deep(strong) {
  color: var(--color-text, #f1f5f9);
  font-weight: 700;
}

.markdown-body :deep(em) {
  font-style: italic;
}

.markdown-body :deep(del) {
  text-decoration: line-through;
  color: var(--color-text-secondary, #94a3b8);
}

/* ─── Links ─────────────────────────────────────────────────── */
.markdown-body :deep(a) {
  color: #38bdf8;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s;
}

.markdown-body :deep(a:hover) {
  color: #7dd3fc;
}

/* ─── Lists ─────────────────────────────────────────────────── */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.75rem;
  margin-bottom: 1.25rem;
}

.markdown-body :deep(ul) {
  list-style: disc;
}

.markdown-body :deep(ol) {
  list-style: decimal;
}

.markdown-body :deep(li) {
  margin-bottom: 0.35rem;
  line-height: 1.7;
}

.markdown-body :deep(li > ul),
.markdown-body :deep(li > ol) {
  margin-top: 0.35rem;
  margin-bottom: 0;
}

/* ─── Blockquote ────────────────────────────────────────────── */
.markdown-body :deep(blockquote) {
  border-left: 3px solid rgba(56, 189, 248, 0.5);
  padding: 0.75rem 1rem 0.75rem 1.25rem;
  margin: 1.5rem 0;
  background: rgba(56, 189, 248, 0.05);
  border-radius: 0 8px 8px 0;
  color: var(--color-text-secondary, #94a3b8);
  font-style: italic;
}

.markdown-body :deep(blockquote p) {
  margin-bottom: 0;
}

/* ─── Horizontal Rule ───────────────────────────────────────── */
.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

/* ─── Code (inline) ─────────────────────────────────────────── */
.markdown-body :deep(code:not(.hljs)) {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 5px;
  padding: 0.15em 0.45em;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.88em;
  color: #f472b6;
  word-break: break-all;
}

/* ─── Code blocks (fenced) ──────────────────────────────────── */
.markdown-body :deep(pre) {
  background: var(--color-code-bg, #0f172a);
  padding: 1.1rem 1.25rem;
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  /* Force single-axis scroll, no word-wrap */
  white-space: pre;
}

.markdown-body :deep(pre code),
.markdown-body :deep(code.hljs) {
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 11.5px;
  line-height: 1.65;
  color: var(--color-code-text, #e2e8f0);
  white-space: pre;
  word-break: normal;
  overflow-wrap: normal;
}

/* ─── Mermaid ───────────────────────────────────────────────── */
.markdown-body :deep(.mermaid) {
  background: transparent !important;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  font-family: 'Monaco', monospace !important;
}

/* ─── Tables ────────────────────────────────────────────────── */
.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: 0.92rem;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 0.65rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.markdown-body :deep(th) {
  background: rgba(255, 255, 255, 0.05);
  font-weight: 600;
  color: var(--color-text, #f1f5f9);
}

.markdown-body :deep(tr:last-child td) {
  border-bottom: none;
}

.markdown-body :deep(tr:hover td) {
  background: rgba(255, 255, 255, 0.025);
}

/* ─── Images ────────────────────────────────────────────────── */
.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 1.5rem 0;
  display: block;
}

/* ─── Syntax Highlight Theme ────────────────────────────────── */
.markdown-body :deep(.hljs-comment),
.markdown-body :deep(.hljs-quote) {
  color: var(--hljs-comment, #64748b);
  font-style: italic;
}

.markdown-body :deep(.hljs-keyword),
.markdown-body :deep(.hljs-selector-tag),
.markdown-body :deep(.hljs-addition) {
  color: var(--hljs-keyword, #f472b6);
}

.markdown-body :deep(.hljs-number),
.markdown-body :deep(.hljs-string),
.markdown-body :deep(.hljs-meta),
.markdown-body :deep(.hljs-symbol),
.markdown-body :deep(.hljs-bullet) {
  color: var(--hljs-string, #4ade80);
}

.markdown-body :deep(.hljs-title),
.markdown-body :deep(.hljs-section),
.markdown-body :deep(.hljs-name),
.markdown-body :deep(.hljs-selector-id),
.markdown-body :deep(.hljs-selector-class) {
  color: var(--hljs-title, #38bdf8);
}

.markdown-body :deep(.hljs-attribute),
.markdown-body :deep(.hljs-attr),
.markdown-body :deep(.hljs-variable),
.markdown-body :deep(.hljs-template-variable),
.markdown-body :deep(.hljs-class .hljs-title),
.markdown-body :deep(.hljs-type) {
  color: var(--hljs-variable, #fbbf24);
}

.markdown-body :deep(.hljs-built_in),
.markdown-body :deep(.hljs-params),
.markdown-body :deep(.hljs-formula),
.markdown-body :deep(.hljs-link) {
  color: var(--hljs-built_in, #818cf8);
}

.markdown-body :deep(.hljs-deletion) {
  color: var(--hljs-deletion, #f87171);
}

.markdown-body :deep(.hljs-emphasis) {
  font-style: italic;
}

.markdown-body :deep(.hljs-strong) {
  font-weight: bold;
}
</style>
