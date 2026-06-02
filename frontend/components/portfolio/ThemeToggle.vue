<template>
  <button
    @click="toggleTheme"
    class="p-1.5 text-text-muted hover:text-text transition-colors"
    aria-label="Toggle theme"
  >
    <Icon
      :name="colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'"
      class="w-4 h-4"
    />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>
