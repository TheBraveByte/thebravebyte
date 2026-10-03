<template>
  <svg viewBox="0 0 640 400" role="img" aria-labelledby="pd-title pd-desc" class="h-full w-full">
    <title id="pd-title">bloom-parser pipeline</title>
    <desc id="pd-desc">
      A request is validated and its format detected, then routed to one adapter per format:
      image (with an optional OCR engine), PDF, spreadsheet or text. Every adapter produces the
      same Document, which can be exported to CSV or XLSX, or published to Power BI.
    </desc>

    <!-- edges -->
    <g fill="none" stroke="color-mix(in srgb, var(--color-text-muted) 55%, transparent)" stroke-width="1.5">
      <path d="M150 60 H250" />
      <path d="M320 82 V120 M110 120 H530 M110 120 V150 M250 120 V150 M390 120 V150 M530 120 V150" />
      <path d="M110 194 V230 M250 194 V230 M390 194 V230 M530 194 V230 M110 230 H530 M320 230 V262" />
      <path d="M320 306 V330 M200 330 H440 M200 330 V352 M440 330 V352" />
      <path d="M60 172 H44 V258 H64" stroke-dasharray="3 4" />
    </g>
    <!-- flow: a short dash travelling the main spine -->
    <path class="flow" d="M150 60 H250 M320 82 V150 M320 194 V262 M320 306 V352" fill="none" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" />

    <!-- nodes -->
    <g font-family="var(--font-mono)" font-size="14" text-anchor="middle">
      <g v-for="n in nodes" :key="n.label">
        <rect :x="n.x - n.w / 2" :y="n.y - 22" :width="n.w" height="44" rx="10"
              :fill="n.core ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-bg))' : 'var(--color-bg)'"
              :stroke="n.core ? 'color-mix(in srgb, var(--color-accent) 60%, transparent)' : 'color-mix(in srgb, var(--color-text-muted) 45%, transparent)'" />
        <text :x="n.x" :y="n.y + 4.5" :fill="n.core ? 'var(--color-text)' : 'var(--color-text)'">{{ n.label }}</text>
      </g>
      <text x="64" y="262" text-anchor="start" font-size="11" fill="var(--color-text-muted)">OCR engine</text>
      <text x="64" y="276" text-anchor="start" font-size="11" fill="var(--color-text-muted)">behind an interface</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
// Drawn from the architecture in TheBraveByte/bloom-parser's README, not invented.
const nodes = [
  { label: 'request', x: 95, y: 60, w: 110 },
  { label: 'validate · detect', x: 320, y: 60, w: 150 },
  { label: 'image', x: 110, y: 172, w: 100 },
  { label: 'pdf', x: 250, y: 172, w: 100 },
  { label: 'xlsx', x: 390, y: 172, w: 100 },
  { label: 'text', x: 530, y: 172, w: 100 },
  { label: 'Document', x: 320, y: 284, w: 150, core: true },
  { label: 'CSV / XLSX', x: 200, y: 374, w: 130 },
  { label: 'Power BI', x: 440, y: 374, w: 130 },
]
</script>

<style scoped>
.flow {
  stroke-dasharray: 10 600;
  stroke-dashoffset: 0;
}
@media (prefers-reduced-motion: no-preference) {
  .flow { animation: flow 3.2s linear infinite; }
}
@keyframes flow {
  to { stroke-dashoffset: -610; }
}
</style>
