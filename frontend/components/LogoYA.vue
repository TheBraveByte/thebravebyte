<script setup lang="ts">
interface Props {
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  className: "h-10 w-10",
});
</script>

<template>
  <div
    class="relative flex items-center justify-center p-1 group cursor-pointer"
    :class="props.className"
  >
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full transition-all duration-500 group-hover:scale-105"
    >
      <!-- Outer Frame - Minimalist geometric border -->
      <path
        d="M20 10 H80 Q90 10 90 20 V80 Q90 90 80 90 H20 Q10 90 10 80 V20 Q10 10 20 10"
        stroke="currentColor"
        stroke-width="3"
        class="text-border opacity-70 group-hover:opacity-100 transition-opacity"
      />

      <!-- Stylized 'Y' and 'A' Integration -->
      <g
        stroke="var(--color-accent)"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <!-- Combined path for Y/A structure -->
        <path d="M30 35 L50 55 L70 35" />
        <!-- Y top -->
        <path d="M50 55 V80" />
        <!-- Y stem -->
        <path d="M30 80 L50 30 L70 80" />
        <!-- A outer -->
        <path d="M38 65 H62" stroke-width="5" />
        <!-- A bar -->
      </g>

      <!-- "The Byte" Accent - A small digital square -->
      <rect
        x="72"
        y="18"
        width="12"
        height="12"
        fill="var(--color-accent)"
        class="animate-pulse"
      />
    </svg>
  </div>
</template>
