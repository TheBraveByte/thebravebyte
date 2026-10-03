<template>
  <div class="flex min-h-[100dvh] flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-bg focus:px-3 focus:py-2 focus:text-sm"
    >
      Skip to content
    </a>
    <TheHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <footer v-if="route.path !== '/'" class="page mt-20 pb-12 font-mono text-[13px] text-text-muted"><div class="offset">
      <a href="mailto:ayaaakinleye@gmail.com" class="hover:text-text">ayaaakinleye@gmail.com</a>
      <span class="mx-2">·</span>
      <a href="https://github.com/TheBraveByte" target="_blank" rel="noopener noreferrer" class="hover:text-text">GitHub</a>
      <span class="mx-2">·</span>
      <a href="https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/" target="_blank" rel="noopener noreferrer" class="hover:text-text">LinkedIn</a>
    </div></footer>
    <div v-else class="pb-16" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
