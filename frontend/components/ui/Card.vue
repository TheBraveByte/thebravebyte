<template>
  <div :class="cn('rounded-xl border border-border bg-bg-secondary/20 text-text', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";

const props = defineProps<{ class?: string }>();
</script>
