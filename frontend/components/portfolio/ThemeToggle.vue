<template>
  <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-100 transition-colors"
    aria-label="Toggle theme">
    <Icon :name="colorMode.preference === 'dark'
        ? 'lucide:moon'
        : colorMode.preference === 'light'
          ? 'lucide:sun'
          : 'lucide:monitor'
      " class="w-5 h-5 text-gray-600" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
