<template>
  <header class="fixed top-0 left-0 right-0 bg-bg/90 dark:bg-bg-dark/90 backdrop-blur-md z-50 border-b border-border dark:border-border-dark transition-colors duration-200">
    <nav class="container mx-auto px-6 h-16 flex items-center justify-between">
      
      <!-- Logo / System ID -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-2 h-2 bg-accent dark:bg-accent-dark animate-pulse"></div>
        <span class="font-mono text-sm font-bold text-text dark:text-text tracking-tight group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
          YA_SYSTEM_V4
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in navItems" :key="item.id">
          <NuxtLink :to="`#${item.id}`"
            class="font-mono text-xs text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-dark transition-colors uppercase tracking-wider">
            [{{ item.label }}]
          </NuxtLink>
        </li>
      </ul>

      <!-- Right Controls -->
      <div class="hidden md:flex items-center gap-6">
        <ThemeToggle />
        <div class="h-4 w-px bg-border dark:bg-border-dark"></div>
        <NuxtLink to="#contact"
          class="font-mono text-xs bg-text dark:bg-white text-bg dark:text-black px-4 py-2 hover:bg-accent dark:hover:bg-accent-dark hover:text-white transition-colors duration-200">
          INITIATE_CONTACT
        </NuxtLink>
      </div>

      <!-- Mobile Controls -->
      <div class="flex items-center gap-4 md:hidden">
        <ThemeToggle />
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 text-text dark:text-text">
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-border dark:border-border-dark bg-bg dark:bg-bg-dark">
      <ul class="flex flex-col p-4">
        <li v-for="item in navItems" :key="item.id">
          <NuxtLink :to="`#${item.id}`"
            @click="mobileMenuOpen = false"
            class="block py-3 font-mono text-xs text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-dark transition-colors uppercase tracking-wider border-b border-border/50 dark:border-border-dark/50 last:border-0">
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