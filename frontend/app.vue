<template>
  <div class="app-layout">
    <TheHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
    <footer class="border-t border-border mt-20">
      <div class="container-wide py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-text-muted">
        <span>© {{ new Date().getFullYear() }} Yusuf Akinleye</span>
        <span class="flex items-center gap-2">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-success"></span>
          Available · Remote · UTC+1
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup>
// GSAP registered on-demand in components that need it — keeps bundle lean.
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content { flex: 1; }
</style>
