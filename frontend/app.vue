<template>
  <div class="app-layout">
    <TheHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
    <footer class="border-t-[1.5px] border-ink bg-bg">
      <div class="container mx-auto px-6 py-10">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div class="flex flex-col gap-1">
            <span class="font-serif text-2xl text-text leading-none">Yusuf Akinleye</span>
            <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.22em]">
              © {{ new Date().getFullYear() }} — Backend / Distributed Systems
            </span>
          </div>
          <div class="flex items-center gap-2 font-mono text-[10px] text-text-muted uppercase tracking-[0.18em]">
            <span class="inline-block w-1.5 h-1.5 bg-success"></span>
            <span>Available · UTC+1 · Remote</span>
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
