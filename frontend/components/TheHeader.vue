<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-150"
    :class="scrolled ? 'bg-bg/85 backdrop-blur border-b border-border' : 'bg-bg border-b border-transparent'"
  >
    <CollapsibleRoot v-model:open="mobileMenuOpen" class="container-wide">
      <div class="flex items-center justify-between h-14">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="inline-flex items-baseline text-[15px] font-semibold text-text tracking-tight hover:opacity-80 transition-opacity"
          aria-label="Yusuf Akinleye — home"
        >
          ya<span class="text-text-muted">.</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-6 text-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-link text-text-muted hover:text-text transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Right controls -->
        <div class="flex items-center gap-1">
          <!-- Search / Command Palette trigger -->
          <button
            @click="$emit('open-palette')"
            class="hidden sm:flex items-center gap-2 px-2.5 py-1.5 text-xs text-text-muted hover:text-text border border-border rounded-md transition-colors hover:border-text-muted"
            aria-label="Search"
          >
            <Icon name="lucide:search" class="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd class="font-mono text-[10px] px-1 py-px border border-border rounded bg-bg-secondary leading-none">⌘K</kbd>
          </button>

          <!-- Theme toggle -->
          <button
            @click="toggleTheme"
            class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text transition-colors rounded-md"
            aria-label="Toggle theme"
          >
            <Icon :name="themeIcon" class="w-4 h-4" />
          </button>

          <!-- Mobile menu toggle -->
          <CollapsibleTrigger
            class="sm:hidden w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded-md"
            aria-label="Toggle menu"
          >
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-4 h-4" />
          </CollapsibleTrigger>
        </div>
      </div>

      <!-- Mobile nav -->
      <CollapsibleContent class="mobile-collapsible sm:hidden">
        <nav class="flex flex-col gap-1 pb-4 pt-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            @click="mobileMenuOpen = false"
            class="py-2 text-sm text-text-secondary hover:text-text transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <button
            @click="$emit('open-palette'); mobileMenuOpen = false"
            class="py-2 text-sm text-text-secondary hover:text-text transition-colors text-left"
          >
            Search…
          </button>
        </nav>
      </CollapsibleContent>
    </CollapsibleRoot>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

defineEmits(['open-palette']);

const colorMode = useColorMode();
const hasMounted = ref(false);

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const themeIcon = computed(() => {
  if (!hasMounted.value) return "lucide:moon";
  return colorMode.value === "dark" ? "lucide:sun" : "lucide:moon";
});

const navItems = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Writing" },
  { to: "/about", label: "About" },
  { to: "/cv", label: "CV" },
];

const scrolled = ref(false);
const handleScroll = () => { scrolled.value = window.scrollY > 8; };

onMounted(() => {
  hasMounted.value = true;
  window.addEventListener("scroll", handleScroll, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const mobileMenuOpen = ref(false);
</script>

<style scoped>
.nav-link.router-link-active {
  color: var(--color-text);
  font-weight: 500;
}
.mobile-collapsible {
  overflow: hidden;
}
.mobile-collapsible[data-state="open"] {
  animation: collapsible-down 0.18s ease-out;
}
.mobile-collapsible[data-state="closed"] {
  animation: collapsible-up 0.15s ease-out;
}
@keyframes collapsible-down {
  from { height: 0; }
  to { height: var(--reka-collapsible-content-height); }
}
@keyframes collapsible-up {
  from { height: var(--reka-collapsible-content-height); }
  to { height: 0; }
}
</style>
