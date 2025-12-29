<template>
  <div class="app-layout">
    <TheHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} The Brave Byte. Built with Nuxt & MongoDB.</p>
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
  padding: 2rem 0;
}

.footer {
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
