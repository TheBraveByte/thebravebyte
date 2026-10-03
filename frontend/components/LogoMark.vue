<template>
  <!-- A fork: two paths meet at one decision point, then continue as one. The orange node
       is that decision, the same signal colour the site uses for "what the system does". -->
  <svg
    class="logo-mark"
    :class="{ 'is-drawing': draw }"
    viewBox="0 0 32 32"
    :width="size"
    :height="size"
    fill="none"
    aria-hidden="true"
  >
    <path class="arm" d="M7.5 6.5 16 16" pathLength="1" />
    <path class="arm arm-b" d="M24.5 6.5 16 16" pathLength="1" />
    <path class="stem" d="M16 16v10" pathLength="1" />
    <circle class="node" cx="16" cy="16" r="3.4" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number, draw?: boolean }>(), { size: 20, draw: false })
</script>

<style scoped>
.logo-mark { overflow: visible; }
.arm, .stem { stroke: currentColor; stroke-width: 3; stroke-linecap: round; }
.node { fill: var(--color-accent); transform-box: fill-box; transform-origin: center; }

/* Drawn once, on the first page of a visit: arms converge, the stem follows, the node
   lands and blinks once like a detector's status light. */
.is-drawing .arm, .is-drawing .stem { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 420ms var(--ease-out) forwards; }
.is-drawing .arm-b { animation-delay: 60ms; }
.is-drawing .stem { animation-delay: 300ms; }
.is-drawing .node { opacity: 0; transform: scale(0.6); animation: land 360ms var(--ease-out) 420ms forwards, blink 900ms ease 900ms 1; }

@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes land { to { opacity: 1; transform: scale(1); } }
@keyframes blink { 0%, 100% { opacity: 1; } 45% { opacity: 0.35; } }

@media (hover: hover) and (pointer: fine) {
  a:hover > .logo-mark .node { opacity: 1; transform: none; animation: pulse 700ms ease; }
}
@keyframes pulse { 50% { transform: scale(1.25); } }

@media (prefers-reduced-motion: reduce) {
  .is-drawing .arm, .is-drawing .stem, .is-drawing .node { animation: none; stroke-dashoffset: 0; opacity: 1; transform: none; }
  a:hover > .logo-mark .node { animation: none; }
}
</style>
