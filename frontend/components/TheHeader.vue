<template>
  <header class="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
    <div class="mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-4 px-4 md:px-8">
      <NuxtLink to="/" class="font-mono text-[13px] font-medium text-text">Yusuf Akinleye</NuxtLink>
      <nav aria-label="Main" class="flex items-center gap-1 font-mono text-[13px]">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link rounded-md px-2.5 py-1.5 text-text-secondary hover:text-text"
        >
          {{ item.label }}
        </NuxtLink>
        <button
          type="button"
          class="ml-1 flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:text-text"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const mounted = ref(false)
onMounted(() => { mounted.value = true })
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
.nav-link.router-link-active {
  color: var(--color-text);
  background: var(--color-bg-secondary);
}
</style>
