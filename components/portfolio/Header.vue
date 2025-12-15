<template>
  <header class="fixed top-0 left-0 right-0 bg-bg/90 backdrop-blur-md z-50 border-b border-border transition-colors duration-200">
    <nav class="container mx-auto px-6 h-16 flex items-center justify-between">
      
      <!-- Logo / System ID -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-2 h-2 bg-accent animate-pulse"></div>
        <span class="font-mono text-sm font-bold text-text tracking-tight group-hover:text-accent transition-colors">
          YA_SYSTEM_V4
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in navItems" :key="item.id">
          <NuxtLink :to="`#${item.id}`"
            class="font-mono text-xs text-text-secondary hover:text-accent transition-colors uppercase tracking-wider">
            [{{ item.label }}]
          </NuxtLink>
        </li>
      </ul>

      <!-- Right Controls -->
      <div class="hidden md:flex items-center gap-6">
        <ThemeToggle />
        <div class="h-4 w-px bg-border"></div>
        <NuxtLink to="#contact"
          class="font-mono text-xs bg-text text-bg px-4 py-2 hover:bg-accent hover:text-white transition-colors duration-200">
          INITIATE_CONTACT
        </NuxtLink>
      </div>

      <!-- Mobile Controls -->
      <div class="flex items-center gap-4 md:hidden">
        <ThemeToggle />
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 text-text">
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-border bg-bg">
      <ul class="flex flex-col p-4">
        <li v-for="item in navItems" :key="item.id">
          <NuxtLink :to="`#${item.id}`"
            @click="mobileMenuOpen = false"
            class="block py-3 font-mono text-xs text-text-secondary hover:text-accent transition-colors uppercase tracking-wider border-b border-border/50 last:border-0">
            > {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);

const navItems = [
  { id: "home", label: "STATUS" },
  { id: "about", label: "SPECS" },
  { id: "projects", label: "MODULES" },
  { id: "skills", label: "TOOLKIT" },
  { id: "contact", label: "UPLINK" },
];
</script>