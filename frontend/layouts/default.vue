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
    <footer v-if="route.path !== '/'" class="page mt-20 pb-12"><div class="offset">
      <SocialLinks class="font-mono text-[13px] text-text-muted" />
    </div></footer>
    <div v-else class="pb-16" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
