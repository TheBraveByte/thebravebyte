<template>
  <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    aria-label="Toggle theme">
    <Icon :name="colorMode.preference === 'dark'
        ? 'lucide:moon'
        : colorMode.preference === 'light'
          ? 'lucide:sun'
          : 'lucide:monitor'
      " class="w-5 h-5 text-gray-600 dark:text-gray-300" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
  switch (colorMode.preference) {
    case "dark":
      colorMode.preference = "light";
      break;
    case "light":
      colorMode.preference = "system";
      break;
    case "system":
    default:
      colorMode.preference = "dark";
      break;
  }
};
</script>
