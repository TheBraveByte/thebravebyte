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
    <footer class="mt-24 border-t border-border">
      <div class="mx-auto max-w-[1040px] px-4 pt-14 pb-8 md:px-8">
        <p class="label">Contact</p>
        <div class="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <a
            href="mailto:ayaaakinleye@gmail.com"
            class="break-all font-mono text-xl text-text hover:text-text-secondary sm:text-2xl md:text-[28px]"
          >ayaaakinleye@gmail.com ↗</a>
          <nav aria-label="Elsewhere" class="flex gap-5 font-mono text-[13px] text-text-secondary">
            <a v-for="l in links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="hover:text-text">{{ l.label }}</a>
          </nav>
        </div>
        <div class="mt-12 flex justify-between border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
          <span>© {{ year }} Yusuf Akinleye</span>
          <span>Go · Payments · APIs</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const links = [
  { label: 'GitHub', href: 'https://github.com/TheBraveByte' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yusuf-akinleye-bb35981b4/' },
  { label: 'FoldLabs', href: 'https://foldlabs.pro' },
]
</script>
