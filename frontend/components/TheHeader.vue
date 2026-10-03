<template>
  <header class="site-header sticky top-0 z-40">
    <div class="container-wide flex h-16 items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="text-[15px] font-semibold tracking-tight text-text whitespace-nowrap hover:text-accent transition-colors"
      >
        Yusuf Akinleye
      </NuxtLink>

      <div class="flex items-center gap-1 sm:gap-4">
        <nav aria-label="Main" class="flex items-center gap-4 sm:gap-6 text-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-link text-text-muted hover:text-text transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <button
          type="button"
          class="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-bg-secondary transition-colors"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const mounted = ref(false)
onMounted(() => { mounted.value = true })

// Before hydration the resolved mode is unknown; render the moon so SSR and client match.
const isDark = computed(() => mounted.value && colorMode.value === 'dark')
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
]
</script>

<style scoped>
.site-header {
  background-color: color-mix(in srgb, var(--color-bg) 62%, transparent);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  box-shadow: inset 0 -1px 0 var(--glass-edge);
}
@media (prefers-reduced-transparency: reduce) {
  .site-header { background-color: var(--color-bg); backdrop-filter: none; }
}
.nav-link.router-link-active {
  color: var(--color-text);
}
</style>
