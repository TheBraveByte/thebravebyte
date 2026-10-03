<template>
  <div class="flex min-h-[100dvh] flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-bg focus:px-3 focus:py-2 focus:text-sm"
    >
      Skip to content
    </a>
    <div class="grain" aria-hidden="true" />
    <TheHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-border">
      <div class="container-wide flex flex-col gap-4 py-10 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <span>© {{ year }} Yusuf Akinleye</span>
        <nav aria-label="Elsewhere" class="flex flex-wrap gap-x-6 gap-y-2">
          <a v-for="l in links" :key="l.href" :href="l.href" class="hover:text-text transition-colors" :rel="l.external ? 'noopener noreferrer' : undefined" :target="l.external ? '_blank' : undefined">{{ l.label }}</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const links = [
  { label: 'Email', href: 'mailto:ayaaakinleye@gmail.com', external: false },
  { label: 'GitHub', href: 'https://github.com/TheBraveByte', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/', external: true },
  { label: 'FoldLabs', href: 'https://foldlabs.pro', external: true },
]
</script>
