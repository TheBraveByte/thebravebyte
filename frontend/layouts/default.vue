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
    <footer class="page mt-28 pb-12">
      <p class="text-text-secondary">
        If your product moves money or can't afford to drop work, write to me at
        <a href="mailto:ayaaakinleye@gmail.com" class="quiet-link">ayaaakinleye@gmail.com</a>.
      </p>
      <nav aria-label="Elsewhere" class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-text-muted">
        <a v-for="l in links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="hover:text-text">{{ l.label }}</a>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
const links = [
  { label: 'GitHub', href: 'https://github.com/TheBraveByte' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/' },
  { label: 'FoldLabs', href: 'https://foldlabs.pro' },
]
</script>
