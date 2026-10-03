<template>
  <header class="page flex h-16 items-center justify-between pt-6 md:pt-8">
    <NuxtLink to="/" class="text-[15px] font-medium text-text" aria-label="Home">YA</NuxtLink>
    <nav aria-label="Main" class="flex items-center gap-5 text-[15px] text-text-muted">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link hover:text-text">{{ item.label }}</NuxtLink>
      <button
        type="button"
        class="-mr-2 flex h-8 w-8 items-center justify-center rounded-full hover:text-text"
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        @click="toggleTheme"
      >
        <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
      </button>
    </nav>
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
.nav-link.router-link-active { color: var(--color-text); }
</style>
