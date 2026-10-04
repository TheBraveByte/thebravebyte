<template>
  <header class="page flex h-16 items-center justify-between pt-6 md:pt-8">
    <NuxtLink to="/" class="flex items-center gap-2.5 py-3 font-mono text-[14px] text-text" aria-label="Yusuf Akinleye, home">
      <LogoMark :size="20" draw />
      <span aria-hidden="true">YA</span>
    </NuxtLink>
    <nav aria-label="Main" class="flex items-center gap-4 font-mono text-[14px] text-text-secondary md:gap-5">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link py-3 hover:text-text">{{ item.label }}</NuxtLink>
      <!-- A plain anchor: a router link to a hash on "/" would read as active on the home page. -->
      <a href="/#contact" class="py-3 hover:text-text">Contact</a>
      <button
        type="button"
        class="-mx-3 flex h-11 w-11 items-center justify-center rounded-full hover:text-text"
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
