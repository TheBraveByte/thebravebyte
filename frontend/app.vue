<template>
  <div class="app-layout">
    <TheHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
    <footer class="py-10 border-t border-border bg-bg">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <LogoYA />
            <span class="font-serif text-sm text-text-secondary">
              &copy; {{ new Date().getFullYear() }} <span class="text-text font-semibold">The Brave Byte</span>
            </span>
          </div>
          <div class="flex items-center gap-1 text-xs font-sans text-text-muted">
            <span>Engineered with</span>
            <span class="text-accent">&#9829;</span>
            <span>by Yusuf Akinleye</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
